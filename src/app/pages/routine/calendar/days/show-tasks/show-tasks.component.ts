import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  startDate: string;
  endDate: string;
}
@Component({
  selector: 'app-show-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.scss',
})
export class ShowTasksComponent {
  @Input() tasks: Task[] = [];
  @Input() scrolled: boolean = false;
  @Input() month: number = 0;
  @Input() year: number = 0;
  @Input() day: number = 0;

  @Output() dataEmitter = new EventEmitter<Task[]>();
  sendDataToDaysComponent() {
    this.dataEmitter.emit(this.tasks);
  }

  maxVisibleTasks = 2;

  get visibleTasks() {
    return this.tasks.slice(0, this.maxVisibleTasks);
  }

  get remainingTasks() {
    return this.tasks.length - this.maxVisibleTasks;
  }

  get showRemainingTasks() {
    return this.remainingTasks > 0;
  }

  isToday(day: number | null): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.month === today.getMonth() &&
      this.year === today.getFullYear()
    );
  }
}