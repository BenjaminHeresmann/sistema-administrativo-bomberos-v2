import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Building, 
  Shield, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  UserCheck,
  FileText,
  Clock,
  Mail as MailIcon
} from 'lucide-react';

import {
  validateRun,
  validateInstitutionalEmail,
  validateAge,
  validateChileanPhone,
  validateBomberoId,
  validateCompanyRoleConsistency,
  validateRegistrationForm,
  companiasOptions,
  cargosOptions,
  RegistrationStatus
} from '../utils/bomberosValidation';

// Importar los logos de bomberos
import logoBomberos1884 from 'figma:asset/a23b53c24c8238d7f027a771588d221cb5dfa71b.png';
import logoCompania2 from 'figma:asset/23e93561d95c366985ce61daf32b48c09b99a535.png';

interface BomberosRegisterProps {
  onNavigateToLogin: () => void;
  onRegistrationSuccess: () => void;
}

export function BomberosRegister({ onNavigateToLogin, onRegistrationSuccess }: BomberosRegisterProps) {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    email: '',
    emailConfirm: '',
    telefono: '',
    compania: '',
    cargo: '',
    password: '',
    passwordConfirm: '',
    matricula: '',
    referencia: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [runFormatted, setRunFormatted] = useState('');

  const totalSteps = 4;

  const validateField = (field: string, value: string) => {
    let validation = { isValid: false, message: '' };

    switch (field) {
      case 'run':
        validation = validateRun(value);
        if (validation.isValid && 'formatted' in validation) {
          setRunFormatted(validation.formatted || '');
        }
        break;
      case 'nombre':
        if (!value.trim()) {
          validation = { isValid: false, message: 'Nombre es requerido' };
        } else if (value.length > 50) {
          validation = { isValid: false, message: 'Máximo 50 caracteres' };
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          validation = { isValid: false, message: 'Solo letras y espacios' };
        } else {
          validation = { isValid: true, message: '✅ Nombre válido' };
        }
        break;
      case 'apellidos':
        if (!value.trim()) {
          validation = { isValid: false, message: 'Apellidos son requeridos' };
        } else if (value.length > 100) {
          validation = { isValid: false, message: 'Máximo 100 caracteres' };
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          validation = { isValid: false, message: 'Solo letras y espacios' };
        } else {
          validation = { isValid: true, message: '✅ Apellidos válidos' };
        }
        break;
      case 'fechaNacimiento':
        validation = validateAge(value);
        break;
      case 'email':
        validation = validateInstitutionalEmail(value);
        break;
      case 'emailConfirm':
        if (!value) {
          validation = { isValid: false, message: 'Confirmación requerida' };
        } else if (value !== formData.email) {
          validation = { isValid: false, message: 'Los correos no coinciden' };
        } else {
          validation = { isValid: true, message: '✅ Correos coinciden' };
        }
        break;
      case 'telefono':
        validation = validateChileanPhone(value);
        break;
      case 'compania':
        if (!value) {
          validation = { isValid: false, message: 'Compañía es requerida' };
        } else {
          validation = { isValid: true, message: '✅ Compañía seleccionada' };
        }
        break;
      case 'cargo':
        if (!value) {
          validation = { isValid: false, message: 'Cargo es requerido' };
        } else {
          validation = { isValid: true, message: '✅ Cargo seleccionado' };
        }
        // Validar consistencia si ambos campos están completos
        if (value && formData.compania) {
          const consistencyValidation = validateCompanyRoleConsistency(formData.compania, value);
          if (!consistencyValidation.isValid) {
            validation = consistencyValidation;
          }
        }
        break;
      case 'password':
        if (!value) {
          validation = { isValid: false, message: 'Contraseña es requerida' };
        } else if (value.length < 4 || value.length > 10) {
          validation = { isValid: false, message: 'Entre 4 y 10 caracteres' };
        } else {
          validation = { isValid: true, message: '✅ Contraseña válida' };
        }
        break;
      case 'passwordConfirm':
        if (!value) {
          validation = { isValid: false, message: 'Confirmación requerida' };
        } else if (value !== formData.password) {
          validation = { isValid: false, message: 'Las contraseñas no coinciden' };
        } else {
          validation = { isValid: true, message: '✅ Contraseñas coinciden' };
        }
        break;
      case 'matricula':
        validation = validateBomberoId(value);
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
    if (value.trim() || field === 'telefono' || field === 'matricula') {
      validateField(field, value);
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
      setFieldValidation(prev => ({ ...prev, [field]: false }));
    }

    // Re-validar confirmación si es necesario
    if (field === 'email' && formData.emailConfirm) {
      validateField('emailConfirm', formData.emailConfirm);
    }
    if (field === 'password' && formData.passwordConfirm) {
      validateField('passwordConfirm', formData.passwordConfirm);
    }
    if (field === 'compania' && formData.cargo) {
      validateField('cargo', formData.cargo);
    }
  };

  const getFieldIcon = (field: string) => {
    if (!formData[field as keyof typeof formData].trim() && field !== 'telefono' && field !== 'matricula') return null;

    if (fieldValidation[field]) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    } else if (errors[field]) {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  const getFieldBorderClass = (field: string) => {
    if (!formData[field as keyof typeof formData].trim() && field !== 'telefono' && field !== 'matricula') return '';

    if (fieldValidation[field]) {
      return 'border-success focus:ring-success';
    } else if (errors[field]) {
      return 'border-destructive focus:ring-destructive';
    } else {
      return 'border-warning focus:ring-warning';
    }
  };

  const canProceedToNextStep = (step: number) => {
    switch (step) {
      case 1:
        return fieldValidation.run && fieldValidation.nombre && fieldValidation.apellidos && fieldValidation.fechaNacimiento;
      case 2:
        return fieldValidation.email && fieldValidation.emailConfirm;
      case 3:
        return fieldValidation.compania && fieldValidation.cargo;
      case 4:
        return fieldValidation.password && fieldValidation.passwordConfirm;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación final completa
    const validation = validateRegistrationForm(formData);

    if (validation.isValid) {
      // Simular proceso de registro
      setTimeout(() => {
        setRegistrationComplete(true);
        setIsSubmitting(false);
      }, 2000);
    } else {
      setErrors(validation.errors);
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Información Personal</h3>
        <p className="text-sm text-muted-foreground">Datos básicos de identificación</p>
      </div>

      {/* RUN */}
      <div className="space-y-2">
        <Label htmlFor="run">RUN/RUT *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="run"
            type="text"
            value={formData.run}
            onChange={(e) => handleInputChange('run', e.target.value)}
            placeholder="Ej: 12345678-9"
            className={`pl-10 pr-10 ${getFieldBorderClass('run')}`}
            maxLength={12}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('run')}
          </div>
        </div>
        {runFormatted && fieldValidation.run && (
          <p className="text-xs text-success">RUN formateado: {runFormatted}</p>
        )}
        {errors.run && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.run}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="nombre"
            type="text"
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            placeholder="Nombre completo"
            className={`pl-10 pr-10 ${getFieldBorderClass('nombre')}`}
            maxLength={50}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('nombre')}
          </div>
        </div>
        {errors.nombre && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.nombre}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Apellidos */}
      <div className="space-y-2">
        <Label htmlFor="apellidos">Apellidos *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="apellidos"
            type="text"
            value={formData.apellidos}
            onChange={(e) => handleInputChange('apellidos', e.target.value)}
            placeholder="Apellidos completos"
            className={`pl-10 pr-10 ${getFieldBorderClass('apellidos')}`}
            maxLength={100}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('apellidos')}
          </div>
        </div>
        {errors.apellidos && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.apellidos}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Fecha de Nacimiento */}
      <div className="space-y-2">
        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
            className={`pl-10 pr-10 ${getFieldBorderClass('fechaNacimiento')}`}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('fechaNacimiento')}
          </div>
        </div>
        {errors.fechaNacimiento && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.fechaNacimiento}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Información de Contacto</h3>
        <p className="text-sm text-muted-foreground">Solo correos institucionales @bomberosvinadelmar.cl</p>
      </div>

      {/* Correo Electrónico */}
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico Institucional *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="nombre.apellido@bomberosvinadelmar.cl"
            className={`pl-10 pr-10 ${getFieldBorderClass('email')}`}
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

      {/* Confirmar Correo */}
      <div className="space-y-2">
        <Label htmlFor="emailConfirm">Confirmar Correo Electrónico *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="emailConfirm"
            type="email"
            value={formData.emailConfirm}
            onChange={(e) => handleInputChange('emailConfirm', e.target.value)}
            placeholder="Confirmar correo electrónico"
            className={`pl-10 pr-10 ${getFieldBorderClass('emailConfirm')}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('emailConfirm')}
          </div>
        </div>
        {errors.emailConfirm && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.emailConfirm}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono Personal (opcional)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
            placeholder="+56 9 xxxx xxxx"
            className={`pl-10 pr-10 ${getFieldBorderClass('telefono')}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('telefono')}
          </div>
        </div>
        {errors.telefono && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.telefono}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Información Bomberil</h3>
        <p className="text-sm text-muted-foreground">Asignación de compañía y cargo</p>
      </div>

      {/* Compañía */}
      <div className="space-y-2">
        <Label htmlFor="compania">Compañía/Unidad *</Label>
        <Select 
          value={formData.compania} 
          onValueChange={(value) => handleInputChange('compania', value)}
        >
          <SelectTrigger className={getFieldBorderClass('compania')}>
            <Building className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Selecciona una compañía" />
          </SelectTrigger>
          <SelectContent>
            {companiasOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.compania && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.compania}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Cargo */}
      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo/Especialidad *</Label>
        <Select 
          value={formData.cargo} 
          onValueChange={(value) => handleInputChange('cargo', value)}
        >
          <SelectTrigger className={getFieldBorderClass('cargo')}>
            <Shield className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Selecciona un cargo" />
          </SelectTrigger>
          <SelectContent>
            {cargosOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cargo && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.cargo}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Número de Matrícula */}
      <div className="space-y-2">
        <Label htmlFor="matricula">Número de Matrícula Bomberil (opcional)</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="matricula"
            type="text"
            value={formData.matricula}
            onChange={(e) => handleInputChange('matricula', e.target.value)}
            placeholder="1234 (solo para bomberos registrados)"
            className={`pl-10 pr-10 ${getFieldBorderClass('matricula')}`}
            maxLength={6}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getFieldIcon('matricula')}
          </div>
        </div>
        {errors.matricula && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.matricula}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Persona de Referencia */}
      <div className="space-y-2">
        <Label htmlFor="referencia">Persona de Referencia en la Institución (opcional)</Label>
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="referencia"
            type="text"
            value={formData.referencia}
            onChange={(e) => handleInputChange('referencia', e.target.value)}
            placeholder="Nombre del bombero que puede verificar tu identidad"
            className="pl-10"
            maxLength={100}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Ayuda a verificar la legitimidad del registro
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Credenciales de Acceso</h3>
        <p className="text-sm text-muted-foreground">Contraseña para acceder al sistema</p>
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Entre 4 y 10 caracteres"
            className={`pl-10 pr-20 ${getFieldBorderClass('password')}`}
            maxLength={10}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {getFieldIcon('password')}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground"
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

      {/* Confirmar Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Confirmar Contraseña *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="passwordConfirm"
            type={showPasswordConfirm ? 'text' : 'password'}
            value={formData.passwordConfirm}
            onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
            placeholder="Confirmar contraseña"
            className={`pl-10 pr-20 ${getFieldBorderClass('passwordConfirm')}`}
            maxLength={10}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {getFieldIcon('passwordConfirm')}
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {errors.passwordConfirm && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.passwordConfirm}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Información de seguridad */}
      <Alert className="border-info bg-info/10">
        <Shield className="h-4 w-4 text-info" />
        <AlertDescription className="text-info">
          <strong>Información de Seguridad:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Tu registro será revisado por el Comando antes de la aprobación</li>
            <li>• Recibirás un correo cuando sea aprobado (24-48 horas)</li>
            <li>• Mantén seguras tus credenciales de acceso</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-success-foreground" />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">¡Registro Exitoso!</h2>
        <p className="text-muted-foreground">
          Tu solicitud ha sido enviada al Comando para revisión
        </p>
      </div>

      <Alert className="border-success bg-success/10 text-left">
        <MailIcon className="h-4 w-4 text-success" />
        <AlertDescription className="text-success">
          <strong>📧 Confirmación enviada a:</strong> {formData.email}
          <br />
          <strong>⏳ Estado actual:</strong> PENDIENTE DE APROBACIÓN
          <br />
          <strong>🔄 Tiempo estimado:</strong> 24-48 horas hábiles
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Próximos pasos:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>✓ Solicitud recibida y en revisión</li>
            <li>📋 El Comando verificará tus datos</li>
            <li>📧 Recibirás un correo con la decisión</li>
            <li>🔑 Si es aprobada, podrás acceder al sistema</li>
          </ul>
        </div>

        <Separator />

        <Button 
          onClick={onNavigateToLogin}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Login
        </Button>
      </div>
    </div>
  );

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <img 
                  src={logoBomberos1884} 
                  alt="Bomberos 1884" 
                  className="w-12 h-12 object-contain"
                />
                <img 
                  src={logoCompania2} 
                  alt="2ª Compañía" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <CardTitle>Registro Completado</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSuccessPage()}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header con logos */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            <img 
              src={logoBomberos1884} 
              alt="Bomberos 1884" 
              className="w-14 h-14 object-contain logo-hover-effect"
            />
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <img 
              src={logoCompania2} 
              alt="2ª Compañía" 
              className="w-14 h-14 object-contain logo-hover-effect"
            />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Registro de Personal Bomberil</h1>
          <p className="text-muted-foreground">2ª Compañía de Bomberos de Viña del Mar</p>
        </div>

        {/* Progreso */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Paso {currentStep} de {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Formulario */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => currentStep === 1 ? onNavigateToLogin() : setCurrentStep(prev => prev - 1)}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 ? 'Volver al Login' : 'Anterior'}
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!canProceedToNextStep(currentStep) || isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Siguiente
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceedToNextStep(currentStep) || isSubmitting}
                    className="bg-success hover:bg-success/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Enviando registro...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completar Registro
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground space-y-2">
          <div className="flex justify-center items-center gap-4">
            <img 
              src={logoCompania2} 
              alt="2ª Compañía" 
              className="w-6 h-6 object-contain opacity-60"
            />
            <span>Cuartel Central - Bomberos Viña del Mar</span>
          </div>
          <div className="space-y-1">
            <p>Para consultas: admin@bomberosvinadelmar.cl | +56 32 123 4567</p>
            <p>© 2024 Sistema de Gestión Interno v1.0 - DSY1104</p>
          </div>
        </footer>
      </div>
    </div>
  );
}