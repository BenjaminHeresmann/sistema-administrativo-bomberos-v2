/*
 * DASHBOARD PARA BOMBEROS REGULARES - SIMPLIFICADO
 * ===============================================
 * 
 * Panel específico para bomberos activos y honorarios
 * Enfoque en citaciones y contenido multimedia
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, Users, Video, Bell, FileText, Shield, Flame } from 'lucide-react';
import { UserProfile } from '../utils/simpleAuth';

interface FirefighterDashboardProps {
  onNavigate: (page: string) => void;
  userProfile: UserProfile;
}

// Datos mock de citaciones para el usuario
const citacionesPendientes = [
  {
    id: '1',
    tipo: 'Entrenamiento',
    titulo: 'Práctica de Rescate Vehicular',
    fecha: '2024-12-15',
    hora: '14:00',
    estado: 'Pendiente',
    prioridad: 'Alta'
  },
  {
    id: '2',
    tipo: 'Administrativo',
    titulo: 'Reunión Informativa',
    fecha: '2024-12-18',
    hora: '19:30',
    estado: 'Confirmado',
    prioridad: 'Media'
  },
  {
    id: '3',
    tipo: 'Operativo',
    titulo: 'Ejercicio de Coordinación',
    fecha: '2024-12-20',
    hora: '10:00',
    estado: 'Nuevo',
    prioridad: 'Alta'
  }
];

// Videos destacados
const videosDestacados = [
  {
    id: '1',
    titulo: 'Historia de la 2ª Compañía',
    duracion: '12:30',
    categoria: 'Institucional'
  },
  {
    id: '2',
    titulo: 'Técnicas de Rescate Básico',
    duracion: '8:45',
    categoria: 'Educativo'
  },
  {
    id: '3',
    titulo: 'Ceremonia Aniversario 2023',
    duracion: '25:15',
    categoria: 'Ceremonial'
  }
];

export function FirefighterDashboard({ onNavigate, userProfile }: FirefighterDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portal del Bombero</h1>
          <p className="text-muted-foreground">
            Bienvenido, {userProfile.nombre} {userProfile.apellidos} • {userProfile.rol}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            En Servicio Activo
          </div>
        </div>
      </div>

      {/* Resumen de Estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Citaciones Pendientes</p>
                <p className="text-2xl font-bold text-primary">
                  {citacionesPendientes.filter(c => c.estado === 'Pendiente' || c.estado === 'Nuevo').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/20">
                <Bell className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Asistencia del Mes</p>
                <p className="text-2xl font-bold text-green-600">92%</p>
              </div>
              <div className="p-3 rounded-full bg-green-500/20">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Videos Disponibles</p>
                <p className="text-2xl font-bold text-orange-600">{videosDestacados.length}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500/20">
                <Video className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Principales */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Mis Citaciones
            </CardTitle>
            <CardDescription>
              Mantente al día con tus citaciones y actividades programadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {citacionesPendientes.slice(0, 2).map((citacion) => (
                <div key={citacion.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{citacion.titulo}</h4>
                      <Badge 
                        variant={citacion.prioridad === 'Alta' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {citacion.prioridad}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{citacion.tipo}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{citacion.fecha}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{citacion.hora}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={citacion.estado === 'Confirmado' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {citacion.estado}
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => onNavigate('citaciones-view')}
              className="w-full"
            >
              Ver Todas las Citaciones
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Videos Institucionales
            </CardTitle>
            <CardDescription>
              Contenido educativo, histórico y ceremonial de la compañía
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {videosDestacados.slice(0, 2).map((video) => (
                <div key={video.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{video.titulo}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{video.duracion}</span>
                      <Badge variant="outline" className="text-xs">
                        {video.categoria}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => onNavigate('videos')}
              variant="outline"
              className="w-full"
            >
              Ver Biblioteca de Videos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Actividades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximas Actividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {citacionesPendientes.map((citacion) => (
              <div key={citacion.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {citacion.tipo}
                  </Badge>
                  <Badge 
                    variant={citacion.prioridad === 'Alta' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {citacion.prioridad}
                  </Badge>
                </div>
                <h4 className="font-medium mb-2">{citacion.titulo}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{citacion.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{citacion.hora}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logo y Mensaje Institucional */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg">2ª Compañía de Bomberos</h3>
              <p className="text-muted-foreground">Viña del Mar • Desde 1884</p>
              <p className="text-sm italic text-primary mt-1">"Lealtad y Trabajo"</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Orgulloso de servir</p>
                <p className="text-xs text-muted-foreground">140 años de historia</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}