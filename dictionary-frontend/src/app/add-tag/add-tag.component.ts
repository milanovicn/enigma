import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagDTO } from '../_shared/dto/TagDTO';
import { TermDTO } from '../_shared/dto/TermDTO';
import { AppService } from '../_shared/services/appService.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  height: number
  tag_name: string
  tags: TagDTO[]

  tag: TagDTO

  constructor(private router: Router, private appService:AppService) {
    this.getUser()
  }

  ngOnInit(): void {
    window.scrollTo({top:1})
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

  SaveTag(){
    if (!this.tag_name){
      return // all fields are required
    }
    this.tag = new TagDTO(-1, this.tag_name)

    this.appService.createTag(this.tag).subscribe(
      {
        next: data => {
            if (data["status"] == "true"){
              alert(data["response"])
              this.router.navigate(['/start-page'])
            }
            else if (data["status"] == "false"){
              alert(data["response"])
            }
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
    }
    );
  }

  alertError(){
    alert("Wrong credentials! Try again")
  }

  alertSuccess() {
    alert("Term added!")
    this.router.navigate(['/start-page'])
  }
  getUser() {
    this.appService.getSession().subscribe(
      result => {},
      error => this.router.navigate(['/login-page']),
    );
  }

  loadTags(){
    this.appService.getTags().subscribe({
      next: tags => {
        this.tags = tags;
        this.tags.sort((a,b) => (<TagDTO>a).name.localeCompare((<TagDTO>b).name))
      }
    });
  }
}
