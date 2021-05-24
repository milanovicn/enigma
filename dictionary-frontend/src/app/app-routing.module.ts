import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTagComponent } from './add-tag/add-tag.component';
import { AddTermComponent } from './add-term/add-term.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShowTermComponent } from './show-term/show-term.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {path: "start-comp", component: AppComponent},
  {path: "show-term", component: ShowTermComponent},
  {path: "start-page", component: StartPageComponent},
  {path: "add-term", component: AddTermComponent},
  {path: "add-tag", component: AddTagComponent},
  {path: "login-page", component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
