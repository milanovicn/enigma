import { Component, HostListener } from "@angular/core";

@Component({
  template: 'login-page/login-page.component.html'
})
export class Modal{

  static insertModal(message: string) {
    let htmlcode =
    ('<div id="myModal" class="modal" style="height: 100%; width: 100%; display:block; background-color: rgba(0,0,0,0.4);">'
    +'<div class="modal-content" style="border-radius:0; padding: 20px; background-color: white; width: 300px; margin:auto;">'
    +'<div class="close" id="closeId">&times;</div><p>'
    + message
    +'</p></div></div>');

    (<HTMLElement>document.getElementsByTagName('body')[0].firstChild.nextSibling.childNodes[2].firstChild).insertAdjacentHTML('afterbegin', htmlcode)

  }

  static removeModal(){
    document.getElementsByTagName('body')[0].firstChild.nextSibling.childNodes[2].firstChild.removeChild(document.getElementById('myModal'))
  }

}
