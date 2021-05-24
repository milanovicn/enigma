import { error } from '@angular/compiler/src/util';
import { Component, HostListener, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TagDTO } from './_shared/dto/TagDTO';
import { TeamDTO } from './_shared/dto/TeamDTO';
import { TermDTO } from './_shared/dto/TermDTO';
import { UserDTO } from './_shared/dto/UserDTO';
import { AppService } from './_shared/services/appService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FIS-Dictionary';
  request: Request;

  constructor(private router: Router, private appService:AppService) {}
  ngOnInit() {
    this.appService.getSession().subscribe(
      {
        next: user => {
          console.log("Current user is " + user.name)
          this.router.navigate(['/start-page'])
        },
        error: error => {
          this.router.navigate(['/login-page'])
        }
      }
    );
  }


  SignOut(){
    // session ??
    this.appService.getSession().subscribe({
      next: user => {
        console.log("User " + user.name + " is logging out...")
        this.appService.logout(this.request).subscribe(
          result => this.router.navigate(['/login-page']),
          error => this.router.navigate(['/login-page'])
        );
      }
    });

  }

  Show(t){
    // disable logout at the login page ...
    if (document.getElementsByTagName('body')[0].firstChild.nextSibling.childNodes[2].nodeName == "APP-LOGIN-PAGE")
      return false
    return true
  }
}
