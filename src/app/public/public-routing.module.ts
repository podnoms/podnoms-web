import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharingComponent } from './sharing/sharing.component';


const routes: Routes = [
    {
        path: '',
        component: SharingComponent
    }, {
        path: 'entry/:id',
        component: SharingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {
}
