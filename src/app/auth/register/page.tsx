'use client'

import { useRouter } from 'next/navigation';
import { RegisterPage } from '@/components/pages/auth/RegisterPage';

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    // Handle registration logic here
    router.push('/');
  };

  const handleNavigateToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <RegisterPage 
      onRegister={handleRegister} 
      onNavigateToLogin={handleNavigateToLogin} 
    />
  );
}

