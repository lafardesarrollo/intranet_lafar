
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared';

import { RouterModule } from '@angular/router';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './login/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutService } from './layout/layout.service';
import { Globals } from './globals';
import { FunGlobalService } from './shared/services/funGlobalService';
import { MzModalService, MzSpinnerModule } from 'ngx-materialize';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MzSpinnerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAAx1YUhJE2_D8VYaXwd3g5ZGdfOadIT1Q'
    // })
  ],
  providers: [AuthGuard,
    LoginService,
    LayoutService,
    Globals,
    FunGlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
