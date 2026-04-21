import { getOrderId, isOrderDelivered, isValidOrder } from '../utils/orderUtils'

export const initialState = {
  data: null,
  loading: false,
  error: null,
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'MARK_DELIVERED': {
      if (!state.data || !Array.isArray(state.data.orders)) {
        return state
      }

      const targetId = action.payload
      let hasUpdates = false
      const updatedOrders = state.data.orders.map((order) => {
        const orderId = getOrderId(order)
        if (String(orderId) !== String(targetId)) {
          return order
        }

        if (!isValidOrder(order) || isOrderDelivered(order)) {
          return order
        }

        hasUpdates = true
        return {
          ...order,
          isDelivered: true,
        }
      })

      if (!hasUpdates) {
        return state
      }

      return {
        ...state,
        data: {
          ...state.data,
          orders: updatedOrders,
        },
      }
    }
    default:
      return state
  }
}

export default appReducer
