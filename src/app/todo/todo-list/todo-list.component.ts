import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogService } from './../../shared/confirm-dialog.service';
import { SnackBarServiceService } from '../../services/snack-bar-service.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['Text', 'Complete', 'priority', 'dueDate', 'completeToggle', 'Operations'];
  todos: any[];
  error: any;
  todossSub: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource();
  loggedInUser : any;
  constructor(private titleService: Title, private snackBar: SnackBarServiceService,  private router : Router,  private dialogService: ConfirmDialogService, breakpointObserver: BreakpointObserver, private todoService: TodoService) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['Text', 'priority', 'Operations'] :
        ['Text', 'Complete', 'priority', 'dueDate', 'completeToggle', 'Operations'];
    });
  }


  ngOnInit(): void {
    this.titleService.setTitle('Todo List | Task');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.loggedInUser = JSON.parse(window.localStorage.getItem('user'));
    if(this.loggedInUser){
      this.loadTodos();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }else{
      this.router.navigateByUrl('/account/login');
      this.snackBar.openSnackBar(`Login to continue `, "OK");
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  handleClick(todo) {
    const options = {
      title: 'Are you sure you want to delete ?',
      message: 'Deleting this will permently remove record from database',
      cancelText: 'CANCEL',
      confirmText: 'YES, DELETE'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteTodo(todo);
      }
      if (!confirmed) {
        // IF CANCLE CLICK CODE GOES HERE
        console.log(`cancle clicked in dialog`);
      }
    });
  }
  handleUpdate(todo) {
    const options = {
      title: `Are you sure you want to change status to ${todo.complete ? 'Completed' : 'Pending'}?`,
      message: `This will change the status to completed ${todo.complete ? 'Completed' : 'Pending'}`,
      cancelText: 'CANCEL',
      confirmText: 'YES, UPDATE'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.update(todo);
      }
      if (!confirmed) {
        // IF CANCLE CLICK CODE GOES HERE
        console.log(`cancle clicked in dialog`);
      }
    });
  }
  loadTodos() {
    this.todos = this.todoService.getTodoList()
    this.dataSource.data = this.todos;
    this.dataSource.sort = this.sort;
  }

  // delete todo code
  deleteTodo(todo) {
    console.log(`delete ticket ${todo.text}`);
    this.todoService
      .deleteItem(todo)
    this.snackBar.openSnackBar(`Todo Deleted Sucessfully `, "OK");
    this.loadTodos();
  }
  // update todo
  update(todo){
    this.todoService.updateItem(todo, todo.complete);
    this.snackBar.openSnackBar(`Todo Updated Sucessfully `, "OK");
    this.loadTodos();
  }

  // filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} 
