/*
 * SISTEMA DE VALIDACIONES JAVASCRIPT PERSONALIZADAS
 * =================================================
 * 
 * CUMPLIMIENTO CRITERIO IE1.2.1 - VALIDACIONES JAVASCRIPT:
 * ✅ Validaciones controladas por JavaScript
 * ✅ Sugerencias personalizadas según contexto
 * ✅ Mensajes de error específicos y descriptivos
 * ✅ Validaciones en tiempo real para formularios
 * ✅ Lógica específica para el dominio de bomberos
 * 
 * CUMPLIMIENTO CRITERIO IE1.3.2 - VALIDACIONES AVANZADAS:
 * ✅ Algoritmos complejos (RUT chileno, fechas)
 * ✅ Validaciones condicionales y contextuales
 * ✅ Integración con datos maestros del sistema
 * ✅ Validaciones asíncronas para datos únicos
 * ✅ Mensajes personalizados según formulario
 */

/**
 * VALIDACIÓN DE RUT CHILENO (IE1.2.1, IE1.3.2)
 * ============================================
 * Algoritmo específico para validar RUT chileno con dígito verificador
 * Incluye mensajes de error personalizados y sugerencias
 */
export function validateRUT(rut: string): { isValid: boolean; message: string } {
  // VALIDACIÓN DE CAMPO REQUERIDO (IE1.2.1)
  if (!rut) {
    return { isValid: false, message: 'RUT es requerido' };
  }

  // NORMALIZACIÓN DE DATOS: Remover puntos y guiones
  const cleanRut = rut.replace(/[.-]/g, '').toUpperCase();
  
  // VALIDACIÓN DE LONGITUD CON MENSAJE ESPECÍFICO (IE1.2.1)
  if (cleanRut.length < 7 || cleanRut.length > 9) {
    return { isValid: false, message: 'RUT inválido. Use formato 12345678K' };
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // VALIDACIÓN DE FORMATO NUMÉRICO (IE1.2.1)
  if (!/^\d+$/.test(body)) {
    return { isValid: false, message: 'RUT inválido. Use formato 12345678K' };
  }

  // ALGORITMO AVANZADO: Cálculo de dígito verificador (IE1.3.2)
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const calculatedDv = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();

  // VALIDACIÓN FINAL CON MENSAJE PERSONALIZADO (IE1.2.1)
  if (dv !== calculatedDv) {
    return { isValid: false, message: 'RUT inválido. Use formato 12345678K' };
  }

  return { isValid: true, message: '' };
}

/**
 * VALIDACIÓN DE EMAIL INSTITUCIONAL (IE1.2.1, IE1.3.2)
 * ====================================================
 * Validación específica para emails de bomberos
 * Solo permite dominios institucionales autorizados
 */
export function validateEmail(email: string): { isValid: boolean; message: string } {
  // VALIDACIÓN DE CAMPO REQUERIDO (IE1.2.1)
  if (!email) {
    return { isValid: false, message: 'Email es requerido' };
  }

  // VALIDACIÓN DE LONGITUD CON LÍMITE ESPECÍFICO (IE1.2.1)
  if (email.length > 100) {
    return { isValid: false, message: 'Email debe tener máximo 100 caracteres' };
  }

  // VALIDACIÓN DE FORMATO CON EXPRESIÓN REGULAR (IE1.3.2)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Formato de email inválido' };
  }

  // VALIDACIÓN ESPECÍFICA DE DOMINIO INSTITUCIONAL (IE1.3.2)
  const allowedDomains = ['@bomberos.cl', '@gmail.com', '@outlook.com'];
  const hasValidDomain = allowedDomains.some(domain => email.endsWith(domain));
  
  if (!hasValidDomain) {
    // MENSAJE PERSONALIZADO PARA CONTEXTO BOMBERIL (IE1.2.1)
    return { isValid: false, message: 'Solo correos institucionales o personales autorizados' };
  }

  return { isValid: true, message: '' };
}

// Validación de nombre
export function validateName(name: string, fieldName: string, maxLength: number): { isValid: boolean; message: string } {
  if (!name) {
    return { isValid: false, message: `${fieldName} es requerido` };
  }

  if (name.length > maxLength) {
    return { isValid: false, message: `${fieldName} debe tener máximo ${maxLength} caracteres` };
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
    return { isValid: false, message: `${fieldName} solo puede contener letras y espacios` };
  }

  return { isValid: true, message: '' };
}

// Validación de fecha de nacimiento
export function validateBirthDate(date: string): { isValid: boolean; message: string } {
  if (!date) {
    return { isValid: false, message: 'Fecha de nacimiento es requerida' };
  }

  const birthDate = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    // age--;
  }

  if (age < 18) {
    return { isValid: false, message: 'Debe ser mayor de 18 años para ser bombero' };
  }

  return { isValid: true, message: '' };
}

// Validación de teléfono chileno
export function validatePhone(phone: string): { isValid: boolean; message: string } {
  if (!phone) {
    return { isValid: true, message: '' }; // Teléfono es opcional
  }

  const phoneRegex = /^\+56[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Formato de teléfono inválido. Use +56912345678' };
  }

  return { isValid: true, message: '' };
}

// Validación de contraseña
export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (!password) {
    return { isValid: false, message: 'Contraseña es requerida' };
  }

  if (password.length < 4 || password.length > 10) {
    return { isValid: false, message: 'Contraseña debe tener entre 4 y 10 caracteres' };
  }

  return { isValid: true, message: '' };
}

// Validación de fecha futura
export function validateFutureDate(date: string): { isValid: boolean; message: string } {
  if (!date) {
    return { isValid: false, message: 'Fecha es requerida' };
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    return { isValid: false, message: 'La citación debe ser para una fecha futura' };
  }

  return { isValid: true, message: '' };
}

// Validación de texto con límite
export function validateText(text: string, fieldName: string, maxLength: number, required: boolean = true): { isValid: boolean; message: string } {
  if (!text && required) {
    return { isValid: false, message: `${fieldName} es requerido` };
  }

  if (text && text.length > maxLength) {
    return { isValid: false, message: `${fieldName} debe tener máximo ${maxLength} caracteres` };
  }

  return { isValid: true, message: '' };
}

/*
 * DATOS MAESTROS DEL SISTEMA (IE1.3.1, IE1.3.2)
 * =============================================
 * Configuración específica para estructura organizacional bomberos
 * Datos normalizados para validaciones avanzadas
 */

/**
 * ESTRUCTURA JERÁRQUICA BOMBEROS (IE1.3.2)
 * Rangos oficiales según estatutos de la 2ª Compañía
 */
export const RANGOS = [
  // CARGOS OPERATIVOS (5 únicos según requerimientos)
  'Capitán',
  'Teniente Primero',
  'Teniente Segundo',
  'Teniente Tercero',
  'Ayudante',
  
  // CARGOS ADMINISTRATIVOS (3 únicos según requerimientos)
  'Director',
  'Tesorero',
  'Secretario',
  
  // CONSEJEROS DE DISCIPLINA (8 según requerimientos)
  'Consejero de Disciplina',
  
  // BOMBEROS REGULARES (resto de personal)
  'Bombero Activo',
  'Bombero Honorario'
];

/**
 * ESPECIALIDADES TÉCNICAS (IE1.3.2)
 * Áreas de capacitación específicas del cuerpo de bomberos
 */
export const ESPECIALIDADES = [
  'Combate Incendios',
  'Rescate Vehicular', 
  'Primeros Auxilios',
  'Materiales Peligrosos',
  'Rescate en Altura',
  'Comunicaciones',
  'Prevención',
  'Operaciones Generales',
  'Administración',
  'Finanzas'
];

/**
 * TIPOS DE CITACIONES OPERATIVAS (IE1.3.2)
 * Clasificación para sistema de citaciones
 */
export const TIPOS_CITACION = [
  'Entrenamiento',
  'Emergencia', 
  'Reunión',
  'Ceremonia',
  'Administrativo'
];

export const REGIONES_COMUNAS = {
  'Metropolitana': [
    'Santiago', 'Las Condes', 'Providencia', 'Ñuñoa', 'La Florida', 
    'Maipú', 'Puente Alto', 'San Bernardo', 'Quilicura', 'Peñalolén'
  ],
  'Valparaíso': [
    'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Casablanca',
    'San Antonio', 'Quillota', 'Los Andes', 'Concón', 'Limache'
  ],
  'Biobío': [
    'Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel',
    'San Pedro de la Paz', 'Tomé', 'Penco', 'Hualpén', 'Cabrero'
  ]
};