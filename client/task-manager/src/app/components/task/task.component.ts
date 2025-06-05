import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  };
  currentPage: number = 1;
  totalPages: number = 1;
  
  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.loadTasksWithPager(this.totalPages);
  }

  // loadTasks() {
  //   this.taskService.getTasks().subscribe((data) => {
  //     this.tasks = data;
  //   });
  // }

  loadTasksWithPager(page: number): void {
    console.log(page)
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    console.log(this.currentPage)
    this.taskService.getAllTasksWithPager(this.currentPage).subscribe(response => {
      this.tasks = response.data;
      this.totalPages = response.totalPages;
    })
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = {
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      };
      this.loadTasksWithPager(this.totalPages);
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
  
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
