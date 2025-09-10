import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Mail, 
  Phone, 
  Building, 
  Shield,
  AlertTriangle,
  FileText,
  Calendar
} from 'lucide-react';
import { pendingRegistrations, RegistrationStatus, statusLabels } from '../utils/bomberosValidation';

interface RegistrationAdminProps {
  onNavigate: (page: string) => void;
}

export function RegistrationAdmin({ onNavigate }: RegistrationAdminProps) {
  const [registrations, setRegistrations] = useState(pendingRegistrations);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [actionMessage, setActionMessage] = useState('');

  const handleApprove = (id: number) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id 
          ? { ...reg, status: RegistrationStatus.APPROVED }
          : reg
      )
    );
    setActionMessage(`✅ Registro #${id} aprobado exitosamente`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const handleReject = (id: number) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id 
          ? { ...reg, status: RegistrationStatus.REJECTED }
          : reg
      )
    );
    setActionMessage(`❌ Registro #${id} rechazado`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const handleRequestInfo = (id: number) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id 
          ? { ...reg, status: RegistrationStatus.NEEDS_INFO }
          : reg
      )
    );
    setActionMessage(`📋 Solicitada información adicional para registro #${id}`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case RegistrationStatus.PENDING:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          {statusLabels[status]}
        </Badge>;
      case RegistrationStatus.APPROVED:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {statusLabels[status]}
        </Badge>;
      case RegistrationStatus.REJECTED:
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          {statusLabels[status]}
        </Badge>;
      case RegistrationStatus.NEEDS_INFO:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {statusLabels[status]}
        </Badge>;
      default:
        return <Badge variant="outline">{statusLabels[status]}</Badge>;
    }
  };

  const pendingCount = registrations.filter(reg => reg.status === RegistrationStatus.PENDING).length;
  const approvedCount = registrations.filter(reg => reg.status === RegistrationStatus.APPROVED).length;
  const rejectedCount = registrations.filter(reg => reg.status === RegistrationStatus.REJECTED).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Registros</h1>
          <p className="text-muted-foreground">
            Administración de solicitudes de registro al sistema
          </p>
        </div>
        <Button onClick={() => onNavigate('personal')} variant="outline">
          <Users className="w-4 h-4 mr-2" />
          Ver Personal Activo
        </Button>
      </div>

      {/* Mensaje de acción */}
      {actionMessage && (
        <Alert className="border-success bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            {actionMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Métricas de registros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{pendingCount}</div>
                <div className="text-sm text-muted-foreground">Pendientes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{approvedCount}</div>
                <div className="text-sm text-muted-foreground">Aprobados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-100">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{rejectedCount}</div>
                <div className="text-sm text-muted-foreground">Rechazados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{registrations.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de solicitudes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Solicitudes de Registro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay solicitudes de registro</p>
              </div>
            ) : (
              registrations.map((registration) => (
                <div key={registration.id} className="border border-border rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Información del solicitante */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {registration.nombre} {registration.apellidos}
                          </h3>
                          <p className="text-sm text-muted-foreground">RUN: {registration.run}</p>
                        </div>
                        {getStatusBadge(registration.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{registration.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{registration.compania}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span>{registration.cargo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Solicitado: {new Date(registration.fechaSolicitud).toLocaleDateString('es-CL')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRegistration(registration)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalles
                      </Button>
                      
                      {registration.status === RegistrationStatus.PENDING && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(registration.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestInfo(registration.id)}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Más Info
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(registration.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Rechazar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalles */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Detalles del Registro #{selectedRegistration.id}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedRegistration(null)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Información Personal</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nombre:</strong> {selectedRegistration.nombre} {selectedRegistration.apellidos}</div>
                    <div><strong>RUN:</strong> {selectedRegistration.run}</div>
                    <div><strong>Email:</strong> {selectedRegistration.email}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Información Bomberil</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Compañía:</strong> {selectedRegistration.compania}</div>
                    <div><strong>Cargo:</strong> {selectedRegistration.cargo}</div>
                    <div><strong>Fecha Solicitud:</strong> {new Date(selectedRegistration.fechaSolicitud).toLocaleDateString('es-CL')}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Estado del Registro</h4>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedRegistration.status)}
                </div>
              </div>

              {selectedRegistration.status === RegistrationStatus.PENDING && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        handleApprove(selectedRegistration.id);
                        setSelectedRegistration(null);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar Registro
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleRequestInfo(selectedRegistration.id);
                        setSelectedRegistration(null);
                      }}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-1"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Solicitar Más Información
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleReject(selectedRegistration.id);
                        setSelectedRegistration(null);
                      }}
                      className="border-red-200 text-red-700 hover:bg-red-50 flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}