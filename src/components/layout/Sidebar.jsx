import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  {
    to: '/',
    end: true,
    label: 'Portfolio Overview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: '/properties',
    end: false,
    label: 'Properties',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/queue',
    end: false,
    label: 'Unanswered Queue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-60 shrink-0 bg-slate-900 text-slate-100">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-700">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500 text-white shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Reviews</p>
          <p className="text-xs text-slate-400">Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        <p className="px-2 pb-2 text-xs font-medium tracking-wider text-slate-500 uppercase">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
              ].join(' ')
            }
          >
            <span className="shrink-0">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}
