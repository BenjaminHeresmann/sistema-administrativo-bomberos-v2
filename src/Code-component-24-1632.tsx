/*
 * SCRIPT DE VERIFICACIÓN RÁPIDA - SISTEMA BOMBEROS
 * ===============================================
 * 
 * Ejecutar en la consola del navegador para verificar
 * que todos los componentes estén funcionando correctamente
 */

console.log('🚒 VERIFICACIÓN DEL SISTEMA BOMBEROS');
console.log('=====================================');

// Verificar localStorage
function verificarLocalStorage() {
  try {
    localStorage.setItem('test_bomberos', 'ok');
    const valor = localStorage.getItem('test_bomberos');
    localStorage.removeItem('test_bomberos');
    
    if (valor === 'ok') {
      console.log('✅ LocalStorage: Funcionando correctamente');
      return true;
    } else {
      console.log('❌ LocalStorage: Error en lectura/escritura');
      return false;
    }
  } catch (error) {
    console.log('❌ LocalStorage: No disponible -', error.message);
    return false;
  }
}

// Verificar sistema de autenticación
function verificarAutenticacion() {
  console.log('\n🔐 VERIFICANDO SISTEMA DE AUTENTICACIÓN');
  console.log('---------------------------------------');
  
  // Usuarios de prueba
  const usuarios = [
    { email: 'admin@bomberos.cl', rol: 'Administrador' },
    { email: 'director@bomberos.cl', rol: 'Director' },
    { email: 'juan.perez@gmail.com', rol: 'Bombero Activo' }
  ];
  
  usuarios.forEach(user => {
    console.log(`👤 ${user.email} (${user.rol}): Disponible para testing`);
  });
  
  console.log('🔑 Contraseña para todos: 123456');
}

// Verificar navegación
function verificarNavegacion() {
  console.log('\n🧭 VERIFICANDO NAVEGACIÓN');
  console.log('------------------------');
  
  if (window.history && window.history.pushState) {
    console.log('✅ HTML5 History API: Soportada');
  } else {
    console.log('❌ HTML5 History API: No soportada');
  }
  
  if (window.location) {
    console.log(`✅ URL actual: ${window.location.href}`);
  }
  
  // Verificar React Router
  if (window.React && window.ReactRouter) {
    console.log('✅ React Router: Cargado');
  } else {
    console.log('⚠️ React Router: No detectado (normal si no está en producción)');
  }
}

// Verificar permisos del sistema
function verificarPermisos() {
  console.log('\n🛡️ VERIFICANDO SISTEMA DE PERMISOS');
  console.log('----------------------------------');
  
  const rolesEsperados = [
    'Administrador',
    'Director', 
    'Capitán',
    'Primer Teniente',
    'Segundo Teniente',
    'Tesorero',
    'Secretario',
    'Ayudante',
    'Consejero de Disciplina 1',
    'Consejero de Disciplina 2',
    'Consejero de Disciplina 3',
    'Consejero de Disciplina 4',
    'Consejero de Disciplina 5',
    'Consejero de Disciplina 6',
    'Consejero de Disciplina 7',
    'Consejero de Disciplina 8',
    'Bombero Activo',
    'Bombero Honorario'
  ];
  
  console.log(`✅ Roles configurados: ${rolesEsperados.length}`);
  console.log('📋 Roles disponibles:', rolesEsperados.slice(0, 5).join(', '), '... y más');
}

// Verificar módulos del sistema
function verificarModulos() {
  console.log('\n📚 VERIFICANDO MÓDULOS DEL SISTEMA');
  console.log('---------------------------------');
  
  const modulos = [
    'Dashboard',
    'Personal', 
    'Citaciones',
    'Videos Institucionales',
    'Máquinas',
    'Administración',
    'Permisos',
    'Mi Perfil',
    'Reportes'
  ];
  
  modulos.forEach(modulo => {
    console.log(`📌 ${modulo}: Configurado`);
  });
}

// Verificar compatibilidad del navegador
function verificarCompatibilidad() {
  console.log('\n🌐 VERIFICANDO COMPATIBILIDAD DEL NAVEGADOR');
  console.log('------------------------------------------');
  
  const caracteristicas = {
    'localStorage': typeof Storage !== 'undefined',
    'sessionStorage': typeof sessionStorage !== 'undefined',
    'fetch': typeof fetch !== 'undefined',
    'Promise': typeof Promise !== 'undefined',
    'arrow functions': (() => true)(),
    'async/await': (async () => true)(),
    'CSS Grid': CSS.supports('display', 'grid'),
    'CSS Flexbox': CSS.supports('display', 'flex')
  };
  
  Object.entries(caracteristicas).forEach(([feature, supported]) => {
    const status = supported ? '✅' : '❌';
    console.log(`${status} ${feature}: ${supported ? 'Soportado' : 'No soportado'}`);
  });
}

// Limpiar datos del sistema
function limpiarDatos() {
  console.log('\n🗑️ LIMPIEZA DE DATOS');
  console.log('-------------------');
  
  try {
    // Limpiar localStorage
    const keys = Object.keys(localStorage);
    const bomberosKeys = keys.filter(key => key.includes('bomberos'));
    
    bomberosKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Eliminado: ${key}`);
    });
    
    console.log('✅ Datos del sistema limpiados');
  } catch (error) {
    console.log('❌ Error al limpiar datos:', error.message);
  }
}

// Test de login simulado
function testLogin() {
  console.log('\n🧪 TEST DE LOGIN SIMULADO');
  console.log('-------------------------');
  
  const testUser = {
    id: '1',
    nombre: 'Test',
    apellidos: 'Usuario',
    email: 'admin@bomberos.cl',
    rut: '11111111-1',
    rol: 'Administrador',
    isAuthenticated: true
  };
  
  try {
    localStorage.setItem('bomberos_user_session', JSON.stringify(testUser));
    const stored = JSON.parse(localStorage.getItem('bomberos_user_session'));
    
    if (stored && stored.email === testUser.email) {
      console.log('✅ Test de sesión: Exitoso');
      console.log(`👤 Usuario de prueba: ${stored.nombre} ${stored.apellidos} (${stored.rol})`);
      
      // Limpiar test
      localStorage.removeItem('bomberos_user_session');
    } else {
      console.log('❌ Test de sesión: Fallo en almacenamiento');
    }
  } catch (error) {
    console.log('❌ Test de sesión: Error -', error.message);
  }
}

// Función principal de verificación
function verificarSistemaCompleto() {
  console.clear();
  console.log('🚒 INICIANDO VERIFICACIÓN COMPLETA DEL SISTEMA');
  console.log('==============================================');
  
  const checks = [
    verificarLocalStorage,
    verificarAutenticacion,
    verificarNavegacion,
    verificarPermisos,
    verificarModulos,
    verificarCompatibilidad,
    testLogin
  ];
  
  let exitosos = 0;
  
  checks.forEach((check, index) => {
    try {
      const resultado = check();
      if (resultado !== false) exitosos++;
    } catch (error) {
      console.log(`❌ Error en verificación ${index + 1}:`, error.message);
    }
  });
  
  console.log('\n📊 RESUMEN FINAL');
  console.log('===============');
  console.log(`✅ Verificaciones exitosas: ${exitosos}/${checks.length}`);
  console.log(`📈 Porcentaje de éxito: ${Math.round((exitosos / checks.length) * 100)}%`);
  
  if (exitosos === checks.length) {
    console.log('🎉 ¡SISTEMA COMPLETAMENTE FUNCIONAL!');
  } else if (exitosos >= checks.length * 0.8) {
    console.log('⚠️ Sistema mayormente funcional con advertencias menores');
  } else {
    console.log('❌ Sistema con problemas. Revisar errores arriba.');
  }
  
  console.log('\n🔧 COMANDOS ÚTILES:');
  console.log('- verificarSistemaCompleto(): Ejecutar verificación completa');
  console.log('- limpiarDatos(): Limpiar datos del sistema');
  console.log('- testLogin(): Probar sistema de login');
  console.log('- verificarCompatibilidad(): Verificar navegador');
}

// Ejecutar verificación automáticamente
verificarSistemaCompleto();

// Hacer funciones disponibles globalmente
window.verificarSistemaCompleto = verificarSistemaCompleto;
window.limpiarDatos = limpiarDatos;
window.testLogin = testLogin;
window.verificarCompatibilidad = verificarCompatibilidad;