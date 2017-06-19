import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PodcastComponent} from './components/podcast/podcast.component';
import {AuthGuard} from './services/auth.guard';
import {PodcastAddFormComponent} from './components/podcast-add-form/podcast-add-form.component';
import {PodcastUploadFormComponent} from './components/podcast-upload-form/podcast-upload-form.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'podcasts', component: PodcastComponent, canActivate: [AuthGuard]},
    {path: 'podcasts/add', component: PodcastAddFormComponent, canActivate: [AuthGuard]},
    {path: 'podcasts/:slug/edit', component: PodcastAddFormComponent, canActivate: [AuthGuard]},
    {path: 'podcasts/:slug/upload', component: PodcastUploadFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
