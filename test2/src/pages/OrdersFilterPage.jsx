import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import OrderCard from '../components/OrderCard'
import {
  getOrderId,
  getRestaurantName,
  isValidOrder,
} from '../utils/orderUtils'

const OrdersFilterPage = () => {
  const { data, loading, error } = useContext(AppContext)
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const [query, setQuery] = useState('')

  const validOrders = orders.filter((order) => isValidOrder(order))
  const trimmedQuery = query.trim()
  const filteredOrders = validOrders.filter((order) => {
    const restaurantName = getRestaurantName(order) || ''
    return trimmedQuery !== '' && restaurantName.includes(trimmedQuery)
  })

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
      <h1>Filter Orders</h1>
      <input
        data-testid="filter-input"
        className="filter-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type to filter..."
      />
      {trimmedQuery === '' ? (
        <p className="status-message">Please enter a restaurant name.</p>
      ) : filteredOrders.length === 0 ? (
        <p className="status-message">no results found</p>
      ) : (
        <div className="item-list">
          {filteredOrders.map((order, index) => (
            <OrderCard key={getOrderId(order) ?? index} order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default OrdersFilterPage
