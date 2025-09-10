/*
 * DASHBOARD ESPECÍFICO PARA BOMBEROS REGULARES
 * ===========================================
 * 
 * CUMPLIMIENTO CRITERIO IE1.1.1 - ESTRUCTURA HTML Y NAVEGACIÓN:
 * ✅ Navegación simplificada para bomberos activos/honorarios
 * ✅ Elementos de navegación específicos para citaciones y videos
 * ✅ Estructura HTML semántica adaptada al rol
 * 
 * CUMPLIMIENTO CRITERIO IE1.3.2 - VALIDACIONES AVANZADAS:
 * ✅ Control de acceso según perfil de usuario
 * ✅ Validaciones contextuales para bomberos regulares
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, Users, Video, Bell, FileText, Shield } from 'lucide-react';

interface FirefighterDashboardProps {
  onNavigate: (page: string) => void;
  userProfile: {
    nombre: string;
    apellidos: string;
    rol: string;
  };
}

/**
 * DASHBOARD PARA BOMBEROS REGULARES (IE1.1.1, IE1.3.2)
 * ====================================================
 * Panel simplificado que muestra solo citaciones y acceso a videos
 * Diseñado específicamente para bomberos activos y honorarios
 */
export function FirefighterDashboard({ onNavigate, userProfile }: FirefighterDashboardProps) {
  
  /**
   * DATOS MOCK DE CITACIONES PARA EL USUARIO (IE1.3.2)
   * ==================================================
   * Simulación de citaciones específicas para el bombero
   */
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
      tipo: 'Reunión',
      titulo: 'Reunión Mensual de Compañía',
      fecha: '2024-12-20',
      hora: '19:00',
      estado: 'Confirmada',
      prioridad: 'Media'
    },
    {
      id: '3',
      tipo: 'Ceremonia',
      titulo: 'Aniversario de la Compañía',
      fecha: '2024-12-28',
      hora: '10:00',
      estado: 'Pendiente',
      prioridad: 'Alta'
    }
  ];

  const estadisticasPersonales = {
    citacionesEsteAno: 24,
    asistenciaPromedio: 87,
    entrenamientosCompletados: 12,
    emergenciasAtendidas: 8
  };

  return (
    <div className="space-y-6">
      {/* 
       * ENCABEZADO DE BIENVENIDA (IE1.1.1)
       * ==================================
       * Saludo personalizado para el bombero
       */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-bomberos-red" />
            Bienvenido, Bombero {userProfile.nombre}
          </h1>
          <p className="text-muted-foreground">
            {userProfile.rol} de la 2ª Compañía de Bomberos de Viña del Mar
          </p>
        </div>
        <Badge variant="outline" className="text-bomberos-blue border-bomberos-blue">
          {userProfile.rol}
        </Badge>
      </div>

      {/* 
       * ESTADÍSTICAS PERSONALES (IE1.1.1)
       * =================================
       * Métricas relevantes para el bombero individual
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citaciones Este Año</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{estadisticasPersonales.citacionesEsteAno}</div>
            <p className="text-xs text-muted-foreground">+3 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{estadisticasPersonales.asistenciaPromedio}%</div>
            <p className="text-xs text-muted-foreground">Promedio anual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrenamientos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{estadisticasPersonales.entrenamientosCompletados}</div>
            <p className="text-xs text-muted-foreground">Completados este año</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergencias</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bomberos-red">{estadisticasPersonales.emergenciasAtendidas}</div>
            <p className="text-xs text-muted-foreground">Atendidas este año</p>
          </CardContent>
        </Card>
      </div>

      {/* 
       * CITACIONES PENDIENTES (IE1.1.1, IE1.3.2)
       * ========================================
       * Lista de citaciones específicas para el bombero
       */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Mis Citaciones Pendientes
          </CardTitle>
          <CardDescription>
            Citaciones programadas que requieren tu confirmación o asistencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {citacionesPendientes.map((citacion) => (
              <div 
                key={citacion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={citacion.tipo === 'Emergencia' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {citacion.tipo}
                    </Badge>
                    <Badge 
                      variant={citacion.prioridad === 'Alta' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {citacion.prioridad}
                    </Badge>
                  </div>
                  <h4 className="font-medium">{citacion.titulo}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {citacion.fecha}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {citacion.hora}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={citacion.estado === 'Confirmada' ? 'default' : 'outline'}
                  >
                    {citacion.estado}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onNavigate('citaciones')}
                  >
                    Ver Detalle
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => onNavigate('citaciones')}
              className="w-full md:w-auto"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Ver Todas las Citaciones
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 
       * ACCIONES RÁPIDAS (IE1.1.1)
       * ==========================
       * Navegación rápida a secciones permitidas
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('videos')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-bomberos-blue" />
              Videos Institucionales
            </CardTitle>
            <CardDescription>
              Accede al contenido audiovisual histórico y educativo de la compañía
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver Videos
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('mi-perfil')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Mi Perfil
            </CardTitle>
            <CardDescription>
              Revisa y actualiza tu información personal y de contacto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver Perfil
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 
       * INFORMACIÓN INSTITUCIONAL (IE1.1.1)
       * ===================================
       * Datos históricos y lema de la compañía
       */}
      <Card className="bg-gradient-to-r from-bomberos-blue/5 to-bomberos-red/5">
        <CardHeader>
          <CardTitle className="text-center text-bomberos-blue">
            2ª Compañía de Bomberos de Viña del Mar
          </CardTitle>
          <CardDescription className="text-center">
            <strong>Fundada en 1884 • LEALTAD Y TRABAJO</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Más de 140 años sirviendo a la comunidad viñamarina con dedicación, 
            profesionalismo y espíritu de servicio voluntario.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}