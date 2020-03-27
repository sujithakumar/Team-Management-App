import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { BodyComponent } from './Components/body/body.component';
import { MenubarComponent } from './Components/menubar/menubar.component';
import { CardComponentComponent } from './Components/card-component/card-component.component';
import { BacklogComponent } from './Components/Tasks/backlog/backlog.component';
import { TodoComponent } from './Components/Tasks/todo/todo.component';
import { InprogressComponent } from './Components/Tasks/inprogress/inprogress.component';
import { DoneComponent } from './Components/Tasks/done/done.component';
import { AddCardComponent } from './Components/add-card/add-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BodyComponent,
    MenubarComponent,
    CardComponentComponent,
    BacklogComponent,
    TodoComponent,
    InprogressComponent,
    DoneComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
