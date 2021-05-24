import { HttpResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagDTO } from '../_shared/dto/TagDTO';
import { TeamDTO } from '../_shared/dto/TeamDTO';
import { TermDTO } from '../_shared/dto/TermDTO';
import { UserDTO } from '../_shared/dto/UserDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.css']
})
export class AddTermComponent implements OnInit {
  height: number
  term_name: string
  short_description: string
  detail_description: string
  tag_checked: Array<boolean>   // tagID
  tag_val: Array<TagDTO>   // tagID
  team: TeamDTO    // teamID
  tags: Array<TagDTO>

  term: TermDTO
  user: UserDTO

  constructor(private router: Router, private appService: AppService) {
    this.tag_val = new Array<TagDTO>()
    this.tags = new Array<TagDTO>()
  }

  ngOnInit() {
    this.loadTags()
    this.onWindowResize()
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowResize(){
    this.height = Number(document.getElementById("top-container")?.offsetHeight);
    document.getElementById("content").style.marginTop = (this.height) + "px";
    document.getElementById("content").style.minHeight = window.innerHeight - this.height + "px";
  }

  SaveItem(){
    for(let v = 0; v < this.tag_val.length; v++){
      console.log(this.tag_val[v].name)
    }
    if (!this.term_name || !this.detail_description || !this.short_description || this.tag_val.length == 0){
      return // all fields are required
    }

    this.submitTerm()

  }

  changeSelection(i) {
    this.tag_checked[i] = !this.tag_checked[i]
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.tag_val = this.tags.filter((value, index) => {
      if(this.tag_checked[index]) return value
    });
  }


  alertError(){
    alert("Wrong credentials! Try again")
  }

  alertSuccess() {
    alert("Term added!")
    this.router.navigate(['/start-page'])
  }

  submitTerm() {
    this.appService.getSession().subscribe({
      next: user => {
          this.user = user;
          console.log("User " + user.name + " is adding term...")
          this.createNewTerm();
      }
    });
  }

  getUser(){
    this.appService.getSession().subscribe(
      result => {},
      error => this.router.navigate(['/login-page'])
    );
  }

  createNewTerm() {
    this.term = new TermDTO(this.term_name, this.short_description, this.detail_description, -1, this.user.team, this.tag_val)

    console.log(JSON.stringify(this.term).toString())

    let responseMess;

    this.appService.createTerm(this.term).subscribe(
      {
        next: data => {
            if (data["response"] == "Term saved successfully"){
              alert(data["response"])
              this.router.navigate(['/start-page'])
            }
            else if (data["response"] == "Term wasn't saved"){
              alert(data["response"])
            }
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
    }
    );
  }

  loadTags(){
    this.appService.getTags().subscribe({
      next: tags => {
        this.tags = tags;
        this.tag_checked = new Array(this.tags.length).fill(false)
      }
    });
  }

}
