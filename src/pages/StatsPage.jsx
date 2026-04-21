import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { isValidOrder } from '../utils/orderUtils'

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getStatusText = (item, keys) => {
  if (!item || typeof item !== 'object') {
    return ''
  }

  const matchKey = keys.find((key) => item[key] !== undefined)
  return matchKey ? normalizeText(item[matchKey]) : ''
}

const getBooleanFlag = (item, keys) => {
  if (!item || typeof item !== 'object') {
    return null
  }

  const matchKey = keys.find((key) => typeof item[key] === 'boolean')
  return matchKey ? item[matchKey] : null
}

const hasOrderStatus = (order) => {
  const flag = getBooleanFlag(order, [
    'isDelivered',
    'delivered',
    'isCancelled',
    'cancelled',
    'canceled',
  ])
  if (flag !== null) {
    return true
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status !== ''
}

const isDelivered = (order) => {
  const flag = getBooleanFlag(order, ['isDelivered', 'delivered'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status === 'delivered'
}

const isCancelled = (order) => {
  const flag = getBooleanFlag(order, ['isCancelled', 'cancelled', 'canceled'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status === 'cancelled' || status === 'canceled'
}

const StatsPage = () => {
  const { data, loading, error } = useContext(AppContext)
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const validOrders = orders
    .filter((order) => isValidOrder(order))
    .filter((order) => hasOrderStatus(order))

  const totalOrders = validOrders.reduce((count) => count + 1, 0)
  const deliveredOrders = validOrders.reduce(
    (count, order) => count + (isDelivered(order) ? 1 : 0),
    0,
  )
  const cancelledOrders = validOrders.reduce(
    (count, order) => count + (isCancelled(order) ? 1 : 0),
    0,
  )

  useEffect(() => {
    window.appState = {
      total: totalOrders,
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    }
  }, [
    totalOrders,
    deliveredOrders,
    cancelledOrders,
  ])

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
      <h1>Stats</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p data-testid="total-orders">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Delivered Orders</h2>
          <p data-testid="delivered-orders">{deliveredOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Cancelled Orders</h2>
          <p data-testid="cancelled-orders">{cancelledOrders}</p>
        </div>
      </div>
    </section>
  )
}

export default StatsPage
