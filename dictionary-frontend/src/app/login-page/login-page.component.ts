import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '../modal';
import { LoginRequest } from '../_shared/dto/LoginRequest';
import { TagDTO } from '../_shared/dto/TagDTO';
import { TeamDTO } from '../_shared/dto/TeamDTO';
import { UserDTO } from '../_shared/dto/UserDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;

  loginRequest: LoginRequest;
  respBool: boolean = false;
  user: UserDTO;
  response: Response;

  constructor(private router: Router, private appService:AppService) {
    this.loginRequest = new LoginRequest();
  }

  ngOnInit(): void {
    this.onWindowResize()
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowResize(){
    document.getElementById("content").style.minHeight = window.innerHeight - 90 + "px";
  }

  SignIn(){
    if (!this.password || !this.username){
      return
    }
    this.loginRequest.credentials = this.username;
    this.loginRequest.password = this.password;

    this.respBool = false;
    this.appService.login(this.loginRequest).subscribe(
      result => {
        this.getUser()

      },
      err => this.alertError()
    );

  }

  alertError(){
    Modal.insertModal("Wrong credentials! Try again")
  }

  getUser() {
    this.appService.getSession().subscribe({
      next: user => {
        this.user = user;
        console.log(this.user);
        localStorage.setItem("user", JSON.stringify(this.user))
        this.router.navigate(['/start-page'])
      }
    });
  }

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == document.getElementById("myModal") || event.target == document.getElementById("closeId")){
      Modal.removeModal()
    }
  }


}
