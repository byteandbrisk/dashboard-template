'use client'

import { useRouter } from 'next/navigation';
import { LoginPage } from '@/components/pages/auth/LoginPage';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Handle authentication logic here
    router.push('/');
  };

  const handleNavigateToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <LoginPage 
      onLogin={handleLogin} 
      onNavigateToRegister={handleNavigateToRegister} 
    />
  );
}

