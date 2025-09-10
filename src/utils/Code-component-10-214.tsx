// Validaciones específicas para el sistema de registro de Bomberos Viña del Mar

// Validación de RUN chileno con dígito verificador
export function validateRun(run: string): { isValid: boolean; message: string; formatted?: string } {
  if (!run) {
    return { isValid: false, message: 'RUN es requerido' };
  }

  // Limpiar el RUN de puntos y guiones
  const cleanRun = run.replace(/[.-]/g, '');
  
  // Verificar que tenga entre 8 y 9 caracteres (7-8 números + 1 dígito verificador)
  if (cleanRun.length < 8 || cleanRun.length > 9) {
    return { isValid: false, message: 'RUN debe tener entre 8 y 9 caracteres' };
  }

  // Verificar que todos los caracteres excepto el último sean números
  const body = cleanRun.slice(0, -1);
  const dv = cleanRun.slice(-1).toLowerCase();

  if (!/^\d+$/.test(body)) {
    return { isValid: false, message: 'RUN debe contener solo números y dígito verificador' };
  }

  // Calcular dígito verificador usando algoritmo módulo 11
  let suma = 0;
  let multiplicador = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    suma += parseInt(body[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  let dvCalculado = (11 - resto).toString();
  
  if (dvCalculado === '11') dvCalculado = '0';
  if (dvCalculado === '10') dvCalculado = 'k';

  if (dv !== dvCalculado) {
    return { isValid: false, message: 'RUN inválido: dígito verificador incorrecto' };
  }

  // Formatear RUN para mostrar
  const formatted = `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv.toUpperCase()}`;

  return { 
    isValid: true, 
    message: '✅ RUN válido',
    formatted
  };
}

// Validación de correo institucional exclusivo
export function validateInstitutionalEmail(email: string): { isValid: boolean; message: string } {
  if (!email) {
    return { isValid: false, message: 'Correo electrónico es requerido' };
  }

  if (email.length > 100) {
    return { isValid: false, message: 'El correo debe tener máximo 100 caracteres' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: '⚠️ Formato de correo electrónico inválido' };
  }

  // SOLO permitir correos @bomberosvinadelmar.cl
  if (!email.endsWith('@bomberosvinadelmar.cl')) {
    return { 
      isValid: false, 
      message: '❌ Solo se permiten correos institucionales @bomberosvinadelmar.cl' 
    };
  }

  // Validar formato del nombre de usuario (debe ser nombre.apellido o similar)
  const username = email.split('@')[0];
  if (!/^[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z0-9]$/.test(username) || username.length < 3) {
    return { 
      isValid: false, 
      message: '❌ Formato de correo inválido. Use: nombre.apellido@bomberosvinadelmar.cl' 
    };
  }

  return { isValid: true, message: '✅ Correo institucional válido' };
}

// Validación de edad basada en fecha de nacimiento
export function validateAge(birthDate: string): { isValid: boolean; message: string; age?: number } {
  if (!birthDate) {
    return { isValid: false, message: 'Fecha de nacimiento es requerida' };
  }

  const today = new Date();
  const birth = new Date(birthDate);
  
  if (birth > today) {
    return { isValid: false, message: 'La fecha de nacimiento no puede ser futura' };
  }

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 18) {
    return { isValid: false, message: '❌ Debe ser mayor de 18 años para registrarse' };
  }

  if (age > 65) {
    return { isValid: false, message: '❌ Debe ser menor de 65 años según reglamento' };
  }

  return { 
    isValid: true, 
    message: `✅ Edad válida (${age} años)`,
    age 
  };
}

// Validación de teléfono chileno (opcional)
export function validateChileanPhone(phone: string): { isValid: boolean; message: string } {
  if (!phone) {
    return { isValid: true, message: '' }; // Teléfono es opcional
  }

  // Limpiar el teléfono de espacios y caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Formato chileno: +569XXXXXXXX o 9XXXXXXXX
  const phoneRegex = /^(\+?56)?9[0-9]{8}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { 
      isValid: false, 
      message: 'Formato inválido. Use: +56 9 xxxx xxxx o 9 xxxx xxxx' 
    };
  }

  return { isValid: true, message: '✅ Teléfono válido' };
}

// Validación de número de matrícula bomberil (opcional)
export function validateBomberoId(matricula: string): { isValid: boolean; message: string } {
  if (!matricula) {
    return { isValid: true, message: '' }; // Matrícula es opcional
  }

  // Solo números, entre 4 y 6 dígitos
  if (!/^\d{4,6}$/.test(matricula)) {
    return { 
      isValid: false, 
      message: 'Número de matrícula debe tener entre 4 y 6 dígitos' 
    };
  }

  return { isValid: true, message: '✅ Número de matrícula válido' };
}

// Validación de consistencia entre compañía y cargo
export function validateCompanyRoleConsistency(compania: string, cargo: string): { isValid: boolean; message: string } {
  if (!compania || !cargo) {
    return { isValid: true, message: '' }; // Se valida en campos individuales
  }

  // Reglas de consistencia específicas
  const adminRoles = ['Director', 'Subdirector', 'Secretario', 'Tesorero'];
  const operativeRoles = ['Bombero Voluntario', 'Cabo', 'Sargento', 'Teniente', 'Capitán'];
  const specialistRoles = ['Especialista (rescate, hazmat, etc.)'];

  if (compania === 'Comando' && !adminRoles.includes(cargo)) {
    return { 
      isValid: false, 
      message: '❌ El cargo seleccionado no corresponde al Comando' 
    };
  }

  if (compania === 'Administración' && !adminRoles.includes(cargo)) {
    return { 
      isValid: false, 
      message: '❌ El cargo seleccionado no corresponde a Administración' 
    };
  }

  const companias = ['Primera Compañía', 'Segunda Compañía', 'Tercera Compañía', 'Cuarta Compañía'];
  if (companias.includes(compania) && adminRoles.includes(cargo)) {
    return { 
      isValid: false, 
      message: '❌ Los cargos administrativos corresponden a Comando/Administración' 
    };
  }

  return { isValid: true, message: '✅ Compañía y cargo son consistentes' };
}

// Datos para los select dropdowns
export const companiasOptions = [
  { value: '', label: 'Selecciona una compañía' },
  { value: 'Primera Compañía', label: 'Primera Compañía' },
  { value: 'Segunda Compañía', label: 'Segunda Compañía' },
  { value: 'Tercera Compañía', label: 'Tercera Compañía' },
  { value: 'Cuarta Compañía', label: 'Cuarta Compañía' },
  { value: 'Comando', label: 'Comando' },
  { value: 'Administración', label: 'Administración' }
];

export const cargosOptions = [
  { value: '', label: 'Selecciona un cargo' },
  { value: 'Bombero Voluntario', label: 'Bombero Voluntario' },
  { value: 'Cabo', label: 'Cabo' },
  { value: 'Sargento', label: 'Sargento' },
  { value: 'Teniente', label: 'Teniente' },
  { value: 'Capitán', label: 'Capitán' },
  { value: 'Director', label: 'Director' },
  { value: 'Subdirector', label: 'Subdirector' },
  { value: 'Secretario', label: 'Secretario' },
  { value: 'Tesorero', label: 'Tesorero' },
  { value: 'Especialista (rescate, hazmat, etc.)', label: 'Especialista (rescate, hazmat, etc.)' }
];

// Estados de registro
export enum RegistrationStatus {
  PENDING = 'PENDIENTE',
  APPROVED = 'APROBADO',
  REJECTED = 'RECHAZADO',
  SUSPENDED = 'SUSPENDIDO',
  NEEDS_INFO = 'REQUIERE_INFO'
}

export const statusLabels = {
  [RegistrationStatus.PENDING]: 'Pendiente de Aprobación',
  [RegistrationStatus.APPROVED]: 'Aprobado',
  [RegistrationStatus.REJECTED]: 'Rechazado',
  [RegistrationStatus.SUSPENDED]: 'Suspendido',
  [RegistrationStatus.NEEDS_INFO]: 'Requiere Información Adicional'
};

// Función para validar formulario completo de registro
export function validateRegistrationForm(formData: {
  run: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  email: string;
  emailConfirm: string;
  telefono: string;
  compania: string;
  cargo: string;
  password: string;
  passwordConfirm: string;
  matricula?: string;
  referencia?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validar RUN
  const runValidation = validateRun(formData.run);
  if (!runValidation.isValid) {
    errors.run = runValidation.message;
  }

  // Validar nombre
  if (!formData.nombre.trim()) {
    errors.nombre = 'Nombre es requerido';
  } else if (formData.nombre.length > 50) {
    errors.nombre = 'Nombre debe tener máximo 50 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
    errors.nombre = 'Nombre solo puede contener letras y espacios';
  }

  // Validar apellidos
  if (!formData.apellidos.trim()) {
    errors.apellidos = 'Apellidos son requeridos';
  } else if (formData.apellidos.length > 100) {
    errors.apellidos = 'Apellidos deben tener máximo 100 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellidos)) {
    errors.apellidos = 'Apellidos solo pueden contener letras y espacios';
  }

  // Validar fecha de nacimiento
  const ageValidation = validateAge(formData.fechaNacimiento);
  if (!ageValidation.isValid) {
    errors.fechaNacimiento = ageValidation.message;
  }

  // Validar email institucional
  const emailValidation = validateInstitutionalEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validar confirmación de email
  if (!formData.emailConfirm) {
    errors.emailConfirm = 'Confirmación de correo es requerida';
  } else if (formData.email !== formData.emailConfirm) {
    errors.emailConfirm = 'Los correos electrónicos no coinciden';
  }

  // Validar teléfono (opcional)
  if (formData.telefono) {
    const phoneValidation = validateChileanPhone(formData.telefono);
    if (!phoneValidation.isValid) {
      errors.telefono = phoneValidation.message;
    }
  }

  // Validar compañía
  if (!formData.compania) {
    errors.compania = 'Compañía/Unidad es requerida';
  }

  // Validar cargo
  if (!formData.cargo) {
    errors.cargo = 'Cargo/Especialidad es requerido';
  }

  // Validar consistencia compañía-cargo
  if (formData.compania && formData.cargo) {
    const consistencyValidation = validateCompanyRoleConsistency(formData.compania, formData.cargo);
    if (!consistencyValidation.isValid) {
      errors.cargo = consistencyValidation.message;
    }
  }

  // Validar contraseña
  if (!formData.password) {
    errors.password = 'Contraseña es requerida';
  } else if (formData.password.length < 4 || formData.password.length > 10) {
    errors.password = 'La contraseña debe tener entre 4 y 10 caracteres';
  }

  // Validar confirmación de contraseña
  if (!formData.passwordConfirm) {
    errors.passwordConfirm = 'Confirmación de contraseña es requerida';
  } else if (formData.password !== formData.passwordConfirm) {
    errors.passwordConfirm = 'Las contraseñas no coinciden';
  }

  // Validar matrícula (opcional)
  if (formData.matricula) {
    const matriculaValidation = validateBomberoId(formData.matricula);
    if (!matriculaValidation.isValid) {
      errors.matricula = matriculaValidation.message;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Base de datos simulada de registros pendientes (para demostración)
export const pendingRegistrations = [
  {
    id: 1,
    run: '12.345.678-9',
    nombre: 'Juan Carlos',
    apellidos: 'Pérez González',
    email: 'juan.perez@bomberosvinadelmar.cl',
    compania: 'Segunda Compañía',
    cargo: 'Bombero Voluntario',
    fechaSolicitud: '2024-01-15',
    status: RegistrationStatus.PENDING
  },
  {
    id: 2,
    run: '98.765.432-1',
    nombre: 'María Fernanda',
    apellidos: 'Rodríguez Silva',
    email: 'maria.rodriguez@bomberosvinadelmar.cl',
    compania: 'Primera Compañía',
    cargo: 'Cabo',
    fechaSolicitud: '2024-01-14',
    status: RegistrationStatus.PENDING
  }
];