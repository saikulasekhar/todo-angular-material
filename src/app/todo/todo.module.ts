import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';


@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoAddComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TodoRoutingModule,
    CustomMaterialModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class TodoModule { }
