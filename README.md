# PresenceX

Sitio oficial: https://presencex.tecnobros.es

Web estática en español con funciones, descarga, novedades, ayuda, créditos y documentos legales. Las capturas muestran la aplicación real. Este repositorio no contiene código Android, credenciales ni historial del proyecto principal.

## Desarrollo

Requiere Node.js 22 o posterior.

```sh
npm ci --ignore-scripts
npm test
npm run check
npm run preview
```

La vista previa está en http://127.0.0.1:4173. Los HTML de la raíz son las plantillas; `scripts/build.mjs` aplica el contenido común, los metadatos y los ajustes editoriales. El resultado publicable está en `_site`, que no se versiona. Para regenerarlo: `npm run build`.

## Publicación

GitHub Actions comprueba las páginas y publica exclusivamente `_site` en GitHub Pages al actualizar `main`. El dominio personalizado se configura también en Settings > Pages, además del archivo CNAME. El sitemap y robots.txt se generan con las URL definitivas.

No hay formularios, cookies de seguimiento ni analítica web. Fuentes e iconos se sirven desde el mismo sitio. Las licencias de Inter y Lucide se incluyen junto a sus archivos. Las marcas y capturas de PresenceX pertenecen a TECNO BROS; las marcas de terceros pertenecen a sus titulares.
