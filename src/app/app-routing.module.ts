import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path :'', redirectTo : 'account/login', pathMatch: 'full' , runGuardsAndResolvers: 'always'
  },
  {
    path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash : true,
    enableTracing : false,
    onSameUrlNavigation : 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
