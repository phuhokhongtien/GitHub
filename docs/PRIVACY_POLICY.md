# Privacy Policy - Analytics Dashboard

**Last Updated:** 2025

## Introduction

This Privacy Policy explains how our Analytics Dashboard collects, uses, stores, and protects your data. We are committed to transparency and giving you control over your information.

## User Consent and Opt-In

### Voluntary Participation
- Analytics collection is **entirely optional**
- You must explicitly opt-in to enable data collection
- You can opt-out at any time without any penalties
- Opting out does not affect your ability to use the application

### How to Opt-In
1. When you first visit the Analytics Dashboard, you'll see a privacy banner
2. Click "Enable Analytics" to consent to data collection
3. Your preference is saved locally in your browser

### How to Opt-Out
1. Click "Disable" on the privacy banner, or
2. Clear your browser's localStorage, or
3. Use the dashboard settings to disable analytics

## Data We Collect

We only collect data when you have explicitly opted in. The following types of data are collected:

### 1. Usage Metrics
- **What:** Actions you perform in the application
- **Purpose:** Understand feature usage and improve user experience
- **Examples:** Button clicks, page views, feature interactions
- **Data Included:** Action name, timestamp, duration, metadata

### 2. Voice Command Statistics
- **What:** Voice commands you issue and their results
- **Purpose:** Improve voice recognition accuracy and response times
- **Examples:** "play", "pause", "next", "search"
- **Data Included:** Command text, success/failure status, response time
- **Data NOT Included:** Audio recordings, voice biometrics

### 3. Server Connectivity Metrics
- **What:** Network requests and their performance
- **Purpose:** Monitor system reliability and performance
- **Examples:** API calls, data fetches, uploads
- **Data Included:** Endpoint URL, status code, latency, timestamp

### 4. Error Information
- **What:** Errors and exceptions that occur
- **Purpose:** Identify and fix bugs, improve stability
- **Examples:** Network errors, validation errors, system errors
- **Data Included:** Error type, error message, severity level, timestamp
- **Data NOT Included:** Sensitive user data in stack traces

### Metadata
For all metrics, we collect:
- Tenant ID (organization identifier)
- User ID (your unique identifier)
- Timestamp (when the event occurred)

## What We Do NOT Collect

We explicitly do NOT collect:
- ❌ Passwords or authentication credentials
- ❌ Personal identifiable information (PII) beyond user/tenant IDs
- ❌ Voice recordings or audio data
- ❌ File contents or document data
- ❌ Credit card or payment information
- ❌ Location data
- ❌ Browser fingerprints or tracking cookies
- ❌ Data from other websites or applications

## How We Use Your Data

### Primary Uses
1. **Application Improvement**
   - Identify which features are used most frequently
   - Discover features that need improvement
   - Optimize performance based on usage patterns

2. **Performance Monitoring**
   - Track system response times
   - Monitor server connectivity and reliability
   - Identify performance bottlenecks

3. **Error Detection and Resolution**
   - Identify bugs and errors quickly
   - Prioritize fixes based on error severity and frequency
   - Improve overall system stability

4. **Analytics and Insights**
   - Generate aggregated statistics for administrators
   - Provide actionable insights for system optimization
   - Create reports on system health and usage trends

### We Do NOT
- ❌ Sell your data to third parties
- ❌ Use data for advertising or marketing
- ❌ Share data outside your organization (tenant)
- ❌ Use data for purposes other than those stated

## Data Storage and Security

### Local Storage
- **All data is stored locally** in your browser's localStorage
- Data never leaves your device by default
- You have complete control over the stored data

### Security Measures
- Data is only accessible from the same origin (domain)
- Browser's built-in security mechanisms protect the data
- No data transmission to external servers (by default)
- No third-party tracking or cookies

### Data Access
- Only you and administrators in your tenant can access the data
- Access is controlled through the application's authentication system
- Data is segregated by tenant to ensure privacy

## Data Retention and Deletion

### Retention Period
- Data is retained in localStorage indefinitely unless deleted
- Organizations should implement their own retention policies
- Administrators can configure automatic data cleanup

### User Rights to Delete
You can delete your analytics data at any time:

1. **Clear Individual Data:**
   ```javascript
   // Through the console
   analyticsService.clearAllData();
   ```

2. **Clear Browser Storage:**
   - Go to browser settings
   - Clear site data or localStorage
   - This removes all analytics data

3. **Disable and Clear:**
   - Opt-out of analytics
   - Request administrator to clear your data
   - Data will be removed from the system

## Your Rights

### Right to Access
- View all collected data in the dashboard
- Export your data in JSON format
- Understand what data is being collected

### Right to Rectification
- Request correction of inaccurate data
- Update your preferences and settings
- Modify consent status

### Right to Erasure
- Delete all your analytics data at any time
- Request complete removal from the system
- Clear data without affecting application functionality

### Right to Data Portability
- Export your data in a machine-readable format (JSON)
- Transfer data between systems if needed
- Maintain control over your information

### Right to Object
- Opt-out of analytics collection
- Refuse consent without consequences
- Use the application without analytics enabled

### Right to Information
- Be informed about data collection practices
- Understand how data is used
- Access this privacy policy at any time

## Multi-Tenant Privacy

### Tenant Isolation
- Data is segregated by tenant ID
- Users can only see data from their own tenant
- Cross-tenant data access is prevented

### Administrator Access
- Tenant administrators can view aggregated data for their tenant
- Individual user data is accessible only with proper permissions
- Audit trails track administrative access

## Third-Party Services

### Chart.js Library
The dashboard uses Chart.js from CDN for data visualization:
- **Purpose:** Render charts and graphs
- **Data Sharing:** No analytics data is sent to Chart.js
- **Privacy:** Chart.js only processes data locally in your browser
- **CDN:** `cdn.jsdelivr.net`

### No Other Third Parties
- We do not use any other third-party analytics services
- No data is sent to external servers
- No tracking pixels or cookies from third parties

## Cookies and Local Storage

### Cookies
- **We do not use cookies** for analytics tracking

### Local Storage
- We use browser localStorage to:
  - Store analytics metrics
  - Save user consent preferences
  - Cache dashboard state
- You can clear localStorage at any time through browser settings

## Changes to This Privacy Policy

### Notification of Changes
- We will update the "Last Updated" date when changes are made
- Significant changes will be communicated through the dashboard
- Continued use after changes implies acceptance

### Your Options
- Review the updated policy
- Opt-out if you disagree with changes
- Contact us with questions or concerns

## Children's Privacy

This analytics system is not designed for or directed at children under 13. We do not knowingly collect data from children. If you become aware that a child has provided us with data, please contact the administrator to have it removed.

## Compliance

### GDPR Compliance (for EU users)
- Legal basis: Consent
- Data subject rights fully supported
- Data portability enabled
- Right to erasure implemented

### CCPA Compliance (for California users)
- Right to know what data is collected
- Right to delete data
- Right to opt-out
- No sale of personal information

## Contact and Data Protection

### Questions or Concerns
For privacy-related questions or to exercise your rights:
- Contact your tenant administrator
- Open an issue on the GitHub repository
- Review the documentation for self-service options

### Data Protection Officer
Organizations using this system should designate a Data Protection Officer (DPO) if required by applicable laws.

## Transparency Commitment

We are committed to transparency in our data practices:
- ✅ All code is open source and auditable
- ✅ Clear documentation of data collection
- ✅ User control over data at all times
- ✅ No hidden data collection
- ✅ Regular updates to privacy practices

## Automated Decision-Making

We do NOT use your analytics data for:
- Automated decision-making
- Profiling
- Algorithmic assessments
- Decisions that significantly affect you

The data is used only for aggregate statistics and system improvement.

## International Data Transfers

Since all data is stored locally in your browser:
- No international data transfers occur by default
- Data remains in your jurisdiction
- No cross-border data sharing
- Compliance with local data residency requirements

## Security Breach Notification

In the unlikely event of a security breach affecting analytics data:
- Users will be notified promptly
- Nature of the breach will be explained
- Steps to protect yourself will be provided
- Remediation measures will be implemented

## Conclusion

Your privacy is important to us. By making analytics opt-in, storing data locally, and providing full transparency, we ensure you maintain control over your information.

If you have any questions about this Privacy Policy or our data practices, please:
- Review the Analytics Dashboard documentation
- Contact your system administrator
- Open an issue on GitHub for general questions

**Remember:** You can always opt-out of analytics without affecting your ability to use the application.

---

**Last Updated:** September 30, 2025  
**Version:** 1.0  
**Effective Date:** September 30, 2025
