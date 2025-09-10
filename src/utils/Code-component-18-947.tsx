/*
 * SISTEMA DE GESTIÓN DE PERMISOS POR MÓDULOS - BOMBEROS
 * ====================================================
 * 
 * NUEVA ARQUITECTURA MODULAR:
 * ✅ Control granular de acceso por módulo y perfil
 * ✅ Sistema escalable para nuevos módulos
 * ✅ Gestión centralizada de permisos
 * ✅ Configuración dinámica por parte del Administrador
 * ✅ Separación clara entre módulos y perfiles
 */

import { UserRole } from './userRoles';

/**
 * DEFINICIÓN DE MÓDULOS DEL SISTEMA
 * ================================
 * Lista completa de todos los módulos disponibles
 */
export type SystemModule = 
  | 'dashboard'
  | 'personal'
  | 'citaciones'
  | 'videos'
  | 'maquinas'
  | 'reportes'
  | 'mi-perfil'
  | 'administracion'
  | 'permisos'; // Módulo exclusivo del Administrador

/**
 * INFORMACIÓN DETALLADA DE CADA MÓDULO
 * ===================================
 */
export interface ModuleInfo {
  id: SystemModule;
  name: string;
  description: string;
  icon: string;
  category: 'Core' | 'Operativo' | 'Administrativo' | 'Personal' | 'Sistema';
  isSystemModule?: boolean; // Módulos que no se pueden desactivar
}

/**
 * CATÁLOGO COMPLETO DE MÓDULOS
 * ===========================
 */
export const SYSTEM_MODULES: Record<SystemModule, ModuleInfo> = {
  'dashboard': {
    id: 'dashboard',
    name: 'Dashboard Principal',
    description: 'Panel de control con métricas y resumen general del sistema',
    icon: 'Home',
    category: 'Core',
    isSystemModule: true
  },
  'personal': {
    id: 'personal',
    name: 'Gestión de Personal',
    description: 'Administración de bomberos, cargos y estructura organizacional',
    icon: 'Users',
    category: 'Administrativo'
  },
  'citaciones': {
    id: 'citaciones',
    name: 'Sistema de Citaciones',
    description: 'Gestión de citaciones operativas, administrativas y disciplinarias',
    icon: 'FileText',
    category: 'Operativo',
    isSystemModule: true
  },
  'videos': {
    id: 'videos',
    name: 'Videos Institucionales',
    description: 'Contenido audiovisual educativo, histórico y ceremonial',
    icon: 'Play',
    category: 'Core',
    isSystemModule: true
  },
  'maquinas': {
    id: 'maquinas',
    name: 'Gestión de Máquinas',
    description: 'Control de carros de bomberos, mantenimiento y historial operativo',
    icon: 'Truck',
    category: 'Operativo'
  },
  'reportes': {
    id: 'reportes',
    name: 'Reportes y Estadísticas',
    description: 'Generación de reportes, métricas y análisis estadísticos',
    icon: 'BarChart3',
    category: 'Administrativo'
  },
  'mi-perfil': {
    id: 'mi-perfil',
    name: 'Mi Perfil',
    description: 'Información personal y configuración de cuenta',
    icon: 'UserCircle',
    category: 'Personal',
    isSystemModule: true
  },
  'administracion': {
    id: 'administracion',
    name: 'Gestión de Registros',
    description: 'Administración de usuarios y configuración del sistema',
    icon: 'Settings',
    category: 'Sistema'
  },
  'permisos': {
    id: 'permisos',
    name: 'Gestión de Permisos',
    description: 'Control de acceso por módulos y perfiles (Solo Administrador)',
    icon: 'Shield',
    category: 'Sistema',
    isSystemModule: true
  }
};

/**
 * PERFILES DEL SISTEMA
 * ===================
 * Todos los roles disponibles excepto Administrador (que tiene acceso total)
 */
export type SystemProfile = Exclude<UserRole, 'Administrador'>;

/**
 * INFORMACIÓN DE PERFILES
 * =======================
 */
export interface ProfileInfo {
  id: SystemProfile;
  name: string;
  description: string;
  category: 'Directivo' | 'Operativo' | 'Administrativo' | 'Disciplina' | 'Base';
}

export const SYSTEM_PROFILES: Record<SystemProfile, ProfileInfo> = {
  'Director': {
    id: 'Director',
    name: 'Director',
    description: 'Máxima autoridad de la compañía',
    category: 'Directivo'
  },
  'Capitán': {
    id: 'Capitán',
    name: 'Capitán',
    description: 'Oficial a cargo de operaciones de emergencia',
    category: 'Operativo'
  },
  'Teniente Primero': {
    id: 'Teniente Primero',
    name: 'Teniente Primero',
    description: 'Oficial operativo de primer nivel',
    category: 'Operativo'
  },
  'Teniente Segundo': {
    id: 'Teniente Segundo',
    name: 'Teniente Segundo',
    description: 'Oficial operativo de segundo nivel',
    category: 'Operativo'
  },
  'Teniente Tercero': {
    id: 'Teniente Tercero',
    name: 'Teniente Tercero',
    description: 'Oficial operativo de tercer nivel',
    category: 'Operativo'
  },
  'Tesorero': {
    id: 'Tesorero',
    name: 'Tesorero',
    description: 'Responsable de la gestión financiera',
    category: 'Administrativo'
  },
  'Secretario': {
    id: 'Secretario',
    name: 'Secretario',
    description: 'Responsable de documentación y registros',
    category: 'Administrativo'
  },
  'Ayudante': {
    id: 'Ayudante',
    name: 'Ayudante',
    description: 'Apoyo en tareas administrativas y operativas',
    category: 'Administrativo'
  },
  'Consejero de Disciplina': {
    id: 'Consejero de Disciplina',
    name: 'Consejero de Disciplina',
    description: 'Miembro del consejo de disciplina',
    category: 'Disciplina'
  },
  'Bombero Activo': {
    id: 'Bombero Activo',
    name: 'Bombero Activo',
    description: 'Bombero voluntario en servicio activo',
    category: 'Base'
  },
  'Bombero Honorario': {
    id: 'Bombero Honorario',
    name: 'Bombero Honorario',
    description: 'Bombero voluntario con estatus honorario',
    category: 'Base'
  }
};

/**
 * MATRIZ DE PERMISOS POR DEFECTO
 * ==============================
 * Configuración inicial del sistema (puede ser modificada por el Administrador)
 */
export const DEFAULT_PERMISSIONS: Record<SystemProfile, SystemModule[]> = {
  'Director': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Capitán': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil'
  ],
  'Teniente Primero': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Teniente Segundo': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Teniente Tercero': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Tesorero': [
    'dashboard', 'personal', 'citaciones', 'videos', 'reportes', 
    'mi-perfil', 'administracion'
  ],
  'Secretario': [
    'dashboard', 'personal', 'citaciones', 'videos', 'reportes', 
    'mi-perfil', 'administracion'
  ],
  'Ayudante': [
    'dashboard', 'personal', 'citaciones', 'videos', 'maquinas', 
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Consejero de Disciplina': [
    'dashboard', 'citaciones', 'videos', 'reportes', 'mi-perfil'
  ],
  'Bombero Activo': [
    'citaciones', 'videos', 'mi-perfil'
  ],
  'Bombero Honorario': [
    'citaciones', 'videos', 'mi-perfil'
  ]
};

/**
 * CLASE PARA GESTIÓN DE PERMISOS
 * ==============================
 * Manejo centralizado de permisos con persistencia local
 */
export class PermissionManager {
  private static STORAGE_KEY = 'bomberos_module_permissions';
  
  /**
   * OBTENER PERMISOS ACTUALES
   * ========================
   * Retorna la matriz de permisos actual (modificada o por defecto)
   */
  static getCurrentPermissions(): Record<SystemProfile, SystemModule[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const permissions = JSON.parse(stored);
        // Verificar que contiene todos los perfiles
        for (const profile of Object.keys(SYSTEM_PROFILES) as SystemProfile[]) {
          if (!permissions[profile]) {
            permissions[profile] = DEFAULT_PERMISSIONS[profile];
          }
        }
        return permissions;
      }
    } catch (error) {
      console.error('Error al cargar permisos:', error);
    }
    return { ...DEFAULT_PERMISSIONS };
  }
  
  /**
   * GUARDAR PERMISOS
   * ===============
   * Persiste los cambios de permisos realizados por el Administrador
   */
  static savePermissions(permissions: Record<SystemProfile, SystemModule[]>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(permissions));
    } catch (error) {
      console.error('Error al guardar permisos:', error);
    }
  }
  
  /**
   * VERIFICAR ACCESO A MÓDULO
   * ========================
   * Verifica si un perfil específico puede acceder a un módulo
   */
  static canAccessModule(userRole: UserRole, module: SystemModule): boolean {
    // El Administrador siempre tiene acceso completo
    if (userRole === 'Administrador') {
      return true;
    }
    
    // Solo el Administrador puede acceder al módulo de permisos
    if (module === 'permisos') {
      return userRole === 'Administrador';
    }
    
    const currentPermissions = this.getCurrentPermissions();
    const userPermissions = currentPermissions[userRole as SystemProfile];
    
    return userPermissions ? userPermissions.includes(module) : false;
  }
  
  /**
   * OBTENER MÓDULOS PERMITIDOS PARA UN PERFIL
   * =========================================
   */
  static getAllowedModules(userRole: UserRole): SystemModule[] {
    if (userRole === 'Administrador') {
      return Object.keys(SYSTEM_MODULES) as SystemModule[];
    }
    
    const currentPermissions = this.getCurrentPermissions();
    return currentPermissions[userRole as SystemProfile] || [];
  }
  
  /**
   * ACTUALIZAR PERMISOS DE UN PERFIL
   * ================================
   * Solo puede ser ejecutado por el Administrador
   */
  static updateProfilePermissions(
    profile: SystemProfile, 
    modules: SystemModule[],
    adminRole: UserRole
  ): boolean {
    if (adminRole !== 'Administrador') {
      console.error('Solo el Administrador puede modificar permisos');
      return false;
    }
    
    const currentPermissions = this.getCurrentPermissions();
    
    // Asegurar que los módulos del sistema siempre estén incluidos
    const systemModules = Object.values(SYSTEM_MODULES)
      .filter(module => module.isSystemModule)
      .map(module => module.id);
    
    const finalModules = [...new Set([...modules, ...systemModules])];
    
    currentPermissions[profile] = finalModules;
    this.savePermissions(currentPermissions);
    
    return true;
  }
  
  /**
   * RESETEAR PERMISOS A VALORES POR DEFECTO
   * ======================================
   */
  static resetToDefaults(adminRole: UserRole): boolean {
    if (adminRole !== 'Administrador') {
      console.error('Solo el Administrador puede resetear permisos');
      return false;
    }
    
    this.savePermissions({ ...DEFAULT_PERMISSIONS });
    return true;
  }
  
  /**
   * OBTENER ESTADÍSTICAS DE PERMISOS
   * ===============================
   */
  static getPermissionStats(): {
    totalProfiles: number;
    totalModules: number;
    moduleUsage: Record<SystemModule, number>;
    profilesWithFullAccess: number;
  } {
    const currentPermissions = this.getCurrentPermissions();
    const profiles = Object.keys(currentPermissions) as SystemProfile[];
    const modules = Object.keys(SYSTEM_MODULES) as SystemModule[];
    
    const moduleUsage: Record<SystemModule, number> = {} as Record<SystemModule, number>;
    modules.forEach(module => {
      moduleUsage[module] = profiles.filter(profile => 
        currentPermissions[profile].includes(module)
      ).length;
    });
    
    const profilesWithFullAccess = profiles.filter(profile =>
      currentPermissions[profile].length >= modules.length - 1 // -1 porque 'permisos' es solo para admin
    ).length;
    
    return {
      totalProfiles: profiles.length,
      totalModules: modules.length,
      moduleUsage,
      profilesWithFullAccess
    };
  }
}

/**
 * FUNCIONES DE COMPATIBILIDAD CON SISTEMA ANTERIOR
 * ===============================================
 * Mantienen la API anterior para evitar romper el código existente
 */

export function canAccessPage(userRole: UserRole, page: string): boolean {
  return PermissionManager.canAccessModule(userRole, page as SystemModule);
}

export function getAllowedPages(userRole: UserRole): string[] {
  return PermissionManager.getAllowedModules(userRole).map(module => module);
}

export function isAdministrativeUser(role: UserRole): boolean {
  const allowedModules = PermissionManager.getAllowedModules(role);
  return allowedModules.includes('dashboard') && allowedModules.includes('personal');
}

export function isRegularFirefighter(role: UserRole): boolean {
  const allowedModules = PermissionManager.getAllowedModules(role);
  return allowedModules.length <= 3 && // Solo citaciones, videos y mi-perfil
    allowedModules.includes('citaciones') && 
    allowedModules.includes('videos') && 
    allowedModules.includes('mi-perfil');
}