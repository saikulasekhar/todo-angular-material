import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../material.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [AccountComponent, LoginComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ]
})
export class AccountModule { }
