import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { validateEmailLogin, validatePasswordLogin } from '../utils/authValidation';

interface LoginProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
}

export function Login({ onNavigateToRegister, onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    let validation = { isValid: false, message: '' };
    
    switch (field) {
      case 'email':
        validation = validateEmailLogin(value);
        break;
      case 'password':
        validation = validatePasswordLogin(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.message
    }));

    setFieldValidation(prev => ({
      ...prev,
      [field]: validation.isValid
    }));

    return validation.isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validación en tiempo real
    if (value.trim()) {
      validateField(field, value);
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
      setFieldValidation(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar todos los campos
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);

    if (emailValid && passwordValid) {
      // Simular proceso de login
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess();
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (field: string) => {
    if (!formData[field as keyof typeof formData].trim()) return null;
    
    if (fieldValidation[field]) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    } else if (errors[field]) {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">TB</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Tienda Bomberos</h1>
          <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
        </div>

        {/* Formulario de Login */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu.correo@duoc.cl"
                    className={`pl-10 pr-10 ${
                      errors.email ? 'border-destructive focus:ring-destructive' : 
                      fieldValidation.email ? 'border-success focus:ring-success' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldIcon('email')}
                  </div>
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className={`pl-10 pr-20 ${
                      errors.password ? 'border-destructive focus:ring-destructive' : 
                      fieldValidation.password ? 'border-success focus:ring-success' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {getFieldIcon('password')}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Botón Submit */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              {/* Enlaces */}
              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-sm text-primary hover:underline"
                  disabled={isSubmitting}
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground space-y-2">
          <div className="flex justify-center space-x-4">
            <span>Soporte: soporte@tiendabomberos.cl</span>
            <span>|</span>
            <span>+56 2 1234 5678</span>
          </div>
          <p>© 2024 Tienda Bomberos. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}