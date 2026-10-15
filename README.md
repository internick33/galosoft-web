# Galosoft Web · sitio web

Este sitio usa el mismo sistema de diseño que Galosoft Contable y Galosoft Support, con paleta propia: base carbón #111214 y acento lima #C6F24E. Los títulos usan Hanken Grotesk.

## Estructura
- **Sitio:**
  - `index.html`: Inicio
  - `servicios.html`
  - `portafolio.html`
  - `nosotros.html`
  - `contacto.html`
  - `aviso-de-privacidad.html`
- **Landings** (sin menú, con el formulario arriba):
  - `paginas-web.html`
  - `landing-pages.html`
  - `sistemas-a-medida.html`
- **`assets/`:** estilos, JS, favicon, `og-web.png` (imagen para vistas previas) y `img/`, con las capturas reales de Contable y Support para el portafolio.

## Publicar
1. Sube todo a `public_html` de galosoftweb.com. La URL canónica es **https://galosoftweb.com**, sin `www`.
2. En `assets/main.js`, pon la URL de tu webhook de n8n en `WEBHOOK`.
3. En el nodo Webhook de n8n:
   - Método POST.
   - Responder con código 200.
   - CORS: agrega `https://galosoftweb.com`.

   El JSON que recibe trae estos campos: `nombre`, `telefono`, `proyecto`, `sitio_actual`, `acepto`, `marca`, `origen`, `pagina`, `utm` y `fecha`.

## Portafolio
- Los proyectos mostrados son los sitios propios de Galosoft Contable y Galosoft Support, rotulados como "Proyecto propio".
- **Publica esos dos sitios antes que este**, para que los enlaces del portafolio funcionen.
- Hay una plantilla comentada en `index.html` para agregar casos de clientes, solo con su autorización y con métricas reales.

## Pendientes antes de publicar
- [ ] URL del webhook de n8n (`assets/main.js`).
- [ ] Tiempo típico de entrega de un sitio y de una landing (inicio y `paginas-web.html`).
- [ ] Cookies o analítica, si las agregas (aviso de privacidad).
- [ ] Logo definitivo. La "G" es provisional.
- [ ] Confirmar los supuestos del texto:
  - El dominio se registra a nombre del cliente.
  - Se entregan archivos y accesos al terminar el pago.
  - El hosting anual se cotiza por separado.
