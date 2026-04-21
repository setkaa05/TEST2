import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import FilterPage from '../pages/FilterPage'
import NotFoundPage from '../pages/NotFoundPage'
import OrderDetailPage from '../pages/OrderDetailPage'
import OrdersFilterPage from '../pages/OrdersFilterPage'
import OrdersPage from '../pages/OrdersPage'
import StatsPage from '../pages/StatsPage'

const AppRouter = () => (
  <BrowserRouter>
    <div className="app">
      <Navigation />
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/orders" replace />}
            caseSensitive
          />
          <Route path="/orders" element={<OrdersPage />} caseSensitive />
          <Route
            path="/orders/filter"
            element={
              <FilterPage
                title="Filter Orders"
                collectionKey="orders"
                itemTestId="order-item"
              />
            }
            caseSensitive
          />
          <Route
            path="/orders/compact/:id"
            element={<OrderDetailPage />}
            caseSensitive
          />
          <Route path="/orders/:id" element={<OrderDetailPage />} caseSensitive />
          <Route path="/order/:id" element={<OrderDetailPage />} caseSensitive />
          <Route path="/filter" element={<OrdersFilterPage />} caseSensitive />

          <Route path="/stats" element={<StatsPage />} caseSensitive />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
)

export default AppRouter
