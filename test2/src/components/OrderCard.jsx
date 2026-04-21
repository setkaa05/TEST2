import { Link } from 'react-router-dom'
import {
  getCustomerName,
  getOrderId,
  getOrderRating,
  getOrderTotalAmount,
  getRestaurantName,
} from '../utils/orderUtils'

const OrderCard = ({ order, onMarkDelivered }) => {
  const orderId = getOrderId(order)
  const customerName = getCustomerName(order) || 'Unknown'
  const totalAmount = getOrderTotalAmount(order)
  const rating = getOrderRating(order)
  const restaurantName = getRestaurantName(order)

  return (
    <div className="item order-card" data-testid="order-item">
      <h2>Order {orderId ?? 'N/A'}</h2>
      {restaurantName && <p>Restaurant: {restaurantName}</p>}
      <p>
        Customer: <strong>{customerName}</strong>
      </p>
      <p>Total Amount: {totalAmount ?? 'N/A'}</p>
      {rating !== null && <p>Rating: {rating}</p>}
      {onMarkDelivered && orderId && (
        <button
          className="action-button"
          type="button"
          onClick={() => onMarkDelivered(orderId)}
        >
          Mark Delivered
        </button>
      )}
      {orderId && (
        <Link className="nav-link" to={`/orders/compact/${orderId}`}>
          View Details
        </Link>
      )}
    </div>
  )
}

export default OrderCard
