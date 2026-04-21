const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const getOrderId = (order) =>
  order?.id ?? order?.orderId ?? order?._id ?? null

export const getOrderItems = (order) =>
  Array.isArray(order?.items) ? order.items : []

export const getOrderTotalAmount = (order) => {
  const candidates = [
    order?.totalAmount,
    order?.total,
    order?.amount,
    order?.totalPrice,
    order?.total_price,
  ]
  const raw = candidates.find((value) => value !== undefined && value !== null)
  return toNumber(raw)
}

export const getCustomerName = (order) =>
  order?.customerName ||
  order?.customer?.name ||
  order?.customer ||
  order?.clientName ||
  null

export const getOrderRating = (order) =>
  toNumber(order?.rating ?? order?.rate)

export const getRestaurantName = (order) =>
  order?.restaurantName ||
  order?.restaurant ||
  order?.restaurant?.name ||
  order?.vendor ||
  null

export const isOrderDelivered = (order) => {
  if (!order || typeof order !== 'object') {
    return false
  }

  if (typeof order.isDelivered === 'boolean') {
    return order.isDelivered
  }

  if (typeof order.delivered === 'boolean') {
    return order.delivered
  }

  const status = normalizeText(
    order.status || order.state || order.orderStatus || order.deliveryStatus,
  )
  return status === 'delivered'
}

export const getItemSubtotal = (item) => {
  const quantity = toNumber(item?.quantity ?? item?.qty) ?? 0
  const rate = toNumber(item?.rate ?? item?.price ?? item?.unitPrice) ?? 0
  return quantity * rate
}

export const isValidOrder = (order) => {
  if (!order || typeof order !== 'object') {
    return false
  }

  const items = getOrderItems(order)
  if (items.length === 0) {
    return false
  }

  const orderQuantity = toNumber(order?.quantity)
  if (orderQuantity !== null && orderQuantity < 0) {
    return false
  }

  const hasInvalidItemQty = items.some((item) => {
    const qty = toNumber(item?.quantity ?? item?.qty)
    return qty !== null && qty < 0
  })
  if (hasInvalidItemQty) {
    return false
  }

  const totalAmount = getOrderTotalAmount(order)
  return totalAmount !== null && totalAmount >= 0
}

export const normalizeOrderSearch = (order) =>
  JSON.stringify(order || '').toLowerCase()
