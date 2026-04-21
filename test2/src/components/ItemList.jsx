const getItemKey = (item, index) => {
  if (!item || typeof item !== 'object') {
    return index
  }

  return (
    item.id ||
    item._id ||
    item.orderId ||
    item.activityId ||
    item.courseId ||
    item.eventId ||
    index
  )
}

const getItemLabel = (item) => {
  if (item === null || item === undefined) {
    return ''
  }

  if (typeof item === 'string' || typeof item === 'number') {
    return String(item)
  }

  return (
    item.name ||
    item.title ||
    item.courseName ||
    item.eventName ||
    item.activityName ||
    JSON.stringify(item)
  )
}

const ItemList = ({ items, itemTestId }) => (
  <ul className="item-list">
    {items.map((item, index) => (
      <li key={getItemKey(item, index)} data-testid={itemTestId} className="item">
        {getItemLabel(item)}
      </li>
    ))}
  </ul>
)

export default ItemList
