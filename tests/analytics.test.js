/**
 * Analytics Service Tests
 * Automated tests for analytics features
 */

// Simple test framework
const assert = {
    equal: (actual, expected, message) => {
        if (actual !== expected) {
            throw new Error(`${message}\nExpected: ${expected}, Got: ${actual}`);
        }
    },
    deepEqual: (actual, expected, message) => {
        const actualStr = JSON.stringify(actual);
        const expectedStr = JSON.stringify(expected);
        if (actualStr !== expectedStr) {
            throw new Error(`${message}\nExpected: ${expectedStr}, Got: ${actualStr}`);
        }
    },
    ok: (value, message) => {
        if (!value) {
            throw new Error(message);
        }
    }
};

class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('Running Analytics Tests...\n');
        
        for (const test of this.tests) {
            try {
                await test.fn();
                this.passed++;
                console.log(`✓ ${test.name}`);
            } catch (error) {
                this.failed++;
                console.error(`✗ ${test.name}`);
                console.error(`  ${error.message}\n`);
            }
        }
        
        console.log('\n' + '='.repeat(50));
        console.log(`Tests: ${this.tests.length}, Passed: ${this.passed}, Failed: ${this.failed}`);
        
        return this.failed === 0;
    }
}

// Load dependencies
if (typeof require !== 'undefined') {
    const AnalyticsService = require('../src/analytics/services/AnalyticsService.js');
    const { UsageMetric, VoiceCommandMetric, ServerConnectivityMetric, ErrorMetric, UserConsent } 
        = require('../src/analytics/models/AnalyticsModels.js');
    
    runTests(AnalyticsService, { UsageMetric, VoiceCommandMetric, ServerConnectivityMetric, ErrorMetric, UserConsent });
}

function runTests(AnalyticsService, Models) {
    const runner = new TestRunner();
    
    // Test 1: Service Initialization
    runner.test('AnalyticsService should initialize correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        assert.ok(service.initialized, 'Service should be initialized');
        assert.equal(service.metrics.length, 0, 'Metrics should be empty initially');
        assert.equal(service.userConsents.size, 0, 'Consents should be empty initially');
    });
    
    // Test 2: User Consent
    runner.test('Should set and check user consent', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        const userId = 'test-user';
        const tenantId = 'test-tenant';
        
        assert.equal(service.hasUserConsent(userId), false, 'User should not have consent initially');
        
        service.setUserConsent(userId, tenantId, true);
        assert.equal(service.hasUserConsent(userId), true, 'User should have consent after setting');
        
        service.setUserConsent(userId, tenantId, false);
        assert.equal(service.hasUserConsent(userId), false, 'User should not have consent after disabling');
    });
    
    // Test 3: Collect Metrics with Consent
    runner.test('Should collect metrics when user has consent', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        const userId = 'test-user';
        const tenantId = 'test-tenant';
        
        service.setUserConsent(userId, tenantId, true);
        
        const metric = new Models.UsageMetric(tenantId, userId, 'test-action', 100);
        const result = service.collectMetric(metric);
        
        assert.equal(result, true, 'Should successfully collect metric');
        assert.equal(service.metrics.length, 1, 'Should have one metric');
    });
    
    // Test 4: Reject Metrics without Consent
    runner.test('Should reject metrics when user has no consent', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        const userId = 'test-user';
        const tenantId = 'test-tenant';
        
        const metric = new Models.UsageMetric(tenantId, userId, 'test-action', 100);
        const result = service.collectMetric(metric);
        
        assert.equal(result, false, 'Should reject metric without consent');
        assert.equal(service.metrics.length, 0, 'Should have no metrics');
    });
    
    // Test 5: Filter Metrics by Tenant
    runner.test('Should filter metrics by tenant', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        service.setUserConsent('user2', 'tenant2', true);
        
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action1', 100));
        service.collectMetric(new Models.UsageMetric('tenant2', 'user2', 'action2', 200));
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action3', 150));
        
        const tenant1Metrics = service.getMetricsByTenant('tenant1');
        assert.equal(tenant1Metrics.length, 2, 'Should have 2 metrics for tenant1');
        
        const tenant2Metrics = service.getMetricsByTenant('tenant2');
        assert.equal(tenant2Metrics.length, 1, 'Should have 1 metric for tenant2');
    });
    
    // Test 6: Filter Metrics by User
    runner.test('Should filter metrics by user', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        service.setUserConsent('user2', 'tenant1', true);
        
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action1', 100));
        service.collectMetric(new Models.UsageMetric('tenant1', 'user2', 'action2', 200));
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action3', 150));
        
        const user1Metrics = service.getMetricsByUser('user1');
        assert.equal(user1Metrics.length, 2, 'Should have 2 metrics for user1');
        
        const user2Metrics = service.getMetricsByUser('user2');
        assert.equal(user2Metrics.length, 1, 'Should have 1 metric for user2');
    });
    
    // Test 7: Aggregate Usage Statistics
    runner.test('Should aggregate usage statistics correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action1', 100));
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action2', 200));
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action1', 150));
        
        const stats = service.getAggregatedStats('tenant1');
        
        assert.equal(stats.totalUsage.totalActions, 3, 'Should have 3 total actions');
        assert.equal(stats.totalUsage.totalDuration, 450, 'Should have correct total duration');
        assert.equal(stats.totalUsage.averageDuration, 150, 'Should have correct average duration');
    });
    
    // Test 8: Aggregate Voice Command Statistics
    runner.test('Should aggregate voice command statistics correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        service.collectMetric(new Models.VoiceCommandMetric('tenant1', 'user1', 'play', true, 100));
        service.collectMetric(new Models.VoiceCommandMetric('tenant1', 'user1', 'pause', true, 150));
        service.collectMetric(new Models.VoiceCommandMetric('tenant1', 'user1', 'next', false, 200, 'error'));
        service.collectMetric(new Models.VoiceCommandMetric('tenant1', 'user1', 'play', true, 120));
        
        const stats = service.getAggregatedStats('tenant1');
        
        assert.equal(stats.voiceCommands.total, 4, 'Should have 4 total commands');
        assert.equal(stats.voiceCommands.successful, 3, 'Should have 3 successful commands');
        assert.equal(stats.voiceCommands.failed, 1, 'Should have 1 failed command');
        assert.equal(stats.voiceCommands.successRate, 75, 'Should have 75% success rate');
    });
    
    // Test 9: Aggregate Connectivity Statistics
    runner.test('Should aggregate connectivity statistics correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        service.collectMetric(new Models.ServerConnectivityMetric('tenant1', 'user1', '/api/test', 'success', 100));
        service.collectMetric(new Models.ServerConnectivityMetric('tenant1', 'user1', '/api/test', 200, 150));
        service.collectMetric(new Models.ServerConnectivityMetric('tenant1', 'user1', '/api/test', 'error', 300, 500));
        
        const stats = service.getAggregatedStats('tenant1');
        
        assert.equal(stats.serverConnectivity.total, 3, 'Should have 3 total requests');
        assert.equal(stats.serverConnectivity.successful, 2, 'Should have 2 successful requests');
        assert.equal(stats.serverConnectivity.failed, 1, 'Should have 1 failed request');
    });
    
    // Test 10: Aggregate Error Statistics
    runner.test('Should aggregate error statistics correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        service.collectMetric(new Models.ErrorMetric('tenant1', 'user1', 'NetworkError', 'Connection failed', null, 'critical'));
        service.collectMetric(new Models.ErrorMetric('tenant1', 'user1', 'ValidationError', 'Invalid input', null, 'low'));
        service.collectMetric(new Models.ErrorMetric('tenant1', 'user1', 'NetworkError', 'Timeout', null, 'high'));
        
        const stats = service.getAggregatedStats('tenant1');
        
        assert.equal(stats.errors.total, 3, 'Should have 3 total errors');
        assert.equal(stats.errors.bySeverity.critical, 1, 'Should have 1 critical error');
        assert.equal(stats.errors.bySeverity.high, 1, 'Should have 1 high error');
        assert.equal(stats.errors.bySeverity.low, 1, 'Should have 1 low error');
    });
    
    // Test 11: Timeline Generation
    runner.test('Should generate timeline correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        const today = new Date().toISOString();
        service.collectMetric({ ...new Models.UsageMetric('tenant1', 'user1', 'action1', 100), timestamp: today });
        service.collectMetric({ ...new Models.UsageMetric('tenant1', 'user1', 'action2', 200), timestamp: today });
        
        const stats = service.getAggregatedStats('tenant1');
        const timeline = stats.timeline;
        
        const dateKey = today.split('T')[0];
        assert.ok(timeline[dateKey], 'Should have entry for today');
        assert.equal(timeline[dateKey].total, 2, 'Should have 2 events for today');
    });
    
    // Test 12: Clear All Data
    runner.test('Should clear all data correctly', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        service.collectMetric(new Models.UsageMetric('tenant1', 'user1', 'action1', 100));
        
        assert.equal(service.metrics.length, 1, 'Should have metrics before clearing');
        assert.equal(service.userConsents.size, 1, 'Should have consents before clearing');
        
        service.clearAllData();
        
        assert.equal(service.metrics.length, 0, 'Should have no metrics after clearing');
        assert.equal(service.userConsents.size, 0, 'Should have no consents after clearing');
    });
    
    // Test 13: Date Range Filtering
    runner.test('Should filter metrics by date range', () => {
        const service = new AnalyticsService();
        service.initialize();
        
        service.setUserConsent('user1', 'tenant1', true);
        
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        service.collectMetric({ ...new Models.UsageMetric('tenant1', 'user1', 'action1', 100), timestamp: yesterday.toISOString() });
        service.collectMetric({ ...new Models.UsageMetric('tenant1', 'user1', 'action2', 200), timestamp: today.toISOString() });
        service.collectMetric({ ...new Models.UsageMetric('tenant1', 'user1', 'action3', 150), timestamp: tomorrow.toISOString() });
        
        const metrics = service.getMetricsByTenant('tenant1', yesterday, today);
        assert.equal(metrics.length, 2, 'Should have 2 metrics in date range');
    });
    
    // Run all tests
    runner.run().then(success => {
        if (!success) {
            process.exit(1);
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests, TestRunner };
}
