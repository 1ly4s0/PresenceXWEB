import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { load } from 'cheerio';

export const origin = 'https://presencex.tecnobros.es';
export const root = resolve(import.meta.dirname, '..');
export const pages = {
  'index.html': ['PresenceX: Rich Presence de Discord para Android', 'Personaliza tu actividad de Discord desde Android. Crea tu Rich Presence con imágenes y enlaces, comparte música o elige qué apps y juegos mostrar.'],
  'funciones.html': ['Funciones de PresenceX: juegos, música y Custom RPC', 'Conoce el RPC personalizado, los catálogos de juegos, Media RPC y Apps RPC de PresenceX. Imágenes, enlaces, vista previa y configuraciones guardadas.'],
  'descargar.html': ['Descargar PresenceX para Android | Google Play', 'Descarga PresenceX gratis en Google Play. Consulta los requisitos de Android, los permisos de Media RPC y Apps RPC y cómo empezar con Discord.'],
  'novedades.html': ['Novedades de PresenceX 2.0 para Android', 'Consulta las novedades de PresenceX 2.0: RPC personalizado, música, apps, imágenes y cambios en la navegación y la configuración de permisos.'],
  'ayuda.html': ['Ayuda de PresenceX: permisos, conexión y RPC', 'Resuelve problemas de imágenes, conexión y permisos en PresenceX. Ayuda para Media RPC, Apps RPC, batería y notificaciones en Android.'],
  'privacidad.html': ['Política de privacidad de PresenceX', 'Conoce los datos que utiliza PresenceX, cómo funcionan Discord, Cloudflare y Firebase, y las opciones para gestionar o solicitar la eliminación de tus datos.'],
  'terminos.html': ['Términos de uso de PresenceX', 'Condiciones de uso de PresenceX: cuenta de Discord, permisos de Android, contenido del usuario, disponibilidad del servicio y contacto con TECNO BROS.'],
  'creditos.html': ['PresenceX y TECNO BROS | Equipo y créditos', 'PresenceX es una app para Android creada por TECNO BROS. Conoce el proyecto, su comunidad y las herramientas abiertas que utiliza.'],
  '404.html': ['Página no encontrada | PresenceX', 'Esta página no está disponible. Vuelve al inicio de PresenceX o consulta el centro de ayuda.'],
};

const footer = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><img src="assets/images/brand-mark.webp" width="96" height="96" alt=""><span>PresenceX</span></a><p>Rich Presence de Discord desde Android. Una app de TECNO BROS.</p></div><div class="footer-column"><h2>Producto</h2><a href="funciones.html">Funciones</a><a href="descargar.html">Descargar</a><a href="novedades.html">Novedades</a></div><div class="footer-column"><h2>Contacto</h2><a href="ayuda.html">Centro de ayuda</a><a href="https://discord.gg/tecno-bros-885235460178342009">Discord</a><a href="https://www.youtube.com/tecnobros?sub_confirmation=1">YouTube</a><a href="https://tecnobros.es/">TECNO BROS</a></div><div class="footer-column"><h2>Legal</h2><a href="privacidad.html">Privacidad</a><a href="terminos.html">Términos</a><a href="creditos.html">Créditos</a></div></div><div class="footer-bottom"><span>© <span data-year>2026</span> TECNO BROS. PresenceX no está afiliada a Discord, Xbox ni Nintendo.</span><a href="https://tecnobros-presencex.web.app/delete-data">Eliminar datos</a></div></div></footer>`;

function editContent($, filename) {
  if (filename === 'index.html') {
    $('.hero h1').text('PresenceX');
    $('.hero .eyebrow').text('Rich Presence de Discord para Android');
    $('.hero .lead').text('Ponle nombre a tu actividad, añade tus imágenes y comparte lo que escuchas o el juego que has elegido. Todo desde tu móvil.');
    $('.hero-meta').html('<span><i data-lucide="gamepad-2"></i>Juegos y apps</span><span><i data-lucide="music-2"></i>Media RPC</span><span><i data-lucide="languages"></i>10 idiomas</span>');
    $('.hero-product').removeAttr('aria-hidden');
    $('.hero-product img').attr({ src: 'assets/images/app-create.webp', alt: 'Pantalla Crear de PresenceX con RPC personalizado, juegos, Media RPC y Apps RPC', width: '720', height: '1500', fetchpriority: 'high' });
    $('#crear-titulo').text('¿Qué quieres mostrar en Discord?');
    $('#crear-titulo').closest('.section-head').children('p').text('Una presencia a tu medida, un juego del catálogo, la música que escuchas o una de tus apps. Los cuatro modos están en Crear.');
    $('#media-rpc .feature-copy h2').text('Cambia de canción. Tu actividad te sigue.');
    $('#media-rpc .feature-copy > p:not(.eyebrow)').text('Media RPC utiliza la información que publica tu reproductor para actualizar el título, el artista, la carátula y el tiempo. Necesita una sesión multimedia compatible y acceso a las notificaciones.');
    $('#permisos .feature-copy h2').text('Cada acceso tiene su motivo.');
    $('#permisos .feature-copy > p:not(.eyebrow)').text('Activa los permisos que necesita el modo que quieras usar. Media RPC accede a las notificaciones; Apps RPC, al uso de las aplicaciones. Puedes revocarlos desde Android.');
    $('#permisos .permission-row').last().find('small').text('Sujeto al ahorro de batería de Android');
    $('#inicio-titulo').text('De la instalación a tu primera presencia.');
    $('#inicio-titulo').closest('.section-head').children('p').text('Inicia sesión, escoge un modo y revisa cómo se verá. Las automatizaciones requieren los permisos correspondientes.');
    $('.step').eq(2).find('h3').text('Aplica y comprueba');
    $('.step').eq(2).find('p').text('Envía la actividad a Discord. Si usas una automatización, revisa también los permisos y las restricciones de batería del móvil.');
    $('.feature-card h3').filter((_, e) => $(e).text() === 'Imágenes que sí renderizan').text('Tus imágenes en Discord');
    $('.feature-card h3').filter((_, e) => $(e).text() === 'Perfil completo').text('Tu perfil de Discord');
    $('.news-date').attr('datetime', '2026-11-09').text('9 NOV 2026');
    $('.news-row h3').text('Battly Mobile y PresenceX: tu partida, en Discord');
    $('.news-row p').text('La integración con Battly Mobile permite compartir tu partida de Minecraft. Repasamos cómo vincular las apps y las correcciones de la 2.0.1.');
    $('.news-row > a').attr({href:'novedades.html#v2-0-1','aria-label':'Leer las novedades de PresenceX 2.0.1 y Battly Mobile'});
    $('.demo-layout').after('<p class="demo-note">Ejemplos ilustrativos de una actividad. El aspecto final puede variar según el cliente de Discord.</p>');
  }
  if (filename === 'funciones.html') {
    $('.page-hero h1').text('Cuatro modos de Rich Presence.');
    $('.page-hero .container > p:not(.eyebrow)').text('Crea una actividad manual, elige un juego del catálogo o deja que tu música y tus apps actualicen la presencia.');
    $('.section-head > p').first().text('Elige un modo desde Crear. Puedes guardar tus configuraciones y volver a utilizarlas.');
    $('#custom h2').text('Nombre, detalles, imágenes y enlaces.');
    $('#media h2').text('Comparte lo que está sonando.');
    $('#media .feature-copy > p:not(.eyebrow)').text('Media RPC escucha los cambios de una sesión multimedia compatible y actualiza la actividad. Al desactivarlo, retira su RPC sin borrar tu estado personalizado de Discord.');
    $('#apps h2').text('Solo las apps que selecciones.');
    for (const [id, image, alt] of [
      ['custom', 'custom', 'Editor real de PresenceX con nombre, tipo de actividad, detalles e imágenes'],
      ['media', 'media', 'Panel de Media RPC con permisos y control para activar la función'],
      ['apps', 'apps', 'Selector de Apps RPC con Chrome seleccionado por el usuario'],
    ]) {
      $(`#${id} .feature-visual`).html(`<div class="phone screen-preview"><img src="assets/images/app-${image}.webp" alt="${alt}" width="720" height="1500" loading="lazy" decoding="async"></div>`);
    }
    $('.feature-card h3').filter((_, e) => $(e).text() === 'Pantalla apagada').closest('article').find('p').text('Servicio visible en segundo plano. Su continuidad depende de Android y de las restricciones de batería.');
    $('.feature-grid').first().after('<p class="demo-note">Los catálogos de Xbox y Nintendo se eligen manualmente: no detectan qué se ejecuta en una consola.</p>');
  }
  if (filename === 'descargar.html') {
    $('.page-hero h1').text('Descargar PresenceX.');
    $('.download-lead').text('Instálala desde Google Play para recibir las actualizaciones y conservar la firma oficial de la aplicación.');
    $('.download-note').text('Necesitas una cuenta de Discord y conexión a Internet para aplicar una presencia.');
  }
  if (filename === 'novedades.html') {
    $('.page-hero h1').text('Novedades de PresenceX.');
    $('.page-hero .container > p:not(.eyebrow)').text('Las novedades y correcciones de la versión disponible en Google Play.');
    $('.release').slice(1).remove();
    $('.release time').attr('datetime', '2026-10-26').text('26 de octubre de 2026');
    $('.release h2').text('PresenceX 2.0, disponible en Google Play');
    $('.release > p').text('La nueva versión reúne RPC personalizado, juegos, Media RPC y Apps RPC en Crear. También añade una configuración guiada de permisos y herramientas para guardar y recuperar presencias.');
    $('.release-list').prepend(`<article class="release" id="v2-0-1"><div class="release-version"><span>2.0.1</span><time datetime="2026-11-09">9 de noviembre de 2026</time></div><h2>Battly Mobile y PresenceX: tu partida, en Discord</h2><p>Battly Mobile y PresenceX son dos proyectos de TECNO BROS Studios. Ahora puedes vincularlos para mostrar tu partida de Minecraft en tu perfil de Discord desde Android.</p><h3>Cómo vincularlos</h3><p>Abre los ajustes de Battly Mobile, vincula PresenceX y activa la integración en el apartado Battly de PresenceX. La actividad se actualiza mientras juegas, también en segundo plano. Al cerrar Minecraft, se recupera tu presencia anterior.</p><p>Los nombres del mundo y del servidor permanecen ocultos salvo que actives sus opciones. Puedes desactivar la integración o desvincular las apps cuando quieras.</p><p><a href="https://battlylauncher.com/">Conocer Battly</a></p><h3>Correcciones de la 2.0.1</h3><ul><li>Una interrupción temporal de conexión ya no hace fallar inmediatamente la petición al aplicar un juego.</li><li>Los mensajes distinguen entre sesión caducada, tiempo de espera agotado y otros errores.</li><li>Corregido un cierre al volver a PresenceX mientras arrancaba una tarea en segundo plano.</li><li>El cierre del WebSocket se realiza fuera del bloqueo de sesión para evitar que detener el RPC congele la app.</li></ul><p>Esta actualización reúne además las mejoras recientes de Media RPC y el progreso de reproducción, las insignias oficiales de Discord y el espaciado de la biografía.</p><p>La disponibilidad de la actualización depende del proceso de revisión y distribución de Google Play.</p></article>`);
  }
  if (filename === 'ayuda.html') $('.page-hero h1').text('Ayuda con PresenceX.');
  if (filename === 'creditos.html') {
    $('.page-hero h1').text('Detrás de PresenceX.');
    $('.page-hero .container > p:not(.eyebrow)').text('Una app de TECNO BROS para llevar Rich Presence de Discord al móvil.');
    const prose = $('.prose');
    prose.html('<img class="credits-banner" src="assets/images/presencex-banner.png" alt="PresenceX" width="1024" height="400" loading="lazy" decoding="async"><h2>TECNO BROS</h2><p>Diseñamos y desarrollamos PresenceX para personalizar la actividad de Discord sin depender de un ordenador. Nos encargamos de la app, su integración con Android y sus actualizaciones.</p><h2>Gracias por probarla</h2><p>Los reportes de la comunidad han ayudado a encontrar fallos que no aparecían en nuestros dispositivos: permisos escondidos, canciones que no cambiaban y móviles que cerraban la conexión. Gracias a quienes compartieron capturas, explicaron los pasos y volvieron a probar las correcciones.</p><h2>Herramientas y proyectos abiertos</h2><p>La app utiliza React Native, Expo y Kotlin, junto con Discord Gateway y servicios de Firebase. Esta web usa iconos de Lucide y la tipografía Inter, con sus licencias incluidas en el repositorio.</p><p>Las marcas y las imágenes de los juegos pertenecen a sus respectivos titulares. PresenceX no es una aplicación oficial de Discord, Xbox ni Nintendo.</p><p>Para hablar con el equipo, <a href="https://discord.gg/tecno-bros-885235460178342009">entra en Discord</a> o visita <a href="https://tecnobros.es/">TECNO BROS</a>.</p>');
  }
  if (filename === 'privacidad.html') {
    $('.prose').append('<h2 id="sitio-web">10. Este sitio web</h2><p>Esta web es estática y no incorpora analítica, publicidad ni formularios de recogida de datos. Las fuentes y los iconos se sirven desde el propio sitio. Los enlaces a Google Play, Discord y YouTube te llevan a servicios con sus propias políticas. El alojamiento se realiza en GitHub Pages; las solicitudes al sitio están sujetas a la <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">política de privacidad de GitHub</a>.</p>');
    $('.toc').append('<a href="#sitio-web">Este sitio web</a>');
    $('.page-hero-meta').text('Actualizada el 26 de octubre de 2026');
  }
}

export function renderPage(filename, source) {
  const $ = load(source);
  editContent($, filename);
  const [title, description] = pages[filename];
  const url = `${origin}/${filename === 'index.html' ? '' : filename}`;
  const head = $('head').empty();
  head.append('<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#111214"><meta name="color-scheme" content="dark"><meta name="referrer" content="strict-origin-when-cross-origin">');
  head.append($('<title>').text(title), $('<meta>').attr({name: 'description', content: description}));
  head.append($('<meta>').attr({name: 'robots', content: filename === '404.html' ? 'noindex,follow' : 'index,follow,max-image-preview:large'}));
  if (filename !== '404.html') head.append($('<link>').attr({rel: 'canonical', href: url}));
  for (const [property, content] of Object.entries({'og:type':'website','og:site_name':'PresenceX','og:locale':'es_ES','og:title':title,'og:description':description,'og:url':url,'og:image':`${origin}/assets/images/social-preview.jpg`,'og:image:width':'1200','og:image:height':'630','og:image:alt':'PresenceX, Rich Presence de Discord para Android'})) head.append($('<meta>').attr({property,content}));
  for (const [name,content] of Object.entries({'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':`${origin}/assets/images/social-preview.jpg`,'twitter:image:alt':'PresenceX para Android'})) head.append($('<meta>').attr({name,content}));
  head.append('<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32.png"><link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png"><link rel="preload" href="assets/fonts/Inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/css/styles.css">');
  head.append($('<meta>').attr({'http-equiv':'Content-Security-Policy',content:"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'"}));
  if (filename !== '404.html') {
    const graph = [
      {'@type':'Organization','@id':`${origin}/#organization`,name:'TECNO BROS',url:'https://tecnobros.es/',logo:`${origin}/assets/images/presencex-logo.png`},
      {'@type':'WebSite','@id':`${origin}/#website`,name:'PresenceX',url:`${origin}/`,inLanguage:'es',publisher:{'@id':`${origin}/#organization`}},
      {'@type':'WebPage','@id':`${url}#page`,url,name:title,description,inLanguage:'es',isPartOf:{'@id':`${origin}/#website`}},
    ];
    if (filename === 'index.html') graph.push({'@type':'SoftwareApplication',name:'PresenceX',url:`${origin}/`,applicationCategory:'UtilitiesApplication',operatingSystem:'Android 7.0 o posterior',softwareVersion:'2.0.0',downloadUrl:'https://play.google.com/store/apps/details?id=com.tecnobros.tecnorpc',image:`${origin}/assets/images/social-preview.jpg`,description,isAccessibleForFree:true,publisher:{'@id':`${origin}/#organization`}});
    else graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'PresenceX',item:`${origin}/`},{'@type':'ListItem',position:2,name:title.split(' | ')[0],item:url}]});
    head.append($('<script>').attr('type','application/ld+json').text(JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')));
  }
  $('html').attr('lang','es');
  $('.brand img').attr({src:'assets/images/brand-mark.webp',width:'96',height:'96',decoding:'async'});
  $('.desktop-nav a, .mobile-nav a:not(.button)').each((_,e)=>{if($(e).attr('href')===filename)$(e).attr('aria-current','page');});
  $('.site-footer').replaceWith(footer);
  $('script[src]').remove();
  $('body').append('<script src="assets/vendor/lucide.min.js" defer></script><script src="assets/js/app.js" defer></script>');
  return $.html();
}

export function build() {
  const destination=join(root,'_site');
  mkdirSync(destination,{recursive:true});
  cpSync(join(root,'assets'),join(destination,'assets'),{recursive:true,filter:source=>!source.endsWith('.ttf')});
  for (const filename of Object.keys(pages)) writeFileSync(join(destination,filename),renderPage(filename,readFileSync(join(root,filename),'utf8')));
  const urls=Object.keys(pages).filter(p=>p!=='404.html').map(p=>`${origin}/${p==='index.html'?'':p}`);
  writeFileSync(join(destination,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>`<url><loc>${url}</loc></url>`).join('')+'</urlset>\n');
  writeFileSync(join(destination,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  writeFileSync(join(destination,'CNAME'),'presencex.tecnobros.es\n');
  writeFileSync(join(destination,'.nojekyll'),'');
  console.log(`Built ${Object.keys(pages).length} static pages for ${origin}.`);
  return destination;
}

if (process.argv[1] && resolve(process.argv[1])===resolve(import.meta.filename)) build();
