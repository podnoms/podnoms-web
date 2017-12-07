import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { RegisterComponent } from './components/register/register.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';
import { DebugComponent } from './components/debug/debug.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PodcastComponent } from './components/podcast/podcast.component';
import { PodcastAddFormComponent } from './components/podcast/podcast-add-form/podcast-add-form.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset', component: ResetComponent, pathMatch: 'full' },
    { path: 'callback', component: CallbackComponent },
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
