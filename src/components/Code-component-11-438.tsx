import React from 'react';
import { Play, Calendar, Clock, Users, Award, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface VideoInstitucionalProps {
  onNavigate: (page: string) => void;
}

export function VideosInstitucionales({ onNavigate }: VideoInstitucionalProps) {
  const videosInstitucionales = [
    {
      id: 1,
      titulo: "Historia de la 2ª Compañía - Fundación 1884",
      descripcion: "Conoce la rica historia de nuestra compañía desde sus inicios en 1884, sus fundadores y el legado que continuamos construyendo.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "15:30",
      categoria: "Historia",
      fechaPublicacion: "2024-01-15",
      visualizaciones: "1,254"
    },
    {
      id: 2,
      titulo: "Lema Institucional: LEALTAD Y TRABAJO",
      descripcion: "Documental sobre nuestros valores fundamentales y cómo se reflejan en el servicio diario a la comunidad viñamarina.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "8:45",
      categoria: "Valores",
      fechaPublicacion: "2024-02-10",
      visualizaciones: "892"
    },
    {
      id: 3,
      titulo: "Capacitación Operativa 2024",
      descripcion: "Video instructivo sobre protocolos de emergencia, equipamiento y procedimientos operativos actualizados.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "22:15",
      categoria: "Capacitación",
      fechaPublicacion: "2024-03-05",
      visualizaciones: "2,156"
    },
    {
      id: 4,
      titulo: "Ceremonias y Reconocimientos",
      descripcion: "Compilación de ceremonias importantes, condecoraciones y reconocimientos a nuestros bomberos voluntarios.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "12:30",
      categoria: "Ceremonial",
      fechaPublicacion: "2024-02-28",
      visualizaciones: "756"
    },
    {
      id: 5,
      titulo: "Estructura Organizacional",
      descripcion: "Presentación de la jerarquía institucional, cargos operativos, administrativos y el Consejo de Disciplina.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "10:20",
      categoria: "Organización",
      fechaPublicacion: "2024-01-30",
      visualizaciones: "1,023"
    },
    {
      id: 6,
      titulo: "Actividades Comunitarias 2023",
      descripcion: "Resumen de las actividades de prevención, educación y servicio comunitario realizadas durante el año anterior.",
      embedId: "dQw4w9WgXcQ", // Video placeholder de YouTube
      duracion: "18:45",
      categoria: "Comunidad",
      fechaPublicacion: "2024-01-10",
      visualizaciones: "1,567"
    }
  ];

  const categorias = [
    { nombre: "Historia", icon: History, color: "bg-bomberos-blue" },
    { nombre: "Valores", icon: Award, color: "bg-bomberos-red" },
    { nombre: "Capacitación", icon: Users, color: "bg-primary" },
    { nombre: "Ceremonial", icon: Calendar, color: "bg-bomberos-gold" },
    { nombre: "Organización", icon: Users, color: "bg-secondary" },
    { nombre: "Comunidad", icon: Users, color: "bg-success" }
  ];

  const getCategoriaInfo = (categoria: string) => {
    return categorias.find(cat => cat.nombre === categoria) || categorias[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Videos Institucionales</h1>
        <p className="text-muted-foreground">
          Contenido audiovisual oficial de la 2ª Compañía de Bomberos de Viña del Mar
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Videos</span>
          </div>
          <p className="text-2xl font-semibold">{videosInstitucionales.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Duración Total</span>
          </div>
          <p className="text-2xl font-semibold">1h 28m</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Visualizaciones</span>
          </div>
          <p className="text-2xl font-semibold">7,648</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-info" />
            <span className="text-sm text-muted-foreground">Último Video</span>
          </div>
          <p className="text-2xl font-semibold">Mar 2024</p>
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          Todos
        </Badge>
        {categorias.map((categoria) => {
          const Icon = categoria.icon;
          return (
            <Badge 
              key={categoria.nombre}
              variant="outline" 
              className="cursor-pointer hover:bg-muted flex items-center gap-1"
            >
              <Icon className="w-3 h-3" />
              {categoria.nombre}
            </Badge>
          );
        })}
      </div>

      <Separator />

      {/* Grid de videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {videosInstitucionales.map((video) => {
          const categoriaInfo = getCategoriaInfo(video.categoria);
          const Icon = categoriaInfo.icon;
          
          return (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                {/* Thumbnail del video con overlay de play */}
                <div className="relative bg-gradient-to-br from-muted to-muted/60 h-48 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Iframe de YouTube embebido */}
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.titulo}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                    <Badge className={`${categoriaInfo.color} text-white flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />
                      {video.categoria}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duracion}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="mb-2 line-clamp-2">{video.titulo}</CardTitle>
                <CardDescription className="mb-3 line-clamp-3">
                  {video.descripcion}
                </CardDescription>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(video.fechaPublicacion).toLocaleDateString('es-CL')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {video.visualizaciones} vistas
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Ver Video Completo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-bomberos-blue" />
            Acerca de Nuestros Videos Institucionales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Los videos institucionales de la 2ª Compañía de Bomberos de Viña del Mar son una 
            herramienta fundamental para preservar nuestra historia, transmitir nuestros valores 
            y capacitar a nuestros voluntarios.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Propósito Educativo</h4>
              <p className="text-sm text-muted-foreground">
                Cada video está diseñado para educar, informar y mantener viva la tradición 
                bomberil que nos caracteriza desde 1884.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Acceso Controlado</h4>
              <p className="text-sm text-muted-foreground">
                El contenido audiovisual está disponible exclusivamente para miembros 
                activos y honorarios de la institución.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>
              Volver al Dashboard
            </Button>
            <Button variant="outline" onClick={() => onNavigate('personal')}>
              Ver Personal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}