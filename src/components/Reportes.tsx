import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface ReportesProps {
  onNavigate: (page: string) => void;
}

export function Reportes({ onNavigate }: ReportesProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tipoReporte = searchParams.get('tipo') || 'general';
  const periodo = searchParams.get('periodo') || 'mensual';

  const handleGenerarReporte = (tipo: string) => {
    setSearchParams({ tipo, periodo });
    // Lógica para generar reporte específico
  };

  const handleCambioPeriodo = (nuevoPeriodo: string) => {
    setSearchParams({ tipo: tipoReporte, periodo: nuevoPeriodo });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">
            Análisis y reportes del sistema operativo
          </p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={periodo}
            onChange={(e) => handleCambioPeriodo(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-input text-foreground"
          >
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="trimestral">Trimestral</option>
            <option value="anual">Anual</option>
          </select>
        </div>
      </div>

      {/* Filtros y controles avanzados */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Filtros de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Reporte</label>
            <select 
              value={tipoReporte}
              onChange={(e) => handleGenerarReporte(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option value="general">General</option>
              <option value="asistencia">Asistencia</option>
              <option value="operativo">Operativo</option>
              <option value="disciplinario">Disciplinario</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Período</label>
            <select 
              value={periodo}
              onChange={(e) => handleCambioPeriodo(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option value="semanal">Última Semana</option>
              <option value="mensual">Último Mes</option>
              <option value="trimestral">Último Trimestre</option>
              <option value="anual">Último Año</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Formato</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards de reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 bg-card border rounded-lg transition-all ${
          tipoReporte === 'asistencia' ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}>
          <h3 className="font-semibold mb-2">Reporte de Asistencia</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Análisis de asistencia a citaciones por período ({periodo})
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">87.5%</div>
            <div className="text-sm text-muted-foreground">Promedio de asistencia</div>
          </div>
          <button 
            onClick={() => handleGenerarReporte('asistencia')}
            className="mt-4 text-primary hover:underline"
          >
            Generar Reporte
          </button>
        </div>

        <div className={`p-6 bg-card border rounded-lg transition-all ${
          tipoReporte === 'operativo' ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}>
          <h3 className="font-semibold mb-2">Estadísticas Operativas</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Métricas de actividad y rendimiento ({periodo})
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-secondary">42</div>
            <div className="text-sm text-muted-foreground">Citaciones emitidas</div>
          </div>
          <button 
            onClick={() => handleGenerarReporte('operativo')}
            className="mt-4 text-primary hover:underline"
          >
            Ver Estadísticas
          </button>
        </div>

        <div className={`p-6 bg-card border rounded-lg transition-all ${
          tipoReporte === 'personal' ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}>
          <h3 className="font-semibold mb-2">Reporte de Personal</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Análisis del personal activo y estructura ({periodo})
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-success">156</div>
            <div className="text-sm text-muted-foreground">Bomberos activos</div>
          </div>
          <button 
            onClick={() => handleGenerarReporte('personal')}
            className="mt-4 text-primary hover:underline"
          >
            Generar
          </button>
        </div>

        <div className={`p-6 bg-card border rounded-lg transition-all ${
          tipoReporte === 'disciplinario' ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}>
          <h3 className="font-semibold mb-2">Reporte Disciplinario</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Revisión de casos y resoluciones ({periodo})
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">Casos pendientes</div>
          </div>
          <button 
            onClick={() => handleGenerarReporte('disciplinario')}
            className="mt-4 text-primary hover:underline"
          >
            Revisar
          </button>
        </div>

        <div className={`p-6 bg-card border rounded-lg transition-all ${
          tipoReporte === 'general' ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}>
          <h3 className="font-semibold mb-2">Exportar Datos</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Exportar información en diferentes formatos
          </p>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Formatos disponibles:</div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-muted text-xs rounded">PDF</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">Excel</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">CSV</span>
            </div>
          </div>
          <button 
            onClick={() => handleGenerarReporte('general')}
            className="mt-4 text-primary hover:underline"
          >
            Exportar
          </button>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="font-semibold mb-2">Configuración de Reportes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Programar reportes automáticos y notificaciones
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-info">5</div>
            <div className="text-sm text-muted-foreground">Reportes programados</div>
          </div>
          <button className="mt-4 text-primary hover:underline">
            Configurar
          </button>
        </div>
      </div>

      {/* Mostrar detalles del reporte seleccionado */}
      {tipoReporte !== 'general' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">
            Detalles del Reporte: {tipoReporte.charAt(0).toUpperCase() + tipoReporte.slice(1)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Parámetros Actuales</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Tipo: {tipoReporte}</li>
                <li>• Período: {periodo}</li>
                <li>• Fecha de generación: {new Date().toLocaleDateString('es-CL')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Acciones Disponibles</h4>
              <div className="space-y-2">
                <button className="block w-full text-left px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  Generar Reporte Detallado
                </button>
                <button className="block w-full text-left px-3 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors">
                  Programar Reporte Automático
                </button>
                <button className="block w-full text-left px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                  Compartir Configuración
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}