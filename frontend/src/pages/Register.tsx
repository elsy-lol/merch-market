import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SvgProfile, SvgLock, SvgUser, SvgMail, SvgEye, SvgEyeOff, SvgCheck } from '../components/CustomSvg';

interface RegisterProps {
  onNavigate: (tab: string) => void;
}

const Register = ({ onNavigate }: RegisterProps) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Заполните обязательные поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password, displayName || username);
      onNavigate('profile');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-2 mt-8 animate-section animate-section-1">
      <div className="sticker sticker-green aspect-auto p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center mb-4">
            <SvgProfile className="w-8 h-8" color="#10b981" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider section-title">
            Регистрация
          </h2>
          <p className="text-emerald-400/70 font-accent text-lg mt-1">
            Создай свой аккаунт
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-white/70 mb-1 flex items-center gap-2">
              <SvgUser className="w-3.5 h-3.5" color="#94a3b8" /> Имя пользователя <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-1 flex items-center gap-2">
              <SvgMail className="w-3.5 h-3.5" color="#94a3b8" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-1 flex items-center gap-2">
              <SvgProfile className="w-3.5 h-3.5" color="#94a3b8" /> Отображаемое имя
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Как тебя называть?"
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-1 flex items-center gap-2">
              <SvgLock className="w-3.5 h-3.5" color="#94a3b8" /> Пароль <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="минимум 6 символов"
                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <SvgEyeOff className="w-4 h-4" color="currentColor" /> : <SvgEye className="w-4 h-4" color="currentColor" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-1 flex items-center gap-2">
              <SvgLock className="w-3.5 h-3.5" color="#94a3b8" /> Подтвердите пароль <span className="text-rose-400">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="повторите пароль"
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
              autoComplete="new-password"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Регистрация...</span>
              ) : (
                <><SvgCheck className="w-4 h-4" color="#0f172a" /> Создать аккаунт</>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <span className="text-white/40 text-sm">Уже есть аккаунт? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-amber-400 hover:text-amber-300 font-bold text-sm transition-colors bg-transparent border-none cursor-pointer"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
