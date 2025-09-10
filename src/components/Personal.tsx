import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { BomberoForm } from "./BomberoForm";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";

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
const calculateYearsOfService = (
  fechaIngreso: string,
): number => {
  const ingreso = new Date(fechaIngreso);
  const now = new Date();
  return Math.floor(
    (now.getTime() - ingreso.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );
};

// Datos mock de bomberos
const bomberosMock = [
  // CARGOS OPERATIVOS (5)
  // Capitán (1)
  {
    id: 1,
    rut: generateValidRUT(15678945),
    nombre: "Carlos Eduardo",
    apellidos: "Silva Mendoza",
    email: "carlos.silva@bomberos.cl",
    telefono: "+56912345001",
    fechaNacimiento: "1965-03-15",
    rango: "Capitán",
    especialidad: "Operaciones Generales",
    region: "Metropolitana",
    comuna: "Santiago",
    direccion: "Av. Libertador 1001",
    estado: "activo",
    fechaIngreso: "1995-02-15",
    anosServicio: calculateYearsOfService("1995-02-15"),
    foto: "",
  },
  // Teniente Primero (1)
  {
    id: 2,
    rut: generateValidRUT(12456789),
    nombre: "Patricia Alejandra",
    apellidos: "Morales Vega",
    email: "patricia.morales@bomberos.cl",
    telefono: "+56912345002",
    fechaNacimiento: "1970-11-22",
    rango: "Teniente Primero",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Providencia",
    direccion: "Los Leones 2234",
    estado: "activo",
    fechaIngreso: "2000-05-10",
    anosServicio: calculateYearsOfService("2000-05-10"),
    foto: "",
  },
  // Teniente Segundo (1)
  {
    id: 3,
    rut: generateValidRUT(16789234),
    nombre: "Juan Carlos",
    apellidos: "Pérez González",
    email: "juan.perez@bomberos.cl",
    telefono: "+56912345003",
    fechaNacimiento: "1975-07-08",
    rango: "Teniente Segundo",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Las Condes",
    direccion: "Apoquindo 4567",
    estado: "activo",
    fechaIngreso: "2005-01-20",
    anosServicio: calculateYearsOfService("2005-01-20"),
    foto: "",
  },
  // Teniente Tercero (1)
  {
    id: 4,
    rut: generateValidRUT(18923456),
    nombre: "María Elena",
    apellidos: "Rodríguez Soto",
    email: "maria.rodriguez@bomberos.cl",
    telefono: "+56912345004",
    fechaNacimiento: "1978-12-03",
    rango: "Teniente Tercero",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Ñuñoa",
    direccion: "Grecia 1890",
    estado: "activo",
    fechaIngreso: "2008-08-15",
    anosServicio: calculateYearsOfService("2008-08-15"),
    foto: "",
  },
  // Ayudante (1)
  {
    id: 5,
    rut: generateValidRUT(14567893),
    nombre: "Roberto Antonio",
    apellidos: "López Herrera",
    email: "roberto.lopez@bomberos.cl",
    telefono: "+56912345005",
    fechaNacimiento: "1980-04-18",
    rango: "Ayudante",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "La Reina",
    direccion: "Príncipe de Gales 7890",
    estado: "activo",
    fechaIngreso: "2010-03-22",
    anosServicio: calculateYearsOfService("2010-03-22"),
    foto: "",
  },

  // CARGOS ADMINISTRATIVOS (3)
  // Director (1)
  {
    id: 6,
    rut: generateValidRUT(19876543),
    nombre: "Ana Patricia",
    apellidos: "Vargas Luna",
    email: "ana.vargas@bomberos.cl",
    telefono: "+56912345006",
    fechaNacimiento: "1968-09-12",
    rango: "Director",
    especialidad: "Administración",
    region: "Metropolitana",
    comuna: "Vitacura",
    direccion: "Nueva Costanera 5432",
    estado: "activo",
    fechaIngreso: "1998-11-05",
    anosServicio: calculateYearsOfService("1998-11-05"),
    foto: "",
  },
  // Tesorero (1)
  {
    id: 7,
    rut: generateValidRUT(13456789),
    nombre: "Miguel Ángel",
    apellidos: "Castillo Muñoz",
    email: "miguel.castillo@bomberos.cl",
    telefono: "+56912345007",
    fechaNacimiento: "1972-01-25",
    rango: "Tesorero",
    especialidad: "Finanzas",
    region: "Metropolitana",
    comuna: "San Miguel",
    direccion: "Gran Avenida 3456",
    estado: "activo",
    fechaIngreso: "2002-07-18",
    anosServicio: calculateYearsOfService("2002-07-18"),
    foto: "",
  },
  // Secretario (1)
  {
    id: 8,
    rut: generateValidRUT(17892345),
    nombre: "Carmen Gloria",
    apellidos: "Jiménez Parra",
    email: "carmen.jimenez@bomberos.cl",
    telefono: "+56912345008",
    fechaNacimiento: "1975-06-14",
    rango: "Secretario",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "La Florida",
    direccion: "Vicuña Mackenna 8901",
    estado: "activo",
    fechaIngreso: "2004-09-30",
    anosServicio: calculateYearsOfService("2004-09-30"),
    foto: "",
  },

  // CONSEJEROS DE DISCIPLINA (8)
  {
    id: 9,
    rut: generateValidRUT(11234567),
    nombre: "Francisco Javier",
    apellidos: "Torres Ramos",
    email: "francisco.torres@bomberos.cl",
    telefono: "+56912345009",
    fechaNacimiento: "1979-10-07",
    rango: "Consejero de Disciplina",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Maipú",
    direccion: "Pajaritos 6789",
    estado: "activo",
    fechaIngreso: "2008-04-12",
    anosServicio: calculateYearsOfService("2008-04-12"),
    foto: "",
  },
  {
    id: 10,
    rut: generateValidRUT(16543289),
    nombre: "Lorena Isabel",
    apellidos: "Contreras Silva",
    email: "lorena.contreras@bomberos.cl",
    telefono: "+56912345010",
    fechaNacimiento: "1973-05-29",
    rango: "Consejero de Disciplina",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Peñalolén",
    direccion: "Tobalaba 4321",
    estado: "activo",
    fechaIngreso: "2005-12-08",
    anosServicio: calculateYearsOfService("2005-12-08"),
    foto: "",
  },
  {
    id: 11,
    rut: generateValidRUT(18765432),
    nombre: "Diego Alejandro",
    apellidos: "Espinoza Rojas",
    email: "diego.espinoza@bomberos.cl",
    telefono: "+56912345011",
    fechaNacimiento: "1983-02-16",
    rango: "Consejero de Disciplina",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Santiago",
    direccion: "Moneda 1234",
    estado: "activo",
    fechaIngreso: "2010-06-15",
    anosServicio: calculateYearsOfService("2010-06-15"),
    foto: "",
  },
  {
    id: 12,
    rut: generateValidRUT(15432167),
    nombre: "Claudia Andrea",
    apellidos: "Bustos Martínez",
    email: "claudia.bustos@bomberos.cl",
    telefono: "+56912345012",
    fechaNacimiento: "1985-08-31",
    rango: "Consejero de Disciplina",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Independencia",
    direccion: "Independencia 5678",
    estado: "activo",
    fechaIngreso: "2012-03-20",
    anosServicio: calculateYearsOfService("2012-03-20"),
    foto: "",
  },
  {
    id: 13,
    rut: generateValidRUT(19876521),
    nombre: "Andrés Felipe",
    apellidos: "Guzmán Vidal",
    email: "andres.guzman@bomberos.cl",
    telefono: "+56912345013",
    fechaNacimiento: "1981-11-09",
    rango: "Consejero de Disciplina",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Recoleta",
    direccion: "Recoleta 9012",
    estado: "activo",
    fechaIngreso: "2009-07-25",
    anosServicio: calculateYearsOfService("2009-07-25"),
    foto: "",
  },
  {
    id: 14,
    rut: generateValidRUT(17654321),
    nombre: "Paola Cristina",
    apellidos: "Muñoz Salinas",
    email: "paola.munoz@bomberos.cl",
    telefono: "+56912345014",
    fechaNacimiento: "1984-04-22",
    rango: "Consejero de Disciplina",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Conchalí",
    direccion: "Vivaceta 3456",
    estado: "activo",
    fechaIngreso: "2011-12-10",
    anosServicio: calculateYearsOfService("2011-12-10"),
    foto: "",
  },
  {
    id: 15,
    rut: generateValidRUT(14321987),
    nombre: "Sergio Esteban",
    apellidos: "Navarro Peña",
    email: "sergio.navarro@gmail.com",
    telefono: "+56912345015",
    fechaNacimiento: "1982-07-05",
    rango: "Consejero de Disciplina",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Quilicura",
    direccion: "Los Aromos 7890",
    estado: "activo",
    fechaIngreso: "2010-09-18",
    anosServicio: calculateYearsOfService("2010-09-18"),
    foto: "",
  },
  {
    id: 16,
    rut: generateValidRUT(12987654),
    nombre: "Valentina María",
    apellidos: "Carrasco Díaz",
    email: "valentina.carrasco@bomberos.cl",
    telefono: "+56912345016",
    fechaNacimiento: "1986-12-18",
    rango: "Consejero de Disciplina",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Huechuraba",
    direccion: "Américo Vespucio 1234",
    estado: "activo",
    fechaIngreso: "2013-05-22",
    anosServicio: calculateYearsOfService("2013-05-22"),
    foto: "",
  },

  // BOMBEROS (64 - divididos entre activos y honorarios según años de servicio)
  {
    id: 17,
    rut: generateValidRUT(17543219),
    nombre: "Fernando José",
    apellidos: "Bravo Ulloa",
    email: "fernando.bravo@bomberos.cl",
    telefono: "+56912345017",
    fechaNacimiento: "1989-07-19",
    rango: "Bombero Activo",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "La Pintana",
    direccion: "Santa Rosa 9012",
    estado: "activo",
    fechaIngreso: "2016-05-30",
    anosServicio: calculateYearsOfService("2016-05-30"),
    foto: "",
  },
  {
    id: 24,
    rut: generateValidRUT(14876523),
    nombre: "Katherine Soledad",
    apellidos: "Vega Campos",
    email: "katherine.vega@bomberos.cl",
    telefono: "+56912345024",
    fechaNacimiento: "1991-03-14",
    rango: "Sargento",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "El Bosque",
    direccion: "Gran Avenida 3456",
    estado: "activo",
    fechaIngreso: "2018-01-15",
    anosServicio: calculateYearsOfService("2018-01-15"),
    foto: "",
  },
  {
    id: 25,
    rut: generateValidRUT(16234578),
    nombre: "Nicolás Eduardo",
    apellidos: "Poblete Sáez",
    email: "nicolas.poblete@gmail.com",
    telefono: "+56912345025",
    fechaNacimiento: "1990-11-08",
    rango: "Sargento",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "San Bernardo",
    direccion: "Eyzaguirre 7890",
    estado: "activo",
    fechaIngreso: "2017-08-22",
    anosServicio: calculateYearsOfService("2017-08-22"),
    foto: "",
  },
  {
    id: 26,
    rut: generateValidRUT(19865432),
    nombre: "Alejandra Beatriz",
    apellidos: "Flores Aguilar",
    email: "alejandra.flores@bomberos.cl",
    telefono: "+56912345026",
    fechaNacimiento: "1992-08-25",
    rango: "Sargento",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Puente Alto",
    direccion: "Concha y Toro 1234",
    estado: "activo",
    fechaIngreso: "2019-03-10",
    anosServicio: calculateYearsOfService("2019-03-10"),
    foto: "",
  },
  {
    id: 27,
    rut: generateValidRUT(13456792),
    nombre: "Marcelo Andrés",
    apellidos: "Ramírez Torres",
    email: "marcelo.ramirez@bomberos.cl",
    telefono: "+56912345027",
    fechaNacimiento: "1988-12-02",
    rango: "Sargento",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Maipú",
    direccion: "Cinco de Abril 5678",
    estado: "activo",
    fechaIngreso: "2015-11-18",
    anosServicio: calculateYearsOfService("2015-11-18"),
    foto: "",
  },
  {
    id: 28,
    rut: generateValidRUT(18701234),
    nombre: "Daniela Constanza",
    apellidos: "Medina Rojas",
    email: "daniela.medina@bomberos.cl",
    telefono: "+56912345028",
    fechaNacimiento: "1993-04-16",
    rango: "Sargento",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Cerrillos",
    direccion: "Cerrillos 9012",
    estado: "licencia",
    fechaIngreso: "2020-07-05",
    anosServicio: calculateYearsOfService("2020-07-05"),
    foto: "",
  },
  {
    id: 29,
    rut: generateValidRUT(12654387),
    nombre: "Ignacio Patricio",
    apellidos: "Lagos Santander",
    email: "ignacio.lagos@bomberos.cl",
    telefono: "+56912345029",
    fechaNacimiento: "1987-09-21",
    rango: "Sargento",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Lo Prado",
    direccion: "San Pablo 3456",
    estado: "activo",
    fechaIngreso: "2014-12-13",
    anosServicio: calculateYearsOfService("2014-12-13"),
    foto: "",
  },
  {
    id: 30,
    rut: generateValidRUT(15987654),
    nombre: "Carolina Isabel",
    apellidos: "Paredes Núñez",
    email: "carolina.paredes@outlook.com",
    telefono: "+56912345030",
    fechaNacimiento: "1994-01-07",
    rango: "Sargento",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Renca",
    direccion: "Domingo Santa María 7890",
    estado: "activo",
    fechaIngreso: "2021-05-28",
    anosServicio: calculateYearsOfService("2021-05-28"),
    foto: "",
  },
  {
    id: 31,
    rut: generateValidRUT(17123456),
    nombre: "Javier Esteban",
    apellidos: "Cornejo Villalobos",
    email: "javier.cornejo@bomberos.cl",
    telefono: "+56912345031",
    fechaNacimiento: "1991-06-12",
    rango: "Sargento",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Cerro Navia",
    direccion: "Las Rejas 1234",
    estado: "activo",
    fechaIngreso: "2018-09-04",
    anosServicio: calculateYearsOfService("2018-09-04"),
    foto: "",
  },
  {
    id: 32,
    rut: generateValidRUT(14567891),
    nombre: "Javiera Antonia",
    apellidos: "Miranda Soto",
    email: "javiera.miranda@bomberos.cl",
    telefono: "+56912345032",
    fechaNacimiento: "1990-10-29",
    rango: "Sargento",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Pudahuel",
    direccion: "San José de la Estrella 5678",
    estado: "activo",
    fechaIngreso: "2017-02-16",
    anosServicio: calculateYearsOfService("2017-02-16"),
    foto: "",
  },
  {
    id: 33,
    rut: generateValidRUT(19456783),
    nombre: "Alexis Omar",
    apellidos: "Henríquez Pacheco",
    email: "alexis.henriquez@bomberos.cl",
    telefono: "+56912345033",
    fechaNacimiento: "1989-05-03",
    rango: "Sargento",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Quilicura",
    direccion: "Matta Sur 9012",
    estado: "activo",
    fechaIngreso: "2016-11-21",
    anosServicio: calculateYearsOfService("2016-11-21"),
    foto: "",
  },
  {
    id: 34,
    rut: generateValidRUT(16789345),
    nombre: "Bárbara Esperanza",
    apellidos: "Valdés Guerrero",
    email: "barbara.valdes@gmail.com",
    telefono: "+56912345034",
    fechaNacimiento: "1992-02-14",
    rango: "Sargento",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Colina",
    direccion: "Esmeralda 3456",
    estado: "activo",
    fechaIngreso: "2019-06-08",
    anosServicio: calculateYearsOfService("2019-06-08"),
    foto: "",
  },
  {
    id: 35,
    rut: generateValidRUT(11876543),
    nombre: "Matías Benjamín",
    apellidos: "Rojas Espinoza",
    email: "matias.rojas@bomberos.cl",
    telefono: "+56912345035",
    fechaNacimiento: "1993-12-20",
    rango: "Sargento",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Tiltil",
    direccion: "Manuel Rodríguez 7890",
    estado: "inactivo",
    fechaIngreso: "2020-10-12",
    anosServicio: calculateYearsOfService("2020-10-12"),
    foto: "",
  },
  {
    id: 36,
    rut: generateValidRUT(18234567),
    nombre: "Constanza María",
    apellidos: "Aravena Cortés",
    email: "constanza.aravena@bomberos.cl",
    telefono: "+56912345036",
    fechaNacimiento: "1995-03-05",
    rango: "Sargento",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Lampa",
    direccion: "Los Aromos 1234",
    estado: "activo",
    fechaIngreso: "2022-01-20",
    anosServicio: calculateYearsOfService("2022-01-20"),
    foto: "",
  },
  {
    id: 37,
    rut: generateValidRUT(15432876),
    nombre: "Esteban Gonzalo",
    apellidos: "Figueroa Villanueva",
    email: "esteban.figueroa@bomberos.cl",
    telefono: "+56912345037",
    fechaNacimiento: "1986-08-18",
    rango: "Sargento",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Melipilla",
    direccion: "Ortúzar 5678",
    estado: "activo",
    fechaIngreso: "2013-07-09",
    anosServicio: calculateYearsOfService("2013-07-09"),
    foto: "",
  },
  {
    id: 38,
    rut: generateValidRUT(12765439),
    nombre: "Rocío Alejandra",
    apellidos: "Cárdenas Moreno",
    email: "rocio.cardenas@bomberos.cl",
    telefono: "+56912345038",
    fechaNacimiento: "1994-11-26",
    rango: "Sargento",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Talagante",
    direccion: "Bernardo O Higgins 9012",
    estado: "activo",
    fechaIngreso: "2021-09-15",
    anosServicio: calculateYearsOfService("2021-09-15"),
    foto: "",
  },
  {
    id: 39,
    rut: generateValidRUT(19876234),
    nombre: "Maximiliano José",
    apellidos: "Sandoval Riquelme",
    email: "maximiliano.sandoval@gmail.com",
    telefono: "+56912345039",
    fechaNacimiento: "1988-04-11",
    rango: "Sargento",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Peñaflor",
    direccion: "Manuel Rodríguez 3456",
    estado: "activo",
    fechaIngreso: "2015-05-03",
    anosServicio: calculateYearsOfService("2015-05-03"),
    foto: "",
  },
  {
    id: 40,
    rut: generateValidRUT(16543278),
    nombre: "Antonia Fernanda",
    apellidos: "Osorio Leiva",
    email: "antonia.osorio@bomberos.cl",
    telefono: "+56912345040",
    fechaNacimiento: "1996-07-23",
    rango: "Sargento",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Isla de Maipo",
    direccion: "Los Carrera 7890",
    estado: "licencia",
    fechaIngreso: "2023-03-18",
    anosServicio: calculateYearsOfService("2023-03-18"),
    foto: "",
  },
  // Cabos (20)
  {
    id: 41,
    rut: generateValidRUT(13987654),
    nombre: "Benjamín Alexander",
    apellidos: "Moreno Garrido",
    email: "benjamin.moreno@bomberos.cl",
    telefono: "+56912345041",
    fechaNacimiento: "1997-01-15",
    rango: "Cabo",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "El Monte",
    direccion: "Libertad 1234",
    estado: "activo",
    fechaIngreso: "2024-02-10",
    anosServicio: calculateYearsOfService("2024-02-10"),
    foto: "",
  },
  {
    id: 42,
    rut: generateValidRUT(17654389),
    nombre: "Isidora Paz",
    apellidos: "Maldonado Ponce",
    email: "isidora.maldonado@bomberos.cl",
    telefono: "+56912345042",
    fechaNacimiento: "1998-06-28",
    rango: "Cabo",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Buin",
    direccion: "Maipú 5678",
    estado: "activo",
    fechaIngreso: "2025-01-05",
    anosServicio: calculateYearsOfService("2025-01-05"),
    foto: "",
  },
  {
    id: 43,
    rut: generateValidRUT(14321876),
    nombre: "Tomás Eduardo",
    apellidos: "Cabrera Núñez",
    email: "tomas.cabrera@bomberos.cl",
    telefono: "+56912345043",
    fechaNacimiento: "1995-09-12",
    rango: "Cabo",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Paine",
    direccion: "Los Héroes 9012",
    estado: "activo",
    fechaIngreso: "2022-08-20",
    anosServicio: calculateYearsOfService("2022-08-20"),
    foto: "",
  },
  {
    id: 44,
    rut: generateValidRUT(18765123),
    nombre: "Valentina Sofía",
    apellidos: "Herrera Zamora",
    email: "valentina.herrera@outlook.com",
    telefono: "+56912345044",
    fechaNacimiento: "1999-02-04",
    rango: "Cabo",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Calera de Tango",
    direccion: "Santa Teresa 3456",
    estado: "activo",
    fechaIngreso: "2024-11-15",
    anosServicio: calculateYearsOfService("2024-11-15"),
    foto: "",
  },
  {
    id: 45,
    rut: generateValidRUT(15876234),
    nombre: "Felipe Ignacio",
    apellidos: "Alvarado Reyes",
    email: "felipe.alvarado@bomberos.cl",
    telefono: "+56912345045",
    fechaNacimiento: "1996-12-17",
    rango: "Cabo",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Pirque",
    direccion: "Los Boldos 7890",
    estado: "activo",
    fechaIngreso: "2023-10-08",
    anosServicio: calculateYearsOfService("2023-10-08"),
    foto: "",
  },
  {
    id: 46,
    rut: generateValidRUT(12456789),
    nombre: "Emilia Carolina",
    apellidos: "Santibáñez Oliva",
    email: "emilia.santibanez@bomberos.cl",
    telefono: "+56912345046",
    fechaNacimiento: "2000-05-30",
    rango: "Cabo",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "San José de Maipo",
    direccion: "Camino al Volcán 1234",
    estado: "activo",
    fechaIngreso: "2024-07-22",
    anosServicio: calculateYearsOfService("2024-07-22"),
    foto: "",
  },
  {
    id: 47,
    rut: generateValidRUT(19234567),
    nombre: "Lucas Matías",
    apellidos: "Peña Jorquera",
    email: "lucas.pena@gmail.com",
    telefono: "+56912345047",
    fechaNacimiento: "1994-08-13",
    rango: "Cabo",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Curacaví",
    direccion: "Yerbas Buenas 5678",
    estado: "inactivo",
    fechaIngreso: "2021-04-18",
    anosServicio: calculateYearsOfService("2021-04-18"),
    foto: "",
  },
  {
    id: 48,
    rut: generateValidRUT(16789123),
    nombre: "Martina Esperanza",
    apellidos: "Morales Jara",
    email: "martina.morales@bomberos.cl",
    telefono: "+56912345048",
    fechaNacimiento: "1997-11-25",
    rango: "Cabo",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "María Pinto",
    direccion: "Los Aromos 9012",
    estado: "activo",
    fechaIngreso: "2024-05-12",
    anosServicio: calculateYearsOfService("2024-05-12"),
    foto: "",
  },
  {
    id: 49,
    rut: generateValidRUT(13654321),
    nombre: "Diego Sebastián",
    apellidos: "Vargas Montenegro",
    email: "diego.vargas@bomberos.cl",
    telefono: "+56912345049",
    fechaNacimiento: "1998-03-08",
    rango: "Cabo",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Alhué",
    direccion: "Los Copihues 3456",
    estado: "activo",
    fechaIngreso: "2025-01-20",
    anosServicio: calculateYearsOfService("2025-01-20"),
    foto: "",
  },
  {
    id: 50,
    rut: generateValidRUT(17891234),
    nombre: "Catalina Esperanza",
    apellidos: "Briones Sepúlveda",
    email: "catalina.briones@bomberos.cl",
    telefono: "+56912345050",
    fechaNacimiento: "1999-10-14",
    rango: "Cabo",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Melipilla",
    direccion: "Los Nogales 7890",
    estado: "activo",
    fechaIngreso: "2024-09-03",
    anosServicio: calculateYearsOfService("2024-09-03"),
    foto: "",
  },
  {
    id: 51,
    rut: generateValidRUT(14567823),
    nombre: "Bastián Alonso",
    apellidos: "Durán Cifuentes",
    email: "bastian.duran@bomberos.cl",
    telefono: "+56912345051",
    fechaNacimiento: "1996-07-01",
    rango: "Cabo",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Padre Hurtado",
    direccion: "Las Palmas 1234",
    estado: "licencia",
    fechaIngreso: "2023-06-18",
    anosServicio: calculateYearsOfService("2023-06-18"),
    foto: "",
  },
  {
    id: 52,
    rut: generateValidRUT(18923456),
    nombre: "Fernanda Javiera",
    apellidos: "Galleguillos Ramos",
    email: "fernanda.galleguillos@outlook.com",
    telefono: "+56912345052",
    fechaNacimiento: "2001-04-19",
    rango: "Cabo",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Peñaflor",
    direccion: "Los Álamos 5678",
    estado: "activo",
    fechaIngreso: "2024-12-10",
    anosServicio: calculateYearsOfService("2024-12-10"),
    foto: "",
  },
  {
    id: 53,
    rut: generateValidRUT(15234678),
    nombre: "Cristóbal Esteban",
    apellidos: "Moya Salazar",
    email: "cristobal.moya@bomberos.cl",
    telefono: "+56912345053",
    fechaNacimiento: "1995-12-06",
    rango: "Cabo",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Talagante",
    direccion: "Los Eucaliptos 9012",
    estado: "activo",
    fechaIngreso: "2022-11-28",
    anosServicio: calculateYearsOfService("2022-11-28"),
    foto: "",
  },
  {
    id: 54,
    rut: generateValidRUT(19654321),
    nombre: "Macarena Belén",
    apellidos: "Acuña Ibarra",
    email: "macarena.acuna@bomberos.cl",
    telefono: "+56912345054",
    fechaNacimiento: "2000-01-22",
    rango: "Cabo",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "El Monte",
    direccion: "Los Pinos 3456",
    estado: "activo",
    fechaIngreso: "2024-08-14",
    anosServicio: calculateYearsOfService("2024-08-14"),
    foto: "",
  },
  {
    id: 55,
    rut: generateValidRUT(16432187),
    nombre: "Agustín Rodrigo",
    apellidos: "Córdoba Villagrán",
    email: "agustin.cordoba@gmail.com",
    telefono: "+56912345055",
    fechaNacimiento: "1997-08-09",
    rango: "Cabo",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Isla de Maipo",
    direccion: "Los Quillayes 7890",
    estado: "activo",
    fechaIngreso: "2024-04-07",
    anosServicio: calculateYearsOfService("2024-04-07"),
    foto: "",
  },
  {
    id: 56,
    rut: generateValidRUT(12789456),
    nombre: "Javiera Constanza",
    apellidos: "Mendoza Calderón",
    email: "javiera.mendoza@bomberos.cl",
    telefono: "+56912345056",
    fechaNacimiento: "1998-05-16",
    rango: "Cabo",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Buin",
    direccion: "Los Boldos 1234",
    estado: "activo",
    fechaIngreso: "2025-02-01",
    anosServicio: calculateYearsOfService("2025-02-01"),
    foto: "",
  },
  {
    id: 57,
    rut: generateValidRUT(18567234),
    nombre: "Mateo Gabriel",
    apellidos: "Quinteros Fuentes",
    email: "mateo.quinteros@bomberos.cl",
    telefono: "+56912345057",
    fechaNacimiento: "1999-09-03",
    rango: "Cabo",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Paine",
    direccion: "Los Maitenes 5678",
    estado: "inactivo",
    fechaIngreso: "2024-06-25",
    anosServicio: calculateYearsOfService("2024-06-25"),
    foto: "",
  },
  {
    id: 58,
    rut: generateValidRUT(15789123),
    nombre: "Josefa Antonia",
    apellidos: "Rivera Cáceres",
    email: "josefa.rivera@bomberos.cl",
    telefono: "+56912345058",
    fechaNacimiento: "2001-11-11",
    rango: "Cabo",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Calera de Tango",
    direccion: "Los Castaños 9012",
    estado: "activo",
    fechaIngreso: "2024-10-17",
    anosServicio: calculateYearsOfService("2024-10-17"),
    foto: "",
  },
  {
    id: 59,
    rut: generateValidRUT(13123456),
    nombre: "Vicente Andrés",
    apellidos: "Lara Espinoza",
    email: "vicente.lara@bomberos.cl",
    telefono: "+56912345059",
    fechaNacimiento: "1996-04-27",
    rango: "Cabo",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Pirque",
    direccion: "Los Robles 3456",
    estado: "activo",
    fechaIngreso: "2023-08-13",
    anosServicio: calculateYearsOfService("2023-08-13"),
    foto: "",
  },
  {
    id: 60,
    rut: generateValidRUT(17345678),
    nombre: "Amanda Esperanza",
    apellidos: "Bello Araya",
    email: "amanda.bello@outlook.com",
    telefono: "+56912345060",
    fechaNacimiento: "2000-12-08",
    rango: "Cabo",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "San José de Maipo",
    direccion: "Los Notros 7890",
    estado: "licencia",
    fechaIngreso: "2024-03-30",
    anosServicio: calculateYearsOfService("2024-03-30"),
    foto: "",
  },
  // Bomberos (20)
  {
    id: 61,
    rut: generateValidRUT(14891234),
    nombre: "Joaquín Esteban",
    apellidos: "Montes Guerrero",
    email: "joaquin.montes@bomberos.cl",
    telefono: "+56912345061",
    fechaNacimiento: "2002-03-12",
    rango: "Bombero",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "María Pinto",
    direccion: "Los Espinos 1234",
    estado: "activo",
    fechaIngreso: "2024-09-01",
    anosServicio: calculateYearsOfService("2024-09-01"),
    foto: "",
  },
  {
    id: 62,
    rut: generateValidRUT(18456789),
    nombre: "Renata Soledad",
    apellidos: "Olivares Contreras",
    email: "renata.olivares@bomberos.cl",
    telefono: "+56912345062",
    fechaNacimiento: "2003-07-25",
    rango: "Bombero",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Curacaví",
    direccion: "Los Lingues 5678",
    estado: "activo",
    fechaIngreso: "2025-01-15",
    anosServicio: calculateYearsOfService("2025-01-15"),
    foto: "",
  },
  {
    id: 63,
    rut: generateValidRUT(15567891),
    nombre: "Simón Alejandro",
    apellidos: "Pizarro Valdés",
    email: "simon.pizarro@gmail.com",
    telefono: "+56912345063",
    fechaNacimiento: "2001-12-19",
    rango: "Bombero",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Alhué",
    direccion: "Los Laureles 9012",
    estado: "activo",
    fechaIngreso: "2024-11-08",
    anosServicio: calculateYearsOfService("2024-11-08"),
    foto: "",
  },
  {
    id: 64,
    rut: generateValidRUT(19123456),
    nombre: "Esperanza María",
    apellidos: "Carvajal Huerta",
    email: "esperanza.carvajal@bomberos.cl",
    telefono: "+56912345064",
    fechaNacimiento: "2004-02-06",
    rango: "Bombero",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Padre Hurtado",
    direccion: "Los Cerezos 3456",
    estado: "activo",
    fechaIngreso: "2024-12-20",
    anosServicio: calculateYearsOfService("2024-12-20"),
    foto: "",
  },
  {
    id: 65,
    rut: generateValidRUT(16234567),
    nombre: "Nicolás Ignacio",
    apellidos: "Salinas Moreno",
    email: "nicolas.salinas@bomberos.cl",
    telefono: "+56912345065",
    fechaNacimiento: "2000-08-14",
    rango: "Bombero",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Melipilla",
    direccion: "Los Avellanos 7890",
    estado: "activo",
    fechaIngreso: "2024-07-05",
    anosServicio: calculateYearsOfService("2024-07-05"),
    foto: "",
  },
  {
    id: 66,
    rut: generateValidRUT(12678934),
    nombre: "Florencia Andrea",
    apellidos: "Sandoval Peña",
    email: "florencia.sandoval@outlook.com",
    telefono: "+56912345066",
    fechaNacimiento: "2003-04-29",
    rango: "Bombero",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Talagante",
    direccion: "Los Manzanos 1234",
    estado: "inactivo",
    fechaIngreso: "2024-05-18",
    anosServicio: calculateYearsOfService("2024-05-18"),
    foto: "",
  },
  {
    id: 67,
    rut: generateValidRUT(17789123),
    nombre: "Salvador Antonio",
    apellidos: "Figueroa Lemus",
    email: "salvador.figueroa@bomberos.cl",
    telefono: "+56912345067",
    fechaNacimiento: "2002-09-07",
    rango: "Bombero",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "El Monte",
    direccion: "Los Acacios 5678",
    estado: "activo",
    fechaIngreso: "2024-08-28",
    anosServicio: calculateYearsOfService("2024-08-28"),
    foto: "",
  },
  {
    id: 68,
    rut: generateValidRUT(14345678),
    nombre: "Colomba Valentina",
    apellidos: "Henríquez Flores",
    email: "colomba.henriquez@bomberos.cl",
    telefono: "+56912345068",
    fechaNacimiento: "2001-06-21",
    rango: "Bombero",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "Buin",
    direccion: "Los Duraznos 9012",
    estado: "activo",
    fechaIngreso: "2024-10-12",
    anosServicio: calculateYearsOfService("2024-10-12"),
    foto: "",
  },
  {
    id: 69,
    rut: generateValidRUT(18901234),
    nombre: "Emilio Rodrigo",
    apellidos: "Castro Villalobos",
    email: "emilio.castro@bomberos.cl",
    telefono: "+56912345069",
    fechaNacimiento: "2004-01-15",
    rango: "Bombero",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Paine",
    direccion: "Los Membrillos 3456",
    estado: "activo",
    fechaIngreso: "2025-02-05",
    anosServicio: calculateYearsOfService("2025-02-05"),
    foto: "",
  },
  {
    id: 70,
    rut: generateValidRUT(15456789),
    nombre: "Pascale Antonia",
    apellidos: "Morales Jofré",
    email: "pascale.morales@gmail.com",
    telefono: "+56912345070",
    fechaNacimiento: "2002-11-03",
    rango: "Bombero",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Calera de Tango",
    direccion: "Los Ciruelos 7890",
    estado: "licencia",
    fechaIngreso: "2024-06-14",
    anosServicio: calculateYearsOfService("2024-06-14"),
    foto: "",
  },
  {
    id: 71,
    rut: generateValidRUT(19567891),
    nombre: "Bruno Sebastián",
    apellidos: "Reyes Gallardo",
    email: "bruno.reyes@bomberos.cl",
    telefono: "+56912345071",
    fechaNacimiento: "2003-05-18",
    rango: "Bombero",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Pirque",
    direccion: "Los Olivos 1234",
    estado: "activo",
    fechaIngreso: "2024-12-02",
    anosServicio: calculateYearsOfService("2024-12-02"),
    foto: "",
  },
  {
    id: 72,
    rut: generateValidRUT(16678912),
    nombre: "Isabella María",
    apellidos: "Núñez Arenas",
    email: "isabella.nunez@bomberos.cl",
    telefono: "+56912345072",
    fechaNacimiento: "2000-10-26",
    rango: "Bombero",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "San José de Maipo",
    direccion: "Los Boldos 5678",
    estado: "activo",
    fechaIngreso: "2024-04-22",
    anosServicio: calculateYearsOfService("2024-04-22"),
    foto: "",
  },
  {
    id: 73,
    rut: generateValidRUT(13789123),
    nombre: "Alexander José",
    apellidos: "Paredes Quiroz",
    email: "alexander.paredes@bomberos.cl",
    telefono: "+56912345073",
    fechaNacimiento: "2001-03-09",
    rango: "Bombero",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "Isla de Maipo",
    direccion: "Los Nogales 9012",
    estado: "activo",
    fechaIngreso: "2024-09-16",
    anosServicio: calculateYearsOfService("2024-09-16"),
    foto: "",
  },
  {
    id: 74,
    rut: generateValidRUT(17234567),
    nombre: "Amelia Constanza",
    apellidos: "Ulloa Herrera",
    email: "amelia.ulloa@outlook.com",
    telefono: "+56912345074",
    fechaNacimiento: "2004-07-04",
    rango: "Bombero",
    especialidad: "Materiales Peligrosos",
    region: "Metropolitana",
    comuna: "Peñaflor",
    direccion: "Los Álamos 3456",
    estado: "inactivo",
    fechaIngreso: "2024-11-29",
    anosServicio: calculateYearsOfService("2024-11-29"),
    foto: "",
  },
  {
    id: 75,
    rut: generateValidRUT(14567823),
    nombre: "Álvaro Patricio",
    apellidos: "Medina Aguilera",
    email: "alvaro.medina@bomberos.cl",
    telefono: "+56912345075",
    fechaNacimiento: "2002-12-12",
    rango: "Bombero",
    especialidad: "Combate Incendios",
    region: "Metropolitana",
    comuna: "María Pinto",
    direccion: "Los Tilos 7890",
    estado: "activo",
    fechaIngreso: "2024-08-07",
    anosServicio: calculateYearsOfService("2024-08-07"),
    foto: "",
  },
  {
    id: 76,
    rut: generateValidRUT(18345679),
    nombre: "Dominga Esperanza",
    apellidos: "Saavedra Torres",
    email: "dominga.saavedra@bomberos.cl",
    telefono: "+56912345076",
    fechaNacimiento: "2003-09-28",
    rango: "Bombero",
    especialidad: "Primeros Auxilios",
    region: "Metropolitana",
    comuna: "Curacaví",
    direccion: "Los Pellines 1234",
    estado: "activo",
    fechaIngreso: "2025-01-25",
    anosServicio: calculateYearsOfService("2025-01-25"),
    foto: "",
  },
  {
    id: 77,
    rut: generateValidRUT(15678923),
    nombre: "Patricio Emanuel",
    apellidos: "Bravo Zúñiga",
    email: "patricio.bravo@gmail.com",
    telefono: "+56912345077",
    fechaNacimiento: "2001-01-16",
    rango: "Bombero",
    especialidad: "Comunicaciones",
    region: "Metropolitana",
    comuna: "Alhué",
    direccion: "Los Paltos 5678",
    estado: "activo",
    fechaIngreso: "2024-07-31",
    anosServicio: calculateYearsOfService("2024-07-31"),
    foto: "",
  },
  {
    id: 78,
    rut: generateValidRUT(19789234),
    nombre: "Antonia Belén",
    apellidos: "Rivera Campos",
    email: "antonia.rivera@bomberos.cl",
    telefono: "+56912345078",
    fechaNacimiento: "2000-06-05",
    rango: "Bombero",
    especialidad: "Rescate Vehicular",
    region: "Metropolitana",
    comuna: "Padre Hurtado",
    direccion: "Los Coigües 9012",
    estado: "licencia",
    fechaIngreso: "2024-03-19",
    anosServicio: calculateYearsOfService("2024-03-19"),
    foto: "",
  },
  {
    id: 79,
    rut: generateValidRUT(16891234),
    nombre: "Maximiliano Andrés",
    apellidos: "González Cornejo",
    email: "maximiliano.gonzalez@bomberos.cl",
    telefono: "+56912345079",
    fechaNacimiento: "2004-04-13",
    rango: "Bombero",
    especialidad: "Rescate en Altura",
    region: "Metropolitana",
    comuna: "Talagante",
    direccion: "Los Quillayes 3456",
    estado: "activo",
    fechaIngreso: "2024-12-15",
    anosServicio: calculateYearsOfService("2024-12-15"),
    foto: "",
  },
  {
    id: 80,
    rut: generateValidRUT(13234567),
    nombre: "Sofía Esperanza",
    apellidos: "Vásquez Moreno",
    email: "sofia.vasquez@bomberos.cl",
    telefono: "+56912345080",
    fechaNacimiento: "2002-08-31",
    rango: "Bombero",
    especialidad: "Prevención",
    region: "Metropolitana",
    comuna: "El Monte",
    direccion: "Los Avellanos 7890",
    estado: "activo",
    fechaIngreso: "2024-10-28",
    anosServicio: calculateYearsOfService("2024-10-28"),
    foto: "",
  },
].map((bombero) => {
  const anos = calculateYearsOfService(bombero.fechaIngreso);
  // Ajustar rango para bomberos según años de servicio
  let rangoFinal = bombero.rango;
  if (
    bombero.rango === "Sargento" ||
    bombero.rango === "Cabo" ||
    bombero.rango === "Bombero"
  ) {
    if (anos >= 10) {
      rangoFinal = "Bombero Honorario";
    } else {
      rangoFinal = "Bombero Activo";
    }
  }
  return {
    ...bombero,
    rango: rangoFinal,
    anosServicio: anos,
  };
});

interface PersonalProps {
  onNavigate: (page: string) => void;
}

export function Personal({ onNavigate }: PersonalProps) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bomberos, setBomberos] = useState(bomberosMock);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [filterRango, setFilterRango] = useState(searchParams.get('rango') || "all");
  const [filterEspecialidad, setFilterEspecialidad] =
    useState(searchParams.get('especialidad') || "all");
  const [filterEstado, setFilterEstado] = useState(searchParams.get('estado') || "all");
  const [showForm, setShowForm] = useState(false);
  const [selectedBombero, setSelectedBombero] =
    useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">(
    searchParams.get('view') as "grid" | "table" || "grid",
  );

  // Actualizar URL con filtros
  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Configurar breadcrumbs
  const breadcrumbItems = [
    { label: 'Personal', current: !id },
    ...(id ? [{ label: `Bombero #${id}`, current: true }] : [])
  ];

  // Filtrar bomberos
  const filteredBomberos = bomberos.filter((bombero) => {
    const matchesSearch =
      bombero.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      bombero.apellidos
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      bombero.rut.includes(searchTerm) ||
      bombero.especialidad
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRango =
      filterRango === "all" || bombero.rango === filterRango;
    const matchesEspecialidad =
      filterEspecialidad === "all" ||
      bombero.especialidad === filterEspecialidad;
    const matchesEstado =
      filterEstado === "all" || bombero.estado === filterEstado;

    return (
      matchesSearch &&
      matchesRango &&
      matchesEspecialidad &&
      matchesEstado
    );
  });

  const handleSaveBombero = (bomberoData: any) => {
    if (selectedBombero) {
      // Editar bombero existente
      setBomberos((prev) =>
        prev.map((b) =>
          b.id === selectedBombero.id
            ? { ...bomberoData, id: selectedBombero.id }
            : b,
        ),
      );
    } else {
      // Agregar nuevo bombero
      const newBombero = {
        ...bomberoData,
        id: Math.max(...bomberos.map((b) => b.id)) + 1,
        fechaIngreso: new Date().toISOString().split("T")[0],
        anosServicio: 0,
      };
      setBomberos((prev) => [...prev, newBombero]);
    }
    setShowForm(false);
    setSelectedBombero(null);
  };

  const handleEdit = (bombero: any) => {
    setSelectedBombero(bombero);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setBomberos((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleEstado = (id: number) => {
    setBomberos((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              estado:
                b.estado === "activo" ? "inactivo" : "activo",
            }
          : b,
      ),
    );
  };

  const getInitials = (nombre: string, apellidos: string) => {
    return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-green-100 text-green-800";
      case "inactivo":
        return "bg-red-100 text-red-800";
      case "licencia":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRangoColor = (rango: string) => {
    switch (rango) {
      // Cargos Operativos
      case "Capitán":
        return "bg-purple-100 text-purple-800";
      case "Teniente Primero":
        return "bg-blue-100 text-blue-800";
      case "Teniente Segundo":
        return "bg-indigo-100 text-indigo-800";
      case "Teniente Tercero":
        return "bg-cyan-100 text-cyan-800";
      case "Ayudante":
        return "bg-teal-100 text-teal-800";
      // Cargos Administrativos
      case "Director":
        return "bg-red-100 text-red-800";
      case "Tesorero":
        return "bg-orange-100 text-orange-800";
      case "Secretario":
        return "bg-amber-100 text-amber-800";
      // Consejeros de Disciplina
      case "Consejero de Disciplina":
        return "bg-emerald-100 text-emerald-800";
      // Bomberos
      case "Bombero Activo":
        return "bg-green-100 text-green-800";
      case "Bombero Honorario":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Navegación Breadcrumb */}
      <BreadcrumbNavigation items={breadcrumbItems} onNavigate={onNavigate} />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Gestión de Personal
          </h1>
          <p className="text-muted-foreground">
            Administre la información de todos los bomberos de
            la compañía
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedBombero(null);
            setShowForm(true);
          }}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Bombero
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, RUT o especialidad..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateSearchParams('search', e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={filterRango}
                onValueChange={setFilterRango}
              >
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Capitán">
                    Capitán
                  </SelectItem>
                  <SelectItem value="Teniente Primero">
                    Teniente Primero
                  </SelectItem>
                  <SelectItem value="Teniente Segundo">
                    Teniente Segundo
                  </SelectItem>
                  <SelectItem value="Teniente Tercero">
                    Teniente Tercero
                  </SelectItem>
                  <SelectItem value="Ayudante">
                    Ayudante
                  </SelectItem>
                  <SelectItem value="Director">
                    Director
                  </SelectItem>
                  <SelectItem value="Tesorero">
                    Tesorero
                  </SelectItem>
                  <SelectItem value="Secretario">
                    Secretario
                  </SelectItem>
                  <SelectItem value="Consejero de Disciplina">
                    Consejero de Disciplina
                  </SelectItem>
                  <SelectItem value="Bombero Activo">
                    Bombero Activo
                  </SelectItem>
                  <SelectItem value="Bombero Honorario">
                    Bombero Honorario
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterEspecialidad}
                onValueChange={setFilterEspecialidad}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Combate Incendios">
                    Combate Incendios
                  </SelectItem>
                  <SelectItem value="Rescate Vehicular">
                    Rescate Vehicular
                  </SelectItem>
                  <SelectItem value="Primeros Auxilios">
                    Primeros Auxilios
                  </SelectItem>
                  <SelectItem value="Materiales Peligrosos">
                    Materiales Peligrosos
                  </SelectItem>
                  <SelectItem value="Rescate en Altura">
                    Rescate en Altura
                  </SelectItem>
                  <SelectItem value="Comunicaciones">
                    Comunicaciones
                  </SelectItem>
                  <SelectItem value="Prevención">
                    Prevención
                  </SelectItem>
                  <SelectItem value="Operaciones Generales">
                    Operaciones Generales
                  </SelectItem>
                  <SelectItem value="Administración">
                    Administración
                  </SelectItem>
                  <SelectItem value="Finanzas">
                    Finanzas
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterEstado}
                onValueChange={setFilterEstado}
              >
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">
                    Inactivo
                  </SelectItem>
                  <SelectItem value="licencia">
                    Licencia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredBomberos.length} de{" "}
          {bomberos.length} bomberos
        </p>
        <div className="flex gap-2">
          <Button
            variant={
              viewMode === "grid" ? "default" : "outline"
            }
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={
              viewMode === "table" ? "default" : "outline"
            }
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Tabla
          </Button>
        </div>
      </div>

      {/* Vista Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBomberos.map((bombero) => (
            <Card
              key={bombero.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarImage src={bombero.foto} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(
                        bombero.nombre,
                        bombero.apellidos,
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      {bombero.nombre} {bombero.apellidos}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {bombero.rut}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Badge
                      className={getRangoColor(bombero.rango)}
                    >
                      {bombero.rango}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      🚒 {bombero.especialidad}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📅 {bombero.anosServicio} años servicio
                    </p>
                    <Badge
                      className={getEstadoColor(bombero.estado)}
                    >
                      {bombero.estado === "activo"
                        ? "🟢 Activo"
                        : bombero.estado === "licencia"
                          ? "🟡 Licencia"
                          : "🔴 Inactivo"}
                    </Badge>
                  </div>

                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleEdit(bombero)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toggleEstado(bombero.id)
                          }
                        >
                          {bombero.estado === "activo" ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(bombero.id)
                          }
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vista Tabla */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium">
                      Bombero
                    </th>
                    <th className="text-left p-4 font-medium">
                      RUT
                    </th>
                    <th className="text-left p-4 font-medium">
                      Rango
                    </th>
                    <th className="text-left p-4 font-medium">
                      Especialidad
                    </th>
                    <th className="text-left p-4 font-medium">
                      Contacto
                    </th>
                    <th className="text-left p-4 font-medium">
                      Estado
                    </th>
                    <th className="text-left p-4 font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBomberos.map((bombero) => (
                    <tr
                      key={bombero.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={bombero.foto} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {getInitials(
                                bombero.nombre,
                                bombero.apellidos,
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {bombero.nombre}{" "}
                              {bombero.apellidos}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {bombero.anosServicio} años
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{bombero.rut}</td>
                      <td className="p-4">
                        <Badge
                          className={getRangoColor(
                            bombero.rango,
                          )}
                        >
                          {bombero.rango}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {bombero.especialidad}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {bombero.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {bombero.telefono}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={getEstadoColor(
                            bombero.estado,
                          )}
                        >
                          {bombero.estado === "activo"
                            ? "Activo"
                            : bombero.estado === "licencia"
                              ? "Licencia"
                              : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleEdit(bombero)
                              }
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toggleEstado(bombero.id)
                              }
                            >
                              {bombero.estado === "activo" ? (
                                <>
                                  <UserX className="w-4 h-4 mr-2" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(bombero.id)
                              }
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diálogo del formulario */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedBombero
                ? "Editar Bombero"
                : "Nuevo Bombero"}
            </DialogTitle>
          </DialogHeader>
          <BomberoForm
            bombero={selectedBombero}
            onSave={handleSaveBombero}
            onCancel={() => {
              setShowForm(false);
              setSelectedBombero(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}