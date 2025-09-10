# 🚀 SISTEMA DE PERMISOS MODULARES - BOMBEROS VOLUNTARIOS

## 📋 RESUMEN DE LA REESTRUCTURACIÓN

El sistema ha sido completamente reestructurado para tener un **control granular de permisos por módulos**, permitiendo una gestión flexible y escalable de accesos según el perfil de cada usuario.

---

## 🏗️ NUEVA ARQUITECTURA

### **Módulos del Sistema**
Cada funcionalidad es ahora un módulo independiente:

| Módulo | Descripción | Categoría |
|--------|-------------|-----------|
| `dashboard` | Panel de control principal | Core |
| `personal` | Gestión de bomberos | Administrativo |
| `citaciones` | Sistema de citaciones | Operativo |
| `videos` | Videos institucionales | Core |
| `maquinas` | Gestión de carros bomberos | Operativo |
| `reportes` | Reportes y estadísticas | Administrativo |
| `mi-perfil` | Perfil personal | Personal |
| `administracion` | Gestión de registros | Sistema |
| `permisos` | Control de permisos | Sistema |

### **Perfiles de Usuario**
Clasificación clara de todos los roles:

| Perfil | Categoría | Descripción |
|--------|-----------|-------------|
| **Administrador** | Sistema | Acceso completo + gestión permisos |
| **Director** | Directivo | Máxima autoridad compañía |
| **Capitán** | Operativo | Oficial operaciones emergencia |
| **Tenientes 1°/2°/3°** | Operativo | Oficiales operativos |
| **Tesorero** | Administrativo | Gestión financiera |
| **Secretario** | Administrativo | Documentación y registros |
| **Ayudante** | Administrativo | Apoyo administrativo/operativo |
| **Consejero Disciplina** | Disciplina | Miembro consejo disciplina |
| **Bomberos Activos/Honorarios** | Base | Personal operativo base |

---

## ⚙️ GESTIÓN DE PERMISOS

### **Módulo Exclusivo del Administrador**
- **Ubicación**: `Sistema → Gestión de Permisos`
- **Acceso**: Solo perfil "Administrador"
- **Funcionalidades**:
  - ✅ Vista matricial de permisos
  - ✅ Gestión por perfil individual
  - ✅ Estadísticas de uso
  - ✅ Reseteo a valores por defecto
  - ✅ Validaciones de seguridad

### **Características del Sistema**
1. **Control Granular**: Cada módulo se asigna individualmente
2. **Módulos Protegidos**: Algunos módulos son obligatorios por seguridad
3. **Persistencia Local**: Configuración guardada en localStorage
4. **Validación de Acceso**: Verificación en tiempo real
5. **Compatibilidad**: Mantiene API anterior durante transición

---

## 🔐 CONFIGURACIÓN POR DEFECTO

### **Accesos Iniciales por Perfil**

**🔴 DIRECTIVO**
- **Director**: Acceso completo excepto gestión permisos

**🟠 OPERATIVO**  
- **Capitán**: Dashboard, Personal, Citaciones, Videos, Máquinas, Reportes, Mi Perfil
- **Tenientes**: Dashboard, Personal, Citaciones, Videos, Máquinas, Reportes, Mi Perfil, Administración

**🟡 ADMINISTRATIVO**
- **Tesorero/Secretario**: Dashboard, Personal, Citaciones, Videos, Reportes, Mi Perfil, Administración  
- **Ayudante**: Dashboard, Personal, Citaciones, Videos, Máquinas, Reportes, Mi Perfil, Administración

**🟢 DISCIPLINA**
- **Consejeros**: Dashboard, Citaciones, Videos, Reportes, Mi Perfil

**🔵 BASE**
- **Bomberos**: Solo Citaciones, Videos, Mi Perfil

---

## 📱 CÓMO USAR EL SISTEMA

### **Para Administradores**
1. Iniciar sesión como "Administrador"
2. Navegar a `Gestión de Permisos`
3. Seleccionar entre vista matricial o por perfil
4. Activar/desactivar módulos según necesidades
5. Guardar cambios

### **Validaciones de Seguridad**
- ❌ No se pueden desactivar módulos del sistema
- ❌ Solo Administrador puede modificar permisos
- ❌ Perfil "Mi Perfil" siempre activo
- ❌ Módulo "Permisos" exclusivo Administrador

### **Escalabilidad**
- ✅ Agregar nuevos módulos es simple
- ✅ Nuevos perfiles se configuran fácilmente  
- ✅ Cambios no afectan usuarios activos
- ✅ Sistema compatible con futuras expansiones

---

## 🔧 IMPLEMENTACIÓN TÉCNICA

### **Archivos Clave**
- `/utils/modulePermissions.ts` - Lógica de permisos
- `/components/GestionPermisos.tsx` - Interfaz administración
- `/utils/userRoles.ts` - Integración sistema anterior

### **API Principal**
```typescript
// Verificar acceso a módulo
PermissionManager.canAccessModule(userRole, module)

// Obtener módulos permitidos
PermissionManager.getAllowedModules(userRole)

// Actualizar permisos (solo Admin)
PermissionManager.updateProfilePermissions(profile, modules, adminRole)
```

---

## 🎯 BENEFICIOS DEL NUEVO SISTEMA

### **Para la Organización**
- **Flexibilidad**: Permisos ajustables según necesidades
- **Seguridad**: Control granular de accesos
- **Escalabilidad**: Fácil agregar nuevos módulos/perfiles
- **Auditoría**: Estadísticas y control de uso

### **Para el Administrador**
- **Control Total**: Gestión centralizada de permisos
- **Interfaz Intuitiva**: Vista matricial y por perfil
- **Seguridad**: Validaciones automáticas
- **Flexibilidad**: Cambios en tiempo real

### **Para los Usuarios**
- **Acceso Claro**: Solo ven módulos permitidos
- **Experiencia Limpia**: Interfaz adaptada a su rol
- **Sin Disrupciones**: Cambios transparentes
- **Funcionalidad Completa**: Acceso a herramientas necesarias

---

## 📋 CASOS DE USO COMUNES

### **Scenario 1: Nuevo Teniente**
- Administrador asigna permisos completos incluyendo Máquinas
- Usuario ve inmediatamente nuevas opciones en menú
- Acceso validado en cada navegación

### **Scenario 2: Restricción Temporal**
- Administrador desactiva módulo Reportes para cierto perfil
- Usuarios afectados pierden acceso inmediatamente
- Pueden reactivarse cuando sea necesario

### **Scenario 3: Nuevo Módulo**
- Se desarrolla nuevo módulo "Inventario"
- Administrador lo asigna a perfiles específicos
- Sistema escala sin modificar código base

---

**🎯 El sistema está listo para usar y escalar según las necesidades de la compañía de bomberos voluntarios.**