import { DebugComponent } from './components/debug/debug.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PodcastComponent } from './components/podcast/podcast.component';
import { PodcastAddFormComponent } from './components/podcast/podcast-add-form/podcast-add-form.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'podcasts', component: PodcastComponent, canActivate: [AuthGuard] },
    { path: 'add', component: PodcastAddFormComponent, canActivate: [AuthGuard] },
    { path: 'podcasts/:slug', component: PodcastComponent, canActivate: [AuthGuard] },
    // {path: 'podcasts/:slug/edit', component: PodcastAddFormComponent, canActivate: [AuthGuard]},
    { path: 'debug', component: DebugComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
