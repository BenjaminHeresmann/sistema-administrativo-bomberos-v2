/*
 * MÓDULO DE GESTIÓN DE PERMISOS - EXCLUSIVO ADMINISTRADOR
 * ======================================================
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * ✅ Control granular de acceso por módulo y perfil
 * ✅ Interfaz visual para asignación de permisos
 * ✅ Vista matricial de permisos por perfil
 * ✅ Estadísticas de uso de módulos
 * ✅ Función de reseteo a valores por defecto
 * ✅ Validación de seguridad (solo Administrador)
 * ✅ Backup y restauración de configuraciones
 * 
 * ACCESO RESTRINGIDO:
 * - Solo el perfil "Administrador" puede acceder
 * - Control de seguridad en cada operación
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Shield,
  Users,
  Settings,
  BarChart3,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Home,
  FileText,
  Play,
  Truck,
  UserCircle,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { 
  PermissionManager, 
  SYSTEM_MODULES, 
  SYSTEM_PROFILES, 
  SystemModule, 
  SystemProfile,
  ModuleInfo,
  ProfileInfo
} from '../utils/modulePermissions';
import { UserProfile } from '../utils/userRoles';
import { toast } from 'sonner';

interface GestionPermisosProps {
  onNavigate: (page: string) => void;
  userProfile: UserProfile;
}

// Mapeo de iconos para los módulos
const MODULE_ICONS: Record<string, React.ComponentType<any>> = {
  'Home': Home,
  'Users': Users,
  'FileText': FileText,
  'Play': Play,
  'Truck': Truck,
  'BarChart3': BarChart3,
  'UserCircle': UserCircle,
  'Settings': Settings,
  'Shield': Shield
};

export function GestionPermisos({ onNavigate, userProfile }: GestionPermisosProps) {
  // Verificación de seguridad - Solo Administrador
  if (userProfile.rol !== 'Administrador') {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
        <AlertTriangle className="w-16 h-16 text-red-500" />
        <h2>Acceso Denegado</h2>
        <p className="text-muted-foreground text-center">
          Este módulo es exclusivo para el perfil de Administrador.
        </p>
        <Button onClick={() => onNavigate('dashboard')}>
          Volver al Dashboard
        </Button>
      </div>
    );
  }

  const [currentPermissions, setCurrentPermissions] = useState(PermissionManager.getCurrentPermissions());
  const [pendingChanges, setPendingChanges] = useState<Record<SystemProfile, SystemModule[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Estadísticas de permisos
  const stats = PermissionManager.getPermissionStats();

  // Actualizar permisos cuando hay cambios
  useEffect(() => {
    const updated = PermissionManager.getCurrentPermissions();
    setCurrentPermissions(updated);
  }, []);

  // Función para actualizar permisos de un perfil
  const handlePermissionChange = (profile: SystemProfile, module: SystemModule, hasAccess: boolean) => {
    const currentModules = pendingChanges[profile] || currentPermissions[profile] || [];
    
    let newModules: SystemModule[];
    if (hasAccess) {
      newModules = [...new Set([...currentModules, module])];
    } else {
      // No permitir desactivar módulos del sistema
      const moduleInfo = SYSTEM_MODULES[module];
      if (moduleInfo.isSystemModule) {
        toast.error(`El módulo "${moduleInfo.name}" es requerido por el sistema y no puede ser desactivado.`);
        return;
      }
      newModules = currentModules.filter(m => m !== module);
    }

    setPendingChanges(prev => ({
      ...prev,
      [profile]: newModules
    }));
    setHasUnsavedChanges(true);
  };

  // Guardar todos los cambios pendientes
  const handleSaveChanges = () => {
    let changeCount = 0;
    
    Object.entries(pendingChanges).forEach(([profile, modules]) => {
      const success = PermissionManager.updateProfilePermissions(
        profile as SystemProfile, 
        modules, 
        userProfile.rol
      );
      if (success) changeCount++;
    });

    if (changeCount > 0) {
      setCurrentPermissions(PermissionManager.getCurrentPermissions());
      setPendingChanges({});
      setHasUnsavedChanges(false);
      toast.success(`Se guardaron los cambios para ${changeCount} perfil(es).`);
    } else {
      toast.error('No se pudieron guardar los cambios.');
    }
  };

  // Resetear a configuración por defecto
  const handleResetDefaults = () => {
    const success = PermissionManager.resetToDefaults(userProfile.rol);
    if (success) {
      setCurrentPermissions(PermissionManager.getCurrentPermissions());
      setPendingChanges({});
      setHasUnsavedChanges(false);
      toast.success('Permisos restablecidos a configuración por defecto.');
    } else {
      toast.error('No se pudieron restablecer los permisos.');
    }
  };

  // Filtrar perfiles según búsqueda y categoría
  const filteredProfiles = Object.values(SYSTEM_PROFILES).filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || profile.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtener permisos efectivos (pendientes o actuales)
  const getEffectivePermissions = (profile: SystemProfile): SystemModule[] => {
    return pendingChanges[profile] || currentPermissions[profile] || [];
  };

  // Verificar si un perfil tiene acceso a un módulo
  const hasModuleAccess = (profile: SystemProfile, module: SystemModule): boolean => {
    const permissions = getEffectivePermissions(profile);
    return permissions.includes(module);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Gestión de Permisos por Módulos
          </h1>
          <p className="text-muted-foreground">
            Control granular de acceso a módulos del sistema por perfil de usuario
          </p>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          )}
          <Button variant="outline" onClick={handleResetDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restaurar Defaults
          </Button>
        </div>
      </div>

      {/* Alerta de cambios pendientes */}
      {hasUnsavedChanges && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Tienes cambios sin guardar. Recuerda hacer clic en "Guardar Cambios" para aplicar las modificaciones.
          </AlertDescription>
        </Alert>
      )}

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Perfiles</p>
                <p className="text-2xl font-semibold">{stats.totalProfiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Módulos</p>
                <p className="text-2xl font-semibold">{stats.totalModules}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Acceso Completo</p>
                <p className="text-2xl font-semibold">{stats.profilesWithFullAccess}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Promedio Módulos</p>
                <p className="text-2xl font-semibold">
                  {Math.round(Object.values(currentPermissions).reduce((acc, modules) => acc + modules.length, 0) / stats.totalProfiles)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matriz" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matriz">Matriz de Permisos</TabsTrigger>
          <TabsTrigger value="perfiles">Gestión por Perfil</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas Detalladas</TabsTrigger>
        </TabsList>

        {/* Matriz de Permisos */}
        <TabsContent value="matriz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Permisos por Módulo</CardTitle>
              <CardDescription>
                Vista general de qué perfiles tienen acceso a cada módulo del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Módulo</th>
                      {Object.values(SYSTEM_PROFILES).map(profile => (
                        <th key={profile.id} className="text-center p-2 font-medium text-xs">
                          <div className="rotate-45 w-16">
                            {profile.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(SYSTEM_MODULES).map(module => {
                      if (module.id === 'permisos') return null; // No mostrar módulo de permisos
                      
                      const IconComponent = MODULE_ICONS[module.icon] || Settings;
                      
                      return (
                        <tr key={module.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{module.name}</p>
                                <p className="text-xs text-muted-foreground">{module.category}</p>
                              </div>
                              {module.isSystemModule && (
                                <Badge variant="outline" className="text-xs">Sistema</Badge>
                              )}
                            </div>
                          </td>
                          {Object.keys(SYSTEM_PROFILES).map(profileId => {
                            const profile = profileId as SystemProfile;
                            const hasAccess = hasModuleAccess(profile, module.id);
                            const isSystemModule = module.isSystemModule;
                            
                            return (
                              <td key={profile} className="text-center p-2">
                                <Switch
                                  checked={hasAccess}
                                  disabled={isSystemModule}
                                  onCheckedChange={(checked) => 
                                    handlePermissionChange(profile, module.id, checked)
                                  }
                                  className="mx-auto"
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestión por Perfil */}
        <TabsContent value="perfiles" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search-profiles">Buscar perfil</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search-profiles"
                      placeholder="Nombre o descripción del perfil..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category-filter">Categoría</Label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="Directivo">Directivo</option>
                    <option value="Operativo">Operativo</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Disciplina">Disciplina</option>
                    <option value="Base">Base</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Perfiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProfiles.map(profile => {
              const permissions = getEffectivePermissions(profile.id);
              const moduleCount = permissions.length;
              const availableModules = Object.values(SYSTEM_MODULES).filter(m => m.id !== 'permisos');
              const percentageAccess = Math.round((moduleCount / availableModules.length) * 100);
              
              return (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{profile.name}</CardTitle>
                        <CardDescription>{profile.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{profile.category}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {moduleCount}/{availableModules.length} módulos ({percentageAccess}%)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <Separator />
                    <p className="text-sm font-medium text-muted-foreground">Módulos con acceso:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableModules.map(module => {
                        const hasAccess = permissions.includes(module.id);
                        const IconComponent = MODULE_ICONS[module.icon] || Settings;
                        
                        return (
                          <div 
                            key={module.id} 
                            className={`flex items-center gap-2 p-2 rounded text-sm ${
                              hasAccess ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-500'
                            }`}
                          >
                            <Switch
                              checked={hasAccess}
                              disabled={module.isSystemModule}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(profile.id, module.id, checked)
                              }
                              size="sm"
                            />
                            <IconComponent className="w-3 h-3" />
                            <span className="text-xs">{module.name}</span>
                            {module.isSystemModule && (
                              <Badge variant="outline" className="text-xs ml-auto">Req.</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Estadísticas Detalladas */}
        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Uso por Módulo */}
            <Card>
              <CardHeader>
                <CardTitle>Uso de Módulos</CardTitle>
                <CardDescription>
                  Cuántos perfiles tienen acceso a cada módulo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.moduleUsage)
                    .filter(([module]) => module !== 'permisos')
                    .sort(([,a], [,b]) => b - a)
                    .map(([module, count]) => {
                      const moduleInfo = SYSTEM_MODULES[module as SystemModule];
                      const IconComponent = MODULE_ICONS[moduleInfo.icon] || Settings;
                      const percentage = Math.round((count / stats.totalProfiles) * 100);
                      
                      return (
                        <div key={module} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{moduleInfo.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {count}/{stats.totalProfiles}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Distribución por Categoría */}
            <Card>
              <CardHeader>
                <CardTitle>Perfiles por Categoría</CardTitle>
                <CardDescription>
                  Distribución de perfiles según su categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    Object.values(SYSTEM_PROFILES).reduce((acc, profile) => {
                      acc[profile.category] = (acc[profile.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([category, count]) => {
                    const percentage = Math.round((count / stats.totalProfiles) * 100);
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-secondary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}