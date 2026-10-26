export const WHATSAPP_PHONE_NUMBER = "919865683004"; // GIFTPocket WhatsApp Support & Order Desk

/**
 * Format structured WhatsApp Order message
 */
export const formatWhatsAppOrderMessage = ({
  orderId,
  customer,
  items,
  pricing
}) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  let message = `✨ *NEW ORDER FROM GIFTPOCKET STORE* ✨\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📦 *Order ID:* ${orderId}\n`;
  message += `📅 *Date:* ${currentDate}\n\n`;

  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• *Name:* ${customer.fullName || 'Customer'}\n`;
  message += `• *Phone:* ${customer.phone || 'N/A'}\n`;
  if (customer.email) message += `• *Email:* ${customer.email}\n`;
  message += `\n📍 *DELIVERY ADDRESS:*\n`;
  message += `${customer.street}, ${customer.city}, ${customer.state} - ${customer.pincode}\n`;
  if (customer.mapLocationUrl) {
    message += `🗺️ *Live Location Map:* ${customer.mapLocationUrl}\n`;
  }
  if (customer.notes) {
    message += `📝 *Notes / Gift Message:* ${customer.notes}\n`;
  }

  message += `\n🛍️ *ORDERED ITEMS (${items.length}):*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* x ${item.quantity}\n`;
    message += `   💰 Price: ₹${item.price * item.quantity} (₹${item.price} each)\n`;

    if (item.customization) {
      if (item.customization.name) {
        message += `   🔤 Custom Letters: "${item.customization.name}"\n`;
      }
      if (item.customization.colorTheme) {
        message += `   🎨 Palette/Cord: ${item.customization.colorTheme}\n`;
      }
      if (item.customization.frameShape) {
        message += `   ✨ Pendant Shape: ${item.customization.frameShape}\n`;
      }
      if (item.customization.photoFileName || item.customization.customPhoto) {
        message += `   📷 Photo Attached: Yes (${item.customization.photoFileName || 'Custom Photo'})\n`;
      }
      if (item.customization.notes) {
        message += `   💬 Special Note: ${item.customization.notes}\n`;
      }
    }
    if (item.isWholesale) {
      message += `   🏷️ Wholesale MOQ Tier Order\n`;
    }
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 *BILLING SUMMARY:*\n`;
  message += `• Subtotal: ₹${pricing.subtotal}\n`;
  if (pricing.discountAmount > 0) {
    message += `• Discount: -₹${pricing.discountAmount} ${pricing.couponCode ? `(${pricing.couponCode})` : ''}\n`;
  }
  message += `• Delivery Fee: ${pricing.shippingFee === 0 ? 'FREE (Special Offer)' : `₹${pricing.shippingFee}`}\n`;
  message += `• *GRAND TOTAL:* *₹${pricing.total}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `💬 _Please confirm my order and share UPI / QR payment details. Thank you!_ ♡`;

  return message;
};

/**
 * Generate full WhatsApp web / mobile deep link
 */
export const getWhatsAppOrderLink = (orderData, phoneNumber = WHATSAPP_PHONE_NUMBER) => {
  const message = formatWhatsAppOrderMessage(orderData);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
};
