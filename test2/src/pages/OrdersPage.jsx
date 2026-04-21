import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import OrderCard from '../components/OrderCard'
import { getOrderId, isOrderDelivered, isValidOrder } from '../utils/orderUtils'

const OrdersPage = () => {
  const { data, loading, error, dispatch } = useContext(AppContext)
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const validOrders = orders.filter((order) => isValidOrder(order))
  const pendingOrders = validOrders.filter((order) => !isOrderDelivered(order))

  const handleMarkDelivered = (orderId) => {
    if (!orderId) {
      return
    }
    dispatch({ type: 'MARK_DELIVERED', payload: orderId })
  }

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

  return (
    <section className="page">
      <h1>Orders</h1>
      {pendingOrders.length === 0 ? (
        <p className="status-message">No pending orders available.</p>
      ) : (
        <div className="item-list">
          {pendingOrders.map((order, index) => (
            <OrderCard
              key={getOrderId(order) ?? index}
              order={order}
              onMarkDelivered={handleMarkDelivered}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default OrdersPage
