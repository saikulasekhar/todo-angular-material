import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  LoggedInuser : any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,  private router : Router, @Inject(DOCUMENT) private document: Document) {}
    
  ngOnInit(): void {
    this.LoggedInuser = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.LoggedInuser);
  }
  ngOnChanges(){
    this.LoggedInuser = JSON.parse(window.localStorage.getItem('user'));
  }
  logOut(){
    window.localStorage.removeItem('user');
    this.LoggedInuser = {};
    this.router.navigateByUrl('/account/login');
    this.reload();
  }
  reload(){ this.document.location.reload(); }
}
