import { Link } from 'react-router-dom';
import { useScholarships } from '../lib/ScholarshipsContext.jsx';
import StatusPill from '../components/StatusPill.jsx';
import { byDeadline, daysUntil, formatDeadline, formatMoney, isDone } from '../lib/format.js';

function sum(list) {
  return list.reduce((total, s) => total + (s.amount || 0), 0);
}

export default function Home() {
  const { scholarships } = useScholarships();

  const active = scholarships.filter((s) => !isDone(s));
  const dueSoon = active.filter((s) => {
    const d = daysUntil(s.deadline);
    return d !== null && d >= 0 && d <= 7;
  });
  const submitted = scholarships.filter((s) => s.status === 'Submitted');
  const won = scholarships.filter((s) => s.status === 'Won');

  const upNext = active
    .filter((s) => {
      const d = daysUntil(s.deadline);
      return d === null || d >= 0;
    })
    .sort(byDeadline)
    .slice(0, 5);

  const stats = [
    { label: 'Due in the next 7 days', value: String(dueSoon.length), tone: 'urgent' },
    { label: 'In progress', value: formatMoney(sum(active)) },
    { label: 'Submitted', value: formatMoney(sum(submitted)) },
    { label: 'Won', value: formatMoney(sum(won)), tone: 'success' },
  ];

  return (
    <div className="page">
      <div className="crumb">Scholarboard</div>
      <h1 className="page-title">Home</h1>

      <section className="stats" aria-label="Summary">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-label">{s.label}</div>
            <div className={'stat-value' + (s.tone ? ' ' + s.tone : '')}>{s.value}</div>
          </div>
        ))}
      </section>

      <h2 className="section-title">Up next</h2>
      {upNext.length === 0 ? (
        <p className="muted">Nothing due. Add a scholarship to get started.</p>
      ) : (
        <ul className="list">
          {upNext.map((s) => {
            const deadline = formatDeadline(s);
            return (
              <li key={s.id} className="list-row">
                <Link to={`/scholarships?open=${s.id}`} className="row-name">{s.name}</Link>
                <StatusPill status={s.status} />
                <span className={'row-deadline ' + deadline.tone}>{deadline.label}</span>
                <span className="row-amount">{formatMoney(s.amount)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
