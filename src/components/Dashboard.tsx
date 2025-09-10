/*
 * DASHBOARD ADMINISTRATIVO SIMPLIFICADO - SISTEMA BOMBEROS
 * =======================================================
 * 
 * Dashboard principal para usuarios administrativos
 * Métricas clave y acceso rápido a funcionalidades
 */

import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Flame,
  Phone,
  UserCircle,
  Truck,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { UserProfile } from '../utils/simpleAuth';

interface DashboardProps {
  onNavigate: (page: string) => void;
  userProfile: UserProfile;
}

// Métricas principales del dashboard
const metrics = [
  {
    title: 'Total Bomberos',
    value: '88',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Activos',
    value: '85',
    icon: UserCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'En Licencia',
    value: '3',
    icon: UserX,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    title: 'Citaciones Pendientes',
    value: '12',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

// Actividades recientes
const recentActivities = [
  {
    id: 1,
    type: 'citacion',
    title: 'Nueva citación operativa',
    description: 'Ejercicio práctico programado para el 15/01/2024',
    time: 'Hace 2 horas',
    priority: 'high'
  },
  {
    id: 2,
    type: 'personal',
    title: 'Nuevo bombero registrado',
    description: 'Pedro González se unió como Bombero Activo',
    time: 'Hace 4 horas',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'maquina',
    title: 'Mantenimiento completado',
    description: 'Carro B-2 listo para servicio',
    time: 'Hace 6 horas',
    priority: 'low'
  }
];

// Accesos rápidos
const quickActions = [
  { id: 'personal', label: 'Gestionar Personal', icon: Users, color: 'bg-blue-500' },
  { id: 'citaciones', label: 'Nueva Citación', icon: FileText, color: 'bg-green-500' },
  { id: 'maquinas', label: 'Estado Máquinas', icon: Truck, color: 'bg-orange-500' },
  { id: 'reportes', label: 'Generar Reporte', icon: BarChart3, color: 'bg-purple-500' }
];

export function Dashboard({ onNavigate, userProfile }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Bienvenido, {userProfile.nombre} {userProfile.apellidos} • {userProfile.rol}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Sistema Operativo
          </div>
          <Button 
            onClick={() => onNavigate('citaciones')}
            className="bg-primary hover:bg-primary/90"
          >
            <FileText className="w-4 h-4 mr-2" />
            Nueva Citación
          </Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Accesos Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Accesos Rápidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:shadow-md transition-shadow"
                  onClick={() => onNavigate(action.id)}
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'citacion' ? 'bg-orange-100 text-orange-600' :
                    activity.type === 'personal' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'citacion' ? <FileText className="h-4 w-4" /> :
                     activity.type === 'personal' ? <UserCircle className="h-4 w-4" /> :
                     <Truck className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <Badge 
                        variant={activity.priority === 'high' ? 'destructive' : 
                                activity.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.priority === 'high' ? 'Alta' : 
                         activity.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Asistencia Promedio</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Máquinas Operativas</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Citaciones Completadas</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium text-sm mb-3">Próximas Actividades</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Ejercicio Práctico - 15 Ene</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>Reunión Consejo - 20 Ene</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logo Institucional */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg">2ª Compañía de Bomberos</h3>
              <p className="text-muted-foreground">Viña del Mar • Fundada en 1884</p>
              <p className="text-sm italic text-primary mt-1">"Lealtad y Trabajo"</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">140 años</p>
                <p className="text-xs text-muted-foreground">de servicio</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}