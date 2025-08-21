/**
 * OfferMessage Component
 * 
 * Specialized component for displaying and managing barter offers
 * and price negotiations within conversations.
 * 
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { 
  BsCheckCircle, 
  BsXCircle, 
  BsCurrencyDollar,
  BsArrowRightCircle,
  BsCalendar
} from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import theme from '../../../../styles/designSystem';
import { useMessaging } from '../../../../contexts/MessagingContext';
import { useAuth } from '../../../../contexts/AuthContext';

const OfferMessage = ({ 
  message,
  isOwnMessage = false,
  onAccept,
  onReject,
  onCounterOffer,
  className = ''
}) => {
  const { user } = useAuth();
  const { sendMessage } = useMessaging();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCounterOfferForm, setShowCounterOfferForm] = useState(false);
  const [counterOfferValue, setCounterOfferValue] = useState('');
  const [counterOfferDescription, setCounterOfferDescription] = useState('');

  const { metadata = {} } = message;
  const {
    offerType = 'price_reduction',
    offerValue = 0,
    offerDescription = '',
    offerItems = [],
    originalPrice = 0,
    offeredPrice = 0,
    expiresAt,
    status = 'pending' // pending, accepted, rejected, expired, withdrawn
  } = metadata;

  const isExpired = expiresAt && new Date(expiresAt) < new Date();
  const canInteract = !isOwnMessage && status === 'pending' && !isExpired;

  const handleAcceptOffer = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Send acceptance message
      await sendMessage(
        message.conversationId,
        'Offer accepted! 🎉',
        'system',
        {
          offerAccepted: true,
          originalOfferId: message.id
        }
      );
      
      onAccept && onAccept(message);
    } catch (error) {
      console.error('Failed to accept offer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectOffer = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Send rejection message
      await sendMessage(
        message.conversationId,
        'Offer declined',
        'system',
        {
          offerRejected: true,
          originalOfferId: message.id
        }
      );
      
      onReject && onReject(message);
    } catch (error) {
      console.error('Failed to reject offer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCounterOffer = async () => {
    if (isProcessing || !counterOfferValue.trim()) return;
    
    setIsProcessing(true);
    try {
      // Send counter offer
      await sendMessage(
        message.conversationId,
        'Counter offer made',
        'offer',
        {
          offerType: offerType,
          offerValue: parseFloat(counterOfferValue),
          offerDescription: counterOfferDescription || `Counter offer: ₱${counterOfferValue}`,
          originalPrice: originalPrice,
          offeredPrice: parseFloat(counterOfferValue),
          isCounterOffer: true,
          originalOfferId: message.id
        }
      );
      
      setShowCounterOfferForm(false);
      setCounterOfferValue('');
      setCounterOfferDescription('');
      onCounterOffer && onCounterOffer(message, counterOfferValue);
    } catch (error) {
      console.error('Failed to send counter offer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getOfferStatusColor = () => {
    switch (status) {
      case 'accepted':
        return theme.colors.success[500];
      case 'rejected':
        return theme.colors.error[500];
      case 'expired':
        return theme.colors.gray[400];
      default:
        return theme.colors.warning[500];
    }
  };

  const getOfferStatusText = () => {
    switch (status) {
      case 'accepted':
        return '✅ Accepted';
      case 'rejected':
        return '❌ Rejected';
      case 'expired':
        return '⏰ Expired';
      default:
        return '⏳ Pending';
    }
  };

  const renderOfferDetails = () => {
    switch (offerType) {
      case 'barter':
        return (
          <div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.primary[700],
                marginBottom: theme.spacing[2],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}
            >
              🔄 Barter Proposal
            </div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.gray[800],
                marginBottom: theme.spacing[3]
              }}
            >
              {offerDescription}
            </div>
            {offerItems.length > 0 && (
              <div>
                <div 
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.gray[700],
                    marginBottom: theme.spacing[2]
                  }}
                >
                  Items offered:
                </div>
                <div className="space-y-2">
                  {offerItems.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        padding: theme.spacing[2],
                        backgroundColor: theme.colors.gray[50],
                        borderRadius: theme.borderRadius.md,
                        fontSize: theme.typography.fontSize.sm
                      }}
                    >
                      • {item.name} {item.estimatedValue && `(~₱${item.estimatedValue.toLocaleString()})`}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'price_reduction':
        return (
          <div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.primary[700],
                marginBottom: theme.spacing[2],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}
            >
              <BsCurrencyDollar />
              Price Offer
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <div 
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.gray[600]
                  }}
                >
                  Original Price
                </div>
                <div 
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.gray[400],
                    textDecoration: 'line-through'
                  }}
                >
                  ₱{originalPrice.toLocaleString()}
                </div>
              </div>
              
              <BsArrowRightCircle 
                style={{
                  color: theme.colors.primary[500],
                  fontSize: theme.typography.fontSize.lg
                }}
              />
              
              <div>
                <div 
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.gray[600]
                  }}
                >
                  Offered Price
                </div>
                <div 
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.success[600]
                  }}
                >
                  ₱{offeredPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {originalPrice > 0 && offeredPrice > 0 && (
              <div 
                style={{
                  padding: theme.spacing[2],
                  backgroundColor: theme.colors.success[50],
                  borderRadius: theme.borderRadius.md,
                  textAlign: 'center'
                }}
              >
                <span 
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.success[700]
                  }}
                >
                  Save ₱{(originalPrice - offeredPrice).toLocaleString()} 
                  ({Math.round(((originalPrice - offeredPrice) / originalPrice) * 100)}% off)
                </span>
              </div>
            )}

            {offerDescription && (
              <div 
                style={{
                  marginTop: theme.spacing[3],
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.gray[700],
                  fontStyle: 'italic'
                }}
              >
                "{offerDescription}"
              </div>
            )}
          </div>
        );

      default:
        return (
          <div 
            style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray[800]
            }}
          >
            {offerDescription || message.content}
          </div>
        );
    }
  };

  return (
    <div className={`${className}`}>
      
      {/* Offer Card */}
      <div 
        style={{
          backgroundColor: isOwnMessage ? theme.colors.primary[50] : theme.colors.white,
          border: `2px solid ${getOfferStatusColor()}`,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing[4],
          marginBottom: theme.spacing[3],
          position: 'relative'
        }}
      >
        
        {/* Status Badge */}
        <div 
          style={{
            position: 'absolute',
            top: theme.spacing[2],
            right: theme.spacing[2],
            padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
            backgroundColor: getOfferStatusColor(),
            color: theme.colors.white,
            borderRadius: theme.borderRadius.full,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold
          }}
        >
          {getOfferStatusText()}
        </div>

        {/* Offer Content */}
        <div style={{ marginTop: theme.spacing[4] }}>
          {renderOfferDetails()}
        </div>

        {/* Expiration */}
        {expiresAt && (
          <div 
            style={{
              marginTop: theme.spacing[3],
              padding: theme.spacing[2],
              backgroundColor: isExpired ? theme.colors.error[50] : theme.colors.warning[50],
              borderRadius: theme.borderRadius.md,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[2],
              fontSize: theme.typography.fontSize.xs,
              color: isExpired ? theme.colors.error[700] : theme.colors.warning[700]
            }}
          >
            <BsCalendar />
            {isExpired ? 'Expired' : 'Expires'} {formatDistanceToNow(new Date(expiresAt), { addSuffix: true })}
          </div>
        )}

        {/* Action Buttons */}
        {canInteract && (
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleAcceptOffer}
              disabled={isProcessing}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                backgroundColor: theme.colors.success[500],
                color: theme.colors.white,
                border: 'none',
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.7 : 1,
                transition: theme.animations.transition.all,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = theme.colors.success[600];
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.colors.success[500];
              }}
            >
              <BsCheckCircle />
              Accept Offer
            </button>

            <button
              onClick={handleRejectOffer}
              disabled={isProcessing}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                backgroundColor: 'transparent',
                color: theme.colors.error[600],
                border: `1px solid ${theme.colors.error[300]}`,
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.7 : 1,
                transition: theme.animations.transition.all,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = theme.colors.error[50];
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <BsXCircle />
              Decline
            </button>

            <button
              onClick={() => setShowCounterOfferForm(!showCounterOfferForm)}
              disabled={isProcessing}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                backgroundColor: 'transparent',
                color: theme.colors.primary[600],
                border: `1px solid ${theme.colors.primary[300]}`,
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.7 : 1,
                transition: theme.animations.transition.all,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2]
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = theme.colors.primary[50];
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <BsCurrencyDollar />
              Counter Offer
            </button>
          </div>
        )}

        {/* Counter Offer Form */}
        {showCounterOfferForm && (
          <div 
            style={{
              marginTop: theme.spacing[4],
              padding: theme.spacing[4],
              backgroundColor: theme.colors.gray[50],
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.gray[200]}`
            }}
          >
            <div 
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.gray[800],
                marginBottom: theme.spacing[3]
              }}
            >
              Make Counter Offer
            </div>

            <div className="space-y-3">
              <div>
                <label 
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.gray[700],
                    marginBottom: theme.spacing[1]
                  }}
                >
                  Your Offer (₱)
                </label>
                <input
                  type="number"
                  value={counterOfferValue}
                  onChange={(e) => setCounterOfferValue(e.target.value)}
                  placeholder="Enter your price"
                  style={{
                    width: '100%',
                    padding: theme.spacing[2],
                    border: `1px solid ${theme.colors.gray[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: theme.typography.fontSize.sm,
                    outline: 'none',
                    transition: theme.animations.transition.all
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary[500];
                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary[100]}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.colors.gray[300];
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label 
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.gray[700],
                    marginBottom: theme.spacing[1]
                  }}
                >
                  Message (optional)
                </label>
                <textarea
                  value={counterOfferDescription}
                  onChange={(e) => setCounterOfferDescription(e.target.value)}
                  placeholder="Add a message to your counter offer..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: theme.spacing[2],
                    border: `1px solid ${theme.colors.gray[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: theme.typography.fontSize.sm,
                    outline: 'none',
                    resize: 'none',
                    transition: theme.animations.transition.all
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary[500];
                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary[100]}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.colors.gray[300];
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCounterOffer}
                  disabled={isProcessing || !counterOfferValue.trim()}
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    backgroundColor: theme.colors.primary[500],
                    color: theme.colors.white,
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    cursor: (isProcessing || !counterOfferValue.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (isProcessing || !counterOfferValue.trim()) ? 0.7 : 1,
                    transition: theme.animations.transition.all
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcessing && counterOfferValue.trim()) {
                      e.target.style.backgroundColor = theme.colors.primary[600];
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary[500];
                  }}
                >
                  {isProcessing ? 'Sending...' : 'Send Counter Offer'}
                </button>

                <button
                  onClick={() => {
                    setShowCounterOfferForm(false);
                    setCounterOfferValue('');
                    setCounterOfferDescription('');
                  }}
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    backgroundColor: 'transparent',
                    color: theme.colors.gray[600],
                    border: `1px solid ${theme.colors.gray[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    cursor: 'pointer',
                    transition: theme.animations.transition.all
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.gray[100];
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferMessage;

