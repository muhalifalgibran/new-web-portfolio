import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/blog/new');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-ink-light hover:text-ink transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="brutal-border p-8 bg-paper">
          <h1 className="text-3xl font-mono font-bold mb-2">Login</h1>
          <p className="text-ink-light font-mono text-sm mb-8">Admin access only.</p>

          {error && (
            <div className="mb-6 p-3 border-2 border-accent-red bg-accent-red/10 font-mono text-sm text-accent-red">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-brutal flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
