import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  User,
  Lock,
  Edit3,
  Save,
  X,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Phone,
  MapPin,
  Calendar,
  Mail,
  Building,
  Shield,
  Hash,
  Clock,
  ChevronDown,
  ChevronUp,
  Home,
  ArrowLeft,
  Bell,
  History,
  Info
} from 'lucide-react';

import {
  UserProfile as UserProfileType,
  ProfileChangeLog,
  mockUserProfile,
  mockProfileHistory,
  validateProfileForm,
  validateAddress,
  validateChileanPhoneProfile,
  validateDifferentPhones,
  formatChileanPhone,
  calculateAge,
  formatDate
} from '../utils/profileValidation';

// Importar logos
import logoBomberos1884 from 'figma:asset/a23b53c24c8238d7f027a771588d221cb5dfa71b.png';
import logoCompania2 from 'figma:asset/23e93561d95c366985ce61daf32b48c09b99a535.png';

interface UserProfileProps {
  onNavigate: (page: string) => void;
}

export function UserProfile({ onNavigate }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileType>(mockUserProfile);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({
    direccion: profile.direccion,
    telefonoPersonal: profile.telefonoPersonal,
    telefonoEmergencia: profile.telefonoEmergencia
  });
  const [originalData, setOriginalData] = useState({
    direccion: profile.direccion,
    telefonoPersonal: profile.telefonoPersonal,
    telefonoEmergencia: profile.telefonoEmergencia
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const validateField = (field: string, value: string) => {
    let validation = { isValid: false, message: '' };

    switch (field) {
      case 'direccion':
        validation = validateAddress(value);
        break;
      case 'telefonoPersonal':
        validation = validateChileanPhoneProfile(value, true);
        break;
      case 'telefonoEmergencia':
        validation = validateChileanPhoneProfile(value, false);
        // Validar que sean diferentes si ambos están completos
        if (validation.isValid && value && editableData.telefonoPersonal) {
          const differentValidation = validateDifferentPhones(editableData.telefonoPersonal, value);
          if (!differentValidation.isValid) {
            validation = differentValidation;
          }
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
    setEditableData(prev => ({ ...prev, [field]: value }));
    
    // Validación en tiempo real
    validateField(field, value);

    // Verificar si hay cambios no guardados
    const hasChanges = 
      value !== originalData[field as keyof typeof originalData] ||
      editableData.direccion !== originalData.direccion ||
      editableData.telefonoPersonal !== originalData.telefonoPersonal ||
      editableData.telefonoEmergencia !== originalData.telefonoEmergencia;
    
    setHasUnsavedChanges(hasChanges);

    // Re-validar teléfono de emergencia si se cambió el teléfono personal
    if (field === 'telefonoPersonal' && editableData.telefonoEmergencia) {
      validateField('telefonoEmergencia', editableData.telefonoEmergencia);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
    setOriginalData({
      direccion: profile.direccion,
      telefonoPersonal: profile.telefonoPersonal,
      telefonoEmergencia: profile.telefonoEmergencia
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableData({
      direccion: originalData.direccion,
      telefonoPersonal: originalData.telefonoPersonal,
      telefonoEmergencia: originalData.telefonoEmergencia
    });
    setErrors({});
    setFieldValidation({});
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    setEditableData({
      direccion: profile.direccion,
      telefonoPersonal: profile.telefonoPersonal,
      telefonoEmergencia: profile.telefonoEmergencia
    });
    setErrors({});
    setFieldValidation({});
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    const validation = validateProfileForm(editableData);
    
    if (validation.isValid) {
      setShowConfirmDialog(true);
    } else {
      setErrors(validation.errors);
    }
  };

  const confirmSave = () => {
    // Simular guardado
    setProfile(prev => ({
      ...prev,
      ...editableData,
      fechaUltimaModificacion: new Date().toISOString(),
      modificadoPor: profile.correoInstitucional
    }));
    
    setOriginalData({
      direccion: editableData.direccion,
      telefonoPersonal: editableData.telefonoPersonal,
      telefonoEmergencia: editableData.telefonoEmergencia
    });
    
    setEditMode(false);
    setShowConfirmDialog(false);
    setHasUnsavedChanges(false);
    setSuccessMessage('¡Perfil actualizado exitosamente!');
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const getFieldIcon = (field: string) => {
    if (!editableData[field as keyof typeof editableData] && field !== 'telefonoEmergencia') return null;

    if (fieldValidation[field]) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    } else if (errors[field]) {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  const getFieldBorderClass = (field: string) => {
    if (!editableData[field as keyof typeof editableData] && field !== 'telefonoEmergencia') return '';

    if (fieldValidation[field]) {
      return 'border-success focus:ring-success';
    } else if (errors[field]) {
      return 'border-destructive focus:ring-destructive';
    }
    return '';
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'Activo':
        return <Badge className="bg-success text-success-foreground">Activo</Badge>;
      case 'Inactivo':
        return <Badge variant="secondary">Inactivo</Badge>;
      case 'Licencia':
        return <Badge className="bg-warning text-warning-foreground">En Licencia</Badge>;
      case 'Suspendido':
        return <Badge variant="destructive">Suspendido</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const changesData = [
    { field: 'Dirección', old: originalData.direccion, new: editableData.direccion },
    { field: 'Teléfono Personal', old: originalData.telefonoPersonal, new: editableData.telefonoPersonal },
    { field: 'Teléfono de Emergencia', old: originalData.telefonoEmergencia, new: editableData.telefonoEmergencia }
  ].filter(item => item.old !== item.new);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="h-auto p-0 hover:text-primary"
        >
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </Button>
        <span>/</span>
        <span className="text-foreground">Mi Perfil</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <img 
              src={logoBomberos1884} 
              alt="Bomberos 1884" 
              className="w-12 h-12 object-contain logo-hover-effect"
            />
            <img 
              src={logoCompania2} 
              alt="2ª Compañía" 
              className="w-12 h-12 object-contain logo-hover-effect"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Mi Perfil</h1>
            <p className="text-muted-foreground">
              Gestión de información personal y de contacto
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistoryDialog(true)}
          >
            <History className="w-4 h-4 mr-2" />
            Ver Historial
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <Alert className="border-success bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{successMessage}</span>
              <span className="text-sm">Se ha notificado el cambio al sistema</span>
              <span className="text-xs">Cambios guardados el {formatDate(new Date().toISOString())}</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información No Editable */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              Datos Institucionales
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Información protegida del sistema
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="font-medium mb-3 text-foreground">Información Personal</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">RUN/RUT:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.run}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Nombre:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.nombreCompleto}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Fecha Nac.:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.fechaNacimiento} ({calculateAge(profile.fechaNacimiento)} años)</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{profile.correoInstitucional}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información Bomberil */}
            <div>
              <h3 className="font-medium mb-3 text-foreground">Información Bomberil</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Compañía:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.compania}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Cargo:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.cargo}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Matrícula:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.numeroMatricula}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Ingreso:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.fechaIngreso}</span>
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Estado:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(profile.estado)}
                    <Lock className="w-3 h-3 text-muted-foreground" title="Campo protegido" />
                  </div>
                </div>
              </div>
            </div>

            <Alert className="border-info bg-info/5">
              <Info className="h-4 w-4 text-info" />
              <AlertDescription className="text-info text-sm">
                Para modificar datos institucionales, contacta a Recursos Humanos o al administrador del sistema.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Información Editable */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" />
                  Datos de Contacto
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Información editable por el usuario
                </p>
              </div>
              {!editMode && (
                <Button onClick={handleEditMode} size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección de Domicilio Personal *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                <Textarea
                  id="direccion"
                  value={editableData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Calle/Avenida, Número, Depto/Casa, Comuna, Región"
                  disabled={!editMode}
                  className={`pl-10 pr-10 min-h-20 ${getFieldBorderClass('direccion')} ${
                    !editMode ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''
                  }`}
                  maxLength={200}
                />
                {editMode && (
                  <div className="absolute right-3 top-3">
                    {getFieldIcon('direccion')}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Incluye calle, número, comuna y región (Ej: Av. Libertad 1234, Depto 5B, Viña del Mar, Valparaíso)
              </p>
              {errors.direccion && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.direccion}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Teléfono Personal */}
            <div className="space-y-2">
              <Label htmlFor="telefonoPersonal">Número de Contacto Personal *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="telefonoPersonal"
                  type="tel"
                  value={editMode ? editableData.telefonoPersonal : formatChileanPhone(editableData.telefonoPersonal)}
                  onChange={(e) => handleInputChange('telefonoPersonal', e.target.value)}
                  placeholder="+56 9 1234 5678"
                  disabled={!editMode}
                  className={`pl-10 pr-10 ${getFieldBorderClass('telefonoPersonal')} ${
                    !editMode ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''
                  }`}
                />
                {editMode && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldIcon('telefonoPersonal')}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Número móvil para contacto de emergencia (formato: +56 9 XXXX XXXX)
              </p>
              {errors.telefonoPersonal && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.telefonoPersonal}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Teléfono de Emergencia */}
            <div className="space-y-2">
              <Label htmlFor="telefonoEmergencia">Contacto de Emergencia (opcional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="telefonoEmergencia"
                  type="tel"
                  value={editMode ? editableData.telefonoEmergencia : formatChileanPhone(editableData.telefonoEmergencia)}
                  onChange={(e) => handleInputChange('telefonoEmergencia', e.target.value)}
                  placeholder="+56 9 8765 4321"
                  disabled={!editMode}
                  className={`pl-10 pr-10 ${getFieldBorderClass('telefonoEmergencia')} ${
                    !editMode ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''
                  }`}
                />
                {editMode && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldIcon('telefonoEmergencia')}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Familiar o contacto alternativo para emergencias (debe ser diferente al teléfono personal)
              </p>
              {errors.telefonoEmergencia && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.telefonoEmergencia}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Botones de acción */}
            {editMode && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || Object.keys(errors).some(key => errors[key])}
                  className="bg-success hover:bg-success/90 text-success-foreground flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={!hasUnsavedChanges}
                  className="border-warning text-warning hover:bg-warning/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restablecer
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}

            {/* Información de última modificación */}
            {profile.fechaUltimaModificacion && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Última modificación: {formatDate(profile.fechaUltimaModificacion)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historial expandible */}
      <Card>
        <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Historial de Cambios Recientes
                </CardTitle>
                {isHistoryOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                {mockProfileHistory.slice(0, 3).map((change) => (
                  <div key={change.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{change.campo}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(change.fecha)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="line-through">{change.valorAnterior}</span>
                        <span className="mx-2">→</span>
                        <span className="text-foreground font-medium">{change.valorNuevo}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistoryDialog(true)}
                  className="w-full"
                >
                  Ver Historial Completo
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Modal de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent aria-describedby="confirm-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              ¿Confirmar cambios?
            </DialogTitle>
            <DialogDescription id="confirm-dialog-description">
              Los siguientes datos serán actualizados en tu perfil:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            {changesData.map((change, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg">
                <div className="font-medium text-sm mb-1">{change.field}:</div>
                <div className="text-sm text-muted-foreground">
                  <span className="line-through">{change.old}</span>
                  <span className="mx-2">→</span>
                  <span className="text-foreground font-medium">{change.new}</span>
                </div>
              </div>
            ))}
          </div>

          <Alert className="border-info bg-info/5">
            <Bell className="h-4 w-4 text-info" />
            <AlertDescription className="text-info text-sm">
              Se notificará automáticamente a tu superior directo sobre estos cambios.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmSave} className="bg-success hover:bg-success/90">
              Confirmar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de historial completo */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="history-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Historial Completo de Cambios
            </DialogTitle>
            <DialogDescription id="history-dialog-description">
              Registro de todas las modificaciones realizadas a tu perfil
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {mockProfileHistory.map((change) => (
              <div key={change.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{change.campo}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(change.fecha)}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="mb-1">
                    <span className="text-muted-foreground">Anterior:</span>
                    <span className="ml-2 line-through">{change.valorAnterior}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Nuevo:</span>
                    <span className="ml-2 font-medium text-foreground">{change.valorNuevo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHistoryDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}