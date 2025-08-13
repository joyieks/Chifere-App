import React from 'react';
import Navigation from '../../../../Navigation';
import theme from '../../../../../styles/designSystem';

/**
 * BuyerLayout - Simplified layout component for buyer pages
 * 
 * This component provides a consistent layout for buyer-specific pages
 * with promotional bar and enhanced navigation features.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} props.showPromotionalBar - Whether to show the promotional bar
 * @param {string} props.backgroundColor - Background color for the main content
 */
const BuyerLayout = ({ 
  children, 
  showPromotionalBar = true, 
  backgroundColor = theme.colors.background.accent 
}) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor }}>
      {/* Enhanced Navigation with promotional bar */}
      <Navigation 
        showPromotionalBar={showPromotionalBar} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default BuyerLayout;
