import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    runGuardsAndResolvers: 'always',
    children: [
      { path: '',   redirectTo: 'login', pathMatch: 'full', runGuardsAndResolvers: 'always'},
      { path: 'login',  component: LoginComponent, runGuardsAndResolvers: 'always' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
