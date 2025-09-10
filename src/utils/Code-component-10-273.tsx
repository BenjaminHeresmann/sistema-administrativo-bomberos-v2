// Validaciones específicas para el perfil de usuario de Bomberos Viña del Mar

// Lista de comunas de la V Región para validación de direcciones
const comunasValparaiso = [
  'Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví',
  'Casablanca', 'Juan Fernández', 'Villa Alemana', 'Quilpué', 'Limache',
  'Olmué', 'Hijuelas', 'La Calera', 'Nogales', 'La Cruz', 'Quillota',
  'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo',
  'Santo Domingo', 'Isla de Pascua', 'Los Andes', 'Calle Larga',
  'Rinconada', 'San Esteban', 'Llaillay', 'Panquehue', 'Putaendo',
  'Santa María', 'Catemu'
];

// Palabras clave para validar direcciones
const palabrasClaveVia = [
  'calle', 'avenida', 'av', 'pasaje', 'villa', 'población', 'sector',
  'camino', 'ruta', 'condominio', 'block', 'torre', 'edificio'
];

// Validación de dirección chilena
export function validateAddress(address: string): { isValid: boolean; message: string } {
  if (!address || !address.trim()) {
    return { isValid: false, message: 'Dirección es requerida' };
  }

  const cleanAddress = address.toLowerCase().trim();

  if (cleanAddress.length < 10) {
    return { 
      isValid: false, 
      message: 'La dirección debe tener al menos 10 caracteres' 
    };
  }

  if (cleanAddress.length > 200) {
    return { 
      isValid: false, 
      message: 'La dirección no puede exceder 200 caracteres' 
    };
  }

  // Verificar que contenga una palabra clave de vía
  const tieneVia = palabrasClaveVia.some(palabra => cleanAddress.includes(palabra));
  if (!tieneVia) {
    return { 
      isValid: false, 
      message: 'La dirección debe incluir el tipo de vía (calle, avenida, pasaje, etc.)' 
    };
  }

  // Verificar que contenga números (numeración)
  if (!/\d/.test(cleanAddress)) {
    return { 
      isValid: false, 
      message: 'La dirección debe incluir numeración' 
    };
  }

  // Verificar que contenga una comuna de la V Región (opcional pero recomendado)
  const tieneComuna = comunasValparaiso.some(comuna => 
    cleanAddress.includes(comuna.toLowerCase())
  );

  if (!tieneComuna) {
    return { 
      isValid: true, 
      message: '⚠️ Se recomienda incluir la comuna (V Región de Valparaíso)' 
    };
  }

  return { 
    isValid: true, 
    message: '✅ Dirección válida' 
  };
}

// Validación de teléfono chileno para perfil
export function validateChileanPhoneProfile(phone: string, isRequired: boolean = true): { isValid: boolean; message: string } {
  if (!phone || !phone.trim()) {
    if (isRequired) {
      return { isValid: false, message: 'Número de teléfono es requerido' };
    } else {
      return { isValid: true, message: '' };
    }
  }

  // Limpiar el teléfono de espacios y caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Formato chileno: +569XXXXXXXX
  if (!/^\+56(9\d{8})$/.test(cleanPhone)) {
    return { 
      isValid: false, 
      message: 'Formato inválido. Use: +56 9 seguido de 8 dígitos (ej: +56 9 1234 5678)' 
    };
  }

  return { 
    isValid: true, 
    message: '✅ Número válido' 
  };
}

// Validación de que dos números sean diferentes
export function validateDifferentPhones(phone1: string, phone2: string): { isValid: boolean; message: string } {
  if (!phone1 || !phone2) {
    return { isValid: true, message: '' };
  }

  const cleanPhone1 = phone1.replace(/[\s\-\(\)]/g, '');
  const cleanPhone2 = phone2.replace(/[\s\-\(\)]/g, '');

  if (cleanPhone1 === cleanPhone2) {
    return { 
      isValid: false, 
      message: 'El teléfono de emergencia debe ser diferente al personal' 
    };
  }

  return { 
    isValid: true, 
    message: '✅ Números diferentes' 
  };
}

// Formatear teléfono chileno para mostrar
export function formatChileanPhone(phone: string): string {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleanPhone.match(/^\+56(9\d{8})$/)) {
    const number = cleanPhone.substring(3); // Remover +56
    return `+56 ${number.substring(0, 1)} ${number.substring(1, 5)} ${number.substring(5)}`;
  }
  
  return phone;
}

// Tipos para el perfil de usuario
export interface UserProfile {
  // Datos no editables (institucionales)
  run: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  correoInstitucional: string;
  compania: string;
  cargo: string;
  numeroMatricula: string;
  fechaIngreso: string;
  estado: 'Activo' | 'Inactivo' | 'Licencia' | 'Suspendido';
  
  // Datos editables (contacto)
  direccion: string;
  telefonoPersonal: string;
  telefonoEmergencia: string;
  
  // Metadatos
  fechaUltimaModificacion?: string;
  modificadoPor?: string;
}

// Datos de ejemplo para el perfil
export const mockUserProfile: UserProfile = {
  // Datos institucionales (no editables)
  run: '12.345.678-9',
  nombreCompleto: 'Juan Carlos Pérez González',
  fechaNacimiento: '15/03/1985',
  correoInstitucional: 'juan.perez@bomberosvinadelmar.cl',
  compania: 'Segunda Compañía',
  cargo: 'Cabo',
  numeroMatricula: 'B-2024-0156',
  fechaIngreso: '01/01/2020',
  estado: 'Activo',
  
  // Datos de contacto (editables)
  direccion: 'Av. Libertad 1234, Depto 5B, Viña del Mar, Valparaíso',
  telefonoPersonal: '+56 9 8765 4321',
  telefonoEmergencia: '+56 9 1234 5678',
  
  // Metadatos
  fechaUltimaModificacion: '2024-01-10T14:30:00Z',
  modificadoPor: 'juan.perez@bomberosvinadelmar.cl'
};

// Historial de cambios
export interface ProfileChangeLog {
  id: number;
  fecha: string;
  campo: string;
  valorAnterior: string;
  valorNuevo: string;
  usuario: string;
}

export const mockProfileHistory: ProfileChangeLog[] = [
  {
    id: 1,
    fecha: '2024-01-10T14:30:00Z',
    campo: 'Dirección',
    valorAnterior: 'Calle Valparaíso 567, Viña del Mar',
    valorNuevo: 'Av. Libertad 1234, Depto 5B, Viña del Mar, Valparaíso',
    usuario: 'juan.perez@bomberosvinadelmar.cl'
  },
  {
    id: 2,
    fecha: '2024-01-05T09:15:00Z',
    campo: 'Teléfono Personal',
    valorAnterior: '+56 9 9876 5432',
    valorNuevo: '+56 9 8765 4321',
    usuario: 'juan.perez@bomberosvinadelmar.cl'
  },
  {
    id: 3,
    fecha: '2023-12-15T16:45:00Z',
    campo: 'Teléfono de Emergencia',
    valorAnterior: '+56 9 5555 6666',
    valorNuevo: '+56 9 1234 5678',
    usuario: 'juan.perez@bomberosvinadelmar.cl'
  }
];

// Función para validar formulario completo de perfil
export function validateProfileForm(profileData: {
  direccion: string;
  telefonoPersonal: string;
  telefonoEmergencia: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validar dirección
  const addressValidation = validateAddress(profileData.direccion);
  if (!addressValidation.isValid) {
    errors.direccion = addressValidation.message;
  }

  // Validar teléfono personal (requerido)
  const phoneValidation = validateChileanPhoneProfile(profileData.telefonoPersonal, true);
  if (!phoneValidation.isValid) {
    errors.telefonoPersonal = phoneValidation.message;
  }

  // Validar teléfono de emergencia (opcional)
  if (profileData.telefonoEmergencia) {
    const emergencyPhoneValidation = validateChileanPhoneProfile(profileData.telefonoEmergencia, false);
    if (!emergencyPhoneValidation.isValid) {
      errors.telefonoEmergencia = emergencyPhoneValidation.message;
    }

    // Validar que sean diferentes
    if (profileData.telefonoPersonal && profileData.telefonoEmergencia) {
      const differentPhonesValidation = validateDifferentPhones(
        profileData.telefonoPersonal, 
        profileData.telefonoEmergencia
      );
      if (!differentPhonesValidation.isValid) {
        errors.telefonoEmergencia = differentPhonesValidation.message;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Función para calcular edad
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate.split('/').reverse().join('-')); // Convertir DD/MM/YYYY a YYYY-MM-DD
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Función para formatear fecha para mostrar
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}