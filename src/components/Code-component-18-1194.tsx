/*
 * COMPONENTE MÁQUINAS SOLO LECTURA - BOMBEROS VIÑA DEL MAR
 * ========================================================
 * 
 * SUB-MÓDULO DE VISUALIZACIÓN SIN MODIFICACIÓN:
 * ✅ Vista de solo lectura de la flota de carros de bomberos
 * ✅ Información de mantenimiento y historial operativo
 * ✅ Sin capacidad de agregar, editar o eliminar
 * ✅ Acceso configurable por el Administrador
 * ✅ Diseño coherente con el módulo principal
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Truck, 
  Search, 
  Eye,
  Gauge,
  Calendar,
  Wrench,
  Fuel,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Grid3X3,
  List,
  MapPin,
  Activity
} from 'lucide-react';

interface MaquinasReadOnlyProps {
  onNavigate: (page: string) => void;
}

// Datos mock de las máquinas (solo lectura)
const MAQUINAS_DATA = [
  {
    id: 1,
    codigo: 'M-01',
    nombre: 'Máquina Escala',
    tipo: 'Carro Escala',
    modelo: 'Mercedes-Benz Atego 1725',
    año: 2019,
    patente: 'BBVV-01',
    estado: 'Operativa',
    ubicacion: 'Cuartel Central',
    combustible: 85,
    kilometraje: 45780,
    ultimoMantenimiento: '2024-01-15',
    proximoMantenimiento: '2024-07-15',
    capacidadAgua: '3000L',
    equipamiento: ['Escalera 30m', 'Bomba 2000 GPM', 'Equipos rescate']
  },
  {
    id: 2,
    codigo: 'M-02',
    nombre: 'Bomba Principal',
    tipo: 'Carro Bomba',
    modelo: 'Volvo FMX 410',
    año: 2020,
    patente: 'BBVV-02',
    estado: 'Operativa',
    ubicacion: 'Cuartel Central',
    combustible: 72,
    kilometraje: 38950,
    ultimoMantenimiento: '2024-02-10',
    proximoMantenimiento: '2024-08-10',
    capacidadAgua: '4000L',
    equipamiento: ['Bomba principal', 'Mangueras', 'Espuma clase A/B']
  },
  {
    id: 3,
    codigo: 'M-03',
    nombre: 'Unidad Rescate',
    tipo: 'Carro Rescate',
    modelo: 'Iveco Daily 70C17',
    año: 2018,
    patente: 'BBVV-03',
    estado: 'Mantenimiento',
    ubicacion: 'Taller Mecánico',
    combustible: 45,
    kilometraje: 67320,
    ultimoMantenimiento: '2024-03-05',
    proximoMantenimiento: '2024-09-05',
    capacidadAgua: '1000L',
    equipamiento: ['Herramientas hidráulicas', 'Equipos corte', 'Camillas']
  },
  {
    id: 4,
    codigo: 'M-04',
    nombre: 'Químico-Forestal',
    tipo: 'Carro Forestal',
    modelo: 'Mercedes-Benz Unimog U4000',
    año: 2017,
    patente: 'BBVV-04',
    estado: 'Operativa',
    ubicacion: 'Cuartel Central',
    combustible: 68,
    kilometraje: 89450,
    ultimoMantenimiento: '2024-01-28',
    proximoMantenimiento: '2024-07-28',
    capacidadAgua: '2500L',
    equipamiento: ['Tanque químico', 'Bomba alta presión', 'Retardante']
  },
  {
    id: 5,
    codigo: 'M-05',
    nombre: 'Ambulancia Alpha',
    tipo: 'Ambulancia',
    modelo: 'Ford Transit 350L',
    año: 2021,
    patente: 'BBVV-05',
    estado: 'Fuera de Servicio',
    ubicacion: 'Taller Especializado',
    combustible: 30,
    kilometraje: 28750,
    ultimoMantenimiento: '2024-02-20',
    proximoMantenimiento: '2024-08-20',
    capacidadAgua: 'N/A',
    equipamiento: ['Equipos médicos', 'Desfibrilador', 'Oxígeno']
  }
];

// Configuración de iconos por tipo
const TIPO_ICONS = {
  'Carro Escala': Truck,
  'Carro Bomba': Truck,
  'Carro Rescate': Shield,
  'Carro Forestal': Truck,
  'Ambulancia': Activity
};

// Configuración de colores por estado
const ESTADO_COLORS = {
  'Operativa': 'bg-green-100 text-green-800 border-green-200',
  'Mantenimiento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Fuera de Servicio': 'bg-red-100 text-red-800 border-red-200',
  'En Reparación': 'bg-orange-100 text-orange-800 border-orange-200'
};

export function MaquinasReadOnly({ onNavigate }: MaquinasReadOnlyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [filterTipo, setFilterTipo] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar datos según búsqueda y filtros
  const filteredMaquinas = MAQUINAS_DATA.filter(maquina => {
    const matchesSearch = 
      maquina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maquina.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maquina.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maquina.patente.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === '' || maquina.estado === filterEstado;
    const matchesTipo = filterTipo === '' || maquina.tipo === filterTipo;
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  // Estadísticas de la flota
  const stats = {
    total: MAQUINAS_DATA.length,
    operativas: MAQUINAS_DATA.filter(m => m.estado === 'Operativa').length,
    mantenimiento: MAQUINAS_DATA.filter(m => m.estado === 'Mantenimiento').length,
    fueraServicio: MAQUINAS_DATA.filter(m => m.estado === 'Fuera de Servicio').length,
    combustiblePromedio: Math.round(MAQUINAS_DATA.reduce((acc, m) => acc + m.combustible, 0) / MAQUINAS_DATA.length),
    kilometrajeTotal: MAQUINAS_DATA.reduce((acc, m) => acc + m.kilometraje, 0)
  };

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'Operativa': return 'default';
      case 'Mantenimiento': return 'secondary';
      case 'Fuera de Servicio': return 'destructive';
      default: return 'outline';
    }
  };

  const getCombustibleColor = (nivel: number) => {
    if (nivel >= 70) return 'text-green-600';
    if (nivel >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderMaquinaCard = (maquina: any) => {
    const IconComponent = TIPO_ICONS[maquina.tipo as keyof typeof TIPO_ICONS] || Truck;
    
    return (
      <Card key={maquina.id} className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{maquina.nombre}</CardTitle>
                <p className="text-sm text-muted-foreground">{maquina.codigo} • {maquina.tipo}</p>
              </div>
            </div>
            <Badge variant={getEstadoBadgeVariant(maquina.estado)}>
              {maquina.estado}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Información básica */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modelo:</span>
              <span className="text-right">{maquina.modelo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Año:</span>
              <span>{maquina.año}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Patente:</span>
              <span className="font-mono">{maquina.patente}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ubicación:</span>
              <span className="text-right">{maquina.ubicacion}</span>
            </div>
          </div>

          {/* Indicadores de estado */}
          <div className="space-y-3">
            {/* Combustible */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Combustible</span>
                </div>
                <span className={`text-sm font-medium ${getCombustibleColor(maquina.combustible)}`}>
                  {maquina.combustible}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    maquina.combustible >= 70 ? 'bg-green-500' :
                    maquina.combustible >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${maquina.combustible}%` }}
                />
              </div>
            </div>

            {/* Kilometraje */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Kilometraje</span>
              </div>
              <span className="text-sm font-medium">{maquina.kilometraje.toLocaleString()} km</span>
            </div>

            {/* Próximo mantenimiento */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Próximo mantto.</span>
              </div>
              <span className="text-sm">{new Date(maquina.proximoMantenimiento).toLocaleDateString()}</span>
            </div>

            {/* Capacidad de agua */}
            {maquina.capacidadAgua !== 'N/A' && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm">💧 Capacidad</span>
                </div>
                <span className="text-sm font-medium">{maquina.capacidadAgua}</span>
              </div>
            )}
          </div>

          {/* Equipamiento */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Equipamiento:</p>
            <div className="flex flex-wrap gap-1">
              {maquina.equipamiento.slice(0, 2).map((equipo: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {equipo}
                </Badge>
              ))}
              {maquina.equipamiento.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{maquina.equipamiento.length - 2} más
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderMaquinaRow = (maquina: any) => {
    const IconComponent = TIPO_ICONS[maquina.tipo as keyof typeof TIPO_ICONS] || Truck;
    
    return (
      <tr key={maquina.id} className="hover:bg-muted/50">
        <td className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{maquina.nombre}</div>
              <div className="text-sm text-muted-foreground">{maquina.codigo}</div>
            </div>
          </div>
        </td>
        <td className="p-3">
          <div>{maquina.tipo}</div>
          <div className="text-sm text-muted-foreground">{maquina.modelo}</div>
        </td>
        <td className="p-3">
          <Badge variant={getEstadoBadgeVariant(maquina.estado)}>
            {maquina.estado}
          </Badge>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <span className={`font-mono ${getCombustibleColor(maquina.combustible)}`}>
              {maquina.combustible}%
            </span>
            <div className="w-16 bg-muted rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${
                  maquina.combustible >= 70 ? 'bg-green-500' :
                  maquina.combustible >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${maquina.combustible}%` }}
              />
            </div>
          </div>
        </td>
        <td className="p-3 text-sm">{maquina.kilometraje.toLocaleString()} km</td>
        <td className="p-3 text-sm">{maquina.ubicacion}</td>
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
            <h1 className="text-2xl font-semibold">Máquinas (Solo Lectura)</h1>
            <p className="text-muted-foreground">Visualización de la flota de carros de bomberos sin capacidad de modificación</p>
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
          Este es un sub-módulo de <strong>solo lectura</strong>. Puedes visualizar la información de las máquinas, 
          pero no realizar modificaciones. Para gestión completa, necesitas acceso al módulo "Gestión de Máquinas".
        </AlertDescription>
      </Alert>

      {/* Estadísticas de la flota */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Flota</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.operativas}</p>
                <p className="text-sm text-muted-foreground">Operativas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.mantenimiento}</p>
                <p className="text-sm text-muted-foreground">Mantenimiento</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Fuel className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-semibold">{stats.combustiblePromedio}%</p>
                <p className="text-sm text-muted-foreground">Combust. Prom.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gauge className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-semibold">{(stats.kilometrajeTotal / 1000).toFixed(0)}k</p>
                <p className="text-sm text-muted-foreground">km Totales</p>
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
                  placeholder="Buscar por nombre, código, tipo o patente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Todos los estados</option>
                <option value="Operativa">Operativa</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Fuera de Servicio">Fuera de Servicio</option>
              </select>
              
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Todos los tipos</option>
                <option value="Carro Bomba">Carro Bomba</option>
                <option value="Carro Escala">Carro Escala</option>
                <option value="Carro Rescate">Carro Rescate</option>
                <option value="Carro Forestal">Carro Forestal</option>
                <option value="Ambulancia">Ambulancia</option>
              </select>
            </div>
          </div>
          
          {(searchTerm || filterEstado || filterTipo) && (
            <div className="mt-3 text-sm text-muted-foreground">
              Mostrando {filteredMaquinas.length} de {MAQUINAS_DATA.length} máquinas
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vista de datos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaquinas.map(renderMaquinaCard)}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="text-left p-3 font-medium">Máquina</th>
                    <th className="text-left p-3 font-medium">Tipo</th>
                    <th className="text-left p-3 font-medium">Estado</th>
                    <th className="text-left p-3 font-medium">Combustible</th>
                    <th className="text-left p-3 font-medium">Kilometraje</th>
                    <th className="text-left p-3 font-medium">Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaquinas.map(renderMaquinaRow)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredMaquinas.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron máquinas</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterEstado || filterTipo ? 
                'Intenta cambiar los filtros de búsqueda' : 
                'No hay máquinas registradas en el sistema'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}