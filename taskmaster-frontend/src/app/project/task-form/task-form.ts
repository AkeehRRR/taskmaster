import { Component, EventEmitter, inject, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
  
@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Input() currentTask: Task | null = null;
  @Input() formType: "CREATE" | "UPDATE" = "CREATE";
  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();
  taskForm: FormGroup

  private taskService = inject(TaskService);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name : ['', Validators.required],
      description : [''],
      dueDate : ['', Validators.required],
      id: [0],
      project: ['0']
    })
  }

  handleSubmit() {
  if (this.taskForm.valid) {
    const { id, ...formValue } = this.taskForm.value;

    const newTask: Task = {
      ...(this.formType === 'UPDATE' ? { id } : {}),
      ...formValue,
      dueDate: new Date(formValue.dueDate),
      completed: this.formType === 'UPDATE' ? this.taskForm.value.completed : false,
    };

    if (this.formType === 'CREATE') {
      this.taskService.addTask(newTask).subscribe(() => {
        this.closePanel.emit('SUBMIT');
      });
    } else {
      this.taskService.updateTask(newTask).subscribe(() => {
        this.closePanel.emit('SUBMIT');
      });
    }
  }
}

handleCancel() {
  this.closePanel.emit('CANCEL');
}

    ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTask'] && changes['currentTask'].currentValue) {
      const task = changes['currentTask'].currentValue as Task;

      const dueDateFormatted = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      this.taskForm.patchValue({
        ...task,
        dueDate: dueDateFormatted,
      });
    }
  }


}