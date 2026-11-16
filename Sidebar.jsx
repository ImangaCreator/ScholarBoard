import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home', icon: <path d="M3 11l9-7 9 7M5 10v10h14V10" /> },
  { to: '/scholarships', label: 'Scholarships', icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></> },
  { to: '/essays', label: 'Essays', icon: <path d="M4 20h4L19 9l-4-4L4 16v4zM13 7l4 4" /> },
  { to: '/find', label: 'Find', icon: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></> },
  { to: '/materials', label: 'Materials', icon: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /> },
  { to: '/profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" /></> },
];

export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">S</div>
        <span>Scholarboard</span>
      </div>
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {l.icon}
          </svg>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
