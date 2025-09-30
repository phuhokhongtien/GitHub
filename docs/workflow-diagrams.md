# CI/CD Workflow Diagrams

This document provides visual representations of the CI/CD workflows.

## Overall CI/CD Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Developer Workflow                          │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Create Feature Branch   │
                    │  (feature/*)             │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Make Code Changes       │
                    │  Write Tests             │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Commit & Push           │
                    │  (Conventional Commits)  │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Create Pull Request     │
                    └──────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐    ┌──────────────────────┐
        │   Mobile CI/CD       │    │   Backend CI/CD      │
        │   (if mobile/*)      │    │   (if backend/*)     │
        └──────────────────────┘    └──────────────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   PR Checks & Review     │
                    │   ✓ All checks pass      │
                    │   ✓ Code reviewed        │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │   Merge to develop       │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │   Merge to main          │
                    └──────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐    ┌──────────────────────┐
        │  Backend Deployment  │    │  Create Release Tag  │
        │  (Automatic on main) │    │  (v1.0.0)           │
        └──────────────────────┘    └──────────────────────┘
                                               │
                                               ▼
                                ┌──────────────────────────┐
                                │  Mobile App Deployment   │
                                │  (iOS & Android)         │
                                └──────────────────────────┘
```

## Mobile CI Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Mobile CI Workflow                              │
│                     Trigger: PR/Push to main/develop (mobile/*)     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Job: Lint & Test    │      │  Job: Build Android  │
        ├──────────────────────┤      │  (depends on lint)   │
        │ • Checkout code      │      ├──────────────────────┤
        │ • Setup Node.js 18   │      │ • Checkout code      │
        │ • Install deps       │      │ • Setup Node.js 18   │
        │ • Run ESLint         │      │ • Setup Java 17      │
        │ • Run TypeScript     │      │ • Install deps       │
        │ • Run Jest tests     │      │ • Cache Gradle       │
        │ • Upload to Codecov  │      │ • Build APK          │
        └──────────────────────┘      │ • Upload artifact    │
                    │                 └──────────────────────┘
                    │                             │
                    │                             ▼
                    │              ┌──────────────────────┐
                    │              │  Job: Build iOS      │
                    │              │  (depends on lint)   │
                    │              ├──────────────────────┤
                    │              │ • Checkout code      │
                    │              │ • Setup Node.js 18   │
                    │              │ • Install deps       │
                    │              │ • Install CocoaPods  │
                    │              │ • Build iOS app      │
                    │              │ • Upload artifact    │
                    │              └──────────────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   All Jobs Complete      │
                    │   ✓ Status: Success      │
                    └──────────────────────────┘
```

## Backend CI Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Backend CI Workflow                             │
│                     Trigger: PR/Push to main/develop (backend/*)    │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Job: Lint & Test    │      │  Job: Build Docker   │
        ├──────────────────────┤      │  (depends on lint)   │
        │ • Checkout code      │      ├──────────────────────┤
        │ • Setup Node.js 18   │      │ • Checkout code      │
        │ • Install deps       │      │ • Setup Docker       │
        │ • Run ESLint         │      │ • Build image        │
        │ • Run TypeScript     │      │ • Cache layers       │
        │ • Run Jest tests     │      │ • Save artifact      │
        │ • Upload to Codecov  │      └──────────────────────┘
        └──────────────────────┘                  │
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │  Job: Integration Tests  │
                    │  (depends on build)      │
                    ├──────────────────────────┤
                    │ Services:                │
                    │ • PostgreSQL 15          │
                    │ • Redis 7                │
                    ├──────────────────────────┤
                    │ • Checkout code          │
                    │ • Setup Node.js 18       │
                    │ • Install deps           │
                    │ • Run integration tests  │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │   All Jobs Complete      │
                    │   ✓ Status: Success      │
                    └──────────────────────────┘
```

## CD Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CD Deployment Workflow                          │
│                     Trigger: Push to main OR Tag (v*)               │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Deploy Backend      │      │  Deploy Mobile       │
        │  (on: push to main)  │      │  (on: tag v*)        │
        ├──────────────────────┤      ├──────────────────────┤
        │ • Build Docker image │      │ Android:             │
        │ • Push to Docker Hub │      │ • Build signed AAB   │
        │ • Tag with version   │      │ • Upload to Play     │
        │ • SSH to server      │      │                      │
        │ • Pull new image     │      │ iOS:                 │
        │ • Restart containers │      │ • Build archive      │
        │ • Health check       │      │ • Export IPA         │
        └──────────────────────┘      │ • Upload TestFlight  │
                                      └──────────────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   Deployment Complete    │
                    │   ✓ Status: Success      │
                    └──────────────────────────┘
```

## PR Checks Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PR Checks Workflow                              │
│                     Trigger: Every Pull Request                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Job: PR Validation  │      │  Job: Detect Changes │
        ├──────────────────────┤      ├──────────────────────┤
        │ • Check PR title     │      │ • Check mobile/*     │
        │   (Conventional)     │      │ • Check backend/*    │
        │ • Check conflicts    │      │ • Check docs/*       │
        │ • Assign reviewers   │      │ • Post comment       │
        └──────────────────────┘      │   with analysis      │
                                      └──────────────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   Trigger Component CIs  │
                    │   Based on Changes       │
                    └──────────────────────────┘
```

## Dependency Management Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Dependency Updates Workflow                        │
│                  Trigger: Weekly (Mondays) OR Manual                │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Update Dependencies │      │  Security Audit      │
        ├──────────────────────┤      ├──────────────────────┤
        │ For each project:    │      │ For each project:    │
        │ • mobile             │      │ • mobile             │
        │ • backend            │      │ • backend            │
        ├──────────────────────┤      ├──────────────────────┤
        │ • Check outdated     │      │ • Run npm audit      │
        │ • Create issue if    │      │ • Check critical/    │
        │   updates found      │      │   high vulns         │
        │ • List packages      │      │ • Create issue if    │
        │   needing update     │      │   vulns found        │
        └──────────────────────┘      │ • Upload audit file  │
                                      └──────────────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   Issues Created         │
                    │   (if needed)            │
                    └──────────────────────────┘
```

## Coverage Reporting Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Test Coverage Flow                              │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Run Tests with Coverage │
                    │  (Jest --coverage)       │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Generate LCOV Report    │
                    │  (coverage/lcov.info)    │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Upload to Codecov       │
                    │  (with flags: mobile/    │
                    │   backend)               │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Codecov Analysis        │
                    │  • Calculate coverage    │
                    │  • Compare to target     │
                    │  • Check thresholds      │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  Post PR Comment         │
                    │  • Coverage %            │
                    │  • Coverage diff         │
                    │  • File-by-file breakdown│
                    └──────────────────────────┘
```

## Status Check Flow

```
Pull Request Created
        │
        ▼
┌───────────────────┐
│ Required Checks:  │
├───────────────────┤
│ ✓ PR title format │
│ ✓ No conflicts    │
│                   │
│ If mobile/* changed:
│ ✓ Lint & Test     │
│ ✓ Build Android   │
│ ✓ Build iOS       │
│                   │
│ If backend/* changed:
│ ✓ Lint & Test     │
│ ✓ Build Docker    │
│ ✓ Integration Tests
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ All checks pass?  │
└───────────────────┘
        │
        ├─── No ──▶ Fix issues & push
        │
        └─── Yes ──▶ Ready for review
                            │
                            ▼
                    Code Review
                            │
                            ▼
                    Approve & Merge
```

## Release Process Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Release Process                                 │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  1. Update Version       │
                    │  • package.json          │
                    │  • build.gradle          │
                    │  • Info.plist            │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  2. Update Changelog     │
                    │  • Add release notes     │
                    │  • Document changes      │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  3. Create PR to main    │
                    │  • All checks pass       │
                    │  • Code review           │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  4. Merge to main        │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  5. Create Tag           │
                    │  git tag v1.0.0          │
                    │  git push origin v1.0.0  │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  6. CD Pipeline Triggers │
                    │  • Backend deploys       │
                    │  • Mobile apps build     │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  7. Apps Published       │
                    │  • Google Play (internal)│
                    │  • TestFlight            │
                    └──────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │  8. Manual Promotion     │
                    │  • Test internal build   │
                    │  • Promote to production │
                    └──────────────────────────┘
```

## Legend

```
┌──────────┐
│   Box    │  = Process or Action
└──────────┘

    ▼        = Flow Direction

├─── Yes    = Decision Branch

Services:   = External Dependencies
```

## Visual Summary

The CI/CD pipeline provides:

1. **Automated Testing**: Every PR is tested automatically
2. **Build Verification**: Apps are built to catch build issues early
3. **Quality Gates**: Multiple checks ensure code quality
4. **Automated Deployment**: Push to main = deploy to production
5. **Release Automation**: Tag-based releases for mobile apps
6. **Security**: Automated dependency audits
7. **Coverage Tracking**: Test coverage monitored and reported

All workflows are designed to provide fast feedback while maintaining high quality standards.
