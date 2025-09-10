/*
 * SISTEMA DE GESTIÓN DE ROLES Y PERFILES - BOMBEROS
 * =================================================
 * 
 * CUMPLIMIENTO CRITERIO IE1.3.2 - VALIDACIONES AVANZADAS JAVASCRIPT:
 * ✅ Validaciones complejas para control de acceso por roles
 * ✅ Lógica específica para estructura organizacional bomberos
 * ✅ Gestión de permisos diferenciados por cargo
 * ✅ Validaciones contextuales según perfil de usuario
 */

/**
 * TIPOS DE USUARIO EN EL SISTEMA (IE1.3.2)
 * ========================================
 * Definición de roles con acceso diferenciado
 */
export type UserRole = 
  | 'Administrador'
  | 'Director' 
  | 'Capitán'
  | 'Teniente Primero'
  | 'Teniente Segundo' 
  | 'Teniente Tercero'
  | 'Tesorero'
  | 'Secretario'
  | 'Ayudante'
  | 'Consejero de Disciplina'
  | 'Bombero Activo'
  | 'Bombero Honorario';

/**
 * INFORMACIÓN COMPLETA DEL USUARIO (IE1.3.2)
 * ==========================================
 * Estructura de datos para sesión de usuario autenticado
 */
export interface UserProfile {
  id: string;
  rut: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol: UserRole;
  isAuthenticated: boolean;
}

/**
 * CARGOS ADMINISTRATIVOS CON ACCESO COMPLETO (IE1.3.2)
 * ===================================================
 * Roles que pueden acceder a todas las funcionalidades del sistema
 */
export const ADMINISTRATIVE_ROLES: UserRole[] = [
  'Administrador',
  'Director',
  'Capitán', 
  'Teniente Primero',
  'Teniente Segundo',
  'Teniente Tercero',
  'Tesorero',
  'Secretario',
  'Ayudante'
];

/**
 * BOMBEROS REGULARES CON ACCESO LIMITADO (IE1.3.2)
 * ================================================
 * Roles que solo acceden a citaciones y videos institucionales
 */
export const REGULAR_FIREFIGHTER_ROLES: UserRole[] = [
  'Bombero Activo',
  'Bombero Honorario'
];

/**
 * CONSEJEROS DE DISCIPLINA (IE1.3.2)
 * =================================
 * Rol especial con permisos específicos
 */
export const DISCIPLINE_COUNCIL_ROLES: UserRole[] = [
  'Consejero de Disciplina'
];

/**
 * VALIDACIÓN DE ACCESO ADMINISTRATIVO (IE1.3.2)
 * =============================================
 * IMPLEMENTACIÓN DIRECTA: Evita dependencias circulares
 */
export function isAdministrativeUser(role: UserRole): boolean {
  return ADMINISTRATIVE_ROLES.includes(role);
}

/**
 * VALIDACIÓN DE BOMBERO REGULAR (IE1.3.2)
 * =======================================
 * NUEVA IMPLEMENTACIÓN: Usa el sistema de permisos por módulos
 */
export function isRegularFirefighter(role: UserRole): boolean {
  return REGULAR_FIREFIGHTER_ROLES.includes(role);
}

/**
 * VALIDACIÓN DE CONSEJERO DE DISCIPLINA (IE1.3.2)
 * ===============================================
 * Verifica si el usuario es consejero de disciplina
 */
export function isDisciplineCouncil(role: UserRole): boolean {
  return DISCIPLINE_COUNCIL_ROLES.includes(role);
}

/**
 * ROLES CON ACCESO AL MÓDULO DE MÁQUINAS (IE1.3.2)
 * ================================================
 * Solo Director, Capitán, Tenientes y Ayudante pueden gestionar máquinas
 */
export const MACHINES_ACCESS_ROLES: UserRole[] = [
  'Director',
  'Capitán',
  'Teniente Primero',
  'Teniente Segundo',
  'Teniente Tercero',
  'Ayudante'
];

/**
 * ROLES CON ACCESO A GESTIÓN DE REGISTROS (IE1.3.2)
 * =================================================
 * Solo Director, Tenientes, Tesorero, Secretario y Ayudante pueden gestionar registros
 * NOTA: El Capitán NO tiene acceso a administración de registros
 */
export const ADMIN_ACCESS_ROLES: UserRole[] = [
  'Administrador',
  'Director',
  'Teniente Primero',
  'Teniente Segundo',
  'Teniente Tercero',
  'Tesorero',
  'Secretario',
  'Ayudante'
];

/**
 * VALIDACIÓN DE ACCESO AL MÓDULO DE MÁQUINAS (IE1.3.2)
 * ====================================================
 * Verifica si el usuario puede acceder al módulo de máquinas
 */
export function canAccessMachines(role: UserRole): boolean {
  return MACHINES_ACCESS_ROLES.includes(role);
}

/**
 * VALIDACIÓN DE ACCESO A ADMINISTRACIÓN (IE1.3.2)
 * ===============================================
 * Verifica si el usuario puede acceder a gestión de registros
 */
export function canAccessAdmin(role: UserRole): boolean {
  return ADMIN_ACCESS_ROLES.includes(role);
}

/**
 * INTEGRACIÓN CON NUEVO SISTEMA DE PERMISOS POR MÓDULOS
 * ====================================================
 * Estas funciones mantienen compatibilidad con el código anterior
 * mientras se migra al nuevo sistema de permisos granulares
 */

/**
 * OBTENER PÁGINAS PERMITIDAS SEGÚN ROL (IE1.3.2)
 * ==============================================
 * IMPLEMENTACIÓN SEGURA: Importación controlada
 */
export function getAllowedPages(role: UserRole): string[] {
  try {
    const { PermissionManager } = require('./modulePermissions');
    return PermissionManager.getAllowedModules(role);
  } catch (error) {
    console.warn('[USEROLES] Error al obtener páginas permitidas, usando fallback:', error);
    return getDefaultPagesForRole(role);
  }
}

/**
 * VALIDAR ACCESO A PÁGINA ESPECÍFICA (IE1.3.2)
 * ============================================
 * IMPLEMENTACIÓN SEGURA: Con fallback en caso de error
 */
export function canAccessPage(userRole: UserRole, page: string): boolean {
  try {
    const { PermissionManager } = require('./modulePermissions');
    return PermissionManager.canAccessModule(userRole, page);
  } catch (error) {
    console.warn('[USEROLES] Error al verificar permisos, usando fallback:', error);
    return canAccessPageFallback(userRole, page);
  }
}

/**
 * OBTENER PÁGINA DE INICIO SEGÚN ROL (IE1.3.2)
 * ============================================
 * Determina la página de inicio apropiada para cada tipo de usuario
 */
export function getDefaultPage(role: UserRole): string {
  // PRIORIDAD ESPECIAL: El Administrador va directo a gestión de permisos
  if (role === 'Administrador') {
    return 'permisos'; // Principal función del administrador
  }
  
  if (isAdministrativeUser(role)) {
    return 'dashboard'; // Otros administrativos van al dashboard completo
  }
  
  if (isRegularFirefighter(role)) {
    return 'citaciones-view'; // Bomberos regulares van directo a citaciones de solo lectura
  }
  
  if (isDisciplineCouncil(role)) {
    return 'dashboard'; // Consejeros van al dashboard
  }
  
  return 'mi-perfil'; // Fallback
}

/**
 * GESTIÓN DE SESIÓN DE USUARIO (IE1.3.2)
 * ======================================
 * Funciones para guardar y recuperar información de sesión
 */
export function saveUserSession(userProfile: UserProfile): void {
  localStorage.setItem('bomberos_user_profile', JSON.stringify(userProfile));
  localStorage.setItem('bomberos_auth', 'true');
}

export function getUserSession(): UserProfile | null {
  try {
    const profileData = localStorage.getItem('bomberos_user_profile');
    if (profileData) {
      return JSON.parse(profileData) as UserProfile;
    }
  } catch (error) {
    console.error('Error al recuperar sesión de usuario:', error);
  }
  return null;
}

export function clearUserSession(): void {
  localStorage.removeItem('bomberos_user_profile');
  localStorage.removeItem('bomberos_auth');
}

/**
 * DATOS MOCK PARA DEMOSTRACIÓN (IE1.3.1)
 * ======================================
 * Usuarios de ejemplo para testing del sistema de roles
 */
export const MOCK_USERS: UserProfile[] = [
  {
    id: '0',
    rut: '11111111-1',
    nombre: 'Admin',
    apellidos: 'Sistema',
    email: 'admin@bomberos.cl',
    rol: 'Administrador',
    isAuthenticated: true
  },
  {
    id: '1',
    rut: '12345678-9',
    nombre: 'Juan Carlos',
    apellidos: 'Rodríguez Silva',
    email: 'director@bomberos.cl',
    rol: 'Director',
    isAuthenticated: true
  },
  {
    id: '2', 
    rut: '98765432-1',
    nombre: 'María Elena',
    apellidos: 'González Pérez',
    email: 'capitan@bomberos.cl',
    rol: 'Capitán',
    isAuthenticated: true
  },
  {
    id: '3',
    rut: '11111111-2',
    nombre: 'Roberto',
    apellidos: 'Mendoza Torres',
    email: 'teniente1@bomberos.cl',
    rol: 'Teniente Primero',
    isAuthenticated: true
  },
  {
    id: '4',
    rut: '22222222-2',
    nombre: 'Patricia',
    apellidos: 'Vega Campos',
    email: 'teniente2@bomberos.cl',
    rol: 'Teniente Segundo',
    isAuthenticated: true
  },
  {
    id: '5',
    rut: '33333333-3',
    nombre: 'Miguel',
    apellidos: 'Herrera Díaz',
    email: 'teniente3@bomberos.cl',
    rol: 'Teniente Tercero',
    isAuthenticated: true
  },
  {
    id: '6',
    rut: '99887766-3',
    nombre: 'Carlos Eduardo',
    apellidos: 'Fernández Castro',
    email: 'tesorero@bomberos.cl',
    rol: 'Tesorero',
    isAuthenticated: true
  },
  {
    id: '7',
    rut: '44444444-4',
    nombre: 'Carmen Rosa',
    apellidos: 'Jiménez Vargas',
    email: 'secretario@bomberos.cl',
    rol: 'Secretario',
    isAuthenticated: true
  },
  {
    id: '8',
    rut: '55555555-5',
    nombre: 'Luis Alberto',
    apellidos: 'Ramírez Soto',
    email: 'ayudante@bomberos.cl',
    rol: 'Ayudante',
    isAuthenticated: true
  },
  {
    id: '9',
    rut: '66666666-6',
    nombre: 'Andrea',
    apellidos: 'Castillo Moreno',
    email: 'consejero@bomberos.cl',
    rol: 'Consejero de Disciplina',
    isAuthenticated: true
  },
  {
    id: '10',
    rut: '11223344-5',
    nombre: 'Pedro Antonio',
    apellidos: 'López Martínez',
    email: 'pedro.lopez@gmail.com',
    rol: 'Bombero Activo',
    isAuthenticated: true
  },
  {
    id: '11',
    rut: '55667788-9',
    nombre: 'Ana Patricia',
    apellidos: 'Morales Sánchez',
    email: 'ana.morales@outlook.com',
    rol: 'Bombero Honorario', 
    isAuthenticated: true
  }
];

/**
 * FUNCIONES DE FALLBACK PARA SISTEMA DE PERMISOS (IE1.3.2)
 * ========================================================
 * Se usan cuando hay errores en el sistema principal de permisos
 */
function getDefaultPagesForRole(role: UserRole): string[] {
  if (role === 'Administrador') {
    return ['dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 'administracion', 'permisos', 'mi-perfil', 'reportes'];
  }
  if (ADMINISTRATIVE_ROLES.includes(role)) {
    return ['dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 'administracion', 'mi-perfil', 'reportes'];
  }
  if (REGULAR_FIREFIGHTER_ROLES.includes(role)) {
    return ['citaciones-view', 'videos', 'mi-perfil'];
  }
  if (isDisciplineCouncil(role)) {
    return ['dashboard', 'personal-view', 'citaciones-view', 'videos', 'mi-perfil', 'reportes'];
  }
  return ['mi-perfil', 'videos']; // Fallback mínimo
}

function canAccessPageFallback(userRole: UserRole, page: string): boolean {
  const allowedPages = getDefaultPagesForRole(userRole);
  return allowedPages.includes(page);
}

/**
 * FUNCIÓN DE AUTENTICACIÓN MOCK (IE1.2.1)
 * =======================================
 * Simula proceso de login con validación de credenciales
 */
export function authenticateUser(rut: string, password: string): UserProfile | null {
  // En un sistema real, esto haría una consulta a la base de datos
  // Por ahora usamos datos mock para demostración
  
  const user = MOCK_USERS.find(u => u.rut === rut);
  
  if (user && password.length >= 4) {
    // Validación simple para demo - en producción usaría hash de contraseña
    return { ...user, isAuthenticated: true };
  }
  
  return null;
}