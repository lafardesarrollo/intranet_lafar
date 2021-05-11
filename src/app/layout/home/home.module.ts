import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HomeService } from './home.service';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        NgxSmartModalService, HomeService, NotificationsService
    ]
})
export class HomeModule {}
