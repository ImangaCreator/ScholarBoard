export const STATUSES = ['Not started', 'Drafting', 'Submitted', 'Won'];

export function parseDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export function daysUntil(iso, today = startOfToday()) {
  const d = parseDate(iso);
  return d ? Math.round((d - today) / 86400000) : null;
}

export function isDone(s) {
  return s.status === 'Submitted' || s.status === 'Won';
}

export function formatMoney(n) {
  return n ? '$' + Number(n).toLocaleString('en-US') : '—';
}

// Returns the label and whether the deadline should be flagged as urgent.
export function formatDeadline(s, today = startOfToday()) {
  const d = parseDate(s.deadline);
  if (!d) return { label: '—', tone: 'muted' };
  let label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const days = daysUntil(s.deadline, today);
  if (!isDone(s) && days >= 0 && days <= 7) {
    return { label: label + (days === 0 ? ' · today' : ` · ${days}d left`), tone: 'urgent' };
  }
  if (!isDone(s) && days < 0) return { label: label + ' · passed', tone: 'muted' };
  return { label, tone: 'normal' };
}

export function byDeadline(a, b) {
  const da = parseDate(a.deadline);
  const db = parseDate(b.deadline);
  if (!da) return 1;
  if (!db) return -1;
  return da - db;
}
