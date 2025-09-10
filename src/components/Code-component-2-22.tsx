import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle } from 'lucide-react';

interface AuthSystemProps {
  onAuthSuccess: () => void;
}

type AuthView = 'login' | 'register' | 'success';

export function AuthSystem({ onAuthSuccess }: AuthSystemProps) {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSuccess = () => {
    setSuccessMessage('¡Inicio de sesión exitoso! Bienvenido de vuelta.');
    setCurrentView('success');
    
    // Redirigir al sistema principal después de 2 segundos
    setTimeout(() => {
      onAuthSuccess();
    }, 2000);
  };

  const handleRegisterSuccess = () => {
    setSuccessMessage('¡Registro completado exitosamente! Tu cuenta ha sido creada. Ahora puedes iniciar sesión.');
    setCurrentView('success');
    
    // Redirigir al login después de 3 segundos
    setTimeout(() => {
      setCurrentView('login');
    }, 3000);
  };

  const handleNavigateToRegister = () => {
    setCurrentView('register');
  };

  const handleNavigateToLogin = () => {
    setCurrentView('login');
  };

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-4">¡Éxito!</h1>
          </div>
          
          <Alert className="border-success bg-success/10">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              {successMessage}
            </AlertDescription>
          </Alert>

          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">
              {successMessage.includes('Registro') ? 'Redirigiendo al login...' : 'Cargando sistema...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onNavigateToLogin={handleNavigateToLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />
    );
  }

  return (
    <Login 
      onNavigateToRegister={handleNavigateToRegister}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}