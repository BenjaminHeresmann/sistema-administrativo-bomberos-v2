/*
 * SISTEMA DE DEBUGGING - BOMBEROS
 * ===============================
 * 
 * Utilidades para diagnosticar problemas del sistema
 * y proporcionar información útil para debugging
 */

export function debugSystemInit(): void {
  console.log('🔧 SISTEMA DE DEBUGGING INICIALIZADO');
  console.log('=====================================');
  
  // Verificar localStorage
  try {
    const testKey = 'debug_test';
    localStorage.setItem(testKey, 'ok');
    localStorage.removeItem(testKey);
    console.log('✅ LocalStorage funcionando correctamente');
  } catch (error) {
    console.error('❌ Error en localStorage:', error);
  }
  
  // Verificar React Router
  try {
    const location = window.location;
    console.log('✅ React Router - URL actual:', location.pathname);
  } catch (error) {
    console.error('❌ Error en React Router:', error);
  }
  
  // Verificar permisos
  try {
    const permissions = localStorage.getItem('bomberos_module_permissions');
    if (permissions) {
      console.log('✅ Permisos encontrados en localStorage');
      const parsed = JSON.parse(permissions);
      console.log('📊 Perfiles en sistema:', Object.keys(parsed));
    } else {
      console.log('⚠️ No hay permisos en localStorage');
    }
  } catch (error) {
    console.error('❌ Error al verificar permisos:', error);
  }
  
  // Verificar sesión de usuario
  try {
    const userSession = localStorage.getItem('bomberos_user_profile');
    if (userSession) {
      const user = JSON.parse(userSession);
      console.log('✅ Sesión de usuario encontrada:', user.rol);
    } else {
      console.log('⚠️ No hay sesión de usuario');
    }
  } catch (error) {
    console.error('❌ Error al verificar sesión:', error);
  }
  
  console.log('=====================================');
}

export function debugPermissions(): void {
  console.log('🔍 DEBUGGING DE PERMISOS');
  console.log('========================');
  
  try {
    const permissionsKey = 'bomberos_module_permissions';
    const permissions = localStorage.getItem(permissionsKey);
    
    if (!permissions) {
      console.log('❌ No hay permisos guardados');
      return;
    }
    
    const parsed = JSON.parse(permissions);
    
    Object.entries(parsed).forEach(([profile, modules]: [string, any]) => {
      console.log(`📋 ${profile}:`);
      console.log(`   Módulos: ${modules.length}`);
      console.log(`   Lista: ${modules.join(', ')}`);
    });
    
  } catch (error) {
    console.error('❌ Error al debuggear permisos:', error);
  }
  
  console.log('========================');
}

export function debugUserSession(): void {
  console.log('👤 DEBUGGING DE SESIÓN');
  console.log('======================');
  
  try {
    const userProfile = localStorage.getItem('bomberos_user_profile');
    const authStatus = localStorage.getItem('bomberos_auth');
    
    console.log('Auth Status:', authStatus);
    
    if (userProfile) {
      const user = JSON.parse(userProfile);
      console.log('Usuario:', user.nombre, user.apellidos);
      console.log('Rol:', user.rol);
      console.log('Email:', user.email);
      console.log('Autenticado:', user.isAuthenticated);
    } else {
      console.log('❌ No hay perfil de usuario');
    }
    
  } catch (error) {
    console.error('❌ Error al debuggear sesión:', error);
  }
  
  console.log('======================');
}

export function debugRoutes(): void {
  console.log('🗺️ DEBUGGING DE RUTAS');
  console.log('=====================');
  
  console.log('URL actual:', window.location.pathname);
  console.log('Hash:', window.location.hash);
  console.log('Search:', window.location.search);
  
  console.log('=====================');
}

// Función master para debugging completo
export function fullSystemDebug(): void {
  console.clear();
  console.log('🚨 DEBUGGING COMPLETO DEL SISTEMA');
  console.log('==================================');
  
  debugSystemInit();
  debugPermissions();
  debugUserSession();
  debugRoutes();
  
  console.log('==================================');
  console.log('🔚 Debugging completado');
}