/*
 * UTILIDAD DE AUTOARREGLO DE PERMISOS - SISTEMA BOMBEROS
 * ======================================================
 * 
 * Funciones para verificar y corregir automáticamente problemas
 * con el sistema de permisos, especialmente después de actualizaciones
 * que agregan nuevos módulos.
 */

import { PermissionManager, SystemProfile, SystemModule, DEFAULT_PERMISSIONS } from './modulePermissions';

/**
 * FUNCIÓN DE AUTOARREGLO DE PERMISOS
 * =================================
 * Se ejecuta automáticamente al cargar la aplicación para verificar
 * que todos los permisos estén correctamente configurados
 */
export function autoFixPermissions(): void {
  console.log('[AUTOFIX] Verificando integridad del sistema de permisos...');
  
  try {
    // Obtener permisos actuales
    const currentPermissions = PermissionManager.getCurrentPermissions();
    let hasChanges = false;
    
    // Lista de submódulos que deben estar disponibles para todos los perfiles
    const requiredReadOnlyModules: SystemModule[] = [
      'personal-view',
      'maquinas-view', 
      'citaciones-view'
    ];
    
    // Verificar cada perfil
    Object.keys(currentPermissions).forEach(profile => {
      const profileKey = profile as SystemProfile;
      const profilePerms = currentPermissions[profileKey];
      
      // Agregar submódulos de lectura faltantes
      requiredReadOnlyModules.forEach(module => {
        if (!profilePerms.includes(module)) {
          profilePerms.push(module);
          hasChanges = true;
          console.log(`[AUTOFIX] Agregado '${module}' al perfil ${profile}`);
        }
      });
      
      // Verificar que el perfil tenga los permisos mínimos según DEFAULT_PERMISSIONS
      const defaultPerms = DEFAULT_PERMISSIONS[profileKey];
      if (defaultPerms) {
        defaultPerms.forEach(module => {
          if (!profilePerms.includes(module)) {
            profilePerms.push(module);
            hasChanges = true;
            console.log(`[AUTOFIX] Restaurado '${module}' al perfil ${profile}`);
          }
        });
      }
    });
    
    // Guardar cambios si es necesario
    if (hasChanges) {
      PermissionManager.savePermissions(currentPermissions);
      console.log('[AUTOFIX] ✅ Permisos corregidos y guardados correctamente');
    } else {
      console.log('[AUTOFIX] ✅ Sistema de permisos íntegro, no se requieren cambios');
    }
    
    // Mostrar resumen del estado actual
    console.log('[AUTOFIX] Estado actual del sistema:');
    Object.keys(currentPermissions).forEach(profile => {
      const moduleCount = currentPermissions[profile as SystemProfile].length;
      console.log(`  - ${profile}: ${moduleCount} módulos disponibles`);
    });
    
  } catch (error) {
    console.error('[AUTOFIX] ❌ Error al verificar permisos:', error);
    
    // En caso de error crítico, forzar reset a defaults
    console.log('[AUTOFIX] Forzando reset a configuración por defecto...');
    try {
      PermissionManager.savePermissions({ ...DEFAULT_PERMISSIONS });
      console.log('[AUTOFIX] ✅ Reset completado, usando configuración por defecto');
    } catch (resetError) {
      console.error('[AUTOFIX] ❌ Error crítico al resetear permisos:', resetError);
    }
  }
}

/**
 * FUNCIÓN DE LIMPIEZA DE EMERGENCIA
 * ================================
 * Para casos donde el sistema de permisos está completamente corrupto
 */
export function emergencyPermissionReset(): void {
  console.log('[EMERGENCY] Iniciando reset de emergencia del sistema de permisos...');
  
  try {
    // Limpiar localStorage
    localStorage.removeItem('bomberos_module_permissions');
    
    // Reinstalar permisos por defecto
    PermissionManager.savePermissions({ ...DEFAULT_PERMISSIONS });
    
    console.log('[EMERGENCY] ✅ Reset de emergencia completado exitosamente');
    console.log('[EMERGENCY] El sistema debería funcionar normalmente ahora');
    
    // Verificar que el reset funcionó
    const newPermissions = PermissionManager.getCurrentPermissions();
    const profileCount = Object.keys(newPermissions).length;
    console.log(`[EMERGENCY] Verificación: ${profileCount} perfiles restaurados`);
    
  } catch (error) {
    console.error('[EMERGENCY] ❌ Error crítico durante reset de emergencia:', error);
    alert('Error crítico en el sistema de permisos. Por favor, contacte al administrador del sistema.');
  }
}

/**
 * FUNCIÓN DE DIAGNÓSTICO
 * =====================
 * Genera un reporte detallado del estado del sistema de permisos
 */
export function diagnosePermissions(): void {
  console.log('='.repeat(60));
  console.log('DIAGNÓSTICO DEL SISTEMA DE PERMISOS');
  console.log('='.repeat(60));
  
  try {
    const currentPermissions = PermissionManager.getCurrentPermissions();
    const stats = PermissionManager.getPermissionStats();
    
    console.log(`📊 ESTADÍSTICAS GENERALES:`);
    console.log(`   • Total de perfiles: ${stats.totalProfiles}`);
    console.log(`   • Total de módulos: ${stats.totalModules}`);
    console.log(`   • Perfiles con acceso completo: ${stats.profilesWithFullAccess}`);
    
    console.log(`\n📋 DETALLE POR PERFIL:`);
    Object.entries(currentPermissions).forEach(([profile, modules]) => {
      console.log(`   • ${profile}: ${modules.length} módulos`);
      console.log(`     - ${modules.join(', ')}`);
    });
    
    console.log(`\n🔧 USO DE MÓDULOS:`);
    Object.entries(stats.moduleUsage).forEach(([module, count]) => {
      console.log(`   • ${module}: usado por ${count} perfiles`);
    });
    
  } catch (error) {
    console.error('❌ Error durante diagnóstico:', error);
  }
  
  console.log('='.repeat(60));
}