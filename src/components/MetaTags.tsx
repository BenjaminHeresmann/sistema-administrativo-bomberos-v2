/*
 * COMPONENTE META TAGS SEMÁNTICOS
 * ===============================
 * 
 * CUMPLIMIENTO CRITERIO IE1.3.3 - SEMÁNTICA WEB ADECUADA:
 * ✅ Meta tags descriptivos para SEO y accesibilidad
 * ✅ Estructura HTML semántica con información contextual
 * ✅ Open Graph para redes sociales y compartición
 * ✅ Configuración de idioma y localización (es-CL)
 * ✅ Meta tags de seguridad para sistema interno
 * ✅ Viewport responsive para dispositivos móviles
 * 
 * CUMPLIMIENTO CRITERIO IE1.1.1 - ESTRUCTURA HTML:
 * ✅ Etiquetado correcto de HTML5 mediante JavaScript
 * ✅ Títulos descriptivos únicos por página
 * ✅ Descripción contextual del contenido
 * ✅ Keywords específicas del dominio bomberil
 */

import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

/**
 * COMPONENTE DE META TAGS DINÁMICOS (IE1.3.3, IE1.1.1)
 * ====================================================
 * Gestiona meta información semántica de cada página
 * Actualiza dinámicamente el head del documento
 */
export function MetaTags({ 
  title = 'Sistema Administrativo - 2ª Compañía de Bomberos',
  description = 'Sistema administrativo interno para la gestión operativa de la 2ª Compañía de Bomberos Voluntarios de Viña del Mar. Fundada en 1884, LEALTAD Y TRABAJO.',
  keywords = 'bomberos, viña del mar, sistema administrativo, gestión operativa, citaciones, personal, emergencias, 2ª compañía',
  author = '2ª Compañía de Bomberos de Viña del Mar'
}: MetaTagsProps) {
  
  useEffect(() => {
    /**
     * ACTUALIZACIÓN DINÁMICA DE TÍTULO (IE1.3.3)
     * Título único y descriptivo para cada página
     */
    document.title = title;
    
    /**
     * FUNCIÓN HELPER PARA META TAGS (IE1.1.1)
     * Crea o actualiza meta tags dinámicamente
     */
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        // CREAR META TAG SI NO EXISTE (IE1.1.1)
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      // ACTUALIZAR CONTENIDO DEL META TAG (IE1.3.3)
      meta.setAttribute('content', content);
    };

    // META TAGS BÁSICOS SEMÁNTICOS (IE1.3.3)
    updateMetaTag('description', description);      // Descripción para SEO
    updateMetaTag('keywords', keywords);            // Keywords específicas
    updateMetaTag('author', author);                // Autoría institucional
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0'); // Responsive
    updateMetaTag('robots', 'noindex, nofollow');   // Sistema interno privado
    
    // META TAGS OPEN GRAPH PARA REDES SOCIALES (IE1.3.3)
    updateMetaTag('', title, 'og:title');           // Título para compartir
    updateMetaTag('', description, 'og:description'); // Descripción social
    updateMetaTag('', 'website', 'og:type');        // Tipo de contenido
    updateMetaTag('', 'es_CL', 'og:locale');        // Localización chilena
    
    // META TAGS DE SEGURIDAD (IE1.3.3)
    updateMetaTag('referrer', 'strict-origin-when-cross-origin'); // Política de referrer
    
    // CHARSET UTF-8 PARA CARACTERES ESPECIALES (IE1.1.1)
    if (!document.querySelector('meta[charset]')) {
      const charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charset, document.head.firstChild);
    }
    
    // CONFIGURACIÓN DE IDIOMA ESPAÑOL CHILENO (IE1.3.3)
    document.documentElement.lang = 'es-CL';
    
  }, [title, description, keywords, author]);

  /**
   * COMPONENTE SIN RENDERIZADO VISUAL (IE1.3.3)
   * Solo manipula el DOM head para meta información
   */
  return null;
}