import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';
import { AppsService } from './apps.service';
import { MzToastService, MzCardModule, MzSpinnerModule } from 'ngx-materialize';


@NgModule({
    imports: [
        CommonModule,
        AppsRoutingModule,
        MzCardModule,
        MzSpinnerModule
    ],
    declarations: [
        AppsComponent
    ],
    providers: [
        AppsService, MzToastService
    ]
})
export class AppsModule {}
