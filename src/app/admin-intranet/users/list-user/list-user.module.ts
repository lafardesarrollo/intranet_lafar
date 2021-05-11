import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { MzParallaxModule } from 'ngx-materialize';
import { FilterListUserByPipe } from './filter-list-user.pipe';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot(),
    ListUserRoutingModule,
    MzParallaxModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListUserComponent, FilterListUserByPipe]
})

export class ListUserModule { }