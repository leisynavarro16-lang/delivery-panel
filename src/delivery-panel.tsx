import React, { useState, useMemo } from 'react';
import { Search, Package, Clock, MapPin, X, Store } from 'lucide-react';

const EntelDeliveryPanel = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');

  // Datos de entregas
  const deliveryData = {
    "I-Tarapacá-Alto Hospicio": {
      regular: "LUNES MIERCOLES VIERNES",
      express: null,
      stores: []
    },
    "I-Tarapacá-Iquique": {
      regular: "24 HRS.",
      express: { pdv: "4581", nombre: "Iquique", horarios: { lv: "11:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 17:00 hrs" }},
      stores: [
        { pdv: "4581", nombre: "Entel Arica", direccion: "Tarapacá 476", horarios: { lv: "09:00 a 19:00", s: "10:00 a 18:00", d: "Cerrado" }},
        { pdv: "4483", nombre: "Entel Iquique", direccion: "La Pampa S/N Esquina Rinconada S/N", horarios: { lv: "09:00 a 18:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "II-Antofagasta-Antofagasta": {
      regular: "48 HRS.",
      express: null,
      stores: [
        { pdv: "4", nombre: "Entel Mall Plaza Antofagasta", direccion: "Av. Balmaceda 2355", horarios: { lv: "09:00 a 19:00", s: "10:00 a 18:00", d: "Cerrado" }},
        { pdv: "4401", nombre: "Entel Antofagasta Paseo Prat", direccion: "Arturo Prat 470-474", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "II-Antofagasta-Calama": {
      regular: "48 HRS.",
      express: { pdv: "4159", nombre: "Calama", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4630", nombre: "Entel Mall Plaza Calama", direccion: "Av. Balmaceda 3240", horarios: { lv: "10:30 a 21:30", s: "10:30 a 21:30", d: "10:30 a 21:30" }}
      ]
    },
    "II-Antofagasta-San Pedro de Atacama": {
      regular: "VIERNES",
      express: null,
      stores: [
        { pdv: "4632", nombre: "Entel San Pedro de Atacama", direccion: "Ignacio Carrera Pinto 400 4B Local 3", horarios: { lv: "09:00 a 14:00 / 15:30 a 19:00", s: "Cerrado", d: "Cerrado" }}
      ]
    },
    "III-Atacama-Copiapo": {
      regular: "24 HRS.",
      express: { pdv: "4861", nombre: "Copiapo", horarios: { lv: "11:00 hrs ; 18:00 hrs", s: "12:00 hrs ; 18:00 hrs" }},
      stores: [
        { pdv: "4861", nombre: "Entel Copiapó", direccion: "Maipu 110 Locales Bs:105/109/113/117/121/127", horarios: { lv: "10:00 a 20:30", s: "10:00 a 20:00", d: "Cerrado" }}
      ]
    },
    "III-Atacama-Vallenar": {
      regular: "MIERCOLES Y VIERNES",
      express: null,
      stores: [
        { pdv: "4862", nombre: "Entel Vallenar", direccion: "Arturo Prat 1251", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "IV-Coquimbo-La Serena": {
      regular: "24 HRS.",
      express: { pdv: "4160", nombre: "La Serena", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 15:00 hrs" }},
      stores: [
        { pdv: "4160", nombre: "Entel La Serena Huanhuali", direccion: "Huanhuali 105", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }},
        { pdv: "4858", nombre: "Entel La Serena Balmaceda", direccion: "Av. Balmaceda 561", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "IV-Coquimbo-Coquimbo": {
      regular: "24 HRS.",
      express: { pdv: "4999", nombre: "Coquimbo", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs; 18:00 hrs" }},
      stores: [
        { pdv: "4999", nombre: "Entel Coquimbo", direccion: "Varela 1524 Mall Vivo Coquimbo", horarios: { lv: "10:00 a 20:00", s: "10:00 a 20:00", d: "10:00 a 21:00" }}
      ]
    },
    "IV-Coquimbo-Ovalle": {
      regular: "24 HRS.",
      express: null,
      stores: [
        { pdv: "4860", nombre: "Entel Ovalle", direccion: "Benjamin Vicuña Mackenna 115", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }}
      ]
    },
    "IX-La Araucanía-Temuco": {
      regular: "24 HRS.",
      express: { pdv: "4613", nombre: "Temuco Alemania", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "3807", nombre: "Entel Valparaíso Montt", direccion: "Arturo Prat 505", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "4613", nombre: "Entel Viña del Mar Coraceros", direccion: "Av. Alemania 610", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }}
      ]
    },
    "IX-La Araucanía-Padre Las Casas": {
      regular: "LUNES MIERCOLES VIERNES",
      express: { pdv: "4613", nombre: "Temuco Alemania", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: []
    },
    "RM-Metropolitana de Santiago-Santiago": {
      regular: "24 HRS.",
      express: { pdv: "395", nombre: "Torre", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 14:00 hrs" }},
      stores: [
        { pdv: "48", nombre: "Entel Morandé", direccion: "Morandé 315", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "395", nombre: "Torre Entel", direccion: "Amunátegui 20 Torre Entel", horarios: { lv: "09:00 a 19:00", s: "Cerrado", d: "Cerrado" }}
      ]
    },
    "RM-Metropolitana de Santiago-Las Condes": {
      regular: "24 HRS.",
      express: { pdv: "45", nombre: "Manquehue", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 15:00 hrs" }},
      stores: [
        { pdv: "45", nombre: "Entel Manquehue", direccion: "Alonso De Córdova 5870 Local 7 Y 11", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }},
        { pdv: "4556", nombre: "Entel Mall Plaza Los Dominicos", direccion: "Av. Padre Hurtado Sur 865 Oficina Bs-1464 Y Bs-1468", horarios: { lv: "Lu-Jue: 10:00 a 20:00 - Vie: 10:30 a 21:00", s: "10:30 a 21:00", d: "11:00 a 20:00" }},
        { pdv: "5123", nombre: "Entel Alto Las Condes", direccion: "Av. Presidente Kennedy 9001 Local 1147", horarios: { lv: "10:00 a 20:30", s: "10:00 a 20:30", d: "10:00 a 20:30" }}
      ]
    },
    "RM-Metropolitana de Santiago-Providencia": {
      regular: "24 HRS.",
      express: { pdv: "45", nombre: "Manquehue", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 15:00 hrs" }},
      stores: [
        { pdv: "4144", nombre: "Entel Luis Thayer Ojeda", direccion: "Av. Luis Thayer Ojeda 0173", horarios: { lv: "10:00 a 14:00 / 15:00 a 19:00", s: "Cerrado", d: "Cerrado" }}
      ]
    },
    "RM-Metropolitana de Santiago-Maipú": {
      regular: "24 HRS.",
      express: { pdv: "5245", nombre: "Maipu plaza", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 14:00 hrs" }},
      stores: [
        { pdv: "4199", nombre: "Entel Maipú", direccion: "Av. Los Pajaritos 1960, Loc. 101", horarios: { lv: "09:00 a 18:00", s: "Cerrado", d: "Cerrado" }},
        { pdv: "5245", nombre: "Entel Maipú Plaza", direccion: "AV. AMÉRICO VESPUCIO 399", horarios: { lv: "10:00 A 20:30", s: "10:00 A 20:30", d: "11:00 A 20:00" }}
      ]
    },
    "RM-Metropolitana de Santiago-La Florida": {
      regular: "24 HRS.",
      express: { pdv: "115", nombre: "Vespucio", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 17:00 hrs" }},
      stores: [
        { pdv: "115", nombre: "Entel Mall Plaza Vespucio", direccion: "Vicuña Mackenna 7110 Mall Plaza Vespucio", horarios: { lv: "10:00 a 20:30", s: "10:00 a 20:30", d: "10:00 a 20:30" }},
        { pdv: "4703", nombre: "Entel Florida Center", direccion: "Vicuña Mackenna 6100 Local 2072 Florida Center", horarios: { lv: "09:00 a 19:00", s: "10:00 a 18:00", d: "Cerrado" }}
      ]
    },
    "V-Valparaíso-Valparaiso": {
      regular: "24 HRS.",
      express: { pdv: "4863", nombre: "Viña arlegui", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4161", nombre: "Entel Valparaíso", direccion: "Pedro Montt 1811", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "V-Valparaíso-Viña del Mar": {
      regular: "24 HRS.",
      express: { pdv: "4863", nombre: "Viña arlegui", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "10", nombre: "Entel e-service Viña del Mar", direccion: "Av. Libertad 1405", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }},
        { pdv: "4756", nombre: "Entel Viña del Mar", direccion: "Av. Libertad 1405 2° Piso E-Service", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }},
        { pdv: "4863", nombre: "Entel Viña Arlegui", direccion: "Arlegui 561", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "V-Valparaíso-Quilpue": {
      regular: "24 HRS.",
      express: { pdv: "4149", nombre: "Quilpue", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 15:00 hrs" }},
      stores: [
        { pdv: "4149", nombre: "Entel Quilpué", direccion: "Diego Portales 822 Local 209 Mall Plaza del Sol", horarios: { lv: "09:30 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }}
      ]
    },
    "V-Valparaíso-San Antonio": {
      regular: "24 HRS.",
      express: { pdv: "5184", nombre: "San Antonio", horarios: { lv: "11:00 hrs ; 18:00 hrs", s: "Cerrado" }},
      stores: [
        { pdv: "5184", nombre: "Entel San Antonio", direccion: "BARROS LUCO 105 MALL ARAUCO SAN ANTONIO PISO 2", horarios: { lv: "10:00 a 19:00", s: "10:00 a 19:00", d: "11:00 a 19:00" }}
      ]
    },
    "VI-Libertador General Bernardo O'Higgins-Rancagua": {
      regular: "24 HRS.",
      express: { pdv: "5126", nombre: "Rancagua", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs; 18:00 hrs" }},
      stores: [
        { pdv: "4161", nombre: "Entel Rancagua", direccion: "Paseo Independencia 486", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "5126", nombre: "Entel Portal Rancagua", direccion: "Carretera del Cobre 750 Local 1101", horarios: { lv: "10:00 a 20:00", s: "10:00 a 20:00", d: "10:00 a 20:00" }}
      ]
    },
    "VII-Maule-Talca": {
      regular: "24 HRS.",
      express: { pdv: "4172", nombre: "Talca", horarios: { lv: "10:00 hrs ; 17:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4172", nombre: "Entel Talca Centro", direccion: "Av. Chacabuco 667", horarios: { lv: "09:00 a 19:00", s: "10:00 a 19:00", d: "Cerrado" }}
      ]
    },
    "VII-Maule-Curico": {
      regular: "24 HRS.",
      express: { pdv: "4165", nombre: "Curico", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4165", nombre: "Entel Curicó", direccion: "Av. Camilo Henríquez 297", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "4628", nombre: "Entel Curicó O'Higgins", direccion: "Av. Bernardo O'Higgins 201 Local 71B", horarios: { lv: "10:00 a 19:00", s: "09:30 a 20:00", d: "10:00 a 20:00" }}
      ]
    },
    "VII-Maule-Linares": {
      regular: "24 HRS.",
      express: { pdv: "4620", nombre: "Linares independencia", horarios: { lv: "11:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 15:00 hrs" }},
      stores: [
        { pdv: "4620", nombre: "Entel Linares", direccion: "Independencia 496", horarios: { lv: "09:00 a 19:00", s: "10:00 a 16:00", d: "Cerrado" }}
      ]
    },
    "VIII-Biobío-Concepcion": {
      regular: "24 HRS.",
      express: { pdv: "25", nombre: "Concepción chacabuco", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 14:00 hrs" }},
      stores: [
        { pdv: "25", nombre: "Entel Concepción Chacabuco", direccion: "Av. Chacabuco 667", horarios: { lv: "09:00 A 19:00", s: "10:00 A 14:00", d: "Cerrado" }},
        { pdv: "4577", nombre: "Entel Concepción O'Higgins", direccion: "Libertador Gral. Bernardo O'Higgins 920", horarios: { lv: "09:00 A 19:00", s: "10:00 A 14:00", d: "Cerrado" }}
      ]
    },
    "VIII-Biobío-Chillan": {
      regular: "24 HRS.",
      express: { pdv: "4169", nombre: "Chillán", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 16:00 hrs" }},
      stores: [
        { pdv: "4169", nombre: "Entel Chillán", direccion: "El Roble 628", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "4651", nombre: "Entel Mall Arauco Chillán", direccion: "El Roble 770 Local 115", horarios: { lv: "10:00 a 20:00", s: "10:00 a 20:00", d: "11:00 a 20:00" }}
      ]
    },
    "VIII-Biobío-Los Angeles": {
      regular: "24 HRS.",
      express: { pdv: "4167", nombre: "Los Ángeles", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4167", nombre: "Entel Los Ángeles", direccion: "Lautaro 350", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }},
        { pdv: "4579", nombre: "Entel Mall Plaza Los Ángeles", direccion: "Illapel 10 Local 230 Mall Paseo Costanera", horarios: { lv: "10:00 a 20:00", s: "10:00 a 20:00", d: "11:00 a 20:00" }}
      ]
    },
    "VIII-Biobío-Talcahuano": {
      regular: "24 HRS.",
      express: { pdv: "4564", nombre: "Talcahuano", horarios: { lv: "12:00 hrs; 18:00 hrs", s: "12:00 hrs ; 18:00 hrs" }},
      stores: [
        { pdv: "4564", nombre: "Entel Talcahuano", direccion: "Av. Pdte. Jorge Alessandri Rodríguez 3177", horarios: { lv: "09:00 a 20:00", s: "10:00 a 19:00", d: "10:00 a 20:00" }}
      ]
    },
    "X-Los Lagos-Osorno": {
      regular: "24 HRS.",
      express: { pdv: "5159", nombre: "Osorno ohiggins", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "5159", nombre: "Entel Osorno O'Higgins", direccion: "Bernardo O'Higgins 577", horarios: { lv: "09:00 a 19:00", s: "Cerrado", d: "Cerrado" }}
      ]
    },
    "X-Los Lagos-Puerto Montt": {
      regular: "48 HRS.",
      express: { pdv: "37", nombre: "Puerto Montt", horarios: { lv: "09:00 hrs ; 18:00 hrs", s: "Cerrado" }},
      stores: [
        { pdv: "37", nombre: "Entel Puerto Montt", direccion: "Benavente 536", horarios: { lv: "09:00 a 19:00", s: "Cerrado", d: "Cerrado" }},
        { pdv: "4568", nombre: "Entel Mall Paseo Costanera", direccion: "Illapel 10 Local 230 Mall Paseo Costanera", horarios: { lv: "10:00 a 20:00", s: "10:00 a 20:00", d: "11:00 a 20:00" }}
      ]
    },
    "XII-Magallanes y de la Antártica Chilena-Punta Arenas": {
      regular: "72 HRS.",
      express: { pdv: "5035", nombre: "Punta Arenas", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "Cerrado" }},
      stores: [
        { pdv: "5035", nombre: "Entel Punta Arenas", direccion: "Lautaro Navarro 957", horarios: { lv: "09:00 a 19:00", s: "Cerrado", d: "Cerrado" }}
      ]
    },
    "XIV-Los Ríos-Valdivia": {
      regular: "24 HRS.",
      express: { pdv: "4569", nombre: "Valdivia Arauco", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 13:00 hrs" }},
      stores: [
        { pdv: "4569", nombre: "Entel Valdivia", direccion: "Arauco 165", horarios: { lv: "09:00 a 19:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    },
    "XV-Arica y Parinacota-Arica": {
      regular: "48 HRS.",
      express: { pdv: "4480", nombre: "Arica", horarios: { lv: "10:00 hrs ; 18:00 hrs", s: "10:00 hrs ; 17:00 hrs" }},
      stores: [
        { pdv: "4480", nombre: "Entel Arauco San Antonio", direccion: "Martínez De Rozas 603", horarios: { lv: "09:00 a 18:00", s: "10:00 a 14:00", d: "Cerrado" }}
      ]
    }
  };

  const regiones = [
    "I - Tarapacá",
    "II - Antofagasta",
    "III - Atacama",
    "IV - Coquimbo",
    "V - Valparaíso",
    "VI - Libertador General Bernardo O'Higgins",
    "VII - Maule",
    "VIII - Biobío",
    "IX - La Araucanía",
    "X - Los Lagos",
    "XI - Aysén del General Carlos Ibáñez del Campo",
    "XII - Magallanes y de la Antártica Chilena",
    "XIV - Los Ríos",
    "XV - Arica y Parinacota",
    "RM - Metropolitana de Santiago"
  ];

  const comunasPorRegion = {
    "I - Tarapacá": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
    "II - Antofagasta": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
    "III - Atacama": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapo", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"],
    "IV - Coquimbo": ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"],
    "V - Valparaíso": ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concon", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmue", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpue", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaiso", "Villa Alemana", "Viña del Mar", "Zapallar"],
    "VI - Libertador General Bernardo O'Higgins": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"],
    "VII - Maule": ["Cauquenes", "Chanco", "Colbún", "Constitucion", "Curepto", "Curico", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"],
    "VIII - Biobío": ["Alto Biobío", "Antuco", "Arauco", "Bulnes", "Cabrero", "Canete", "Chiguayante", "Chillan", "Chillan Viejo", "Cobquecura", "Coelemu", "Coihueco", "Concepcion", "Contulmo", "Coronel", "Curanilahue", "El Carmen", "Florida", "Hualpen", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Angeles", "Lota", "Mulchen", "Nacimiento", "Negrete", "Ninhue", "Ñiquén", "Pemuco", "Penco", "Pinto", "Portezuelo", "Quilaco", "Quilleco", "Quillon", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Nicolás", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tome", "Treguaco", "Tucapel", "Yumbel", "Yungay"],
    "IX - La Araucanía": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautin", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucon", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"],
    "X - Los Lagos": ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullin", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellon", "Quemchi", "Quinchao", "Rio Negro", "San Juan de la Costa", "San Pablo"],
    "XI - Aysén del General Carlos Ibáñez del Campo": ["Aysen", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"],
    "XII - Magallanes y de la Antártica Chilena": ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"],
    "XIV - Los Ríos": ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Mafil", "Paillaco", "Panguipulli", "Rio Bueno", "San Jose de la Mariquina", "Valdivia"],
    "XV - Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
    "RM - Metropolitana de Santiago": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]
  };

  const comunasDisponibles = useMemo(() => {
    if (!selectedRegion) return [];
    return comunasPorRegion[selectedRegion] || [];
  }, [selectedRegion]);

  const deliveryInfo = useMemo(() => {
    if (!selectedRegion || !selectedComuna) return null;
    
    const regionKey = selectedRegion.split(" - ")[0];
    const key = `${regionKey}-${selectedRegion.split(" - ")[1]}-${selectedComuna}`;
    return deliveryData[key] || { regular: "SIN COBERTURA", express: null, stores: [] };
  }, [selectedRegion, selectedComuna]);

  const handleClear = () => {
    setSelectedRegion('');
    setSelectedComuna('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-blue-600 rounded-t-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="w-8 h-8" />
            Panel de Entregas Entel
          </h1>
          <p className="text-blue-100 mt-2">Consulta opciones de entrega para tu región</p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Región
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedComuna('');
                }}
                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Seleccione una región</option>
                {regiones.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comuna
              </label>
              <select
                value={selectedComuna}
                onChange={(e) => setSelectedComuna(e.target.value)}
                disabled={!selectedRegion}
                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Seleccione una comuna</option>
                {comunasDisponibles.map(comuna => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleClear}
                className="w-full p-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Borrar Selección
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {deliveryInfo && (
          <div className="bg-white rounded-b-2xl p-6 shadow-lg space-y-6">
            {/* Delivery Regular */}
            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-900">Delivery Regular</h2>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-lg font-semibold text-gray-800">
                  {deliveryInfo.regular}
                </p>
              </div>
            </div>

            {/* Delivery Express */}
            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-green-900">Delivery Express</h2>
              </div>
              
              {deliveryInfo.express ? (
                <div className="space-y-4">
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center">
                    <p className="text-lg font-bold text-yellow-800">⚡ ENTREGA EN 2 HORAS ⚡</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold text-gray-700">PDV:</span>
                      <span className="text-gray-900">{deliveryInfo.express.pdv}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold text-gray-700">Tienda:</span>
                      <span className="text-gray-900">{deliveryInfo.express.nombre}</span>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-gray-700 mb-2">Horarios:</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Lunes a Viernes:</span> {deliveryInfo.express.horarios.lv}</p>
                        <p><span className="font-medium">Sábado:</span> {deliveryInfo.express.horarios.s}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-gray-600">SIN COBERTURA</p>
                </div>
              )}
            </div>

            {/* Retiro en Tienda */}
            <div className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-purple-900">Retiro en Tienda</h2>
              </div>
              
              {deliveryInfo.stores && deliveryInfo.stores.length > 0 ? (
                <div className="space-y-4">
                  {deliveryInfo.stores.map((store, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-bold text-lg text-gray-900">{store.nombre}</h3>
                          <p className="text-gray-700">{store.direccion}</p>
                          
                          <div className="border-t pt-2 mt-2">
                            <p className="text-sm font-semibold text-gray-700 mb-1">PDV: {store.pdv}</p>
                            <div className="text-sm space-y-1">
                              <p><span className="font-medium">Lunes a Viernes:</span> {store.horarios.lv}</p>
                              <p><span className="font-medium">Sábado:</span> {store.horarios.s}</p>
                              <p><span className="font-medium">Domingo:</span> {store.horarios.d}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-gray-600">No hay tiendas disponibles en esta comuna</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedRegion && !selectedComuna && (
          <div className="bg-white rounded-b-2xl p-12 shadow-lg text-center">
            <Search className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Selecciona una región y comuna para ver las opciones de entrega</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntelDeliveryPanel
