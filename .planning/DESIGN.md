{
  "name": "Sidebar",
  "description": "Barra lateral fija con navegación principal, logo y perfil de usuario",
  "defaultProps": {
    "activeItem": "dashboard",
    "dashboardHref": "#dashboard",
    "cropsHref": "#crops",
    "irrigationHref": "#irrigation",
    "weatherHref": "#weather",
    "reportsHref": "#reports",
    "settingsHref": "#settings",
    "userName": "John Doe",
    "userRole": "Gerente de Granja",
    "userInitials": "JD"
  },
  "htmlContent": "<aside class=\"w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0\">\n  <!-- Logo Area -->\n  <div class=\"h-12 flex items-center gap-3 px-6 border-b border-white/10\">\n    <div class=\"w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center\">\n      <iconify-icon icon=\"lucide:leaf\" class=\"text-white text-lg\"></iconify-icon>\n    </div>\n    <span class=\"text-[#f0f9f4] font-bold text-lg tracking-tight\">AgroTech</span>\n  </div>\n\n  <!-- Navigation -->\n  <nav class=\"flex-1 px-4 py-6 space-y-1 overflow-y-auto\">\n    <a :href=\"dashboardHref\" \n       :class=\"activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:layout-dashboard\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Panel de Control</span>\n    </a>\n    \n    <a :href=\"cropsHref\" \n       :class=\"activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:wheat\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Cultivos</span>\n    </a>\n\n    <a :href=\"irrigationHref\" \n       :class=\"activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:droplets\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Riego</span>\n    </a>\n\n    <a :href=\"weatherHref\" \n       :class=\"activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:cloud-sun\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Clima</span>\n    </a>\n\n    <a :href=\"reportsHref\" \n       :class=\"activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:clipboard-list\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Reportes</span>\n    </a>\n\n    <a :href=\"settingsHref\" \n       :class=\"activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'\" \n       class=\"flex items-center gap-3 h-10 px-3 rounded-md transition-colors\">\n      <iconify-icon icon=\"lucide:settings\" class=\"text-xl\"></iconify-icon>\n      <span class=\"text-sm font-medium\">Configuración</span>\n    </a>\n  </nav>\n\n  <!-- User Section -->\n  <div class=\"p-4 border-t border-white/10\">\n    <div class=\"flex items-center gap-3 mb-3\">\n      <div class=\"w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm\">\n        {{ userInitials }}\n      </div>\n      <div class=\"flex-1 min-w-0\">\n        <p class=\"text-[#f0f9f4] text-sm font-medium truncate\">{{ userName }}</p>\n        <p class=\"text-[#f0f9f4]/50 text-xs truncate\">{{ userRole }}</p>\n      </div>\n    </div>\n    <button @click=\"$emit('logout')\" class=\"w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors\">\n      <iconify-icon icon=\"lucide:log-out\" class=\"text-base\"></iconify-icon>\n      Cerrar sesión\n    </button>\n  </div>\n</aside>"
}

{
  "name": "Header",
  "description": "Encabezado fijo con búsqueda, notificaciones y menú de usuario",
  "defaultProps": {
    "hasNotifications": true,
    "userInitials": "JD"
  },
  "htmlContent": "<header class=\"sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0\">\n  <h1 class=\"text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight\">Panel de Control</h1>\n  \n  <div class=\"flex items-center gap-6\">\n    <!-- Search Bar -->\n    <div class=\"relative w-80\">\n      <iconify-icon icon=\"lucide:search\" class=\"absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg\"></iconify-icon>\n      <input \n        type=\"text\" \n        placeholder=\"Buscar sensores, cultivos...\" \n        class=\"w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all\"\n        @input=\"$emit('search', { query: $event.target.value })\"\n      >\n    </div>\n\n    <!-- Notifications -->\n    <button \n      @click=\"$emit('notifyClick')\"\n      class=\"relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors\"\n    >\n      <iconify-icon icon=\"lucide:bell\" class=\"text-[#64748b] text-xl\"></iconify-icon>\n      <span \n        v-if=\"hasNotifications\"\n        class=\"absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white\"\n      ></span>\n    </button>\n\n    <!-- User Dropdown -->\n    <button \n      @click=\"$emit('userClick')\"\n      class=\"flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors\"\n    >\n      <div class=\"w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs\">\n        {{ userInitials }}\n      </div>\n      <iconify-icon icon=\"lucide:chevron-down\" class=\"text-[#64748b] text-base\"></iconify-icon>\n    </button>\n  </div>\n</header>"
}

Page: Panel de Control Agro-Tech

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Control</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar -->
    <aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
      <!-- Logo Area -->
      <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
        <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
          <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
        </div>
        <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <a href="#" id="nav-dashboard" class="flex items-center gap-3 h-10 px-3 rounded-md bg-[#86cb92] text-white transition-colors">
          <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Panel de Control</span>
        </a>
        <a href="#" id="nav-crops" class="flex items-center gap-3 h-10 px-3 rounded-md text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4] transition-colors">
          <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Cultivos</span>
        </a>
        <a href="#" id="nav-irrigation" class="flex items-center gap-3 h-10 px-3 rounded-md text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4] transition-colors">
          <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Riego</span>
        </a>
        <a href="#" id="nav-weather" class="flex items-center gap-3 h-10 px-3 rounded-md text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4] transition-colors">
          <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Clima</span>
        </a>
        <a href="#" id="nav-reports" class="flex items-center gap-3 h-10 px-3 rounded-md text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4] transition-colors">
          <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Reportes</span>
        </a>
        <a href="#" id="nav-settings" class="flex items-center gap-3 h-10 px-3 rounded-md text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4] transition-colors">
          <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
          <span class="text-sm font-medium">Configuración</span>
        </a>
      </nav>

      <!-- User Section -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
            JD
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[#f0f9f4] text-sm font-medium truncate">John Doe</p>
            <p class="text-[#f0f9f4]/50 text-xs truncate">Gerente de Granja</p>
          </div>
        </div>
        <button id="sidebar-logout-btn" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
          <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header -->
      <header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
        <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
        
        <div class="flex items-center gap-6">
          <!-- Search Bar -->
          <div class="relative w-80">
            <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
            <input 
              type="text" 
              placeholder="Buscar sensores, cultivos..." 
              class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
            >
          </div>

          <!-- Notifications -->
          <button id="header-notifications" class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors">
            <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
            <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"></span>
          </button>

          <!-- User Dropdown -->
          <button id="header-user-dropdown" class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors">
            <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
              JD
            </div>
            <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">
          
          <!-- Stats Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <!-- Stat Card 1 -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+12%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">2,847</p>
              <p class="text-[11px] font-medium text-[#64748b]">Total de Cultivos</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">del mes anterior</p>
            </div>

            <!-- Stat Card 2 -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+5.2%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">4,291</p>
              <p class="text-[11px] font-medium text-[#64748b]">Agua Usada (L)</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">del mes anterior</p>
            </div>

            <!-- Stat Card 3 -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:thermometer" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+2.1%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">28.5°C</p>
              <p class="text-[11px] font-medium text-[#64748b]">Temperatura Promedio</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">del mes anterior</p>
            </div>

            <!-- Stat Card 4 -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:package" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+8.3%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">1,245 kg</p>
              <p class="text-[11px] font-medium text-[#64748b]">Rendimiento Estimado</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">del mes anterior</p>
            </div>
          </div>

          <!-- Area Chart Section -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Tendencias de Humedad del Suelo</h2>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                <span class="text-xs font-medium text-[#64748b]">Humedad %</span>
              </div>
            </div>
            
            <div class="w-full h-[220px]">
              <svg viewBox="0 0 800 300" class="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#86cb92" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                
                <!-- Grid Lines -->
                <line x1="50" y1="260" x2="770" y2="260" stroke="#e2e8f0" stroke-width="1"/>
                <line x1="50" y1="200" x2="770" y2="200" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                <line x1="50" y1="140" x2="770" y2="140" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                <line x1="50" y1="80" x2="770" y2="80" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                <line x1="50" y1="20" x2="770" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                
                <!-- Y Axis Labels -->
                <text x="40" y="265" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">0%</text>
                <text x="40" y="205" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">25%</text>
                <text x="40" y="145" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">50%</text>
                <text x="40" y="85" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">75%</text>
                <text x="40" y="25" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">100%</text>
                
                <!-- Area Fill -->
                <path d="M 50 260 L 50 111.2 L 170 128 L 290 92 L 410 144.8 L 530 80 L 650 116 L 770 96.8 L 770 260 Z" fill="url(#moistureGradient)"/>
                
                <!-- Line Stroke -->
                <path d="M 50 111.2 L 170 128 L 290 92 L 410 144.8 L 530 80 L 650 116 L 770 96.8" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                
                <!-- Data Points -->
                <circle cx="50" cy="111.2" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="170" cy="128" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="290" cy="92" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="410" cy="144.8" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="530" cy="80" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="650" cy="116" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                <circle cx="770" cy="96.8" r="5" fill="#86cb92" stroke="white" stroke-width="2"/>
                
                <!-- X Axis Labels -->
                <text x="50" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Lun</text>
                <text x="170" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Mar</text>
                <text x="290" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Mié</text>
                <text x="410" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Jue</text>
                <text x="530" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Vie</text>
                <text x="650" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Sáb</text>
                <text x="770" y="285" text-anchor="middle" fill="#64748b" font-size="12" font-family="Inter" font-weight="500">Dom</text>
              </svg>
            </div>
          </div>

          <!-- Data Table Section -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] overflow-hidden">
            <div class="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Lecturas Recientes de Sensores</h2>
              <button id="table-view-all" class="text-sm font-medium text-[#86cb92] hover:text-[#71b48d] transition-colors">
                Ver todo
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-[#404e7c]">
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">
                      <div class="flex items-center gap-1 cursor-pointer select-none">
                        ID del Sensor
                        <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                      </div>
                    </th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">
                      <div class="flex items-center gap-1 cursor-pointer select-none">
                        Temperatura (°C)
                        <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                      </div>
                    </th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">
                      <div class="flex items-center gap-1 cursor-pointer select-none">
                        Humedad (%)
                        <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                      </div>
                    </th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">
                      <div class="flex items-center gap-1 cursor-pointer select-none">
                        Humedad del Suelo (%)
                        <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                      </div>
                    </th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">
                      <div class="flex items-center gap-1 cursor-pointer select-none">
                        Última Actualización
                        <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-[0.8125rem]">
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2 font-medium text-[#1a1f2b]">SN-1024</td>
                    <td class="px-3 py-2 text-[#64748b]">24.5°C</td>
                    <td class="px-3 py-2 text-[#64748b]">68%</td>
                    <td class="px-3 py-2">
                      <div class="flex items-center gap-2">
                        <div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 45.2%"></div>
                        </div>
                        <span class="text-[#1a1f2b] font-medium">45.2%</span>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-[#94a3b8]">2 mins ago</td>
                  </tr>
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2 font-medium text-[#1a1f2b]">SN-1025</td>
                    <td class="px-3 py-2 text-[#64748b]">26.2°C</td>
                    <td class="px-3 py-2 text-[#64748b]">72%</td>
                    <td class="px-3 py-2">
                      <div class="flex items-center gap-2">
                        <div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 52.8%"></div>
                        </div>
                        <span class="text-[#1a1f2b] font-medium">52.8%</span>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-[#94a3b8]">5 mins ago</td>
                  </tr>
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2 font-medium text-[#1a1f2b]">SN-1026</td>
                    <td class="px-3 py-2 text-[#64748b]">23.8°C</td>
                    <td class="px-3 py-2 text-[#64748b]">65%</td>
                    <td class="px-3 py-2">
                      <div class="flex items-center gap-2">
                        <div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#d4a84b] rounded-full" style="width: 38.5%"></div>
                        </div>
                        <span class="text-[#1a1f2b] font-medium">38.5%</span>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-[#94a3b8]">12 mins ago</td>
                  </tr>
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2 font-medium text-[#1a1f2b]">SN-1027</td>
                    <td class="px-3 py-2 text-[#64748b]">27.1°C</td>
                    <td class="px-3 py-2 text-[#64748b]">74%</td>
                    <td class="px-3 py-2">
                      <div class="flex items-center gap-2">
                        <div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#71b48d] rounded-full" style="width: 61.3%"></div>
                        </div>
                        <span class="text-[#1a1f2b] font-medium">61.3%</span>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-[#94a3b8]">15 mins ago</td>
                  </tr>
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2 font-medium text-[#1a1f2b]">SN-1028</td>
                    <td class="px-3 py-2 text-[#64748b]">25.4°C</td>
                    <td class="px-3 py-2 text-[#64748b]">70%</td>
                    <td class="px-3 py-2">
                      <div class="flex items-center gap-2">
                        <div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 49.7%"></div>
                        </div>
                        <span class="text-[#1a1f2b] font-medium">49.7%</span>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-[#94a3b8]">28 mins ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between">
              <p class="text-sm text-[#64748b]">Mostrando <span class="font-medium text-[#1a1f2b]">1-5</span> de <span class="font-medium text-[#1a1f2b]">24</span> resultados</p>
              <div class="flex items-center gap-2">
                <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors disabled:opacity-50" disabled>
                  Anterior
                </button>
                <button class="w-8 h-8 rounded-lg bg-[#86cb92] text-white text-sm font-medium flex items-center justify-center">1</button>
                <button class="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-sm font-medium flex items-center justify-center transition-colors">2</button>
                <button class="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-sm font-medium flex items-center justify-center transition-colors">3</button>
                <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement


Page: Gestión de Cultivos - Agro-Tech Dashboard

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestión de Cultivos</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">

    <!-- Sidebar (reutilizable) -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;crops&quot;,&quot;dashboardHref&quot;:&quot;https://p.superdesign.dev/draft/1b550acf-432a-45da-a24a-b1a92c63e50d&quot;,&quot;cropsHref&quot;:&quot;#crops&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-a19939de-f3bb-477b-a03d-3eff1bf9487e.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">

      <!-- Header (reutilizable) -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">

          <!-- Filters Row -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] px-5 py-4">
            <div class="flex flex-wrap items-center gap-3">
              <!-- Status Filter -->
              <div class="relative">
                <select class="appearance-none bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-[#1a1f2b] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer hover:border-[#86cb92] transition-colors">
                  <option>Estado: Todos</option>
                  <option>Saludable</option>
                  <option>Advertencia</option>
                  <option>Crítico</option>
                </select>
                <iconify-icon icon="lucide:chevron-down" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] text-sm pointer-events-none"></iconify-icon>
              </div>

              <!-- Crop Type Filter -->
              <div class="relative">
                <select class="appearance-none bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-[#1a1f2b] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer hover:border-[#86cb92] transition-colors">
                  <option>Tipo: Todos</option>
                  <option>Trigo</option>
                  <option>Maíz</option>
                  <option>Soja</option>
                  <option>Cebada</option>
                </select>
                <iconify-icon icon="lucide:chevron-down" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] text-sm pointer-events-none"></iconify-icon>
              </div>

              <!-- Sort Filter -->
              <div class="relative">
                <select class="appearance-none bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-[#1a1f2b] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer hover:border-[#86cb92] transition-colors">
                  <option>Ordenar por: Nombre</option>
                  <option>Estado</option>
                  <option>Fecha de Plantación</option>
                </select>
                <iconify-icon icon="lucide:chevron-down" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] text-sm pointer-events-none"></iconify-icon>
              </div>

              <div class="flex-1"></div>

              <!-- Add Crop Button -->
              <button id="btn-agregar-cultivo" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#86cb92] text-white text-sm font-semibold hover:bg-[#71b48d] transition-colors shadow-sm">
                <iconify-icon icon="lucide:plus" class="text-base"></iconify-icon>
                Agregar Cultivo
              </button>
            </div>
          </div>

          <!-- Crops Data Table -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] overflow-hidden">
            <div class="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Lista de Cultivos</h2>
              <span class="text-sm text-[#64748b]">8 cultivos registrados</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-[#404e7c]">
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider w-14">Miniatura</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Nombre del Cultivo</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Variedad</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Etapa de Crecimiento</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Estado de Salud</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Fecha de Plantación</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider">Cosecha Estimada</th>
                    <th class="px-3 py-2.5 text-white text-[11px] font-semibold uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="text-[0.8125rem]">

                  <!-- Row 1: Trigo A -->
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#86cb92]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Trigo A</td>
                    <td class="px-3 py-2.5 text-[#64748b]">TR-120</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 60%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Floración</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#3b9e5a]/10 text-[#3b9e5a]">
                        Saludable
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">15/04/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">20/08/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 2: Maíz B -->
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#d4a84b]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:leaf" class="text-[#d4a84b] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Maíz B</td>
                    <td class="px-3 py-2.5 text-[#64748b]">MZ-350</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 40%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Vegetativo</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#d4a84b]/10 text-[#d4a84b]">
                        Advertencia
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">10/05/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">15/09/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 3: Soja C -->
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#3b9e5a]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:bean" class="text-[#3b9e5a] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Soja C</td>
                    <td class="px-3 py-2.5 text-[#64748b]">SJ-40</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 20%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Germinación</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#3b9e5a]/10 text-[#3b9e5a]">
                        Saludable
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">01/06/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">10/11/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 4: Cebada D -->
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#c44b4b]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:wheat" class="text-[#c44b4b] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Cebada D</td>
                    <td class="px-3 py-2.5 text-[#64748b]">CB-25</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 80%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Maduración</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#c44b4b]/10 text-[#c44b4b]">
                        Crítico
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">20/04/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">25/08/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 5: Trigo E -->
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#86cb92]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Trigo E</td>
                    <td class="px-3 py-2.5 text-[#64748b]">TR-200</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 100%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Cosecha</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#3b9e5a]/10 text-[#3b9e5a]">
                        Saludable
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">05/03/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">10/07/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 6: Maíz F -->
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#d4a84b]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:leaf" class="text-[#d4a84b] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Maíz F</td>
                    <td class="px-3 py-2.5 text-[#64748b]">MZ-400</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 60%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Floración</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#3b9e5a]/10 text-[#3b9e5a]">
                        Saludable
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">15/05/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">20/09/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 7: Soja G -->
                  <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#d4a84b]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:bean" class="text-[#d4a84b] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Soja G</td>
                    <td class="px-3 py-2.5 text-[#64748b]">SJ-50</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 40%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Vegetativo</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#d4a84b]/10 text-[#d4a84b]">
                        Advertencia
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">20/05/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">25/10/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 8: Cebada H -->
                  <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                    <td class="px-3 py-2.5">
                      <div class="w-9 h-9 rounded-lg bg-[#86cb92]/15 flex items-center justify-center">
                        <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-base"></iconify-icon>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-[#1a1f2b]">Cebada H</td>
                    <td class="px-3 py-2.5 text-[#64748b]">CB-30</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div class="h-full bg-[#86cb92] rounded-full" style="width: 20%"></div>
                        </div>
                        <span class="text-[11px] font-medium text-[#64748b] whitespace-nowrap">Germinación</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#3b9e5a]/10 text-[#3b9e5a]">
                        Saludable
                      </span>
                    </td>
                    <td class="px-3 py-2.5 text-[#64748b]">25/05/2024</td>
                    <td class="px-3 py-2.5 text-[#64748b]">30/10/2024</td>
                    <td class="px-3 py-2.5 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#404e7c] transition-colors" title="Monitorear">
                          <iconify-icon icon="lucide:activity" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#71b48d] transition-colors" title="Riego">
                          <iconify-icon icon="lucide:droplets" class="text-sm"></iconify-icon>
                        </button>
                        <button class="p-1.5 rounded-md hover:bg-[#f1f5f9] text-[#86cb92] transition-colors" title="Cosechar">
                          <iconify-icon icon="lucide:scissors" class="text-sm"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between">
              <p class="text-sm text-[#64748b]">Mostrando <span class="font-medium text-[#1a1f2b]">1-8</span> de <span class="font-medium text-[#1a1f2b]">8</span> resultados</p>
              <div class="flex items-center gap-2">
                <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors disabled:opacity-50" disabled>
                  Anterior
                </button>
                <button class="w-8 h-8 rounded-lg bg-[#86cb92] text-white text-sm font-medium flex items-center justify-center">1</button>
                <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors" disabled>
                  Siguiente
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Control de Riego

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Control de Riego</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    .toggle-checkbox:checked {
      right: 0;
      border-color: #86cb92;
    }
    .toggle-checkbox:checked + .toggle-label {
      background-color: #86cb92;
    }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar Component -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;irrigation&quot;,&quot;dashboardHref&quot;:&quot;#dashboard&quot;,&quot;cropsHref&quot;:&quot;#crops&quot;,&quot;irrigationHref&quot;:&quot;#irrigation&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;#reports&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header Component -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-6">
          
          <!-- Water Statistics Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl shadow-sm p-4 border border-[#f1f5f9]">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <span class="text-xs font-medium text-[#64748b]">Total agua usada hoy</span>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none">1,240 L</p>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 border border-[#f1f5f9]">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-full bg-[#3b9e5a]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:arrow-down" class="text-[#3b9e5a] text-lg"></iconify-icon>
                </div>
                <span class="text-xs font-medium text-[#64748b]">Agua ahorrada</span>
              </div>
              <div class="flex items-baseline gap-2">
                <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none">85 L</p>
                <span class="text-xs font-semibold text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">vs programado</span>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 border border-[#f1f5f9]">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-full bg-[#d4a84b]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:clock" class="text-[#d4a84b] text-lg"></iconify-icon>
                </div>
                <span class="text-xs font-medium text-[#64748b]">Próximo riego en</span>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none">2h 30min</p>
            </div>
          </div>

          <!-- Irrigation Zone Cards -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Zonas de Riego</h2>
              <button id="btn-add-zone" class="px-4 py-2 bg-[#86cb92] text-white text-sm font-medium rounded-lg hover:bg-[#71b48d] transition-colors flex items-center gap-2">
                <iconify-icon icon="lucide:plus" class="text-base"></iconify-icon>
                Nueva zona
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <!-- Zone Card 1 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Zona Norte</h3>
                      <p class="text-xs text-[#64748b]">2.5 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-zona-norte" class="toggle-checkbox sr-only" checked>
                    <label for="toggle-zona-norte" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#86cb92] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">450 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">320 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#86cb92] h-2 rounded-full" style="width: 71%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:clock" class="text-[#d4a84b] text-xs"></iconify-icon>
                    <span class="text-xs text-[#64748b]">Siguiente riego: en 2 horas</span>
                  </div>
                </div>
              </div>

              <!-- Zone Card 2 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Zona Sur</h3>
                      <p class="text-xs text-[#64748b]">3.2 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-zona-sur" class="toggle-checkbox sr-only" checked>
                    <label for="toggle-zona-sur" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#86cb92] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">600 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">180 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#86cb92] h-2 rounded-full" style="width: 30%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:clock" class="text-[#d4a84b] text-xs"></iconify-icon>
                    <span class="text-xs text-[#64748b]">Siguiente riego: en 45 min</span>
                  </div>
                </div>
              </div>

              <!-- Zone Card 3 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Zona Este</h3>
                      <p class="text-xs text-[#64748b]">1.8 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-zona-este" class="toggle-checkbox sr-only">
                    <label for="toggle-zona-este" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#cbd5e1] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-0.5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">320 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">0 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#cbd5e1] h-2 rounded-full" style="width: 0%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:pause-circle" class="text-[#94a3b8] text-xs"></iconify-icon>
                    <span class="text-xs text-[#94a3b8]">Riego manual desactivado</span>
                  </div>
                </div>
              </div>

              <!-- Zone Card 4 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Zona Oeste</h3>
                      <p class="text-xs text-[#64748b]">4.0 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-zona-oeste" class="toggle-checkbox sr-only" checked>
                    <label for="toggle-zona-oeste" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#86cb92] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">750 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">620 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#86cb92] h-2 rounded-full" style="width: 83%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:clock" class="text-[#d4a84b] text-xs"></iconify-icon>
                    <span class="text-xs text-[#64748b]">Siguiente riego: en 5 horas</span>
                  </div>
                </div>
              </div>

              <!-- Zone Card 5 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Zona Central</h3>
                      <p class="text-xs text-[#64748b]">2.0 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-zona-central" class="toggle-checkbox sr-only" checked>
                    <label for="toggle-zona-central" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#86cb92] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">400 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">400 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#3b9e5a] h-2 rounded-full" style="width: 100%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:check-circle" class="text-[#3b9e5a] text-xs"></iconify-icon>
                    <span class="text-xs text-[#3b9e5a]">Riego completado hoy</span>
                  </div>
                </div>
              </div>

              <!-- Zone Card 6 -->
              <div class="rounded-lg border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow bg-white">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                      <iconify-icon icon="lucide:sprout" class="text-[#86cb92] text-xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#1a1f2b] text-sm">Invernadero</h3>
                      <p class="text-xs text-[#64748b]">0.8 ha</p>
                    </div>
                  </div>
                  <div class="relative inline-block w-11 h-6">
                    <input type="checkbox" id="toggle-invernadero" class="toggle-checkbox sr-only" checked>
                    <label for="toggle-invernadero" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#86cb92] cursor-pointer transition-colors">
                      <span class="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-5 mt-0.5 transition-transform"></span>
                    </label>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua programada</span>
                    <span class="font-medium text-[#1a1f2b]">180 L/día</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-[#64748b]">Agua usada</span>
                    <span class="font-medium text-[#1a1f2b]">120 L</span>
                  </div>
                  <div class="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div class="bg-[#86cb92] h-2 rounded-full" style="width: 67%"></div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1">
                    <iconify-icon icon="lucide:clock" class="text-[#d4a84b] text-xs"></iconify-icon>
                    <span class="text-xs text-[#64748b]">Siguiente riego: en 3 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Zone Map -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Mapa de Zonas de Riego</h2>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-sm bg-[#3b9e5a]"></span>
                  <span class="text-xs text-[#64748b]">Activo</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-sm bg-[#d4a84b]"></span>
                  <span class="text-xs text-[#64748b]">Programado</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-sm bg-[#cbd5e1]"></span>
                  <span class="text-xs text-[#64748b]">Sin riego</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="relative rounded-lg bg-[#3b9e5a] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-white font-bold text-lg">Z1</span>
                  <iconify-icon icon="lucide:droplets" class="text-white/70 text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-white text-xs font-medium">Zona Norte</p>
                  <p class="text-white/70 text-[10px]">Riego activo</p>
                </div>
              </div>
              <div class="relative rounded-lg bg-[#3b9e5a] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-white font-bold text-lg">Z2</span>
                  <iconify-icon icon="lucide:droplets" class="text-white/70 text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-white text-xs font-medium">Zona Sur</p>
                  <p class="text-white/70 text-[10px]">Riego activo</p>
                </div>
              </div>
              <div class="relative rounded-lg bg-[#cbd5e1] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-[#64748b] font-bold text-lg">Z3</span>
                  <iconify-icon icon="lucide:droplets" class="text-[#94a3b8] text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-[#64748b] text-xs font-medium">Zona Este</p>
                  <p class="text-[#94a3b8] text-[10px]">Sin riego</p>
                </div>
              </div>
              <div class="relative rounded-lg bg-[#d4a84b] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-white font-bold text-lg">Z4</span>
                  <iconify-icon icon="lucide:clock" class="text-white/70 text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-white text-xs font-medium">Zona Oeste</p>
                  <p class="text-white/70 text-[10px]">Programado: 14:00</p>
                </div>
              </div>
              <div class="relative rounded-lg bg-[#d4a84b] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-white font-bold text-lg">Z5</span>
                  <iconify-icon icon="lucide:clock" class="text-white/70 text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-white text-xs font-medium">Zona Central</p>
                  <p class="text-white/70 text-[10px]">Programado: 18:00</p>
                </div>
              </div>
              <div class="relative rounded-lg bg-[#d4a84b] p-4 h-24 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity group">
                <div class="flex justify-between items-start">
                  <span class="text-white font-bold text-lg">Z6</span>
                  <iconify-icon icon="lucide:clock" class="text-white/70 text-sm"></iconify-icon>
                </div>
                <div>
                  <p class="text-white text-xs font-medium">Invernadero</p>
                  <p class="text-white/70 text-[10px]">Programado: 20:30</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Irrigation Timeline -->
          <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5 overflow-hidden">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Timeline de Riego - Próximas 24h</h2>
              <span class="text-xs text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full">Hoy, 14 Jun</span>
            </div>
            
            <div class="relative overflow-x-auto pb-2">
              <div class="min-w-[600px] relative">
                <!-- Current time indicator -->
                <div class="absolute top-0 bottom-0 w-0.5 bg-[#c44b4b] z-10" style="left: 35%"></div>
                <div class="absolute -top-1 z-10 px-1.5 py-0.5 bg-[#c44b4b] text-white text-[10px] font-medium rounded" style="left: 33.5%">Ahora</div>
                
                <!-- Time labels -->
                <div class="flex justify-between mb-3 px-2">
                  <span class="text-xs text-[#64748b] font-medium">00:00</span>
                  <span class="text-xs text-[#64748b] font-medium">04:00</span>
                  <span class="text-xs text-[#64748b] font-medium">08:00</span>
                  <span class="text-xs text-[#64748b] font-medium">12:00</span>
                  <span class="text-xs text-[#64748b] font-medium">16:00</span>
                  <span class="text-xs text-[#64748b] font-medium">20:00</span>
                </div>
                
                <!-- Timeline bars -->
                <div class="space-y-3">
                  <!-- Zone Norte -->
                  <div class="flex items-center">
                    <span class="text-xs font-medium text-[#1a1f2b] w-24 truncate">Zona Norte</span>
                    <div class="flex-1 relative h-6 bg-[#f1f5f9] rounded-full overflow-hidden mx-2">
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 20%; width: 8%"></div>
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 60%; width: 8%"></div>
                      <div class="absolute h-full bg-[#86cb92] rounded-full" style="left: 75%; width: 6%"></div>
                    </div>
                  </div>
                  <!-- Zone Sur -->
                  <div class="flex items-center">
                    <span class="text-xs font-medium text-[#1a1f2b] w-24 truncate">Zona Sur</span>
                    <div class="flex-1 relative h-6 bg-[#f1f5f9] rounded-full overflow-hidden mx-2">
                      <div class="absolute h-full bg-[#86cb92] rounded-full" style="left: 33%; width: 10%"></div>
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 80%; width: 8%"></div>
                    </div>
                  </div>
                  <!-- Zone Oeste -->
                  <div class="flex items-center">
                    <span class="text-xs font-medium text-[#1a1f2b] w-24 truncate">Zona Oeste</span>
                    <div class="flex-1 relative h-6 bg-[#f1f5f9] rounded-full overflow-hidden mx-2">
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 15%; width: 6%"></div>
                      <div class="absolute h-full bg-[#86cb92] rounded-full" style="left: 58%; width: 12%"></div>
                    </div>
                  </div>
                  <!-- Zone Central -->
                  <div class="flex items-center">
                    <span class="text-xs font-medium text-[#1a1f2b] w-24 truncate">Zona Central</span>
                    <div class="flex-1 relative h-6 bg-[#f1f5f9] rounded-full overflow-hidden mx-2">
                      <div class="absolute h-full bg-[#86cb92] rounded-full" style="left: 42%; width: 8%"></div>
                    </div>
                  </div>
                  <!-- Invernadero -->
                  <div class="flex items-center">
                    <span class="text-xs font-medium text-[#1a1f2b] w-24 truncate">Invernadero</span>
                    <div class="flex-1 relative h-6 bg-[#f1f5f9] rounded-full overflow-hidden mx-2">
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 8%; width: 10%"></div>
                      <div class="absolute h-full bg-[#86cb92]/40 rounded-full" style="left: 50%; width: 6%"></div>
                      <div class="absolute h-full bg-[#86cb92] rounded-full" style="left: 85%; width: 8%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Reportes de Granja

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reportes de Granja</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;reports&quot;,&quot;dashboardHref&quot;:&quot;https://draft-1b550acf-432a-45da-a24a-b1a92c63e50d.preview.superdesign.dev&quot;,&quot;cropsHref&quot;:&quot;https://draft-9bfbbeb1-a3b3-4fba-9a2c-6b8834067df5.preview.superdesign.dev&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-a19939de-f3bb-477b-a03d-3eff1bf9487e.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">
          
          <!-- Page Title & Date Range + Export -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Reportes de Granja</h1>
            
            <div class="flex flex-wrap items-center gap-3">
              <!-- Date Range -->
              <div class="flex items-center gap-2 bg-white rounded-lg border border-[#e2e8f0] px-3 py-2 shadow-sm">
                <iconify-icon icon="lucide:calendar" class="text-[#94a3b8] text-sm"></iconify-icon>
                <input type="text" value="01/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
                <span class="text-[#94a3b8] text-sm">-</span>
                <input type="text" value="31/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
              </div>
              
              <!-- Export Buttons -->
              <button id="btn-export-pdf" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:file-down" class="text-base"></iconify-icon>
                Descargar PDF
              </button>
              <button id="btn-export-excel" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:table" class="text-base"></iconify-icon>
                Descargar Excel
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: Rendimiento Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+15.3%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">12,847 kg</p>
              <p class="text-[11px] font-medium text-[#64748b]">Rendimiento Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 2: Agua Usada -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-down" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">-8.2%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">89,450 L</p>
              <p class="text-[11px] font-medium text-[#64748b]">Agua Usada</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 3: Costo Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:banknote" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+3.7%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">$18,940</p>
              <p class="text-[11px] font-medium text-[#64748b]">Costo Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            <!-- Bar Chart: Rendimiento por Cultivo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Rendimiento por Cultivo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">kg cosechados</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full">
                  <!-- Grid Lines -->
                  <line x1="60" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="60" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="55" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="55" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">1k</text>
                  <text x="55" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">2k</text>
                  <text x="55" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">3k</text>
                  <text x="55" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  
                  <!-- Bars -->
                  <!-- Maíz: 4200kg -->
                  <rect x="75" y="56" width="50" height="164" rx="4" fill="#86cb92"/>
                  <text x="100" y="48" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">4,200</text>
                  
                  <!-- Trigo: 3100kg -->
                  <rect x="155" y="96" width="50" height="124" rx="4" fill="#71b48d"/>
                  <text x="180" y="88" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">3,100</text>
                  
                  <!-- Soja: 2800kg -->
                  <rect x="235" y="108" width="50" height="112" rx="4" fill="#86cb92"/>
                  <text x="260" y="100" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">2,800</text>
                  
                  <!-- Arroz: 1500kg -->
                  <rect x="315" y="156" width="50" height="64" rx="4" fill="#71b48d"/>
                  <text x="340" y="148" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,500</text>
                  
                  <!-- Papa: 1247kg -->
                  <rect x="395" y="166" width="50" height="54" rx="4" fill="#86cb92"/>
                  <text x="420" y="158" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,247</text>
                  
                  <!-- X Axis Labels -->
                  <text x="100" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Maíz</text>
                  <text x="180" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Trigo</text>
                  <text x="260" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Soja</text>
                  <text x="340" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Arroz</text>
                  <text x="420" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Papa</text>
                </svg>
              </div>
            </div>

            <!-- Line Chart: Uso de Agua por Tiempo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Uso de Agua por Tiempo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">Litros</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#86cb92" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid Lines -->
                  <line x1="50" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="50" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="40" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="40" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  <text x="40" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">8k</text>
                  <text x="40" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">12k</text>
                  <text x="40" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">16k</text>
                  
                  <!-- Area Fill -->
                  <path d="M 50 220 L 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80 L 470 220 Z" fill="url(#waterGradient)"/>
                  
                  <!-- Line Stroke -->
                  <path d="M 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <!-- Data Points -->
                  <circle cx="50" cy="140" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="110" cy="125" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="170" cy="147" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="230" cy="95" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="290" cy="110" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="350" cy="75" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="410" cy="122" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="470" cy="80" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  
                  <!-- Data Value Labels -->
                  <text x="50" y="128" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">9.2k</text>
                  <text x="110" y="113" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">10.5k</text>
                  <text x="230" y="83" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">12.4k</text>
                  <text x="350" y="63" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.8k</text>
                  <text x="470" y="68" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.5k</text>
                  
                  <!-- X Axis Labels -->
                  <text x="50" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 1</text>
                  <text x="110" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 2</text>
                  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 3</text>
                  <text x="230" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 4</text>
                  <text x="290" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 5</text>
                  <text x="350" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 6</text>
                  <text x="410" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 7</text>
                  <text x="470" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 8</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Alertas y Notificaciones - AgroTech

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alertas y Notificaciones</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">

    <!-- Sidebar -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;reports&quot;,&quot;dashboardHref&quot;:&quot;https://p.superdesign.dev/draft/1b550acf-432a-45da-a24a-b1a92c63e50d&quot;,&quot;cropsHref&quot;:&quot;https://draft-9bfbbeb1-a3b3-4fba-9a2c-6b8834067df5.preview.superdesign.dev&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-7254d785-5d65-490c-a960-f78b807d3b33.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">

      <!-- Header -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">

          <!-- Page Title & Filter Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Alertas y Notificaciones</h1>

            <div class="flex items-center gap-2 flex-wrap">
              <button id="filter-all" class="px-4 py-2 rounded-full text-sm font-medium bg-[#86cb92] text-white transition-colors">Todos</button>
              <button id="filter-critical" class="px-4 py-2 rounded-full text-sm font-medium border border-[#cbd5e1] text-[#64748b] hover:border-[#c44b4b] hover:text-[#c44b4b] transition-colors">Crítico</button>
              <button id="filter-warning" class="px-4 py-2 rounded-full text-sm font-medium border border-[#cbd5e1] text-[#64748b] hover:border-[#d4a84b] hover:text-[#d4a84b] transition-colors">Advertencia</button>
              <button id="filter-info" class="px-4 py-2 rounded-full text-sm font-medium border border-[#cbd5e1] text-[#64748b] hover:border-[#4a90e2] hover:text-[#4a90e2] transition-colors">Información</button>
            </div>
          </div>

          <!-- Active Alerts Section -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <iconify-icon icon="lucide:bell-ring" class="text-[#c44b4b] text-lg"></iconify-icon>
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Alertas Activas</h2>
              <span class="px-2 py-0.5 rounded-full bg-[#c44b4b]/10 text-[#c44b4b] text-xs font-semibold">4</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <!-- Alert Card 1 - Critical -->
              <div class="bg-white rounded-lg shadow-sm border border-[#f1f5f9] border-l-4 border-l-[#c44b4b] p-4 hover:shadow-md transition-all duration-200">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-full bg-[#c44b4b] animate-pulse"></div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#c44b4b]">Crítico</span>
                  </div>
                  <span class="text-xs text-[#94a3b8]">hace 5 minutos</span>
                </div>
                <h3 class="text-[1rem] font-semibold text-[#1a1f2b] mb-1">Temperatura excede umbral crítico</h3>
                <p class="text-sm text-[#64748b] mb-3">La temperatura del invernadero B ha superado los 35°C, poniendo en riesgo la producción de tomates.</p>
                <div class="flex items-center gap-2 text-xs text-[#94a3b8] mb-4">
                  <iconify-icon icon="lucide:cpu" class="text-sm"></iconify-icon>
                  <span>Sensor SN-1024</span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="alert-1-ack" class="px-4 py-2 rounded-lg bg-[#86cb92] text-white text-sm font-medium hover:bg-[#71b48d] transition-colors">Reconocer</button>
                  <button id="alert-1-dismiss" class="px-4 py-2 rounded-lg border border-[#cbd5e1] text-[#64748b] text-sm font-medium hover:bg-[#f1f5f9] transition-colors">Descartar</button>
                </div>
              </div>

              <!-- Alert Card 2 - Critical -->
              <div class="bg-white rounded-lg shadow-sm border border-[#f1f5f9] border-l-4 border-l-[#c44b4b] p-4 hover:shadow-md transition-all duration-200">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-full bg-[#c44b4b] animate-pulse"></div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#c44b4b]">Crítico</span>
                  </div>
                  <span class="text-xs text-[#94a3b8]">hace 12 minutos</span>
                </div>
                <h3 class="text-[1rem] font-semibold text-[#1a1f2b] mb-1">Humedad del suelo críticamente baja</h3>
                <p class="text-sm text-[#64748b] mb-3">El sector norte registra humedad del 18%, por debajo del mínimo recomendado para cultivos de maíz.</p>
                <div class="flex items-center gap-2 text-xs text-[#94a3b8] mb-4">
                  <iconify-icon icon="lucide:cpu" class="text-sm"></iconify-icon>
                  <span>Sensor SN-1031</span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="alert-2-ack" class="px-4 py-2 rounded-lg bg-[#86cb92] text-white text-sm font-medium hover:bg-[#71b48d] transition-colors">Reconocer</button>
                  <button id="alert-2-dismiss" class="px-4 py-2 rounded-lg border border-[#cbd5e1] text-[#64748b] text-sm font-medium hover:bg-[#f1f5f9] transition-colors">Descartar</button>
                </div>
              </div>

              <!-- Alert Card 3 - Warning -->
              <div class="bg-white rounded-lg shadow-sm border border-[#f1f5f9] border-l-4 border-l-[#d4a84b] p-4 hover:shadow-md transition-all duration-200">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-full bg-[#d4a84b]"></div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#d4a84b]">Advertencia</span>
                  </div>
                  <span class="text-xs text-[#94a3b8]">hace 28 minutos</span>
                </div>
                <h3 class="text-[1rem] font-semibold text-[#1a1f2b] mb-1">Consumo de agua elevado</h3>
                <p class="text-sm text-[#64748b] mb-3">El sistema de riego del sector este ha consumido un 23% más de agua que el promedio semanal.</p>
                <div class="flex items-center gap-2 text-xs text-[#94a3b8] mb-4">
                  <iconify-icon icon="lucide:cpu" class="text-sm"></iconify-icon>
                  <span>Sensor SN-1028</span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="alert-3-ack" class="px-4 py-2 rounded-lg bg-[#86cb92] text-white text-sm font-medium hover:bg-[#71b48d] transition-colors">Reconocer</button>
                  <button id="alert-3-dismiss" class="px-4 py-2 rounded-lg border border-[#cbd5e1] text-[#64748b] text-sm font-medium hover:bg-[#f1f5f9] transition-colors">Descartar</button>
                </div>
              </div>

              <!-- Alert Card 4 - Warning -->
              <div class="bg-white rounded-lg shadow-sm border border-[#f1f5f9] border-l-4 border-l-[#d4a84b] p-4 hover:shadow-md transition-all duration-200">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-full bg-[#d4a84b]"></div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#d4a84b]">Advertencia</span>
                  </div>
                  <span class="text-xs text-[#94a3b8]">hace 45 minutos</span>
                </div>
                <h3 class="text-[1rem] font-semibold text-[#1a1f2b] mb-1">Nivel de pH cercano al límite</h3>
                <p class="text-sm text-[#64748b] mb-3">El pH del suelo en el sector sur ha llegado a 6.8, acercándose al límite superior para cultivos de arándanos.</p>
                <div class="flex items-center gap-2 text-xs text-[#94a3b8] mb-4">
                  <iconify-icon icon="lucide:cpu" class="text-sm"></iconify-icon>
                  <span>Sensor SN-1035</span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="alert-4-ack" class="px-4 py-2 rounded-lg bg-[#86cb92] text-white text-sm font-medium hover:bg-[#71b48d] transition-colors">Reconocer</button>
                  <button id="alert-4-dismiss" class="px-4 py-2 rounded-lg border border-[#cbd5e1] text-[#64748b] text-sm font-medium hover:bg-[#f1f5f9] transition-colors">Descartar</button>
                </div>
              </div>

            </div>
          </section>

          <!-- Past Alerts Section -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <iconify-icon icon="lucide:history" class="text-[#64748b] text-lg"></iconify-icon>
              <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Alertas Anteriores</h2>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-[#404e7c]">
                      <th class="px-4 py-3 text-white text-[11px] font-semibold uppercase tracking-wider w-12">
                        <div class="flex items-center justify-center cursor-pointer select-none">
                          <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                        </div>
                      </th>
                      <th class="px-4 py-3 text-white text-[11px] font-semibold uppercase tracking-wider">
                        <div class="flex items-center gap-1 cursor-pointer select-none">
                          Alerta
                          <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                        </div>
                      </th>
                      <th class="px-4 py-3 text-white text-[11px] font-semibold uppercase tracking-wider">
                        <div class="flex items-center gap-1 cursor-pointer select-none">
                          Sensor
                          <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                        </div>
                      </th>
                      <th class="px-4 py-3 text-white text-[11px] font-semibold uppercase tracking-wider">
                        <div class="flex items-center gap-1 cursor-pointer select-none">
                          Estado
                          <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                        </div>
                      </th>
                      <th class="px-4 py-3 text-white text-[11px] font-semibold uppercase tracking-wider">
                        <div class="flex items-center gap-1 cursor-pointer select-none">
                          Fecha y Hora
                          <iconify-icon icon="lucide:chevrons-up-down" class="text-white/70 text-sm"></iconify-icon>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-[0.8125rem]">
                    <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:circle-alert" class="text-[#c44b4b] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Falla en sistema de bombeo</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">Sector oeste - bomba principal</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1042</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a] text-xs font-medium">
                          <iconify-icon icon="lucide:check-circle" class="text-xs"></iconify-icon>
                          Resuelto
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Hoy, 08:45 AM</td>
                    </tr>
                    <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:triangle-alert" class="text-[#d4a84b] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Viento fuerte detectado</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">Velocidad: 45 km/h - Sector norte</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1051</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a] text-xs font-medium">
                          <iconify-icon icon="lucide:check-circle" class="text-xs"></iconify-icon>
                          Resuelto
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Hoy, 06:20 AM</td>
                    </tr>
                    <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:circle-alert" class="text-[#c44b4b] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Desconexión del sensor</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">Sin señal por más de 30 minutos</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1019</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a] text-xs font-medium">
                          <iconify-icon icon="lucide:check-circle" class="text-xs"></iconify-icon>
                          Resuelto
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Ayer, 11:30 PM</td>
                    </tr>
                    <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:info" class="text-[#4a90e2] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Actualización de firmware</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">Versión 2.4.1 disponible para instalación</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1024</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#404e7c]/10 text-[#404e7c] text-xs font-medium">
                          <iconify-icon icon="lucide:archive" class="text-xs"></iconify-icon>
                          Archivado
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Ayer, 04:15 PM</td>
                    </tr>
                    <tr class="bg-white hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:triangle-alert" class="text-[#d4a84b] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Radiación solar alta</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">UV index: 9 - Se recomienda sombra</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1060</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a] text-xs font-medium">
                          <iconify-icon icon="lucide:check-circle" class="text-xs"></iconify-icon>
                          Resuelto
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Ayer, 02:00 PM</td>
                    </tr>
                    <tr class="bg-[#f9fafb] hover:bg-[#f8fafc] transition-colors">
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center">
                          <iconify-icon icon="lucide:circle-alert" class="text-[#c44b4b] text-base"></iconify-icon>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-[#1a1f2b]">Batería del sensor baja</p>
                        <p class="text-xs text-[#94a3b8] mt-0.5">Nivel restante: 12% - Requiere reemplazo</p>
                      </td>
                      <td class="px-4 py-3 text-[#64748b]">SN-1033</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a] text-xs font-medium">
                          <iconify-icon icon="lucide:check-circle" class="text-xs"></iconify-icon>
                          Resuelto
                        </span>
                      </td>
                      <td class="px-4 py-3 text-[#94a3b8]">Hace 2 días</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between">
                <p class="text-sm text-[#64748b]">Mostrando <span class="font-medium text-[#1a1f2b]">1-6</span> de <span class="font-medium text-[#1a1f2b]">34</span> resultados</p>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors disabled:opacity-50" disabled>
                    Anterior
                  </button>
                  <button class="w-8 h-8 rounded-lg bg-[#86cb92] text-white text-sm font-medium flex items-center justify-center">1</button>
                  <button class="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-sm font-medium flex items-center justify-center transition-colors">2</button>
                  <button class="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-sm font-medium flex items-center justify-center transition-colors">3</button>
                  <button class="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] text-sm font-medium flex items-center justify-center transition-colors">4</button>
                  <button class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a1f2b] text-sm font-medium transition-colors">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Reportes de Granja

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reportes de Granja</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;reports&quot;,&quot;dashboardHref&quot;:&quot;https://draft-1b550acf-432a-45da-a24a-b1a92c63e50d.preview.superdesign.dev&quot;,&quot;cropsHref&quot;:&quot;https://draft-9bfbbeb1-a3b3-4fba-9a2c-6b8834067df5.preview.superdesign.dev&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-a19939de-f3bb-477b-a03d-3eff1bf9487e.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">
          
          <!-- Page Title & Date Range + Export -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Reportes de Granja</h1>
            
            <div class="flex flex-wrap items-center gap-3">
              <!-- Date Range -->
              <div class="flex items-center gap-2 bg-white rounded-lg border border-[#e2e8f0] px-3 py-2 shadow-sm">
                <iconify-icon icon="lucide:calendar" class="text-[#94a3b8] text-sm"></iconify-icon>
                <input type="text" value="01/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
                <span class="text-[#94a3b8] text-sm">-</span>
                <input type="text" value="31/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
              </div>
              
              <!-- Export Buttons -->
              <button id="btn-export-pdf" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:file-down" class="text-base"></iconify-icon>
                Descargar PDF
              </button>
              <button id="btn-export-excel" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:table" class="text-base"></iconify-icon>
                Descargar Excel
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: Rendimiento Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+15.3%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">12,847 kg</p>
              <p class="text-[11px] font-medium text-[#64748b]">Rendimiento Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 2: Agua Usada -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-down" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">-8.2%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">89,450 L</p>
              <p class="text-[11px] font-medium text-[#64748b]">Agua Usada</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 3: Costo Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:banknote" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+3.7%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">$18,940</p>
              <p class="text-[11px] font-medium text-[#64748b]">Costo Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            <!-- Bar Chart: Rendimiento por Cultivo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Rendimiento por Cultivo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">kg cosechados</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full">
                  <!-- Grid Lines -->
                  <line x1="60" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="60" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="55" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="55" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">1k</text>
                  <text x="55" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">2k</text>
                  <text x="55" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">3k</text>
                  <text x="55" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  
                  <!-- Bars -->
                  <!-- Maíz: 4200kg -->
                  <rect x="75" y="56" width="50" height="164" rx="4" fill="#86cb92"/>
                  <text x="100" y="48" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">4,200</text>
                  
                  <!-- Trigo: 3100kg -->
                  <rect x="155" y="96" width="50" height="124" rx="4" fill="#71b48d"/>
                  <text x="180" y="88" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">3,100</text>
                  
                  <!-- Soja: 2800kg -->
                  <rect x="235" y="108" width="50" height="112" rx="4" fill="#86cb92"/>
                  <text x="260" y="100" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">2,800</text>
                  
                  <!-- Arroz: 1500kg -->
                  <rect x="315" y="156" width="50" height="64" rx="4" fill="#71b48d"/>
                  <text x="340" y="148" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,500</text>
                  
                  <!-- Papa: 1247kg -->
                  <rect x="395" y="166" width="50" height="54" rx="4" fill="#86cb92"/>
                  <text x="420" y="158" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,247</text>
                  
                  <!-- X Axis Labels -->
                  <text x="100" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Maíz</text>
                  <text x="180" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Trigo</text>
                  <text x="260" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Soja</text>
                  <text x="340" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Arroz</text>
                  <text x="420" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Papa</text>
                </svg>
              </div>
            </div>

            <!-- Line Chart: Uso de Agua por Tiempo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Uso de Agua por Tiempo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">Litros</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#86cb92" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid Lines -->
                  <line x1="50" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="50" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="40" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="40" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  <text x="40" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">8k</text>
                  <text x="40" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">12k</text>
                  <text x="40" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">16k</text>
                  
                  <!-- Area Fill -->
                  <path d="M 50 220 L 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80 L 470 220 Z" fill="url(#waterGradient)"/>
                  
                  <!-- Line Stroke -->
                  <path d="M 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <!-- Data Points -->
                  <circle cx="50" cy="140" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="110" cy="125" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="170" cy="147" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="230" cy="95" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="290" cy="110" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="350" cy="75" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="410" cy="122" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="470" cy="80" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  
                  <!-- Data Value Labels -->
                  <text x="50" y="128" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">9.2k</text>
                  <text x="110" y="113" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">10.5k</text>
                  <text x="230" y="83" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">12.4k</text>
                  <text x="350" y="63" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.8k</text>
                  <text x="470" y="68" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.5k</text>
                  
                  <!-- X Axis Labels -->
                  <text x="50" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 1</text>
                  <text x="110" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 2</text>
                  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 3</text>
                  <text x="230" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 4</text>
                  <text x="290" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 5</text>
                  <text x="350" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 6</text>
                  <text x="410" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 7</text>
                  <text x="470" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 8</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Reportes de Granja

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reportes de Granja</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;reports&quot;,&quot;dashboardHref&quot;:&quot;https://draft-1b550acf-432a-45da-a24a-b1a92c63e50d.preview.superdesign.dev&quot;,&quot;cropsHref&quot;:&quot;https://draft-9bfbbeb1-a3b3-4fba-9a2c-6b8834067df5.preview.superdesign.dev&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-a19939de-f3bb-477b-a03d-3eff1bf9487e.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">
          
          <!-- Page Title & Date Range + Export -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Reportes de Granja</h1>
            
            <div class="flex flex-wrap items-center gap-3">
              <!-- Date Range -->
              <div class="flex items-center gap-2 bg-white rounded-lg border border-[#e2e8f0] px-3 py-2 shadow-sm">
                <iconify-icon icon="lucide:calendar" class="text-[#94a3b8] text-sm"></iconify-icon>
                <input type="text" value="01/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
                <span class="text-[#94a3b8] text-sm">-</span>
                <input type="text" value="31/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
              </div>
              
              <!-- Export Buttons -->
              <button id="btn-export-pdf" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:file-down" class="text-base"></iconify-icon>
                Descargar PDF
              </button>
              <button id="btn-export-excel" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:table" class="text-base"></iconify-icon>
                Descargar Excel
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: Rendimiento Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+15.3%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">12,847 kg</p>
              <p class="text-[11px] font-medium text-[#64748b]">Rendimiento Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 2: Agua Usada -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-down" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">-8.2%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">89,450 L</p>
              <p class="text-[11px] font-medium text-[#64748b]">Agua Usada</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 3: Costo Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:banknote" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+3.7%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">$18,940</p>
              <p class="text-[11px] font-medium text-[#64748b]">Costo Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            <!-- Bar Chart: Rendimiento por Cultivo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Rendimiento por Cultivo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">kg cosechados</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full">
                  <!-- Grid Lines -->
                  <line x1="60" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="60" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="55" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="55" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">1k</text>
                  <text x="55" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">2k</text>
                  <text x="55" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">3k</text>
                  <text x="55" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  
                  <!-- Bars -->
                  <!-- Maíz: 4200kg -->
                  <rect x="75" y="56" width="50" height="164" rx="4" fill="#86cb92"/>
                  <text x="100" y="48" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">4,200</text>
                  
                  <!-- Trigo: 3100kg -->
                  <rect x="155" y="96" width="50" height="124" rx="4" fill="#71b48d"/>
                  <text x="180" y="88" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">3,100</text>
                  
                  <!-- Soja: 2800kg -->
                  <rect x="235" y="108" width="50" height="112" rx="4" fill="#86cb92"/>
                  <text x="260" y="100" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">2,800</text>
                  
                  <!-- Arroz: 1500kg -->
                  <rect x="315" y="156" width="50" height="64" rx="4" fill="#71b48d"/>
                  <text x="340" y="148" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,500</text>
                  
                  <!-- Papa: 1247kg -->
                  <rect x="395" y="166" width="50" height="54" rx="4" fill="#86cb92"/>
                  <text x="420" y="158" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,247</text>
                  
                  <!-- X Axis Labels -->
                  <text x="100" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Maíz</text>
                  <text x="180" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Trigo</text>
                  <text x="260" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Soja</text>
                  <text x="340" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Arroz</text>
                  <text x="420" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Papa</text>
                </svg>
              </div>
            </div>

            <!-- Line Chart: Uso de Agua por Tiempo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Uso de Agua por Tiempo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">Litros</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#86cb92" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid Lines -->
                  <line x1="50" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="50" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="40" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="40" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  <text x="40" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">8k</text>
                  <text x="40" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">12k</text>
                  <text x="40" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">16k</text>
                  
                  <!-- Area Fill -->
                  <path d="M 50 220 L 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80 L 470 220 Z" fill="url(#waterGradient)"/>
                  
                  <!-- Line Stroke -->
                  <path d="M 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <!-- Data Points -->
                  <circle cx="50" cy="140" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="110" cy="125" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="170" cy="147" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="230" cy="95" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="290" cy="110" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="350" cy="75" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="410" cy="122" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="470" cy="80" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  
                  <!-- Data Value Labels -->
                  <text x="50" y="128" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">9.2k</text>
                  <text x="110" y="113" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">10.5k</text>
                  <text x="230" y="83" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">12.4k</text>
                  <text x="350" y="63" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.8k</text>
                  <text x="470" y="68" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.5k</text>
                  
                  <!-- X Axis Labels -->
                  <text x="50" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 1</text>
                  <text x="110" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 2</text>
                  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 3</text>
                  <text x="230" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 4</text>
                  <text x="290" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 5</text>
                  <text x="350" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 6</text>
                  <text x="410" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 7</text>
                  <text x="470" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 8</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement

Page: Reportes de Granja

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reportes de Granja</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
  <style>sd-component { display: block; }</style>
  <script src="https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.iife.js" defer init></script>
</head>
<body>
  <div class="min-h-screen flex bg-[#f8fafc] text-[#1a1f2b]">
    
    <!-- Sidebar -->
    <!-- component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->
<div v-scope="{ ...{&quot;activeItem&quot;:&quot;reports&quot;,&quot;dashboardHref&quot;:&quot;https://draft-1b550acf-432a-45da-a24a-b1a92c63e50d.preview.superdesign.dev&quot;,&quot;cropsHref&quot;:&quot;https://draft-9bfbbeb1-a3b3-4fba-9a2c-6b8834067df5.preview.superdesign.dev&quot;,&quot;irrigationHref&quot;:&quot;https://draft-82360a89-8400-4eea-ad3c-2857a0e0dd61.preview.superdesign.dev&quot;,&quot;weatherHref&quot;:&quot;#weather&quot;,&quot;reportsHref&quot;:&quot;https://draft-a19939de-f3bb-477b-a03d-3eff1bf9487e.preview.superdesign.dev&quot;,&quot;settingsHref&quot;:&quot;#settings&quot;,&quot;userName&quot;:&quot;John Doe&quot;,&quot;userRole&quot;:&quot;Gerente de Granja&quot;,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<aside class="w-[260px] bg-[#251f47] flex flex-col fixed h-full z-30 flex-shrink-0">
  <!-- Logo Area -->
  <div class="h-12 flex items-center gap-3 px-6 border-b border-white/10">
    <div class="w-8 h-8 rounded-lg bg-[#86cb92] flex items-center justify-center">
      <iconify-icon icon="lucide:leaf" class="text-white text-lg"></iconify-icon>
    </div>
    <span class="text-[#f0f9f4] font-bold text-lg tracking-tight">AgroTech</span>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <a :href="dashboardHref" 
       :class="activeItem === 'dashboard' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Panel de Control</span>
    </a>
    
    <a :href="cropsHref" 
       :class="activeItem === 'crops' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:wheat" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Cultivos</span>
    </a>

    <a :href="irrigationHref" 
       :class="activeItem === 'irrigation' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:droplets" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Riego</span>
    </a>

    <a :href="weatherHref" 
       :class="activeItem === 'weather' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:cloud-sun" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Clima</span>
    </a>

    <a :href="reportsHref" 
       :class="activeItem === 'reports' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:clipboard-list" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Reportes</span>
    </a>

    <a :href="settingsHref" 
       :class="activeItem === 'settings' ? 'bg-[#86cb92] text-white' : 'text-[#f0f9f4]/70 hover:bg-[#404e7c] hover:text-[#f0f9f4]'" 
       class="flex items-center gap-3 h-10 px-3 rounded-md transition-colors">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span class="text-sm font-medium">Configuración</span>
    </a>
  </nav>

  <!-- User Section -->
  <div class="p-4 border-t border-white/10">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-9 h-9 rounded-full bg-[#404e7c] flex items-center justify-center text-[#f0f9f4] font-semibold text-sm">
        {{ userInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[#f0f9f4] text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-[#f0f9f4]/50 text-xs truncate">{{ userRole }}</p>
      </div>
    </div>
    <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-white/20 text-[#f0f9f4]/80 hover:bg-[#404e7c] hover:text-white text-sm font-medium transition-colors">
      <iconify-icon icon="lucide:log-out" class="text-base"></iconify-icon>
      Cerrar sesión
    </button>
  </div>
</aside>
</div>
<!-- /component: Sidebar (0653e158-88f8-42c4-8e5f-073791356c75) -->

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-[260px] min-w-0">
      
      <!-- Header -->
      <!-- component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->
<div v-scope="{ ...{&quot;hasNotifications&quot;:true,&quot;userInitials&quot;:&quot;JD&quot;}, $emit() {} }">
<header class="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 flex-shrink-0">
  <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Panel de Control</h1>
  
  <div class="flex items-center gap-6">
    <!-- Search Bar -->
    <div class="relative w-80">
      <iconify-icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg"></iconify-icon>
      <input 
        type="text" 
        placeholder="Buscar sensores, cultivos..." 
        class="w-full pl-10 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#1a1f2b] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent transition-all"
        @input="$emit('search', { query: $event.target.value })"
      >
    </div>

    <!-- Notifications -->
    <button 
      @click="$emit('notifyClick')"
      class="relative p-2 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <iconify-icon icon="lucide:bell" class="text-[#64748b] text-xl"></iconify-icon>
      <span 
        v-if="hasNotifications"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c44b4b] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- User Dropdown -->
    <button 
      @click="$emit('userClick')"
      class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#f1f5f9] transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-[#404e7c] flex items-center justify-center text-white font-semibold text-xs">
        {{ userInitials }}
      </div>
      <iconify-icon icon="lucide:chevron-down" class="text-[#64748b] text-base"></iconify-icon>
    </button>
  </div>
</header>
</div>
<!-- /component: Header (805edbe1-d8c5-4dd1-82a4-bacde8ac9028) -->

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-[1440px] mx-auto space-y-5">
          
          <!-- Page Title & Date Range + Export -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 class="text-[1.5rem] font-bold text-[#1a1f2b] tracking-tight">Reportes de Granja</h1>
            
            <div class="flex flex-wrap items-center gap-3">
              <!-- Date Range -->
              <div class="flex items-center gap-2 bg-white rounded-lg border border-[#e2e8f0] px-3 py-2 shadow-sm">
                <iconify-icon icon="lucide:calendar" class="text-[#94a3b8] text-sm"></iconify-icon>
                <input type="text" value="01/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
                <span class="text-[#94a3b8] text-sm">-</span>
                <input type="text" value="31/01/2024" class="text-sm text-[#1a1f2b] w-24 bg-transparent focus:outline-none">
              </div>
              
              <!-- Export Buttons -->
              <button id="btn-export-pdf" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:file-down" class="text-base"></iconify-icon>
                Descargar PDF
              </button>
              <button id="btn-export-excel" class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] hover:bg-[#71b48d] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <iconify-icon icon="lucide:table" class="text-base"></iconify-icon>
                Descargar Excel
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: Rendimiento Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:wheat" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+15.3%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">12,847 kg</p>
              <p class="text-[11px] font-medium text-[#64748b]">Rendimiento Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 2: Agua Usada -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:droplets" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-down" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">-8.2%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">89,450 L</p>
              <p class="text-[11px] font-medium text-[#64748b]">Agua Usada</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>

            <!-- Card 3: Costo Total -->
            <div class="bg-white rounded-xl shadow-sm p-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#f1f5f9]">
              <div class="flex items-start justify-between mb-3">
                <div class="w-8 h-8 rounded-full bg-[#86cb92]/15 flex items-center justify-center">
                  <iconify-icon icon="lucide:banknote" class="text-[#86cb92] text-lg"></iconify-icon>
                </div>
                <div class="flex items-center gap-1 text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-0.5 rounded-full">
                  <iconify-icon icon="lucide:trending-up" class="text-sm"></iconify-icon>
                  <span class="text-xs font-semibold">+3.7%</span>
                </div>
              </div>
              <p class="text-[1.75rem] font-bold text-[#1a1f2b] leading-none mb-1">$18,940</p>
              <p class="text-[11px] font-medium text-[#64748b]">Costo Total</p>
              <p class="text-[10px] text-[#94a3b8] mt-1">período seleccionado</p>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            <!-- Bar Chart: Rendimiento por Cultivo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Rendimiento por Cultivo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">kg cosechados</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full">
                  <!-- Grid Lines -->
                  <line x1="60" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="60" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="60" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="55" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="55" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">1k</text>
                  <text x="55" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">2k</text>
                  <text x="55" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">3k</text>
                  <text x="55" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  
                  <!-- Bars -->
                  <!-- Maíz: 4200kg -->
                  <rect x="75" y="56" width="50" height="164" rx="4" fill="#86cb92"/>
                  <text x="100" y="48" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">4,200</text>
                  
                  <!-- Trigo: 3100kg -->
                  <rect x="155" y="96" width="50" height="124" rx="4" fill="#71b48d"/>
                  <text x="180" y="88" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">3,100</text>
                  
                  <!-- Soja: 2800kg -->
                  <rect x="235" y="108" width="50" height="112" rx="4" fill="#86cb92"/>
                  <text x="260" y="100" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">2,800</text>
                  
                  <!-- Arroz: 1500kg -->
                  <rect x="315" y="156" width="50" height="64" rx="4" fill="#71b48d"/>
                  <text x="340" y="148" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,500</text>
                  
                  <!-- Papa: 1247kg -->
                  <rect x="395" y="166" width="50" height="54" rx="4" fill="#86cb92"/>
                  <text x="420" y="158" text-anchor="middle" fill="#1a1f2b" font-size="10" font-family="Inter" font-weight="600">1,247</text>
                  
                  <!-- X Axis Labels -->
                  <text x="100" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Maíz</text>
                  <text x="180" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Trigo</text>
                  <text x="260" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Soja</text>
                  <text x="340" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Arroz</text>
                  <text x="420" y="240" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter" font-weight="500">Papa</text>
                </svg>
              </div>
            </div>

            <!-- Line Chart: Uso de Agua por Tiempo -->
            <div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-[1.125rem] font-semibold text-[#1a1f2b]">Uso de Agua por Tiempo</h2>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#86cb92]"></span>
                  <span class="text-xs font-medium text-[#64748b]">Litros</span>
                </div>
              </div>
              
              <div class="w-full h-[260px]">
                <svg viewBox="0 0 500 260" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#86cb92" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid Lines -->
                  <line x1="50" y1="220" x2="470" y2="220" stroke="#e2e8f0" stroke-width="1"/>
                  <line x1="50" y1="170" x2="470" y2="170" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="120" x2="470" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="70" x2="470" y2="70" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  <line x1="50" y1="20" x2="470" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4"/>
                  
                  <!-- Y Axis Labels -->
                  <text x="40" y="225" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">0</text>
                  <text x="40" y="175" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">4k</text>
                  <text x="40" y="125" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">8k</text>
                  <text x="40" y="75" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">12k</text>
                  <text x="40" y="25" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">16k</text>
                  
                  <!-- Area Fill -->
                  <path d="M 50 220 L 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80 L 470 220 Z" fill="url(#waterGradient)"/>
                  
                  <!-- Line Stroke -->
                  <path d="M 50 140 L 110 125 L 170 147 L 230 95 L 290 110 L 350 75 L 410 122 L 470 80" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <!-- Data Points -->
                  <circle cx="50" cy="140" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="110" cy="125" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="170" cy="147" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="230" cy="95" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="290" cy="110" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="350" cy="75" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="410" cy="122" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  <circle cx="470" cy="80" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>
                  
                  <!-- Data Value Labels -->
                  <text x="50" y="128" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">9.2k</text>
                  <text x="110" y="113" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">10.5k</text>
                  <text x="230" y="83" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">12.4k</text>
                  <text x="350" y="63" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.8k</text>
                  <text x="470" y="68" text-anchor="middle" fill="#1a1f2b" font-size="9" font-family="Inter" font-weight="600">13.5k</text>
                  
                  <!-- X Axis Labels -->
                  <text x="50" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 1</text>
                  <text x="110" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 2</text>
                  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 3</text>
                  <text x="230" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 4</text>
                  <text x="290" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 5</text>
                  <text x="350" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 6</text>
                  <text x="410" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 7</text>
                  <text x="470" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-weight="500">Sem 8</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement
