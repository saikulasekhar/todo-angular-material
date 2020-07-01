import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    runGuardsAndResolvers: 'always',
    children: [
      { path: '',   redirectTo: 'list', pathMatch: 'full', runGuardsAndResolvers: 'always'},
      { path: 'list',  component: TodoListComponent, runGuardsAndResolvers: 'always'},
      { path: 'new',  component: TodoAddComponent, runGuardsAndResolvers: 'always'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
