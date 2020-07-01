import { Injectable, IterableDiffers } from '@angular/core';
import { Todo } from './todo';
import { StorageService } from '../services/storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {category: 'feature-request', text :'This will there from starting', priority: 1, complete : false, dueDate: new Date()},
];

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private todoList: Todo[];


  constructor(private storageService: StorageService) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  getTodoList() {
    return this.todoList;
  }

  addItem(item: Todo  ) {
    console.log(`${item} received`);
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: Todo, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: Todo) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  check(item : Todo){
    console.log(item);
  }
}
