import { Component, OnInit, Inject } from '@angular/core';
import { SnackBarServiceService } from '../../services/snack-bar-service.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

interface User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
  };
  validUser = "sekhar@gmail.com";
  validPassword = "Sekhar123456#"
  errors : any;
  hide = true;
  message;
  loading
  constructor(private snackBar: SnackBarServiceService, private router : Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }
  login() {
    this.message = 'Trying to log in ...';
    this.loading = true;
    if(this.user.email == this.validUser && this.user.password == this.validPassword){
      this.setLocaldata();
      this.snackBar.openSnackBar(`Logged in sucessfully...`, "Ok");
    }
  }
  setLocaldata(){
    console.log("valid");
    localStorage.setItem("user",JSON.stringify(this.user));
    this.router.navigateByUrl('/todos/list');
  }
  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl('/account/login');
    this.reload();
  }

  reload(){ this.document.location.reload(); }
}
