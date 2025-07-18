<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flujo de Marketing Digital - Coworking Tepoztlán</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/dexie@3.2.4/dist/dexie.js"></script>
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <nav class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h2>🏢 Coworking Tepoztlán</h2>
                <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
            </div>
            
            <div class="sidebar-content">
                <div class="progress-overview">
                    <h3>Progreso General</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <span class="progress-text" id="progress-text">0/12 Completadas</span>
                </div>
                
                <div class="nav-menu">
                    <button class="nav-item active" data-page="dashboard">
                        <span class="nav-icon">📊</span>
                        <span class="nav-text">Dashboard</span>
                    </button>
                    
                    <div class="nav-section">
                        <h4>Tareas del Flujo</h4>
                        <button class="nav-item" data-page="task-1">
                            <span class="nav-icon">🚀</span>
                            <span class="nav-text">Kick-off Meeting</span>
                            <span class="nav-status" id="status-1">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-2">
                            <span class="nav-icon">🔍</span>
                            <span class="nav-text">Auditoría Digital</span>
                            <span class="nav-status" id="status-2">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-3">
                            <span class="nav-icon">👥</span>
                            <span class="nav-text">Buyer Persona IA</span>
                            <span class="nav-status" id="status-3">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-4">
                            <span class="nav-icon">📅</span>
                            <span class="nav-text">Plan de Contenidos</span>
                            <span class="nav-status" id="status-4">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-5">
                            <span class="nav-icon">🎨</span>
                            <span class="nav-text">Diseño Creativo</span>
                            <span class="nav-status" id="status-5">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-6">
                            <span class="nav-icon">⚡</span>
                            <span class="nav-text">Automatización Lead</span>
                            <span class="nav-status" id="status-6">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-7">
                            <span class="nav-icon">📧</span>
                            <span class="nav-text">Email Nurture</span>
                            <span class="nav-status" id="status-7">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-8">
                            <span class="nav-icon">🎯</span>
                            <span class="nav-text">Configuración Adext</span>
                            <span class="nav-status" id="status-8">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-9">
                            <span class="nav-icon">📈</span>
                            <span class="nav-text">Lanzamiento Campañas</span>
                            <span class="nav-status" id="status-9">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-10">
                            <span class="nav-icon">📊</span>
                            <span class="nav-text">Dashboard Looker</span>
                            <span class="nav-status" id="status-10">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-11">
                            <span class="nav-icon">📋</span>
                            <span class="nav-text">Revisión Semanal</span>
                            <span class="nav-status" id="status-11">⏳</span>
                        </button>
                        
                        <button class="nav-item" data-page="task-12">
                            <span class="nav-icon">🔧</span>
                            <span class="nav-text">Optimización CPC</span>
                            <span class="nav-status" id="status-12">⏳</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Main Content -->
        <main class="main-content">
            <!-- Header -->
            <header class="main-header">
                <div class="breadcrumb" id="breadcrumb">
                    <span class="breadcrumb-item active">Dashboard</span>
                </div>
                <div class="header-actions">
                    <button class="btn btn--outline btn--sm" id="export-btn">📥 Exportar</button>
                    <button class="btn btn--primary btn--sm" id="settings-btn">⚙️ Configuración</button>
                </div>
            </header>
            
            <!-- Dashboard Page -->
            <div class="page active" id="dashboard">
                <div class="dashboard-header">
                    <h1>📊 Dashboard de Marketing Digital</h1>
                    <p>Coworking Tepoztlán - Flujo de Trabajo Completo</p>
                </div>
                
                <div class="dashboard-grid">
                    <div class="metrics-cards">
                        <div class="metric-card">
                            <div class="metric-icon">📋</div>
                            <div class="metric-info">
                                <h3>Total de Tareas</h3>
                                <div class="metric-value" id="total-tasks">12</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">✅</div>
                            <div class="metric-info">
                                <h3>Completadas</h3>
                                <div class="metric-value success" id="completed-tasks">0</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">🔄</div>
                            <div class="metric-info">
                                <h3>En Proceso</h3>
                                <div class="metric-value warning" id="in-progress-tasks">0</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">⏳</div>
                            <div class="metric-info">
                                <h3>Pendientes</h3>
                                <div class="metric-value error" id="pending-tasks">12</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-overview">
                        <h2>Resumen de Tareas</h2>
                        <div class="task-list" id="task-overview-list">
                            <!-- Tasks will be populated here -->
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h2>Actividad Reciente</h2>
                        <div class="activity-list" id="activity-list">
                            <!-- Activities will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Task Pages (1-12) -->
            <div class="page" id="task-1">
                <div class="task-page-header">
                    <div class="task-icon-large">🚀</div>
                    <div class="task-info">
                        <h1>Kick-off Meeting</h1>
                        <p>Definir objetivos SMART, canales y tono de marca</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Project Lead</strong></span>
                            <span class="meta-item">📱 <strong>Microsoft Teams</strong></span>
                            <span class="meta-item">⏱️ <strong>2 horas</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🎯 Objetivos</h3>
                            <ul>
                                <li>Establecer objetivos SMART del proyecto</li>
                                <li>Definir canales de marketing prioritarios</li>
                                <li>Acordar tono de marca y messaging</li>
                                <li>Revisar timeline y recursos disponibles</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Brief aprobado con objetivos, canales y guidelines de marca</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-1">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-1" multiple>
                            <div class="files-list" id="files-list-1"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-1" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(1)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-1"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('dashboard')">← Dashboard</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-2')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 2 -->
            <div class="page" id="task-2">
                <div class="task-page-header">
                    <div class="task-icon-large">🔍</div>
                    <div class="task-info">
                        <h1>Auditoría Digital</h1>
                        <p>Revisar sitios, redes y CRM para detectar brechas</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Estratega Digital</strong></span>
                            <span class="meta-item">📱 <strong>SEMrush</strong></span>
                            <span class="meta-item">⏱️ <strong>1 semana</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🔍 Alcance de Auditoría</h3>
                            <ul>
                                <li>Análisis SEO completo del sitio web</li>
                                <li>Revisión de perfiles en redes sociales</li>
                                <li>Evaluación del CRM actual</li>
                                <li>Identificación de brechas y oportunidades</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Informe detallado de auditoría con recomendaciones prioritarias</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-2">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-2" multiple>
                            <div class="files-list" id="files-list-2"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-2" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(2)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-2"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-1')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-3')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 3 -->
            <div class="page" id="task-3">
                <div class="task-page-header">
                    <div class="task-icon-large">👥</div>
                    <div class="task-info">
                        <h1>Buyer Persona IA</h1>
                        <p>Generar 2 perfiles con IA (dolores, objeciones)</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Research AI Specialist</strong></span>
                            <span class="meta-item">📱 <strong>Perplexity AI</strong></span>
                            <span class="meta-item">⏱️ <strong>3 días</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🎯 Objetivos</h3>
                            <ul>
                                <li>Crear 2 buyer personas detalladas</li>
                                <li>Identificar pain points específicos</li>
                                <li>Mapear objeciones comunes</li>
                                <li>Definir canales de comunicación preferidos</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Documento de personas con perfiles detallados y actionable insights</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-3">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-3" multiple>
                            <div class="files-list" id="files-list-3"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-3" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(3)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-3"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-2')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-4')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 4 -->
            <div class="page" id="task-4">
                <div class="task-page-header">
                    <div class="task-icon-large">📅</div>
                    <div class="task-info">
                        <h1>Plan de Contenidos</h1>
                        <p>Calendario 30 días con Copy.ai (blog, reels)</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Content Manager</strong></span>
                            <span class="meta-item">📱 <strong>Later</strong></span>
                            <span class="meta-item">⏱️ <strong>5 días</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>📅 Planificación</h3>
                            <ul>
                                <li>Calendario de contenidos 30 días</li>
                                <li>Mix de formatos: blog, reels, stories</li>
                                <li>Contenido educativo y promocional</li>
                                <li>Optimización para cada plataforma</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Calendario de contenidos con posts programados y copy optimizado</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-4">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-4" multiple>
                            <div class="files-list" id="files-list-4"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-4" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(4)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-4"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-3')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-5')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 5 -->
            <div class="page" id="task-5">
                <div class="task-page-header">
                    <div class="task-icon-large">🎨</div>
                    <div class="task-info">
                        <h1>Diseño Creativo</h1>
                        <p>3 imágenes + 1 video corto con Canva Magic Media</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Diseñador</strong></span>
                            <span class="meta-item">📱 <strong>Canva</strong></span>
                            <span class="meta-item">⏱️ <strong>1 semana</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🎨 Creativos a Desarrollar</h3>
                            <ul>
                                <li>3 imágenes principales para campaigns</li>
                                <li>1 video corto (30 segundos)</li>
                                <li>Adaptaciones para diferentes formatos</li>
                                <li>Mantenimiento de identidad visual</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Pack de creativos optimizados para cada plataforma</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-5">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-5" multiple>
                            <div class="files-list" id="files-list-5"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-5" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(5)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-5"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-4')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-6')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 6 -->
            <div class="page" id="task-6">
                <div class="task-page-header">
                    <div class="task-icon-large">⚡</div>
                    <div class="task-info">
                        <h1>Automatización Lead → CRM</h1>
                        <p>Zapier: Form → HubSpot, mail + Slack alerta</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Marketing Ops</strong></span>
                            <span class="meta-item">📱 <strong>Zapier</strong></span>
                            <span class="meta-item">⏱️ <strong>3 días</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>⚡ Automatizaciones</h3>
                            <ul>
                                <li>Formulario web → HubSpot CRM</li>
                                <li>Email de confirmación automático</li>
                                <li>Notificación en Slack al equipo</li>
                                <li>Segmentación automática de leads</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Flujos automáticos configurados y documentados</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-6">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-6" multiple>
                            <div class="files-list" id="files-list-6"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-6" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(6)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-6"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-5')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-7')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 7 -->
            <div class="page" id="task-7">
                <div class="task-page-header">
                    <div class="task-icon-large">📧</div>
                    <div class="task-info">
                        <h1>Secuencia Email Nurture</h1>
                        <p>5 mails personalizados con IA y A/B copy</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Email Strategist</strong></span>
                            <span class="meta-item">📱 <strong>Mailchimp</strong></span>
                            <span class="meta-item">⏱️ <strong>1 semana</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>📧 Secuencia de Emails</h3>
                            <ul>
                                <li>Email 1: Bienvenida y presentación</li>
                                <li>Email 2: Educativo sobre coworking</li>
                                <li>Email 3: Testimonios y casos de éxito</li>
                                <li>Email 4: Oferta especial</li>
                                <li>Email 5: Llamada a la acción final</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Secuencia de emails con A/B testing configurado</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-7">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-7" multiple>
                            <div class="files-list" id="files-list-7"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-7" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(7)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-7"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-6')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-8')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 8 -->
            <div class="page" id="task-8">
                <div class="task-page-header">
                    <div class="task-icon-large">🎯</div>
                    <div class="task-info">
                        <h1>Configuración Adext AI</h1>
                        <p>Conectar cuentas, definir audiencias y budget</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Paid Media Mgr</strong></span>
                            <span class="meta-item">📱 <strong>Meta Ads Manager</strong></span>
                            <span class="meta-item">⏱️ <strong>2 días</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🎯 Configuración</h3>
                            <ul>
                                <li>Conexión de cuentas publicitarias</li>
                                <li>Definición de audiencias objetivo</li>
                                <li>Configuración de presupuestos</li>
                                <li>Setup de tracking y conversiones</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Configuración completa de cuentas y audiencias</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-8">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-8" multiple>
                            <div class="files-list" id="files-list-8"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-8" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(8)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-8"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-7')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-9')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 9 -->
            <div class="page" id="task-9">
                <div class="task-page-header">
                    <div class="task-icon-large">📈</div>
                    <div class="task-info">
                        <h1>Lanzamiento Campañas</h1>
                        <p>Activar FB/IG + Google; etiquetar UTM</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Paid Media Mgr</strong></span>
                            <span class="meta-item">📱 <strong>Google Ads</strong></span>
                            <span class="meta-item">⏱️ <strong>1 día</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🚀 Lanzamiento</h3>
                            <ul>
                                <li>Activación de campañas Facebook/Instagram</li>
                                <li>Lanzamiento de campañas Google Ads</li>
                                <li>Implementación de UTM tracking</li>
                                <li>Monitoreo inicial de performance</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Campañas activas con tracking completo</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-9">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-9" multiple>
                            <div class="files-list" id="files-list-9"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-9" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(9)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-9"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-8')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-10')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 10 -->
            <div class="page" id="task-10">
                <div class="task-page-header">
                    <div class="task-icon-large">📊</div>
                    <div class="task-info">
                        <h1>Dashboard Looker</h1>
                        <p>Plantilla KPI con GA4 + Ads + CRM</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Data Analyst</strong></span>
                            <span class="meta-item">📱 <strong>Looker Studio</strong></span>
                            <span class="meta-item">⏱️ <strong>5 días</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>📊 Dashboard Components</h3>
                            <ul>
                                <li>Integración GA4 para web analytics</li>
                                <li>Conexión con Meta Ads y Google Ads</li>
                                <li>Datos del CRM y conversiones</li>
                                <li>KPIs y métricas clave visualizadas</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Dashboard en tiempo real con todas las métricas</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-10">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-10" multiple>
                            <div class="files-list" id="files-list-10"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-10" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(10)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-10"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-9')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-11')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 11 -->
            <div class="page" id="task-11">
                <div class="task-page-header">
                    <div class="task-icon-large">📋</div>
                    <div class="task-info">
                        <h1>Revisión Semanal</h1>
                        <p>Stand-ups, revisar métricas y backlog</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Todo el equipo</strong></span>
                            <span class="meta-item">📱 <strong>Notion</strong></span>
                            <span class="meta-item">⏱️ <strong>Recurrente</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>📋 Agenda Semanal</h3>
                            <ul>
                                <li>Revisión de métricas de la semana</li>
                                <li>Stand-up de avances del equipo</li>
                                <li>Identificación de blockers</li>
                                <li>Planificación de la próxima semana</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Notas de reunión y plan de acción semanal</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-11">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-11" multiple>
                            <div class="files-list" id="files-list-11"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-11" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(11)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-11"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-10')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('task-12')">Siguiente →</button>
                </div>
            </div>
            
            <!-- Task 12 -->
            <div class="page" id="task-12">
                <div class="task-page-header">
                    <div class="task-icon-large">🔧</div>
                    <div class="task-info">
                        <h1>Optimización CPC & Creativo</h1>
                        <p>Pausar anuncios con CTR < 1%, probar nuevas creatividades IA</p>
                        <div class="task-meta">
                            <span class="meta-item">👤 <strong>Paid Media Mgr + Diseñador</strong></span>
                            <span class="meta-item">📱 <strong>Adext AI</strong></span>
                            <span class="meta-item">⏱️ <strong>Continuo</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="section">
                            <h3>🔧 Optimizaciones</h3>
                            <ul>
                                <li>Análisis de performance de anuncios</li>
                                <li>Pausa de anuncios con CTR < 1%</li>
                                <li>Creación de nuevas creatividades</li>
                                <li>A/B testing de elementos creativos</li>
                            </ul>
                        </div>
                        
                        <div class="section">
                            <h3>📋 Entregables</h3>
                            <p>Reporte de optimización y nuevas creatividades</p>
                        </div>
                    </div>
                    
                    <div class="task-actions-panel">
                        <div class="status-section">
                            <h3>📊 Estado Actual</h3>
                            <select class="form-control" id="task-status-12">
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En Proceso">🔄 En Proceso</option>
                                <option value="Completada">✅ Completada</option>
                            </select>
                        </div>
                        
                        <div class="files-section">
                            <h3>📎 Archivos</h3>
                            <input type="file" class="form-control" id="task-files-12" multiple>
                            <div class="files-list" id="files-list-12"></div>
                        </div>
                        
                        <div class="comments-section">
                            <h3>💬 Comentarios</h3>
                            <textarea class="form-control" id="task-comments-12" placeholder="Agregar comentario..."></textarea>
                            <button class="btn btn--secondary" onclick="addComment(12)">Agregar Comentario</button>
                            <div class="comments-list" id="comments-list-12"></div>
                        </div>
                    </div>
                </div>
                
                <div class="task-navigation">
                    <button class="btn btn--outline" onclick="navigateToPage('task-11')">← Anterior</button>
                    <button class="btn btn--primary" onclick="navigateToPage('dashboard')">Dashboard</button>
                </div>
            </div>
            
        </main>
    </div>
    
    <!-- Settings Modal -->
    <div class="modal" id="settings-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚙️ Configuración</h2>
                <button class="modal-close" id="close-settings">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Nombre del Proyecto</label>
                    <input type="text" class="form-control" id="project-name" value="Marketing Digital Coworking Tepoztlán">
                </div>
                <div class="form-group">
                    <label class="form-label">Presupuesto Total ($)</label>
                    <input type="number" class="form-control" id="project-budget" value="1000">
                </div>
                <div class="form-group">
                    <label class="form-label">Objetivo CPA ($)</label>
                    <input type="number" class="form-control" id="target-cpa" value="15">
                </div>
                <div class="form-group">
                    <label class="form-label">Objetivo ROAS</label>
                    <input type="number" step="0.1" class="form-control" id="target-roas" value="1.5">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn--outline" id="cancel-settings">Cancelar</button>
                <button class="btn btn--primary" id="save-settings">Guardar</button>
            </div>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
