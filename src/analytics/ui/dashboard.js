/**
 * Dashboard JavaScript
 * Handles UI interactions and data visualization
 */

let analyticsService;
let charts = {};
const currentUser = 'demo-user';
const currentTenant = 'demo-tenant';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    analyticsService = new AnalyticsService();
    analyticsService.initialize();
    
    initializeEventListeners();
    checkPrivacyConsent();
    loadDashboard();
});

function initializeEventListeners() {
    // Filter controls
    document.getElementById('tenantFilter').addEventListener('change', loadDashboard);
    document.getElementById('timeRangeFilter').addEventListener('change', loadDashboard);
    document.getElementById('refreshBtn').addEventListener('click', loadDashboard);
    
    // Privacy controls
    document.getElementById('enableAnalytics').addEventListener('click', () => {
        analyticsService.setUserConsent(currentUser, currentTenant, true);
        document.getElementById('privacyBanner').classList.remove('show');
        loadDashboard();
    });
    
    document.getElementById('disableAnalytics').addEventListener('click', () => {
        analyticsService.setUserConsent(currentUser, currentTenant, false);
        document.getElementById('privacyBanner').classList.remove('show');
    });
    
    // Privacy modal
    document.getElementById('privacyLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('privacyModal').classList.add('show');
    });
    
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('privacyModal').classList.remove('show');
    });
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('privacyModal');
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function checkPrivacyConsent() {
    if (!analyticsService.hasUserConsent(currentUser)) {
        document.getElementById('privacyBanner').classList.add('show');
    }
}

function loadDashboard() {
    const tenantFilter = document.getElementById('tenantFilter').value;
    const timeRange = getTimeRange();
    
    const stats = analyticsService.getAggregatedStats(
        tenantFilter || null,
        timeRange.start,
        timeRange.end
    );
    
    updateMetricCards(stats);
    updateCharts(stats);
    updateInsights(stats);
    updateRecentActivity();
}

function getTimeRange() {
    const range = document.getElementById('timeRangeFilter').value;
    const end = new Date();
    let start = new Date();
    
    switch(range) {
        case 'today':
            start.setHours(0, 0, 0, 0);
            break;
        case 'week':
            start.setDate(start.getDate() - 7);
            break;
        case 'month':
            start.setDate(start.getDate() - 30);
            break;
        case 'all':
            start = null;
            break;
    }
    
    return { start, end };
}

function updateMetricCards(stats) {
    // Usage statistics
    document.getElementById('totalActions').textContent = stats.totalUsage.totalActions.toLocaleString();
    document.getElementById('avgDuration').textContent = stats.totalUsage.averageDuration.toFixed(2);
    document.getElementById('totalDuration').textContent = stats.totalUsage.totalDuration.toFixed(2);
    
    // Voice commands
    document.getElementById('totalCommands').textContent = stats.voiceCommands.total.toLocaleString();
    document.getElementById('commandSuccessRate').textContent = stats.voiceCommands.successRate.toFixed(1);
    document.getElementById('avgResponseTime').textContent = stats.voiceCommands.averageResponseTime.toFixed(0);
    
    // Server connectivity
    document.getElementById('totalRequests').textContent = stats.serverConnectivity.total.toLocaleString();
    const connSuccessRate = stats.serverConnectivity.total > 0 
        ? (stats.serverConnectivity.successful / stats.serverConnectivity.total * 100)
        : 0;
    document.getElementById('connSuccessRate').textContent = connSuccessRate.toFixed(1);
    document.getElementById('avgLatency').textContent = stats.serverConnectivity.averageLatency.toFixed(0);
    
    // Errors
    document.getElementById('totalErrors').textContent = stats.errors.total.toLocaleString();
    document.getElementById('criticalErrors').textContent = stats.errors.bySeverity.critical;
    document.getElementById('highErrors').textContent = stats.errors.bySeverity.high;
}

function updateCharts(stats) {
    updateTimelineChart(stats.timeline);
    updateUsageChart(stats.totalUsage.actionBreakdown);
    updateVoiceChart(stats.voiceCommands);
    updateErrorChart(stats.errors);
}

function updateTimelineChart(timeline) {
    const ctx = document.getElementById('timelineChart').getContext('2d');
    
    const dates = Object.keys(timeline).sort();
    const data = dates.map(date => timeline[date].total);
    
    if (charts.timeline) {
        charts.timeline.destroy();
    }
    
    charts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Activity',
                data: data,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateUsageChart(actionBreakdown) {
    const ctx = document.getElementById('usageChart').getContext('2d');
    
    const actions = Object.keys(actionBreakdown);
    const counts = Object.values(actionBreakdown);
    
    if (charts.usage) {
        charts.usage.destroy();
    }
    
    charts.usage = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: actions.length > 0 ? actions : ['No Data'],
            datasets: [{
                data: counts.length > 0 ? counts : [1],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6',
                    '#1abc9c'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function updateVoiceChart(voiceStats) {
    const ctx = document.getElementById('voiceChart').getContext('2d');
    
    if (charts.voice) {
        charts.voice.destroy();
    }
    
    charts.voice = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Successful', 'Failed'],
            datasets: [{
                label: 'Voice Commands',
                data: [voiceStats.successful, voiceStats.failed],
                backgroundColor: ['#27ae60', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateErrorChart(errorStats) {
    const ctx = document.getElementById('errorChart').getContext('2d');
    
    if (charts.error) {
        charts.error.destroy();
    }
    
    charts.error = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                label: 'Errors by Severity',
                data: [
                    errorStats.bySeverity.critical,
                    errorStats.bySeverity.high,
                    errorStats.bySeverity.medium,
                    errorStats.bySeverity.low
                ],
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#f1c40f',
                    '#3498db'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateInsights(stats) {
    const insightsList = document.getElementById('insightsList');
    insightsList.innerHTML = '';
    
    const insights = generateInsights(stats);
    
    if (insights.length === 0) {
        insightsList.innerHTML = '<p style="color: #7f8c8d;">No insights available yet. Generate some activity to see actionable insights.</p>';
        return;
    }
    
    insights.forEach(insight => {
        const item = document.createElement('div');
        item.className = `insight-item ${insight.type}`;
        item.textContent = insight.message;
        insightsList.appendChild(item);
    });
}

function generateInsights(stats) {
    const insights = [];
    
    // Voice command insights
    if (stats.voiceCommands.total > 0) {
        if (stats.voiceCommands.successRate < 80) {
            insights.push({
                type: 'warning',
                message: `Voice command success rate is ${stats.voiceCommands.successRate.toFixed(1)}%. Consider reviewing command recognition settings.`
            });
        } else if (stats.voiceCommands.successRate > 95) {
            insights.push({
                type: 'success',
                message: `Excellent voice command performance! ${stats.voiceCommands.successRate.toFixed(1)}% success rate.`
            });
        }
        
        if (stats.voiceCommands.averageResponseTime > 1000) {
            insights.push({
                type: 'warning',
                message: `Average voice response time is ${stats.voiceCommands.averageResponseTime.toFixed(0)}ms. Consider optimizing processing.`
            });
        }
    }
    
    // Connectivity insights
    if (stats.serverConnectivity.total > 0) {
        const connSuccessRate = (stats.serverConnectivity.successful / stats.serverConnectivity.total * 100);
        if (connSuccessRate < 90) {
            insights.push({
                type: 'critical',
                message: `Server connectivity issues detected. Only ${connSuccessRate.toFixed(1)}% of requests successful.`
            });
        }
        
        if (stats.serverConnectivity.averageLatency > 500) {
            insights.push({
                type: 'warning',
                message: `High server latency detected: ${stats.serverConnectivity.averageLatency.toFixed(0)}ms average.`
            });
        }
    }
    
    // Error insights
    if (stats.errors.bySeverity.critical > 0) {
        insights.push({
            type: 'critical',
            message: `${stats.errors.bySeverity.critical} critical error(s) detected. Immediate attention required.`
        });
    }
    
    if (stats.errors.total > 50) {
        insights.push({
            type: 'warning',
            message: `High error count: ${stats.errors.total} errors logged. Review error patterns.`
        });
    }
    
    // Usage insights
    if (stats.totalUsage.totalActions > 1000) {
        insights.push({
            type: 'success',
            message: `High engagement detected with ${stats.totalUsage.totalActions} total actions.`
        });
    }
    
    return insights;
}

function updateRecentActivity() {
    const tbody = document.querySelector('#recentActivityTable tbody');
    tbody.innerHTML = '';
    
    const recentMetrics = analyticsService.metrics.slice(-10).reverse();
    
    if (recentMetrics.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.style.textAlign = 'center';
        cell.style.color = '#7f8c8d';
        cell.textContent = 'No recent activity';
        return;
    }
    
    recentMetrics.forEach(metric => {
        const row = tbody.insertRow();
        
        row.insertCell().textContent = new Date(metric.timestamp).toLocaleString();
        row.insertCell().textContent = getMetricTypeName(metric);
        row.insertCell().textContent = metric.userId;
        row.insertCell().textContent = metric.tenantId;
        row.insertCell().textContent = getMetricDetails(metric);
    });
}

function getMetricTypeName(metric) {
    if (metric.action) return 'Usage';
    if (metric.command) return 'Voice Command';
    if (metric.serverEndpoint) return 'Connectivity';
    if (metric.errorType) return 'Error';
    return 'Other';
}

function getMetricDetails(metric) {
    if (metric.action) return metric.action;
    if (metric.command) return `${metric.command} (${metric.success ? 'Success' : 'Failed'})`;
    if (metric.serverEndpoint) return `${metric.serverEndpoint} (${metric.latency}ms)`;
    if (metric.errorType) return `${metric.errorType}: ${metric.errorMessage}`;
    return '-';
}

// Helper function to generate sample data for demo purposes
function generateSampleData() {
    if (!analyticsService.hasUserConsent(currentUser)) {
        console.log('Analytics not enabled. Enable analytics to generate sample data.');
        return;
    }
    
    // Generate sample usage metrics
    const actions = ['login', 'search', 'export', 'import', 'configure'];
    for (let i = 0; i < 50; i++) {
        analyticsService.collectMetric({
            tenantId: currentTenant,
            userId: currentUser,
            action: actions[Math.floor(Math.random() * actions.length)],
            duration: Math.random() * 60,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Generate sample voice commands
    const commands = ['play', 'pause', 'next', 'previous', 'volume up', 'volume down'];
    for (let i = 0; i < 30; i++) {
        analyticsService.collectMetric({
            tenantId: currentTenant,
            userId: currentUser,
            command: commands[Math.floor(Math.random() * commands.length)],
            success: Math.random() > 0.15,
            responseTime: Math.random() * 800 + 100,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Generate sample connectivity metrics
    const endpoints = ['/api/users', '/api/data', '/api/export', '/api/settings'];
    for (let i = 0; i < 40; i++) {
        analyticsService.collectMetric({
            tenantId: currentTenant,
            userId: currentUser,
            serverEndpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
            status: Math.random() > 0.1 ? 'success' : 'error',
            latency: Math.random() * 300 + 50,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Generate sample errors
    const errorTypes = ['NetworkError', 'ValidationError', 'AuthenticationError', 'TimeoutError'];
    const severities = ['low', 'medium', 'high', 'critical'];
    for (let i = 0; i < 15; i++) {
        analyticsService.collectMetric({
            tenantId: currentTenant,
            userId: currentUser,
            errorType: errorTypes[Math.floor(Math.random() * errorTypes.length)],
            errorMessage: 'Sample error message',
            severity: severities[Math.floor(Math.random() * severities.length)],
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    console.log('Sample data generated successfully!');
    loadDashboard();
}

// Expose function to window for demo purposes
window.generateSampleData = generateSampleData;
window.analyticsService = analyticsService;
