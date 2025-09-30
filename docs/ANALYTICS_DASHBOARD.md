# Analytics Dashboard Documentation

## Overview

The Analytics Dashboard provides comprehensive insights into application usage, performance, and productivity metrics. It enables both users and administrators to track voice command statistics, server connectivity, error rates, and overall system health.

## Features

### 1. **Multi-Tenant Support**
- View analytics per tenant or account
- Filter data by specific tenants
- Aggregate metrics across all tenants

### 2. **Metrics Collection**
The dashboard tracks the following metrics:

#### Usage Metrics
- Total actions performed
- Action duration and averages
- Action breakdown by type
- User engagement patterns

#### Voice Command Statistics
- Total commands processed
- Success/failure rates
- Average response times
- Command type distribution

#### Server Connectivity
- Request counts and success rates
- Server latency measurements
- Endpoint-specific metrics
- Connection reliability tracking

#### Error Tracking
- Error counts by severity (critical, high, medium, low)
- Error type distribution
- Error trends over time
- Stack trace capture

### 3. **Data Visualization**
- Real-time dashboard with interactive charts
- Timeline graphs showing activity trends
- Pie charts for usage breakdown
- Bar charts for comparative analysis
- Color-coded severity indicators

### 4. **Actionable Insights**
The dashboard automatically generates insights based on collected data:
- Performance warnings and recommendations
- Success rate alerts
- Latency notifications
- Error pattern detection

### 5. **Privacy and Consent Management**
- User opt-in/opt-out capabilities
- Data stored locally with user control
- Clear privacy policy
- Transparent data collection practices

## Installation

### Prerequisites
- Modern web browser with JavaScript enabled
- No server-side dependencies required

### Setup

1. Clone the repository:
```bash
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub
```

2. Open the dashboard:
```bash
# Open in your default browser
open src/analytics/ui/dashboard.html

# Or use a simple HTTP server
python -m http.server 8000
# Then navigate to http://localhost:8000/src/analytics/ui/dashboard.html
```

## Usage Guide

### For End Users

#### Enabling Analytics

1. Open the Analytics Dashboard
2. You'll see a privacy banner on first visit
3. Click "Enable Analytics" to opt-in to data collection
4. Your preference is saved locally

#### Viewing Your Data

1. Select your tenant from the dropdown (if multi-tenant)
2. Choose a time range:
   - Today
   - Last 7 Days
   - Last 30 Days
   - All Time
3. Click "Refresh" to update the dashboard

#### Understanding Metrics

**Usage Statistics Card:**
- Shows total actions you've performed
- Displays average and total duration
- Helps you understand your activity patterns

**Voice Commands Card:**
- Total voice commands processed
- Success rate percentage
- Average response time in milliseconds

**Server Connectivity Card:**
- Total server requests made
- Success rate of connections
- Average latency of requests

**Errors Card:**
- Total errors encountered
- Breakdown by severity level

### For Administrators

#### Tenant Management

```javascript
// Set up tenant filter
const tenantSelect = document.getElementById('tenantFilter');
const option = document.createElement('option');
option.value = 'tenant-id';
option.textContent = 'Tenant Name';
tenantSelect.appendChild(option);
```

#### Accessing Aggregated Data

```javascript
// Get stats for specific tenant
const stats = analyticsService.getAggregatedStats('tenant-id');

// Get stats for all tenants
const allStats = analyticsService.getAggregatedStats();
```

#### Generating Reports

The dashboard provides real-time visualization. To export data:

```javascript
// Get all metrics
const allMetrics = analyticsService.metrics;

// Export to JSON
const jsonData = JSON.stringify(allMetrics, null, 2);
console.log(jsonData);

// Or download as file
const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'analytics-report.json';
a.click();
```

## API Reference

### AnalyticsService

#### Methods

**`initialize()`**
Initializes the analytics service and loads stored data.

```javascript
const service = new AnalyticsService();
service.initialize();
```

**`setUserConsent(userId, tenantId, enabled)`**
Sets analytics consent for a user.

```javascript
service.setUserConsent('user-123', 'tenant-456', true);
```

**`hasUserConsent(userId)`**
Checks if a user has enabled analytics.

```javascript
const hasConsent = service.hasUserConsent('user-123');
```

**`collectMetric(metric)`**
Collects an analytics metric (only if user has consented).

```javascript
const metric = new UsageMetric('tenant-id', 'user-id', 'action-name', 100);
service.collectMetric(metric);
```

**`getMetricsByTenant(tenantId, startDate, endDate)`**
Retrieves metrics for a specific tenant, optionally filtered by date range.

```javascript
const metrics = service.getMetricsByTenant('tenant-id', startDate, endDate);
```

**`getMetricsByUser(userId, startDate, endDate)`**
Retrieves metrics for a specific user.

```javascript
const metrics = service.getMetricsByUser('user-id', startDate, endDate);
```

**`getAggregatedStats(tenantId, startDate, endDate)`**
Gets aggregated statistics.

```javascript
const stats = service.getAggregatedStats('tenant-id');
// Returns: { totalUsage, voiceCommands, serverConnectivity, errors, timeline }
```

**`clearAllData()`**
Clears all stored metrics and consents.

```javascript
service.clearAllData();
```

### Data Models

#### UsageMetric
```javascript
new UsageMetric(tenantId, userId, action, duration, metadata)
```

#### VoiceCommandMetric
```javascript
new VoiceCommandMetric(tenantId, userId, command, success, responseTime, errorMessage)
```

#### ServerConnectivityMetric
```javascript
new ServerConnectivityMetric(tenantId, userId, serverEndpoint, status, latency, errorCode)
```

#### ErrorMetric
```javascript
new ErrorMetric(tenantId, userId, errorType, errorMessage, stackTrace, severity)
```

## Integration Guide

### Collecting Metrics from Your Application

```javascript
// Initialize the service
const analyticsService = new AnalyticsService();
analyticsService.initialize();

// Check consent before collecting
if (analyticsService.hasUserConsent(currentUserId)) {
    // Track user actions
    const usageMetric = new UsageMetric(
        tenantId,
        userId,
        'button-click',
        2.5, // duration in seconds
        { buttonId: 'submit-btn' }
    );
    analyticsService.collectMetric(usageMetric);
    
    // Track voice commands
    const voiceMetric = new VoiceCommandMetric(
        tenantId,
        userId,
        'play music',
        true, // success
        250 // response time in ms
    );
    analyticsService.collectMetric(voiceMetric);
    
    // Track API calls
    const connMetric = new ServerConnectivityMetric(
        tenantId,
        userId,
        '/api/data',
        'success',
        125 // latency in ms
    );
    analyticsService.collectMetric(connMetric);
    
    // Track errors
    const errorMetric = new ErrorMetric(
        tenantId,
        userId,
        'ValidationError',
        'Invalid email format',
        null, // stack trace
        'medium' // severity
    );
    analyticsService.collectMetric(errorMetric);
}
```

### Custom Event Tracking

```javascript
// Track custom events
function trackCustomEvent(eventName, metadata) {
    if (analyticsService.hasUserConsent(userId)) {
        const metric = new UsageMetric(
            tenantId,
            userId,
            eventName,
            0,
            metadata
        );
        analyticsService.collectMetric(metric);
    }
}

// Usage
trackCustomEvent('feature-used', { feature: 'export', format: 'csv' });
```

## Testing

### Running Tests

```bash
# Using Node.js
node tests/analytics.test.js
```

### Test Coverage

The test suite includes:
- Service initialization tests
- User consent management tests
- Metric collection tests
- Privacy enforcement tests
- Data filtering and aggregation tests
- Timeline generation tests
- Statistics calculation tests

All tests must pass before deployment.

## Privacy Policy

### Data Collection

We collect the following types of data:
- Usage patterns (actions, timestamps, durations)
- Voice command statistics (command types, success rates, response times)
- Server connectivity metrics (endpoints, latencies, success rates)
- Error information (types, messages, severity levels)

### Data Storage

- All data is stored locally in the browser's localStorage
- No data is transmitted to external servers by default
- Users have full control over their data

### User Rights

- **Right to opt-in/opt-out:** Users can enable or disable analytics at any time
- **Right to access:** Users can view all collected data in the dashboard
- **Right to deletion:** Users can clear all analytics data
- **Right to privacy:** No personally identifiable information is shared without explicit consent

### Data Retention

- Data persists in localStorage until manually cleared
- Users can clear data at any time via the dashboard or browser settings
- Administrators should implement appropriate data retention policies

## Troubleshooting

### Dashboard Not Loading

1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Verify all required files are present
4. Clear browser cache and reload

### Metrics Not Appearing

1. Verify user has enabled analytics consent
2. Check if metrics are being collected:
   ```javascript
   console.log(analyticsService.metrics);
   ```
3. Verify consent status:
   ```javascript
   console.log(analyticsService.hasUserConsent(userId));
   ```

### Charts Not Rendering

1. Verify Chart.js library is loaded
2. Check browser console for errors
3. Ensure canvas elements have proper IDs
4. Try refreshing the dashboard

### Performance Issues

1. Consider implementing data pagination for large datasets
2. Limit the number of metrics displayed in tables
3. Use date range filters to reduce data load
4. Clear old data periodically

## Best Practices

### For Developers

1. **Always check consent before collecting metrics**
   ```javascript
   if (analyticsService.hasUserConsent(userId)) {
       // collect metrics
   }
   ```

2. **Use appropriate severity levels for errors**
   - Critical: System failures, data loss
   - High: Feature breakage, security issues
   - Medium: Degraded functionality
   - Low: Minor issues, warnings

3. **Include meaningful metadata**
   ```javascript
   const metric = new UsageMetric(tenant, user, 'export', 5.2, {
       format: 'pdf',
       pageCount: 10,
       fileSize: 2048
   });
   ```

4. **Handle errors gracefully**
   ```javascript
   try {
       analyticsService.collectMetric(metric);
   } catch (error) {
       console.error('Failed to collect metric:', error);
   }
   ```

### For Administrators

1. **Implement data retention policies**
2. **Regular data exports for backup**
3. **Monitor critical errors promptly**
4. **Review insights for system improvements**
5. **Respect user privacy preferences**

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Review existing documentation
- Check troubleshooting section

## License

This analytics dashboard is part of the GitHub repository.
Please refer to the main repository license for terms of use.
