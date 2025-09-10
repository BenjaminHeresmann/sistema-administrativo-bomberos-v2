import React, { useState } from 'react';
import { Search, FileText, Users, Play, BarChart3, Settings, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  page: string;
}

interface GlobalSearchProps {
  onNavigate: (page: string) => void;
}

export function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Dashboard Principal',
      description: 'Panel de control con métricas y estadísticas generales',
      category: 'Navegación',
      icon: BarChart3,
      page: 'dashboard'
    },
    {
      id: '2',
      title: 'Gestión de Personal',
      description: 'Administrar bomberos, cargos y estructura organizacional',
      category: 'Personal',
      icon: Users,
      page: 'personal'
    },
    {
      id: '3',
      title: 'Sistema de Citaciones',
      description: 'Crear y gestionar citaciones operativas y administrativas',
      category: 'Operaciones',
      icon: FileText,
      page: 'citaciones'
    },
    {
      id: '4',
      title: 'Videos Institucionales',
      description: 'Contenido audiovisual histórico y educativo',
      category: 'Recursos',
      icon: Play,
      page: 'videos'
    },
    {
      id: '5',
      title: 'Gestión de Registros',
      description: 'Administrar registros de usuarios y permisos',
      category: 'Administración',
      icon: Settings,
      page: 'administracion'
    },
    {
      id: '6',
      title: 'Reportes y Estadísticas',
      description: 'Generar reportes de asistencia y métricas operativas',
      category: 'Análisis',
      icon: BarChart3,
      page: 'reportes'
    }
  ];

  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResultClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Navegación': 'bg-primary',
      'Personal': 'bg-bomberos-blue',
      'Operaciones': 'bg-secondary',
      'Recursos': 'bg-bomberos-red',
      'Administración': 'bg-bomberos-gold',
      'Análisis': 'bg-success'
    };
    return colors[category] || 'bg-muted';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full md:w-auto flex items-center gap-2 text-muted-foreground"
          aria-label="Abrir búsqueda global"
        >
          <Search className="w-4 h-4" />
          <span className="hidden md:inline">Buscar en el sistema...</span>
          <kbd className="hidden md:inline pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-xs text-muted-foreground">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Búsqueda Global del Sistema</DialogTitle>
          <DialogDescription>
            Busca rápidamente entre todas las secciones y funcionalidades disponibles
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Campo de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Escribe para buscar secciones, funcionalidades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
              aria-label="Campo de búsqueda"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          {/* Resultados de búsqueda */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchQuery === '' ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ingresa una búsqueda para ver resultados</p>
                <p className="text-sm mt-2">
                  Puedes buscar por nombre de sección, funcionalidad o categoría
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No se encontraron resultados para "{searchQuery}"</p>
                <p className="text-sm mt-2">
                  Intenta con términos diferentes o más generales
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground px-2">
                  {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
                </p>
                
                {filteredResults.map((result) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.page)}
                      className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label={`Ir a ${result.title}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{result.title}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`${getCategoryColor(result.category)} text-white text-xs`}
                            >
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Consejos de búsqueda */}
          {searchQuery === '' && (
            <div className="border-t border-border pt-4">
              <h5 className="font-medium mb-2">Consejos de búsqueda:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Busca por "personal" para gestión de bomberos</li>
                <li>• Escribe "citación" para el sistema operativo</li>
                <li>• Usa "video" para contenido audiovisual</li>
                <li>• Prueba "reporte" para estadísticas</li>
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}