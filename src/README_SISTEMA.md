# 🚒 Sistema Administrativo Bomberos - 2ª Compañía Viña del Mar

## 🎯 Descripción del Proyecto

Sistema administrativo interno completo para la gestión de bomberos voluntarios, desarrollado con React, TypeScript y Tailwind CSS. Implementa un dashboard empresarial profesional con paleta de colores institucional y navegación intuitiva.

## 🏗️ Arquitectura del Sistema

### **Frontend**
- **React 18** con TypeScript
- **Tailwind CSS v4** para estilos
- **React Router v6** para navegación SPA
- **Shadcn/ui** para componentes base
- **Lucide React** para iconografía

### **Autenticación y Permisos**
- Sistema de roles diferenciados (8 tipos de usuario)
- Persistencia con localStorage
- Control de acceso granular por módulo
- Navegación adaptativa según permisos

## 🚀 Instalación y Configuración

### **Requisitos Previos**
- Node.js 18+ 
- npm o yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### **Pasos de Instalación**
1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd sistema-bomberos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 👥 Usuarios de Prueba

### **🔑 Administrador (Acceso Total)**
- **Email:** `admin@bomberos.cl`
- **Contraseña:** `123456`
- **Permisos:** Todos los módulos + Gestión de Permisos

### **🎖️ Director (Administrativo)**
- **Email:** `director@bomberos.cl`
- **Contraseña:** `123456`
- **Permisos:** Dashboard, Personal, Citaciones, Videos, Máquinas, Administración, Reportes

### **🚒 Bombero Activo (Usuario Regular)**
- **Email:** `juan.perez@gmail.com`
- **Contraseña:** `123456`
- **Permisos:** Citaciones (lectura), Videos, Mi Perfil

## 📋 Módulos del Sistema

| Módulo | Descripción | Administrador | Director/Capitán | Bombero Regular | Consejero |
|--------|-------------|---------------|------------------|-----------------|-----------|
| **Dashboard** | Panel principal con métricas | ✅ Completo | ✅ Completo | ✅ Simplificado | ✅ Completo |
| **Personal** | Gestión de bomberos | ✅ CRUD | ✅ CRUD | ❌ Sin acceso | 👁️ Solo lectura |
| **Citaciones** | Sistema de citaciones | ✅ CRUD | ✅ CRUD | 👁️ Solo lectura | 👁️ Solo lectura |
| **Videos** | Multimedia institucional | ✅ Acceso | ✅ Acceso | ✅ Acceso | ✅ Acceso |
| **Máquinas** | Control de vehículos | ✅ CRUD | ✅ CRUD | ❌ Sin acceso | ❌ Sin acceso |
| **Permisos** | Gestión de accesos | ✅ Solo Admin | ❌ Sin acceso | ❌ Sin acceso | ❌ Sin acceso |
| **Mi Perfil** | Datos personales | ✅ Acceso | ✅ Acceso | ✅ Acceso | ✅ Acceso |
| **Reportes** | Estadísticas y análisis | ✅ Acceso | ✅ Acceso | ❌ Sin acceso | ✅ Acceso |

## 🎨 Características del Diseño

### **Paleta de Colores Institucional**
- **Azul Primario:** `#2563EB` (Institucional)
- **Amarillo Secundario:** `#F59E0B` (Distintivo)
- **Rojo Bomberos:** `#DC2626` (Emergencias)
- **Dorado Ceremonial:** `#D97706` (Eventos especiales)

### **Tipografía y Espaciado**
- Sistema tipográfico semántico
- Responsive design mobile-first
- Tokens CSS para consistencia visual
- Efectos de transición suaves

## 🔧 Funcionalidades Principales

### **🔐 Sistema de Autenticación**
- Login con validación de email institucional
- Persistencia de sesión con localStorage
- Logout seguro con limpieza de datos
- Redirección automática según rol

### **🧭 Navegación Inteligente**
- Sidebar adaptativo por rol
- Breadcrumbs dinámicos
- URLs semánticas y navegables
- Deep linking para contenido específico

### **📊 Dashboard Diferenciado**
- Métricas clave para administrativos
- Panel simplificado para bomberos regulares
- Accesos rápidos contextuales
- Notificaciones en tiempo real

### **✅ Validaciones Avanzadas**
- RUT chileno con algoritmo oficial
- Emails institucionales específicos
- Formularios con React Hook Form + Zod
- Mensajes de error contextuales

## 🗂️ Estructura de Archivos

```
├── App.tsx                 # Aplicación principal
├── components/             # Componentes React
│   ├── Layout.tsx         # Layout principal
│   ├── Dashboard.tsx      # Dashboard administrativo
│   ├── FirefighterDashboard.tsx # Dashboard bomberos
│   ├── Personal.tsx       # Gestión de personal
│   ├── Citaciones.tsx     # Sistema de citaciones
│   └── ui/               # Componentes Shadcn/ui
├── utils/                 # Utilidades
│   ├── simpleAuth.ts     # Sistema de autenticación
│   ├── validation.ts     # Validaciones
│   └── userRoles.ts      # Gestión de roles
├── styles/
│   └── globals.css       # Estilos globales
└── debug_system.html     # Herramienta de debugging
```

## 🧪 Testing y Debugging

### **Archivo de Verificación**
Abrir `debug_system.html` en el navegador para:
- Verificar compatibilidad del sistema
- Probar localStorage y navegación
- Limpiar datos en caso de problemas
- Ver usuarios de prueba disponibles

### **Solución de Problemas Comunes**

#### **Página en Blanco después del Login**
1. Abrir herramientas de desarrollador (F12)
2. Revisar errores en la consola
3. Verificar que localStorage esté habilitado
4. Limpiar caché del navegador

#### **Error de Autenticación**
1. Verificar formato de email correcto
2. Usar contraseña exacta: `123456`
3. Limpiar datos con `localStorage.clear()`

#### **Problemas de Navegación**
1. Verificar que JavaScript esté habilitado
2. Comprobar compatibilidad del navegador
3. Revisar bloqueo de pop-ups

## 📱 Responsive Design

- **Mobile First:** Diseño optimizado para dispositivos móviles
- **Breakpoints:** sm, md, lg, xl según estándares Tailwind
- **Sidebar Colapsible:** Menú hamburguesa en dispositivos pequeños
- **Grids Adaptativas:** Layouts que se ajustan automáticamente

## 🔒 Seguridad

- **Validación Client-Side:** Para UX mejorada
- **Sanitización de Inputs:** Prevención de XSS
- **Control de Acceso:** Rutas protegidas por rol
- **Sesiones Seguras:** Limpieza automática al logout

## 🌟 Próximas Funcionalidades

- [ ] Integración con backend real
- [ ] Notificaciones push
- [ ] Exportación de reportes en PDF
- [ ] Chat interno entre bomberos
- [ ] Calendario de actividades
- [ ] Modo offline con Service Workers

## 📞 Soporte

Para problemas técnicos o consultas:
1. Revisar la documentación en este README
2. Usar `debug_system.html` para diagnosticar
3. Revisar la consola del navegador
4. Contactar al equipo de desarrollo

---

**2ª Compañía de Bomberos de Viña del Mar**  
*Fundada en 1884 • "Lealtad y Trabajo"*  
Sistema desarrollado con ❤️ para servir a la comunidad