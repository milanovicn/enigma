import { HttpResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '../modal';
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

  team: TeamDTO             // teamID
  teams: TeamDTO[] = []     // teamID
  tags: Array<TagDTO>

  picked_tag: string = ""
  picked_tags: Array<TagDTO>

  link: string = ""
  links: string[] = []

  user_team: boolean = false
  term: TermDTO
  user: UserDTO
  term_update: TermDTO

  action_title: string = "Submit"

  constructor(private router: Router, private appService: AppService) {
    this.tags = new Array<TagDTO>()
    this.picked_tags = new Array<TagDTO>()

    this.term_update = <TermDTO>(JSON.parse(localStorage.getItem('term_for_update')))
    console.log(this.term_update)
  }

  ngOnInit() {
    window.scrollTo({top:1})
    this.onWindowResize()
    this.loadTags()
    this.loadTeams()
    this.getUser()
    this.links = []
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
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
    }
  }

  setValues(){
    this.action_title = "Update"
    this.user_team = this.term_update.team.name == 'General'
    this.term_name = this.term_update.title
    this.detail_description = this.term_update.details
    this.short_description = this.term_update.description
    this.picked_tags = this.term_update.tags
    this.links = this.term_update.links
    for(let i = 0; i < this.tags.length; i++){
      for(let ii = 0; ii < this.picked_tags.length; ii++){
        if (this.tags[i].name == this.picked_tags[ii].name){
          this.tags.splice(i,1)
          break
        }
      }
    }
  }

  SaveItem(){

    if (!this.term_name || !this.detail_description || !this.short_description){
      return // all fields are required
    }

    if (this.term_update != null) this.updateTerm()
    else this.submitTerm()

  }

  updateTerm() {
    let t = this.user_team ? this.teams[0] : this.user.team
    this.term = new TermDTO(this.term_name, this.short_description, this.detail_description, this.term_update.term_ID, t, this.picked_tags, this.links)

    this.appService.updateTerm(this.term).subscribe(
      {
        next: data => {
            if (data["status"] == "true"){
              Modal.insertModal(data["response"])
              localStorage.setItem("picked_term", JSON.stringify(this.term))
              this.router.navigate(['/show-term'])
            }
            else if (data["status"] == "false"){
              Modal.insertModal(data["response"])
            }
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
      }
    );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
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
    this.appService.getSession().subscribe({
      next: user => {
          this.user = user;
          console.log("User " + user.name + " is adding term...")
      }
    });
  }

  loadTeams(){
    this.appService.getTeams().subscribe({
      next: teams => {
        this.teams = teams;
        if (this.term_update != null) this.setValues()
      }
    });
  }

  clickCheckbox(){
    document.getElementById("check-box").click()
  }

  createNewTerm() {

    let team = this.user_team ? this.teams[0] : this.user.team
    this.term = new TermDTO(this.term_name, this.short_description, this.detail_description, -1, team, this.picked_tags, this.links)

    console.log(JSON.stringify(this.term).toString())

    this.appService.createTerm(this.term).subscribe(
      {
        next: data => {
            if (data["status"] == "true"){
              Modal.insertModal(data["response"])
              this.term_name = ""
              this.detail_description = ""
              this.short_description = ""
              this.picked_tags = []
              this.links = []
              this.loadTags()
            }
            else if (data["status"] == "false"){
              Modal.insertModal(data["response"])
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
      }
    });
  }

  clickedOption(){
    console.log(this.picked_tag)
    let n = 0
    for (let i = 0; i < this.tags.length; i++){
      if (this.tags[i].name == this.picked_tag){
        n = i
        this.picked_tags.push(this.tags[i])
      }
    }
    console.log(n)
    this.tags.splice(n, 1)
    console.log(this.picked_tag)
  }

  getPickedTags(){
    return this.picked_tags
  }

  removePickedTag(i){
    this.tags.push(this.picked_tags[i])
    this.picked_tags.splice(i, 1)
    this.picked_tag = ""
  }

  checkIfEnter(event: KeyboardEvent) {
    document.getElementById("ins-link").style.borderColor = "#a6a6a6"
    if (event.key == 'Enter') {
      this.insertLink()
    }
  }

  insertLink() {
    if (this.link == "") {
      document.getElementById("ins-link").style.borderColor = "red"
      return
    }

    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i] == this.link){
        document.getElementById("ins-link").style.borderColor = "red"
        this.link = ""
        return
      }
    }

    this.links.push(this.link)
    console.log(this.links)
    this.link = ""
  }

  removeLink(i) {
    this.links.splice(i, 1)
  }
}

