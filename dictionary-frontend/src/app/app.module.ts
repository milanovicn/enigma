import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowTermComponent } from './show-term/show-term.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AddTermComponent } from './add-term/add-term.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './_shared/services/appService.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ShowTermComponent,
    StartPageComponent,
    AddTermComponent,
    LoginPageComponent,
    AddTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
