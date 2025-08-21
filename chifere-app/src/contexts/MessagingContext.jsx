/**
 * MessagingContext - State management for ChiFere messaging system
 * 
 * Provides centralized state management for conversations, messages,
 * and real-time updates using React Context API.
 * 
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const MessagingContext = createContext();

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};

export const MessagingProvider = ({ children }) => {
  const { user } = useAuth();
  const userIdStr = user?.id != null ? `user${user.id}` : 'user1';
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  
  // Refs for cleanup
  const listenersRef = useRef({});
  const typingTimeoutRef = useRef({});

  // Mock data for development (replace with Firebase integration later)
  const mockConversations = [
    {
      id: 'conv1',
      participants: ['user1', 'user2'],
      itemId: 'item1',
      lastMessage: {
        content: 'Hi, is this camera still available?',
        type: 'text',
        senderId: 'user2',
        createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      },
      unreadCount: { [userIdStr]: 1 },
      isActive: true,
      participantInfo: {
        user2: {
          name: 'Maria Santos',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b750?w=150'
        }
      }
    },
    {
      id: 'conv2',
      participants: ['user1', 'user3'],
      itemId: 'item2',
      lastMessage: {
        content: 'Would you accept this vintage watch as trade?',
        type: 'offer',
        senderId: 'user3',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      unreadCount: { [userIdStr]: 0 },
      isActive: true,
      participantInfo: {
        user3: {
          name: 'Juan Dela Cruz',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        }
      }
    }
  ];

  const mockMessages = {
    conv1: [
      {
        id: 'msg1',
        conversationId: 'conv1',
        senderId: 'user2',
        senderName: 'Maria Santos',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b750?w=150',
        content: 'Hi, is this camera still available?',
        type: 'text',
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        isRead: false,
        isEdited: false
      },
      {
        id: 'msg2',
        conversationId: 'conv1',
        senderId: 'user1',
        senderName: 'You',
        content: 'Yes, it\'s still available! Are you interested?',
        type: 'text',
        createdAt: new Date(Date.now() - 8 * 60 * 1000),
        isRead: true,
        isEdited: false
      },
      {
        id: 'msg3',
        conversationId: 'conv1',
        senderId: 'user2',
        senderName: 'Maria Santos',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b750?w=150',
        content: 'Great! Can we meet tomorrow?',
        type: 'text',
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        isEdited: false
      }
    ],
    conv2: [
      {
        id: 'msg4',
        conversationId: 'conv2',
        senderId: 'user3',
        senderName: 'Juan Dela Cruz',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        content: 'Would you accept this vintage watch as trade?',
        type: 'offer',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        metadata: {
          offerType: 'barter',
          offerDescription: 'Vintage Omega Seamaster watch in excellent condition',
          offerValue: 15000,
          originalPrice: 18000
        }
      }
    ]
  };

  // Initialize mock data (seed with current user id so a demo conversation shows up)
  useEffect(() => {
    if (user) {
      // Map templates to current user id
      const seededConversations = mockConversations.map(conv => ({
        ...conv,
        participants: conv.participants.map(p => p === 'user1' ? userIdStr : p),
        unreadCount: { [userIdStr]: conv.id === 'conv1' ? 1 : 0 }
      }));

      const mapMessages = (arr) => arr.map(m => ({
        ...m,
        senderId: m.senderId === 'user1' ? userIdStr : m.senderId,
        senderName: m.senderId === 'user1' ? (user.name || 'You') : m.senderName,
        senderAvatar: m.senderId === 'user1' ? user.avatar : m.senderAvatar
      }));

      // Seed participant display info for non-self participants
      const seededWithParticipantInfo = seededConversations.map(conv => {
        const updatedInfo = { ...(conv.participantInfo || {}) };
        conv.participants.forEach(pid => {
          const pidStr = String(pid);
          if (pidStr !== userIdStr && !updatedInfo[pidStr]) {
            // Assign a default name for demo if missing
            updatedInfo[pidStr] = { name: 'ChiFere User', avatar: '' };
          }
        });
        return { ...conv, participantInfo: updatedInfo };
      });

      const seededMessages = {
        conv1: mapMessages(mockMessages.conv1 || []),
        conv2: mapMessages(mockMessages.conv2 || [])
      };

      setConversations(seededWithParticipantInfo);
      setMessages(seededMessages);
      
      // Calculate total unread count
      const totalUnread = seededWithParticipantInfo.reduce((total, conv) => {
        return total + (conv.unreadCount[userIdStr] || 0);
      }, 0);
      setUnreadCount(totalUnread);
    }
  }, [user, userIdStr]);

  // Get conversations for current user
  const getUserConversations = useCallback(async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, always return seeded conversations for this user
      const seeded = mockConversations.map(conv => ({
        ...conv,
        participants: conv.participants.map(p => p === 'user1' ? userIdStr : p),
        unreadCount: { [userIdStr]: conv.id === 'conv1' ? 1 : 0 }
      }));

      const userConversations = seeded.filter(conv => 
        conv.participants.includes(userIdStr)
      );
      
      setConversations(userConversations);
      return { success: true, data: userConversations };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [user, userIdStr]);

  // Get messages for a conversation
  const getConversationMessages = useCallback(async (conversationId) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const conversationMessages = mockMessages[conversationId] || [];
      
      setMessages(prev => ({
        ...prev,
        [conversationId]: conversationMessages
      }));
      
      return { success: true, data: conversationMessages };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (conversationId, content, type = 'text', metadata = {}) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const newMessage = {
        id: `msg_${Date.now()}`,
        conversationId,
        senderId: userIdStr,
        senderName: user.name || 'You',
        senderAvatar: user.avatar,
        content,
        type,
        metadata,
        createdAt: new Date(),
        isRead: false,
        isEdited: false
      };

      // Add message to local state immediately for optimistic updates
      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage]
      }));

      // Update conversation last message
      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: {
              content,
              type,
              senderId: userIdStr,
              createdAt: new Date()
            },
            updatedAt: new Date()
          };
        }
        return conv;
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return { success: true, messageId: newMessage.id };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [user, userIdStr]);

  // Create a new conversation
  const createConversation = useCallback(async (participants, itemId = null, initialMessage = null) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const conversationId = `conv_${Date.now()}`;
      const newConversation = {
        id: conversationId,
        participants: [...participants, userIdStr].sort(),
        itemId,
        lastMessage: initialMessage,
        unreadCount: {},
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        participantInfo: {} // This would be populated with actual user data
      };

      // Initialize unread count for each participant
      newConversation.participants.forEach(participantId => {
        newConversation.unreadCount[participantId] = 0;
      });

      setConversations(prev => [newConversation, ...prev]);

      if (initialMessage) {
        await sendMessage(conversationId, initialMessage.content, initialMessage.type, initialMessage.metadata);
      }

      return { success: true, conversationId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [user, sendMessage, userIdStr]);

  // Mark messages as read
  const markMessagesAsRead = useCallback(async (conversationId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      // Update unread count in conversations
      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: {
              ...conv.unreadCount,
              [userIdStr]: 0
            }
          };
        }
        return conv;
      }));

      // Mark messages as read
      setMessages(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map(message => ({
          ...message,
          isRead: message.senderId === userIdStr ? message.isRead : true
        }))
      }));

      // Recalculate total unread count
      const newUnreadCount = conversations.reduce((total, conv) => {
        if (conv.id === conversationId) return total;
        return total + (conv.unreadCount[userIdStr] || 0);
      }, 0);
      setUnreadCount(newUnreadCount);

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [user, conversations, userIdStr]);

  // Set typing status
  const setTypingStatus = useCallback((conversationId, isTyping) => {
    if (!user) return;

    setIsTyping(prev => ({
      ...prev,
      [conversationId]: isTyping
    }));

    // Clear typing status after timeout
    if (typingTimeoutRef.current[conversationId]) {
      clearTimeout(typingTimeoutRef.current[conversationId]);
    }

    if (isTyping) {
      typingTimeoutRef.current[conversationId] = setTimeout(() => {
        setIsTyping(prev => ({
          ...prev,
          [conversationId]: false
        }));
      }, 3000);
    }
  }, [user]);

  // Get unread message count
  const getUnreadMessageCount = useCallback(() => {
    return unreadCount;
  }, [unreadCount]);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Clean up listeners and timeouts
      Object.values(listenersRef.current).forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      
      Object.values(typingTimeoutRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const value = {
    // State
    conversations,
    activeConversation,
    messages,
    unreadCount,
    isLoading,
    error,
    isTyping,
    onlineUsers,

    // Actions
    getUserConversations,
    getConversationMessages,
    sendMessage,
    createConversation,
    markMessagesAsRead,
    setTypingStatus,
    getUnreadMessageCount,
    setActiveConversation,
    setError
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
};

export default MessagingContext;
