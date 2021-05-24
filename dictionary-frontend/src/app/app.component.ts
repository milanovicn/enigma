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

    /*
    let teamGen = new TeamDTO("general", 1);
    let teamFA = new TeamDTO("FA", 2);
    let teamAPT = new TeamDTO("APT", 3);
    let user = new UserDTO(1, "e5637521", "ana@gmail.com", "Ana", "Stakic", false, teamFA);

    let tag1 = new TagDTO(1, 'financial');
    let tag2 = new TagDTO(2, 'procedural');
    let tag3 = new TagDTO(3, 'technical');

    let term1 = new TermDTO("Bond",
    "A bond is a fixed income instrument that represents a loan made by an investor to a borrower (typically corporate or governmental).",
    " A bond could be thought of as an I.O.U. between the lender and borrower that includes the details of the loan and its payments. Bonds are used by companies, municipalities, states, and sovereign governments to finance projects and operations. Owners of bonds are debtholders, or creditors, of the issuer. Bond details include the end date when the principal of the loan is due to be paid to the bond owner and usually includes the terms for variable or fixed interest payments made by the borrower.",
    1, teamGen, [tag1])


    let term2 = new TermDTO("Derivative",
    "A derivative is a financial security with a value that is reliant upon or derived from, an underlying asset or group of assets—a benchmark.",
    "The derivative itself is a contract between two or more parties, and the derivative derives its price from fluctuations in the underlying asset.The most common underlying assets for derivatives are stocks, bonds, commodities, currencies, interest rates, and market indexes. These assets are commonly purchased through brokerages. Derivatives can trade over-the-counter (OTC) or on an exchange. OTC derivatives constitute a greater proportion of the derivatives market. OTC-traded derivatives, generally have a greater possibility of counterparty risk. Counterparty risk is the danger that one of the parties involved in the transaction might default. These parties trade between two private parties and are unregulated.",
    1, teamGen, [tag1])


    let term3 = new TermDTO("Bitcoin Mining",
    "Bitcoin mining is the process of creating new bitcoin by solving a computational puzzle.",
    "The result of bitcoin mining is twofold. First, when computers solve these complex math problems on the bitcoin network, they produce new bitcoin (not unlike when a mining operation extracts gold from the ground). And second, by solving computational math problems, bitcoin miners make the bitcoin payment network trustworthy and secure by verifying its transaction information. When someone sends bitcoin anywhere, it's called a transaction. Transactions made in-store or online are documented by banks, point-of-sale systems, and physical receipts. Bitcoin miners achieve the same thing by clumping transactions together in “blocks” and adding them to a public record called the “blockchain.” Nodes then maintain records of those blocks so that they can be verified into the future.    When bitcoin miners add a new block of transactions to the blockchain, part of their job is to make sure that those transactions are accurate. In particular, bitcoin miners make sure that bitcoin is not being duplicated, a unique quirk of digital currencies called “double-spending.” With printed currencies, counterfeiting is always an issue. But generally, once you spend $20 at the store, that bill is in the clerk’s hands. With digital currency, however, it's a different story. Digital information can be reproduced relatively easily, so with Bitcoin and other digital currencies, there is a risk that a spender can make a copy of their bitcoin and send it to another party while still holding onto the original.",
    1, teamGen, [tag2])

    localStorage.setItem("terms", JSON.stringify([term1,term1,term1,term1, term2, term3,term3]))
    localStorage.setItem("users", JSON.stringify([user]))
    localStorage.setItem("tags", JSON.stringify([tag1, tag2, tag3]))
    localStorage.setItem("teams", JSON.stringify([teamGen, teamFA, teamAPT]))
    */

    this.router.navigate(['/login-page'])
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
