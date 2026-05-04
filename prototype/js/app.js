/**
 * app.js - Sistema de Informacion de Agricultura de Precision
 * Utilidades compartidas: navegacion, alertas UI, helpers.
 */

function setActiveNav(pageId) {
  document.querySelectorAll('#sidebar-nav a').forEach(link => {
    const isActive = link.dataset.page === pageId;
    if (isActive) {
      link.classList.remove('text-[#f0f9f4]/70','hover:bg-[#404e7c]','hover:text-[#f0f9f4]');
      link.classList.add('bg-[#86cb92]','text-white');
    } else {
      link.classList.remove('bg-[#86cb92]','text-white');
      link.classList.add('text-[#f0f9f4]/70','hover:bg-[#404e7c]','hover:text-[#f0f9f4]');
    }
  });
}

function updateNotificationBadge() {
  const data = window.AgroData.getData();
  const pendientes = window.AgroData.getAlertasPendientes(data);
  const bell = document.getElementById('header-notifications');
  if (!bell) return;
  const existing = bell.querySelector('.notification-dot');
  if (pendientes.length > 0) {
    if (!existing) {
      const dot = document.createElement('span');
      dot.className = 'notification-dot absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#c44b4b] text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center';
      dot.textContent = pendientes.length;
      bell.appendChild(dot);
    } else {
      existing.textContent = pendientes.length;
    }
  } else if (existing) { existing.remove(); }
}

function renderSidebar(activePage) {
  const container = document.getElementById('sidebar-container');
  if (!container) return;
  const pages = [
    { id:'dashboard', label:'Panel de Control', icon:'lucide:layout-dashboard', href:'index.html' },
    { id:'alertas', label:'Alertas', icon:'lucide:bell', href:'alertas.html' },
    { id:'crops', label:'Cultivos', icon:'lucide:wheat', href:'cultivos.html' },
    { id:'historico', label:'Historico', icon:'lucide:line-chart', href:'historico.html' },
    { id:'datos', label:'Carga de datos', icon:'lucide:upload', href:'datos.html' },
  ];
  let navHtml = '';
  pages.forEach(p => {
    const activeCls = p.id === activePage ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]';
    navHtml += `<a href="${p.href}" data-page="${p.id}" class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors ${activeCls}"><iconify-icon icon="${p.icon}" class="text-xl"></iconify-icon><span class="text-sm font-medium">${p.label}</span></a>`;
  });
  container.innerHTML = navHtml;
  setActiveNav(activePage);
}

function showToast(msg, type='info') {
  let el = document.getElementById('toast-container');
  if (!el) { el = document.createElement('div'); el.id='toast-container'; el.className='fixed bottom-6 right-6 z-50 flex flex-col gap-2'; document.body.appendChild(el); }
  const toast = document.createElement('div');
  const colors = { info:'bg-[#404e7c]', warning:'bg-[#d4a84b]', danger:'bg-[#c44b4b]', success:'bg-[#3b9e5a]' };
  toast.className = `${colors[type] || colors.info} text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-opacity duration-300 opacity-0`;
  toast.textContent = msg;
  el.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove('opacity-0'));
  setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(() => toast.remove(), 300); }, 3000);
}

window.AgroApp = { setActiveNav, updateNotificationBadge, renderSidebar, showToast };
