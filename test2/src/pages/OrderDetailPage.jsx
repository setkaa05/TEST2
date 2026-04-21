import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {
  getCustomerName,
  getItemSubtotal,
  getOrderId,
  getOrderItems,
  getOrderRating,
  getOrderTotalAmount,
  isValidOrder,
} from '../utils/orderUtils'

const OrderDetailPage = () => {
  const { id } = useParams()
  const { data, loading, error } = useContext(AppContext)
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const validOrders = orders.filter((order) => isValidOrder(order))
  const selectedOrder = validOrders.find(
    (order) => String(getOrderId(order)) === String(id),
  )

  if (loading) {
    return (
      <section className="page">
        <p className="status-message">Loading data...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <p className="status-message">{error}</p>
      </section>
    )
  }

  if (!id || !selectedOrder) {
    return (
      <section className="page">
        <p className="status-message">order not found</p>
      </section>
    )
  }

  const customerName = getCustomerName(selectedOrder) || 'Unknown'
  const rating = getOrderRating(selectedOrder)
  const totalAmount = getOrderTotalAmount(selectedOrder)
  const items = getOrderItems(selectedOrder)
  const itemsTotal = items.reduce(
    (sum, item) => sum + getItemSubtotal(item),
    0,
  )

  return (
    <section className="page">
      <h1>Order Details</h1>
      <div className="item">
        <p>
          Order ID: <strong>{getOrderId(selectedOrder)}</strong>
        </p>
        <p>
          Customer: <strong>{customerName}</strong>
        </p>
        <p>Total Amount: {totalAmount ?? 'N/A'}</p>
        {rating !== null && <p>Rating: {rating}</p>}
        <p>Items Total: {itemsTotal}</p>
      </div>
      <h2>Items</h2>
      {items.length === 0 ? (
        <p className="status-message">No items available.</p>
      ) : (
        <ul className="item-list">
          {items.map((item, index) => {
            const subtotal = getItemSubtotal(item)
            const quantity = item?.quantity ?? item?.qty ?? 'N/A'
            const rate = item?.rate ?? item?.price ?? item?.unitPrice ?? 'N/A'
            const name = item?.name ?? item?.title ?? `Item ${index + 1}`

            return (
              <li key={`${name}-${index}`} className="item">
                <p>
                  {name} - Qty: {quantity} | Rate: {rate} | Subtotal: {subtotal}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default OrderDetailPage
