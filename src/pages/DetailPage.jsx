import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const getCollection = (data, key) =>
  Array.isArray(data?.[key]) ? data[key] : []

const getItemId = (item) => {
  if (!item || typeof item !== 'object') {
    return null
  }

  return (
    item.id ||
    item._id ||
    item.orderId ||
    item.activityId ||
    item.courseId ||
    item.eventId ||
    null
  )
}

const DetailPage = ({ title, collectionKey }) => {
  const { data, loading, error } = useContext(AppContext)
  const { id } = useParams()
  const items = getCollection(data, collectionKey)
  const selected = items.find(
    (item) => String(getItemId(item)) === String(id),
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
      {selected ? (
        <pre className="item">{JSON.stringify(selected, null, 2)}</pre>
      ) : (
        <p className="status-message">No matching record found.</p>
      )}
    </section>
  )
}

export default DetailPage
