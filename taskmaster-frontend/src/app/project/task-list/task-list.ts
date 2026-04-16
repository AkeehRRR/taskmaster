import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../task.service';
import { TaskForm } from '../task-form/task-form';
import { ChangeDetectorRef } from '@angular/core';
import { empty } from 'rxjs';


const emptyTask: Task = {

  name: '',
  description: '',
  dueDate: new Date(),
  completed: false,
  project: 0,
  id: 0
};

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks: Task[] = [];
  showModal: boolean = false;
  selectedTask: Task = emptyTask;
  formType: "CREATE" | "UPDATE" = "CREATE";

  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);


  constructor() {
    this.loadTasks();
  }

   loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.cdr.detectChanges();
    });
}

  handlecheckbox(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;

    const updatedTask = {
      ...this.tasks[taskIndex],
      completed: !this.tasks[taskIndex].completed,
    };

    this.taskService.updateTask(updatedTask).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.updateTask(emptyTask));
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = "UPDATE";
    this.showModal = true;
  }
  

  openCreateModal() {
  this.selectedTask = emptyTask;
  this.formType = 'CREATE';
  this.showModal = true;
}

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
  if (type === 'SUBMIT') {
    this.updateTask (this.selectedTask);
  }
  this.showModal = false;
  }
}
