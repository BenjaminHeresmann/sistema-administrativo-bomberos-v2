import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Crown, Star, Settings, Flame, RotateCcw, Shield, AlertTriangle, Clock, DollarSign, FileText, UserCog, Scale, Award } from 'lucide-react';
import { validateEmailLogin, validatePasswordLogin, validateCredentials, usuariosRegistrados } from '../utils/authValidation';
import { authenticateUser, UserProfile } from '../utils/userRoles';

// Importar los logos de bomberos
import logoBomberos1884 from 'figma:asset/a23b53c24c8238d7f027a771588d221cb5dfa71b.png';
import logoCompania2 from 'figma:asset/23e93561d95c366985ce61daf32b48c09b99a535.png';

interface LoginProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (userProfile: UserProfile) => void;
}

export function Login({ onNavigateToRegister, onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState({
    rut: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [userDetected, setUserDetected] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Datos de usuarios registrados para acceso rápido con RUTs
  const testUsers = {
    administrador: {
      rut: '11111111-1',
      password: 'admin123',
      role: 'Administrador',
      description: 'Control total del sistema + gestión de permisos',
      color: 'bg-black hover:bg-gray-800',
      icon: Shield
    },
    director: {
      rut: '12345678-9',
      password: 'director123',
      role: 'Director',
      description: 'Acceso administrativo total',
      color: 'bg-red-700 hover:bg-red-800',
      icon: Crown
    },
    capitan: {
      rut: '98765432-1',
      password: 'capitan123',
      role: 'Capitán',
      description: 'Gestión de operaciones',
      color: 'bg-blue-900 hover:bg-blue-950',
      icon: Star
    },
    teniente1: {
      rut: '11111111-2',
      password: 'teniente123',
      role: 'Teniente Primero',
      description: 'Operaciones de campo',
      color: 'bg-blue-800 hover:bg-blue-900',
      icon: Star
    },
    teniente2: {
      rut: '22222222-2',
      password: 'teniente123',
      role: 'Teniente Segundo',
      description: 'Apoyo operativo',
      color: 'bg-blue-700 hover:bg-blue-800',
      icon: Star
    },
    teniente3: {
      rut: '33333333-3',
      password: 'teniente123',
      role: 'Teniente Tercero',
      description: 'Coordinación táctica',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: Star
    },
    tesorero: {
      rut: '99887766-3',
      password: 'tesorero123',
      role: 'Tesorero',
      description: 'Gestión financiera',
      color: 'bg-green-700 hover:bg-green-800',
      icon: DollarSign
    },
    secretario: {
      rut: '44444444-4',
      password: 'secretario123',
      role: 'Secretario',
      description: 'Documentación y actas',
      color: 'bg-purple-700 hover:bg-purple-800',
      icon: FileText
    },
    ayudante: {
      rut: '55555555-5',
      password: 'ayudante123',
      role: 'Ayudante',
      description: 'Soporte administrativo',
      color: 'bg-orange-600 hover:bg-orange-700',
      icon: UserCog
    },
    consejero: {
      rut: '66666666-6',
      password: 'consejero123',
      role: 'Consejero de Disciplina',
      description: 'Tribunal disciplinario',
      color: 'bg-purple-800 hover:bg-purple-900',
      icon: Scale
    },
    bombero: {
      rut: '11223344-5',
      password: 'bombero123',
      role: 'Bombero Activo',
      description: 'Acceso limitado - citaciones y videos',
      color: 'bg-red-600 hover:bg-red-700',
      icon: Flame
    }
  };

  const validateField = (field: string, value: string) => {
    let validation = { isValid: false, message: '' };
    
    switch (field) {
      case 'rut':
        // Validación básica de RUT
        if (!value) {
          validation = { isValid: false, message: 'RUT es requerido' };
        } else if (value.length < 9) {
          validation = { isValid: false, message: 'RUT debe tener al menos 9 caracteres' };
        } else {
          validation = { isValid: true, message: '' };
          // Verificar si existe en usuarios mock
          const userExists = Object.values(testUsers).find(user => user.rut === value);
          if (userExists) {
            setUserDetected(userExists.role);
          } else {
            setUserDetected('Usuario no encontrado');
          }
        }
        break;
      case 'password':
        if (!value) {
          validation = { isValid: false, message: 'Contraseña es requerida' };
        } else if (value.length < 4) {
          validation = { isValid: false, message: 'Contraseña debe tener al menos 4 caracteres' };
        } else {
          validation = { isValid: true, message: '' };
        }
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
      if (field === 'rut') {
        setUserDetected('');
      }
    }
  };

  const handleQuickAccess = (userType: keyof typeof testUsers) => {
    const user = testUsers[userType];
    setFormData({
      rut: user.rut,
      password: user.password
    });
    
    // Validar automáticamente los campos
    validateField('rut', user.rut);
    validateField('password', user.password);
    
    // Mostrar confirmación
    setSelectedRole(user.role);
    setTimeout(() => setSelectedRole(''), 3000);
  };

  const handleClearFields = () => {
    setFormData({ rut: '', password: '' });
    setErrors({});
    setFieldValidation({});
    setSelectedRole('');
    setUserDetected('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsValidating(true);

    // Incrementar contador de intentos
    setLoginAttempts(prev => prev + 1);

    // Simular verificación de credenciales con el nuevo sistema de roles
    setTimeout(() => {
      // Usar el sistema de autenticación con roles
      const authenticatedUser = authenticateUser(formData.rut, formData.password);
      
      if (authenticatedUser) {
        setSelectedRole(`✅ ${authenticatedUser.rol}`);
        
        // Proceso de login exitoso
        setTimeout(() => {
          setIsSubmitting(false);
          setIsValidating(false);
          onLoginSuccess(authenticatedUser);
        }, 1500);
      } else {
        // Login fallido
        setErrors(prev => ({
          ...prev,
          general: 'RUT o contraseña incorrectos. Verifica tus credenciales.'
        }));
        
        // Validar campos individuales para mostrar errores específicos
        validateField('rut', formData.rut);
        validateField('password', formData.password);
        
        setIsSubmitting(false);
        setIsValidating(false);
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          setErrors(prev => ({ ...prev, general: '' }));
        }, 5000);
      }
    }, 1000);
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

  const getFieldBorderClass = (field: string) => {
    if (!formData[field as keyof typeof formData].trim()) return '';
    
    if (fieldValidation[field]) {
      return 'border-success focus:ring-success';
    } else if (errors[field]) {
      return 'border-destructive focus:ring-destructive';
    } else {
      return 'border-warning focus:ring-warning';
    }
  };

  const canSubmit = fieldValidation.rut && fieldValidation.password && !isSubmitting;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header con logos institucionales */}
        <div className="text-center relative">
          {/* Logos institucionales */}
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="relative">
              <img 
                src={logoBomberos1884} 
                alt="Bomberos Viña del Mar 1884" 
                className="w-16 h-16 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Shield className="text-2xl text-primary-foreground w-10 h-10" />
            </div>
            <div className="relative">
              <img 
                src={logoCompania2} 
                alt="2ª Compañía de Bomberos de Viña del Mar" 
                className="w-16 h-16 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Títulos principales */}
          <h1 className="text-2xl font-semibold text-foreground mb-2">Bomberos Viña del Mar</h1>
          <p className="text-muted-foreground mb-1">Sistema Administrativo Interno</p>
          <p className="text-sm text-muted-foreground/80">2ª Compañía de Bomberos • Fundada en 1884</p>
          
          {/* Decoración con líneas */}
          <div className="flex items-center justify-center mt-4 mb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-bomberos-gold to-transparent w-full max-w-xs"></div>
          </div>
        </div>

        {/* Formulario de Login */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
            {userDetected && (
              <Alert className="border-info bg-info/10">
                <CheckCircle className="h-4 w-4 text-info" />
                <AlertDescription className="text-info">
                  👤 Usuario: <strong>{userDetected}</strong> detectado
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mensaje de error general */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Campo RUT */}
              <div className="space-y-2">
                <Label htmlFor="rut">RUT</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="rut"
                    type="text"
                    value={formData.rut}
                    onChange={(e) => handleInputChange('rut', e.target.value)}
                    placeholder="12345678-9"
                    className={`pl-10 pr-10 ${getFieldBorderClass('rut')}`}
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldIcon('rut')}
                  </div>
                </div>
                {errors.rut && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.rut}</AlertDescription>
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
                    className={`pl-10 pr-20 ${getFieldBorderClass('password')}`}
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

              {/* Contador de intentos */}
              {loginAttempts > 0 && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Intento {loginAttempts} de 3</span>
                  {isValidating && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Verificando credenciales...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Botón Submit */}
              <Button 
                type="submit" 
                className={`w-full ${canSubmit ? 'bg-primary hover:bg-primary/90' : 'bg-muted-foreground'}`}
                disabled={!canSubmit}
              >
                {isSubmitting ? (
                  isValidating ? 'Verificando credenciales...' : 'Iniciando sesión...'
                ) : (
                  canSubmit ? 'Iniciar Sesión' : 'Complete los campos válidos'
                )}
              </Button>

              {/* Enlaces */}
              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-sm text-primary hover:underline"
                  disabled={isSubmitting}
                >
                  ¿Eres bombero y no tienes acceso? Solicita tu registro
                </button>
                <p className="text-xs text-muted-foreground">
                  Solo personal bomberil autorizado
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sección de Acceso Rápido */}
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center text-muted-foreground">
              Acceso Rápido - Usuarios Registrados
            </CardTitle>
            {selectedRole && (
              <Alert className="border-success bg-success/10">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Datos cargados para: <strong>{selectedRole}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {Object.entries(testUsers).map(([key, user]) => {
                  const Icon = user.icon;
                  
                  // Obtener nombre corto para mostrar en el botón
                  const getShortName = (role: string) => {
                    if (role.includes('Administrador')) return 'ADMIN';
                     if (role.includes('Director')) return 'DIRECTOR';
                    if (role.includes('Capitán')) return 'CAPITÁN';
                    if (role.includes('Teniente Primero')) return 'TTE. 1º';
                    if (role.includes('Teniente Segundo')) return 'TTE. 2º';
                    if (role.includes('Teniente Tercero')) return 'TTE. 3º';
                    if (role.includes('Tesorero')) return 'TESORERO';
                    if (role.includes('Secretario')) return 'SECRETARIO';
                    if (role.includes('Ayudante')) return 'AYUDANTE';
                    if (role.includes('Consejero')) return 'CONSEJERO';
                    if (role.includes('Bombero Activo')) return 'BOMBERO';
                    return 'USUARIO';
                  };
                  
                  return (
                    <Tooltip key={key}>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => handleQuickAccess(key as keyof typeof testUsers)}
                          disabled={isSubmitting}
                          className={`${user.color} text-white border-0 h-14 flex flex-col items-center gap-1 transition-all duration-200 transform hover:scale-105 active:scale-95`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium leading-tight text-center">
                            {getShortName(user.role)}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{user.role}</p>
                        <p className="text-sm text-muted-foreground">{user.description}</p>
                        <p className="text-xs mt-1">RUT: {user.rut}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>

            {/* Botón Limpiar Campos */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearFields}
                disabled={isSubmitting}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpiar campos
              </Button>
            </div>

            {/* Nota explicativa */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              * Sistema de prueba - Bomberos Viña del Mar
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Datos ficticios para propósitos académicos DSY1104
            </p>
          </CardContent>
        </Card>

        {/* Footer institucional */}
        <footer className="text-center text-sm text-muted-foreground space-y-3">
          {/* Información de contacto */}
          <div className="space-y-1">
            <p>Contacta al administrador para registrar tu acceso</p>
            <div className="flex justify-center items-center space-x-4">
              <span>Soporte: admin@bomberosvinadelmar.cl</span>
              <span>|</span>
              <span>+56 32 123 4567</span>
            </div>
          </div>
          
          {/* Separador decorativo */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent w-full max-w-md"></div>
          </div>
          
          {/* Información institucional */}
          <div className="space-y-2">
            <div className="flex justify-center items-center gap-4">
              <img 
                src={logoBomberos1884} 
                alt="Bomberos 1884" 
                className="w-8 h-8 object-contain opacity-60"
              />
              <span className="text-xs font-medium">LEALTAD Y TRABAJO</span>
              <img 
                src={logoCompania2} 
                alt="2ª Compañía" 
                className="w-8 h-8 object-contain opacity-60"
              />
            </div>
            <p className="text-xs">© 2024 2ª Compañía de Bomberos de Viña del Mar</p>
            <p className="text-xs opacity-75">Sistema Académico DSY1104 • Fundada el 14 de Diciembre de 1884</p>
          </div>
        </footer>
      </div>
    </div>
  );
}