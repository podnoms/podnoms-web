import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PodcastComponent } from './components/podcast/podcast.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'podcasts', component: PodcastComponent, canActivate: [AuthGuard]},
    //{path: 'add', component: PodcastAddFormComponent, canActivate: [AuthGuard]},
    //{path: 'podcasts/:slug', component: PodcastComponent, canActivate: [AuthGuard]},
    //{path: 'podcasts/:slug/edit', component: PodcastAddFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
