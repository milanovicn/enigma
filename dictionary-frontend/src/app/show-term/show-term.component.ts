import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermDTO } from '../_shared/dto/TermDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-show-term',
  templateUrl: './show-term.component.html',
  styleUrls: ['./show-term.component.css']
})
export class ShowTermComponent implements OnInit {
  height: number
  term: TermDTO
  constructor(private router: Router, private appService: AppService) {
    this.getUser()
  }

  ngOnInit(): void {
    this.onWindowResize()
    this.term = JSON.parse(localStorage.getItem('picked_term'));
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowResize(){
    this.height = Number(document.getElementById("top-container")?.offsetHeight);
    document.getElementById("content").style.marginTop = (this.height) + "px";
    document.getElementById("content").style.minHeight = window.innerHeight - this.height + "px";
  }

  NavigateToAddTerm(){
    this.router.navigate(['/add-term'])
  }

  NavigateToAddTag(){
    this.router.navigate(['/add-tag'])
  }

  getUser() {
    this.appService.getSession().subscribe(
      result => {},
      error => this.router.navigate(['/login-page']),
    );
  }
}
