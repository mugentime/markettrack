// Initialize Dexie Database
const db = new Dexie('MarketingWorkflowDB');

// Define database schema
db.version(1).stores({
  tasks: '++id, name, description, status, responsible, application, icon, duration, priority, created_at, updated_at',
  files: '++id, task_id, name, size, type, content, uploaded_at',
  comments: '++id, task_id, text, author, created_at',
  settings: '++id, key, value',
  activities: '++id, type, description, created_at'
});

// Global application state
const appState = {
  currentPage: 'dashboard',
  sidebarCollapsed: false,
  tasks: [],
  settings: {
    projectName: 'Marketing Digital Coworking Tepoztlán',
    budget: 1000,
    targetCPA: 15,
    targetROAS: 1.5
  }
};

// Initial tasks data
const initialTasks = [
  {
    id: 1,
    name: 'Kick-off Meeting',
    description: 'Definir objetivos SMART, canales y tono de marca',
    status: 'Pendiente',
    responsible: 'Project Lead',
    application: 'Microsoft Teams',
    icon: '🚀',
    duration: '2 horas',
    priority: 'Alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Auditoría Digital',
    description: 'Revisar sitios, redes y CRM para detectar brechas',
    status: 'Pendiente',
    responsible: 'Estratega Digital',
    application: 'SEMrush',
    icon: '🔍',
    duration: '1 semana',
    priority: 'Alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Buyer Persona IA',
    description: 'Generar 2 perfiles con IA (dolores, objeciones)',
    status: 'Pendiente',
    responsible: 'Research AI Specialist',
    application: 'Perplexity AI',
    icon: '👥',
    duration: '3 días',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Plan de Contenidos',
    description: 'Calendario 30 días con Copy.ai (blog, reels)',
    status: 'Pendiente',
    responsible: 'Content Manager',
    application: 'Later',
    icon: '📅',
    duration: '5 días',
    priority: 'Alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Diseño Creativo',
    description: '3 imágenes + 1 video corto con Canva Magic Media',
    status: 'Pendiente',
    responsible: 'Diseñador',
    application: 'Canva',
    icon: '🎨',
    duration: '1 semana',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Automatización Lead → CRM',
    description: 'Zapier: Form → HubSpot, mail + Slack alerta',
    status: 'Pendiente',
    responsible: 'Marketing Ops',
    application: 'Zapier',
    icon: '⚡',
    duration: '3 días',
    priority: 'Alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 7,
    name: 'Secuencia Email Nurture',
    description: '5 mails personalizados con IA y A/B copy',
    status: 'Pendiente',
    responsible: 'Email Strategist',
    application: 'Mailchimp',
    icon: '📧',
    duration: '1 semana',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Configuración Adext AI',
    description: 'Conectar cuentas, definir audiencias y budget',
    status: 'Pendiente',
    responsible: 'Paid Media Mgr',
    application: 'Meta Ads Manager',
    icon: '🎯',
    duration: '2 días',
    priority: 'Alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 9,
    name: 'Lanzamiento Campañas',
    description: 'Activar FB/IG + Google; etiquetar UTM',
    status: 'Pendiente',
    responsible: 'Paid Media Mgr',
    application: 'Google Ads',
    icon: '📈',
    duration: '1 día',
    priority: 'Crítica',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 10,
    name: 'Dashboard Looker',
    description: 'Plantilla KPI con GA4 + Ads + CRM',
    status: 'Pendiente',
    responsible: 'Data Analyst',
    application: 'Looker Studio',
    icon: '📊',
    duration: '5 días',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 11,
    name: 'Revisión Semanal',
    description: 'Stand-ups, revisar métricas y backlog',
    status: 'Pendiente',
    responsible: 'Todo el equipo',
    application: 'Notion',
    icon: '📋',
    duration: 'Recurrente',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 12,
    name: 'Optimización CPC & Creativo',
    description: 'Pausar anuncios con CTR < 1%, probar nuevas creatividades IA',
    status: 'Pendiente',
    responsible: 'Paid Media Mgr + Diseñador',
    application: 'Adext AI',
    icon: '🔧',
    duration: 'Continuo',
    priority: 'Media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
  try {
    await initializeDatabase();
    await initializeApp();
    setupEventListeners();
    await loadData();
    showNotification('✅ Aplicación inicializada correctamente', 'success');
  } catch (error) {
    console.error('Error initializing app:', error);
    showNotification('❌ Error al inicializar la aplicación', 'error');
  }
});

// Initialize database with initial data
async function initializeDatabase() {
  try {
    const taskCount = await db.tasks.count();
    
    if (taskCount === 0) {
      // Initialize with sample data
      await db.tasks.bulkAdd(initialTasks);
      
      // Add initial settings
      await db.settings.add({
        key: 'projectName',
        value: 'Marketing Digital Coworking Tepoztlán'
      });
      
      await db.settings.add({
        key: 'budget',
        value: 1000
      });
      
      await db.settings.add({
        key: 'targetCPA',
        value: 15
      });
      
      await db.settings.add({
        key: 'targetROAS',
        value: 1.5
      });
      
      // Add initial activity
      await db.activities.add({
        type: 'system',
        description: 'Base de datos inicializada con datos del proyecto',
        created_at: new Date().toISOString()
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
    // Load tasks into app state
    appState.tasks = await db.tasks.toArray();
    
    // Load settings
    const settings = await db.settings.toArray();
    settings.forEach(setting => {
      appState.settings[setting.key] = setting.value;
    });
    
    // Set up periodic updates
    setInterval(async () => {
      await updateDashboard();
    }, 5000);
    
  } catch (error) {
    console.error('Error in app initialization:', error);
    throw error;
  }
}

// Setup event listeners
function setupEventListeners() {
  // Sidebar navigation - Fixed implementation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const page = e.currentTarget.dataset.page;
      console.log('Navigation clicked:', page); // Debug log
      if (page) {
        navigateToPage(page);
      }
    });
  });

  // Sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Header actions
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      exportData();
    });
  }

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSettings();
    });
  }

  // Settings modal
  const closeSettings = document.getElementById('close-settings');
  if (closeSettings) {
    closeSettings.addEventListener('click', (e) => {
      e.preventDefault();
      closeSettingsModal();
    });
  }

  const cancelSettings = document.getElementById('cancel-settings');
  if (cancelSettings) {
    cancelSettings.addEventListener('click', (e) => {
      e.preventDefault();
      closeSettingsModal();
    });
  }

  const saveSettingsBtn = document.getElementById('save-settings');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveSettingsHandler();
    });
  }

  // Task status changes and file uploads
  for (let i = 1; i <= 12; i++) {
    const statusSelect = document.getElementById(`task-status-${i}`);
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        updateTaskStatus(i, e.target.value);
      });
    }

    const filesInput = document.getElementById(`task-files-${i}`);
    if (filesInput) {
      filesInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFileUpload(i, e.target.files);
        }
      });
    }
  }

  // Modal click outside to close
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        closeSettingsModal();
      }
    });
  }
}

// Navigation functions
function navigateToPage(pageId) {
  console.log('Navigating to:', pageId); // Debug log
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    console.log('Page activated:', pageId); // Debug log
  } else {
    console.error('Page not found:', pageId); // Debug log
  }

  // Update navigation items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }

  // Update breadcrumb
  updateBreadcrumb(pageId);

  // Update app state
  appState.currentPage = pageId;

  // Load specific page data
  if (pageId === 'dashboard') {
    loadDashboard();
  } else if (pageId.startsWith('task-')) {
    const taskId = parseInt(pageId.split('-')[1]);
    loadTaskPage(taskId);
  }
}

function updateBreadcrumb(pageId) {
  const breadcrumb = document.getElementById('breadcrumb');
  if (!breadcrumb) return;

  breadcrumb.innerHTML = '';

  if (pageId === 'dashboard') {
    breadcrumb.innerHTML = '<span class="breadcrumb-item active">Dashboard</span>';
  } else if (pageId.startsWith('task-')) {
    const taskId = parseInt(pageId.split('-')[1]);
    const task = appState.tasks.find(t => t.id === taskId);
    if (task) {
      breadcrumb.innerHTML = `
        <span class="breadcrumb-item">Dashboard</span>
        <span class="breadcrumb-item active">${task.name}</span>
      `;
    }
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  
  if (sidebar && mainContent) {
    sidebar.classList.toggle('collapsed');
    appState.sidebarCollapsed = !appState.sidebarCollapsed;
    console.log('Sidebar toggled:', appState.sidebarCollapsed); // Debug log
  }
}

// Dashboard functions
async function loadDashboard() {
  try {
    await updateDashboard();
    await loadTaskOverview();
    await loadRecentActivity();
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function updateDashboard() {
  try {
    const tasks = await db.tasks.toArray();
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completada').length;
    const inProgressTasks = tasks.filter(task => task.status === 'En Proceso').length;
    const pendingTasks = tasks.filter(task => task.status === 'Pendiente').length;
    
    // Update metric cards
    updateElement('total-tasks', totalTasks);
    updateElement('completed-tasks', completedTasks);
    updateElement('in-progress-tasks', inProgressTasks);
    updateElement('pending-tasks', pendingTasks);
    
    // Update progress bar
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    const progressText = document.getElementById('progress-text');
    if (progressText) {
      progressText.textContent = `${completedTasks}/${totalTasks} Completadas`;
    }
    
    // Update navigation status indicators
    tasks.forEach(task => {
      const statusEl = document.getElementById(`status-${task.id}`);
      if (statusEl) {
        statusEl.textContent = getStatusEmoji(task.status);
      }
    });
    
    // Update app state
    appState.tasks = tasks;
    
  } catch (error) {
    console.error('Error updating dashboard:', error);
  }
}

async function loadTaskOverview() {
  try {
    const tasks = await db.tasks.toArray();
    const taskOverviewList = document.getElementById('task-overview-list');
    
    if (!taskOverviewList) return;
    
    taskOverviewList.innerHTML = '';
    
    tasks.slice(0, 5).forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <div class="task-item-icon">${task.icon}</div>
        <div class="task-item-info">
          <div class="task-item-title">${task.name}</div>
          <div class="task-item-subtitle">${task.responsible}</div>
        </div>
        <div class="task-item-status ${getStatusClass(task.status)}">${task.status}</div>
      `;
      
      taskItem.addEventListener('click', () => {
        navigateToPage(`task-${task.id}`);
      });
      
      taskOverviewList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Error loading task overview:', error);
  }
}

async function loadRecentActivity() {
  try {
    const activities = await db.activities.orderBy('created_at').reverse().limit(5).toArray();
    const activityList = document.getElementById('activity-list');
    
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      activityItem.innerHTML = `
        <div class="activity-item-icon">📝</div>
        <div class="activity-item-info">
          <div class="activity-item-title">${activity.description}</div>
          <div class="activity-item-subtitle">${formatDate(activity.created_at)}</div>
        </div>
      `;
      
      activityList.appendChild(activityItem);
    });
  } catch (error) {
    console.error('Error loading recent activity:', error);
  }
}

// Task functions
async function loadTaskPage(taskId) {
  try {
    const task = await db.tasks.get(taskId);
    if (!task) return;
    
    // Load task status
    const statusSelect = document.getElementById(`task-status-${taskId}`);
    if (statusSelect) {
      statusSelect.value = task.status;
    }
    
    // Load files
    await loadTaskFiles(taskId);
    
    // Load comments
    await loadTaskComments(taskId);
    
  } catch (error) {
    console.error('Error loading task page:', error);
  }
}

async function updateTaskStatus(taskId, newStatus) {
  try {
    const task = await db.tasks.get(taskId);
    if (!task) return;
    
    const oldStatus = task.status;
    
    // Update task in database
    await db.tasks.update(taskId, {
      status: newStatus,
      updated_at: new Date().toISOString()
    });
    
    // Update app state
    const taskIndex = appState.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      appState.tasks[taskIndex].status = newStatus;
    }
    
    // Add activity
    await db.activities.add({
      type: 'task_update',
      description: `Tarea "${task.name}" cambió de ${oldStatus} a ${newStatus}`,
      created_at: new Date().toISOString()
    });
    
    // Update UI
    await updateDashboard();
    
    showNotification(`✅ Estado actualizado: ${newStatus}`, 'success');
    
  } catch (error) {
    console.error('Error updating task status:', error);
    showNotification('❌ Error al actualizar estado', 'error');
  }
}

async function handleFileUpload(taskId, files) {
  try {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      // Read file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        await db.files.add({
          task_id: taskId,
          name: file.name,
          size: file.size,
          type: file.type,
          content: e.target.result,
          uploaded_at: new Date().toISOString()
        });
        
        await loadTaskFiles(taskId);
      };
      reader.readAsDataURL(file);
    }
    
    // Add activity
    const task = await db.tasks.get(taskId);
    await db.activities.add({
      type: 'file_upload',
      description: `${fileArray.length} archivo(s) subido(s) a "${task.name}"`,
      created_at: new Date().toISOString()
    });
    
    showNotification(`✅ ${fileArray.length} archivo(s) subido(s)`, 'success');
    
  } catch (error) {
    console.error('Error uploading files:', error);
    showNotification('❌ Error al subir archivos', 'error');
  }
}

async function loadTaskFiles(taskId) {
  try {
    const files = await db.files.where('task_id').equals(taskId).toArray();
    const filesList = document.getElementById(`files-list-${taskId}`);
    
    if (!filesList) return;
    
    filesList.innerHTML = '';
    
    files.forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.innerHTML = `
        <div>📎 ${file.name}</div>
        <div>${formatFileSize(file.size)} - ${formatDate(file.uploaded_at)}</div>
      `;
      
      filesList.appendChild(fileItem);
    });
    
  } catch (error) {
    console.error('Error loading task files:', error);
  }
}

async function addComment(taskId) {
  try {
    const commentTextarea = document.getElementById(`task-comments-${taskId}`);
    if (!commentTextarea) return;
    
    const commentText = commentTextarea.value.trim();
    if (!commentText) {
      showNotification('⚠️ Por favor ingresa un comentario', 'info');
      return;
    }
    
    // Add comment to database
    await db.comments.add({
      task_id: taskId,
      text: commentText,
      author: 'Usuario',
      created_at: new Date().toISOString()
    });
    
    // Clear textarea
    commentTextarea.value = '';
    
    // Reload comments
    await loadTaskComments(taskId);
    
    // Add activity
    const task = await db.tasks.get(taskId);
    await db.activities.add({
      type: 'comment',
      description: `Nuevo comentario en "${task.name}"`,
      created_at: new Date().toISOString()
    });
    
    showNotification('✅ Comentario agregado', 'success');
    
  } catch (error) {
    console.error('Error adding comment:', error);
    showNotification('❌ Error al agregar comentario', 'error');
  }
}

async function loadTaskComments(taskId) {
  try {
    const comments = await db.comments.where('task_id').equals(taskId).orderBy('created_at').reverse().toArray();
    const commentsList = document.getElementById(`comments-list-${taskId}`);
    
    if (!commentsList) return;
    
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment-item';
      commentItem.innerHTML = `
        <div><strong>${comment.author}</strong> - ${formatDate(comment.created_at)}</div>
        <div>${comment.text}</div>
      `;
      
      commentsList.appendChild(commentItem);
    });
    
  } catch (error) {
    console.error('Error loading task comments:', error);
  }
}

// Data management functions
async function loadData() {
  try {
    appState.tasks = await db.tasks.toArray();
    await updateDashboard();
    await loadTaskOverview();
    await loadRecentActivity();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

async function exportData() {
  try {
    const data = {
      tasks: await db.tasks.toArray(),
      files: await db.files.toArray(),
      comments: await db.comments.toArray(),
      settings: await db.settings.toArray(),
      activities: await db.activities.toArray(),
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
    await db.activities.add({
      type: 'export',
      description: 'Datos exportados a JSON',
      created_at: new Date().toISOString()
    });
    
    showNotification('✅ Datos exportados exitosamente', 'success');
    
  } catch (error) {
    console.error('Error exporting data:', error);
    showNotification('❌ Error al exportar datos', 'error');
  }
}

// Settings functions
function openSettings() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.classList.add('active');
    
    // Load current settings
    const projectNameInput = document.getElementById('project-name');
    const projectBudgetInput = document.getElementById('project-budget');
    const targetCPAInput = document.getElementById('target-cpa');
    const targetROASInput = document.getElementById('target-roas');
    
    if (projectNameInput) projectNameInput.value = appState.settings.projectName || '';
    if (projectBudgetInput) projectBudgetInput.value = appState.settings.budget || 0;
    if (targetCPAInput) targetCPAInput.value = appState.settings.targetCPA || 0;
    if (targetROASInput) targetROASInput.value = appState.settings.targetROAS || 0;
  }
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

async function saveSettingsHandler() {
  try {
    const projectNameInput = document.getElementById('project-name');
    const projectBudgetInput = document.getElementById('project-budget');
    const targetCPAInput = document.getElementById('target-cpa');
    const targetROASInput = document.getElementById('target-roas');
    
    const newProjectName = projectNameInput ? projectNameInput.value : '';
    const newBudget = projectBudgetInput ? parseFloat(projectBudgetInput.value) : 0;
    const newTargetCPA = targetCPAInput ? parseFloat(targetCPAInput.value) : 0;
    const newTargetROAS = targetROASInput ? parseFloat(targetROASInput.value) : 0;
    
    // Update settings in database
    await db.settings.where('key').equals('projectName').modify({
      value: newProjectName
    });
    
    await db.settings.where('key').equals('budget').modify({
      value: newBudget
    });
    
    await db.settings.where('key').equals('targetCPA').modify({
      value: newTargetCPA
    });
    
    await db.settings.where('key').equals('targetROAS').modify({
      value: newTargetROAS
    });
    
    // Update app state
    appState.settings.projectName = newProjectName;
    appState.settings.budget = newBudget;
    appState.settings.targetCPA = newTargetCPA;
    appState.settings.targetROAS = newTargetROAS;
    
    // Add activity
    await db.activities.add({
      type: 'settings',
      description: 'Configuración actualizada',
      created_at: new Date().toISOString()
    });
    
    closeSettingsModal();
    showNotification('✅ Configuración guardada', 'success');
    
  } catch (error) {
    console.error('Error saving settings:', error);
    showNotification('❌ Error al guardar configuración', 'error');
  }
}

// Utility functions
function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function getStatusEmoji(status) {
  const statusMap = {
    'Pendiente': '⏳',
    'En Proceso': '🔄',
    'Completada': '✅'
  };
  return statusMap[status] || '⏳';
}

function getStatusClass(status) {
  const statusMap = {
    'Pendiente': 'pending',
    'En Proceso': 'in-progress',
    'Completada': 'completed'
  };
  return statusMap[status] || 'pending';
}

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

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  // Manual close
  const closeBtn = notification.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.remove();
      }
    });
  }
}

// Make functions globally available
window.navigateToPage = navigateToPage;
window.addComment = addComment;
window.updateTaskStatus = updateTaskStatus;
window.handleFileUpload = handleFileUpload;
window.openSettings = openSettings;
window.closeSettingsModal = closeSettingsModal;
window.saveSettingsHandler = saveSettingsHandler;
window.exportData = exportData;
