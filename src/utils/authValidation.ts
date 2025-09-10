// Utilidades de validación para el sistema de autenticación de Bomberos Viña del Mar

// Base de datos de usuarios registrados en Bomberos Viña del Mar
export const usuariosRegistrados = {
  'director@bomberosvinadelmar.cl': {
    password: 'Dir2025!',
    role: 'Director General',
    description: 'Acceso total al sistema'
  },
  'capitan@bomberosvinadelmar.cl': {
    password: 'Cap123#',
    role: 'Capitán de Operaciones', 
    description: 'Gestión de operaciones'
  },
  'admin@bomberosvinadelmar.cl': {
    password: 'Adm2024$',
    role: 'Administrador del Sistema',
    description: 'Gestión del sistema'
  },
  'bombero@bomberosvinadelmar.cl': {
    password: 'Bomb24*',
    role: 'Bombero Operativo',
    description: 'Acceso operativo'
  }
};

// Validación de email - Fase 1: Formato
export function validateEmailFormat(email: string): { isValid: boolean; message: string } {
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

  return { isValid: true, message: '' };
}

// Validación de email - Fase 2: Base de datos
export function validateEmailDatabase(email: string): { isValid: boolean; message: string; userFound: boolean; role?: string } {
  const formatValidation = validateEmailFormat(email);
  if (!formatValidation.isValid) {
    return { ...formatValidation, userFound: false };
  }

  const isRegistered = email in usuariosRegistrados;
  
  if (!isRegistered) {
    return { 
      isValid: false, 
      message: '❌ Este correo no está registrado en el sistema de Bomberos Viña del Mar',
      userFound: false
    };
  }

  const userData = usuariosRegistrados[email as keyof typeof usuariosRegistrados];
  return { 
    isValid: true, 
    message: `👤 Usuario: ${userData.role} detectado`,
    userFound: true,
    role: userData.role
  };
}

// Validación de email para login (combinada)
export function validateEmailLogin(email: string): { isValid: boolean; message: string; userFound?: boolean; role?: string } {
  return validateEmailDatabase(email);
}

// Validación de contraseña - Fase 1: Formato
export function validatePasswordFormat(password: string): { isValid: boolean; message: string } {
  if (!password) {
    return { isValid: false, message: 'Contraseña es requerida' };
  }

  if (password.length < 4 || password.length > 10) {
    return { isValid: false, message: '⚠️ La contraseña debe tener entre 4 y 10 caracteres' };
  }

  return { isValid: true, message: '' };
}

// Validación de contraseña - Fase 2: Base de datos
export function validatePasswordDatabase(email: string, password: string): { isValid: boolean; message: string } {
  const formatValidation = validatePasswordFormat(password);
  if (!formatValidation.isValid) {
    return formatValidation;
  }

  if (!email || !(email in usuariosRegistrados)) {
    return { isValid: false, message: '❌ Debe ingresar un correo válido registrado primero' };
  }

  const userData = usuariosRegistrados[email as keyof typeof usuariosRegistrados];
  const isCorrectPassword = password === userData.password;
  
  if (!isCorrectPassword) {
    return { 
      isValid: false, 
      message: '❌ Contraseña incorrecta para este usuario'
    };
  }

  return { 
    isValid: true, 
    message: '✅ Contraseña correcta'
  };
}

// Validación de contraseña para login (combinada)
export function validatePasswordLogin(password: string, email?: string): { isValid: boolean; message: string } {
  if (email && email in usuariosRegistrados) {
    return validatePasswordDatabase(email, password);
  } else {
    return validatePasswordFormat(password);
  }
}

// Validación completa de credenciales
export function validateCredentials(email: string, password: string): { 
  isValid: boolean; 
  message: string; 
  user?: { role: string; description: string } 
} {
  // Validar email primero
  const emailValidation = validateEmailLogin(email);
  if (!emailValidation.isValid) {
    return { 
      isValid: false, 
      message: emailValidation.message 
    };
  }

  // Validar contraseña
  const passwordValidation = validatePasswordDatabase(email, password);
  if (!passwordValidation.isValid) {
    return { 
      isValid: false, 
      message: passwordValidation.message 
    };
  }

  // Credenciales válidas
  const userData = usuariosRegistrados[email as keyof typeof usuariosRegistrados];
  return { 
    isValid: true, 
    message: '✅ Acceso autorizado - Bienvenido al sistema',
    user: {
      role: userData.role,
      description: userData.description
    }
  };
}

// Validación de nombre completo
export function validateFullName(name: string): { isValid: boolean; message: string } {
  if (!name) {
    return { isValid: false, message: 'Nombre completo es requerido' };
  }

  if (name.length > 100) {
    return { isValid: false, message: 'El nombre debe tener máximo 100 caracteres' };
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
    return { isValid: false, message: 'El nombre solo puede contener letras y espacios' };
  }

  // Verificar que tenga al menos nombre y apellido
  const words = name.trim().split(/\s+/);
  if (words.length < 2) {
    return { isValid: false, message: 'Debe ingresar nombre y apellido completos' };
  }

  return { isValid: true, message: '' };
}

// Validación de número de teléfono chileno
export function validatePhoneNumber(phone: string): { isValid: boolean; message: string } {
  if (!phone) {
    return { isValid: true, message: '' }; // Teléfono es opcional
  }

  const phoneRegex = /^\+56[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Formato de teléfono inválido. Use +56912345678' };
  }

  return { isValid: true, message: '' };
}

// Validación de confirmación de contraseña
export function validatePasswordConfirmation(confirmPassword: string, originalPassword: string): { isValid: boolean; message: string } {
  if (!confirmPassword) {
    return { isValid: false, message: 'Confirmación de contraseña es requerida' };
  }

  if (confirmPassword !== originalPassword) {
    return { isValid: false, message: 'Las contraseñas no coinciden' };
  }

  return { isValid: true, message: '' };
}

// Validación de confirmación de email
export function validateEmailConfirmation(confirmEmail: string, originalEmail: string): { isValid: boolean; message: string } {
  if (!confirmEmail) {
    return { isValid: false, message: 'Confirmación de correo es requerida' };
  }

  // Primero validar que el correo de confirmación tenga formato válido
  const emailValidation = validateEmailFormat(confirmEmail);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  if (confirmEmail !== originalEmail) {
    return { isValid: false, message: 'Los correos electrónicos no coinciden' };
  }

  return { isValid: true, message: '' };
}

// Función helper para obtener sugerencias de dominios válidos
export function getValidDomainSuggestions(): string[] {
  return ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
}

// Función helper para formatear mensajes de error
export function formatValidationMessage(field: string, error: string): string {
  return `${field}: ${error}`;
}

// Función para validar formulario completo de registro
export function validateRegistrationForm(formData: {
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  phone: string;
  region: string;
  comuna: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validar nombre completo
  const nameValidation = validateFullName(formData.fullName);
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.message;
  }

  // Validar email (solo formato para registro, no base de datos)
  const emailValidation = validateEmailFormat(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validar confirmación de email
  const confirmEmailValidation = validateEmailConfirmation(formData.confirmEmail, formData.email);
  if (!confirmEmailValidation.isValid) {
    errors.confirmEmail = confirmEmailValidation.message;
  }

  // Validar contraseña
  const passwordValidation = validatePasswordFormat(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // Validar confirmación de contraseña
  const confirmPasswordValidation = validatePasswordConfirmation(formData.confirmPassword, formData.password);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
  }

  // Validar teléfono (opcional)
  if (formData.phone) {
    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.message;
    }
  }

  // Validar región y comuna
  if (!formData.region) {
    errors.region = 'Región es requerida';
  }

  if (!formData.comuna) {
    errors.comuna = 'Comuna es requerida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Función para validar formulario de login
export function validateLoginForm(formData: {
  email: string;
  password: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validar email con base de datos
  const emailValidation = validateEmailLogin(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validar contraseña con base de datos si el email es válido
  const passwordValidation = validatePasswordLogin(formData.password, formData.email);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}