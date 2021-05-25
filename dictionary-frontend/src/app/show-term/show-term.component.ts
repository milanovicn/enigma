import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '../modal';
import { TermDTO } from '../_shared/dto/TermDTO';
import { UserDTO } from '../_shared/dto/UserDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-show-term',
  templateUrl: './show-term.component.html',
  styleUrls: ['./show-term.component.css']
})
export class ShowTermComponent implements OnInit {
  height: number
  term: TermDTO
  user: UserDTO
  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit(): void {
    window.scrollTo({top:1})
    this.onWindowResize()
    this.term = JSON.parse(localStorage.getItem('picked_term'));
    console.log(this.term)
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowResize(){
    this.height = Number(document.getElementById("top-container")?.offsetHeight);
    document.getElementById("content").style.marginTop = (this.height) + "px";
    document.getElementById("content").style.minHeight = window.innerHeight - this.height + "px";
  }

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == document.getElementById("myModal") || event.target == document.getElementById("closeId")){
      Modal.removeModal()
      this.router.navigate(['/start-page'])
    }
  }

  NavigateToAddTerm(){
    localStorage.setItem('term_for_update', JSON.stringify(null))
    this.router.navigate(['/add-term'])
  }

  NavigateToAddTag(){
    this.router.navigate(['/add-tag'])
  }

  getUser() {
    this.appService.getSession().subscribe(
      {
        next: user => {
            this.user = user
            console.log(user)
        },
        error: error => {
          this.router.navigate(['/login-page'])
        }
      }
    );
  }

  updateTerm(){
    localStorage.setItem('term_for_update', JSON.stringify(this.term))
    this.router.navigate(['add-term'])
  }

  deleteTerm(){
    this.appService.deleteTerm(this.term).subscribe(
      {
        next: data => {
            Modal.insertModal("Term is deleted!")
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
      }
    )
  }

  parseLink(l: string) {
    let index = l.indexOf("https://")
    if (index == 0) index = 8
    else if (l.indexOf("http://") == 0) index = 7
    else index = 0
    l = l.substr(index)
    index = l.indexOf("/")
    return (<string>l).substr(0, index > 0 ? index : l.length)
  }

}

