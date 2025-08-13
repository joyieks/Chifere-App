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

class NotificationService {
  // Create a new notification
  async createNotification(userId, notificationData) {
    try {
      const notification = {
        userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type, // 'message', 'offer', 'system', 'transaction', 'barter'
        data: notificationData.data || {},
        isRead: false,
        isActionable: notificationData.isActionable || false,
        actionUrl: notificationData.actionUrl || null,
        expiresAt: notificationData.expiresAt || null,
        createdAt: serverTimestamp(),
        priority: notificationData.priority || 'normal' // 'low', 'normal', 'high', 'urgent'
      };
      
      const notificationRef = await addDoc(collection(db, 'notifications'), notification);
      
      return { success: true, notificationId: notificationRef.id };
    } catch (error) {
      console.error('Create notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user notifications
  async getUserNotifications(userId, limit = 50, unreadOnly = false) {
    try {
      let q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      if (unreadOnly) {
        q = query(q, where('isRead', '==', false));
      }
      
      const querySnapshot = await getDocs(q);
      const notifications = [];
      
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: notifications };
    } catch (error) {
      console.error('Get user notifications error:', error);
      return { success: false, error: error.message };
    }
  }

  // Listen to user notifications in real-time
  listenToUserNotifications(userId, callback, limit = 50) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push({ id: doc.id, ...doc.data() });
        });
        
        callback({ success: true, data: notifications });
      }, (error) => {
        console.error('Listen to notifications error:', error);
        callback({ success: false, error: error.message });
      });
    } catch (error) {
      console.error('Listen to notifications error:', error);
      callback({ success: false, error: error.message });
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true,
        readAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Mark notification as read error:', error);
      return { success: false, error: error.message };
    }
  }

  // Mark all user notifications as read
  async markAllNotificationsAsRead(userId) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('isRead', '==', false)
      );
      
      const querySnapshot = await getDocs(q);
      const updatePromises = querySnapshot.docs.map(doc => 
        updateDoc(doc.ref, {
          isRead: true,
          readAt: serverTimestamp()
        })
      );
      
      await Promise.all(updatePromises);
      
      return { success: true };
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isDeleted: true,
        deletedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Delete notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get unread notification count
  async getUnreadNotificationCount(userId) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('isRead', '==', false)
      );
      
      const querySnapshot = await getDocs(q);
      return { success: true, count: querySnapshot.size };
    } catch (error) {
      console.error('Get unread notification count error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create message notification
  async createMessageNotification(userId, messageData) {
    try {
      const notification = {
        userId,
        title: 'New Message',
        message: `You have a new message from ${messageData.senderName}`,
        type: 'message',
        data: {
          conversationId: messageData.conversationId,
          senderId: messageData.senderId,
          senderName: messageData.senderName,
          messagePreview: messageData.content.substring(0, 100),
          itemId: messageData.itemId
        },
        isRead: false,
        isActionable: true,
        actionUrl: `/messages/${messageData.conversationId}`,
        createdAt: serverTimestamp(),
        priority: 'normal'
      };
      
      return await this.createNotification(userId, notification);
    } catch (error) {
      console.error('Create message notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create offer notification
  async createOfferNotification(userId, offerData) {
    try {
      const notification = {
        userId,
        title: 'New Offer',
        message: `You have a new ${offerData.offerType} offer for ${offerData.itemName}`,
        type: 'offer',
        data: {
          offerId: offerData.offerId,
          itemId: offerData.itemId,
          itemName: offerData.itemName,
          offerType: offerData.offerType,
          offerValue: offerData.offerValue,
          senderId: offerData.senderId,
          senderName: offerData.senderName
        },
        isRead: false,
        isActionable: true,
        actionUrl: `/offers/${offerData.offerId}`,
        createdAt: serverTimestamp(),
        priority: 'high'
      };
      
      return await this.createNotification(userId, notification);
    } catch (error) {
      console.error('Create offer notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create system notification
  async createSystemNotification(userId, systemData) {
    try {
      const notification = {
        userId,
        title: systemData.title || 'System Update',
        message: systemData.message,
        type: 'system',
        data: systemData.data || {},
        isRead: false,
        isActionable: systemData.isActionable || false,
        actionUrl: systemData.actionUrl || null,
        createdAt: serverTimestamp(),
        priority: systemData.priority || 'normal'
      };
      
      return await this.createNotification(userId, notification);
    } catch (error) {
      console.error('Create system notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create transaction notification
  async createTransactionNotification(userId, transactionData) {
    try {
      const notification = {
        userId,
        title: 'Transaction Update',
        message: `Your ${transactionData.type} transaction has been ${transactionData.status}`,
        type: 'transaction',
        data: {
          transactionId: transactionData.transactionId,
          type: transactionData.type, // 'purchase', 'sale', 'barter'
          status: transactionData.status,
          itemName: transactionData.itemName,
          amount: transactionData.amount
        },
        isRead: false,
        isActionable: true,
        actionUrl: `/transactions/${transactionData.transactionId}`,
        createdAt: serverTimestamp(),
        priority: 'high'
      };
      
      return await this.createNotification(userId, notification);
    } catch (error) {
      console.error('Create transaction notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create barter notification
  async createBarterNotification(userId, barterData) {
    try {
      const notification = {
        userId,
        title: 'Barter Update',
        message: `Your barter request for ${barterData.itemName} has been ${barterData.status}`,
        type: 'barter',
        data: {
          barterId: barterData.barterId,
          itemId: barterData.itemId,
          itemName: barterData.itemName,
          status: barterData.status,
          senderId: barterData.senderId,
          senderName: barterData.senderName
        },
        isRead: false,
        isActionable: true,
        actionUrl: `/barter/${barterData.barterId}`,
        createdAt: serverTimestamp(),
        priority: 'high'
      };
      
      return await this.createNotification(userId, notification);
    } catch (error) {
      console.error('Create barter notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Clean up expired notifications
  async cleanupExpiredNotifications() {
    try {
      const now = new Date();
      const q = query(
        collection(db, 'notifications'),
        where('expiresAt', '<', now)
      );
      
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(doc => 
        this.deleteNotification(doc.id)
      );
      
      await Promise.all(deletePromises);
      
      return { success: true, deletedCount: querySnapshot.size };
    } catch (error) {
      console.error('Cleanup expired notifications error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get notification statistics
  async getNotificationStats(userId) {
    try {
      const allNotifications = await this.getUserNotifications(userId, 1000);
      const unreadCount = await this.getUnreadNotificationCount(userId);
      
      if (!allNotifications.success || !unreadCount.success) {
        return { success: false, error: 'Failed to get notification data' };
      }
      
      const notifications = allNotifications.data;
      const stats = {
        total: notifications.length,
        unread: unreadCount.count,
        read: notifications.length - unreadCount.count,
        byType: {},
        byPriority: {}
      };
      
      // Count by type
      notifications.forEach(notification => {
        stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;
        stats.byPriority[notification.priority] = (stats.byPriority[notification.priority] || 0) + 1;
      });
      
      return { success: true, data: stats };
    } catch (error) {
      console.error('Get notification stats error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new NotificationService();


