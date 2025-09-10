/*
 * SISTEMA ADMINISTRATIVO BOMBEROS - APLICACIÓN PRINCIPAL
 * =====================================================
 * 
 * Sistema simplificado para funcionamiento correcto en localhost
 * Navegación lineal mediante enlaces e hipervínculos
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// Importar funciones de autenticación con debugging
import { 
  UserProfile,
  getUserSession,
  saveUserSession,
  clearUserSession,
  authenticateUser,
  isAdministrativeUser,
  isRegularFirefighter,
  canAccessPage,
  getDefaultPage,
  validateRUT,
  validateEmail
} from './utils/simpleAuth';

// Verificar que las funciones se importaron correctamente
console.log('[APP] 📦 Verificando importaciones...');
console.log('[APP] 🔐 authenticateUser:', typeof authenticateUser);
console.log('[APP] 💾 getUserSession:', typeof getUserSession);
console.log('[APP] ✉️ validateEmail:', typeof validateEmail);

// COMPONENTES
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { FirefighterDashboard } from './components/FirefighterDashboard';
import { Personal } from './components/Personal';
import { PersonalReadOnly } from './components/PersonalReadOnly';
import { Citaciones } from './components/Citaciones';
import { CitacionesReadOnly } from './components/CitacionesReadOnly';
import { VideosInstitucionales } from './components/VideosInstitucionales';
import { RegistrationAdmin } from './components/RegistrationAdmin';
import { UserProfile as UserProfileComponent } from './components/UserProfile';
import { Reportes } from './components/Reportes';
import { Maquinas } from './components/Maquinas';
import { MaquinasReadOnly } from './components/MaquinasReadOnly';
import { GestionPermisos } from './components/GestionPermisos';

/**
 * COMPONENTE DE LOGIN SIMPLIFICADO
 */
function SimpleLogin({ onLogin }: { onLogin: (user: UserProfile) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[LOGIN] 🔄 Iniciando proceso de login...');
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (!email || !password) {
      console.log('[LOGIN] ❌ Campos vacíos');
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    console.log(`[LOGIN] 📧 Email: ${email}`);
    
    if (!validateEmail(email)) {
      console.log('[LOGIN] ❌ Email inválido');
      setError('Email debe ser @bomberos.cl, @gmail.com o @outlook.com');
      setLoading(false);
      return;
    }

    // Intentar autenticación
    console.log('[LOGIN] 🔍 Verificando credenciales...');
    const user = authenticateUser(email, password);
    
    if (user) {
      console.log(`[LOGIN] ✅ Autenticación exitosa: ${user.nombre} ${user.apellidos}`);
      saveUserSession(user);
      onLogin(user);
    } else {
      console.log('[LOGIN] ❌ Credenciales inválidas');
      setError('Credenciales inválidas. Use password: 123456');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground text-2xl">🚒</span>
          </div>
          <h1 className="text-2xl font-bold">Sistema Bomberos</h1>
          <p className="text-muted-foreground">2ª Compañía de Bomberos V. del Mar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="usuario@bomberos.cl"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground space-y-4">
          <p>Usuarios de prueba:</p>
          <div className="space-y-2">
            <button 
              type="button"
              onClick={() => {
                setEmail('admin@bomberos.cl');
                setPassword('123456');
              }}
              className="block w-full text-left p-2 hover:bg-muted/50 rounded text-xs border"
            >
              🔑 admin@bomberos.cl / 123456 (Administrador)
            </button>
            <button 
              type="button"
              onClick={() => {
                setEmail('director@bomberos.cl');
                setPassword('123456');
              }}
              className="block w-full text-left p-2 hover:bg-muted/50 rounded text-xs border"
            >
              🎖️ director@bomberos.cl / 123456 (Director)
            </button>
            <button 
              type="button"
              onClick={() => {
                setEmail('juan.perez@gmail.com');
                setPassword('123456');
              }}
              className="block w-full text-left p-2 hover:bg-muted/50 rounded text-xs border"
            >
              🚒 juan.perez@gmail.com / 123456 (Bombero)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * APLICACIÓN PRINCIPAL CON RUTAS PROTEGIDAS
 */
function MainApp() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar autenticación al cargar
  useEffect(() => {
    console.log('[APP] 🔍 Verificando sesión existente...');
    const storedUser = getUserSession();
    if (storedUser) {
      setUser(storedUser);
      console.log(`[APP] ✅ Usuario cargado: ${storedUser.nombre} ${storedUser.apellidos} (${storedUser.rol})`);
    } else {
      console.log('[APP] ❌ No hay sesión activa');
    }
    setIsLoading(false);
  }, []);

  // Manejar login exitoso
  const handleLogin = (loggedUser: UserProfile) => {
    console.log(`[APP] 🔐 Login exitoso: ${loggedUser.nombre} ${loggedUser.apellidos} (${loggedUser.rol})`);
    
    try {
      setUser(loggedUser);
      saveUserSession(loggedUser);
      console.log(`[APP] 💾 Sesión guardada correctamente`);
      
      const defaultPage = getDefaultPage(loggedUser.rol);
      const route = defaultPage === 'dashboard' ? '/' : `/${defaultPage}`;
      console.log(`[APP] 🧭 Página por defecto: ${defaultPage}, Ruta: ${route}`);
      
      // Verificar que la navegación funcione
      if (navigate) {
        navigate(route);
        console.log(`[APP] ✅ Navegación ejecutada a: ${route}`);
      } else {
        console.error('[APP] ❌ Error: navigate no disponible');
      }
    } catch (error) {
      console.error('[APP] ❌ Error en handleLogin:', error);
    }
  };

  // Manejar logout
  const handleLogout = () => {
    console.log('[APP] 🚪 Cerrando sesión...');
    clearUserSession();
    setUser(null);
    navigate('/');
  };

  // Mostrar loading mientras verifica sesión
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground text-2xl">🚒</span>
          </div>
          <p className="text-muted-foreground">Cargando sistema...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar login
  if (!user) {
    return <SimpleLogin onLogin={handleLogin} />;
  }

  // Función para obtener página actual
  const getCurrentPage = (): string => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/personal') return 'personal';
    if (path === '/personal-view') return 'personal-view';
    if (path === '/citaciones') return 'citaciones';
    if (path === '/citaciones-view') return 'citaciones-view';
    if (path === '/videos') return 'videos';
    if (path === '/maquinas') return 'maquinas';
    if (path === '/maquinas-view') return 'maquinas-view';
    if (path === '/administracion') return 'administracion';
    if (path === '/permisos') return 'permisos';
    if (path === '/mi-perfil') return 'mi-perfil';
    if (path === '/reportes') return 'reportes';
    return getDefaultPage(user.rol);
  };

  // Función para navegar
  const handlePageChange = (page: string) => {
    if (!canAccessPage(user.rol, page)) {
      console.warn(`Usuario ${user.rol} no tiene acceso a la página: ${page}`);
      return;
    }

    const routes: { [key: string]: string } = {
      'dashboard': '/',
      'personal': '/personal',
      'personal-view': '/personal-view', 
      'citaciones': '/citaciones',
      'citaciones-view': '/citaciones-view',
      'videos': '/videos',
      'maquinas': '/maquinas',
      'maquinas-view': '/maquinas-view',
      'administracion': '/administracion',
      'permisos': '/permisos',
      'mi-perfil': '/mi-perfil',
      'reportes': '/reportes'
    };

    const route = routes[page] || '/';
    navigate(route);
  };

  return (
    <Layout 
      currentPage={getCurrentPage()} 
      onPageChange={handlePageChange}
      onLogout={handleLogout}
      userProfile={user}
    >
      <Routes>
        {/* Dashboard Principal */}
        <Route 
          path="/" 
          element={
            isAdministrativeUser(user.rol) ? (
              <Dashboard onNavigate={handlePageChange} userProfile={user} />
            ) : (
              <FirefighterDashboard onNavigate={handlePageChange} userProfile={user} />
            )
          } 
        />

        {/* Gestión de Personal */}
        <Route 
          path="/personal" 
          element={
            canAccessPage(user.rol, 'personal') ? (
              <Personal onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Personal Solo Lectura */}
        <Route 
          path="/personal-view" 
          element={
            canAccessPage(user.rol, 'personal-view') ? (
              <PersonalReadOnly onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Citaciones */}
        <Route 
          path="/citaciones" 
          element={
            canAccessPage(user.rol, 'citaciones') ? (
              <Citaciones onNavigate={handlePageChange} userProfile={user} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Citaciones Solo Lectura */}
        <Route 
          path="/citaciones-view" 
          element={
            canAccessPage(user.rol, 'citaciones-view') ? (
              <CitacionesReadOnly onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Videos Institucionales */}
        <Route 
          path="/videos" 
          element={<VideosInstitucionales onNavigate={handlePageChange} />} 
        />

        {/* Máquinas */}
        <Route 
          path="/maquinas" 
          element={
            canAccessPage(user.rol, 'maquinas') ? (
              <Maquinas onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Máquinas Solo Lectura */}
        <Route 
          path="/maquinas-view" 
          element={
            canAccessPage(user.rol, 'maquinas-view') ? (
              <MaquinasReadOnly onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Administración */}
        <Route 
          path="/administracion" 
          element={
            canAccessPage(user.rol, 'administracion') ? (
              <RegistrationAdmin onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Permisos - Solo Administrador */}
        <Route 
          path="/permisos" 
          element={
            canAccessPage(user.rol, 'permisos') ? (
              <GestionPermisos onNavigate={handlePageChange} userProfile={user} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Mi Perfil */}
        <Route 
          path="/mi-perfil" 
          element={<UserProfileComponent onNavigate={handlePageChange} />} 
        />

        {/* Reportes */}
        <Route 
          path="/reportes" 
          element={
            canAccessPage(user.rol, 'reportes') ? (
              <Reportes onNavigate={handlePageChange} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN
 */
export default function App() {
  console.log('[APP] 🚀 Iniciando Sistema Administrativo Bomberos');
  
  return (
    <Router>
      <MainApp />
      <Toaster />
    </Router>
  );
}