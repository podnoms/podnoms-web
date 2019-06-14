import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './shared/components/error/error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    { path: 'error', pathMatch: 'full', component: ErrorComponent },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'public', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'sharing', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'debug', loadChildren: 'app/debug/debug.module#DebugModule' },
    {
        path: 'profile',
        loadChildren: 'app/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'podcasts',
        loadChildren: 'app/podcasts/podcasts.module#PodcastsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'payments',
        loadChildren: 'app/payments/payments.module#PaymentsModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
