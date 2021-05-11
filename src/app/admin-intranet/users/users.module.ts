import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MzDropdownModule, MzSwitchModule } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        MzDropdownModule,
        MzSwitchModule,
        FormsModule
    ],
    declarations: [
        UsersComponent
    ]
})
export class UsersModule {}
