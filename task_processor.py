#!/usr/bin/env python3
"""
Task Processor with 10-hour delay for premium quota management.

This script processes tasks that were scheduled with a 10-hour delay
to manage premium quota limitations.
"""

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Default delay in hours
DEFAULT_DELAY_HOURS = 10


class TaskProcessor:
    """Process tasks with configurable delay."""
    
    def __init__(self, tasks_file='tasks.json', config_file='config.json'):
        self.tasks_file = Path(tasks_file)
        self.config_file = Path(config_file)
        self.delay_hours = DEFAULT_DELAY_HOURS
        self.load_config()
        
    def load_config(self):
        """Load configuration from config file."""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r') as f:
                    config = json.load(f)
                    self.delay_hours = config.get('delay_hours', DEFAULT_DELAY_HOURS)
            except Exception as e:
                print(f"Warning: Could not load config: {e}")
                print(f"Using default delay: {self.delay_hours} hours")
    
    def load_tasks(self):
        """Load tasks from JSON file."""
        if not self.tasks_file.exists():
            return []
        
        try:
            with open(self.tasks_file, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading tasks: {e}")
            return []
    
    def save_tasks(self, tasks):
        """Save tasks to JSON file."""
        try:
            with open(self.tasks_file, 'w') as f:
                json.dump(tasks, f, indent=2)
        except Exception as e:
            print(f"Error saving tasks: {e}")
    
    def add_task(self, task_name, task_data=None):
        """Add a new task with current timestamp."""
        tasks = self.load_tasks()
        
        now = datetime.now(timezone.utc)
        new_task = {
            'name': task_name,
            'created_at': now.isoformat(),
            'scheduled_for': (now + timedelta(hours=self.delay_hours)).isoformat(),
            'status': 'pending',
            'data': task_data or {}
        }
        
        tasks.append(new_task)
        self.save_tasks(tasks)
        print(f"Task '{task_name}' added. Scheduled for: {new_task['scheduled_for']}")
        return new_task
    
    def process_tasks(self):
        """Process tasks that are due to run."""
        tasks = self.load_tasks()
        
        if not tasks:
            print("No tasks to process.")
            return
        
        now = datetime.now(timezone.utc)
        processed_count = 0
        
        for task in tasks:
            if task['status'] != 'pending':
                continue
                
            scheduled_time = datetime.fromisoformat(task['scheduled_for'])
            # Ensure scheduled_time is timezone-aware
            if scheduled_time.tzinfo is None:
                scheduled_time = scheduled_time.replace(tzinfo=timezone.utc)
            
            if now >= scheduled_time:
                print(f"Processing task: {task['name']}")
                self._execute_task(task)
                task['status'] = 'completed'
                task['completed_at'] = now.isoformat()
                processed_count += 1
            else:
                time_remaining = scheduled_time - now
                print(f"Task '{task['name']}' scheduled in {time_remaining}")
        
        self.save_tasks(tasks)
        print(f"\nProcessed {processed_count} task(s).")
        
        # Clean up old completed tasks (older than 7 days)
        self.cleanup_old_tasks(tasks)
    
    def _execute_task(self, task):
        """Execute a specific task."""
        # This is where you would implement the actual task execution
        # For now, just log the task
        print(f"  - Task name: {task['name']}")
        print(f"  - Created: {task['created_at']}")
        print(f"  - Data: {json.dumps(task['data'], indent=4)}")
        
    def cleanup_old_tasks(self, tasks):
        """Remove completed tasks older than 7 days."""
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=7)
        
        original_count = len(tasks)
        tasks[:] = [
            task for task in tasks
            if task['status'] == 'pending' or
            (task.get('completed_at') and 
             self._parse_datetime(task['completed_at']) >= cutoff_date)
        ]
        
        removed_count = original_count - len(tasks)
        if removed_count > 0:
            print(f"Cleaned up {removed_count} old task(s).")
            self.save_tasks(tasks)
    
    def _parse_datetime(self, dt_string):
        """Parse datetime string and ensure it's timezone-aware."""
        dt = datetime.fromisoformat(dt_string)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    
    def list_tasks(self, status_filter=None):
        """List all tasks, optionally filtered by status."""
        tasks = self.load_tasks()
        
        if not tasks:
            print("No tasks found.")
            return
        
        filtered_tasks = tasks
        if status_filter:
            filtered_tasks = [t for t in tasks if t['status'] == status_filter]
        
        print(f"\n{'='*80}")
        print(f"Tasks (showing {len(filtered_tasks)} of {len(tasks)})")
        print(f"{'='*80}\n")
        
        for i, task in enumerate(filtered_tasks, 1):
            print(f"{i}. {task['name']}")
            print(f"   Status: {task['status']}")
            print(f"   Created: {task['created_at']}")
            print(f"   Scheduled for: {task['scheduled_for']}")
            if task.get('completed_at'):
                print(f"   Completed: {task['completed_at']}")
            print()


def main():
    """Main entry point."""
    import sys
    
    processor = TaskProcessor()
    
    if len(sys.argv) < 2:
        # Default action: process pending tasks
        print("Processing pending tasks...")
        processor.process_tasks()
    else:
        command = sys.argv[1]
        
        if command == 'add' and len(sys.argv) >= 3:
            task_name = sys.argv[2]
            task_data = {}
            if len(sys.argv) >= 4:
                try:
                    task_data = json.loads(sys.argv[3])
                except json.JSONDecodeError:
                    task_data = {'description': sys.argv[3]}
            processor.add_task(task_name, task_data)
            
        elif command == 'list':
            status = sys.argv[2] if len(sys.argv) >= 3 else None
            processor.list_tasks(status)
            
        elif command == 'process':
            processor.process_tasks()
            
        else:
            print("Usage:")
            print("  python task_processor.py                    # Process pending tasks")
            print("  python task_processor.py add <name> [data]  # Add new task")
            print("  python task_processor.py list [status]      # List tasks")
            print("  python task_processor.py process            # Process tasks")


if __name__ == '__main__':
    main()
