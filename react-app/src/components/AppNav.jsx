const pages = [
  { id: 'dashboard', label: 'Dashboard', hash: '#/' },
  { id: 'transactions', label: 'Transactions', hash: '#/transactions' },
]

export default function AppNav({ currentPage }) {
  return (
    <nav className="app-nav" aria-label="Main">
      {pages.map((page) => (
        <a
          key={page.id}
          href={page.hash}
          className={
            currentPage === page.id
              ? 'nav-link nav-link--active'
              : 'nav-link'
          }
        >
          {page.label}
        </a>
      ))}
    </nav>
  )
}
