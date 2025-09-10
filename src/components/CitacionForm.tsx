import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  validateFutureDate,
  validateText,
} from "../utils/validation";

// Función helper para generar RUT chileno válido
const generateValidRUT = (num: number): string => {
  const rutNumber = num.toString().padStart(7, "0");
  let sum = 0;
  let multiplier = 2;

  for (let i = rutNumber.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumber[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const dv =
    remainder === 0
      ? "0"
      : remainder === 1
        ? "K"
        : (11 - remainder).toString();

  return `${parseInt(rutNumber).toLocaleString("es-CL")}-${dv}`;
};

// Función helper para calcular años de servicio
const calculateYearsOfService = (fechaIngreso: string): number => {
  const ingreso = new Date(fechaIngreso);
  const now = new Date();
  return Math.floor(
    (now.getTime() - ingreso.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
};

// Datos completos de bomberos disponibles
const bomberosMock = [
  // CARGOS OPERATIVOS (5)
  {
    id: 1,
    rut: generateValidRUT(15678945),
    nombre: "Carlos Eduardo Silva Mendoza",
    apellidos: "",
    rango: "Capitán",
    especialidad: "Operaciones Generales",
    estado: "activo",
    fechaIngreso: "1995-02-15",
  },
  {
    id: 2,
    rut: generateValidRUT(12456789),
    nombre: "Patricia Alejandra Morales Vega",
    apellidos: "",
    rango: "Teniente Primero",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "2000-05-10",
  },
  {
    id: 3,
    rut: generateValidRUT(16789234),
    nombre: "Juan Carlos Pérez González",
    apellidos: "",
    rango: "Teniente Segundo",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "2005-01-20",
  },
  {
    id: 4,
    rut: generateValidRUT(18923456),
    nombre: "María Elena Rodríguez Soto",
    apellidos: "",
    rango: "Teniente Tercero",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "2008-08-15",
  },
  {
    id: 5,
    rut: generateValidRUT(14567893),
    nombre: "Roberto Antonio López Herrera",
    apellidos: "",
    rango: "Ayudante",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "2010-03-22",
  },

  // CARGOS ADMINISTRATIVOS (3)
  {
    id: 6,
    rut: generateValidRUT(19876543),
    nombre: "Ana Patricia Vargas Luna",
    apellidos: "",
    rango: "Director",
    especialidad: "Administración",
    estado: "activo",
    fechaIngreso: "1998-11-05",
  },
  {
    id: 7,
    rut: generateValidRUT(13456789),
    nombre: "Miguel Ángel Castillo Muñoz",
    apellidos: "",
    rango: "Tesorero",
    especialidad: "Finanzas",
    estado: "activo",
    fechaIngreso: "2002-07-18",
  },
  {
    id: 8,
    rut: generateValidRUT(17892345),
    nombre: "Carmen Gloria Jiménez Parra",
    apellidos: "",
    rango: "Secretario",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "2004-09-30",
  },

  // CONSEJEROS DE DISCIPLINA (8)
  {
    id: 9,
    rut: generateValidRUT(11234567),
    nombre: "Francisco Javier Torres Ramos",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "2008-04-12",
  },
  {
    id: 10,
    rut: generateValidRUT(16543289),
    nombre: "Lorena Isabel Contreras Silva",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "2005-12-08",
  },
  {
    id: 11,
    rut: generateValidRUT(18765432),
    nombre: "Diego Alejandro Espinoza Rojas",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "2010-06-15",
  },
  {
    id: 12,
    rut: generateValidRUT(15432167),
    nombre: "Claudia Andrea Bustos Martínez",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "2012-03-20",
  },
  {
    id: 13,
    rut: generateValidRUT(19876521),
    nombre: "Andrés Felipe Guzmán Vidal",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "2009-07-25",
  },
  {
    id: 14,
    rut: generateValidRUT(17654321),
    nombre: "Paola Cristina Muñoz Salinas",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "2011-12-10",
  },
  {
    id: 15,
    rut: generateValidRUT(14321987),
    nombre: "Sergio Esteban Navarro Peña",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "2010-09-18",
  },
  {
    id: 16,
    rut: generateValidRUT(12987654),
    nombre: "Valentina María Carrasco Díaz",
    apellidos: "",
    rango: "Consejero de Disciplina",
    especialidad: "Prevención",
    estado: "activo",
    fechaIngreso: "2013-05-22",
  },

  // BOMBEROS ACTIVOS (32)
  {
    id: 17,
    rut: generateValidRUT(17543219),
    nombre: "Fernando José Bravo Ulloa",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "2016-05-30",
  },
  {
    id: 18,
    rut: generateValidRUT(14876523),
    nombre: "Katherine Soledad Vega Campos",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "2018-01-15",
  },
  {
    id: 19,
    rut: generateValidRUT(16234578),
    nombre: "Nicolás Eduardo Poblete Sáez",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "2017-08-22",
  },
  {
    id: 20,
    rut: generateValidRUT(19865432),
    nombre: "Alejandra Beatriz Flores Aguilar",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "2019-03-10",
  },
  {
    id: 21,
    rut: generateValidRUT(13456792),
    nombre: "Marcelo Andrés Ramírez Torres",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "2015-11-18",
  },
  {
    id: 22,
    rut: generateValidRUT(18701234),
    nombre: "Daniela Constanza Medina Rojas",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Prevención",
    estado: "licencia",
    fechaIngreso: "2020-07-05",
  },
  {
    id: 23,
    rut: generateValidRUT(12654387),
    nombre: "Ignacio Patricio Lagos Santander",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "2014-12-13",
  },
  {
    id: 24,
    rut: generateValidRUT(15987654),
    nombre: "Carolina Isabel Paredes Núñez",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "2021-05-28",
  },
  {
    id: 25,
    rut: generateValidRUT(17123456),
    nombre: "Javier Esteban Cornejo Villalobos",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "2018-09-04",
  },
  {
    id: 26,
    rut: generateValidRUT(14567891),
    nombre: "Javiera Antonia Miranda Soto",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "2017-02-16",
  },
  {
    id: 27,
    rut: generateValidRUT(19456783),
    nombre: "Alexis Omar Henríquez Pacheco",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "2016-11-21",
  },
  {
    id: 28,
    rut: generateValidRUT(16789345),
    nombre: "Bárbara Esperanza Valdés Guerrero",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "2019-06-08",
  },
  {
    id: 29,
    rut: generateValidRUT(11876543),
    nombre: "Matías Benjamín Rojas Espinoza",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Materiales Peligrosos",
    estado: "inactivo",
    fechaIngreso: "2020-10-12",
  },
  {
    id: 30,
    rut: generateValidRUT(18234567),
    nombre: "Constanza María Aravena Cortés",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Prevención",
    estado: "activo",
    fechaIngreso: "2022-01-10",
  },
  {
    id: 31,
    rut: generateValidRUT(13987654),
    nombre: "Felipe Andrés Martínez Vidal",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "2019-07-14",
  },
  {
    id: 32,
    rut: generateValidRUT(17654389),
    nombre: "Camila Ignacia Soto Herrera",
    apellidos: "",
    rango: "Bombero Activo",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "2020-09-21",
  },

  // BOMBEROS HONORARIOS (32)
  {
    id: 33,
    rut: generateValidRUT(12345678),
    nombre: "Eduardo Patricio González Silva",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Operaciones Generales",
    estado: "activo",
    fechaIngreso: "1985-03-15",
  },
  {
    id: 34,
    rut: generateValidRUT(23456789),
    nombre: "Isabel María Fernández López",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Administración",
    estado: "activo",
    fechaIngreso: "1988-11-22",
  },
  {
    id: 35,
    rut: generateValidRUT(34567890),
    nombre: "Ricardo Antonio Muñoz Castro",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "1990-07-08",
  },
  {
    id: 36,
    rut: generateValidRUT(45678901),
    nombre: "Gloria Esperanza Rojas Morales",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "1987-05-14",
  },
  {
    id: 37,
    rut: generateValidRUT(56789012),
    nombre: "Sergio Esteban Vargas Díaz",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "1992-12-03",
  },
  {
    id: 38,
    rut: generateValidRUT(67890123),
    nombre: "Rosa Amelia Torres Peña",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "1989-09-18",
  },
  {
    id: 39,
    rut: generateValidRUT(78901234),
    nombre: "Hernán Francisco Sánchez Ramos",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "1991-04-25",
  },
  {
    id: 40,
    rut: generateValidRUT(89012345),
    nombre: "Mónica Elizabeth Jiménez Valle",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "1993-08-12",
  },
  {
    id: 41,
    rut: generateValidRUT(90123456),
    nombre: "Álvaro Sebastián Contreras Bravo",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Prevención",
    estado: "activo",
    fechaIngreso: "1986-01-30",
  },
  {
    id: 42,
    rut: generateValidRUT(10234567),
    nombre: "Lucía Soledad Herrera Campos",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "1994-06-17",
  },
  {
    id: 43,
    rut: generateValidRUT(21345678),
    nombre: "Mario Augusto Espinoza Fuentes",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Operaciones Generales",
    estado: "activo",
    fechaIngreso: "1988-10-05",
  },
  {
    id: 44,
    rut: generateValidRUT(32456789),
    nombre: "Claudia Verónica Mendoza Lagos",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "1990-02-14",
  },
  {
    id: 45,
    rut: generateValidRUT(43567890),
    nombre: "Rodrigo Patricio Navarro Silva",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "1987-07-28",
  },
  {
    id: 46,
    rut: generateValidRUT(54678901),
    nombre: "Fernanda Carolina Ruiz Moreno",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "1991-11-09",
  },
  {
    id: 47,
    rut: generateValidRUT(65789012),
    nombre: "Jaime Leonardo Vega Pinto",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "1989-04-16",
  },
  {
    id: 48,
    rut: generateValidRUT(76890123),
    nombre: "Sandra Patricia Flores Guerrero",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "1992-08-23",
  },
  {
    id: 49,
    rut: generateValidRUT(87901234),
    nombre: "Carlos Andrés Poblete Núñez",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Prevención",
    estado: "activo",
    fechaIngreso: "1985-12-11",
  },
  {
    id: 50,
    rut: generateValidRUT(98012345),
    nombre: "Alejandra Beatriz Soto Ramírez",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "1993-05-07",
  },
  {
    id: 51,
    rut: generateValidRUT(10987654),
    nombre: "Gonzalo Esteban Morales Díaz",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Operaciones Generales",
    estado: "activo",
    fechaIngreso: "1986-09-20",
  },
  {
    id: 52,
    rut: generateValidRUT(21098765),
    nombre: "Marisol Elizabeth Castillo Vega",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "1990-01-25",
  },
  {
    id: 53,
    rut: generateValidRUT(32109876),
    nombre: "Andrés Felipe Lagos Torres",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "1988-06-12",
  },
  {
    id: 54,
    rut: generateValidRUT(43210987),
    nombre: "Patricia Isabel Aravena Muñoz",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "1991-10-18",
  },
  {
    id: 55,
    rut: generateValidRUT(54321098),
    nombre: "Enrique Antonio Cornejo Sánchez",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "1987-03-04",
  },
  {
    id: 56,
    rut: generateValidRUT(65432109),
    nombre: "Verónica Andrea Miranda López",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "1992-07-21",
  },
  {
    id: 57,
    rut: generateValidRUT(76543210),
    nombre: "Pablo Sebastián Henríquez Rojas",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Prevención",
    estado: "activo",
    fechaIngreso: "1989-11-15",
  },
  {
    id: 58,
    rut: generateValidRUT(87654321),
    nombre: "Carolina Soledad Valdés Espinoza",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Combate Incendios",
    estado: "activo",
    fechaIngreso: "1994-02-08",
  },
  {
    id: 59,
    rut: generateValidRUT(98765432),
    nombre: "Luis Alberto Ramírez Contreras",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Operaciones Generales",
    estado: "activo",
    fechaIngreso: "1985-08-26",
  },
  {
    id: 60,
    rut: generateValidRUT(19876543),
    nombre: "Karina Alejandra Medina Herrera",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Primeros Auxilios",
    estado: "activo",
    fechaIngreso: "1990-12-13",
  },
  {
    id: 61,
    rut: generateValidRUT(20987654),
    nombre: "Manuel Ignacio Paredes Fuentes",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate Vehicular",
    estado: "activo",
    fechaIngreso: "1988-04-30",
  },
  {
    id: 62,
    rut: generateValidRUT(31098765),
    nombre: "Ximena Beatriz Bravo Guerrero",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Comunicaciones",
    estado: "activo",
    fechaIngreso: "1991-09-06",
  },
  {
    id: 63,
    rut: generateValidRUT(42109876),
    nombre: "Esteban Francisco Ulloa Martínez",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Rescate en Altura",
    estado: "activo",
    fechaIngreso: "1986-01-19",
  },
  {
    id: 64,
    rut: generateValidRUT(53210987),
    nombre: "Daniela Constanza Campos Vidal",
    apellidos: "",
    rango: "Bombero Honorario",
    especialidad: "Materiales Peligrosos",
    estado: "activo",
    fechaIngreso: "1993-05-27",
  },
];

// Nuevos tipos de citación según especificaciones
const TIPOS_CITACION = [
  "Reunión Ordinaria",
  "Reunión Extraordinaria", 
  "Academia",
  "Ceremonia",
  "Citación de Comandancia",
  "Citación a Consejo de Disciplina",
  "Reunión de Consejeros de Disciplina",
  "Personalizada"
];

interface CitacionFormProps {
  citacion?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function CitacionForm({
  citacion,
  onSave,
  onCancel,
}: CitacionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tipo: "",
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    urgencia: "normal",
    bomberosCitados: [] as number[],
    estado: "borrador",
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    if (citacion) {
      setFormData(citacion);
    }
  }, [citacion]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Si el campo es tipo de citación, aplicar lógica de selección automática
    if (field === "tipo") {
      applyAutoSelection(value);
    }
  };

  // Función para aplicar selección automática según tipo de citación
  const applyAutoSelection = (tipoCitacion: string) => {
    let bomberosCitadosAuto: number[] = [];

    switch (tipoCitacion) {
      case "Reunión Ordinaria":
      case "Reunión Extraordinaria":
      case "Academia":
      case "Ceremonia":
      case "Citación de Comandancia":
        // Seleccionar todos los bomberos de la compañía
        bomberosCitadosAuto = bomberosMock.map(bombero => bombero.id);
        break;
      
      case "Citación a Consejo de Disciplina":
        // Dejar todos desmarcados para selección manual
        bomberosCitadosAuto = [];
        break;
        
      case "Reunión de Consejeros de Disciplina":
        // Seleccionar solo los consejeros de disciplina
        bomberosCitadosAuto = bomberosMock
          .filter(bombero => bombero.rango === "Consejero de Disciplina")
          .map(bombero => bombero.id);
        break;
        
      case "Personalizada":
        // Dejar vacío para selección manual
        bomberosCitadosAuto = [];
        break;
        
      default:
        bomberosCitadosAuto = [];
    }

    setFormData(prev => ({
      ...prev,
      bomberosCitados: bomberosCitadosAuto
    }));
  };

  const handleBomberoToggle = (
    bomberoId: number,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      bomberosCitados: checked
        ? [...prev.bomberosCitados, bomberoId]
        : prev.bomberosCitados.filter((id) => id !== bomberoId),
    }));

    // Limpiar error de selección
    if (errors.bomberosCitados) {
      setErrors((prev) => ({ ...prev, bomberosCitados: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validar tipo de citación
      if (!formData.tipo) {
        newErrors.tipo = "Tipo de citación es requerido";
      }
    }

    if (step === 2) {
      // Validar selección de bomberos
      if (formData.bomberosCitados.length === 0) {
        newErrors.bomberosCitados =
          "Debe seleccionar al menos un bombero";
      }
    }

    if (step === 3) {
      // Validar detalles
      const tituloValidation = validateText(
        formData.titulo,
        "Título",
        100,
      );
      if (!tituloValidation.isValid) {
        newErrors.titulo = tituloValidation.message;
      }

      const fechaValidation = validateFutureDate(
        formData.fecha,
      );
      if (!fechaValidation.isValid) {
        newErrors.fecha = fechaValidation.message;
      }

      if (!formData.hora) {
        newErrors.hora = "Hora es requerida";
      }

      const lugarValidation = validateText(
        formData.lugar,
        "Lugar",
        200,
      );
      if (!lugarValidation.isValid) {
        newErrors.lugar = lugarValidation.message;
      }

      if (formData.descripcion) {
        const descripcionValidation = validateText(
          formData.descripcion,
          "Descripción",
          500,
          false,
        );
        if (!descripcionValidation.isValid) {
          newErrors.descripcion = descripcionValidation.message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (enviar: boolean = false) => {
    if (validateStep(3)) {
      const finalData = {
        ...formData,
        estado: enviar ? "enviada" : "borrador",
      };
      onSave(finalData);
    }
  };

  const bomberosByEstado = {
    activos: bomberosMock.filter((b) => b.estado === "activo"),
    enLicencia: bomberosMock.filter(
      (b) => b.estado === "licencia",
    ),
    inactivos: bomberosMock.filter(
      (b) => b.estado === "inactivo",
    ),
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "text-green-600";
      case "licencia":
        return "text-yellow-600";
      case "inactivo":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const steps = [
    {
      number: 1,
      title: "Tipo de Citación",
      description: "Especifique el tipo de actividad",
    },
    {
      number: 2,
      title: "Seleccionar Bomberos",
      description: "Elija quiénes deben recibir la citación",
    },
    {
      number: 3,
      title: "Detalles",
      description: "Configure fecha, hora y lugar",
    },
    {
      number: 4,
      title: "Revisar y Enviar",
      description: "Confirme la información antes de enviar",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center gap-3 ${index < steps.length - 1 ? "pr-4" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <div className="hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-full h-0.5 mx-4 ${
                  currentStep > step.number
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Contenido de los pasos */}
      <Card>
        <CardHeader>
          <CardTitle>
            Paso {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Paso 1: Tipo de Citación */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">
                  Seleccione el tipo de citación:
                </h3>
                {errors.tipo && (
                  <p className="text-sm text-destructive mb-4">
                    {errors.tipo}
                  </p>
                )}
              </div>

              <RadioGroup
                value={formData.tipo}
                onValueChange={(value) =>
                  handleInputChange("tipo", value)
                }
                className="space-y-4"
              >
                {TIPOS_CITACION.map((tipo) => (
                  <div
                    key={tipo}
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value={tipo}
                      id={`tipo-${tipo}`}
                    />
                    <label
                      htmlFor={`tipo-${tipo}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{tipo}</p>
                        <p className="text-sm text-muted-foreground">
                          {tipo === "Reunión Ordinaria" &&
                            "Reunión regular programada para toda la compañía"}
                          {tipo === "Reunión Extraordinaria" &&
                            "Reunión especial convocada para toda la compañía"}
                          {tipo === "Academia" &&
                            "Actividades de capacitación y entrenamiento para todos"}
                          {tipo === "Ceremonia" &&
                            "Eventos ceremoniales y actos oficiales para toda la compañía"}
                          {tipo === "Citación de Comandancia" &&
                            "Citación oficial desde el comando para toda la compañía"}
                          {tipo === "Citación a Consejo de Disciplina" &&
                            "Citación específica para comparecer ante el consejo"}
                          {tipo === "Reunión de Consejeros de Disciplina" &&
                            "Reunión exclusiva para los consejeros de disciplina"}
                          {tipo === "Personalizada" &&
                            "Citación personalizada para bomberos específicos"}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>

              {formData.tipo && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> {
                      ["Reunión Ordinaria", "Reunión Extraordinaria", "Academia", "Ceremonia", "Citación de Comandancia"].includes(formData.tipo)
                        ? "Se seleccionarán automáticamente todos los bomberos de la compañía en el siguiente paso."
                        : formData.tipo === "Reunión de Consejeros de Disciplina"
                        ? "Se seleccionarán automáticamente todos los consejeros de disciplina en el siguiente paso."
                        : "Podrá seleccionar manualmente los bomberos a citar en el siguiente paso."
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Paso 2: Seleccionar Bomberos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">
                  Seleccione los bomberos a citar:
                </h3>
                {errors.bomberosCitados && (
                  <p className="text-sm text-destructive mb-4">
                    {errors.bomberosCitados}
                  </p>
                )}
              </div>

              {/* Información sobre selección automática */}
              {formData.tipo && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tipo de citación seleccionado:</strong> {formData.tipo}
                    <br />
                    {
                      ["Reunión Ordinaria", "Reunión Extraordinaria", "Academia", "Ceremonia", "Citación de Comandancia"].includes(formData.tipo)
                        ? "✓ Se han seleccionado automáticamente todos los bomberos de la compañía. Puede desmarcar si es necesario."
                        : formData.tipo === "Reunión de Consejeros de Disciplina"
                        ? "✓ Se han seleccionado automáticamente todos los consejeros de disciplina."
                        : "Puede seleccionar manualmente los bomberos que necesite citar."
                    }
                  </p>
                </div>
              )}

              {/* Controles de selección masiva */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const todosBomberos = bomberosMock.map(b => b.id);
                    setFormData(prev => ({ ...prev, bomberosCitados: todosBomberos }));
                  }}
                >
                  Seleccionar Todos
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, bomberosCitados: [] }));
                  }}
                >
                  Deseleccionar Todos
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const activosBomberos = bomberosMock.filter(b => b.estado === "activo").map(b => b.id);
                    setFormData(prev => ({ ...prev, bomberosCitados: activosBomberos }));
                  }}
                >
                  Solo Activos
                </Button>
              </div>

              {/* Cargos Operativos */}
              <div className="space-y-4">
                <h4 className="font-medium text-blue-600">
                  Cargos Operativos (5)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {bomberosMock
                    .filter(b => ["Capitán", "Teniente Primero", "Teniente Segundo", "Teniente Tercero", "Ayudante"].includes(b.rango))
                    .map((bombero) => (
                    <div
                      key={bombero.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`bombero-${bombero.id}`}
                        checked={formData.bomberosCitados.includes(bombero.id)}
                        onCheckedChange={(checked) =>
                          handleBomberoToggle(bombero.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`bombero-${bombero.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bombero.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.rango} - {bombero.especialidad}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-blue-100 text-blue-800">
                              {bombero.rango}
                            </Badge>
                            <Badge className={`${bombero.estado === "activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {bombero.estado}
                            </Badge>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cargos Administrativos */}
              <div className="space-y-4">
                <h4 className="font-medium text-purple-600">
                  Cargos Administrativos (3)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {bomberosMock
                    .filter(b => ["Director", "Tesorero", "Secretario"].includes(b.rango))
                    .map((bombero) => (
                    <div
                      key={bombero.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`bombero-${bombero.id}`}
                        checked={formData.bomberosCitados.includes(bombero.id)}
                        onCheckedChange={(checked) =>
                          handleBomberoToggle(bombero.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`bombero-${bombero.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bombero.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.rango} - {bombero.especialidad}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-purple-100 text-purple-800">
                              {bombero.rango}
                            </Badge>
                            <Badge className={`${bombero.estado === "activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {bombero.estado}
                            </Badge>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consejeros de Disciplina */}
              <div className="space-y-4">
                <h4 className="font-medium text-orange-600">
                  Consejeros de Disciplina (8)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {bomberosMock
                    .filter(b => b.rango === "Consejero de Disciplina")
                    .map((bombero) => (
                    <div
                      key={bombero.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`bombero-${bombero.id}`}
                        checked={formData.bomberosCitados.includes(bombero.id)}
                        onCheckedChange={(checked) =>
                          handleBomberoToggle(bombero.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`bombero-${bombero.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bombero.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.rango} - {bombero.especialidad}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-orange-100 text-orange-800">
                              Consejero
                            </Badge>
                            <Badge className={`${bombero.estado === "activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {bombero.estado}
                            </Badge>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bomberos Activos */}
              <div className="space-y-4">
                <h4 className="font-medium text-green-600">
                  Bomberos Activos (32)
                </h4>
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                  {bomberosMock
                    .filter(b => b.rango === "Bombero Activo")
                    .map((bombero) => (
                    <div
                      key={bombero.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`bombero-${bombero.id}`}
                        checked={formData.bomberosCitados.includes(bombero.id)}
                        onCheckedChange={(checked) =>
                          handleBomberoToggle(bombero.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`bombero-${bombero.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bombero.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.especialidad}
                            </p>
                          </div>
                          <Badge className={`${bombero.estado === "activo" ? "bg-green-100 text-green-800" : bombero.estado === "licencia" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                            {bombero.estado}
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bomberos Honorarios */}
              <div className="space-y-4">
                <h4 className="font-medium text-amber-600">
                  Bomberos Honorarios (32)
                </h4>
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                  {bomberosMock
                    .filter(b => b.rango === "Bombero Honorario")
                    .map((bombero) => (
                    <div
                      key={bombero.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`bombero-${bombero.id}`}
                        checked={formData.bomberosCitados.includes(bombero.id)}
                        onCheckedChange={(checked) =>
                          handleBomberoToggle(bombero.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`bombero-${bombero.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bombero.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.especialidad}
                            </p>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800">
                            Honorario
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total de bomberos seleccionados:</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {formData.bomberosCitados.length} / {bomberosMock.length}
                  </Badge>
                </div>
              </div>
            </div>
          )}



          {/* Paso 3: Detalles */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">
                  Configure los detalles de la citación:
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="titulo">
                    Título de la Citación *
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Ej: Entrenamiento de rescate vehicular"
                    value={formData.titulo}
                    onChange={(e) =>
                      handleInputChange(
                        "titulo",
                        e.target.value,
                      )
                    }
                    className={
                      errors.titulo ? "border-destructive" : ""
                    }
                    maxLength={100}
                  />
                  {errors.titulo && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.titulo}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fecha">Fecha *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) =>
                      handleInputChange("fecha", e.target.value)
                    }
                    className={
                      errors.fecha ? "border-destructive" : ""
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.fecha && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.fecha}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="hora">Hora *</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) =>
                      handleInputChange("hora", e.target.value)
                    }
                    className={
                      errors.hora ? "border-destructive" : ""
                    }
                  />
                  {errors.hora && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.hora}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="lugar">Lugar *</Label>
                  <Input
                    id="lugar"
                    placeholder="Ej: Patio de la Compañía"
                    value={formData.lugar}
                    onChange={(e) =>
                      handleInputChange("lugar", e.target.value)
                    }
                    className={
                      errors.lugar ? "border-destructive" : ""
                    }
                    maxLength={200}
                  />
                  {errors.lugar && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.lugar}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="urgencia">
                    Nivel de Urgencia
                  </Label>
                  <Select
                    value={formData.urgencia}
                    onValueChange={(value) =>
                      handleInputChange("urgencia", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        Normal
                      </SelectItem>
                      <SelectItem value="media">
                        Media
                      </SelectItem>
                      <SelectItem value="alta">
                        Alta (Urgente)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descripcion">
                    Descripción (Opcional)
                  </Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Detalles adicionales sobre la citación..."
                    value={formData.descripcion}
                    onChange={(e) =>
                      handleInputChange(
                        "descripcion",
                        e.target.value,
                      )
                    }
                    className={
                      errors.descripcion
                        ? "border-destructive"
                        : ""
                    }
                    maxLength={500}
                    rows={4}
                  />
                  {errors.descripcion && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.descripcion}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.descripcion.length}/500 caracteres
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Revisar */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">
                  Revisar información antes de enviar:
                </h3>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Resumen de la Citación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Tipo
                        </p>
                        <p className="font-medium">
                          {formData.tipo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Urgencia
                        </p>
                        <Badge
                          className={
                            formData.urgencia === "alta"
                              ? "bg-red-100 text-red-800"
                              : formData.urgencia === "media"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {formData.urgencia === "alta"
                            ? "URGENTE"
                            : formData.urgencia === "media"
                              ? "Media"
                              : "Normal"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Fecha y Hora
                        </p>
                        <p className="font-medium">
                          {new Date(
                            formData.fecha,
                          ).toLocaleDateString("es-CL")}{" "}
                          a las {formData.hora}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Lugar
                        </p>
                        <p className="font-medium">
                          {formData.lugar}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Título
                      </p>
                      <p className="font-medium">
                        {formData.titulo}
                      </p>
                    </div>

                    {formData.descripcion && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Descripción
                        </p>
                        <p>{formData.descripcion}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Bomberos Citados (
                        {formData.bomberosCitados.length})
                      </p>
                      <div className="space-y-2">
                        {formData.bomberosCitados.map((id) => {
                          const bombero = bomberosMock.find(
                            (b) => b.id === id,
                          );
                          return bombero ? (
                            <div
                              key={id}
                              className="flex items-center justify-between p-2 bg-muted rounded"
                            >
                              <span>{bombero.nombre}</span>
                              <Badge
                                className={
                                  bombero.estado === "activo"
                                    ? "bg-green-100 text-green-800"
                                    : bombero.estado ===
                                        "licencia"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {bombero.rango} -{" "}
                                {bombero.estado}
                              </Badge>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Anterior
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleNextStep}>Siguiente</Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit(false)}
              >
                Guardar Borrador
              </Button>
              <Button
                onClick={() => handleSubmit(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Enviar Citación
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}