/*
 * COMPONENTE PERSONAL SOLO LECTURA - BOMBEROS VIÑA DEL MAR
 * ========================================================
 * 
 * SUB-MÓDULO DE VISUALIZACIÓN SIN MODIFICACIÓN:
 * ✅ Vista de solo lectura del personal bomberil
 * ✅ Información de cargos y estructura organizacional
 * ✅ Sin capacidad de agregar, editar o eliminar
 * ✅ Acceso configurable por el Administrador
 * ✅ Diseño coherente con el módulo principal
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  Search, 
  Eye,
  Shield,
  Crown,
  Star,
  Settings,
  FileText,
  UserCog,
  Scale,
  Flame,
  Award,
  Info,
  Grid3X3,
  List,
  Filter,
  ChevronRight
} from 'lucide-react';

interface PersonalReadOnlyProps {
  onNavigate: (page: string) => void;
}

// Datos mock del personal (solo lectura)
const PERSONAL_DATA = [
  {
    id: 1,
    nombre: 'Juan Carlos',
    apellidos: 'Rodríguez Silva',
    rut: '12345678-9',
    cargo: 'Director',
    email: 'director@bomberos.cl',
    telefono: '+56 9 8765 4321',
    fechaIngreso: '2018-03-15',
    estado: 'Activo',
    categoria: 'Directivo',
    experiencia: '6 años'
  },
  {
    id: 2,
    nombre: 'María Elena',
    apellidos: 'González Pérez',
    rut: '98765432-1',
    cargo: 'Capitán',
    email: 'capitan@bomberos.cl',
    telefono: '+56 9 7654 3210',
    fechaIngreso: '2019-07-22',
    estado: 'Activo',
    categoria: 'Operativo',
    experiencia: '5 años'
  },
  {
    id: 3,
    nombre: 'Roberto',
    apellidos: 'Mendoza Torres',
    rut: '11111111-2',
    cargo: 'Teniente Primero',
    email: 'teniente1@bomberos.cl',
    telefono: '+56 9 6543 2109',
    fechaIngreso: '2020-01-10',
    estado: 'Activo',
    categoria: 'Operativo',
    experiencia: '4 años'
  },
  {
    id: 4,
    nombre: 'Patricia',
    apellidos: 'Vega Campos',
    rut: '22222222-2',
    cargo: 'Teniente Segundo',
    email: 'teniente2@bomberos.cl',
    telefono: '+56 9 5432 1098',
    fechaIngreso: '2020-06-18',
    estado: 'Activo',
    categoria: 'Operativo',
    experiencia: '4 años'
  },
  {
    id: 5,
    nombre: 'Carlos Eduardo',
    apellidos: 'Fernández Castro',
    rut: '99887766-3',
    cargo: 'Tesorero',
    email: 'tesorero@bomberos.cl',
    telefono: '+56 9 4321 0987',
    fechaIngreso: '2019-09-12',
    estado: 'Activo',
    categoria: 'Administrativo',
    experiencia: '5 años'
  },
  {
    id: 6,
    nombre: 'Pedro Antonio',
    apellidos: 'López Martínez',
    rut: '11223344-5',
    cargo: 'Bombero Activo',
    email: 'pedro.lopez@gmail.com',
    telefono: '+56 9 3210 9876',
    fechaIngreso: '2021-04-05',
    estado: 'Activo',
    categoria: 'Base',
    experiencia: '3 años'
  },
  {
    id: 7,
    nombre: 'Ana Patricia',
    apellidos: 'Morales Sánchez',
    rut: '55667788-9',
    cargo: 'Bombero Honorario',
    email: 'ana.morales@outlook.com',
    telefono: '+56 9 2109 8765',
    fechaIngreso: '2015-11-30',
    estado: 'Honorario',
    categoria: 'Base',
    experiencia: '9 años'
  }
];

// Configuración de iconos por cargo
const CARGO_ICONS = {
  'Director': Crown,
  'Capitán': Star,
  'Teniente Primero': Star,
  'Teniente Segundo': Star,
  'Teniente Tercero': Star,
  'Tesorero': Settings,
  'Secretario': FileText,
  'Ayudante': UserCog,
  'Consejero de Disciplina': Scale,
  'Bombero Activo': Flame,
  'Bombero Honorario': Award
};

// Configuración de colores por categoría
const CATEGORIA_COLORS = {
  'Directivo': 'bg-red-100 text-red-800 border-red-200',
  'Operativo': 'bg-blue-100 text-blue-800 border-blue-200',
  'Administrativo': 'bg-green-100 text-green-800 border-green-200',
  'Disciplina': 'bg-purple-100 text-purple-800 border-purple-200',
  'Base': 'bg-orange-100 text-orange-800 border-orange-200'
};

export function PersonalReadOnly({ onNavigate }: PersonalReadOnlyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar datos según búsqueda y categoría
  const filteredPersonal = PERSONAL_DATA.filter(persona => {
    const matchesSearch = 
      persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.rut.includes(searchTerm);
    
    const matchesCategory = filterCategory === '' || persona.categoria === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Estadísticas del personal
  const stats = {
    total: PERSONAL_DATA.length,
    activos: PERSONAL_DATA.filter(p => p.estado === 'Activo').length,
    honorarios: PERSONAL_DATA.filter(p => p.estado === 'Honorario').length,
    categorias: {
      'Directivo': PERSONAL_DATA.filter(p => p.categoria === 'Directivo').length,
      'Operativo': PERSONAL_DATA.filter(p => p.categoria === 'Operativo').length,
      'Administrativo': PERSONAL_DATA.filter(p => p.categoria === 'Administrativo').length,
      'Base': PERSONAL_DATA.filter(p => p.categoria === 'Base').length
    }
  };

  const renderPersonalCard = (persona: any) => {
    const IconComponent = CARGO_ICONS[persona.cargo as keyof typeof CARGO_ICONS] || Users;
    
    return (
      <Card key={persona.id} className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{persona.nombre} {persona.apellidos}</CardTitle>
                <p className="text-sm text-muted-foreground">{persona.cargo}</p>
              </div>
            </div>
            <Badge className={CATEGORIA_COLORS[persona.categoria as keyof typeof CATEGORIA_COLORS]}>
              {persona.categoria}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">RUT:</span>
              <span>{persona.rut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="truncate max-w-32">{persona.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ingreso:</span>
              <span>{new Date(persona.fechaIngreso).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experiencia:</span>
              <span>{persona.experiencia}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Estado:</span>
              <Badge variant={persona.estado === 'Activo' ? 'default' : 'secondary'}>
                {persona.estado}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPersonalRow = (persona: any) => {
    const IconComponent = CARGO_ICONS[persona.cargo as keyof typeof CARGO_ICONS] || Users;
    
    return (
      <tr key={persona.id} className="hover:bg-muted/50">
        <td className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{persona.nombre} {persona.apellidos}</div>
              <div className="text-sm text-muted-foreground">{persona.rut}</div>
            </div>
          </div>
        </td>
        <td className="p-3">
          <div>{persona.cargo}</div>
          <Badge className={`${CATEGORIA_COLORS[persona.categoria as keyof typeof CATEGORIA_COLORS]} text-xs`}>
            {persona.categoria}
          </Badge>
        </td>
        <td className="p-3 text-sm">{persona.email}</td>
        <td className="p-3 text-sm">{new Date(persona.fechaIngreso).toLocaleDateString()}</td>
        <td className="p-3 text-sm">{persona.experiencia}</td>
        <td className="p-3">
          <Badge variant={persona.estado === 'Activo' ? 'default' : 'secondary'}>
            {persona.estado}
          </Badge>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con información del sub-módulo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Personal (Solo Lectura)</h1>
            <p className="text-muted-foreground">Visualización del personal bomberil sin capacidad de modificación</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            {viewMode === 'grid' ? 'Vista Lista' : 'Vista Grid'}
          </Button>
        </div>
      </div>

      {/* Alerta informativa */}
      <Alert className="border-info bg-info/10">
        <Info className="h-4 w-4 text-info" />
        <AlertDescription className="text-info">
          Este es un sub-módulo de <strong>solo lectura</strong>. Puedes visualizar la información del personal, 
          pero no realizar modificaciones. Para gestión completa, necesitas acceso al módulo "Gestión de Personal".
        </AlertDescription>
      </Alert>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Personal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.activos}</p>
                <p className="text-sm text-muted-foreground">Bomberos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.honorarios}</p>
                <p className="text-sm text-muted-foreground">Bomberos Honorarios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.categorias.Directivo + stats.categorias.Operativo}</p>
                <p className="text-sm text-muted-foreground">Oficiales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles de búsqueda y filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, cargo o RUT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Todas las categorías</option>
                <option value="Directivo">Directivo</option>
                <option value="Operativo">Operativo</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Base">Base</option>
              </select>
            </div>
          </div>
          
          {(searchTerm || filterCategory) && (
            <div className="mt-3 text-sm text-muted-foreground">
              Mostrando {filteredPersonal.length} de {PERSONAL_DATA.length} bomberos
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vista de datos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonal.map(renderPersonalCard)}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="text-left p-3 font-medium">Bombero</th>
                    <th className="text-left p-3 font-medium">Cargo</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Fecha Ingreso</th>
                    <th className="text-left p-3 font-medium">Experiencia</th>
                    <th className="text-left p-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPersonal.map(renderPersonalRow)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredPersonal.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron bomberos</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory ? 
                'Intenta cambiar los filtros de búsqueda' : 
                'No hay personal registrado en el sistema'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}