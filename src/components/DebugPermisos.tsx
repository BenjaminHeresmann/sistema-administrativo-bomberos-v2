/*
 * COMPONENTE DE DEBUG TEMPORAL PARA VERIFICAR PERMISOS
 * ===================================================
 * Solo para desarrollo - permite verificar que el sistema
 * de permisos esté funcionando correctamente
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PermissionManager } from '../utils/modulePermissions';
import { UserProfile } from '../utils/userRoles';

interface DebugPermisosProps {
  userProfile: UserProfile;
}

export function DebugPermisos({ userProfile }: DebugPermisosProps) {
  const handleForceReset = () => {
    PermissionManager.forceResetPermissions();
    window.location.reload(); // Recargar para aplicar cambios
  };

  const currentPermissions = PermissionManager.getCurrentPermissions();
  const userModules = PermissionManager.getAllowedModules(userProfile.rol);
  const canAccessPermisos = PermissionManager.canAccessModule(userProfile.rol, 'permisos');

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-yellow-800">🔧 Debug Sistema de Permisos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Usuario Actual:</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Rol:</strong> {userProfile.rol}</p>
              <p><strong>Puede acceder a "permisos":</strong> 
                <Badge className={canAccessPermisos ? 'bg-green-600' : 'bg-red-600'}>
                  {canAccessPermisos ? 'SÍ' : 'NO'}
                </Badge>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Módulos Permitidos:</h4>
            <div className="flex flex-wrap gap-1">
              {userModules.map(module => (
                <Badge key={module} variant="outline" className="text-xs">
                  {module}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-yellow-800 mb-2">Estado del Sistema:</h4>
          <div className="text-sm space-y-1">
            <p>• Director tiene "permisos": 
              <Badge className={currentPermissions['Director']?.includes('permisos') ? 'bg-red-600' : 'bg-green-600'}>
                {currentPermissions['Director']?.includes('permisos') ? 'SÍ (ERROR)' : 'NO (CORRECTO)'}
              </Badge>
            </p>
            <p>• Total perfiles configurados: {Object.keys(currentPermissions).length}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-yellow-300">
          <p className="text-xs text-yellow-700 mb-2">
            Si hay problemas, usar este botón para resetear completamente:
          </p>
          <Button 
            onClick={handleForceReset}
            variant="outline" 
            size="sm"
            className="border-yellow-400 text-yellow-800 hover:bg-yellow-100"
          >
            🔄 Reset Completo (Emergency)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}