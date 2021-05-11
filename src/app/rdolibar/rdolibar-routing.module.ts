import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdolibarComponent } from './rdolibar.component';

const routes: Routes = [
    {
        path: '',
        component: RdolibarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RdolibarRoutingModule {}
