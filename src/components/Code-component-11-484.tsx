import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

export function MetaTags({ 
  title = 'Sistema Administrativo - 2ª Compañía de Bomberos',
  description = 'Sistema administrativo interno para la gestión operativa de la 2ª Compañía de Bomberos Voluntarios de Viña del Mar. Fundada en 1884, LEALTAD Y TRABAJO.',
  keywords = 'bomberos, viña del mar, sistema administrativo, gestión operativa, citaciones, personal, emergencias, 2ª compañía',
  author = '2ª Compañía de Bomberos de Viña del Mar'
}: MetaTagsProps) {
  
  useEffect(() => {
    // Actualizar el título de la página
    document.title = title;
    
    // Actualizar o crear meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'noindex, nofollow'); // Sistema interno
    
    // Meta tags de Open Graph
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', 'es_CL', 'og:locale');
    
    // Meta tags de seguridad
    updateMetaTag('referrer', 'strict-origin-when-cross-origin');
    
    // Meta tag de charset (si no existe)
    if (!document.querySelector('meta[charset]')) {
      const charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charset, document.head.firstChild);
    }
    
    // Lang attribute en HTML
    document.documentElement.lang = 'es-CL';
    
  }, [title, description, keywords, author]);

  // Este componente no renderiza nada visible
  return null;
}