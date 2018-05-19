import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastsModule } from './podcasts/podcasts.module';
import { AuthModule } from './auth/auth.module';
import { Podcast } from './core';
import { AuthGuard } from './auth/auth-guard.guard';

// Define the paths to the lazily loaded modules
const lazyPaths = {
    // TODO need to clean this up a bit, AuthModule is being used for any non-logged in pages
    home: './auth/auth.module#AuthModule',
    podcasts: './podcasts/podcasts.module#PodcastsModule'
};

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { path: 'home', loadChildren: () => AuthModule },
    {
        path: 'podcasts',
        loadChildren: () => PodcastsModule,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
