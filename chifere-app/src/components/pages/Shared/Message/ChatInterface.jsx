/**
 * ChatInterface Component
 * 
 * Main chat interface that combines conversation list and message view
 * with real-time messaging capabilities.
 * 
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BsArrowLeft, 
  BsThreeDotsVertical, 
  BsPhoneVibrate,
  BsInfoCircle
} from 'react-icons/bs';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import theme from '../../../../styles/designSystem';
import { useMessaging } from '../../../../contexts/MessagingContext';
import { useAuth } from '../../../../contexts/AuthContext';
import ConversationList from './ConversationList';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatInterface = ({ 
  initialConversationId = null,
  onBack = null, // For mobile navigation
  className = '' 
}) => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    activeConversation, 
    setActiveConversation,
    getConversationMessages,
    markMessagesAsRead,
    isTyping
  } = useMessaging();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [showMobileConversationList, setShowMobileConversationList] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Handle initial conversation selection
  useEffect(() => {
    if (initialConversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === initialConversationId);
      if (conversation) {
        handleConversationSelect(conversation);
      }
    }
  }, [initialConversationId, conversations]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // Load messages when conversation changes
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (selectedConversation) {
        const conversationMessages = messages[selectedConversation.id] || [];
        setCurrentMessages(conversationMessages);
        
        if (conversationMessages.length === 0) {
          await getConversationMessages(selectedConversation.id);
          if (isMounted) {
            setCurrentMessages(messages[selectedConversation.id] || []);
          }
        }
      }
    };
    load();
    return () => { isMounted = false; };
  }, [selectedConversation, messages, getConversationMessages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleConversationSelect = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setActiveConversation(conversation);
    setShowMobileConversationList(false);
    
    // Mark messages as read
    if (conversation.unreadCount[user?.id] > 0) {
      markMessagesAsRead(conversation.id);
    }
  }, [setActiveConversation, markMessagesAsRead, user]);

  const handleBackToList = useCallback(() => {
    setShowMobileConversationList(true);
    setSelectedConversation(null);
    setActiveConversation(null);
  }, [setActiveConversation]);

  const getOtherParticipant = useCallback((conversation) => {
    if (!conversation || !user) return null;
    const otherParticipantId = conversation.participants.find(p => p !== user.id);
    return conversation.participantInfo[otherParticipantId] || {
      name: 'Unknown User',
      avatar: null
    };
  }, [user]);

  const renderTypingIndicator = () => {
    if (!selectedConversation || !isTyping[selectedConversation.id]) return null;

    const otherParticipant = getOtherParticipant(selectedConversation);
    
    return (
      <div 
        className="flex items-center space-x-3 px-4 py-2"
        style={{
          backgroundColor: theme.colors.gray[50]
        }}
      >
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: theme.borderRadius.full,
            backgroundColor: otherParticipant.avatar ? 'transparent' : theme.colors.primary[500],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.white,
            overflow: 'hidden'
          }}
        >
          {otherParticipant.avatar ? (
            <img 
              src={otherParticipant.avatar} 
              alt={otherParticipant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            otherParticipant.name?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2]
          }}
        >
          <div 
            style={{
              display: 'flex',
              gap: '2px'
            }}
          >
            {[1, 2, 3].map(dot => (
              <div
                key={dot}
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: theme.colors.gray[400],
                  animation: `bounce 1.5s infinite ${dot * 0.2}s`
                }}
              />
            ))}
          </div>
          <span 
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray[500],
              fontStyle: 'italic'
            }}
          >
            {otherParticipant.name} is typing...
          </span>
        </div>
      </div>
    );
  };

  const renderChatHeader = () => {
    if (!selectedConversation) return null;

    const otherParticipant = getOtherParticipant(selectedConversation);
    
    return (
      <div 
        style={{
          padding: theme.spacing[4],
          borderBottom: `1px solid ${theme.colors.gray[200]}`,
          backgroundColor: theme.colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div className="flex items-center space-x-3">
          
          {/* Back Button (Mobile) */}
          <button
            onClick={onBack || handleBackToList}
            className="md:hidden"
            style={{
              padding: theme.spacing[2],
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              color: theme.colors.gray[600],
              transition: theme.animations.transition.colors
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.gray[100];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsArrowLeft size={20} />
          </button>

          {/* Participant Info */}
          <div 
            style={{
              position: 'relative'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: theme.borderRadius.full,
                backgroundColor: otherParticipant.avatar ? 'transparent' : theme.colors.primary[500],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.white,
                overflow: 'hidden'
              }}
            >
              {otherParticipant.avatar ? (
                <img 
                  src={otherParticipant.avatar} 
                  alt={otherParticipant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                otherParticipant.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            
            {/* Online indicator */}
            <div 
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                width: '12px',
                height: '12px',
                backgroundColor: theme.colors.success[500],
                borderRadius: theme.borderRadius.full,
                border: `2px solid ${theme.colors.white}`
              }}
            />
          </div>

          <div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.gray[900]
              }}
            >
              {otherParticipant.name}
            </div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.success[600],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[1]
              }}
            >
              <div 
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: theme.colors.success[500]
                }}
              />
              Online
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            style={{
              padding: theme.spacing[2],
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              color: theme.colors.gray[600],
              transition: theme.animations.transition.colors
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.gray[100];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsPhoneVibrate size={20} />
          </button>
          
          <button
            style={{
              padding: theme.spacing[2],
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              color: theme.colors.gray[600],
              transition: theme.animations.transition.colors
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.gray[100];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsInfoCircle size={20} />
          </button>
          
          <button
            style={{
              padding: theme.spacing[2],
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              color: theme.colors.gray[600],
              transition: theme.animations.transition.colors
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.gray[100];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: theme.colors.background.accent
      }}
    >
      <div 
        style={{
          fontSize: theme.typography.fontSize['6xl'],
          marginBottom: theme.spacing[4]
        }}
      >
        💬
      </div>
      <div 
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.gray[900],
          marginBottom: theme.spacing[2],
          textAlign: 'center'
        }}
      >
        Welcome to ChiFere Messages
      </div>
      <div 
        style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.gray[600],
          textAlign: 'center',
          maxWidth: '400px'
        }}
      >
        Select a conversation from the list to start messaging, or begin a new conversation with a buyer or seller.
      </div>
    </div>
  );

  // Mobile layout: show conversation list or chat
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    return (
      <div className={`h-full flex flex-col ${className}`}>
        {showMobileConversationList ? (
          <ConversationList 
            onConversationSelect={handleConversationSelect}
            selectedConversationId={selectedConversation?.id}
            className="h-full"
          />
        ) : selectedConversation ? (
          <>
            {renderChatHeader()}
            
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto"
              style={{
                backgroundColor: theme.colors.background.accent,
                padding: theme.spacing[4]
              }}
            >
              {currentMessages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === user?.id}
                  showAvatar={
                    index === 0 || 
                    currentMessages[index - 1].senderId !== message.senderId
                  }
                  showTimestamp={
                    index === currentMessages.length - 1 ||
                    currentMessages[index + 1].senderId !== message.senderId
                  }
                />
              ))}
              
              {renderTypingIndicator()}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput 
              conversationId={selectedConversation.id}
            />
          </>
        ) : (
          renderEmptyState()
        )}
      </div>
    );
  }

  // Desktop layout: side-by-side
  return (
    <div className={`h-full flex ${className}`}>
      
      {/* Conversation List */}
      <div 
        style={{
          width: '360px',
          borderRight: `1px solid ${theme.colors.gray[200]}`,
          backgroundColor: theme.colors.white
        }}
      >
        <ConversationList 
          onConversationSelect={handleConversationSelect}
          selectedConversationId={selectedConversation?.id}
          className="h-full"
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {renderChatHeader()}
            
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto"
              style={{
                backgroundColor: theme.colors.background.accent,
                padding: theme.spacing[4]
              }}
            >
              {currentMessages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === user?.id}
                  showAvatar={
                    index === 0 || 
                    currentMessages[index - 1].senderId !== message.senderId
                  }
                  showTimestamp={
                    index === currentMessages.length - 1 ||
                    currentMessages[index + 1].senderId !== message.senderId
                  }
                />
              ))}
              
              {renderTypingIndicator()}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput 
              conversationId={selectedConversation.id}
            />
          </>
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
