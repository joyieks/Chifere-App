import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

class ItemService {
  // Create new item
  async createItem(itemData, sellerId) {
    try {
      const itemRef = await addDoc(collection(db, 'items'), {
        ...itemData,
        sellerId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active', // active, sold, bartered, inactive
        views: 0,
        likes: 0,
        isBarterOnly: itemData.isBarterOnly || false,
        isSellOnly: itemData.isSellOnly || false,
        isBoth: itemData.isBoth || false,
        barterRequests: [],
        barterOffers: [],
        // Default values
        rating: 0,
        totalRatings: 0,
        isFeatured: false,
        isVerified: false
      });
      
      return { success: true, itemId: itemRef.id };
    } catch (error) {
      console.error('Create item error:', error);
      return { success: false, error: error.message };
    }
  }

  // Upload item images
  async uploadItemImages(itemId, images) {
    try {
      const imageUrls = [];
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `items/${itemId}/image_${i}_${Date.now()}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
      
      return { success: true, imageUrls };
    } catch (error) {
      console.error('Upload images error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get item by ID
  async getItem(itemId) {
    try {
      const itemDoc = await getDoc(doc(db, 'items', itemId));
      if (itemDoc.exists()) {
        return { success: true, data: { id: itemDoc.id, ...itemDoc.data() } };
      } else {
        return { success: false, error: 'Item not found' };
      }
    } catch (error) {
      console.error('Get item error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get items by seller
  async getItemsBySeller(sellerId, status = 'active') {
    try {
      const q = query(
        collection(db, 'items'),
        where('sellerId', '==', sellerId),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: items };
    } catch (error) {
      console.error('Get items by seller error:', error);
      return { success: false, error: error.message };
    }
  }

  // Search items
  async searchItems(filters = {}, pageSize = 20, lastDoc = null) {
    try {
      let q = collection(db, 'items');
      
      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
        q = query(q, where('price', '>=', filters.minPrice), where('price', '<=', filters.maxPrice));
      }
      
      if (filters.location) {
        q = query(q, where('location', '==', filters.location));
      }
      
      if (filters.isBarterOnly !== undefined) {
        q = query(q, where('isBarterOnly', '==', filters.isBarterOnly));
      }
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      } else {
        q = query(q, where('status', '==', 'active'));
      }
      
      // Order by creation date
      q = query(q, orderBy('createdAt', 'desc'));
      
      // Apply pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      } else {
        q = query(q, limit(pageSize));
      }
      
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return { 
        success: true, 
        data: items, 
        lastDoc: lastVisible,
        hasMore: items.length === pageSize
      };
    } catch (error) {
      console.error('Search items error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update item
  async updateItem(itemId, updates) {
    try {
      const itemRef = doc(db, 'items', itemId);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update item error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete item
  async deleteItem(itemId) {
    try {
      await deleteDoc(doc(db, 'items', itemId));
      
      // Delete associated images from storage
      // Note: This would require tracking image references
      
      return { success: true };
    } catch (error) {
      console.error('Delete item error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create barter request
  async createBarterRequest(itemId, buyerId, offerData) {
    try {
      const itemRef = doc(db, 'items', itemId);
      
      await updateDoc(itemRef, {
        barterRequests: arrayUnion({
          buyerId,
          offerItems: offerData.offerItems || [],
          offerDescription: offerData.offerDescription || '',
          offerValue: offerData.offerValue || 0,
          message: offerData.message || '',
          status: 'pending', // pending, accepted, rejected, withdrawn
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      });
      
      return { success: true };
    } catch (error) {
      console.error('Create barter request error:', error);
      return { success: false, error: error.message };
    }
  }

  // Respond to barter request
  async respondToBarterRequest(itemId, requestIndex, response, sellerMessage = '') {
    try {
      const itemRef = doc(db, 'items', itemId);
      const itemDoc = await getDoc(itemRef);
      
      if (!itemDoc.exists()) {
        return { success: false, error: 'Item not found' };
      }
      
      const itemData = itemDoc.data();
      const barterRequests = itemData.barterRequests || [];
      
      if (requestIndex >= barterRequests.length) {
        return { success: false, error: 'Invalid request index' };
      }
      
      barterRequests[requestIndex] = {
        ...barterRequests[requestIndex],
        status: response, // 'accepted' or 'rejected'
        sellerMessage,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(itemRef, { barterRequests });
      
      return { success: true };
    } catch (error) {
      console.error('Respond to barter request error:', error);
      return { success: false, error: error.message };
    }
  }

  // Mark item as sold/bartered
  async updateItemStatus(itemId, status, transactionDetails = {}) {
    try {
      const itemRef = doc(db, 'items', itemId);
      
      await updateDoc(itemRef, {
        status,
        updatedAt: serverTimestamp(),
        ...(status === 'sold' && { soldAt: serverTimestamp() }),
        ...(status === 'bartered' && { barteredAt: serverTimestamp() }),
        ...transactionDetails
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update item status error:', error);
      return { success: false, error: error.message };
    }
  }

  // Increment item views
  async incrementItemViews(itemId) {
    try {
      const itemRef = doc(db, 'items', itemId);
      await updateDoc(itemRef, {
        views: increment(1)
      });
      
      return { success: true };
    } catch (error) {
      console.error('Increment views error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get featured items
  async getFeaturedItems(limit = 10) {
    try {
      const q = query(
        collection(db, 'items'),
        where('isFeatured', '==', true),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: items };
    } catch (error) {
      console.error('Get featured items error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get items by category
  async getItemsByCategory(category, limit = 20) {
    try {
      const q = query(
        collection(db, 'items'),
        where('category', '==', category),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: items };
    } catch (error) {
      console.error('Get items by category error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new ItemService();


