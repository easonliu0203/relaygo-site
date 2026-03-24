import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: '#f8fafc',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: '#2563EB', margin: 0, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: '#334155', marginTop: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#64748b', maxWidth: '400px', marginTop: '0.5rem', lineHeight: 1.6 }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563EB',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Back to Home
        </Link>
        <Link
          href="/guides"
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#2563EB',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: '1px solid #2563EB',
          }}
        >
          Browse Guides
        </Link>
      </div>
    </div>
  );
}
