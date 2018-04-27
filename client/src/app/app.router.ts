import { ProfileComponent } from 'app/components/profile/profile.component';
import { ResetComponent } from 'app/components/reset/reset.component';
import { RegisterComponent } from 'app/components/register/register.component';
import { LoginComponent } from 'app/components/login/login.component';
import { DebugComponent } from 'app/components/debug/debug.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PodcastComponent } from 'app/components/podcast/podcast.component';
import { PodcastAddFormComponent } from 'app/components/podcast/podcast-add-form/podcast-add-form.component';
import { AboutComponent } from 'app/components/about/about.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset', component: ResetComponent, pathMatch: 'full' },
    { path: 'debug', component: DebugComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'podcasts', component: PodcastComponent, canActivate: [AuthGuard] },
    { path: 'add', component: PodcastAddFormComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'podcasts/:slug', component: PodcastComponent, canActivate: [AuthGuard] },
    { path: 'podcasts/:slug/edit', component: PodcastAddFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
