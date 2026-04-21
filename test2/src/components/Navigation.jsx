import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const links = [
    { to: '/orders', label: 'Orders' },
    { to: '/filter', label: 'Filter' },
    { to: '/stats', label: 'Stats' },
  ]

  return (
    <nav className="nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          end
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
