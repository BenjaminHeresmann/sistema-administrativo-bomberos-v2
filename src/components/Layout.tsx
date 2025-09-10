/*
 * LAYOUT PRINCIPAL SIMPLIFICADO - SISTEMA BOMBEROS
 * ===============================================
 * 
 * Layout con navegación lineal y funcionamiento directo en localhost
 */

import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Bell,
  User,
  LogOut,
  Flame,
  Menu,
  X,
  Play,
  Truck,
  Shield,
  Eye
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  UserProfile, 
  canAccessPage, 
  isAdministrativeUser,
  isRegularFirefighter
} from '../utils/simpleAuth';

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  notifications: number;
  priority?: boolean;
  isSeparator?: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout?: () => void;
  userProfile: UserProfile;
}

// Función para obtener items del menú según el rol
function getMenuItems(role: string): MenuItem[] {
  const baseItems: MenuItem[] = [];

  // Para usuarios administrativos
  if (isAdministrativeUser(role as any)) {
    baseItems.push(
      { id: 'dashboard', icon: Home, label: 'Dashboard', notifications: 0, priority: true },
      { id: 'personal', icon: Users, label: 'Personal', notifications: 2 },
      { id: 'citaciones', icon: FileText, label: 'Citaciones', notifications: 3 },
      { id: 'videos', icon: Play, label: 'Videos', notifications: 0 },
      { id: 'maquinas', icon: Truck, label: 'Máquinas', notifications: 1 },
      { id: 'administracion', icon: Settings, label: 'Administración', notifications: 0 },
      { id: 'reportes', icon: BarChart3, label: 'Reportes', notifications: 0 }
    );

    // Solo administrador ve permisos
    if (role === 'Administrador') {
      baseItems.push({ id: 'permisos', icon: Shield, label: 'Permisos', notifications: 0 });
    }
  }
  // Para bomberos regulares
  else if (isRegularFirefighter(role as any)) {
    baseItems.push(
      { id: 'citaciones-view', icon: FileText, label: 'Mis Citaciones', notifications: 2, priority: true },
      { id: 'videos', icon: Play, label: 'Videos', notifications: 0 }
    );
  }
  // Para consejeros de disciplina
  else {
    baseItems.push(
      { id: 'dashboard', icon: Home, label: 'Dashboard', notifications: 0, priority: true },
      { id: 'personal-view', icon: Eye, label: 'Ver Personal', notifications: 0 },
      { id: 'citaciones-view', icon: FileText, label: 'Ver Citaciones', notifications: 1 },
      { id: 'videos', icon: Play, label: 'Videos', notifications: 0 },
      { id: 'reportes', icon: BarChart3, label: 'Reportes', notifications: 0 }
    );
  }

  return baseItems;
}

export function Layout({ children, currentPage, onPageChange, onLogout, userProfile }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (page: string) => {
    if (canAccessPage(userProfile.rol, page)) {
      onPageChange(page);
      setSidebarOpen(false); // Cerrar sidebar en mobile
    }
  };

  const menuItems = getMenuItems(userProfile.rol);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo y botón menú */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-md"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-semibold text-sm">Sistema Bomberos</h1>
                <p className="text-xs text-muted-foreground">2ª Compañía V. del Mar</p>
              </div>
            </div>
          </div>
          
          {/* Usuario y acciones */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
            
            <button
              onClick={() => handleNavigation('mi-perfil')}
              className="flex items-center gap-2 text-sm hover:bg-muted/50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline">{userProfile.nombre} {userProfile.apellidos}</span>
            </button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Información del usuario */}
        <div className="p-4 border-b border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sidebar-foreground font-semibold text-sm">2ª Compañía</p>
              <p className="text-sidebar-foreground/60 text-xs">Bomberos V. del Mar</p>
            </div>
          </div>
        </div>
        
        {/* Navegación */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isPriority = item.priority;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isPriority ? 'text-sidebar-primary' : ''} ${isActive && isPriority ? 'text-sidebar-primary-foreground' : ''}`} />
                  <span className={`font-medium ${isPriority ? 'font-semibold' : ''}`}>
                    {item.label}
                    {isPriority && (
                      <span className="ml-2 text-xs bg-sidebar-primary/20 px-2 py-0.5 rounded-full">
                        PRINCIPAL
                      </span>
                    )}
                  </span>
                </div>
                {item.notifications > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {item.notifications}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="lg:ml-64 border-t border-border bg-card">
        <div className="px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Información institucional */}
            <div>
              <h3 className="font-semibold mb-4">2ª Compañía de Bomberos</h3>
              <p className="text-sm text-muted-foreground mb-2">Viña del Mar</p>
              <p className="text-xs text-muted-foreground">Fundada en 1884</p>
              <p className="text-xs text-muted-foreground italic mt-2">"Lealtad y Trabajo"</p>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-medium mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📞 +56 32 XXX XXXX</p>
                <p>📧 contacto@bomberos.cl</p>
                <p>📍 Dirección Institucional</p>
              </div>
            </div>

            {/* Enlaces */}
            <div>
              <h4 className="font-medium mb-4">Enlaces</h4>
              <div className="space-y-2 text-sm">
                <button 
                  onClick={() => handleNavigation('videos')}
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Videos Institucionales
                </button>
                <button 
                  onClick={() => handleNavigation('mi-perfil')}
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Mi Perfil
                </button>
              </div>
            </div>

            {/* Rol actual */}
            <div>
              <h4 className="font-medium mb-4">Sesión Actual</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{userProfile.nombre} {userProfile.apellidos}</p>
                <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {userProfile.rol}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
            <p>&copy; 2024 2ª Compañía de Bomberos de Viña del Mar. Sistema Administrativo Interno.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}