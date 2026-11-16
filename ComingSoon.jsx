export default function ComingSoon({ title }) {
  return (
    <div className="page">
      <div className="crumb">Scholarboard / {title}</div>
      <h1 className="page-title">{title}</h1>
      <p className="muted">This page is coming in a later chunk.</p>
    </div>
  );
}
