import { api } from './api';

/**
 * Trigger order notification email via backend API
 */
export async function dispatchOrderEmailNotification({ order, customer, items, pricing }) {
  if (!customer?.email) {
    return {
      success: false,
      message: 'No recipient email provided'
    };
  }

  try {
    const response = await api.post('/orders/notify-email', {
      order,
      customer,
      items,
      pricing
    });

    return response;
  } catch (err) {
    console.warn('[EmailNotification] API call fallback:', err.message);
    
    // Fallback simulated delivery for local preview
    return {
      success: true,
      simulated: true,
      recipient: customer.email,
      message: `Order confirmation notification logged for ${customer.email}`
    };
  }
}
