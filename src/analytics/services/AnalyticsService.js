/**
 * Analytics Service
 * Handles collection, aggregation, and retrieval of analytics data
 */

class AnalyticsService {
    constructor() {
        this.metrics = [];
        this.userConsents = new Map();
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;
        
        // Load stored metrics from localStorage if available
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('analytics_metrics');
            if (stored) {
                try {
                    this.metrics = JSON.parse(stored);
                } catch (e) {
                    console.error('Failed to load stored metrics:', e);
                }
            }
            
            const consents = localStorage.getItem('analytics_consents');
            if (consents) {
                try {
                    const consentArray = JSON.parse(consents);
                    consentArray.forEach(c => {
                        this.userConsents.set(c.userId, c);
                    });
                } catch (e) {
                    console.error('Failed to load stored consents:', e);
                }
            }
        }
        
        this.initialized = true;
    }

    setUserConsent(userId, tenantId, enabled) {
        const consent = {
            userId,
            tenantId,
            analyticsEnabled: enabled,
            timestamp: new Date().toISOString()
        };
        this.userConsents.set(userId, consent);
        this._persistConsents();
        return consent;
    }

    hasUserConsent(userId) {
        const consent = this.userConsents.get(userId);
        return consent ? consent.analyticsEnabled : false;
    }

    collectMetric(metric) {
        if (!this.hasUserConsent(metric.userId)) {
            console.warn('Analytics not enabled for user:', metric.userId);
            return false;
        }

        this.metrics.push({
            ...metric,
            timestamp: metric.timestamp || new Date().toISOString()
        });
        
        this._persistMetrics();
        return true;
    }

    getMetricsByTenant(tenantId, startDate = null, endDate = null) {
        return this._filterMetrics({ tenantId }, startDate, endDate);
    }

    getMetricsByUser(userId, startDate = null, endDate = null) {
        return this._filterMetrics({ userId }, startDate, endDate);
    }

    getAggregatedStats(tenantId = null, startDate = null, endDate = null) {
        const metrics = tenantId 
            ? this.getMetricsByTenant(tenantId, startDate, endDate)
            : this._filterMetrics({}, startDate, endDate);

        return {
            totalUsage: this._aggregateUsage(metrics),
            voiceCommands: this._aggregateVoiceCommands(metrics),
            serverConnectivity: this._aggregateConnectivity(metrics),
            errors: this._aggregateErrors(metrics),
            timeline: this._generateTimeline(metrics)
        };
    }

    _filterMetrics(criteria, startDate, endDate) {
        return this.metrics.filter(m => {
            const matchesCriteria = Object.keys(criteria).every(key => m[key] === criteria[key]);
            
            if (!matchesCriteria) return false;
            
            const metricDate = new Date(m.timestamp);
            if (startDate && metricDate < new Date(startDate)) return false;
            if (endDate && metricDate > new Date(endDate)) return false;
            
            return true;
        });
    }

    _aggregateUsage(metrics) {
        const usageMetrics = metrics.filter(m => m.action !== undefined);
        return {
            totalActions: usageMetrics.length,
            totalDuration: usageMetrics.reduce((sum, m) => sum + (m.duration || 0), 0),
            averageDuration: usageMetrics.length > 0 
                ? usageMetrics.reduce((sum, m) => sum + (m.duration || 0), 0) / usageMetrics.length 
                : 0,
            actionBreakdown: this._groupBy(usageMetrics, 'action')
        };
    }

    _aggregateVoiceCommands(metrics) {
        const voiceMetrics = metrics.filter(m => m.command !== undefined);
        const successful = voiceMetrics.filter(m => m.success);
        
        return {
            total: voiceMetrics.length,
            successful: successful.length,
            failed: voiceMetrics.length - successful.length,
            successRate: voiceMetrics.length > 0 ? (successful.length / voiceMetrics.length) * 100 : 0,
            averageResponseTime: voiceMetrics.length > 0
                ? voiceMetrics.reduce((sum, m) => sum + (m.responseTime || 0), 0) / voiceMetrics.length
                : 0,
            commandBreakdown: this._groupBy(voiceMetrics, 'command')
        };
    }

    _aggregateConnectivity(metrics) {
        const connMetrics = metrics.filter(m => m.serverEndpoint !== undefined);
        const successful = connMetrics.filter(m => m.status === 'success' || m.status === 200);
        
        return {
            total: connMetrics.length,
            successful: successful.length,
            failed: connMetrics.length - successful.length,
            averageLatency: connMetrics.length > 0
                ? connMetrics.reduce((sum, m) => sum + (m.latency || 0), 0) / connMetrics.length
                : 0,
            endpointBreakdown: this._groupBy(connMetrics, 'serverEndpoint')
        };
    }

    _aggregateErrors(metrics) {
        const errorMetrics = metrics.filter(m => m.errorType !== undefined);
        
        return {
            total: errorMetrics.length,
            bySeverity: {
                critical: errorMetrics.filter(m => m.severity === 'critical').length,
                high: errorMetrics.filter(m => m.severity === 'high').length,
                medium: errorMetrics.filter(m => m.severity === 'medium').length,
                low: errorMetrics.filter(m => m.severity === 'low').length
            },
            byType: this._groupBy(errorMetrics, 'errorType')
        };
    }

    _generateTimeline(metrics) {
        const timeline = {};
        metrics.forEach(m => {
            const date = new Date(m.timestamp).toISOString().split('T')[0];
            if (!timeline[date]) {
                timeline[date] = { total: 0, byType: {} };
            }
            timeline[date].total++;
            
            const type = this._getMetricType(m);
            timeline[date].byType[type] = (timeline[date].byType[type] || 0) + 1;
        });
        return timeline;
    }

    _getMetricType(metric) {
        if (metric.action !== undefined) return 'usage';
        if (metric.command !== undefined) return 'voiceCommand';
        if (metric.serverEndpoint !== undefined) return 'connectivity';
        if (metric.errorType !== undefined) return 'error';
        return 'other';
    }

    _groupBy(array, key) {
        return array.reduce((acc, item) => {
            const value = item[key];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    _persistMetrics() {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('analytics_metrics', JSON.stringify(this.metrics));
            } catch (e) {
                console.error('Failed to persist metrics:', e);
            }
        }
    }

    _persistConsents() {
        if (typeof localStorage !== 'undefined') {
            try {
                const consentArray = Array.from(this.userConsents.values());
                localStorage.setItem('analytics_consents', JSON.stringify(consentArray));
            } catch (e) {
                console.error('Failed to persist consents:', e);
            }
        }
    }

    clearAllData() {
        this.metrics = [];
        this.userConsents.clear();
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('analytics_metrics');
            localStorage.removeItem('analytics_consents');
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsService;
}
