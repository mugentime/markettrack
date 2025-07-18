// Initialize Dexie Database
const db = new Dexie('MarketingWorkflowDB');

// Define database schema
db.version(1).stores({
  tareas: '++id, nombre, descripcion, estado, responsable, entregable, aplicacion_recomendada, icono_app, descripcion_app, fecha_creacion, fecha_actualizacion',
  archivos: '++id, tarea_id, nombre, tipo, contenido, fecha_subida',
  comentarios: '++id, tarea_id, texto, autor, fecha',
  colaboradores: '++id, nombre, email, rol',
  configuracion: '++id, clave, valor',
  actividades: '++id, tipo, descripcion, fecha'
});

// Global application state
let appState = {
  currentTask: null,
  charts: {
    progress: null,
    apps: null
  },
  filters: {
    status: '',
    responsible: ''
  }
};

// Initial data from JSON
const initialData = {
  tareas: [
    {
      id: 1,
      nombre: "Kick-off Meeting",
      descripcion: "Definir objetivos SMART, canales y tono de marca",
      estado: "completada",
      responsable: "Project Lead",
      entregable: "Brief aprobado",
      aplicacion_recomendada: "Microsoft Teams",
      icono_app: "💼",
      descripcion_app: "Meetings con grabación IA y transcripción automática",
      fecha_creacion: "2025-01-15T09:00:00Z",
      fecha_actualizacion: "2025-01-16T14:30:00Z"
    },
    {
      id: 2,
      nombre: "Auditoría Digital",
      descripcion: "Revisar sitios, redes y CRM para detectar brechas",
      estado: "en_proceso",
      responsable: "Estratega Digital",
      entregable: "Informe de auditoría",
      aplicacion_recomendada: "SEMrush",
      icono_app: "🔍",
      descripcion_app: "Análisis completo de SEO, competencia y oportunidades",
      fecha_creacion: "2025-01-16T10:00:00Z",
      fecha_actualizacion: "2025-01-17T09:15:00Z"
    },
    {
      id: 3,
      nombre: "Buyer Persona con IA",
      descripcion: "Generar 2 perfiles con IA (dolores, objeciones)",
      estado: "pendiente",
      responsable: "Research AI Specialist",
      entregable: "Perfiles detallados",
      aplicacion_recomendada: "Perplexity AI",
      icono_app: "🧠",
      descripcion_app: "Investigación profunda con IA para crear personas precisas",
      fecha_creacion: "2025-01-17T11:00:00Z",
      fecha_actualizacion: "2025-01-17T11:00:00Z"
    },
    {
      id: 4,
      nombre: "Plan de Contenidos",
      descripcion: "Calendario 30 días con Copy.ai (blog, reels)",
      estado: "pendiente",
      responsable: "Content Manager",
      entregable: "Calendario de contenido",
      aplicacion_recomendada: "Later",
      icono_app: "📅",
      descripcion_app: "Planificación de contenido con sugerencias de IA",
      fecha_creacion: "2025-01-18T09:00:00Z",
      fecha_actualizacion: "2025-01-18T09:00:00Z"
    },
    {
      id: 5,
      nombre: "Diseño Creativo",
      descripcion: "3 imágenes + 1 video corto con Canva Magic Media",
      estado: "pendiente",
      responsable: "Diseñador",
      entregable: "Assets creativos",
      aplicacion_recomendada: "Canva",
      icono_app: "🎨",
      descripcion_app: "Creación de contenido visual con Magic Media AI",
      fecha_creacion: "2025-01-19T10:00:00Z",
      fecha_actualizacion: "2025-01-19T10:00:00Z"
    },
    {
      id: 6,
      nombre: "Automatización Lead → CRM",
      descripcion: "Zapier: Form → HubSpot, mail + Slack alerta",
      estado: "pendiente",
      responsable: "Marketing Ops",
      entregable: "Flujos automatizados",
      aplicacion_recomendada: "Zapier",
      icono_app: "⚡",
      descripcion_app: "Automatización de procesos con integraciones múltiples",
      fecha_creacion: "2025-01-20T09:00:00Z",
      fecha_actualizacion: "2025-01-20T09:00:00Z"
    },
    {
      id: 7,
      nombre: "Secuencia Email Nurture",
      descripcion: "5 mails personalizados con IA y A/B copy",
      estado: "pendiente",
      responsable: "Email Strategist",
      entregable: "Secuencia de emails",
      aplicacion_recomendada: "Mailchimp",
      icono_app: "📧",
      descripcion_app: "Email marketing con optimización IA y A/B testing",
      fecha_creacion: "2025-01-21T10:00:00Z",
      fecha_actualizacion: "2025-01-21T10:00:00Z"
    },
    {
      id: 8,
      nombre: "Configuración Adext AI",
      descripcion: "Conectar cuentas, definir audiencias y budget",
      estado: "pendiente",
      responsable: "Paid Media Mgr",
      entregable: "Configuración de cuentas",
      aplicacion_recomendada: "Meta Ads Manager",
      icono_app: "🎯",
      descripcion_app: "Gestión de campañas con Advantage+ y optimización IA",
      fecha_creacion: "2025-01-22T09:00:00Z",
      fecha_actualizacion: "2025-01-22T09:00:00Z"
    },
    {
      id: 9,
      nombre: "Lanzamiento Campañas",
      descripcion: "Activar FB/IG + Google; etiquetar UTM",
      estado: "pendiente",
      responsable: "Paid Media Mgr",
      entregable: "Campañas activas",
      aplicacion_recomendada: "Google Ads",
      icono_app: "🚀",
      descripcion_app: "Lanzamiento de campañas con Smart Bidding",
      fecha_creacion: "2025-01-23T10:00:00Z",
      fecha_actualizacion: "2025-01-23T10:00:00Z"
    },
    {
      id: 10,
      nombre: "Dashboard Looker",
      descripcion: "Plantilla KPI con GA4 + Ads + CRM",
      estado: "pendiente",
      responsable: "Data Analyst",
      entregable: "Dashboard de métricas",
      aplicacion_recomendada: "Looker Studio",
      icono_app: "📊",
      descripcion_app: "Dashboards interactivos con datos en tiempo real",
      fecha_creacion: "2025-01-24T09:00:00Z",
      fecha_actualizacion: "2025-01-24T09:00:00Z"
    },
    {
      id: 11,
      nombre: "Revisión Semanal",
      descripcion: "Stand-ups, revisar métricas y backlog",
      estado: "pendiente",
      responsable: "Todo el equipo",
      entregable: "Notas de reunión",
      aplicacion_recomendada: "Notion",
      icono_app: "📝",
      descripcion_app: "Gestión colaborativa con IA assistant",
      fecha_creacion: "2025-01-25T10:00:00Z",
      fecha_actualizacion: "2025-01-25T10:00:00Z"
    },
    {
      id: 12,
      nombre: "Optimización CPC & Creativo",
      descripcion: "Pausar anuncios con CTR < 1%, probar nuevas creatividades IA",
      estado: "pendiente",
      responsable: "Paid Media Mgr + Diseñador",
      entregable: "Reporte de optimización",
      aplicacion_recomendada: "Adext AI",
      icono_app: "🔧",
      descripcion_app: "Optimización automática con machine learning",
      fecha_creacion: "2025-01-26T09:00:00Z",
      fecha_actualizacion: "2025-01-26T09:00:00Z"
    }
  ],
  colaboradores: [
    {
      id: 1,
      nombre: "Ana García",
      email: "ana@coworking.com",
      rol: "Project Lead"
    },
    {
      id: 2,
      nombre: "Carlos Mendoza",
      email: "carlos@coworking.com",
      rol: "Estratega Digital"
    },
    {
      id: 3,
      nombre: "María López",
      email: "maria@coworking.com",
      rol: "Content Manager"
    },
    {
      id: 4,
      nombre: "Diego Reyes",
      email: "diego@coworking.com",
      rol: "Diseñador"
    },
    {
      id: 5,
      nombre: "Sofia Castillo",
      email: "sofia@coworking.com",
      rol: "Paid Media Mgr"
    },
    {
      id: 6,
      nombre: "Luis Hernández",
      email: "luis@coworking.com",
      rol: "Data Analyst"
    },
    {
      id: 7,
      nombre: "Carmen Torres",
      email: "carmen@coworking.com",
      rol: "Email Strategist"
    },
    {
      id: 8,
      nombre: "Roberto Silva",
      email: "roberto@coworking.com",
      rol: "Marketing Ops"
    },
    {
      id: 9,
      nombre: "Elena Vega",
      email: "elena@coworking.com",
      rol: "Research AI Specialist"
    }
  ],
  configuracion: {
    proyecto: {
      nombre: "Marketing Digital Coworking Tepoztlán",
      descripcion: "Campaña de marketing digital para coworking en Tepoztlán",
      objetivo: "Generar reservas y engagement",
      presupuesto: 1000,
      duracion: "30 días",
      meta_cpa: 15,
      meta_roas: 1.5
    },
    metricas: {
      conversiones: 0,
      cpa_actual: 0,
      roas_actual: 0,
      engagement: 0,
      sesiones: 0
    }
  }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
  try {
    await initializeDatabase();
    await initializeApp();
    setupEventListeners();
    await loadDashboard();
    await loadTasks();
    await loadCollaborators();
    await loadConfiguration();
    await updateDataDisplay();
    showNotification('✅ Base de datos local inicializada correctamente', 'success');
  } catch (error) {
    console.error('Error initializing app:', error);
    showNotification('❌ Error al inicializar la aplicación', 'error');
  }
});

// Initialize database with initial data
async function initializeDatabase() {
  try {
    // Check if database is already populated
    const taskCount = await db.tareas.count();
    
    if (taskCount === 0) {
      // Populate initial data
      await db.tareas.bulkAdd(initialData.tareas);
      await db.colaboradores.bulkAdd(initialData.colaboradores);
      
      // Add configuration
      for (const [key, value] of Object.entries(initialData.configuracion)) {
        await db.configuracion.add({
          clave: key,
          valor: JSON.stringify(value)
        });
      }
      
      // Add initial activity
      await db.actividades.add({
        tipo: 'sistema',
        descripcion: 'Base de datos inicializada con datos del proyecto',
        fecha: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Initialize application
async function initializeApp() {
  try {
    // Initialize charts
    initializeCharts();
    
    // Set up periodic updates
    setInterval(async () => {
      await updateDashboard();
      await updateDataDisplay();
    }, 5000);
    
  } catch (error) {
    console.error('Error in app initialization:', error);
    throw error;
  }
}

// Setup event listeners
function setupEventListeners() {
  // Tab navigation - Fixed event listener setup
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const tabName = this.dataset.tab;
      console.log('Tab clicked:', tabName); // Debug log
      switchTab(tabName);
    });
  });

  // Task management
  const refreshButton = document.getElementById('refresh-tasks');
  if (refreshButton) {
    refreshButton.addEventListener('click', loadTasks);
  }

  const statusFilter = document.getElementById('status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', filterTasks);
  }

  const responsibleFilter = document.getElementById('responsible-filter');
  if (responsibleFilter) {
    responsibleFilter.addEventListener('change', filterTasks);
  }

  // Configuration
  const saveConfigButton = document.getElementById('save-config');
  if (saveConfigButton) {
    saveConfigButton.addEventListener('click', saveConfiguration);
  }

  const updateMetricsButton = document.getElementById('update-metrics');
  if (updateMetricsButton) {
    updateMetricsButton.addEventListener('click', updateMetrics);
  }

  // Data management
  const exportButton = document.getElementById('export-data');
  if (exportButton) {
    exportButton.addEventListener('click', exportData);
  }

  const importButton = document.getElementById('import-data');
  if (importButton) {
    importButton.addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
  }

  const importFile = document.getElementById('import-file');
  if (importFile) {
    importFile.addEventListener('change', importData);
  }

  const resetButton = document.getElementById('reset-data');
  if (resetButton) {
    resetButton.addEventListener('click', resetData);
  }

  // Modal controls
  const closeModalButton = document.getElementById('close-modal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  const cancelModalButton = document.getElementById('cancel-modal');
  if (cancelModalButton) {
    cancelModalButton.addEventListener('click', closeModal);
  }

  const saveTaskButton = document.getElementById('save-task');
  if (saveTaskButton) {
    saveTaskButton.addEventListener('click', saveTask);
  }

  const addCommentButton = document.getElementById('add-comment');
  if (addCommentButton) {
    addCommentButton.addEventListener('click', addComment);
  }

  const taskFilesInput = document.getElementById('task-files');
  if (taskFilesInput) {
    taskFilesInput.addEventListener('change', handleFileUpload);
  }

  // Modal backdrop close
  const taskModal = document.getElementById('task-modal');
  if (taskModal) {
    taskModal.addEventListener('click', (e) => {
      if (e.target.id === 'task-modal') {
        closeModal();
      }
    });
  }
}

// Switch between tabs - Fixed implementation
function switchTab(tabName) {
  console.log('Switching to tab:', tabName); // Debug log
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const activeContent = document.getElementById(`${tabName}-tab`);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // Load specific tab content
  switch(tabName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'tasks':
      loadTasks();
      break;
    case 'collaborators':
      loadCollaborators();
      break;
    case 'configuration':
      loadConfiguration();
      break;
    case 'data':
      updateDataDisplay();
      break;
  }
}

// Load and update dashboard
async function loadDashboard() {
  try {
    await updateDashboard();
    await updateTimeline();
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// Update dashboard metrics
async function updateDashboard() {
  try {
    const tasks = await db.tareas.toArray();
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.estado === 'completada').length;
    const inProgressTasks = tasks.filter(task => task.estado === 'en_proceso').length;
    const pendingTasks = tasks.filter(task => task.estado === 'pendiente').length;
    
    // Update metrics
    const totalTasksEl = document.getElementById('total-tasks');
    if (totalTasksEl) totalTasksEl.textContent = totalTasks;
    
    const completedTasksEl = document.getElementById('completed-tasks');
    if (completedTasksEl) completedTasksEl.textContent = completedTasks;
    
    const inProgressTasksEl = document.getElementById('in-progress-tasks');
    if (inProgressTasksEl) inProgressTasksEl.textContent = inProgressTasks;
    
    const pendingTasksEl = document.getElementById('pending-tasks');
    if (pendingTasksEl) pendingTasksEl.textContent = pendingTasks;
    
    // Update header stats
    const totalTasksHeaderEl = document.getElementById('total-tasks-header');
    if (totalTasksHeaderEl) totalTasksHeaderEl.textContent = totalTasks;
    
    const completedTasksHeaderEl = document.getElementById('completed-tasks-header');
    if (completedTasksHeaderEl) completedTasksHeaderEl.textContent = completedTasks;
    
    // Update charts
    updateCharts(tasks);
  } catch (error) {
    console.error('Error updating dashboard:', error);
  }
}

// Initialize charts
function initializeCharts() {
  // Progress Chart
  const progressCanvas = document.getElementById('progress-chart');
  if (progressCanvas) {
    const progressCtx = progressCanvas.getContext('2d');
    appState.charts.progress = new Chart(progressCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completadas', 'En Proceso', 'Pendientes'],
        datasets: [{
          data: [1, 1, 10],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Apps Chart
  const appsCanvas = document.getElementById('apps-chart');
  if (appsCanvas) {
    const appsCtx = appsCanvas.getContext('2d');
    appState.charts.apps = new Chart(appsCtx, {
      type: 'bar',
      data: {
        labels: ['Microsoft Teams', 'SEMrush', 'Perplexity AI', 'Later', 'Canva', 'Zapier', 'Mailchimp', 'Meta Ads Manager', 'Google Ads', 'Looker Studio', 'Notion', 'Adext AI'],
        datasets: [{
          label: 'Tareas por Aplicación',
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          backgroundColor: '#1FB8CD'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}

// Update charts with new data
function updateCharts(tasks) {
  if (!appState.charts.progress || !appState.charts.apps) return;

  const completedTasks = tasks.filter(task => task.estado === 'completada').length;
  const inProgressTasks = tasks.filter(task => task.estado === 'en_proceso').length;
  const pendingTasks = tasks.filter(task => task.estado === 'pendiente').length;

  // Update progress chart
  if (appState.charts.progress) {
    appState.charts.progress.data.datasets[0].data = [completedTasks, inProgressTasks, pendingTasks];
    appState.charts.progress.update();
  }

  // Update apps chart
  if (appState.charts.apps) {
    const appCounts = {};
    tasks.forEach(task => {
      appCounts[task.aplicacion_recomendada] = (appCounts[task.aplicacion_recomendada] || 0) + 1;
    });

    appState.charts.apps.data.labels = Object.keys(appCounts);
    appState.charts.apps.data.datasets[0].data = Object.values(appCounts);
    appState.charts.apps.update();
  }
}

// Update timeline with recent activities
async function updateTimeline() {
  try {
    const activities = await db.actividades.orderBy('fecha').reverse().limit(5).toArray();
    const container = document.getElementById('timeline-container');
    
    if (container) {
      container.innerHTML = '';
      
      activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
          <div class="timeline-date">${formatDate(activity.fecha)}</div>
          <div class="timeline-content">${activity.descripcion}</div>
        `;
        container.appendChild(item);
      });
    }
  } catch (error) {
    console.error('Error updating timeline:', error);
  }
}

// Load and render tasks
async function loadTasks() {
  try {
    let tasks = await db.tareas.toArray();
    
    // Apply filters
    if (appState.filters.status) {
      tasks = tasks.filter(task => task.estado === appState.filters.status);
    }
    
    if (appState.filters.responsible) {
      tasks = tasks.filter(task => task.responsable === appState.filters.responsible);
    }
    
    renderTasks(tasks);
    await populateFilters();
  } catch (error) {
    console.error('Error loading tasks:', error);
    showNotification('❌ Error al cargar tareas', 'error');
  }
}

// Render tasks table
function renderTasks(tasks) {
  const tbody = document.getElementById('tasks-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  tasks.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.id}</td>
      <td>
        <strong>${task.nombre}</strong><br>
        <small>${task.descripcion}</small>
      </td>
      <td>${task.responsable}</td>
      <td>
        <div class="suggested-app-cell">
          <div class="app-name">${task.icono_app} ${task.aplicacion_recomendada}</div>
          <div class="app-reason">${task.descripcion_app}</div>
        </div>
      </td>
      <td><span class="task-status ${task.estado}">${formatStatus(task.estado)}</span></td>
      <td>${formatDate(task.fecha_creacion)}</td>
      <td>
        <div class="task-actions">
          <button class="btn btn--secondary btn-action" onclick="openTaskModal(${task.id})">✏️ Editar</button>
          <button class="btn btn--outline btn-action" onclick="changeTaskStatus(${task.id})">🔄 Estado</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Populate filter dropdowns
async function populateFilters() {
  try {
    const tasks = await db.tareas.toArray();
    
    // Populate responsible filter
    const responsibleFilter = document.getElementById('responsible-filter');
    if (responsibleFilter) {
      const responsibles = [...new Set(tasks.map(task => task.responsable))];
      
      responsibleFilter.innerHTML = '<option value="">Todos los responsables</option>';
      responsibles.forEach(responsible => {
        const option = document.createElement('option');
        option.value = responsible;
        option.textContent = responsible;
        responsibleFilter.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error populating filters:', error);
  }
}

// Filter tasks
function filterTasks() {
  const statusFilter = document.getElementById('status-filter');
  const responsibleFilter = document.getElementById('responsible-filter');
  
  if (statusFilter) {
    appState.filters.status = statusFilter.value;
  }
  
  if (responsibleFilter) {
    appState.filters.responsible = responsibleFilter.value;
  }
  
  loadTasks();
}

// Open task modal
async function openTaskModal(taskId) {
  try {
    const task = await db.tareas.get(taskId);
    if (!task) return;
    
    appState.currentTask = task;
    
    // Populate modal
    const taskTitleEl = document.getElementById('task-title');
    if (taskTitleEl) taskTitleEl.textContent = task.nombre;
    
    const taskDescriptionEl = document.getElementById('task-description');
    if (taskDescriptionEl) taskDescriptionEl.textContent = task.descripcion;
    
    const taskResponsibleEl = document.getElementById('task-responsible');
    if (taskResponsibleEl) taskResponsibleEl.textContent = task.responsable;
    
    const taskEntregableEl = document.getElementById('task-entregable');
    if (taskEntregableEl) taskEntregableEl.textContent = task.entregable;
    
    const taskDateEl = document.getElementById('task-date');
    if (taskDateEl) taskDateEl.textContent = formatDate(task.fecha_creacion);
    
    const appIconEl = document.getElementById('app-icon');
    if (appIconEl) appIconEl.textContent = task.icono_app;
    
    const appNameEl = document.getElementById('app-name');
    if (appNameEl) appNameEl.textContent = task.aplicacion_recomendada;
    
    const appReasonEl = document.getElementById('app-reason');
    if (appReasonEl) appReasonEl.textContent = task.descripcion_app;
    
    const taskStatusSelectEl = document.getElementById('task-status-select');
    if (taskStatusSelectEl) taskStatusSelectEl.value = task.estado;
    
    // Load files and comments
    await loadTaskFiles(taskId);
    await loadTaskComments(taskId);
    
    // Show modal
    const modal = document.getElementById('task-modal');
    if (modal) {
      modal.classList.add('active');
    }
  } catch (error) {
    console.error('Error opening task modal:', error);
    showNotification('❌ Error al abrir tarea', 'error');
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById('task-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  appState.currentTask = null;
}

// Save task changes
async function saveTask() {
  if (!appState.currentTask) return;
  
  try {
    const taskStatusSelect = document.getElementById('task-status-select');
    if (!taskStatusSelect) return;
    
    const newStatus = taskStatusSelect.value;
    const oldStatus = appState.currentTask.estado;
    
    // Update task
    await db.tareas.update(appState.currentTask.id, {
      estado: newStatus,
      fecha_actualizacion: new Date().toISOString()
    });
    
    // Add activity if status changed
    if (newStatus !== oldStatus) {
      await db.actividades.add({
        tipo: 'tarea',
        descripcion: `Tarea "${appState.currentTask.nombre}" cambió de ${formatStatus(oldStatus)} a ${formatStatus(newStatus)}`,
        fecha: new Date().toISOString()
      });
    }
    
    // Update UI
    await loadTasks();
    await updateDashboard();
    await updateDataDisplay();
    closeModal();
    
    showNotification('✅ Tarea guardada exitosamente', 'success');
  } catch (error) {
    console.error('Error saving task:', error);
    showNotification('❌ Error al guardar tarea', 'error');
  }
}

// Change task status (quick action)
async function changeTaskStatus(taskId) {
  try {
    const task = await db.tareas.get(taskId);
    if (!task) return;
    
    const statuses = ['pendiente', 'en_proceso', 'completada'];
    const currentIndex = statuses.indexOf(task.estado);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];
    
    await db.tareas.update(taskId, {
      estado: newStatus,
      fecha_actualizacion: new Date().toISOString()
    });
    
    // Add activity
    await db.actividades.add({
      tipo: 'tarea',
      descripcion: `Tarea "${task.nombre}" cambió de estado a ${formatStatus(newStatus)}`,
      fecha: new Date().toISOString()
    });
    
    // Update UI
    await loadTasks();
    await updateDashboard();
    
    showNotification(`✅ Estado cambiado a: ${formatStatus(newStatus)}`, 'success');
  } catch (error) {
    console.error('Error changing task status:', error);
    showNotification('❌ Error al cambiar estado', 'error');
  }
}

// Handle file upload
async function handleFileUpload(event) {
  if (!appState.currentTask) return;
  
  try {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        await db.archivos.add({
          tarea_id: appState.currentTask.id,
          nombre: file.name,
          tipo: file.type,
          contenido: e.target.result,
          fecha_subida: new Date().toISOString()
        });
        
        await loadTaskFiles(appState.currentTask.id);
      };
      reader.readAsDataURL(file);
    }
    
    // Add activity
    await db.actividades.add({
      tipo: 'archivo',
      descripcion: `${files.length} archivo(s) subido(s) a la tarea "${appState.currentTask.nombre}"`,
      fecha: new Date().toISOString()
    });
    
    showNotification(`✅ ${files.length} archivo(s) subido(s)`, 'success');
  } catch (error) {
    console.error('Error uploading files:', error);
    showNotification('❌ Error al subir archivos', 'error');
  }
}

// Load task files
async function loadTaskFiles(taskId) {
  try {
    const files = await db.archivos.where('tarea_id').equals(taskId).toArray();
    const container = document.getElementById('uploaded-files');
    
    if (container) {
      container.innerHTML = '';
      
      files.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-item';
        fileDiv.innerHTML = `
          <div class="file-name">📎 ${file.nombre}</div>
          <div class="file-size">${formatDate(file.fecha_subida)}</div>
        `;
        container.appendChild(fileDiv);
      });
    }
  } catch (error) {
    console.error('Error loading task files:', error);
  }
}

// Add comment
async function addComment() {
  if (!appState.currentTask) return;
  
  try {
    const taskCommentsEl = document.getElementById('task-comments');
    if (!taskCommentsEl) return;
    
    const commentText = taskCommentsEl.value.trim();
    if (!commentText) return;
    
    await db.comentarios.add({
      tarea_id: appState.currentTask.id,
      texto: commentText,
      autor: 'Usuario',
      fecha: new Date().toISOString()
    });
    
    taskCommentsEl.value = '';
    await loadTaskComments(appState.currentTask.id);
    
    // Add activity
    await db.actividades.add({
      tipo: 'comentario',
      descripcion: `Nuevo comentario agregado a la tarea "${appState.currentTask.nombre}"`,
      fecha: new Date().toISOString()
    });
    
    showNotification('✅ Comentario agregado', 'success');
  } catch (error) {
    console.error('Error adding comment:', error);
    showNotification('❌ Error al agregar comentario', 'error');
  }
}

// Load task comments
async function loadTaskComments(taskId) {
  try {
    const comments = await db.comentarios.where('tarea_id').equals(taskId).orderBy('fecha').reverse().toArray();
    const container = document.getElementById('comments-list');
    
    if (container) {
      container.innerHTML = '';
      
      comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
          <div class="comment-date">${formatDate(comment.fecha)} - ${comment.autor}</div>
          <div class="comment-text">${comment.texto}</div>
        `;
        container.appendChild(commentDiv);
      });
    }
  } catch (error) {
    console.error('Error loading task comments:', error);
  }
}

// Load collaborators
async function loadCollaborators() {
  try {
    const collaborators = await db.colaboradores.toArray();
    const grid = document.getElementById('collaborators-grid');
    
    if (grid) {
      grid.innerHTML = '';
      
      collaborators.forEach(collaborator => {
        const card = document.createElement('div');
        card.className = 'collaborator-card';
        card.innerHTML = `
          <div class="collaborator-name">${collaborator.nombre}</div>
          <div class="collaborator-role">${collaborator.rol}</div>
          <div class="collaborator-email">${collaborator.email}</div>
        `;
        grid.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Error loading collaborators:', error);
  }
}

// Load configuration
async function loadConfiguration() {
  try {
    const config = await db.configuracion.toArray();
    
    for (const item of config) {
      const value = JSON.parse(item.valor);
      
      if (item.clave === 'proyecto') {
        const projectNameEl = document.getElementById('project-name');
        if (projectNameEl) projectNameEl.value = value.nombre || '';
        
        const projectDescriptionEl = document.getElementById('project-description');
        if (projectDescriptionEl) projectDescriptionEl.value = value.descripcion || '';
        
        const projectBudgetEl = document.getElementById('project-budget');
        if (projectBudgetEl) projectBudgetEl.value = value.presupuesto || 0;
        
        const projectDurationEl = document.getElementById('project-duration');
        if (projectDurationEl) projectDurationEl.value = value.duracion || '';
        
      } else if (item.clave === 'metricas') {
        const targetCpaEl = document.getElementById('target-cpa');
        if (targetCpaEl) targetCpaEl.value = value.meta_cpa || 0;
        
        const targetRoasEl = document.getElementById('target-roas');
        if (targetRoasEl) targetRoasEl.value = value.meta_roas || 0;
        
        const currentConversionsEl = document.getElementById('current-conversions');
        if (currentConversionsEl) currentConversionsEl.value = value.conversiones || 0;
        
        const currentSessionsEl = document.getElementById('current-sessions');
        if (currentSessionsEl) currentSessionsEl.value = value.sesiones || 0;
      }
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
}

// Save configuration
async function saveConfiguration() {
  try {
    const projectNameEl = document.getElementById('project-name');
    const projectDescriptionEl = document.getElementById('project-description');
    const projectBudgetEl = document.getElementById('project-budget');
    const projectDurationEl = document.getElementById('project-duration');
    
    const projectConfig = {
      nombre: projectNameEl ? projectNameEl.value : '',
      descripcion: projectDescriptionEl ? projectDescriptionEl.value : '',
      presupuesto: projectBudgetEl ? parseInt(projectBudgetEl.value) : 0,
      duracion: projectDurationEl ? projectDurationEl.value : ''
    };
    
    await db.configuracion.where('clave').equals('proyecto').modify({
      valor: JSON.stringify(projectConfig)
    });
    
    // Add activity
    await db.actividades.add({
      tipo: 'configuracion',
      descripcion: 'Configuración del proyecto actualizada',
      fecha: new Date().toISOString()
    });
    
    showNotification('✅ Configuración guardada', 'success');
  } catch (error) {
    console.error('Error saving configuration:', error);
    showNotification('❌ Error al guardar configuración', 'error');
  }
}

// Update metrics
async function updateMetrics() {
  try {
    const targetCpaEl = document.getElementById('target-cpa');
    const targetRoasEl = document.getElementById('target-roas');
    const currentConversionsEl = document.getElementById('current-conversions');
    const currentSessionsEl = document.getElementById('current-sessions');
    
    const metricsConfig = {
      meta_cpa: targetCpaEl ? parseFloat(targetCpaEl.value) : 0,
      meta_roas: targetRoasEl ? parseFloat(targetRoasEl.value) : 0,
      conversiones: currentConversionsEl ? parseInt(currentConversionsEl.value) : 0,
      sesiones: currentSessionsEl ? parseInt(currentSessionsEl.value) : 0
    };
    
    await db.configuracion.where('clave').equals('metricas').modify({
      valor: JSON.stringify(metricsConfig)
    });
    
    // Add activity
    await db.actividades.add({
      tipo: 'metricas',
      descripcion: 'Métricas del proyecto actualizadas',
      fecha: new Date().toISOString()
    });
    
    showNotification('✅ Métricas actualizadas', 'success');
  } catch (error) {
    console.error('Error updating metrics:', error);
    showNotification('❌ Error al actualizar métricas', 'error');
  }
}

// Export data to JSON
async function exportData() {
  try {
    const data = {
      tareas: await db.tareas.toArray(),
      archivos: await db.archivos.toArray(),
      comentarios: await db.comentarios.toArray(),
      colaboradores: await db.colaboradores.toArray(),
      configuracion: await db.configuracion.toArray(),
      actividades: await db.actividades.toArray(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-workflow-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    // Add activity
    await db.actividades.add({
      tipo: 'exportacion',
      descripcion: 'Datos exportados a JSON',
      fecha: new Date().toISOString()
    });
    
    showNotification('✅ Datos exportados exitosamente', 'success');
  } catch (error) {
    console.error('Error exporting data:', error);
    showNotification('❌ Error al exportar datos', 'error');
  }
}

// Import data from JSON
async function importData(event) {
  try {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Clear existing data
        await db.delete();
        await db.open();
        
        // Import data
        if (data.tareas) await db.tareas.bulkAdd(data.tareas);
        if (data.archivos) await db.archivos.bulkAdd(data.archivos);
        if (data.comentarios) await db.comentarios.bulkAdd(data.comentarios);
        if (data.colaboradores) await db.colaboradores.bulkAdd(data.colaboradores);
        if (data.configuracion) await db.configuracion.bulkAdd(data.configuracion);
        if (data.actividades) await db.actividades.bulkAdd(data.actividades);
        
        // Add activity
        await db.actividades.add({
          tipo: 'importacion',
          descripcion: 'Datos importados desde JSON',
          fecha: new Date().toISOString()
        });
        
        // Refresh all views
        await loadDashboard();
        await loadTasks();
        await loadCollaborators();
        await loadConfiguration();
        await updateDataDisplay();
        
        showNotification('✅ Datos importados exitosamente', 'success');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        showNotification('❌ Error al procesar archivo JSON', 'error');
      }
    };
    
    reader.readAsText(file);
  } catch (error) {
    console.error('Error importing data:', error);
    showNotification('❌ Error al importar datos', 'error');
  }
}

// Reset data to initial state
async function resetData() {
  if (!confirm('¿Está seguro de que desea reiniciar todos los datos? Esta acción no se puede deshacer.')) {
    return;
  }
  
  try {
    // Clear database
    await db.delete();
    await db.open();
    
    // Initialize with initial data
    await initializeDatabase();
    
    // Refresh all views
    await loadDashboard();
    await loadTasks();
    await loadCollaborators();
    await loadConfiguration();
    await updateDataDisplay();
    
    showNotification('✅ Datos reiniciados exitosamente', 'success');
  } catch (error) {
    console.error('Error resetting data:', error);
    showNotification('❌ Error al reiniciar datos', 'error');
  }
}

// Update data display
async function updateDataDisplay() {
  try {
    // Tasks data
    const tasks = await db.tareas.toArray();
    const tasksDataEl = document.getElementById('tasks-data');
    if (tasksDataEl) {
      tasksDataEl.textContent = JSON.stringify(tasks, null, 2);
    }
    
    // Files data
    const files = await db.archivos.toArray();
    const filesDataEl = document.getElementById('files-data');
    if (filesDataEl) {
      filesDataEl.textContent = JSON.stringify(files, null, 2);
    }
    
    // Comments data
    const comments = await db.comentarios.toArray();
    const commentsDataEl = document.getElementById('comments-data');
    if (commentsDataEl) {
      commentsDataEl.textContent = JSON.stringify(comments, null, 2);
    }
    
    // Database stats
    const taskCount = await db.tareas.count();
    const fileCount = await db.archivos.count();
    const commentCount = await db.comentarios.count();
    
    const dbStatusTextEl = document.getElementById('db-status-text');
    if (dbStatusTextEl) dbStatusTextEl.textContent = 'Activa';
    
    const dbTasksCountEl = document.getElementById('db-tasks-count');
    if (dbTasksCountEl) dbTasksCountEl.textContent = taskCount;
    
    const dbFilesCountEl = document.getElementById('db-files-count');
    if (dbFilesCountEl) dbFilesCountEl.textContent = fileCount;
    
    const dbCommentsCountEl = document.getElementById('db-comments-count');
    if (dbCommentsCountEl) dbCommentsCountEl.textContent = commentCount;
  } catch (error) {
    console.error('Error updating data display:', error);
  }
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatStatus(status) {
  const statusMap = {
    'pendiente': 'Pendiente',
    'en_proceso': 'En Proceso',
    'completada': 'Completada'
  };
  return statusMap[status] || status;
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-text">${message}</div>
      <button class="notification-close">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
  
  // Manual close
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });
}

// Make functions available globally
window.openTaskModal = openTaskModal;
window.changeTaskStatus = changeTaskStatus;