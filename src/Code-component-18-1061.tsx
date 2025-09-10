// SCRIPT DE DEBUG TEMPORAL PARA VERIFICAR PERMISOS
// Ejecutar en la consola del navegador para verificar configuración

console.log('=== DEBUG SISTEMA DE PERMISOS ===');

// Simular los roles y verificar accesos
const roles = ['Administrador', 'Director', 'Capitán', 'Bombero Activo'];
const modulo = 'permisos';

console.log(`\nVerificando acceso al módulo "${modulo}":`);

roles.forEach(rol => {
  // Simular la lógica de canAccessModule
  let puedeAcceder = false;
  
  if (rol === 'Administrador') {
    puedeAcceder = true;
  } else if (modulo === 'permisos') {
    puedeAcceder = (rol === 'Administrador');
  }
  
  console.log(`${rol}: ${puedeAcceder ? '✅ PERMITIDO' : '❌ DENEGADO'}`);
});

// Verificar configuración de permisos por defecto
console.log('\n=== PERMISOS POR DEFECTO ===');

const defaultPermissions = {
  'Director': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Capitán': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil'
  ],
  'Bombero Activo': [
    'citaciones', 'videos', 'mi-perfil'
  ]
};

Object.entries(defaultPermissions).forEach(([rol, permisos]) => {
  console.log(`${rol}:`, permisos);
  console.log(`  - Tiene "permisos": ${permisos.includes('permisos') ? '✅' : '❌'}`);
});

console.log('\n=== DIAGNÓSTICO COMPLETO ===');
console.log('Si Director está intentando acceder a "permisos", revisar:');
console.log('1. ¿Hay algún botón/enlace visible que no debería estarlo?');
console.log('2. ¿El menú de navegación está filtrando correctamente?');
console.log('3. ¿Algún componente está mostrando el enlace incorrectamente?');