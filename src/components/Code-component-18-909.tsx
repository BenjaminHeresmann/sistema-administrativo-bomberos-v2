/*
 * MÓDULO DE GESTIÓN DE MÁQUINAS - SISTEMA BOMBEROS
 * ===============================================
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * ✅ Visualización de carros de bomberos con detalles completos
 * ✅ Gestión de patentes, herramientas y equipamiento
 * ✅ Control de mantenciones programadas y vencidas
 * ✅ Historial de emergencias por máquina
 * ✅ Sistema de comentarios y eventos
 * ✅ Filtros avanzados por estado, tipo y disponibilidad
 * ✅ Dashboard de métricas de flota
 * 
 * CONTROL DE ACCESO:
 * - Director: Acceso completo
 * - Capitán: Acceso completo
 * - Tenientes: Acceso completo
 * - Ayudante: Acceso completo
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; 
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Truck,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Shield,
  Activity,
  Plus,
  Search,
  Filter,
  MessageSquare,
  History,
  MapPin,
  Users,
  FileText,
  Settings
} from 'lucide-react';

// Tipos de datos para máquinas
interface Maquina {
  id: number;
  codigo: string;
  tipo: 'Bomba' | 'Escalera' | 'Rescate' | 'Apoyo' | 'Ambulancia';
  patente: string;
  marca: string;
  modelo: string;
  año: number;
  estado: 'Operativa' | 'Mantención' | 'Reparación' | 'Baja';
  disponibilidad: 'Disponible' | 'En Servicio' | 'Fuera de Servicio';
  ubicacion: string;
  ultimaMantencion: string;
  proximaMantencion: string;
  kilometraje: number;
  horasMotor: number;
  combustible: number; // Porcentaje
  capacidadAgua: number; // Litros
  equipamiento: string[];
  responsable: string;
  comentarios: Comentario[];
  historialEmergencias: EmergenciaHistorial[];
}

interface Comentario {
  id: number;
  fecha: string;
  autor: string;
  tipo: 'Mantenimiento' | 'Incidente' | 'Observación' | 'Reparación';
  comentario: string;
}

interface EmergenciaHistorial {
  id: number;
  fecha: string;
  tipo: string;
  direccion: string;
  duracion: string;
  combustibleConsumido: number;
  observaciones: string;
}

interface MaquinasProps {
  onNavigate: (page: string) => void;
}

// Datos mock para demostración
const maquinasMock: Maquina[] = [
  {
    id: 1,
    codigo: 'B-101',
    tipo: 'Bomba',
    patente: 'BCVD-12',
    marca: 'Mercedes-Benz',
    modelo: 'Atego 1729',
    año: 2018,
    estado: 'Operativa',
    disponibilidad: 'Disponible',
    ubicacion: 'Cuartel Central',
    ultimaMantencion: '2024-12-01',
    proximaMantencion: '2025-03-01',
    kilometraje: 45678,
    horasMotor: 1250,
    combustible: 85,
    capacidadAgua: 3000,
    equipamiento: [
      'Bomba de alta presión 1200 GPM',
      'Mangueras de 2.5" x 50m (4 unidades)',
      'Mangueras de 1.5" x 30m (6 unidades)',
      'Escalera de techo 7m',
      'Herramientas de corte y rescate',
      'Equipo de respiración autónoma (6 unidades)',
      'Generador eléctrico 5KW'
    ],
    responsable: 'Teniente Primero Roberto Mendoza',
    comentarios: [
      {
        id: 1,
        fecha: '2024-12-15',
        autor: 'Teniente Segundo Patricia Vega',
        tipo: 'Observación',
        comentario: 'Revisión de rutina completada. Presión de bomba óptima.'
      },
      {
        id: 2,
        fecha: '2024-12-10',
        autor: 'Mecánico Carlos Silva',
        tipo: 'Mantenimiento',
        comentario: 'Cambio de aceite y filtros. Próxima revisión en 3 meses.'
      }
    ],
    historialEmergencias: [
      {
        id: 1,
        fecha: '2024-12-14',
        tipo: 'Incendio Estructural',
        direccion: 'Av. Libertad 1250, Viña del Mar',
        duracion: '2h 30min',
        combustibleConsumido: 45,
        observaciones: 'Incendio en casa habitación. Rescate exitoso de 3 personas.'
      },
      {
        id: 2,
        fecha: '2024-12-12',
        tipo: 'Incendio Forestal',
        direccion: 'Camino a Quintero Km 15',
        duracion: '4h 15min',
        combustibleConsumido: 78,
        observaciones: 'Apoyo a otras compañías. Trabajo conjunto exitoso.'
      }
    ]
  },
  {
    id: 2,
    codigo: 'E-201',
    tipo: 'Escalera',
    patente: 'ECVD-25',
    marca: 'Volvo',
    modelo: 'FH16 750',
    año: 2020,
    estado: 'Mantención',
    disponibilidad: 'Fuera de Servicio',
    ubicacion: 'Taller Externo',
    ultimaMantencion: '2024-11-15',
    proximaMantencion: '2025-01-15',
    kilometraje: 28450,
    horasMotor: 890,
    combustible: 65,
    capacidadAgua: 1500,
    equipamiento: [
      'Escalera telescópica 32m',
      'Canastillo de rescate',
      'Bomba secundaria 800 GPM',
      'Mangueras especiales altura',
      'Equipo de rescate en altura',
      'Sistema de iluminación LED'
    ],
    responsable: 'Capitán María Elena González',
    comentarios: [
      {
        id: 3,
        fecha: '2024-12-14',
        autor: 'Capitán María Elena González',
        tipo: 'Reparación',
        comentario: 'En taller para revisión sistema hidráulico escalera. Estimado 5 días.'
      }
    ],
    historialEmergencias: [
      {
        id: 3,
        fecha: '2024-12-08',
        tipo: 'Rescate en Altura',
        direccion: 'Edificio Las Torres, piso 12',
        duracion: '1h 45min',
        combustibleConsumido: 25,
        observaciones: 'Rescate de persona en balcón. Operación exitosa.'
      }
    ]
  },
  {
    id: 3,
    codigo: 'R-301',
    tipo: 'Rescate',
    patente: 'RCVD-18',
    marca: 'Scania',
    modelo: 'P320',
    año: 2019,
    estado: 'Operativa',
    disponibilidad: 'En Servicio',
    ubicacion: 'En Emergencia - Sector Norte',
    ultimaMantencion: '2024-12-05',
    proximaMantencion: '2025-02-05',
    kilometraje: 52300,
    horasMotor: 1580,
    combustible: 40,
    capacidadAgua: 800,
    equipamiento: [
      'Herramientas hidráulicas Holmatro',
      'Equipo de corte y soldadura',
      'Camillas y equipo médico básico',
      'Cuerdas y arneses de rescate',
      'Generador diésel 10KW',
      'Sistema de iluminación portátil'
    ],
    responsable: 'Teniente Tercero Miguel Herrera',
    comentarios: [
      {
        id: 4,
        fecha: '2024-12-15',
        autor: 'Bombero Juan Pérez',
        tipo: 'Observación',
        comentario: 'Equipo hidráulico funcionando perfectamente en último rescate.'
      }
    ],
    historialEmergencias: [
      {
        id: 4,
        fecha: '2024-12-15',
        tipo: 'Accidente de Tránsito',
        direccion: 'Ruta 68 Km 120',
        duracion: '3h 20min',
        combustibleConsumido: 55,
        observaciones: 'Rescate vehicular complejo. 2 personas liberadas exitosamente.'
      }
    ]
  }
];

export function Maquinas({ onNavigate }: MaquinasProps) {
  const [selectedMaquina, setSelectedMaquina] = useState<Maquina | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState({
    tipo: 'Observación' as 'Mantenimiento' | 'Incidente' | 'Observación' | 'Reparación',
    comentario: ''
  });

  // Filtrar máquinas
  const maquinasFiltradas = maquinasMock.filter(maquina => {
    const matchSearch = maquina.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       maquina.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       maquina.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || maquina.tipo === filtroTipo;
    const matchEstado = filtroEstado === 'todos' || maquina.estado === filtroEstado;
    
    return matchSearch && matchTipo && matchEstado;
  });

  // Calcular métricas de flota
  const metricas = {
    total: maquinasMock.length,
    operativas: maquinasMock.filter(m => m.estado === 'Operativa').length,
    enMantencion: maquinasMock.filter(m => m.estado === 'Mantención').length,
    disponibles: maquinasMock.filter(m => m.disponibilidad === 'Disponible').length,
    mantencionVencida: maquinasMock.filter(m => new Date(m.proximaMantencion) < new Date()).length
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Operativa': return 'bg-green-100 text-green-800';
      case 'Mantención': return 'bg-yellow-100 text-yellow-800';
      case 'Reparación': return 'bg-red-100 text-red-800';
      case 'Baja': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisponibilidadColor = (disponibilidad: string) => {
    switch (disponibilidad) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Servicio': return 'bg-blue-100 text-blue-800';
      case 'Fuera de Servicio': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Bomba': return <Truck className="w-6 h-6 text-red-600" />;
      case 'Escalera': return <Activity className="w-6 h-6 text-blue-600" />;
      case 'Rescate': return <Shield className="w-6 h-6 text-orange-600" />;
      case 'Apoyo': return <Settings className="w-6 h-6 text-gray-600" />;
      case 'Ambulancia': return <Plus className="w-6 h-6 text-green-600" />;
      default: return <Truck className="w-6 h-6 text-gray-600" />;
    }
  };

  const handleAddComment = () => {
    if (selectedMaquina && newComment.comentario.trim()) {
      // En un sistema real, esto se enviaría al backend
      console.log('Nuevo comentario:', {
        maquinaId: selectedMaquina.id,
        ...newComment,
        fecha: new Date().toISOString().split('T')[0],
        autor: 'Usuario Actual'
      });
      
      // Limpiar formulario
      setNewComment({ tipo: 'Observación', comentario: '' });
      setShowCommentForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestión de Máquinas</h1>
          <p className="text-muted-foreground">
            Control y seguimiento de la flota de vehículos de emergencia
          </p>
        </div>
        <Button onClick={() => console.log('Agregar nueva máquina')}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Máquina
        </Button>
      </div>

      {/* Métricas de Flota */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Flota</p>
                <p className="text-2xl font-semibold">{metricas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Operativas</p>
                <p className="text-2xl font-semibold text-green-600">{metricas.operativas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">En Mantención</p>
                <p className="text-2xl font-semibold text-yellow-600">{metricas.enMantencion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <p className="text-2xl font-semibold text-blue-600">{metricas.disponibles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Mantención Vencida</p>
                <p className="text-2xl font-semibold text-red-600">{metricas.mantencionVencida}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar máquina</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Código, patente o marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="filtro-tipo">Tipo</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger id="filtro-tipo" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Bomba">Bomba</SelectItem>
                  <SelectItem value="Escalera">Escalera</SelectItem>
                  <SelectItem value="Rescate">Rescate</SelectItem>
                  <SelectItem value="Apoyo">Apoyo</SelectItem>
                  <SelectItem value="Ambulancia">Ambulancia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filtro-estado">Estado</Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger id="filtro-estado" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Operativa">Operativa</SelectItem>
                  <SelectItem value="Mantención">Mantención</SelectItem>
                  <SelectItem value="Reparación">Reparación</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Máquinas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {maquinasFiltradas.map((maquina) => (
          <Card key={maquina.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTipoIcon(maquina.tipo)}
                  <div>
                    <CardTitle className="text-lg">{maquina.codigo}</CardTitle>
                    <CardDescription>{maquina.patente}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getEstadoColor(maquina.estado)}>
                    {maquina.estado}
                  </Badge>
                  <Badge className={getDisponibilidadColor(maquina.disponibilidad)}>
                    {maquina.disponibilidad}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Marca/Modelo</p>
                  <p className="font-medium">{maquina.marca} {maquina.modelo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Año</p>
                  <p className="font-medium">{maquina.año}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kilometraje</p>
                  <p className="font-medium">{maquina.kilometraje.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Combustible</p>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{maquina.combustible}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{maquina.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Próx. mantención: {new Date(maquina.proximaMantencion).toLocaleDateString('es-CL')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{maquina.responsable}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedMaquina(maquina);
                    setShowDetails(true);
                  }}
                >
                  Ver Detalles
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedMaquina(maquina);
                    setShowCommentForm(true);
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalles de Máquina */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMaquina && getTipoIcon(selectedMaquina.tipo)}
              {selectedMaquina?.codigo} - {selectedMaquina?.patente}
            </DialogTitle>
            <DialogDescription>
              Información detallada de la máquina y su historial
            </DialogDescription>
          </DialogHeader>

          {selectedMaquina && (
            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="equipamiento">Equipamiento</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
                <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información Básica</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tipo</p>
                          <p className="font-medium">{selectedMaquina.tipo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estado</p>
                          <Badge className={getEstadoColor(selectedMaquina.estado)}>
                            {selectedMaquina.estado}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Marca</p>
                          <p className="font-medium">{selectedMaquina.marca}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Modelo</p>
                          <p className="font-medium">{selectedMaquina.modelo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Año</p>
                          <p className="font-medium">{selectedMaquina.año}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Capacidad Agua</p>
                          <p className="font-medium">{selectedMaquina.capacidadAgua}L</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estado Operacional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground text-sm">Disponibilidad</p>
                          <Badge className={getDisponibilidadColor(selectedMaquina.disponibilidad)}>
                            {selectedMaquina.disponibilidad}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Ubicación Actual</p>
                          <p className="font-medium">{selectedMaquina.ubicacion}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Responsable</p>
                          <p className="font-medium">{selectedMaquina.responsable}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Kilometraje</p>
                          <p className="font-medium">{selectedMaquina.kilometraje.toLocaleString()} km</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Horas Motor</p>
                          <p className="font-medium">{selectedMaquina.horasMotor.toLocaleString()} hrs</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Combustible</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${selectedMaquina.combustible}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{selectedMaquina.combustible}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Programa de Mantención</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-sm">Última Mantención</p>
                        <p className="font-medium">{new Date(selectedMaquina.ultimaMantencion).toLocaleDateString('es-CL')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Próxima Mantención</p>
                        <p className="font-medium">{new Date(selectedMaquina.proximaMantencion).toLocaleDateString('es-CL')}</p>
                        {new Date(selectedMaquina.proximaMantencion) < new Date() && (
                          <Badge className="bg-red-100 text-red-800 mt-1">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Vencida
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipamiento" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Equipamiento y Herramientas</CardTitle>
                    <CardDescription>
                      Lista completa del equipamiento instalado en la máquina
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {selectedMaquina.equipamiento.map((equipo, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border border-border rounded">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{equipo}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historial de Emergencias</CardTitle>
                    <CardDescription>
                      Registro de participación en emergencias y consumo de recursos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedMaquina.historialEmergencias.map((emergencia) => (
                        <div key={emergencia.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{emergencia.tipo}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(emergencia.fecha).toLocaleDateString('es-CL')}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Dirección</p>
                              <p className="font-medium">{emergencia.direccion}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duración</p>
                              <p className="font-medium">{emergencia.duracion}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Combustible Consumido</p>
                              <p className="font-medium">{emergencia.combustibleConsumido}L</p>
                            </div>
                          </div>
                          {emergencia.observaciones && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-muted-foreground text-sm">Observaciones:</p>
                              <p className="text-sm">{emergencia.observaciones}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comentarios" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Comentarios y Observaciones</CardTitle>
                    <CardDescription>
                      Historial de comentarios, mantenciones e incidentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedMaquina.comentarios.map((comentario) => (
                        <div key={comentario.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {comentario.autor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comentario.autor}</span>
                                <Badge variant="outline" className="text-xs">
                                  {comentario.tipo}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comentario.fecha).toLocaleDateString('es-CL')}
                                </span>
                              </div>
                              <p className="text-sm">{comentario.comentario}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para Agregar Comentario */}
      <Dialog open={showCommentForm} onOpenChange={setShowCommentForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Comentario</DialogTitle>
            <DialogDescription>
              Agregar una observación, incidente o nota de mantenimiento para {selectedMaquina?.codigo}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tipo-comentario">Tipo de Comentario</Label>
              <Select 
                value={newComment.tipo} 
                onValueChange={(value: any) => setNewComment(prev => ({ ...prev, tipo: value }))}
              >
                <SelectTrigger id="tipo-comentario">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Observación">Observación</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="Incidente">Incidente</SelectItem>
                  <SelectItem value="Reparación">Reparación</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comentario">Comentario</Label>
              <Textarea
                id="comentario"
                placeholder="Describe la observación, incidente o trabajo realizado..."
                rows={4}
                value={newComment.comentario}
                onChange={(e) => setNewComment(prev => ({ ...prev, comentario: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleAddComment}
                disabled={!newComment.comentario.trim()}
              >
                Guardar Comentario
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCommentForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}