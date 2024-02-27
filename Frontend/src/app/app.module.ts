import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TablaPersonasComponent } from './tabla-personas/tabla-personas.component';

import { DataServiceService } from './data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasComponent } from './consultas/consultas.component';
import { DBComponent } from './db/db.component';
import { Router, RouterModule, Routes } from '@angular/router';

const appRoutes:Routes=[
   {path:'',component:TablaPersonasComponent},
   {path:'consultas',component:ConsultasComponent},
   {path:'db',component:DBComponent}

]



@NgModule({
  declarations: [
    AppComponent,
    TablaPersonasComponent,
    ConsultasComponent,
    DBComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
