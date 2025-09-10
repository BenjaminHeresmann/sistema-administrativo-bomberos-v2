import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  validateRUT, 
  validateEmail, 
  validateName, 
  validateBirthDate, 
  validatePhone,
  validateText,
  RANGOS,
  ESPECIALIDADES,
  REGIONES_COMUNAS
} from '../utils/validation';

interface BomberoFormProps {
  bombero?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function BomberoForm({ bombero, onSave, onCancel }: BomberoFormProps) {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    rango: '',
    especialidad: '',
    region: '',
    comuna: '',
    direccion: '',
    estado: 'activo'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [comunasDisponibles, setComunasDisponibles] = useState<string[]>([]);

  useEffect(() => {
    if (bombero) {
      setFormData(bombero);
      if (bombero.region && REGIONES_COMUNAS[bombero.region as keyof typeof REGIONES_COMUNAS]) {
        setComunasDisponibles(REGIONES_COMUNAS[bombero.region as keyof typeof REGIONES_COMUNAS]);
      }
    }
  }, [bombero]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Actualizar comunas cuando cambie la región
    if (field === 'region') {
      const nuevasComunas = REGIONES_COMUNAS[value as keyof typeof REGIONES_COMUNAS] || [];
      setComunasDisponibles(nuevasComunas);
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar RUT
    const rutValidation = validateRUT(formData.rut);
    if (!rutValidation.isValid) {
      newErrors.rut = rutValidation.message;
    }

    // Validar nombre
    const nombreValidation = validateName(formData.nombre, 'Nombre', 50);
    if (!nombreValidation.isValid) {
      newErrors.nombre = nombreValidation.message;
    }

    // Validar apellidos
    const apellidosValidation = validateName(formData.apellidos, 'Apellidos', 100);
    if (!apellidosValidation.isValid) {
      newErrors.apellidos = apellidosValidation.message;
    }

    // Validar email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Validar teléfono (opcional)
    if (formData.telefono) {
      const telefonoValidation = validatePhone(formData.telefono);
      if (!telefonoValidation.isValid) {
        newErrors.telefono = telefonoValidation.message;
      }
    }

    // Validar fecha de nacimiento
    const fechaValidation = validateBirthDate(formData.fechaNacimiento);
    if (!fechaValidation.isValid) {
      newErrors.fechaNacimiento = fechaValidation.message;
    }

    // Validar campos requeridos
    if (!formData.rango) {
      newErrors.rango = 'Rango es requerido';
    }

    if (!formData.especialidad) {
      newErrors.especialidad = 'Especialidad es requerida';
    }

    if (!formData.region) {
      newErrors.region = 'Región es requerida';
    }

    if (!formData.comuna) {
      newErrors.comuna = 'Comuna es requerida';
    }

    // Validar dirección
    const direccionValidation = validateText(formData.direccion, 'Dirección', 300);
    if (!direccionValidation.isValid) {
      newErrors.direccion = direccionValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rut">RUT *</Label>
              <Input
                id="rut"
                placeholder="12345678-9"
                value={formData.rut}
                onChange={(e) => handleInputChange('rut', e.target.value)}
                className={errors.rut ? 'border-destructive' : ''}
              />
              {errors.rut && <p className="text-sm text-destructive mt-1">{errors.rut}</p>}
            </div>

            <div>
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Juan Carlos"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={errors.nombre ? 'border-destructive' : ''}
                maxLength={50}
              />
              {errors.nombre && <p className="text-sm text-destructive mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                placeholder="Pérez González"
                value={formData.apellidos}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                className={errors.apellidos ? 'border-destructive' : ''}
                maxLength={100}
              />
              {errors.apellidos && <p className="text-sm text-destructive mt-1">{errors.apellidos}</p>}
            </div>

            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                className={errors.fechaNacimiento ? 'border-destructive' : ''}
              />
              {errors.fechaNacimiento && <p className="text-sm text-destructive mt-1">{errors.fechaNacimiento}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="juan.perez@bomberos.cl"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
                maxLength={100}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Solo @bomberos.cl, @gmail.com, @outlook.com
              </p>
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="+56912345678"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className={errors.telefono ? 'border-destructive' : ''}
              />
              {errors.telefono && <p className="text-sm text-destructive mt-1">{errors.telefono}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Formato: +56912345678 (opcional)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Profesional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rango">Rango *</Label>
              <Select value={formData.rango} onValueChange={(value) => handleInputChange('rango', value)}>
                <SelectTrigger className={errors.rango ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar rango" />
                </SelectTrigger>
                <SelectContent>
                  {RANGOS.map((rango) => (
                    <SelectItem key={rango} value={rango}>
                      {rango}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.rango && <p className="text-sm text-destructive mt-1">{errors.rango}</p>}
            </div>

            <div>
              <Label htmlFor="especialidad">Especialidad *</Label>
              <Select value={formData.especialidad} onValueChange={(value) => handleInputChange('especialidad', value)}>
                <SelectTrigger className={errors.especialidad ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {ESPECIALIDADES.map((especialidad) => (
                    <SelectItem key={especialidad} value={especialidad}>
                      {especialidad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.especialidad && <p className="text-sm text-destructive mt-1">{errors.especialidad}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Residencia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="region">Región *</Label>
              <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                <SelectTrigger className={errors.region ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar región" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(REGIONES_COMUNAS).map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && <p className="text-sm text-destructive mt-1">{errors.region}</p>}
            </div>

            <div>
              <Label htmlFor="comuna">Comuna *</Label>
              <Select 
                value={formData.comuna} 
                onValueChange={(value) => handleInputChange('comuna', value)}
                disabled={!formData.region}
              >
                <SelectTrigger className={errors.comuna ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar comuna" />
                </SelectTrigger>
                <SelectContent>
                  {comunasDisponibles.map((comuna) => (
                    <SelectItem key={comuna} value={comuna}>
                      {comuna}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.comuna && <p className="text-sm text-destructive mt-1">{errors.comuna}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="direccion">Dirección *</Label>
            <Textarea
              id="direccion"
              placeholder="Av. Libertador 1234, Depto 56"
              value={formData.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              className={errors.direccion ? 'border-destructive' : ''}
              maxLength={300}
              rows={3}
            />
            {errors.direccion && <p className="text-sm text-destructive mt-1">{errors.direccion}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Máximo 300 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          {bombero ? 'Actualizar' : 'Crear'} Bombero
        </Button>
      </div>
    </form>
  );
}