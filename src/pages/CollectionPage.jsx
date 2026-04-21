import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import ItemList from '../components/ItemList'

const getCollection = (data, key) =>
  Array.isArray(data?.[key]) ? data[key] : []

const CollectionPage = ({ title, collectionKey, itemTestId }) => {
  const { data, loading, error } = useContext(AppContext)
  const items = getCollection(data, collectionKey)

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
      <h1>{title}</h1>
      {items.length === 0 ? (
        <p className="status-message">No records available.</p>
      ) : (
        <ItemList items={items} itemTestId={itemTestId} />
      )}
    </section>
  )
}

export default CollectionPage
