# GitHub
Out-Sourcing

## Task Scheduling System

This repository implements a task scheduling system with a 10-hour delay to manage premium quota limitations.

### Overview

When premium quota is limited, tasks can be queued and automatically processed 10 hours later. This helps distribute workload and manage resource constraints effectively.

### Features

- **Configurable Delay**: Default 10-hour delay (configurable in `config.json`)
- **Automatic Processing**: GitHub Actions workflow runs hourly to process pending tasks
- **Task Management**: Add, list, and process tasks via command-line interface
- **Auto Cleanup**: Automatically removes completed tasks older than 7 days

### Usage

#### Adding Tasks

Add a new task that will be processed 10 hours later:

```bash
python task_processor.py add "Task Name" '{"key": "value"}'
```

Or with a simple description:

```bash
python task_processor.py add "Task Name" "Simple description"
```

#### Listing Tasks

List all tasks:

```bash
python task_processor.py list
```

List only pending tasks:

```bash
python task_processor.py list pending
```

#### Processing Tasks

Process all tasks that are due (automatically run by GitHub Actions):

```bash
python task_processor.py process
```

Or simply:

```bash
python task_processor.py
```

### Configuration

Edit `config.json` to change the delay:

```json
{
  "delay_hours": 10,
  "description": "Configuration for task scheduling"
}
```

### Automated Processing

The GitHub Actions workflow (`.github/workflows/scheduled-tasks.yml`) automatically runs every hour to process pending tasks. You can also trigger it manually from the Actions tab.

### Files

- `task_processor.py`: Main task processing script
- `tasks.json`: Task queue storage
- `config.json`: Configuration settings
- `.github/workflows/scheduled-tasks.yml`: Automated processing workflow

### Example Workflow

1. Add a task: `python task_processor.py add "Deploy Feature X" '{"branch": "feature-x"}'`
2. Task is scheduled for 10 hours later
3. GitHub Actions automatically processes the task when the delay period expires
4. Completed tasks are cleaned up after 7 days
