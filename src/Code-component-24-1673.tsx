/*
 * SCRIPT DEBUG LOGIN - SISTEMA BOMBEROS
 * ====================================
 * 
 * Ejecutar en la consola del navegador para debuggear problemas de login
 * Pegar este código completo en la consola y ejecutar
 */

console.log('🚒 INICIANDO DEBUG DEL SISTEMA DE LOGIN');
console.log('=====================================');

// 1. Verificar que estamos en la página correcta
function verificarPagina() {
  console.log('\n1️⃣ VERIFICANDO PÁGINA ACTUAL');
  console.log('URL actual:', window.location.href);
  console.log('Título:', document.title);
  
  // Verificar si hay elementos del login
  const emailInput = document.querySelector('#email, input[type="email"]');
  const passwordInput = document.querySelector('#password, input[type="password"]');
  const submitButton = document.querySelector('button[type="submit"], button:contains("Ingresar")');
  
  console.log('Campo email encontrado:', !!emailInput);
  console.log('Campo password encontrado:', !!passwordInput);
  console.log('Botón submit encontrado:', !!submitButton);
  
  return { emailInput, passwordInput, submitButton };
}

// 2. Verificar localStorage
function verificarLocalStorage() {
  console.log('\n2️⃣ VERIFICANDO LOCALSTORAGE');
  
  try {
    // Test básico
    localStorage.setItem('test', 'ok');
    const test = localStorage.getItem('test');
    localStorage.removeItem('test');
    console.log('✅ LocalStorage funcionando:', test === 'ok');
    
    // Verificar sesión existente
    const session = localStorage.getItem('bomberos_user_session');
    console.log('Sesión existente:', session ? 'SÍ' : 'NO');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        console.log('Usuario en sesión:', parsed.nombre, parsed.apellidos, `(${parsed.rol})`);
      } catch (e) {
        console.log('❌ Sesión corrupta:', e.message);
      }
    }
    
    return true;
  } catch (error) {
    console.log('❌ LocalStorage no disponible:', error.message);
    return false;
  }
}

// 3. Test de autenticación manual
function testAutenticacion() {
  console.log('\n3️⃣ TEST DE AUTENTICACIÓN MANUAL');
  
  // Usuarios de prueba
  const usuarios = [
    { email: 'admin@bomberos.cl', password: '123456', rol: 'Administrador' },
    { email: 'director@bomberos.cl', password: '123456', rol: 'Director' },
    { email: 'juan.perez@gmail.com', password: '123456', rol: 'Bombero Activo' }
  ];
  
  // Simular función de autenticación
  const MOCK_USERS = [
    {
      id: '1',
      nombre: 'Admin',
      apellidos: 'Sistema',
      email: 'admin@bomberos.cl',
      rut: '11111111-1',
      rol: 'Administrador',
      isAuthenticated: true
    },
    {
      id: '2',
      nombre: 'Carlos',
      apellidos: 'Rodríguez',
      email: 'director@bomberos.cl',
      rut: '12345678-9',
      rol: 'Director',
      isAuthenticated: true
    },
    {
      id: '3',
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan.perez@gmail.com',
      rut: '98765432-1',
      rol: 'Bombero Activo',
      isAuthenticated: true
    }
  ];
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    const allowedDomains = ['@bomberos.cl', '@gmail.com', '@outlook.com'];
    return allowedDomains.some(domain => email.endsWith(domain));
  }
  
  function authenticateUser(email, password) {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && password === '123456') {
      return user;
    }
    return null;
  }
  
  // Probar cada usuario
  usuarios.forEach(testUser => {
    const isValidEmail = validateEmail(testUser.email);
    const authResult = authenticateUser(testUser.email, testUser.password);
    
    console.log(`📧 ${testUser.email}:`);
    console.log(`   Email válido: ${isValidEmail ? '✅' : '❌'}`);
    console.log(`   Autenticación: ${authResult ? '✅' : '❌'}`);
    if (authResult) {
      console.log(`   Usuario: ${authResult.nombre} ${authResult.apellidos} (${authResult.rol})`);
    }
  });
}

// 4. Simular login automático
function simularLogin(email = 'admin@bomberos.cl', password = '123456') {
  console.log(`\n4️⃣ SIMULANDO LOGIN: ${email}`);
  
  const elementos = verificarPagina();
  
  if (elementos.emailInput && elementos.passwordInput && elementos.submitButton) {
    console.log('📝 Llenando formulario...');
    elementos.emailInput.value = email;
    elementos.passwordInput.value = password;
    
    console.log('🖱️ Haciendo click en el botón...');
    elementos.submitButton.click();
    
    // Verificar después de un momento
    setTimeout(() => {
      const newSession = localStorage.getItem('bomberos_user_session');
      if (newSession) {
        console.log('✅ Login exitoso - sesión creada');
        try {
          const user = JSON.parse(newSession);
          console.log(`👤 Usuario logueado: ${user.nombre} ${user.apellidos} (${user.rol})`);
        } catch (e) {
          console.log('❌ Error parseando sesión:', e.message);
        }
      } else {
        console.log('❌ Login falló - no se creó sesión');
      }
    }, 1000);
  } else {
    console.log('❌ No se pudieron encontrar los elementos del formulario');
  }
}

// 5. Limpiar datos
function limpiarDatos() {
  console.log('\n5️⃣ LIMPIANDO DATOS DEL SISTEMA');
  
  // Limpiar localStorage
  const keys = Object.keys(localStorage);
  const bomberosKeys = keys.filter(key => key.includes('bomberos') || key.includes('Bomberos'));
  
  bomberosKeys.forEach(key => {
    localStorage.removeItem(key);
    console.log(`🗑️ Eliminado: ${key}`);
  });
  
  console.log('✅ Datos limpiados');
}

// 6. Verificar React
function verificarReact() {
  console.log('\n6️⃣ VERIFICANDO REACT');
  
  console.log('React disponible:', typeof window.React !== 'undefined');
  console.log('ReactDOM disponible:', typeof window.ReactDOM !== 'undefined');
  
  // Verificar si hay errores de React en la consola
  const originalError = console.error;
  let reactErrors = [];
  
  console.error = function(...args) {
    if (args.some(arg => typeof arg === 'string' && arg.includes('React'))) {
      reactErrors.push(args.join(' '));
    }
    originalError.apply(console, args);
  };
  
  setTimeout(() => {
    console.error = originalError;
    console.log('Errores de React detectados:', reactErrors.length);
    reactErrors.forEach(error => console.log('🔴', error));
  }, 100);
}

// FUNCIÓN PRINCIPAL
function debugCompleto() {
  console.clear();
  console.log('🚒 EJECUTANDO DEBUG COMPLETO DEL LOGIN');
  console.log('=====================================');
  
  verificarPagina();
  verificarLocalStorage();
  testAutenticacion();
  verificarReact();
  
  console.log('\n📋 COMANDOS DISPONIBLES:');
  console.log('- simularLogin(): Simular login con admin');
  console.log('- simularLogin("director@bomberos.cl"): Login como director');
  console.log('- simularLogin("juan.perez@gmail.com"): Login como bombero');
  console.log('- limpiarDatos(): Limpiar localStorage');
  console.log('- verificarPagina(): Ver elementos del DOM');
  console.log('- testAutenticacion(): Probar función de auth');
  
  console.log('\n🎯 PRÓXIMOS PASOS:');
  console.log('1. Si no ves el formulario de login, recargar la página');
  console.log('2. Ejecutar simularLogin() para probar login automático');
  console.log('3. Si hay errores, revisar la consola de red (Network tab)');
  console.log('4. Verificar que no hay errores de JavaScript');
}

// Hacer funciones disponibles globalmente
window.debugLogin = {
  debugCompleto,
  verificarPagina,
  verificarLocalStorage,
  testAutenticacion,
  simularLogin,
  limpiarDatos,
  verificarReact
};

// Ejecutar automáticamente
debugCompleto();