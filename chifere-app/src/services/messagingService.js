import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../config/firebase';

class MessagingService {
  // Create a new conversation
  async createConversation(participants, itemId = null, initialMessage = null) {
    try {
      const conversationData = {
        participants: participants.sort(), // Sort for consistent querying
        itemId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: initialMessage || null,
        unreadCount: {},
        isActive: true
      };
      
      // Initialize unread count for each participant
      participants.forEach(participantId => {
        conversationData.unreadCount[participantId] = 0;
      });
      
      const conversationRef = await addDoc(collection(db, 'conversations'), conversationData);
      
      // If there's an initial message, add it
      if (initialMessage) {
        await this.sendMessage(conversationRef.id, initialMessage.senderId, initialMessage.content, initialMessage.type);
      }
      
      return { success: true, conversationId: conversationRef.id };
    } catch (error) {
      console.error('Create conversation error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send a message
  async sendMessage(conversationId, senderId, content, type = 'text', metadata = {}) {
    try {
      const messageData = {
        conversationId,
        senderId,
        content,
        type, // text, image, file, offer
        metadata,
        createdAt: serverTimestamp(),
        isRead: false,
        isEdited: false,
        isDeleted: false
      };
      
      const messageRef = await addDoc(collection(db, 'messages'), messageData);
      
      // Update conversation with last message and unread count
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationDoc = await getDoc(conversationRef);
      
      if (conversationDoc.exists()) {
        const conversationData = conversationDoc.data();
        const unreadCount = { ...conversationData.unreadCount };
        
        // Increment unread count for all participants except sender
        conversationData.participants.forEach(participantId => {
          if (participantId !== senderId) {
            unreadCount[participantId] = (unreadCount[participantId] || 0) + 1;
          }
        });
        
        await updateDoc(conversationRef, {
          lastMessage: {
            content,
            type,
            senderId,
            createdAt: serverTimestamp()
          },
          unreadCount,
          updatedAt: serverTimestamp()
        });
      }
      
      return { success: true, messageId: messageRef.id };
    } catch (error) {
      console.error('Send message error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get conversations for a user
  async getUserConversations(userId, limit = 20) {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        where('isActive', '==', true),
        orderBy('updatedAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const conversations = [];
      
      querySnapshot.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: conversations };
    } catch (error) {
      console.error('Get user conversations error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get messages for a conversation
  async getConversationMessages(conversationId, limit = 50) {
    try {
      const q = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        where('isDeleted', '==', false),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort by creation time (oldest first)
      messages.sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate());
      
      return { success: true, data: messages };
    } catch (error) {
      console.error('Get conversation messages error:', error);
      return { success: false, error: error.message };
    }
  }

  // Listen to conversation messages in real-time
  listenToConversation(conversationId, callback, limit = 50) {
    try {
      const q = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        where('isDeleted', '==', false),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by creation time (oldest first)
        messages.sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate());
        
        callback({ success: true, data: messages });
      }, (error) => {
        console.error('Listen to conversation error:', error);
        callback({ success: false, error: error.message });
      });
    } catch (error) {
      console.error('Listen to conversation error:', error);
      callback({ success: false, error: error.message });
    }
  }

  // Mark messages as read
  async markMessagesAsRead(conversationId, userId) {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationDoc = await getDoc(conversationRef);
      
      if (conversationDoc.exists()) {
        const conversationData = conversationDoc.data();
        const unreadCount = { ...conversationData.unreadCount };
        
        // Reset unread count for this user
        unreadCount[userId] = 0;
        
        await updateDoc(conversationRef, {
          unreadCount,
          updatedAt: serverTimestamp()
        });
      }
      
      // Mark individual messages as read
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        where('senderId', '!=', userId),
        where('isRead', '==', false)
      );
      
      const messagesSnapshot = await getDocs(messagesQuery);
      const updatePromises = messagesSnapshot.docs.map(doc => 
        updateDoc(doc.ref, { isRead: true })
      );
      
      await Promise.all(updatePromises);
      
      return { success: true };
    } catch (error) {
      console.error('Mark messages as read error:', error);
      return { success: false, error: error.message };
    }
  }

  // Edit message
  async editMessage(messageId, newContent) {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        content: newContent,
        isEdited: true,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Edit message error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete message
  async deleteMessage(messageId) {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        isDeleted: true,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Delete message error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get conversation by participants and item
  async getConversationByParticipants(participants, itemId = null) {
    try {
      const sortedParticipants = participants.sort();
      let q = query(
        collection(db, 'conversations'),
        where('participants', '==', sortedParticipants),
        where('isActive', '==', true)
      );
      
      if (itemId) {
        q = query(q, where('itemId', '==', itemId));
      }
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, data: null };
      }
    } catch (error) {
      console.error('Get conversation by participants error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send offer message
  async sendOfferMessage(conversationId, senderId, offerData) {
    try {
      const messageData = {
        conversationId,
        senderId,
        content: 'Offer made',
        type: 'offer',
        metadata: {
          offerType: offerData.offerType, // 'barter', 'price_reduction', 'bundle'
          offerValue: offerData.offerValue,
          offerDescription: offerData.offerDescription,
          offerItems: offerData.offerItems || [],
          originalPrice: offerData.originalPrice,
          offeredPrice: offerData.offeredPrice,
          expiresAt: offerData.expiresAt
        },
        createdAt: serverTimestamp(),
        isRead: false,
        isEdited: false,
        isDeleted: false
      };
      
      const messageRef = await addDoc(collection(db, 'messages'), messageData);
      
      // Update conversation
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        lastMessage: {
          content: 'Offer made',
          type: 'offer',
          senderId,
          createdAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });
      
      return { success: true, messageId: messageRef.id };
    } catch (error) {
      console.error('Send offer message error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get unread message count for a user
  async getUnreadMessageCount(userId) {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      let totalUnread = 0;
      
      querySnapshot.forEach((doc) => {
        const conversationData = doc.data();
        totalUnread += conversationData.unreadCount[userId] || 0;
      });
      
      return { success: true, count: totalUnread };
    } catch (error) {
      console.error('Get unread message count error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new MessagingService();


