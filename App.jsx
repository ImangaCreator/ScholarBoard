import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<ComingSoon title="Scholarships" />} />
          <Route path="/essays" element={<ComingSoon title="Essays" />} />
          <Route path="/find" element={<ComingSoon title="Find" />} />
          <Route path="/materials" element={<ComingSoon title="Materials" />} />
          <Route path="/profile" element={<ComingSoon title="Profile" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
