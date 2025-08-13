import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BuyerLayout from '../../Buyer/Buyer_Menu/Buyer_Layout/Buyer_layout';
import { theme } from '../../../../styles/designSystem';
import dataService from '../../../../services/dataService';

const Item = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Product interaction state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Load product data
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // If no itemId provided, use a default product
        const targetItemId = itemId || 'canon-eos-2000d-kit';

        // Load product data
        const productData = await dataService.getProductById(targetItemId);
        setProduct(productData);

        // Load store data
        const storeData = await dataService.getStoreById(productData.storeId);
        setStore(storeData);

        // Load reviews for this product
        const reviewsResult = await dataService.getProductReviews(targetItemId, {
          page: 1,
          limit: 10,
          sortBy: 'newest'
        });
        setReviews(reviewsResult.reviews);

        // Load related products from same category
        const relatedResult = await dataService.getAllProducts({
          category: productData.category.id,
          limit: 8,
          sortBy: 'featured'
        });
        const filteredRelated = relatedResult.products
          .filter(p => p.id !== targetItemId)
          .slice(0, 4);
        setRelatedProducts(filteredRelated);

      } catch (err) {
        console.error('Error loading product data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [itemId]);

  // Loading state
  if (loading) {
    return (
      <BuyerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: theme.spacing[3],
            color: theme.colors.gray[600]
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: `3px solid ${theme.colors.gray[200]}`,
              borderTop: `3px solid ${theme.colors.primary[500]}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span>Loading product details...</span>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <BuyerLayout>
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ gap: theme.spacing[4] }}>
          <div style={{ color: theme.colors.error[500], fontSize: theme.typography.fontSize['2xl'] }}>
            Product not found
          </div>
          <div style={{ color: theme.colors.gray[600] }}>
            {error || 'The product you are looking for does not exist.'}
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              ...theme.components.button.size.md,
              ...theme.components.button.variant.primary,
              transition: theme.animations.transition.all
            }}
          >
            Back to Home
          </button>
        </div>
      </BuyerLayout>
    );
  }

  // Calculate discount percentage
  const discountPercentage = product.price.discount || Math.round(((product.price.original - product.price.current) / product.price.original) * 100);

  return (
    <BuyerLayout>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
        paddingTop: theme.spacing[8],
        paddingBottom: theme.spacing[12]
      }}>
        {/* Breadcrumb Navigation */}
        <div style={{ 
          maxWidth: theme.layout.container['2xl'], 
          margin: '0 auto', 
          padding: `0 ${theme.spacing[6]}`,
          marginBottom: theme.spacing[6]
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray[600]
          }}>
            <span 
              onClick={() => navigate('/')}
              style={{ 
                cursor: 'pointer',
                color: theme.colors.primary[600],
                textDecoration: 'none'
              }}
            >
              Home
            </span>
            <span>›</span>
            <span 
              onClick={() => navigate(`/search?categories=${product.category.id}`)}
              style={{ 
                cursor: 'pointer',
                color: theme.colors.primary[600],
                textDecoration: 'none'
              }}
            >
              {product.category.name}
            </span>
            <span>›</span>
            <span style={{ color: theme.colors.gray[900] }}>{product.name}</span>
          </div>
        </div>

        {/* Main Product Section */}
        <div style={{ 
          maxWidth: theme.layout.container['2xl'], 
          margin: '0 auto', 
          padding: `0 ${theme.spacing[6]}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: theme.spacing[12],
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            padding: theme.spacing[8],
            boxShadow: theme.shadows.lg,
            marginBottom: theme.spacing[8]
          }}>
            {/* Image Gallery Section */}
            <div style={{ minWidth: '320px' }}>
              {/* Main Product Image */}
              <div style={{
                position: 'relative',
                backgroundColor: theme.colors.gray[50],
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing[4],
                marginBottom: theme.spacing[4],
                aspectRatio: '1/1',
                overflow: 'hidden',
                cursor: 'zoom-in'
              }}
              onClick={() => setIsImageModalOpen(true)}
              >
                <img 
                  src={product.images[selectedImage]?.url || '/placeholder-product.jpg'} 
                  alt={product.images[selectedImage]?.alt || product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: theme.animations.transition.transform
                  }}
                />
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: theme.spacing[4],
                    left: theme.spacing[4],
                    backgroundColor: theme.colors.error[500],
                    color: theme.colors.white,
                    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.full,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.semibold
                  }}>
                    -{discountPercentage}%
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                  }}
                  style={{
                    position: 'absolute',
                    top: theme.spacing[4],
                    right: theme.spacing[4],
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.white,
                    border: `1px solid ${theme.colors.gray[300]}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: theme.shadows.sm,
                    transition: theme.animations.transition.all
                  }}
                >
                  <span style={{ 
                    fontSize: '20px',
                    color: isWishlisted ? theme.colors.error[500] : theme.colors.gray[400]
                  }}>
                    {isWishlisted ? '❤️' : '🤍'}
                  </span>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div style={{
                display: 'flex',
                gap: theme.spacing[3],
                overflowX: 'auto',
                paddingBottom: theme.spacing[2]
              }}>
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      flexShrink: 0,
                      width: '80px',
                      height: '80px',
                      borderRadius: theme.borderRadius.lg,
                      border: selectedImage === idx 
                        ? `2px solid ${theme.colors.primary[500]}` 
                        : `1px solid ${theme.colors.gray[300]}`,
                      backgroundColor: theme.colors.gray[50],
                      padding: theme.spacing[2],
                      cursor: 'pointer',
                      transition: theme.animations.transition.all,
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={image.url || '/placeholder-product.jpg'} 
                      alt={image.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div style={{ minWidth: '320px' }}>
              {/* Product Title & Brand */}
              <div style={{ marginBottom: theme.spacing[6] }}>
                <div style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.primary[600],
                  fontWeight: theme.typography.fontWeight.medium,
                  marginBottom: theme.spacing[2]
                }}>
                  {product.brand?.name}
                </div>
                <h1 style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.gray[900],
                  lineHeight: theme.typography.lineHeight.tight,
                  marginBottom: theme.spacing[3]
                }}>
                  {product.name}
                </h1>
                
                {/* Rating & Reviews */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing[4],
                  marginBottom: theme.spacing[4]
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[1] }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ 
                          color: i < Math.floor(product.rating.average) 
                            ? theme.colors.secondary[400] 
                            : theme.colors.gray[300],
                          fontSize: theme.typography.fontSize.sm
                        }}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.gray[600],
                      fontWeight: theme.typography.fontWeight.medium
                    }}>
                      {product.rating.average}
                    </span>
                  </div>
                  <span style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.gray[500]
                  }}>
                    ({product.rating.count} reviews)
                  </span>
                  <span style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.gray[500]
                  }}>
                    {product.sales.totalSold} sold
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div style={{ 
                marginBottom: theme.spacing[6],
                padding: theme.spacing[4],
                backgroundColor: theme.colors.gray[50],
                borderRadius: theme.borderRadius.xl
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: theme.spacing[3] }}>
                  <span style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.gray[900]
                  }}>
                    ₱{product.price.current.toLocaleString()}
                  </span>
                  {product.price.original > product.price.current && (
                    <span style={{
                      fontSize: theme.typography.fontSize.lg,
                      color: theme.colors.gray[500],
                      textDecoration: 'line-through'
                    }}>
                      ₱{product.price.original.toLocaleString()}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.gray[600],
                  marginTop: theme.spacing[1]
                }}>
                  {product.shipping.freeShipping && "✅ Free shipping"} • {product.warranty}
                </div>
              </div>

              {/* Stock Status */}
              <div style={{ marginBottom: theme.spacing[6] }}>
                {product.stock.inStock ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing[2],
                    color: product.stock.quantity <= product.stock.lowStockThreshold 
                      ? theme.colors.warning[600] 
                      : theme.colors.success[600],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium
                  }}>
                    <span>●</span>
                    {product.stock.quantity <= product.stock.lowStockThreshold 
                      ? `Only ${product.stock.quantity} left in stock!` 
                      : `${product.stock.quantity} in stock`}
                  </div>
                ) : (
                  <div style={{
                    color: theme.colors.error[600],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing[2]
                  }}>
                    <span>●</span>
                    Out of stock
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div style={{ 
                marginBottom: theme.spacing[6],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[4]
              }}>
                <span style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.gray[700],
                  minWidth: '60px'
                }}>
                  Quantity:
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1px solid ${theme.colors.gray[300]}`,
                  borderRadius: theme.borderRadius.lg,
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.colors.gray[50],
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: theme.typography.fontSize.lg,
                      color: theme.colors.gray[600]
                    }}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '60px',
                      height: '40px',
                      textAlign: 'center',
                      border: 'none',
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.medium
                    }}
                    min="1"
                    max={product.stock.quantity}
                  />
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock.quantity, q + 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.colors.gray[50],
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: theme.typography.fontSize.lg,
                      color: theme.colors.gray[600]
                    }}
                    disabled={quantity >= product.stock.quantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
                marginBottom: theme.spacing[8]
              }}>
                <button
                  disabled={!product.stock.inStock}
                  style={{
                    ...theme.components.button.size.lg,
                    backgroundColor: product.stock.inStock 
                      ? theme.colors.primary[500] 
                      : theme.colors.gray[300],
                    color: theme.colors.white,
                    border: 'none',
                    borderRadius: theme.borderRadius.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    cursor: product.stock.inStock ? 'pointer' : 'not-allowed',
                    transition: theme.animations.transition.all,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (product.stock.inStock) {
                      e.target.style.backgroundColor = theme.colors.primary[600];
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = product.stock.inStock 
                      ? theme.colors.primary[500] 
                      : theme.colors.gray[300];
                  }}
                >
                  {product.stock.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  style={{
                    ...theme.components.button.size.lg,
                    backgroundColor: 'transparent',
                    color: theme.colors.primary[600],
                    border: `2px solid ${theme.colors.primary[500]}`,
                    borderRadius: theme.borderRadius.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    cursor: 'pointer',
                    transition: theme.animations.transition.all,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary[50];
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Store Information */}
              {store && (
                <div style={{
                  padding: theme.spacing[4],
                  backgroundColor: theme.colors.gray[50],
                  borderRadius: theme.borderRadius.xl,
                  marginBottom: theme.spacing[6]
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing[3],
                    marginBottom: theme.spacing[3]
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: theme.colors.primary[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: theme.typography.fontSize.lg
                    }}>
                      🏪
                    </div>
                    <div>
                      <div style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.gray[900],
                        marginBottom: '2px'
                      }}>
                        {store.name}
                      </div>
                      <div style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.gray[600],
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing[2]
                      }}>
                        <span>⭐ {store.rating}</span>
                        <span>•</span>
                        <span>{store.location.city}</span>
                        {store.verified && (
                          <>
                            <span>•</span>
                            <span style={{ color: theme.colors.success[600] }}>✅ Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/store/${store.storeId}`)}
                    style={{
                      width: '100%',
                      padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.colors.gray[300]}`,
                      borderRadius: theme.borderRadius.lg,
                      color: theme.colors.gray[700],
                      fontSize: theme.typography.fontSize.sm,
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
                    Visit Store
                  </button>
                </div>
              )}

              {/* Shipping Information */}
              <div style={{
                border: `1px solid ${theme.colors.gray[200]}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing[4]
              }}>
                <h3 style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.gray[900],
                  marginBottom: theme.spacing[3]
                }}>
                  Shipping & Returns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                    <span style={{ color: theme.colors.success[600] }}>🚚</span>
                    <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[600] }}>
                      {product.shipping.freeShipping ? 'Free shipping' : `₱${product.shipping.cost}`} • 
                      Delivery in {product.shipping.estimatedDays}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                    <span style={{ color: theme.colors.primary[600] }}>↩️</span>
                    <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[600] }}>
                      Free returns within 30 days
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                    <span style={{ color: theme.colors.secondary[600] }}>🛡️</span>
                    <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[600] }}>
                      {product.warranty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content Section */}
          <div style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            padding: theme.spacing[8],
            boxShadow: theme.shadows.lg,
            marginBottom: theme.spacing[8]
          }}>
            {/* Tab Navigation */}
            <div style={{
              borderBottom: `1px solid ${theme.colors.gray[200]}`,
              marginBottom: theme.spacing[6]
            }}>
              <div style={{ display: 'flex', gap: theme.spacing[8] }}>
                {['overview', 'specifications', 'reviews', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: `${theme.spacing[3]} ${theme.spacing[1]}`,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: activeTab === tab 
                        ? theme.typography.fontWeight.semibold 
                        : theme.typography.fontWeight.medium,
                      color: activeTab === tab 
                        ? theme.colors.primary[600] 
                        : theme.colors.gray[600],
                      borderBottom: activeTab === tab 
                        ? `2px solid ${theme.colors.primary[500]}` 
                        : '2px solid transparent',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: theme.animations.transition.all,
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
                  <div>
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.gray[900],
                      marginBottom: theme.spacing[3]
                    }}>
                      Product Description
                    </h3>
                    <p style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.gray[700],
                      lineHeight: theme.typography.lineHeight.relaxed,
                      marginBottom: theme.spacing[4]
                    }}>
                      {product.longDescription || product.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.gray[900],
                        marginBottom: theme.spacing[3]
                      }}>
                        Key Features
                      </h3>
                      <ul style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: theme.spacing[3]
                      }}>
                        {product.features.map((feature, index) => (
                          <li key={index} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: theme.spacing[2],
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700]
                          }}>
                            <span style={{ 
                              color: theme.colors.success[500],
                              marginTop: '2px',
                              flexShrink: 0
                            }}>
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What's Included */}
                  {product.included && product.included.length > 0 && (
                    <div>
                      <h3 style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.gray[900],
                        marginBottom: theme.spacing[3]
                      }}>
                        What's in the Box
                      </h3>
                      <ul style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing[2]
                      }}>
                        {product.included.map((item, index) => (
                          <li key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing[2],
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700]
                          }}>
                            <span style={{ 
                              color: theme.colors.primary[500],
                              fontSize: '16px'
                            }}>
                              📦
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div>
                  <h3 style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.gray[900],
                    marginBottom: theme.spacing[4]
                  }}>
                    Technical Specifications
                  </h3>
                  {product.specifications ? (
                    <div style={{
                      display: 'grid',
                      gap: theme.spacing[1],
                      border: `1px solid ${theme.colors.gray[200]}`,
                      borderRadius: theme.borderRadius.lg,
                      overflow: 'hidden'
                    }}>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={key} style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 2fr',
                          backgroundColor: index % 2 === 0 
                            ? theme.colors.gray[50] 
                            : theme.colors.white
                        }}>
                          <div style={{
                            padding: theme.spacing[3],
                            fontSize: theme.typography.fontSize.sm,
                            fontWeight: theme.typography.fontWeight.medium,
                            color: theme.colors.gray[700]
                          }}>
                            {key}
                          </div>
                          <div style={{
                            padding: theme.spacing[3],
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[900]
                          }}>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.gray[500],
                      fontStyle: 'italic'
                    }}>
                      No specifications available for this product.
                    </p>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: theme.spacing[6]
                  }}>
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.gray[900]
                    }}>
                      Customer Reviews
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[3],
                      padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                      backgroundColor: theme.colors.gray[50],
                      borderRadius: theme.borderRadius.lg
                    }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ 
                            color: i < Math.floor(product.rating.average) 
                              ? theme.colors.secondary[400] 
                              : theme.colors.gray[300],
                            fontSize: theme.typography.fontSize.base
                          }}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span style={{
                        fontSize: theme.typography.fontSize.lg,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.gray[900]
                      }}>
                        {product.rating.average}
                      </span>
                      <span style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.gray[600]
                      }}>
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Reviews List */}
                  {reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
                      {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} style={{
                          padding: theme.spacing[4],
                          border: `1px solid ${theme.colors.gray[200]}`,
                          borderRadius: theme.borderRadius.lg
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing[3],
                            marginBottom: theme.spacing[3]
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: theme.colors.primary[100],
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: theme.typography.fontSize.lg
                            }}>
                              👤
                            </div>
                            <div>
                              <div style={{
                                fontSize: theme.typography.fontSize.sm,
                                fontWeight: theme.typography.fontWeight.semibold,
                                color: theme.colors.gray[900],
                                marginBottom: '2px'
                              }}>
                                {review.userName}
                                {review.verified && (
                                  <span style={{
                                    marginLeft: theme.spacing[2],
                                    color: theme.colors.success[600],
                                    fontSize: theme.typography.fontSize.xs
                                  }}>
                                    ✅ Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: theme.spacing[2]
                              }}>
                                <div style={{ display: 'flex', gap: '1px' }}>
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ 
                                      color: i < review.rating 
                                        ? theme.colors.secondary[400] 
                                        : theme.colors.gray[300],
                                      fontSize: theme.typography.fontSize.sm
                                    }}>
                                      ⭐
                                    </span>
                                  ))}
                                </div>
                                <span style={{
                                  fontSize: theme.typography.fontSize.xs,
                                  color: theme.colors.gray[500]
                                }}>
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          {review.title && (
                            <h4 style={{
                              fontSize: theme.typography.fontSize.base,
                              fontWeight: theme.typography.fontWeight.semibold,
                              color: theme.colors.gray[900],
                              marginBottom: theme.spacing[2]
                            }}>
                              {review.title}
                            </h4>
                          )}
                          <p style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700],
                            lineHeight: theme.typography.lineHeight.relaxed,
                            marginBottom: theme.spacing[3]
                          }}>
                            {review.comment}
                          </p>
                          {(review.pros?.length > 0 || review.cons?.length > 0) && (
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: theme.spacing[4],
                              marginBottom: theme.spacing[3]
                            }}>
                              {review.pros?.length > 0 && (
                                <div>
                                  <h5 style={{
                                    fontSize: theme.typography.fontSize.sm,
                                    fontWeight: theme.typography.fontWeight.semibold,
                                    color: theme.colors.success[600],
                                    marginBottom: theme.spacing[2]
                                  }}>
                                    👍 Pros
                                  </h5>
                                  <ul style={{ paddingLeft: theme.spacing[4] }}>
                                    {review.pros.map((pro, index) => (
                                      <li key={index} style={{
                                        fontSize: theme.typography.fontSize.xs,
                                        color: theme.colors.gray[600],
                                        marginBottom: theme.spacing[1]
                                      }}>
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {review.cons?.length > 0 && (
                                <div>
                                  <h5 style={{
                                    fontSize: theme.typography.fontSize.sm,
                                    fontWeight: theme.typography.fontWeight.semibold,
                                    color: theme.colors.warning[600],
                                    marginBottom: theme.spacing[2]
                                  }}>
                                    👎 Cons
                                  </h5>
                                  <ul style={{ paddingLeft: theme.spacing[4] }}>
                                    {review.cons.map((con, index) => (
                                      <li key={index} style={{
                                        fontSize: theme.typography.fontSize.xs,
                                        color: theme.colors.gray[600],
                                        marginBottom: theme.spacing[1]
                                      }}>
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing[4],
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.gray[500]
                          }}>
                            <span>👍 {review.helpful} found this helpful</span>
                          </div>
                        </div>
                      ))}
                      {reviews.length > 3 && (
                        <button
                          style={{
                            ...theme.components.button.size.md,
                            backgroundColor: 'transparent',
                            color: theme.colors.primary[600],
                            border: `1px solid ${theme.colors.primary[500]}`,
                            borderRadius: theme.borderRadius.lg,
                            fontWeight: theme.typography.fontWeight.medium,
                            cursor: 'pointer',
                            transition: theme.animations.transition.all
                          }}
                        >
                          View All Reviews ({reviews.length})
                        </button>
                      )}
                    </div>
                  ) : (
                    <p style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.gray[500],
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: theme.spacing[8]
                    }}>
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              )}

              {/* Shipping Tab */}
              {activeTab === 'shipping' && (
                <div>
                  <h3 style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.gray[900],
                    marginBottom: theme.spacing[4]
                  }}>
                    Shipping & Returns
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: theme.spacing[6]
                  }}>
                    <div style={{
                      padding: theme.spacing[4],
                      backgroundColor: theme.colors.gray[50],
                      borderRadius: theme.borderRadius.lg
                    }}>
                      <h4 style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.gray[900],
                        marginBottom: theme.spacing[3],
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing[2]
                      }}>
                        🚚 Shipping Information
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                        <div style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.gray[700]
                        }}>
                          <strong>Delivery Time:</strong> {product.shipping.estimatedDays}
                        </div>
                        <div style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.gray[700]
                        }}>
                          <strong>Weight:</strong> {product.shipping.weight}
                        </div>
                        <div style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.gray[700]
                        }}>
                          <strong>Dimensions:</strong> {product.shipping.dimensions}
                        </div>
                        <div style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: product.shipping.freeShipping ? theme.colors.success[600] : theme.colors.gray[700]
                        }}>
                          <strong>Cost:</strong> {product.shipping.freeShipping ? 'Free shipping' : `₱${product.shipping.cost}`}
                        </div>
                      </div>
                    </div>

                    {store && (
                      <div style={{
                        padding: theme.spacing[4],
                        backgroundColor: theme.colors.gray[50],
                        borderRadius: theme.borderRadius.lg
                      }}>
                        <h4 style={{
                          fontSize: theme.typography.fontSize.base,
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.gray[900],
                          marginBottom: theme.spacing[3],
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing[2]
                        }}>
                          🏪 Store Policies
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                          <div style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700]
                          }}>
                            <strong>Shipping:</strong> {store.policies.shipping}
                          </div>
                          <div style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700]
                          }}>
                            <strong>Returns:</strong> {store.policies.returns}
                          </div>
                          <div style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.gray[700]
                          }}>
                            <strong>Payment:</strong> {store.policies.payment}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{
              backgroundColor: theme.colors.white,
              borderRadius: theme.borderRadius['2xl'],
              padding: theme.spacing[8],
              boxShadow: theme.shadows.lg
            }}>
              <h3 style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.gray[900],
                marginBottom: theme.spacing[6],
                textAlign: 'center'
              }}>
                You Might Also Like
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: theme.spacing[6]
              }}>
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    onClick={() => navigate(`/item/${relatedProduct.id}`)}
                    style={{
                      border: `1px solid ${theme.colors.gray[200]}`,
                      borderRadius: theme.borderRadius.xl,
                      padding: theme.spacing[4],
                      cursor: 'pointer',
                      transition: theme.animations.transition.all,
                      backgroundColor: theme.colors.white
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = theme.shadows.lg;
                      e.target.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      aspectRatio: '1/1',
                      backgroundColor: theme.colors.gray[50],
                      borderRadius: theme.borderRadius.lg,
                      marginBottom: theme.spacing[3],
                      overflow: 'hidden'
                    }}>
                      <img
                        src={relatedProduct.images[0]?.url || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <h4 style={{
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.gray[900],
                      marginBottom: theme.spacing[1],
                      lineHeight: theme.typography.lineHeight.tight
                    }}>
                      {relatedProduct.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[2],
                      marginBottom: theme.spacing[2]
                    }}>
                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ 
                            color: i < Math.floor(relatedProduct.rating.average) 
                              ? theme.colors.secondary[400] 
                              : theme.colors.gray[300],
                            fontSize: theme.typography.fontSize.xs
                          }}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.gray[500]
                      }}>
                        ({relatedProduct.rating.count})
                      </span>
                    </div>
                    <div style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.gray[900]
                    }}>
                      ₱{relatedProduct.price.current.toLocaleString()}
                    </div>
                    {relatedProduct.price.original > relatedProduct.price.current && (
                      <div style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.gray[500],
                        textDecoration: 'line-through'
                      }}>
                        ₱{relatedProduct.price.original.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Item;
