import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { 
  validateEmailLogin, 
  validatePasswordLogin, 
  validateFullName,
  validatePhoneNumber,
  validatePasswordConfirmation,
  validateEmailConfirmation
} from '../utils/authValidation';

interface RegisterProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

const REGIONES_COMUNAS = {
  'Metropolitana': [
    'Santiago', 'Las Condes', 'Providencia', 'Ñuñoa', 'La Florida', 
    'Maipú', 'Puente Alto', 'San Bernardo', 'Quilicura', 'Peñalolén'
  ],
  'Valparaíso': [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Casablanca',
    'San Antonio', 'Quillota', 'Los Andes', 'Concón', 'Limache'
  ],
  'Biobío': [
    'Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel',
    'San Pedro de la Paz', 'Tomé', 'Penco', 'Hualpén', 'Cabrero'
  ]
};

export function Register({ onNavigateToLogin, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    phone: '',
    region: '',
    comuna: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});
  const [comunasDisponibles, setComunasDisponibles] = useState<string[]>([]);

  const validateField = (field: string, value: string) => {
    let validation = { isValid: false, message: '' };
    
    switch (field) {
      case 'fullName':
        validation = validateFullName(value);
        break;
      case 'email':
        validation = validateEmailLogin(value);
        break;
      case 'confirmEmail':
        validation = validateEmailConfirmation(value, formData.email);
        break;
      case 'password':
        validation = validatePasswordLogin(value);
        break;
      case 'confirmPassword':
        validation = validatePasswordConfirmation(value, formData.password);
        break;
      case 'phone':
        validation = validatePhoneNumber(value);
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
    if (value.trim() || field === 'confirmEmail' || field === 'confirmPassword') {
      validateField(field, value);
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
      setFieldValidation(prev => ({ ...prev, [field]: false }));
    }

    // Actualizar comunas disponibles cuando cambia la región
    if (field === 'region') {
      const comunas = REGIONES_COMUNAS[value as keyof typeof REGIONES_COMUNAS] || [];
      setComunasDisponibles(comunas);
      setFormData(prev => ({ ...prev, comuna: '' })); // Reset comuna
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar todos los campos requeridos
    const fullNameValid = validateField('fullName', formData.fullName);
    const emailValid = validateField('email', formData.email);
    const confirmEmailValid = validateField('confirmEmail', formData.confirmEmail);
    const passwordValid = validateField('password', formData.password);
    const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
    const phoneValid = formData.phone ? validateField('phone', formData.phone) : true;

    // Validar campos requeridos adicionales
    const regionValid = !!formData.region;
    const comunaValid = !!formData.comuna;

    if (!regionValid) {
      setErrors(prev => ({ ...prev, region: 'Región es requerida' }));
    }
    if (!comunaValid) {
      setErrors(prev => ({ ...prev, comuna: 'Comuna es requerida' }));
    }

    if (fullNameValid && emailValid && confirmEmailValid && passwordValid && 
        confirmPasswordValid && phoneValid && regionValid && comunaValid) {
      // Simular proceso de registro
      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess();
      }, 1500);
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
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">TB</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Tienda Bomberos</h1>
          <p className="text-muted-foreground">Crea tu cuenta nueva</p>
        </div>

        {/* Breadcrumb */}
        <nav className="flex justify-center">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <button 
                onClick={onNavigateToLogin}
                className="hover:text-primary transition-colors"
              >
                Inicio
              </button>
            </li>
            <li>/</li>
            <li className="text-foreground">Registro</li>
          </ol>
        </nav>

        {/* Formulario de Registro */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Crear Nueva Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre Completo */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Juan Carlos Pérez González"
                      className={`pl-10 pr-10 ${
                        errors.fullName ? 'border-destructive focus:ring-destructive' : 
                        fieldValidation.fullName ? 'border-success focus:ring-success' : ''
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('fullName')}
                    </div>
                  </div>
                  {errors.fullName && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.fullName}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
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

                {/* Confirmar Email */}
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Confirmar Correo *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmEmail"
                      type="email"
                      value={formData.confirmEmail}
                      onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                      placeholder="Confirma tu correo"
                      className={`pl-10 pr-10 ${
                        errors.confirmEmail ? 'border-destructive focus:ring-destructive' : 
                        fieldValidation.confirmEmail ? 'border-success focus:ring-success' : ''
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('confirmEmail')}
                    </div>
                  </div>
                  {errors.confirmEmail && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.confirmEmail}</AlertDescription>
                    </Alert>
                  )}
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
                      placeholder="Entre 4-10 caracteres"
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

                {/* Confirmar Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirma tu contraseña"
                      className={`pl-10 pr-20 ${
                        errors.confirmPassword ? 'border-destructive focus:ring-destructive' : 
                        fieldValidation.confirmPassword ? 'border-success focus:ring-success' : ''
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {getFieldIcon('confirmPassword')}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-muted-foreground hover:text-foreground"
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.confirmPassword}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Teléfono */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Teléfono (Opcional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+56912345678"
                      className={`pl-10 pr-10 ${
                        errors.phone ? 'border-destructive focus:ring-destructive' : 
                        fieldValidation.phone ? 'border-success focus:ring-success' : ''
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('phone')}
                    </div>
                  </div>
                  {errors.phone && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.phone}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Región */}
                <div className="space-y-2">
                  <Label htmlFor="region">Región *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => handleInputChange('region', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={`${
                      errors.region ? 'border-destructive focus:ring-destructive' : ''
                    }`}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <SelectValue placeholder="Selecciona región" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(REGIONES_COMUNAS).map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.region && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.region}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Comuna */}
                <div className="space-y-2">
                  <Label htmlFor="comuna">Comuna *</Label>
                  <Select
                    value={formData.comuna}
                    onValueChange={(value) => handleInputChange('comuna', value)}
                    disabled={isSubmitting || !formData.region}
                  >
                    <SelectTrigger className={`${
                      errors.comuna ? 'border-destructive focus:ring-destructive' : ''
                    }`}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <SelectValue placeholder="Selecciona comuna" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {comunasDisponibles.map((comuna) => (
                        <SelectItem key={comuna} value={comuna}>
                          {comuna}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.comuna && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.comuna}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Botón Submit */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
              </Button>

              {/* Enlaces */}
              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-sm text-primary hover:underline"
                  disabled={isSubmitting}
                >
                  ¿Ya tienes cuenta? Inicia sesión
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