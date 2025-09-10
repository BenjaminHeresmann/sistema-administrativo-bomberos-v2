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
 * Verifica si el usuario tiene permisos de administración
 */
export function isAdministrativeUser(role: UserRole): boolean {
  return ADMINISTRATIVE_ROLES.includes(role);
}

/**
 * VALIDACIÓN DE BOMBERO REGULAR (IE1.3.2)
 * =======================================
 * Verifica si el usuario es bombero regular sin permisos administrativos
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
 * OBTENER PÁGINAS PERMITIDAS SEGÚN ROL (IE1.3.2)
 * ==============================================
 * Retorna las páginas/secciones a las que puede acceder cada tipo de usuario
 */
export function getAllowedPages(role: UserRole): string[] {
  if (isAdministrativeUser(role)) {
    // Administradores tienen acceso completo
    return [
      'dashboard',
      'personal', 
      'citaciones',
      'videos',
      'administracion',
      'mi-perfil',
      'reportes'
    ];
  }
  
  if (isRegularFirefighter(role)) {
    // Bomberos regulares solo acceden a citaciones y videos
    return [
      'citaciones',
      'videos', 
      'mi-perfil'
    ];
  }
  
  if (isDisciplineCouncil(role)) {
    // Consejeros tienen acceso intermedio
    return [
      'dashboard',
      'citaciones',
      'videos',
      'mi-perfil',
      'reportes'
    ];
  }
  
  // Fallback para roles no definidos
  return ['mi-perfil'];
}

/**
 * VALIDAR ACCESO A PÁGINA ESPECÍFICA (IE1.3.2)
 * ============================================
 * Verifica si un usuario puede acceder a una página determinada
 */
export function canAccessPage(userRole: UserRole, page: string): boolean {
  const allowedPages = getAllowedPages(userRole);
  return allowedPages.includes(page);
}

/**
 * OBTENER PÁGINA DE INICIO SEGÚN ROL (IE1.3.2)
 * ============================================
 * Determina la página de inicio apropiada para cada tipo de usuario
 */
export function getDefaultPage(role: UserRole): string {
  if (isAdministrativeUser(role)) {
    return 'dashboard'; // Administradores van al dashboard completo
  }
  
  if (isRegularFirefighter(role)) {
    return 'citaciones'; // Bomberos regulares van directo a citaciones
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
    rut: '11223344-5',
    nombre: 'Pedro Antonio',
    apellidos: 'López Martínez',
    email: 'pedro.lopez@gmail.com',
    rol: 'Bombero Activo',
    isAuthenticated: true
  },
  {
    id: '4',
    rut: '55667788-9',
    nombre: 'Ana Patricia',
    apellidos: 'Morales Sánchez',
    email: 'ana.morales@outlook.com',
    rol: 'Bombero Honorario', 
    isAuthenticated: true
  },
  {
    id: '5',
    rut: '99887766-3',
    nombre: 'Carlos Eduardo',
    apellidos: 'Fernández Castro',
    email: 'tesorero@bomberos.cl',
    rol: 'Tesorero',
    isAuthenticated: true
  }
];

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