# Task Scheduling Examples

This document provides practical examples of using the task scheduling system.

## Example 1: Schedule a Deployment

When you want to deploy a feature but don't have enough premium quota right now:

```bash
python task_processor.py add "Deploy Feature X" '{"branch": "feature-x", "environment": "production"}'
```

Output:
```
Task 'Deploy Feature X' added. Scheduled for: 2025-10-01T04:00:00.000000+00:00
```

The task will automatically be processed 10 hours later.

## Example 2: Schedule Multiple Related Tasks

You can schedule multiple tasks that will all be processed after the delay period:

```bash
# Schedule build task
python task_processor.py add "Build Application" '{"version": "2.0.1", "target": "release"}'

# Schedule test task
python task_processor.py add "Run Test Suite" '{"suite": "integration", "parallel": true}'

# Schedule deployment
python task_processor.py add "Deploy to Staging" '{"environment": "staging", "version": "2.0.1"}'
```

## Example 3: Check Task Status

List all pending tasks:

```bash
python task_processor.py list pending
```

List all tasks (including completed):

```bash
python task_processor.py list
```

## Example 4: Manual Processing

If you need to manually trigger task processing (normally handled by GitHub Actions):

```bash
python task_processor.py process
```

Output:
```
Task 'Deploy Feature X' scheduled in 9:45:23
Processed 0 task(s).
```

## Example 5: Simple Task with Description

For simple tasks, you can just provide a description:

```bash
python task_processor.py add "Review Pull Requests" "Check and merge pending PRs"
```

## Example 6: Change Delay Period

Edit `config.json` to change the delay period:

```json
{
  "delay_hours": 12,
  "description": "Configuration for task scheduling"
}
```

Now all new tasks will be scheduled 12 hours from now instead of 10.

## Example 7: Using with GitHub Actions

The workflow runs automatically every hour, but you can trigger it manually:

1. Go to the Actions tab in your GitHub repository
2. Select "Scheduled Task Processor"
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Task Data Structure

Tasks are stored with the following structure in `tasks.json`:

```json
{
  "name": "Task Name",
  "created_at": "2025-09-30T18:00:00+00:00",
  "scheduled_for": "2025-10-01T04:00:00+00:00",
  "status": "pending",
  "data": {
    "custom": "data",
    "goes": "here"
  }
}
```

## Automatic Cleanup

Completed tasks older than 7 days are automatically removed when processing runs.

## Best Practices

1. **Use Descriptive Names**: Make task names clear and meaningful
2. **Include Relevant Data**: Add all necessary information in the task data
3. **Check Status Regularly**: Use `list` command to monitor pending tasks
4. **Plan Ahead**: Remember tasks have a 10-hour delay by default
5. **Document Task Types**: Keep track of what different task types mean for your workflow
