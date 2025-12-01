import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Store, Truck, Package, X } from 'lucide-react';

const DeliveryPanel = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');

  // Datos de entregas
  const deliveryData = [
    // Región I - Tarapacá
    { region: "I Tarapacá", comuna: "Alto Hospicio", deliveryRegular: "LUNES MIERCOLES VIERNES", pdv: "", nombrePdv: "", expressWeekday: "", expressSaturday: "", tienda: "Entel Alto Hospicio", direccion: "La Pampa S/N Esquina Rinconada S/N", horarioWeekday: "09:00 a 18:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4483" },
    { region: "I Tarapacá", comuna: "Iquique", deliveryRegular: "24 HRS.", pdv: "4581", nombrePdv: "Iquique", expressWeekday: "11:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Arica", direccion: "Tarapacá 476", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 18:00", horarioSunday: "Cerrado", pdvTienda: "4581" },
    
    // Región II - Antofagasta
    { region: "II Antofagasta", comuna: "Antofagasta", deliveryRegular: "48 HRS.", pdv: "4", nombrePdv: "Antofagasta", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Mall Plaza Antofagasta", direccion: "Av. Balmaceda 2355", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 18:00", horarioSunday: "Cerrado", pdvTienda: "4" },
    { region: "II Antofagasta", comuna: "Antofagasta", deliveryRegular: "48 HRS.", pdv: "4", nombrePdv: "Antofagasta", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Antofagasta Paseo Prat", direccion: "Arturo Prat 470-474", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4401" },
    { region: "II Antofagasta", comuna: "Calama", deliveryRegular: "48 HRS.", pdv: "4159", nombrePdv: "Calama", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Mall Plaza Calama", direccion: "Av. Balmaceda 3240", horarioWeekday: "10:30 a 21:30", horarioSaturday: "10:30 a 21:30", horarioSunday: "10:30 a 21:30", pdvTienda: "4630" },
    { region: "II Antofagasta", comuna: "San Pedro de Atacama", deliveryRegular: "VIERNES", pdv: "", nombrePdv: "", expressWeekday: "", expressSaturday: "", tienda: "Entel San Pedro de Atacama", direccion: "Ignacio Carrera Pinto 400 4B Local 3", horarioWeekday: "09:00 a 14:00 / 15:30 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4632" },
    
    // Región III - Atacama
    { region: "III Atacama", comuna: "Copiapo", deliveryRegular: "24 HRS.", pdv: "4861", nombrePdv: "Copiapo", expressWeekday: "11:00 hrs ; 18:00 hrs", expressSaturday: "12:00 hrs ; 18:00 hrs", tienda: "Entel Copiapó", direccion: "Maipu 110 Locales Bs:105/109/113/117/121/127", horarioWeekday: "10:00 a 20:30", horarioSaturday: "10:00 a 20:00", horarioSunday: "Cerrado", pdvTienda: "4861" },
    { region: "III Atacama", comuna: "Vallenar", deliveryRegular: "MIERCOLES Y VIERNES", pdv: "", nombrePdv: "", expressWeekday: "", expressSaturday: "", tienda: "Entel Vallenar", direccion: "Arturo Prat 1251", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4862" },
    
    // Región IV - Coquimbo
    { region: "IV Coquimbo", comuna: "Coquimbo", deliveryRegular: "24 HRS.", pdv: "4999", nombrePdv: "Coquimbo", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs; 18:00 hrs", tienda: "Entel Coquimbo", direccion: "Varela 1524 Mall Vivo Coquimbo", horarioWeekday: "10:00 a 20:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "10:00 a 21:00", pdvTienda: "4999" },
    { region: "IV Coquimbo", comuna: "La Serena", deliveryRegular: "24 HRS.", pdv: "4160", nombrePdv: "La Serena", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel La Serena Huanhuali", direccion: "Huanhuali 105", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4160" },
    { region: "IV Coquimbo", comuna: "La Serena", deliveryRegular: "24 HRS.", pdv: "4160", nombrePdv: "La Serena", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel La Serena Balmaceda", direccion: "Av. Balmaceda 561", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4858" },
    { region: "IV Coquimbo", comuna: "Ovalle", deliveryRegular: "24 HRS.", pdv: "", nombrePdv: "", expressWeekday: "", expressSaturday: "", tienda: "Entel Ovalle", direccion: "Benjamin Vicuña Mackenna 115", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4860" },
    
    // Región IX - La Araucanía
    { region: "IX La Araucanía", comuna: "Temuco", deliveryRegular: "24 HRS.", pdv: "4613", nombrePdv: "Temuco Alemania", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Temuco Prat", direccion: "Arturo Prat 505", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4919" },
    { region: "IX La Araucanía", comuna: "Temuco", deliveryRegular: "24 HRS.", pdv: "4613", nombrePdv: "Temuco Alemania", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Temuco Alemania", direccion: "Av. Alemania 610", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4613" },
    { region: "IX La Araucanía", comuna: "Padre Las Casas", deliveryRegular: "LUNES MIERCOLES VIERNES", pdv: "4613", nombrePdv: "Temuco Alemania", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "", direccion: "", horarioWeekday: "", horarioSaturday: "", horarioSunday: "", pdvTienda: "" },
    
    // Región Metropolitana
    { region: "RM Metropolitana de Santiago", comuna: "Santiago", deliveryRegular: "24 HRS.", pdv: "395", nombrePdv: "Torre", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Morandé", direccion: "Morandé 315", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "48" },
    { region: "RM Metropolitana de Santiago", comuna: "Santiago", deliveryRegular: "24 HRS.", pdv: "395", nombrePdv: "Torre", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Torre Entel", direccion: "Amunátegui 20 Torre Entel", horarioWeekday: "09:00 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "395" },
    { region: "RM Metropolitana de Santiago", comuna: "Cerrillos", deliveryRegular: "24 HRS.", pdv: "395", nombrePdv: "Torre", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "", direccion: "", horarioWeekday: "", horarioSaturday: "", horarioSunday: "", pdvTienda: "" },
    { region: "RM Metropolitana de Santiago", comuna: "Estación Central", deliveryRegular: "24 HRS.", pdv: "395", nombrePdv: "Torre", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Mall Plaza Oeste", direccion: "Av. Américo Vespucio 1501", horarioWeekday: "10:00 a 19:30", horarioSaturday: "10:00 a 14:00 / 15:00 a 19:30", horarioSunday: "10:00 a 14:00", pdvTienda: "4551" },
    { region: "RM Metropolitana de Santiago", comuna: "Estación Central", deliveryRegular: "24 HRS.", pdv: "395", nombrePdv: "Torre", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Estación Central", direccion: "San Francisco De Borja 122, Loc. B-183", horarioWeekday: "10:00 a 19:00", horarioSaturday: "09:30 a 17:00", horarioSunday: "09:30 a 17:00", pdvTienda: "5010" },
    { region: "RM Metropolitana de Santiago", comuna: "Huechuraba", deliveryRegular: "24 HRS.", pdv: "4557", nombrePdv: "Plaza norte", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Mall Plaza Norte", direccion: "Av. Américo Vespucio 1737 B1028 / B1032 / B1036 Mall Plaza Norte", horarioWeekday: "Lu-Jue: 10:00 a 20:00 - Vie: 10:30 a 21:00", horarioSaturday: "10:30 a 21:00", horarioSunday: "11:00 a 20:00", pdvTienda: "4557" },
    { region: "RM Metropolitana de Santiago", comuna: "La Cisterna", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Intermodal La Cisterna", direccion: "Av. Américo Vespucio 33", horarioWeekday: "09:00 a 18:30", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "5008" },
    { region: "RM Metropolitana de Santiago", comuna: "La Florida", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Froilán Roa", direccion: "Froilán Roa 750", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 18:00", horarioSunday: "Cerrado", pdvTienda: "115" },
    { region: "RM Metropolitana de Santiago", comuna: "La Florida", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Florida Center", direccion: "Vicuña Mackenna 6100 Local 2072 Florida Center", horarioWeekday: "10:00 a 20:30", horarioSaturday: "10:00 a 20:30", horarioSunday: "10:00 a 20:30", pdvTienda: "4703" },
    { region: "RM Metropolitana de Santiago", comuna: "La Florida", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Mall Plaza Vespucio", direccion: "Vicuña Mackenna 7110 Mall Plaza Vespucio", horarioWeekday: "Lu-Jue: 10:00 a 20:00 - Vie: 10:30 a 21:00", horarioSaturday: "10:30 a 21:00", horarioSunday: "11:00 a 20:00", pdvTienda: "5003" },
    { region: "RM Metropolitana de Santiago", comuna: "La Reina", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "", direccion: "", horarioWeekday: "", horarioSaturday: "", horarioSunday: "", pdvTienda: "" },
    { region: "RM Metropolitana de Santiago", comuna: "Las Condes", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Manquehue", direccion: "Alonso De Córdova 5870 Local 7 Y 11", horarioWeekday: "Lu-Jue: 10:00 a 20:00 - Vie: 10:30 a 21:00", horarioSaturday: "10:30 a 21:00", horarioSunday: "11:00 a 20:00", pdvTienda: "45" },
    { region: "RM Metropolitana de Santiago", comuna: "Las Condes", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Mall Plaza Los Dominicos", direccion: "Av. Padre Hurtado Sur 865 Oficina Bs-1464 Y Bs-1468 Mall Plaza Los Dominicos", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4556" },
    { region: "RM Metropolitana de Santiago", comuna: "Las Condes", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Alto Las Condes", direccion: "Av. Presidente Kennedy 9001 Local 1147 Alto Las Condes", horarioWeekday: "10:00 a 20:30", horarioSaturday: "10:00 a 20:30", horarioSunday: "10:00 a 20:30", pdvTienda: "5142" },
    { region: "RM Metropolitana de Santiago", comuna: "Lo Barnechea", deliveryRegular: "24 HRS.", pdv: "4692", nombrePdv: "La dehesa", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel La Dehesa", direccion: "Av. La Dehesa 1450 Local 16A-16B", horarioWeekday: "10:00 a 20:30", horarioSaturday: "10:00 a 20:00", horarioSunday: "10:00 a 20:00", pdvTienda: "4692" },
    { region: "RM Metropolitana de Santiago", comuna: "Maipú", deliveryRegular: "24 HRS.", pdv: "5245", nombrePdv: "Maipu plaza", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Maipú Plaza", direccion: "Av. Los Pajaritos 1960, Loc. 101", horarioWeekday: "10:00 A 20:30", horarioSaturday: "10:00 A 20:30", horarioSunday: "11:00 A 20:00", pdvTienda: "5245" },
    { region: "RM Metropolitana de Santiago", comuna: "Ñuñoa", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Portal Ñuñoa", direccion: "Av. Jose Pedro Alessandri 1166 4008 Mall Portal Ñuñoa", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 18:00", horarioSunday: "Cerrado", pdvTienda: "5176" },
    { region: "RM Metropolitana de Santiago", comuna: "Peñalolén", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "", direccion: "", horarioWeekday: "", horarioSaturday: "", horarioSunday: "", pdvTienda: "" },
    { region: "RM Metropolitana de Santiago", comuna: "Providencia", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Costanera Center", direccion: "Av. Andres Bello 2465 Local 176 Costanera Center", horarioWeekday: "10:00 a 21:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "10:00 a 20:00", pdvTienda: "5141" },
    { region: "RM Metropolitana de Santiago", comuna: "Providencia", deliveryRegular: "24 HRS.", pdv: "45", nombrePdv: "Manquehue", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Luis Thayer Ojeda", direccion: "Av. Luis Thayer Ojeda 0173", horarioWeekday: "10:00 a 14:00 / 15:00 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4540" },
    { region: "RM Metropolitana de Santiago", comuna: "Puente Alto", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Puente Alto", direccion: "Av. Concha y Toro 1080 Local 23-24", horarioWeekday: "09:00 a 18:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4544" },
    { region: "RM Metropolitana de Santiago", comuna: "Puente Alto", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Plaza Puente Alto", direccion: "Av. Concha y Toro 187", horarioWeekday: "09:00 a 18:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4545" },
    { region: "RM Metropolitana de Santiago", comuna: "Puente Alto", deliveryRegular: "24 HRS.", pdv: "115", nombrePdv: "Vespucio", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Mall Plaza Tobalaba", direccion: "Av. Camilo Henriquez N° 3296 Loc. Bh 184-188", horarioWeekday: "10:00 a 19:30", horarioSaturday: "10:00 a 17:00", horarioSunday: "10:00 a 14:00", pdvTienda: "5207" },
    { region: "RM Metropolitana de Santiago", comuna: "San Bernardo", deliveryRegular: "24 HRS.", pdv: "4177", nombrePdv: "San bernardo", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel San Bernardo", direccion: "Eyzaguirre 657", horarioWeekday: "09:00 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4177" },
    { region: "RM Metropolitana de Santiago", comuna: "San Bernardo", deliveryRegular: "24 HRS.", pdv: "4177", nombrePdv: "San bernardo", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Mall Plaza Sur", direccion: "Av. Pdte. Jorge Alessandri Rodríguez 20040 Local Df 134A Mall Plaza Sur", horarioWeekday: "10:00 a 21:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "10:00 a 20:00", pdvTienda: "4540" },
    { region: "RM Metropolitana de Santiago", comuna: "Peñaflor", deliveryRegular: "24 HRS.", pdv: "5207", nombrePdv: "Peñaflor", expressWeekday: "12:30 hrs ; 14:00 hrs15:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Peñaflor", direccion: "18 DE September 12", horarioWeekday: "09:30 A 14:00 / 15:00 A 18:30", horarioSaturday: "10:00 A 14:00", horarioSunday: "Cerrado", pdvTienda: "5053" },
    
    // Región V - Valparaíso
    { region: "V Valparaíso", comuna: "Valparaiso", deliveryRegular: "24 HRS.", pdv: "4863", nombrePdv: "Viña arlegui", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Valparaíso Montt", direccion: "Pedro Montt 1811", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "3807" },
    { region: "V Valparaíso", comuna: "Viña del Mar", deliveryRegular: "24 HRS.", pdv: "4863", nombrePdv: "Viña arlegui", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Viña del Mar Coraceros", direccion: "Av. Libertad 1405", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4613" },
    { region: "V Valparaíso", comuna: "Viña del Mar", deliveryRegular: "24 HRS.", pdv: "4863", nombrePdv: "Viña arlegui", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel e-service Viña del Mar", direccion: "Av. Libertad 1405 2° Piso E-Service", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "1884" },
    { region: "V Valparaíso", comuna: "Viña del Mar", deliveryRegular: "24 HRS.", pdv: "4863", nombrePdv: "Viña arlegui", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Viña del Mar Arlegui", direccion: "Arlegui 561", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4863" },
    { region: "V Valparaíso", comuna: "Quilpue", deliveryRegular: "24 HRS.", pdv: "4149", nombrePdv: "Quilpue", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Quilpué", direccion: "Diego Portales 822 Local 209 Mall Plaza del Sol", horarioWeekday: "09:30 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4149" },
    { region: "V Valparaíso", comuna: "San Antonio", deliveryRegular: "24 HRS.", pdv: "5184", nombrePdv: "San Antonio", expressWeekday: "11:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Arauco San Antonio", direccion: "BARROS LUCO 105 MALL ARAUCO SAN ANTONIO PISO 2", horarioWeekday: "10:00 a 19:00", horarioSaturday: "10:00 a 19:00", horarioSunday: "11:00 a 19:00", pdvTienda: "5184" },
    
    // Región VI - O'Higgins
    { region: "VI Libertador General Bernardo O'Higgins", comuna: "Rancagua", deliveryRegular: "24 HRS.", pdv: "5126", nombrePdv: "Rancagua", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs; 18:00 hrs", tienda: "Entel Rancagua", direccion: "Paseo Independencia 486", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4161" },
    { region: "VI Libertador General Bernardo O'Higgins", comuna: "Rancagua", deliveryRegular: "24 HRS.", pdv: "5126", nombrePdv: "Rancagua", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs; 18:00 hrs", tienda: "Entel Portal Rancagua", direccion: "Carretera del Cobre 750 Local 1101", horarioWeekday: "10:00 a 20:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "10:00 a 20:00", pdvTienda: "10" },
    
    // Región VII - Maule
    { region: "VII Maule", comuna: "Curico", deliveryRegular: "24 HRS.", pdv: "4165", nombrePdv: "Curico", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Curicó", direccion: "Av. Camilo Henríquez 297", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4165" },
    { region: "VII Maule", comuna: "Curico", deliveryRegular: "24 HRS.", pdv: "4165", nombrePdv: "Curico", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Curicó O'Higgins", direccion: "Av. Bernardo O'Higgins 201 Local 71B", horarioWeekday: "10:00 a 19:00", horarioSaturday: "09:30 a 20:00", horarioSunday: "10:00 a 20:00", pdvTienda: "4628" },
    { region: "VII Maule", comuna: "Linares", deliveryRegular: "24 HRS.", pdv: "4620", nombrePdv: "Linares independencia", expressWeekday: "11:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 15:00 hrs", tienda: "Entel Linares", direccion: "Independencia 496", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4620" },
    { region: "VII Maule", comuna: "Talca", deliveryRegular: "24 HRS.", pdv: "4172", nombrePdv: "Talca", expressWeekday: "10:00 hrs ; 17:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Talca Plaza Maule", direccion: "Av Circunvalación Oriente 1055", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 19:00", horarioSunday: "Cerrado", pdvTienda: "4172" },
    { region: "VII Maule", comuna: "Talca", deliveryRegular: "24 HRS.", pdv: "4172", nombrePdv: "Talca", expressWeekday: "10:00 hrs ; 17:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Talca Centro", direccion: "Calle 1 Sur 1320", horarioWeekday: "09:00 a 17:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "435" },
    
    // Región VIII - Biobío
    { region: "VIII Biobío", comuna: "Concepción", deliveryRegular: "24 HRS.", pdv: "25", nombrePdv: "Concepción chacabuco", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Concepción Chacabuco", direccion: "Av. Chacabuco 667", horarioWeekday: "09:00 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "25" },
    { region: "VIII Biobío", comuna: "Concepción", deliveryRegular: "24 HRS.", pdv: "25", nombrePdv: "Concepción chacabuco", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 14:00 hrs", tienda: "Entel Concepción O'Higgins", direccion: "Libertador Gral. Bernardo O'Higgins 920", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4577" },
    { region: "VIII Biobío", comuna: "Chillán", deliveryRegular: "24 HRS.", pdv: "4169", nombrePdv: "Chillán", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 16:00 hrs", tienda: "Entel Chillán", direccion: "El Roble 628", horarioWeekday: "10:00 a 19:00", horarioSaturday: "10:00 a 16:00", horarioSunday: "Cerrado", pdvTienda: "4169" },
    { region: "VIII Biobío", comuna: "Chillán", deliveryRegular: "24 HRS.", pdv: "4169", nombrePdv: "Chillán", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 16:00 hrs", tienda: "Entel Mall Arauco Chillán", direccion: "El Roble 770 Local 115 Mall Arauco Chillán", horarioWeekday: "10:00 a 20:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "11:00 a 20:00", pdvTienda: "4651" },
    { region: "VIII Biobío", comuna: "Los Angeles", deliveryRegular: "24 HRS.", pdv: "4167", nombrePdv: "Los Ángeles", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Los Ángeles", direccion: "Valdivia 440", horarioWeekday: "09:00 a 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "4167" },
    { region: "VIII Biobío", comuna: "Los Angeles", deliveryRegular: "24 HRS.", pdv: "4167", nombrePdv: "Los Ángeles", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Mall Plaza Los Ángeles", direccion: "Illapel 10 Local 230 Mall Paseo Costanera", horarioWeekday: "10:00 a 20:00", horarioSaturday: "10:00 a 20:00", horarioSunday: "11:00 a 20:00", pdvTienda: "4579" },
    { region: "VIII Biobío", comuna: "Talcahuano", deliveryRegular: "24 HRS.", pdv: "4564", nombrePdv: "Talcahuano", expressWeekday: "12:00 hrs; 18:00 hrs", expressSaturday: "12:00 hrs ; 18:00 hrs", tienda: "Entel Talcahuano", direccion: "Av. Pdte. Jorge Alessandri Rodríguez 3177", horarioWeekday: "09:00 a 20:00", horarioSaturday: "10:00 a 19:00", horarioSunday: "10:00 a 20:00", pdvTienda: "4564" },
    
    // Región X - Los Lagos
    { region: "X Los Lagos", comuna: "Osorno", deliveryRegular: "24 HRS.", pdv: "5159", nombrePdv: "Osorno ohiggins", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Osorno O'Higgins", direccion: "San Bernardo 555", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 17:00", horarioSunday: "Cerrado", pdvTienda: "5159" },
    { region: "X Los Lagos", comuna: "Puerto Montt", deliveryRegular: "48 HRS.", pdv: "37", nombrePdv: "Puerto Montt", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Puerto Montt", direccion: "Eleuterio Ramírez 240 Piso 3", horarioWeekday: "10:00 a 20:00", horarioSaturday: "10:00 a 19:00", horarioSunday: "11:00 a 20:00", pdvTienda: "4568" },
    { region: "X Los Lagos", comuna: "Puerto Montt", deliveryRegular: "48 HRS.", pdv: "37", nombrePdv: "Puerto Montt", expressWeekday: "09:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Mall Paseo Costanera", direccion: "Eleuterio Ramírez 294", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4608" },
    
    // Región XII - Magallanes
    { region: "XII Magallanes y de la Antártica Chilena", comuna: "Punta Arenas", deliveryRegular: "72 HRS.", pdv: "5035", nombrePdv: "Punta Arenas", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "Cerrado", tienda: "Entel Punta Arenas", direccion: "Lautaro Navarro 957", horarioWeekday: "09:00 A 13:30 / 14:30 A 19:00", horarioSaturday: "Cerrado", horarioSunday: "Cerrado", pdvTienda: "5035" },
    
    // Región XIV - Los Ríos
    { region: "XIV Los Ríos", comuna: "Valdivia", deliveryRegular: "24 HRS.", pdv: "4569", nombrePdv: "Valdivia Arauco", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 13:00 hrs", tienda: "Entel Valdivia", direccion: "Arauco 165", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 14:00", horarioSunday: "Cerrado", pdvTienda: "4569" },
    
    // Región XV - Arica y Parinacota
    { region: "XV Arica y Parinacota", comuna: "Arica", deliveryRegular: "48 HRS.", pdv: "4480", nombrePdv: "Arica", expressWeekday: "10:00 hrs ; 18:00 hrs", expressSaturday: "10:00 hrs ; 17:00 hrs", tienda: "Entel Arica", direccion: "21 de Mayo 270", horarioWeekday: "09:00 a 19:00", horarioSaturday: "10:00 a 18:00", horarioSunday: "Cerrado", pdvTienda: "4480" }
  ];

  // Obtener regiones únicas
  const regiones = useMemo(() => {
    const uniqueRegions = [...new Set(deliveryData.map(item => item.region))];
    return uniqueRegions.sort();
  }, []);

  // Obtener comunas filtradas por región
  const comunas = useMemo(() => {
    if (!selectedRegion) return [];
    const filtered = deliveryData
      .filter(item => item.region === selectedRegion)
      .map(item => item.comuna);
    return [...new Set(filtered)].sort();
  }, [selectedRegion]);

  // Obtener datos filtrados
  const filteredData = useMemo(() => {
    if (!selectedRegion || !selectedComuna) return [];
    return deliveryData.filter(
      item => item.region === selectedRegion && item.comuna === selectedComuna
    );
  }, [selectedRegion, selectedComuna]);

  // Agrupar tiendas únicas
  const tiendasUnicas = useMemo(() => {
    const tiendas = filteredData.filter(item => item.tienda);
    const uniqueMap = new Map();
    tiendas.forEach(item => {
      if (!uniqueMap.has(item.direccion)) {
        uniqueMap.set(item.direccion, item);
      }
    });
    return Array.from(uniqueMap.values());
  }, [filteredData]);

  // Obtener delivery regular
  const deliveryRegular = useMemo(() => {
    if (filteredData.length === 0) return null;
    return filteredData[0].deliveryRegular;
  }, [filteredData]);

  // Obtener delivery express
  const deliveryExpress = useMemo(() => {
    if (filteredData.length === 0) return null;
    const express = filteredData.find(item => item.pdv && item.nombrePdv);
    return express;
  }, [filteredData]);

  const handleClear = () => {
    setSelectedRegion('');
    setSelectedComuna('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Panel de Consulta de Entregas
        </h1>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione una región</option>
                {regiones.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Seleccione una comuna</option>
                {comunas.map((comuna) => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleClear}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <X size={20} />
                Borrar
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {selectedRegion && selectedComuna && (
          <div className="space-y-6">
            {/* Delivery Regular */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Regular</h2>
              </div>
              {deliveryRegular && deliveryRegular !== "SIN COBERTURA" ? (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Tiempo de entrega:</span> {deliveryRegular}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">Sin cobertura en esta comuna</p>
                </div>
              )}
            </div>

            {/* Delivery Express */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-green-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Express</h2>
              </div>
              {deliveryExpress && deliveryExpress.expressWeekday ? (
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-xl font-bold text-green-700 mb-2">
                      ⚡ Entrega en 2 horas
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">PDV:</p>
                        <p className="font-semibold text-gray-800">{deliveryExpress.pdv}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tienda:</p>
                        <p className="font-semibold text-gray-800">{deliveryExpress.nombrePdv}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={20} className="text-gray-600" />
                      <h3 className="font-semibold text-gray-800">Horarios de servicio</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Lunes a Viernes:</p>
                        <p className="font-medium text-gray-800">{deliveryExpress.expressWeekday}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sábado:</p>
                        <p className="font-medium text-gray-800">
                          {deliveryExpress.expressSaturday || 'Cerrado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">Sin cobertura express en esta comuna</p>
                </div>
              )}
            </div>

            {/* Retiro en Tienda */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="text-purple-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Retiro en Tienda</h2>
              </div>
              {tiendasUnicas.length > 0 ? (
                <div className="grid gap-4">
                  {tiendasUnicas.map((tienda, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-2">{tienda.tienda}</h3>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-gray-600">Dirección:</p>
                              <p className="text-gray-800">{tienda.direccion}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">PDV:</p>
                              <p className="font-semibold text-gray-800">{tienda.pdvTienda}</p>
                            </div>
                            <div className="bg-white rounded p-3 mt-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock size={18} className="text-gray-600" />
                                <p className="font-semibold text-gray-800">Horarios</p>
                              </div>
                              <div className="grid md:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Lunes a Viernes:</p>
                                  <p className="font-medium text-gray-800">{tienda.horarioWeekday}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Sábado:</p>
                                  <p className="font-medium text-gray-800">{tienda.horarioSaturday}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Domingo:</p>
                                  <p className="font-medium text-gray-800">{tienda.horarioSunday}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">No hay tiendas disponibles en esta comuna</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedRegion && !selectedComuna && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              Seleccione una región y comuna para ver las opciones de entrega
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPanel;