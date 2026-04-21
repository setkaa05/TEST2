import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ItemList from '../components/ItemList'

const getCollection = (data, key) =>
  Array.isArray(data?.[key]) ? data[key] : []

const normalizeValue = (value) => {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).toLowerCase()
  }

  return JSON.stringify(value).toLowerCase()
}

const FilterPage = ({ title, collectionKey, itemTestId }) => {
  const { data, loading, error } = useContext(AppContext)
  const items = getCollection(data, collectionKey)
  const [query, setQuery] = useState('')

  const normalizedQuery = query.toLowerCase()
  const filteredItems = items.filter((item) =>
    normalizeValue(item).includes(normalizedQuery),
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

  return (
    <section className="page">
      <h1>{title}</h1>
      <input
        data-testid="filter-input"
        className="filter-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type to filter..."
      />
      {filteredItems.length === 0 ? (
        <p className="status-message">No matching records.</p>
      ) : (
        <ItemList items={filteredItems} itemTestId={itemTestId} />
      )}
    </section>
  )
}

export default FilterPage
