/*
 * SISTEMA DE AUTENTICACIÓN SIMPLIFICADO - BOMBEROS
 * ===============================================
 * 
 * Sistema directo sin dependencias circulares
 * para funcionamiento correcto en localhost
 */

// TIPOS DE USUARIO
export type UserRole = 
  | 'Administrador'
  | 'Director'
  | 'Capitán'
  | 'Primer Teniente'
  | 'Segundo Teniente'
  | 'Tesorero'
  | 'Secretario'
  | 'Ayudante'
  | 'Consejero de Disciplina 1'
  | 'Consejero de Disciplina 2'
  | 'Consejero de Disciplina 3'
  | 'Consejero de Disciplina 4'
  | 'Consejero de Disciplina 5'
  | 'Consejero de Disciplina 6'
  | 'Consejero de Disciplina 7'
  | 'Consejero de Disciplina 8'
  | 'Bombero Activo'
  | 'Bombero Honorario';

export interface UserProfile {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rut: string;
  rol: UserRole;
  isAuthenticated: boolean;
}

// USUARIOS MOCK PARA TESTING
const MOCK_USERS: UserProfile[] = [
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

// DEFINICIÓN DE ROLES POR CATEGORÍA
const ADMINISTRATIVE_ROLES: UserRole[] = [
  'Administrador',
  'Director', 
  'Capitán',
  'Primer Teniente',
  'Segundo Teniente',
  'Tesorero',
  'Secretario',
  'Ayudante'
];

const DISCIPLINE_COUNCIL_ROLES: UserRole[] = [
  'Consejero de Disciplina 1',
  'Consejero de Disciplina 2',
  'Consejero de Disciplina 3',
  'Consejero de Disciplina 4',
  'Consejero de Disciplina 5',
  'Consejero de Disciplina 6',
  'Consejero de Disciplina 7',
  'Consejero de Disciplina 8'
];

const REGULAR_FIREFIGHTER_ROLES: UserRole[] = [
  'Bombero Activo',
  'Bombero Honorario'
];

// FUNCIONES DE CLASIFICACIÓN DE ROLES
export function isAdministrativeUser(role: UserRole): boolean {
  return ADMINISTRATIVE_ROLES.includes(role);
}

export function isDisciplineCouncil(role: UserRole): boolean {
  return DISCIPLINE_COUNCIL_ROLES.includes(role);
}

export function isRegularFirefighter(role: UserRole): boolean {
  return REGULAR_FIREFIGHTER_ROLES.includes(role);
}

// SISTEMA DE PERMISOS DIRECTO
export function getPermissionsForRole(role: UserRole): string[] {
  if (role === 'Administrador') {
    return ['dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 'administracion', 'permisos', 'mi-perfil', 'reportes'];
  }
  
  if (isAdministrativeUser(role)) {
    return ['dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 'administracion', 'mi-perfil', 'reportes'];
  }
  
  if (isDisciplineCouncil(role)) {
    return ['dashboard', 'personal-view', 'citaciones-view', 'videos', 'mi-perfil', 'reportes'];
  }
  
  if (isRegularFirefighter(role)) {
    return ['citaciones-view', 'videos', 'mi-perfil'];
  }
  
  return ['mi-perfil', 'videos'];
}

export function canAccessPage(userRole: UserRole, page: string): boolean {
  const permissions = getPermissionsForRole(userRole);
  return permissions.includes(page);
}

export function getDefaultPage(role: UserRole): string {
  if (isAdministrativeUser(role) || isDisciplineCouncil(role)) {
    return 'dashboard';
  }
  return 'citaciones-view';
}

// GESTIÓN DE SESIÓN
const USER_SESSION_KEY = 'bomberos_user_session';

export function saveUserSession(user: UserProfile): void {
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
}

export function getUserSession(): UserProfile | null {
  try {
    const stored = localStorage.getItem(USER_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error al recuperar sesión:', error);
  }
  return null;
}

export function clearUserSession(): void {
  localStorage.removeItem(USER_SESSION_KEY);
}

// AUTENTICACIÓN MOCK
export function authenticateUser(email: string, password: string): UserProfile | null {
  console.log(`[AUTH] Intentando autenticar: ${email}`);
  
  // Buscar usuario por email
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (user && password === '123456') { // Password fijo para testing
    console.log(`[AUTH] ✅ Usuario autenticado: ${user.nombre} ${user.apellidos} (${user.rol})`);
    return user;
  }
  
  console.log(`[AUTH] ❌ Credenciales inválidas para: ${email}`);
  return null;
}

// VALIDACIÓN DE RUT CHILENO
export function validateRUT(rut: string): boolean {
  const cleanRut = rut.replace(/[^0-9kK-]/g, '');
  const parts = cleanRut.split('-');
  
  if (parts.length !== 2) return false;
  
  const digits = parts[0];
  const verifier = parts[1].toUpperCase();
  
  if (digits.length < 7 || digits.length > 8) return false;
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += parseInt(digits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedVerifier = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();
  
  return verifier === calculatedVerifier;
}

// VALIDACIÓN DE EMAIL
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const allowedDomains = ['@bomberos.cl', '@gmail.com', '@outlook.com'];
  return allowedDomains.some(domain => email.endsWith(domain));
}