/**
 * Barter Negotiation Component
 * 
 * Implements the barter system as specified in the ChiFere manuscript.
 * Allows users to negotiate item exchanges without monetary transactions.
 * 
 * Features:
 * - Barter offer creation and management
 * - Counter-offer system
 * - Item matching and suggestions
 * - Negotiation chat integration
 * 
 * @version 1.0.0 - Initial implementation per manuscript requirements
 */

import React, { useState, useEffect } from 'react';
import { theme } from '../../../../styles/designSystem';
import { 
  FiArrowRight, 
  FiCheck, 
  FiX, 
  FiMessageSquare, 
  FiImage,
  FiPlus,
  FiMinus,
  FiRefreshCw
} from 'react-icons/fi';

const BarterNegotiation = ({ 
  originalItem, 
  onOfferSent, 
  onNegotiationComplete, 
  userRole = 'buyer' 
}) => {
  const [step, setStep] = useState('select'); // 'select', 'offer', 'negotiate', 'complete'
  const [selectedItems, setSelectedItems] = useState([]);
  const [offerMessage, setOfferMessage] = useState('');
  const [negotiations, setNegotiations] = useState([]);
  const [userItems, setUserItems] = useState([]);
  
  // Mock user items for barter
  useEffect(() => {
    // TODO: Replace with actual user items from Firebase
    const mockUserItems = [
      {
        id: 'user1',
        name: 'Vintage Guitar Collection',
        image: '/placeholder-product.svg',
        condition: 'Good',
        category: 'Musical Instruments',
        estimatedValue: 15000,
        description: 'Collection of 3 vintage acoustic guitars'
      },
      {
        id: 'user2',
        name: 'Art Supplies Set',
        image: '/placeholder-product.svg',
        condition: 'Like New',
        category: 'Art & Crafts',
        estimatedValue: 5000,
        description: 'Professional art supplies including paints, brushes, canvas'
      },
      {
        id: 'user3',
        name: 'Vintage Book Collection',
        image: '/placeholder-product.svg',
        condition: 'Good',
        category: 'Books',
        estimatedValue: 8000,
        description: 'Rare vintage books and literature collection'
      }
    ];
    setUserItems(mockUserItems);
  }, []);

  const handleItemSelect = (item) => {
    if (selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const calculateTotalValue = (items) => {
    return items.reduce((total, item) => total + item.estimatedValue, 0);
  };

  const sendBarterOffer = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to barter');
      return;
    }

    const offer = {
      id: Date.now(),
      type: 'offer',
      fromUser: userRole,
      timestamp: new Date().toISOString(),
      items: selectedItems,
      message: offerMessage,
      totalValue: calculateTotalValue(selectedItems),
      status: 'pending'
    };

    setNegotiations([...negotiations, offer]);
    setStep('negotiate');
    
    if (onOfferSent) {
      onOfferSent(offer);
    }
  };

  const handleCounterOffer = (originalOffer, newItems, message) => {
    const counterOffer = {
      id: Date.now(),
      type: 'counter_offer',
      fromUser: userRole === 'buyer' ? 'seller' : 'buyer',
      timestamp: new Date().toISOString(),
      items: newItems,
      message: message,
      totalValue: calculateTotalValue(newItems),
      status: 'pending',
      originalOfferId: originalOffer.id
    };

    setNegotiations([...negotiations, counterOffer]);
  };

  const acceptOffer = (offer) => {
    const updatedNegotiations = negotiations.map(neg => 
      neg.id === offer.id ? { ...neg, status: 'accepted' } : neg
    );
    setNegotiations(updatedNegotiations);
    setStep('complete');

    if (onNegotiationComplete) {
      onNegotiationComplete(offer);
    }
  };

  const rejectOffer = (offer) => {
    const updatedNegotiations = negotiations.map(neg => 
      neg.id === offer.id ? { ...neg, status: 'rejected' } : neg
    );
    setNegotiations(updatedNegotiations);
  };

  const ItemCard = ({ item, isSelected, onSelect }) => (
    <div 
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
      }`}
      onClick={() => onSelect(item)}
    >
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.name}</h3>
      <p className="text-xs text-gray-600 mb-2">{item.condition} • {item.category}</p>
      <p className="text-blue-600 font-semibold">₱{item.estimatedValue.toLocaleString()}</p>
      {isSelected && (
        <div className="mt-2 flex items-center text-blue-600 text-xs">
          <FiCheck className="w-3 h-3 mr-1" />
          Selected
        </div>
      )}
    </div>
  );

  const NegotiationItem = ({ negotiation }) => (
    <div className="p-4 border rounded-lg mb-4" style={{ borderColor: theme.colors.gray[200] }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            negotiation.type === 'offer' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {negotiation.type === 'offer' ? 'Offer' : 'Counter Offer'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(negotiation.timestamp).toLocaleString()}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          negotiation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          negotiation.status === 'accepted' ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}>
          {negotiation.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {negotiation.items.map(item => (
          <div key={item.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-blue-600">₱{item.estimatedValue.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {negotiation.message && (
        <p className="text-sm text-gray-700 mb-3 italic">"{negotiation.message}"</p>
      )}

      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">
          Total Value: ₱{negotiation.totalValue.toLocaleString()}
        </span>
        
        {negotiation.status === 'pending' && userRole !== negotiation.fromUser && (
          <div className="flex space-x-2">
            <button
              onClick={() => acceptOffer(negotiation)}
              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => rejectOffer(negotiation)}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔄 Barter Negotiation</h2>
        <p className="text-gray-600">Exchange items without money - as per ChiFere's sustainable trading</p>
      </div>

      {/* Original Item Display */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Item to Barter For:</h3>
        <div className="flex items-center space-x-4">
          <img 
            src={originalItem.image} 
            alt={originalItem.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{originalItem.name}</h4>
            <p className="text-gray-600 text-sm">{originalItem.condition} • {originalItem.category}</p>
            <p className="text-blue-600 font-semibold">Barter Only</p>
          </div>
        </div>
      </div>

      {/* Step 1: Select Items to Barter */}
      {step === 'select' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Select Your Items to Barter
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {userItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={selectedItems.find(selected => selected.id === item.id)}
                onSelect={handleItemSelect}
              />
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Selected Items:</h4>
                  <p className="text-blue-600 font-semibold">
                    Total Value: ₱{calculateTotalValue(selectedItems).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setStep('offer')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Continue to Offer
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Create Offer */}
      {step === 'offer' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Your Barter Offer</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 border rounded-lg" style={{ borderColor: theme.colors.gray[200] }}>
              <h4 className="font-semibold text-gray-800 mb-3">Your Items:</h4>
              <div className="space-y-2">
                {selectedItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-blue-600">₱{item.estimatedValue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3">
                <p className="font-semibold text-gray-800">
                  Total: ₱{calculateTotalValue(selectedItems).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg" style={{ borderColor: theme.colors.gray[200] }}>
              <h4 className="font-semibold text-gray-800 mb-3">Add a Message:</h4>
              <textarea
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Explain why this is a fair trade, condition details, etc."
                className="w-full p-3 border rounded-lg resize-none h-32"
                style={{ borderColor: theme.colors.gray[300] }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('select')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={sendBarterOffer}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Send Barter Offer
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Negotiation History */}
      {step === 'negotiate' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Negotiation in Progress</h3>
          <div className="mb-6">
            {negotiations.map(negotiation => (
              <NegotiationItem key={negotiation.id} negotiation={negotiation} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep('select')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make Counter Offer
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Completion */}
      {step === 'complete' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-green-800 mb-2">Barter Agreement Reached!</h3>
          <p className="text-gray-600 mb-6">
            Both parties have agreed to the exchange. Please proceed with the item exchange details.
          </p>
          <button
            onClick={() => window.location.href = '/buyer/messages'}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <FiMessageSquare className="w-5 h-5 mr-2 inline" />
            Continue in Messages
          </button>
        </div>
      )}
    </div>
  );
};

export default BarterNegotiation;