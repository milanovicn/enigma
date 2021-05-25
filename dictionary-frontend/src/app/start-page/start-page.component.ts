import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagDTO } from '../_shared/dto/TagDTO';
import { TeamDTO } from '../_shared/dto/TeamDTO';
import { TermDTO } from '../_shared/dto/TermDTO';
import { UserDTO } from '../_shared/dto/UserDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  title = 'FIS-Dictionary';
  height: number = 0;

  letters: Array<string>
  fis_teams_list: Array<TeamDTO>
  fin_terms_list: Array<TermDTO>
  tags: Array<TagDTO>

  search_term: string = ""
  picked_letter: string = ""
  picked_tag: TagDTO
  // for showing details
  picked_team: TeamDTO

  user: UserDTO

  constructor(private router: Router, private appService: AppService) {
    this.letters = new Array<string>()
    this.tags = []
    this.fis_teams_list = []
    this.fin_terms_list = []
    for(var i = 0; i < 26; i++){
      this.letters.push(String.fromCharCode(65 + i)) // 'A' + i
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadTags()
  }

  ngAfterViewInit (){
    this.onWindowResize()
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowResize(){
    this.height = Number(document.getElementById("top-container")?.offsetHeight);
    document.getElementById("content").style.minHeight = window.innerHeight  - this.height + "px";
    document.getElementById("content").style.marginTop = this.height + "px";
    let elem = document.getElementById("fis-teams")

    if (window.innerWidth < 767) elem.parentNode.insertBefore(elem, document.getElementById("fin-terms"))
    else elem.parentNode.insertBefore(elem, elem.parentNode.lastChild.nextSibling)
  }

  SortAlphabetically(list){
    return list.sort((a,b) => (<TermDTO>a).title.localeCompare((<TermDTO>b).title))
  }

  ShowTermsByLetter(){
    return this.fin_terms_list.filter((v) => v.title.toLowerCase()[0] == this.picked_letter)
  }

  FinTermsSearchList(){
    let list = this.fin_terms_list
    if (this.picked_letter != "") list = this.ShowTermsByLetter()
    if (!this.search_term) return this.SortAlphabetically(list)
    return list.filter((v) => v.title.toLowerCase().indexOf(this.search_term.toLowerCase()) !== -1)
  }

  FinTermsSearch(){
    let list = this.FinTermsSearchList()
    let map = new Map<string, Array<TermDTO>>();

    // filter by start letter
    //if (this.picked_letter != "") {
    //  return map.set(this.picked_letter.toUpperCase(), list)
    //}

    // fill map
    for (let i = 0; i < 26; i++) {
      let start_letter = String.fromCharCode(65 + i)
      map.set(
        start_letter.toUpperCase(),
        list.filter((v) =>((<TermDTO>v).title.toLowerCase()[0] == start_letter.toLowerCase()))
      )
    }
/*
    if (this.search_term != ""){
      map.forEach((value: Array<TermDTO>, key: string) => {
        if (map.get(key).length == 0) map.delete(key)
      });
    }
*/
    // added
    // filter by start letter
    if (this.picked_letter != "") {
      //map.set(this.picked_letter.toUpperCase(), list)
      map.forEach((value: Array<TermDTO>, key: string) => {
        if (map.get(key).length == 0 && this.picked_letter.toUpperCase() != key) map.delete(key)
      });
    }
    // added

    // filter by tag
    if (this.picked_tag){
      map.forEach((value: Array<TermDTO>, key: string) => {
        var new_value = []
        new_value.length = 0
        map.get(key).forEach((term: TermDTO, index: number) => {
          //console.log(term)
          if (JSON.stringify(term.tags).includes(JSON.stringify(this.picked_tag))){
            new_value.push(term)
          }
        });

        if (new_value.length > 0) {
          map.set(key, new_value.filter((v) => true))
        }
        else  map.delete(key)
      });
    }

    // filter by team
    if (this.picked_team){
      map.forEach((value: Array<TermDTO>, key: string) => {
        var new_value = []
        new_value.length = 0
        map.get(key).forEach((term: TermDTO, index: number) => {
          //console.log(term.team)
          if (JSON.stringify(term.team) === (JSON.stringify(this.picked_team))){
            new_value.push(term)
          }
        });

        if (new_value.length > 0) {
          map.set(key, new_value.filter((v) => true))
        }
        else map.delete(key)
      });
    }
    if (this.search_term != ""){
      map.forEach((value: Array<TermDTO>, key: string) => {
        if (map.get(key).length == 0) map.delete(key)
      });
    }
    return map
  }

  Scroll(){
    if (window.innerHeight <= 767) {
      let n = document.getElementById("fin-terms").offsetTop - 60 // - header 1
      window.scrollTo({behavior: "smooth", top: n})
    }
    else {
      let n = document.getElementById("fin-terms").offsetTop - 60 - this.height // - header 1 & 2
      window.scrollTo({behavior: "smooth", top: n})
    }
  }

  ClickOnLetter(i){
    //document.getElementById("show_all").classList.remove("clicked")
    for (let i = 0; i < 26; i++)
      (<HTMLElement>document.getElementsByClassName("letter")[i]).classList.remove("clicked")
      //this.picked_letter = ""
      this.picked_letter = ""

    if (i == -1) {
        //document.getElementById("show_all").classList.add("clicked")
        //for (let i = 0; i < 26; i++)
        //  (<HTMLElement>document.getElementsByClassName("letter")[i]).classList.remove("clicked")
      this.ClickOnTag(-1)
      this.ClickOnTeam(-1)
    }
    else if (i >= 0){
      //for (let i = 0; i < 26; i++)
      //  (<HTMLElement>document.getElementsByClassName("letter")[i]).classList.remove("clicked")
      this.picked_letter = this.letters[i].toLowerCase()
      document.getElementById("letter_" + i).classList.add("clicked")
    }
  }

  Letter(i){
    //this.Scroll()
    this.ClickOnLetter(i)
    //this.ClickOnTag(-1)
    //this.ClickOnTeam(-1)
  }

  ClickOnTag(i){
    for (let i = 0; i < this.tags.length; i++)
      (<HTMLElement>document.getElementsByClassName("tags")[i]).classList.remove("clicked")

    if (i == -1) {
      this.picked_tag = undefined
      return
    }

    document.getElementById("tag_" + i).classList.add("clicked")
    this.picked_tag = this.tags[i]
  }

  Tag(i){
    //this.Scroll()
    this.ClickOnTag(i)
    //this.ClickOnLetter(-2)
    //this.ClickOnTeam(-1)
  }

  ClickOnTeam(i) {
    for (let i = 0; i < this.fis_teams_list.length; i++)
      (<HTMLElement>document.getElementsByClassName("fis_teams")[i]).classList.remove("clicked")

    if (i == -1) {
      this.picked_team = undefined
      return
    }

    document.getElementById("team_" + i).classList.add("clicked")
    this.picked_team = this.fis_teams_list[i]
  }

  Team(i) {
    //this.Scroll()
    //this.ClickOnTag(-1)
    //this.ClickOnLetter(-2)
    this.ClickOnTeam(i)
  }

  NavigateToTerm(term){
    localStorage.setItem("picked_term", JSON.stringify(term))
    this.router.navigate(['/show-term'])
  }

  NavigateToAddTerm(){
    localStorage.setItem('term_for_update', JSON.stringify(null))
    this.router.navigate(['/add-term'])
  }

  NavigateToAddTag(){
    this.router.navigate(['/add-tag'])
  }

  loadTags(){
    this.appService.getTags().subscribe({
      next: tags => {
        this.tags = tags;
        this.loadTeams();
      }
    });
  }

  loadTeams(){
    this.appService.getTeams().subscribe({
      next: teams => {
        console.log(this.fis_teams_list)
        // remove general
        this.fis_teams_list = teams.slice(1);
        this.loadTerms();
      }
    });
  }

  loadTerms(){
    this.appService.getTerms().subscribe({
      next: terms => {
        this.fin_terms_list = terms;
        console.log(this.tags)
        console.log(this.fis_teams_list)
        console.log(this.fin_terms_list)
        this.ClickOnLetter(-1)
      }
    });
  }

  getUser() {
    this.appService.getSession().subscribe(
      {
        next: user => {
            this.user = user
            this.loadTags()
            console.log(user)
        },
        error: error => {
          this.router.navigate(['/login-page'])
        }
      }
    );
  }

}
