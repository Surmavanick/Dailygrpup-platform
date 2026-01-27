import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", mentions: 12 },
  { day: "Tue", mentions: 18 },
  { day: "Wed", mentions: 9 },
  { day: "Thu", mentions: 22 },
  { day: "Fri", mentions: 16 }
];

const Layout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <aside style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
      <h2>PULSI</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link style={linkStyle} to="/">Dashboard</Link>
        <Link style={linkStyle} to="/mentions">Mentions</Link>
        <Link style={linkStyle} to="/csr">CSR</Link>
      </nav>
    </aside>
    <main style={{ flex: 1, padding: 30 }}>{children}</main>
  </div>
);

const linkStyle = { color: "#fff", textDecoration: "none" };

const Card = ({ title, value }) => (
  <div style={{
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 10,
    width: 200
  }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Mentions" value="77" />
        <Card title="Positive" value="52" />
        <Card title="Negative" value="11" />
      </div>

      <div style={{ marginTop: 40, height: 300 }}>
        <h3>Mentions Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mentions" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function Mentions() {
  return (
    <>
      <h1>Mentions</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Source</th>
            <th>Sentiment</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>news.ge</td>
            <td>Positive</td>
            <td>PULSI improves CSR visibility</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function CSR() {
  return <h1>CSR Tracker (coming next)</h1>;
}

export default function App() {
  return (
    <BrowserRouter basename="/Dailygrup-platform">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/csr" element={<CSR />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
