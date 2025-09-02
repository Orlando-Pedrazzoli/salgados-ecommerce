// pages/admin/login.js - VERSÃO CORRIGIDA
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Erro no login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center p-4'>
      <Head>
        <title>Login Admin - Salgados Premium</title>
      </Head>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Lock className='w-8 h-8 text-amber-600' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Admin Login</h1>
          <p className='text-gray-600'>Salgados Premium</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
              {error}
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='email'
                required
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder='admin@salgadospremium.pt'
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Senha
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder='••••••••'
                disabled={isLoading}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5 text-gray-400' />
                ) : (
                  <Eye className='w-5 h-5 text-gray-400' />
                )}
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-gray-200'>
          <div className='text-sm text-gray-600 space-y-1'>
            <p>
              <strong>Credenciais padrão:</strong>
            </p>
            <p>Email: admin@salgadospremium.pt</p>
            <p>Senha: Admin123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
