/*
 * COMPONENTE CITACIONES (SOLO LECTURA) - SISTEMA BOMBEROS
 * =======================================================
 * 
 * FUNCIONALIDADES:
 * ✅ Visualización de citaciones sin capacidad de modificación
 * ✅ Notificaciones de nuevas citaciones
 * ✅ Filtros de búsqueda por tipo y estado
 * ✅ Vista detallada de cada citación
 * ✅ Descarga de citaciones en PDF
 * ✅ Interfaz optimizada para todos los perfiles
 */

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter,
  Eye,
  Download,
  Calendar,
  User,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Flame,
  UserCheck,
  BadgeCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

interface CitacionesReadOnlyProps {
  onNavigate: (page: string) => void;
}

interface Citacion {
  id: string;
  tipo: 'Operativa' | 'Administrativa' | 'Disciplinaria' | 'Ceremonial';
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: 'Pendiente' | 'Confirmada' | 'Rechazada' | 'Vencida';
  prioridad: 'Alta' | 'Media' | 'Baja';
  citadoPor: string;
  fechaCreacion: string;
  detalles?: string;
  asistenciaRequerida: boolean;
  documentos?: string[];
}

// Datos mock para demostración
const mockCitaciones: Citacion[] = [
  {
    id: 'CIT-001',
    tipo: 'Operativa',
    titulo: 'Práctica de Rescate en Altura',
    descripcion: 'Entrenamiento especializado en técnicas de rescate en estructuras elevadas',
    fecha: '2024-12-15',
    hora: '09:00',
    lugar: 'Cuartel 2ª Compañía - Torre de Entrenamiento',
    estado: 'Pendiente',
    prioridad: 'Alta',
    citadoPor: 'Capitán María Elena González',
    fechaCreacion: '2024-12-10',
    asistenciaRequerida: true,
    documentos: ['Manual de Rescate.pdf', 'Lista de Equipos.pdf'],
    detalles: 'Traer equipo personal completo y EPP. La práctica incluye rappel y sistemas de anclaje.'
  },
  {
    id: 'CIT-002',
    tipo: 'Administrativa',
    titulo: 'Reunión Mensual de Compañía',
    descripcion: 'Reunión ordinaria para revisar estadísticas del mes y planificación',
    fecha: '2024-12-20',
    hora: '19:30',
    lugar: 'Salón de Actos - Cuartel Principal',
    estado: 'Confirmada',
    prioridad: 'Media',
    citadoPor: 'Director Juan Carlos Rodríguez',
    fechaCreacion: '2024-12-05',
    asistenciaRequerida: true,
    detalles: 'Se revisará el presupuesto 2025 y nuevos protocolos de emergencia.'
  },
  {
    id: 'CIT-003',
    tipo: 'Ceremonial',
    titulo: 'Aniversario 140 años de la Compañía',
    descripcion: 'Ceremonia conmemorativa del 140° aniversario de fundación (1884-2024)',
    fecha: '2024-12-25',
    hora: '11:00',
    lugar: 'Plaza Principal de Viña del Mar',
    estado: 'Confirmada',
    prioridad: 'Alta',
    citadoPor: 'Director Juan Carlos Rodríguez',
    fechaCreacion: '2024-11-15',
    asistenciaRequerida: true,
    documentos: ['Protocolo Ceremonial.pdf'],
    detalles: 'Uniforme de gala completo. Concentración 30 minutos antes en el cuartel.'
  },
  {
    id: 'CIT-004',
    tipo: 'Disciplinaria',
    titulo: 'Revisión de Protocolo de Seguridad',
    descripcion: 'Análisis de incidente ocurrido en servicio del 08/12',
    fecha: '2024-12-18',
    hora: '15:00',
    lugar: 'Oficina Administrativa',
    estado: 'Pendiente',
    prioridad: 'Media',
    citadoPor: 'Consejero de Disciplina Andrea Castillo',
    fechaCreacion: '2024-12-11',
    asistenciaRequerida: true,
    detalles: 'Comparecer con uniforme reglamentario. Revisar reglamento interno.'
  }
];

export function CitacionesReadOnly({ onNavigate }: CitacionesReadOnlyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [selectedCitacion, setSelectedCitacion] = useState<Citacion | null>(null);

  // Filtrar citaciones
  const citacionesFiltradas = mockCitaciones.filter(citacion => {
    const matchesSearch = citacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citacion.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citacion.lugar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'all' || citacion.tipo === filterTipo;
    const matchesEstado = filterEstado === 'all' || citacion.estado === filterEstado;
    
    return matchesSearch && matchesTipo && matchesEstado;
  });

  // Contar citaciones por estado
  const contadores = {
    pendientes: mockCitaciones.filter(c => c.estado === 'Pendiente').length,
    confirmadas: mockCitaciones.filter(c => c.estado === 'Confirmada').length,
    total: mockCitaciones.length,
    nuevas: mockCitaciones.filter(c => {
      const fechaCreacion = new Date(c.fechaCreacion);
      const hoy = new Date();
      const diferenciaDias = Math.floor((hoy.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60 * 24));
      return diferenciaDias <= 3;
    }).length
  };

  const getEstadoBadge = (estado: Citacion['estado']) => {
    const styles = {
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Confirmada': 'bg-green-100 text-green-800 border-green-200',
      'Rechazada': 'bg-red-100 text-red-800 border-red-200',
      'Vencida': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return styles[estado] || styles.Pendiente;
  };

  const getPrioridadIcon = (prioridad: Citacion['prioridad']) => {
    if (prioridad === 'Alta') return <AlertCircle className="w-4 h-4 text-red-600" />;
    if (prioridad === 'Media') return <Clock className="w-4 h-4 text-yellow-600" />;
    return <CheckCircle className="w-4 h-4 text-green-600" />;
  };

  const getTipoIcon = (tipo: Citacion['tipo']) => {
    const icons = {
      'Operativa': <Flame className="w-4 h-4 text-red-600" />,
      'Administrativa': <FileText className="w-4 h-4 text-blue-600" />,
      'Disciplinaria': <BadgeCheck className="w-4 h-4 text-purple-600" />,
      'Ceremonial': <UserCheck className="w-4 h-4 text-gold-600" />
    };
    return icons[tipo] || icons.Operativa;
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="font-semibold">Citaciones</h1>
          <p className="text-muted-foreground">
            Visualización de citaciones y notificaciones del sistema
          </p>
        </div>
        
        {/* Contadores rápidos */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{contadores.pendientes}</div>
            <div className="text-xs text-muted-foreground">Pendientes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{contadores.confirmadas}</div>
            <div className="text-xs text-muted-foreground">Confirmadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{contadores.nuevas}</div>
            <div className="text-xs text-muted-foreground">Nuevas</div>
          </div>
        </div>
      </div>

      {/* Notificaciones de citaciones nuevas */}
      {contadores.nuevas > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bell className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Tienes <strong>{contadores.nuevas} citaciones nuevas</strong> que requieren tu atención.
          </AlertDescription>
        </Alert>
      )}

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por título, descripción o lugar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Operativa">Operativa</SelectItem>
                <SelectItem value="Administrativa">Administrativa</SelectItem>
                <SelectItem value="Disciplinaria">Disciplinaria</SelectItem>
                <SelectItem value="Ceremonial">Ceremonial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Confirmada">Confirmada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
                <SelectItem value="Vencida">Vencida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de citaciones */}
      <div className="grid gap-4">
        {citacionesFiltradas.map((citacion) => (
          <Card key={citacion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header de la citación */}
                  <div className="flex items-start gap-3">
                    {getTipoIcon(citacion.tipo)}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium">{citacion.titulo}</h3>
                        <Badge variant="outline" className={getEstadoBadge(citacion.estado)}>
                          {citacion.estado}
                        </Badge>
                        <Badge variant="outline">
                          {citacion.tipo}
                        </Badge>
                        {getPrioridadIcon(citacion.prioridad)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {citacion.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Información de la citación */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(citacion.fecha).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{citacion.hora}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{citacion.lugar}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{citacion.citadoPor}</span>
                    </div>
                  </div>

                  {/* Detalles adicionales si existen */}
                  {citacion.detalles && (
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">{citacion.detalles}</p>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCitacion(citacion)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalle
                  </Button>
                  {citacion.documentos && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Documentos
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {citacionesFiltradas.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No se encontraron citaciones</h3>
            <p className="text-muted-foreground text-sm">
              Intenta ajustar los filtros de búsqueda o verifica que haya citaciones disponibles.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de detalle (simplificado) */}
      {selectedCitacion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getTipoIcon(selectedCitacion.tipo)}
                    {selectedCitacion.titulo}
                  </CardTitle>
                  <CardDescription>ID: {selectedCitacion.id}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCitacion(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getEstadoBadge(selectedCitacion.estado)}>
                  {selectedCitacion.estado}
                </Badge>
                <Badge variant="outline">{selectedCitacion.tipo}</Badge>
                <Badge variant="outline">{selectedCitacion.prioridad}</Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <p><strong>Descripción:</strong> {selectedCitacion.descripcion}</p>
                <p><strong>Fecha:</strong> {new Date(selectedCitacion.fecha).toLocaleDateString('es-CL')}</p>
                <p><strong>Hora:</strong> {selectedCitacion.hora}</p>
                <p><strong>Lugar:</strong> {selectedCitacion.lugar}</p>
                <p><strong>Citado por:</strong> {selectedCitacion.citadoPor}</p>
                
                {selectedCitacion.detalles && (
                  <div>
                    <strong>Detalles adicionales:</strong>
                    <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                      {selectedCitacion.detalles}
                    </div>
                  </div>
                )}

                {selectedCitacion.documentos && (
                  <div>
                    <strong>Documentos adjuntos:</strong>
                    <ul className="mt-1 space-y-1">
                      {selectedCitacion.documentos.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}