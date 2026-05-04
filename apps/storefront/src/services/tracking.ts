/**
 * Invisible tracking service for the NexusAI Storefront.
 * 
 * Sends fire-and-forget telemetry to the core-backend, which forwards
 * to the AI brain via RabbitMQ for persona classification.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Sends a tracking event to the backend.
 * Fire-and-forget: we don't await the response to avoid blocking UI.
 */
async function trackEvent(type: string, payload: Record<string, any>) {
  try {
    // Attempt to get a mock token for development purposes
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token') || '';
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Fire and forget, no await needed for UI rendering
    fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ type, payload }),
      // Keepalive ensures the request finishes even if the user navigates away
      keepalive: true, 
    }).catch(err => {
      // Silently fail in production so users don't see errors
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to track event:', err);
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error in tracking setup:', error);
    }
  }
}

/**
 * Track when a user views a product page.
 */
export function trackProductView(productId: string, categoryId?: string, source?: string) {
  trackEvent('PRODUCT_VIEW', {
    productId,
    categoryId,
    source,
    url: typeof window !== 'undefined' ? window.location.href : '',
  });
}

/**
 * Track when a user clicks on an element.
 */
export function trackClick(elementId: string, additionalData?: Record<string, any>) {
  trackEvent('CLICK', {
    elementId,
    url: typeof window !== 'undefined' ? window.location.href : '',
    ...additionalData
  });
}

/**
 * Track when a user completes a purchase.
 */
export function trackPurchase(productId: string, amount: number, orderId?: string) {
  trackEvent('PURCHASE', {
    productId,
    amount,
    orderId,
    currency: 'USD',
  });
}
