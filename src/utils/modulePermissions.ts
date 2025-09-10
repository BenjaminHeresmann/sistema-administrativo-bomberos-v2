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
 * Incluye módulos principales y sub-módulos de solo lectura
 */
export type SystemModule = 
  | 'dashboard'
  | 'personal'        // Gestión completa de personal (CRUD)
  | 'personal-view'   // Sub-módulo: Solo lectura de personal
  | 'citaciones'      // Gestión completa de citaciones (CRUD)
  | 'citaciones-view' // Sub-módulo: Solo lectura/visualización de citaciones
  | 'videos'
  | 'maquinas'        // Gestión completa de máquinas (CRUD)
  | 'maquinas-view'   // Sub-módulo: Solo lectura de máquinas
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
  category: 'Core' | 'Operativo' | 'Administrativo' | 'Personal' | 'Sistema' | 'Lectura';
  isSystemModule?: boolean; // Módulos que no se pueden desactivar
  isReadOnly?: boolean; // Sub-módulos de solo lectura
  parentModule?: SystemModule; // Módulo padre (para sub-módulos)
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
    description: 'Administración de bomberos, cargos y estructura organizacional (CRUD completo)',
    icon: 'Users',
    category: 'Administrativo'
  },
  'personal-view': {
    id: 'personal-view',
    name: 'Personal',
    description: 'Visualización del personal bomberil sin capacidad de modificación',
    icon: 'Eye',
    category: 'Lectura',
    isReadOnly: true,
    parentModule: 'personal'
  },
  'citaciones': {
    id: 'citaciones',
    name: 'Sistema de Citaciones',
    description: 'Gestión completa de citaciones operativas, administrativas y disciplinarias (CRUD)',
    icon: 'FileText',
    category: 'Operativo'
  },
  'citaciones-view': {
    id: 'citaciones-view',
    name: 'Citaciones',
    description: 'Visualización de citaciones y notificaciones sin capacidad de modificación',
    icon: 'Eye',
    category: 'Lectura',
    isReadOnly: true,
    parentModule: 'citaciones'
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
    description: 'Control de carros de bomberos, mantenimiento y historial operativo (CRUD completo)',
    icon: 'Truck',
    category: 'Operativo'
  },
  'maquinas-view': {
    id: 'maquinas-view',
    name: 'Máquinas',
    description: 'Visualización de la flota de carros de bomberos sin capacidad de modificación',
    icon: 'Eye',
    category: 'Lectura',
    isReadOnly: true,
    parentModule: 'maquinas'
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
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas', 'maquinas-view',
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Capitán': [
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas', 'maquinas-view',
    'reportes', 'mi-perfil'
  ],
  'Teniente Primero': [
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas', 'maquinas-view',
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Teniente Segundo': [
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas', 'maquinas-view',
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Teniente Tercero': [
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas', 'maquinas-view',
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Tesorero': [
    'dashboard', 'personal-view', 'citaciones-view', 'videos', 'maquinas-view', 'reportes', 
    'mi-perfil', 'administracion'
  ],
  'Secretario': [
    'dashboard', 'personal', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas-view', 'reportes', 
    'mi-perfil', 'administracion'
  ],
  'Ayudante': [
    'dashboard', 'personal-view', 'citaciones', 'citaciones-view', 'videos', 'maquinas-view',
    'reportes', 'mi-perfil', 'administracion'
  ],
  'Consejero de Disciplina': [
    'dashboard', 'personal-view', 'citaciones-view', 'videos', 'maquinas-view', 'reportes', 'mi-perfil'
  ],
  'Bombero Activo': [
    'personal-view', 'citaciones-view', 'videos', 'maquinas-view', 'mi-perfil'
  ],
  'Bombero Honorario': [
    'personal-view', 'citaciones-view', 'videos', 'maquinas-view', 'mi-perfil'
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
        
        // IMPORTANTE: Asegurar que 'permisos' solo esté en Administrador
        Object.keys(permissions).forEach(profile => {
          if (profile !== 'Administrador' && permissions[profile].includes('permisos')) {
            permissions[profile] = permissions[profile].filter(module => module !== 'permisos');
            console.log(`[FIX] Removido módulo 'permisos' del perfil ${profile}`);
          }
        });

        // CORRECCIÓN: Asegurar que todos los perfiles tengan los submódulos de solo lectura
        Object.keys(permissions).forEach(profile => {
          const profilePerms = permissions[profile];
          if (!profilePerms.includes('personal-view')) {
            profilePerms.push('personal-view');
            console.log(`[FIX] Agregado 'personal-view' al perfil ${profile}`);
          }
          if (!profilePerms.includes('maquinas-view')) {
            profilePerms.push('maquinas-view');
            console.log(`[FIX] Agregado 'maquinas-view' al perfil ${profile}`);
          }
          if (!profilePerms.includes('citaciones-view')) {
            profilePerms.push('citaciones-view');
            console.log(`[FIX] Agregado 'citaciones-view' al perfil ${profile}`);
          }
        });
        
        return permissions;
      }
    } catch (error) {
      console.error('Error al cargar permisos:', error);
    }
    
    // Retornar permisos por defecto asegurando que permisos solo esté en Administrador
    const defaultPerms = { ...DEFAULT_PERMISSIONS };
    Object.keys(defaultPerms).forEach(profile => {
      if (profile !== 'Administrador' && defaultPerms[profile].includes('permisos')) {
        defaultPerms[profile] = defaultPerms[profile].filter(module => module !== 'permisos');
      }
    });
    
    return defaultPerms;
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
      return false; // Explícitamente denegar acceso a cualquier usuario que no sea Administrador
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
   * CAMBIO: Ahora TODOS los permisos son modificables por el administrador
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
    
    // NUEVO: El administrador puede modificar TODOS los permisos sin restricciones
    // Solo aseguramos que 'permisos' no esté en otros perfiles (se maneja en canAccessModule)
    const finalModules = modules.filter(module => module !== 'permisos');
    
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
   * FUNCIÓN DE EMERGENCIA PARA LIMPIAR PERMISOS
   * ==========================================
   * Solo para debugging - limpia localStorage y fuerza defaults
   */
  static forceResetPermissions(): void {
    console.log('[DEBUG] Forzando reset de permisos...');
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('[DEBUG] Permisos reseteados a valores por defecto');
    
    // Verificar que los defaults son correctos
    const defaults = this.getCurrentPermissions();
    console.log('[DEBUG] Configuración actual:', defaults);
    
    // Verificar específicamente que Director no tiene permisos
    if (defaults['Director'] && defaults['Director'].includes('permisos')) {
      console.error('[ERROR] Director tiene acceso a permisos en defaults!');
    } else {
      console.log('[OK] Director NO tiene acceso a permisos (correcto)');
    }
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
 * NOTA: Las funciones de compatibilidad se mantienen en userRoles.ts
 * para evitar imports circulares. Usar PermissionManager directamente
 * cuando sea necesario acceder a la funcionalidad nueva.
 */