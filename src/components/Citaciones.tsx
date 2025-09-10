import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Flame,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { CitacionForm } from './CitacionForm';
import { UserProfile, isRegularFirefighter } from '../utils/userRoles';

// Datos mock de citaciones
const citacionesMock = [
  {
    id: 1,
    tipo: 'Academia',
    titulo: 'Entrenamiento de rescate vehicular - Academia mensual',
    descripcion: 'Práctica de técnicas de rescate en accidentes vehiculares y uso de herramientas hidráulicas',
    fecha: '2024-09-15',
    hora: '09:00',
    lugar: 'Patio de entrenamiento - 2ª Compañía',
    urgencia: 'normal',
    estado: 'enviada',
    fechaCreacion: '2024-09-09T10:00:00',
    createdBy: 'Capitán Carlos Silva',
    bomberosCitados: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    confirmaciones: [
      { bomberoId: 1, confirmado: true, fechaConfirmacion: '2024-09-09T10:15:00' },
      { bomberoId: 2, confirmado: true, fechaConfirmacion: '2024-09-09T10:20:00' },
      { bomberoId: 3, confirmado: true, fechaConfirmacion: '2024-09-09T10:25:00' },
      { bomberoId: 4, confirmado: true, fechaConfirmacion: '2024-09-09T10:30:00' },
      { bomberoId: 5, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 6, confirmado: true, fechaConfirmacion: '2024-09-09T11:00:00' },
      { bomberoId: 7, confirmado: true, fechaConfirmacion: '2024-09-09T11:05:00' },
      { bomberoId: 8, confirmado: true, fechaConfirmacion: '2024-09-09T11:10:00' },
      { bomberoId: 9, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 10, confirmado: true, fechaConfirmacion: '2024-09-09T11:20:00' },
      { bomberoId: 11, confirmado: true, fechaConfirmacion: '2024-09-09T11:25:00' },
      { bomberoId: 12, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 13, confirmado: true, fechaConfirmacion: '2024-09-09T11:35:00' },
      { bomberoId: 14, confirmado: true, fechaConfirmacion: '2024-09-09T11:40:00' },
      { bomberoId: 15, confirmado: true, fechaConfirmacion: '2024-09-09T11:45:00' },
      { bomberoId: 16, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 17, confirmado: true, fechaConfirmacion: '2024-09-09T12:00:00' },
      { bomberoId: 18, confirmado: true, fechaConfirmacion: '2024-09-09T12:05:00' },
      { bomberoId: 19, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 20, confirmado: true, fechaConfirmacion: '2024-09-09T12:15:00' }
    ]
  },
  {
    id: 2,
    tipo: 'Reunión de Consejeros de Disciplina',
    titulo: 'Reunión mensual del Consejo de Disciplina',
    descripcion: 'Revisión de casos disciplinarios pendientes y evaluación de procedimientos internos',
    fecha: '2024-09-12',
    hora: '19:30',
    lugar: 'Sala de Reuniones - 2ª Compañía',
    urgencia: 'normal',
    estado: 'enviada',
    fechaCreacion: '2024-09-08T16:00:00',
    createdBy: 'Director Ana Vargas',
    bomberosCitados: [9, 10, 11, 12, 13, 14, 15, 16],
    confirmaciones: [
      { bomberoId: 9, confirmado: true, fechaConfirmacion: '2024-09-08T16:30:00' },
      { bomberoId: 10, confirmado: true, fechaConfirmacion: '2024-09-08T17:00:00' },
      { bomberoId: 11, confirmado: true, fechaConfirmacion: '2024-09-08T17:15:00' },
      { bomberoId: 12, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 13, confirmado: true, fechaConfirmacion: '2024-09-08T18:00:00' },
      { bomberoId: 14, confirmado: true, fechaConfirmacion: '2024-09-08T18:15:00' },
      { bomberoId: 15, confirmado: false, fechaConfirmacion: null },
      { bomberoId: 16, confirmado: true, fechaConfirmacion: '2024-09-08T19:00:00' }
    ]
  },
  {
    id: 3,
    tipo: 'Reunión Ordinaria',
    titulo: 'Asamblea General Ordinaria - Septiembre 2024',
    descripcion: 'Reunión mensual ordinaria para tratar temas administrativos, operativos y planificación de actividades',
    fecha: '2024-09-20',
    hora: '20:00',
    lugar: 'Salón Principal - 2ª Compañía',
    urgencia: 'normal',
    estado: 'borrador',
    fechaCreacion: '2024-09-07T14:00:00',
    createdBy: 'Capitán Carlos Silva',
    bomberosCitados: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    confirmaciones: []
  }
];

// Datos mock de bomberos para mostrar nombres (consistente con CitacionForm)
const bomberosMock = {
  1: { nombre: 'Carlos Eduardo Silva Mendoza', rango: 'Capitán' },
  2: { nombre: 'Patricia Alejandra Morales Vega', rango: 'Teniente Primero' },
  3: { nombre: 'Juan Carlos Pérez González', rango: 'Teniente Segundo' },
  4: { nombre: 'María Elena Rodríguez Soto', rango: 'Teniente Tercero' },
  5: { nombre: 'Roberto Antonio López Herrera', rango: 'Ayudante' },
  6: { nombre: 'Ana Patricia Vargas Luna', rango: 'Director' },
  7: { nombre: 'Miguel Ángel Castillo Muñoz', rango: 'Tesorero' },
  8: { nombre: 'Carmen Gloria Jiménez Parra', rango: 'Secretario' },
  9: { nombre: 'Francisco Javier Torres Ramos', rango: 'Consejero de Disciplina' },
  10: { nombre: 'Lorena Isabel Contreras Silva', rango: 'Consejero de Disciplina' },
  11: { nombre: 'Diego Alejandro Espinoza Rojas', rango: 'Consejero de Disciplina' },
  12: { nombre: 'Claudia Andrea Bustos Martínez', rango: 'Consejero de Disciplina' },
  13: { nombre: 'Andrés Felipe Guzmán Vidal', rango: 'Consejero de Disciplina' },
  14: { nombre: 'Paola Cristina Muñoz Salinas', rango: 'Consejero de Disciplina' },
  15: { nombre: 'Sergio Esteban Navarro Peña', rango: 'Consejero de Disciplina' },
  16: { nombre: 'Valentina María Carrasco Díaz', rango: 'Consejero de Disciplina' },
  17: { nombre: 'Fernando José Bravo Ulloa', rango: 'Bombero Activo' },
  18: { nombre: 'Katherine Soledad Vega Campos', rango: 'Bombero Activo' },
  19: { nombre: 'Nicolás Eduardo Poblete Sáez', rango: 'Bombero Activo' },
  20: { nombre: 'Alejandra Beatriz Flores Aguilar', rango: 'Bombero Activo' }
};

interface CitacionesProps {
  onNavigate: (page: string) => void;
  userProfile?: UserProfile; // Opcional para mantener compatibilidad
}

export function Citaciones({ onNavigate, userProfile }: CitacionesProps) {
  const [citaciones, setCitaciones] = useState(citacionesMock);
  const [showForm, setShowForm] = useState(false);
  const [selectedCitacion, setSelectedCitacion] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('pendientes');

  const handleSaveCitacion = (citacionData: any) => {
    if (selectedCitacion) {
      // Editar citación existente
      setCitaciones(prev => prev.map(c => 
        c.id === selectedCitacion.id ? { ...citacionData, id: selectedCitacion.id } : c
      ));
    } else {
      // Crear nueva citación
      const newCitacion = {
        ...citacionData,
        id: Math.max(...citaciones.map(c => c.id)) + 1,
        fechaCreacion: new Date().toISOString(),
        createdBy: 'Comandante J. Pérez',
        confirmaciones: []
      };
      setCitaciones(prev => [...prev, newCitacion]);
    }
    setShowForm(false);
    setSelectedCitacion(null);
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Reunión Ordinaria': return 'bg-blue-100 text-blue-800';
      case 'Reunión Extraordinaria': return 'bg-orange-100 text-orange-800';
      case 'Academia': return 'bg-green-100 text-green-800';
      case 'Ceremonia': return 'bg-purple-100 text-purple-800';
      case 'Citación de Comandancia': return 'bg-red-100 text-red-800';
      case 'Citación a Consejo de Disciplina': return 'bg-yellow-100 text-yellow-800';
      case 'Reunión de Consejeros de Disciplina': return 'bg-amber-100 text-amber-800';
      case 'Personalizada': return 'bg-gray-100 text-gray-800';
      // Tipos antiguos para compatibilidad
      case 'Emergencia': return 'bg-red-100 text-red-800';
      case 'Entrenamiento': return 'bg-green-100 text-green-800';
      case 'Reunión': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'enviada': return 'bg-green-100 text-green-800';
      case 'borrador': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Reunión Ordinaria': return FileText;
      case 'Reunión Extraordinaria': return AlertTriangle;
      case 'Academia': return Users;
      case 'Ceremonia': return Calendar;
      case 'Citación de Comandancia': return Flame;
      case 'Citación a Consejo de Disciplina': return UserCheck;
      case 'Reunión de Consejeros de Disciplina': return UserCheck;
      case 'Personalizada': return FileText;
      // Tipos antiguos para compatibilidad
      case 'Emergencia': return Flame;
      case 'Entrenamiento': return Users;
      case 'Reunión': return FileText;
      default: return FileText;
    }
  };

  const calcularConfirmaciones = (citacion: any) => {
    const confirmados = citacion.confirmaciones.filter((c: any) => c.confirmado).length;
    const pendientes = citacion.bomberosCitados.length - citacion.confirmaciones.length;
    const rechazados = citacion.confirmaciones.filter((c: any) => !c.confirmado).length;
    
    return { confirmados, pendientes, rechazados, total: citacion.bomberosCitados.length };
  };

  const citacionesPendientes = citaciones.filter(c => c.estado === 'enviada');
  const citacionesBorrador = citaciones.filter(c => c.estado === 'borrador');
  const citacionesHistorial = citaciones.filter(c => c.estado === 'enviada');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Sistema de Citaciones</h1>
          <p className="text-muted-foreground">
            {userProfile && isRegularFirefighter(userProfile.rol) 
              ? "Revisa tus citaciones y confirma tu asistencia"
              : "Gestione las citaciones y notificaciones para el personal"
            }
          </p>
        </div>
        {/* CONTROL DE ACCESO: Solo mostrar botón "Nueva Citación" si NO es bombero regular */}
        {userProfile && !isRegularFirefighter(userProfile.rol) && (
          <Button 
            onClick={() => {
              setSelectedCitacion(null);
              setShowForm(true);
            }}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Citación
          </Button>
        )}
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Citaciones Urgentes</p>
                <p className="text-2xl font-semibold text-foreground">
                  {citaciones.filter(c => c.urgencia === 'alta' && c.estado === 'enviada').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-semibold text-foreground">
                  {citacionesPendientes.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Borradores</p>
                <p className="text-2xl font-semibold text-foreground">
                  {citacionesBorrador.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enviadas Hoy</p>
                <p className="text-2xl font-semibold text-foreground">
                  {citaciones.filter(c => 
                    c.fechaCreacion.startsWith(new Date().toISOString().split('T')[0]) && 
                    c.estado === 'enviada'
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas de contenido */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendientes">
            Pendientes ({citacionesPendientes.length})
          </TabsTrigger>
          <TabsTrigger value="borradores">
            Borradores ({citacionesBorrador.length})
          </TabsTrigger>
          <TabsTrigger value="historial">
            Historial ({citacionesHistorial.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes" className="space-y-4">
          {citacionesPendientes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay citaciones pendientes</p>
              </CardContent>
            </Card>
          ) : (
            citacionesPendientes.map((citacion) => {
              const stats = calcularConfirmaciones(citacion);
              const TipoIcon = getTipoIcon(citacion.tipo);
              
              return (
                <Card key={citacion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getTipoColor(citacion.tipo)}`}>
                            <TipoIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{citacion.titulo}</h3>
                            <p className="text-sm text-muted-foreground">{citacion.descripcion}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getUrgenciaColor(citacion.urgencia)}>
                            {citacion.urgencia === 'alta' ? 'URGENTE' : 
                             citacion.urgencia === 'media' ? 'Media' : 'Normal'}
                          </Badge>
                          <Badge className={getEstadoColor(citacion.estado)}>
                            {citacion.estado}
                          </Badge>
                        </div>
                      </div>

                      {/* Detalles */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(citacion.fecha).toLocaleDateString('es-CL')} a las {citacion.hora}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{citacion.lugar}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{stats.total} bomberos citados</span>
                        </div>
                      </div>

                      {/* Confirmaciones */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Estado de Confirmaciones</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">
                              <span className="font-medium text-green-600">{stats.confirmados}</span> confirmadas
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">
                              <span className="font-medium text-yellow-600">{stats.pendientes}</span> pendientes
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm">
                              <span className="font-medium text-red-600">{stats.rechazados}</span> rechazadas
                            </span>
                          </div>
                        </div>

                        {/* Lista de bomberos citados */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Bomberos citados:</p>
                          <div className="space-y-1">
                            {citacion.bomberosCitados.map((bomberoId: number) => {
                              const bombero = bomberosMock[bomberoId as keyof typeof bomberosMock];
                              const confirmacion = citacion.confirmaciones.find((c: any) => c.bomberoId === bomberoId);
                              
                              return (
                                <div key={bomberoId} className="flex items-center justify-between p-2 bg-background rounded border">
                                  <div className="flex items-center gap-2">
                                    <UserCheck className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{bombero?.nombre} - {bombero?.rango}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {confirmacion ? (
                                      confirmacion.confirmado ? (
                                        <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
                                      ) : (
                                        <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
                                      )
                                    ) : (
                                      <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Creada por {citacion.createdBy} - {new Date(citacion.fechaCreacion).toLocaleDateString('es-CL')}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          {/* CONTROL DE ACCESO: Solo mostrar botón "Reenviar" si NO es bombero regular */}
                          {userProfile && !isRegularFirefighter(userProfile.rol) && (
                            <Button variant="outline" size="sm">
                              Reenviar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="borradores" className="space-y-4">
          {citacionesBorrador.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay borradores guardados</p>
              </CardContent>
            </Card>
          ) : (
            citacionesBorrador.map((citacion) => (
              <Card key={citacion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTipoColor(citacion.tipo)}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{citacion.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(citacion.fecha).toLocaleDateString('es-CL')} a las {citacion.hora}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getEstadoColor(citacion.estado)}>Borrador</Badge>
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button size="sm">Enviar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Citaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {citacionesHistorial.map((citacion) => {
                  const stats = calcularConfirmaciones(citacion);
                  
                  return (
                    <div key={citacion.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={getTipoColor(citacion.tipo)}>
                          {citacion.tipo}
                        </Badge>
                        <div>
                          <p className="font-medium">{citacion.titulo}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(citacion.fecha).toLocaleDateString('es-CL')} - {stats.confirmados}/{stats.total} confirmaciones
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo del formulario */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCitacion ? 'Editar Citación' : 'Nueva Citación'}
            </DialogTitle>
            <DialogDescription>
              {selectedCitacion 
                ? 'Modifique los detalles de la citación existente y guarde los cambios.'
                : 'Complete el formulario paso a paso para crear una nueva citación para el personal de bomberos.'}
            </DialogDescription>
          </DialogHeader>
          <CitacionForm
            citacion={selectedCitacion}
            onSave={handleSaveCitacion}
            onCancel={() => {
              setShowForm(false);
              setSelectedCitacion(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}