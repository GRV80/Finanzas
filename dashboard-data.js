/**
 * DASHBOARD DATA - Refactorización limpia y definitiva
 * ARQUITECTURA: window.gastos → getFilteredEntries() → visibleRows → renderTableBodyOnly() → window.visibleRows
 * 
 * El dashboard NO filtra, NO interpreta, NO reconstruye.
 * SOLO consume window.visibleRows como única fuente de verdad filtrada.
 */

// Función principal de actualización del dashboard
// REQUISITO: window.visibleRows es la única fuente de verdad filtrada
function updateDashboardWidgets() {
    console.log('[Dashboard] Iniciando actualización de widgets');
    
    // VERIFICAR QUE visibleRows EXISTA
    if (!window.visibleRows) {
        console.warn('[Dashboard] ⚠️ window.visibleRows no existe - el dashboard no puede actualizarse');
        console.warn('[Dashboard] El sistema principal debe establecer window.visibleRows desde renderTableBodyOnly()');
        return;
    }
    
    if (!Array.isArray(window.visibleRows)) {
        console.error('[Dashboard] ❌ window.visibleRows no es un array válido');
        return;
    }
    
    // VERIFICAR QUE window.gastos EXISTA
    if (!window.gastos || !Array.isArray(window.gastos)) {
        console.error('[Dashboard] ❌ window.gastos no es un array válido');
        return;
    }
    
    // IMPLEMENTAR DOS CONTEXTOS DE DATOS SEPARADOS
    const filteredContext = window.visibleRows;
    const globalContext = window.gastos;
    
    // LOGS OBLIGATORIOS
    console.log('[Dashboard] window.visibleRows:', filteredContext.length);
    console.log('[Dashboard] filteredContext:', filteredContext.length);
    console.log('[Dashboard] globalContext:', globalContext.length);
    
    // Mostrar primeros 3 registros reales usados
    if (filteredContext.length > 0) {
        console.log('[Dashboard] Primeros 3 registros filtrados:');
        filteredContext.slice(0, 3).forEach((item, i) => {
            console.log(`   ${i+1}. ${item.nombre || item.descripcion} - ${item.cantidad}€ - ${item.fecha}`);
        });
    }
    
    // Actualizar widgets con los contextos correctos
    updateFinancialSummary(filteredContext);
    const recent = updateRecentActivity(filteredContext);
    const payments = updateUpcomingPayments(globalContext);
    const alerts = updateAlerts(filteredContext, globalContext);
    const tasks = updateQuickTasks(globalContext);
    
    // LOGS OBLIGATORIOS DE RESULTADOS
    console.log('[Dashboard] recentActivity:', recent.length);
    console.log('[Dashboard] upcomingPayments:', payments.length);
    console.log('[Dashboard] alerts:', alerts.length);
    
    console.log('[Dashboard] ✅ Actualización completada');
}

// Calcular totales usando misma fórmula que la app
function calculateRealTotals(data) {
    const totalIncome = data.reduce((sum, item) => {
        return sum + (String(item.tipo || '').toLowerCase() === 'ingreso' ? 
            Number(item.cantidad) || 0 : 0);
    }, 0);
    
    const totalExpense = data.reduce((sum, item) => {
        return sum + (String(item.tipo || '').toLowerCase() === 'gasto' ? 
            Number(item.cantidad) || 0 : 0);
    }, 0);
    
    const balance = totalIncome - totalExpense;
    
    return {
        income: totalIncome,
        expense: totalExpense,
        balance: balance,
        count: data.length
    };
}

// Actualizar resumen financiero - usa filteredContext
function updateFinancialSummary(filteredData) {
    console.log('[Dashboard] Actualizando resumen financiero');
    
    const incomeEl = document.getElementById('inicioTotalIngresos');
    const expenseEl = document.getElementById('inicioTotalGastos');
    const balanceEl = document.getElementById('inicioBalance');
    const periodoEl = document.getElementById('periodoBadge');
    
    const totals = calculateRealTotals(filteredData);
    
    if (incomeEl) {
        incomeEl.textContent = formatCurrency(totals.income);
    }
    if (expenseEl) {
        expenseEl.textContent = formatCurrency(totals.expense);
    }
    if (balanceEl) {
        balanceEl.textContent = formatCurrency(totals.balance);
    }
    
    // Mostrar filtro activo actual
    if (periodoEl) {
        const tableFilters = window.tableFilters || {};
        const activePeriod = tableFilters.dateMode || 'all';
        const filterMonth = tableFilters.month;
        const filterYear = tableFilters.year;
        
        if (filterMonth && filterYear) {
            const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const monthIndex = parseInt(filterMonth) - 1;
            periodoEl.textContent = `${monthNames[monthIndex]} ${filterYear}`;
        } else if (activePeriod === 'day') {
            periodoEl.textContent = 'Hoy';
        } else if (activePeriod === 'month') {
            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const currentMonth = new Date().getMonth();
            periodoEl.textContent = monthNames[currentMonth];
        } else if (activePeriod === 'year') {
            periodoEl.textContent = new Date().getFullYear().toString();
        } else {
            periodoEl.textContent = 'Todos';
        }
    }
    
    console.log('[Dashboard] Resumen financiero actualizado');
}

// Actualizar actividad reciente - usa filteredContext
// REQUISITOS: max 3, orden DESC, excluir futuras, formato DD/MM/YYYY HH:mm
function updateRecentActivity(filteredData) {
    const activityEl = document.getElementById('inicioRecentActivity');
    if (!activityEl) return [];
    
    console.log('[Dashboard] Actualizando actividad reciente');
    
    const now = new Date();
    
    // 1. Excluir fechas futuras
    const pastData = filteredData.filter(item => {
        if (!item.fecha) return false;
        const itemDate = new Date(item.fecha);
        return !isNaN(itemDate.getTime()) && itemDate <= now;
    });
    
    // 2. Ordenar por fecha descendente (más reciente primero)
    const sortedData = [...pastData].sort((a, b) => {
        const dateA = new Date(a.fecha || '1970-01-01');
        const dateB = new Date(b.fecha || '1970-01-01');
        
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        
        return dateB - dateA;
    });
    
    // 3. Tomar SOLO los primeros 3 registros
    const recentItems = sortedData.slice(0, 3);
    
    if (recentItems.length === 0) {
        activityEl.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon">📝</div>
                <div class="activity-details">
                    <div class="activity-description">No hay actividad en este período</div>
                </div>
            </div>
        `;
        return [];
    }
    
    activityEl.innerHTML = recentItems.map(item => {
        const description = item.nombre || item.descripcion || 'Sin descripción';
        const amount = Number(item.cantidad) || 0;
        const type = item.tipo?.toLowerCase() || 'gasto';
        const fecha = item.fecha || 'Sin fecha';
        
        // Formato DD/MM/YYYY HH:mm
        const formattedDate = formatDateSimple(fecha);
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${type === 'ingreso' ? 'income' : 'expense'}">
                    ${type === 'ingreso' ? '💰' : '💸'}
                </div>
                <div class="activity-details">
                    <div class="activity-description">${description}</div>
                    <div class="activity-meta">
                        <span class="activity-amount ${type === 'ingreso' ? 'positive' : 'negative'}">
                            ${type === 'ingreso' ? '+' : '-'}${formatCurrency(amount)}
                        </span>
                        <span class="activity-time">${formattedDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    return recentItems;
}

// Actualizar próximos pagos - usa globalContext
// REQUISITOS: max 3, orden por cercanía, mostrar días restantes, formato DD/MM/YYYY HH:mm
function updateUpcomingPayments(globalData) {
    const paymentList = document.querySelector('.payment-list');
    if (!paymentList) return [];
    
    console.log('[Dashboard] Actualizando próximos pagos');
    
    const now = new Date();
    
    // 1. Buscar pagos futuros REALES
    const futurePayments = globalData.filter(item => {
        if (!item.fecha) return false;
        const itemDate = new Date(item.fecha);
        if (isNaN(itemDate.getTime())) return false;
        const daysUntil = Math.ceil((itemDate - now) / (24 * 60 * 60 * 1000));
        return daysUntil > 0;
    });
    
    // 2. Ordenar por proximidad (más cercanos primero)
    futurePayments.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return dateA - dateB;
    });
    
    // 3. Tomar los primeros 3 pagos más cercanos
    const paymentsToShow = futurePayments.slice(0, 3);
    
    if (paymentsToShow.length === 0) {
        paymentList.innerHTML = `
            <div class="payment-item">
                <div class="payment-icon">📅</div>
                <div class="payment-details">
                    <div class="payment-description">No hay próximos pagos registrados</div>
                </div>
            </div>
        `;
        return [];
    }
    
    paymentList.innerHTML = paymentsToShow.map(payment => {
        const icon = getPaymentIcon(payment.categoria || payment.nombre);
        const formattedDate = formatDateSimple(payment.fecha);
        const itemDate = new Date(payment.fecha);
        const daysUntil = Math.ceil((itemDate - now) / (24 * 60 * 60 * 1000));
        const daysText = getDaysUntilText(daysUntil);
        
        return `
            <div class="payment-item">
                <div class="payment-icon">${icon}</div>
                <div class="payment-details">
                    <div class="payment-description">${payment.nombre || payment.categoria || 'Sin descripción'}</div>
                    <div class="payment-meta">
                        <span class="payment-amount">${formatCurrency(payment.cantidad)}</span>
                        <span class="payment-date">${formattedDate}</span>
                        <span class="payment-days">${daysText}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    return paymentsToShow;
}

// Actualizar alertas - separa período (filtered) y predictivas (global)
// REQUISITOS: max 3 alertas
function updateAlerts(filteredData, globalData) {
    const alertList = document.querySelector('.alert-list');
    if (!alertList) return [];
    
    console.log('[Dashboard] Actualizando alertas');
    
    const alerts = generateRealAlerts(filteredData, globalData);
    
    if (alerts.length === 0) {
        alertList.innerHTML = `
            <div class="alert-item info">
                <div class="alert-icon">✅</div>
                <div class="alert-content">
                    <div class="alert-title">Todo en orden</div>
                    <div class="alert-description">No hay alertas activas</div>
                </div>
            </div>
        `;
        return [];
    }
    
    alertList.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-description">${alert.description}</div>
            </div>
        </div>
    `).join('');
    
    return alerts;
}

// Generar alertas - separa período (filtered) y predictivas (global)
function generateRealAlerts(filteredData, globalData) {
    const alerts = [];
    const now = new Date();
    
    // === ALERTAS DEL PERÍODO (usando filteredContext) ===
    const totals = calculateRealTotals(filteredData);
    
    // 1. Alerta de balance negativo en el período - mensaje específico
    if (totals.balance < 0) {
        const deficit = Math.abs(totals.balance);
        const percentage = totals.income > 0 ? ((deficit / totals.income) * 100).toFixed(1) : 0;
        alerts.push({
            type: 'urgent',
            icon: '🚨',
            title: 'Déficit en el período',
            description: `Los gastos superan los ingresos en ${formatCurrency(deficit)} (${percentage}% más que los ingresos)`
        });
    }
    
    // 2. Alerta de mes positivo (buen resultado) - mensaje específico
    if (totals.balance > 0 && totals.income > 0) {
        const savingsRate = (totals.balance / totals.income) * 100;
        if (savingsRate > 20) {
            alerts.push({
                type: 'info',
                icon: '🎉',
                title: 'Ahorro saludable',
                description: `Has ahorrado ${formatCurrency(totals.balance)} este período (${savingsRate.toFixed(1)}% de tus ingresos)`
            });
        } else if (savingsRate > 0) {
            alerts.push({
                type: 'info',
                icon: '✅',
                title: 'Balance positivo',
                description: `Superávit de ${formatCurrency(totals.balance)} este período`
            });
        }
    }
    
    // 3. Alerta de gastos excesivos en categorías (período) - mensaje específico
    const expenses = filteredData.filter(item => item.tipo === 'gasto');
    if (expenses.length > 0) {
        const expensesByCategory = {};
        expenses.forEach(item => {
            const category = item.categoria || 'Sin categoría';
            expensesByCategory[category] = (expensesByCategory[category] || 0) + Number(item.cantidad);
        });
        
        // Encontrar la categoría con mayor gasto
        const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
        const topCategory = sortedCategories[0];
        
        if (topCategory && topCategory[1] > 1000) {
            const percentage = totals.expense > 0 ? ((topCategory[1] / totals.expense) * 100).toFixed(1) : 0;
            alerts.push({
                type: 'warning',
                icon: '💸',
                title: 'Categoría destacada',
                description: `${topCategory[0]} representa ${percentage}% de tus gastos (${formatCurrency(topCategory[1])})`
            });
        }
    }
    
    // 4. Alerta de ausencia de ingresos en el período
    const incomes = filteredData.filter(item => item.tipo === 'ingreso');
    if (incomes.length === 0 && expenses.length > 0) {
        alerts.push({
            type: 'urgent',
            icon: '💰',
            title: 'Sin ingresos registrados',
            description: `Tienes ${expenses.length} gastos pero ningún ingreso en este período`
        });
    }
    
    // === ALERTAS PREDICTIVAS (usando globalContext) ===
    
    // 5. Alerta de próximos pagos grandes (predictiva) - mensaje específico
    const futurePayments = globalData.filter(item => {
        if (!item.fecha) return false;
        const itemDate = new Date(item.fecha);
        const daysUntil = Math.ceil((itemDate - now) / (24 * 60 * 60 * 1000));
        return daysUntil > 0 && daysUntil <= 30 && item.tipo === 'gasto';
    });
    
    if (futurePayments.length > 0) {
        const largeFuturePayments = futurePayments.filter(item => Number(item.cantidad) > 500);
        if (largeFuturePayments.length > 0) {
            const totalLarge = largeFuturePayments.reduce((sum, item) => sum + Number(item.cantidad), 0);
            alerts.push({
                type: 'warning',
                icon: '📅',
                title: 'Pagos importantes próximos',
                description: `${largeFuturePayments.length} pagos por ${formatCurrency(totalLarge)} en los próximos 30 días`
            });
        }
    }
    
    // 6. Alerta de pagos venciendo pronto (7 días)
    const urgentPayments = globalData.filter(item => {
        if (!item.fecha) return false;
        const itemDate = new Date(item.fecha);
        const daysUntil = Math.ceil((itemDate - now) / (24 * 60 * 60 * 1000));
        return daysUntil > 0 && daysUntil <= 7 && item.tipo === 'gasto';
    });
    
    if (urgentPayments.length > 0) {
        const totalUrgent = urgentPayments.reduce((sum, item) => sum + Number(item.cantidad), 0);
        alerts.push({
            type: 'urgent',
            icon: '⚠️',
            title: 'Pagos inminentes',
            description: `${urgentPayments.length} pagos por ${formatCurrency(totalUrgent)} vencen esta semana`
        });
    }
    
    // Ordenar por urgencia y limitar a 3
    const priorityOrder = { urgent: 0, warning: 1, info: 2 };
    alerts.sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);
    
    return alerts.slice(0, 3);
}

// Actualizar tareas rápidas - usa globalContext
// REQUISITOS: max 3 tareas
function updateQuickTasks(globalData) {
    const taskList = document.querySelector('.task-list');
    if (!taskList) return [];
    
    console.log('[Dashboard] Actualizando tareas rápidas');
    
    const tasks = generateRealTasks(globalData);
    
    taskList.innerHTML = tasks.map((task, index) => `
        <div class="task-item">
            <div class="task-checkbox">
                <input type="checkbox" id="task${index}">
                <label for="task${index}"></label>
            </div>
            <div class="task-content">
                <div class="task-description">${task.description}</div>
                <div class="task-priority ${task.priority}">${task.priorityLabel}</div>
            </div>
        </div>
    `).join('');
    
    return tasks;
}

// Generar tareas reales basadas en datos globales
function generateRealTasks(data) {
    const tasks = [];
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyData = data.filter(item => item.fecha && item.fecha.startsWith(currentMonth));
    const now = new Date();
    
    // 1. Tarea: Gastos sin categoría (alta prioridad)
    const uncategorizedItems = monthlyData.filter(item => 
        !item.categoria || item.categoria.trim() === ''
    );
    
    if (uncategorizedItems.length > 0) {
        tasks.push({
            description: `Categorizar ${uncategorizedItems.length} gastos sin categoría`,
            priority: 'high',
            priorityLabel: 'Alta'
        });
    }
    
    // 2. Tarea: Registros sin descripción (alta prioridad)
    const noDescriptionItems = monthlyData.filter(item => 
        !item.descripcion || item.descripcion.trim() === ''
    );
    
    if (noDescriptionItems.length > 0) {
        tasks.push({
            description: `Agregar descripción a ${noDescriptionItems.length} registros`,
            priority: 'high',
            priorityLabel: 'Alta'
        });
    }
    
    // 3. Tarea: Pagos próximos a vencer (alta prioridad)
    const upcomingPayments = data.filter(item => {
        if (!item.fecha || item.tipo !== 'gasto') return false;
        const itemDate = new Date(item.fecha);
        const daysUntil = Math.ceil((itemDate - now) / (24 * 60 * 60 * 1000));
        return daysUntil > 0 && daysUntil <= 7;
    });
    
    if (upcomingPayments.length > 0) {
        tasks.push({
            description: `${upcomingPayments.length} pagos vencen esta semana`,
            priority: 'high',
            priorityLabel: 'Alta'
        });
    }
    
    // 4. Tarea: Gastos elevados (media prioridad)
    const largeExpenses = monthlyData.filter(item => 
        item.tipo === 'gasto' && Number(item.cantidad) > 1000
    );
    
    if (largeExpenses.length > 0) {
        tasks.push({
            description: `Revisar ${largeExpenses.length} gastos elevados (>1000€)`,
            priority: 'medium',
            priorityLabel: 'Media'
        });
    }
    
    // 5. Tarea: Posibles duplicados (media prioridad)
    const duplicates = findPotentialDuplicates(monthlyData);
    if (duplicates.length > 0) {
        tasks.push({
            description: `Revisar ${duplicates.length} posibles duplicados`,
            priority: 'medium',
            priorityLabel: 'Media'
        });
    }
    
    // 6. Tarea: Ingresos pendientes (baja prioridad)
    const pendingIncomes = monthlyData.filter(item => 
        item.tipo === 'ingreso' && Number(item.cantidad) > 0
    );
    
    if (pendingIncomes.length === 0 && monthlyData.length > 0) {
        tasks.push({
            description: 'Registrar ingresos del mes',
            priority: 'low',
            priorityLabel: 'Baja'
        });
    }
    
    // 7. Tarea: Organizar recibos (baja prioridad)
    if (tasks.length < 3) {
        tasks.push({
            description: 'Organizar recibos del mes',
            priority: 'low',
            priorityLabel: 'Baja'
        });
    }
    
    return tasks.slice(0, 3);
}

// Encontrar posibles duplicados basados en nombre, cantidad y fecha cercana
function findPotentialDuplicates(data) {
    const duplicates = [];
    const seen = new Map();
    
    data.forEach(item => {
        const key = `${item.nombre}_${item.cantidad}_${item.fecha.slice(0, 10)}`;
        if (seen.has(key)) {
            duplicates.push(item);
        } else {
            seen.set(key, item);
        }
    });
    
    return duplicates;
}

// Obtener icono según categoría
function getPaymentIcon(category) {
    if (!category) return '📄';
    
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('alquiler') || categoryLower.includes('renta')) return '🏠';
    if (categoryLower.includes('teléfono') || categoryLower.includes('móvil')) return '📱';
    if (categoryLower.includes('internet') || categoryLower.includes('wifi')) return '🌐';
    if (categoryLower.includes('luz') || categoryLower.includes('electricidad')) return '💡';
    if (categoryLower.includes('agua')) return '💧';
    if (categoryLower.includes('gas')) return '🔥';
    if (categoryLower.includes('seguro')) return '🛡️';
    if (categoryLower.includes('impuesto') || categoryLower.includes('tax')) return '🏛️';
    if (categoryLower.includes('coche') || categoryLower.includes('gasolina')) return '🚗';
    if (categoryLower.includes('super') || categoryLower.includes('comida')) return '🛒';
    
    return '💳';
}

// Formatear moneda
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount || 0);
}

// Formatear fecha simple DD/MM/YYYY HH:mm
function formatDateSimple(dateString) {
    if (!dateString) return 'Sin fecha';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Obtener texto de días restantes
function getDaysUntilText(daysUntil) {
    if (daysUntil === 0) return 'Hoy';
    if (daysUntil === 1) return 'Mañana';
    if (daysUntil < 7) return `En ${daysUntil} días`;
    if (daysUntil < 30) return `En ${Math.floor(daysUntil / 7)} semanas`;
    if (daysUntil < 365) return `En ${Math.floor(daysUntil / 30)} meses`;
    return `En ${Math.floor(daysUntil / 365)} años`;
}

// Función de compatibilidad para llamadas antiguas
function updateDashboardWithRealData() {
    updateDashboardWidgets();
}

// Función de compatibilidad para llamadas antiguas
function initializeDashboard() {
    // NO hacer nada - el dashboard se actualiza automáticamente cuando window.visibleRows cambia
    console.log('[Dashboard] initializeDashboard() llamado - no se requiere inicialización manual');
}
