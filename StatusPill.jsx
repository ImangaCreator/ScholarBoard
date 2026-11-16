const CLASS = {
  'Not started': 'pill-not-started',
  Drafting: 'pill-drafting',
  Submitted: 'pill-submitted',
  Won: 'pill-won',
};

export default function StatusPill({ status }) {
  return <span className={'pill ' + (CLASS[status] || '')}>{status}</span>;
}
