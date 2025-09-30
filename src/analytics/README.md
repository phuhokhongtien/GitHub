# Analytics Module

A comprehensive, privacy-focused analytics dashboard for tracking usage, performance, and productivity insights.

## Quick Start

1. Open the dashboard:
   ```bash
   open src/analytics/ui/dashboard.html
   ```

2. Enable analytics when prompted

3. Generate sample data (for demo):
   ```javascript
   // Open browser console and run:
   window.generateSampleData();
   ```

4. View your analytics!

## Features

✅ **Usage Tracking** - Monitor user actions and engagement  
✅ **Voice Command Analytics** - Track voice command performance  
✅ **Server Connectivity** - Monitor API performance and reliability  
✅ **Error Tracking** - Identify and resolve issues quickly  
✅ **Privacy First** - User opt-in required, local data storage  
✅ **Multi-Tenant** - Support for multiple organizations  
✅ **Real-time Insights** - Actionable recommendations  
✅ **Automated Tests** - Full test coverage  

## Project Structure

```
src/analytics/
├── models/
│   └── AnalyticsModels.js       # Data models for metrics
├── services/
│   └── AnalyticsService.js      # Core analytics service
└── ui/
    ├── dashboard.html           # Dashboard UI
    ├── dashboard.css            # Styling
    └── dashboard.js             # Dashboard logic

tests/
└── analytics.test.js            # Automated tests

docs/
├── ANALYTICS_DASHBOARD.md       # Complete documentation
└── PRIVACY_POLICY.md            # Privacy policy
```

## Usage

### For End Users

```javascript
// The dashboard handles everything automatically
// Just open dashboard.html and opt-in when prompted
```

### For Developers

```javascript
// Initialize service
const service = new AnalyticsService();
service.initialize();

// Set user consent
service.setUserConsent('user-id', 'tenant-id', true);

// Collect metrics
const metric = new UsageMetric('tenant-id', 'user-id', 'action', 100);
service.collectMetric(metric);

// Get statistics
const stats = service.getAggregatedStats('tenant-id');
```

## Testing

Run the test suite:

```bash
node tests/analytics.test.js
```

Expected output:
```
✓ AnalyticsService should initialize correctly
✓ Should set and check user consent
✓ Should collect metrics when user has consent
... (13 tests total)

Tests: 13, Passed: 13, Failed: 0
```

## Documentation

- [Complete Documentation](../../docs/ANALYTICS_DASHBOARD.md)
- [Privacy Policy](../../docs/PRIVACY_POLICY.md)

## Privacy & Security

- ✅ **Opt-in Only** - No data collected without consent
- ✅ **Local Storage** - All data stays in your browser
- ✅ **Full Control** - Delete your data anytime
- ✅ **No Third-Party Sharing** - Your data is yours
- ✅ **Transparent** - Open source and auditable

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ IE 11 (limited support)

## Dependencies

- [Chart.js](https://www.chartjs.org/) v3.9.1 - For data visualization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

Part of the main GitHub repository. See repository license.

## Support

- 📖 Read the [documentation](../../docs/ANALYTICS_DASHBOARD.md)
- 🐛 Report issues on GitHub
- 💬 Check troubleshooting section in docs
