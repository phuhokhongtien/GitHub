/**
 * Analytics Data Models
 * Defines data structures for collecting and storing analytics metrics
 */

class AnalyticsMetric {
    constructor(tenantId, userId, timestamp = new Date()) {
        this.tenantId = tenantId;
        this.userId = userId;
        this.timestamp = timestamp;
    }
}

class UsageMetric extends AnalyticsMetric {
    constructor(tenantId, userId, action, duration, metadata = {}) {
        super(tenantId, userId);
        this.action = action;
        this.duration = duration;
        this.metadata = metadata;
    }
}

class VoiceCommandMetric extends AnalyticsMetric {
    constructor(tenantId, userId, command, success, responseTime, errorMessage = null) {
        super(tenantId, userId);
        this.command = command;
        this.success = success;
        this.responseTime = responseTime;
        this.errorMessage = errorMessage;
    }
}

class ServerConnectivityMetric extends AnalyticsMetric {
    constructor(tenantId, userId, serverEndpoint, status, latency, errorCode = null) {
        super(tenantId, userId);
        this.serverEndpoint = serverEndpoint;
        this.status = status;
        this.latency = latency;
        this.errorCode = errorCode;
    }
}

class ErrorMetric extends AnalyticsMetric {
    constructor(tenantId, userId, errorType, errorMessage, stackTrace = null, severity = 'medium') {
        super(tenantId, userId);
        this.errorType = errorType;
        this.errorMessage = errorMessage;
        this.stackTrace = stackTrace;
        this.severity = severity;
    }
}

class UserConsent {
    constructor(userId, tenantId, analyticsEnabled = false, timestamp = new Date()) {
        this.userId = userId;
        this.tenantId = tenantId;
        this.analyticsEnabled = analyticsEnabled;
        this.timestamp = timestamp;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnalyticsMetric,
        UsageMetric,
        VoiceCommandMetric,
        ServerConnectivityMetric,
        ErrorMetric,
        UserConsent
    };
}
