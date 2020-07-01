import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { SnackBarServiceService } from '../../services/snack-bar-service.service';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  loggedInUser : any;
  submitted: boolean = false;
  disableButton = false;
  // newTicket: any;
  description: any;
  error: any;
  ticketsSub: Subscription;
  minDate = new Date();
  list : any[];
  newTodo: Todo = {
    category: "",
    priority : "",
    text: "",
    complete: false,
    dueDate: new Date(),
  }

  ticketTypes: any = [
    {
      value: 'grocery',
      text: 'Grocery'
    },
    {
      value: 'office-work',
      text: 'Office Work'
    },
    {
      value: 'insurance',
      text: 'Insurance'
    },
    {
      value: 'issue',
      text: 'Issue'
    }
  ];
  priorities: any = [
    {
      value: 1,
      text: 1
    },
    {
      value: 2,
      text: 2
    },
    {
      value: 3,
      text: 3
    },
    {
      value: 4,
      text: 4
    },
    {
      value: 5,
      text: 5
    },
  ];
  constructor(private sanckBarServiceService : SnackBarServiceService, private router : Router, private todoService : TodoService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Todo Add | Task');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.loggedInUser = JSON.parse(window.localStorage.getItem('user'));
    if(this.loggedInUser){
      console.log("user logged in");
    }else{
      this.router.navigateByUrl('/account/login');
      this.sanckBarServiceService.openSnackBar(`Login to continue `, "OK");
    }
  }

  onContentChanged(editor) {
    this.newTodo.text = editor.html;
  }
  onSubmit() {
    this.submitted = true;
    this.disableButton = true;
    this.todoService.addItem(this.newTodo);
    this.sanckBarServiceService.openSnackBar(`Todo added sucessfully...`, "Close");
    this.router.navigateByUrl('/todos/list')
  }

}
