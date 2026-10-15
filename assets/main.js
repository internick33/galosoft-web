/* Galosoft Web · JS mínimo */
const CONFIG = {
  WEBHOOK: "https://TU-N8N/webhook/lead-web", // [DATO REAL: URL del webhook de n8n]
  WA: "525568075299",
  MARCA: "Galosoft Web"
};

/* Menú móvil */
const mb = document.querySelector(".menu-btn"), mn = document.getElementById("mnav");
if (mb && mn) mb.addEventListener("click", () => {
  const open = mn.classList.toggle("open");
  mb.setAttribute("aria-expanded", open);
});

/* Formularios de diagnóstico → n8n, con WhatsApp de respaldo */
const MSG = {
  valueMissing: "Este dato es necesario.",
  patternMismatch: "Escribe un número de 10 dígitos.",
  tooShort: "Escribe un número de 10 dígitos.",
  typeMismatch: "Revisa el formato."
};
function showErr(el) {
  const box = el.closest("label");
  let e = box.querySelector(".err");
  const v = el.validity;
  const key = Object.keys(MSG).find(k => v[k]);
  if (!key) { if (e) e.remove(); el.removeAttribute("aria-invalid"); return true; }
  if (!e) { e = document.createElement("span"); e.className = "err"; e.id = el.name + "-err"; box.appendChild(e); }
  e.textContent = el.type === "checkbox" ? "Necesitamos tu autorización para responderte." : MSG[key];
  el.setAttribute("aria-invalid", "true");
  el.setAttribute("aria-describedby", e.id);
  return false;
}
document.querySelectorAll("form.lead").forEach(form => {
  const t0 = Date.now(), st = form.querySelector(".lead-status");
  form.querySelectorAll("input,select").forEach(el => el.addEventListener("blur", () => el.value && showErr(el)));
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input,select")].filter(el => !el.closest(".hp"));
    const ok = fields.map(showErr).every(Boolean);
    if (!ok) { fields.find(el => el.getAttribute("aria-invalid"))?.focus(); return; }
    if (form.sitio_web.value || Date.now() - t0 < 3000) { st.textContent = "¡Gracias! Te contactamos pronto."; return; }
    const data = Object.fromEntries(new FormData(form));
    delete data.sitio_web;
    Object.assign(data, { marca: CONFIG.MARCA, origen: form.dataset.origen || "sitio", pagina: location.href, utm: location.search, fecha: new Date().toISOString() });
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      const r = await fetch(CONFIG.WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(r.status);
      st.textContent = "¡Gracias! Te escribimos por WhatsApp en menos de un día hábil.";
      form.reset();
    } catch {
      const txt = encodeURIComponent(`Hola, vengo de la página de ${CONFIG.MARCA} y quiero cotizar mi proyecto. Soy ${data.nombre}.`);
      st.innerHTML = `No pudimos enviar tu solicitud. <a href="https://wa.me/${CONFIG.WA}?text=${txt}">Escríbenos por WhatsApp</a>.`;
    } finally { btn.disabled = false; }
  });
});
