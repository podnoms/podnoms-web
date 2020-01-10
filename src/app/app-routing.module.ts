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
    { path: 'auth', loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule) },
    { path: 'public', loadChildren: () => import('app/public/public.module').then(m => m.PublicModule) },
    { path: 'sharing', loadChildren: () => import('app/public/public.module').then(m => m.PublicModule) },
    { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule) },
    { path: 'debug', loadChildren: () => import('app/debug/debug.module').then(m => m.DebugModule) },
    {
        path: 'profile',
        loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'podcasts',
        loadChildren: () => import('app/podcasts/podcasts.module').then(m => m.PodcastsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'payments',
        loadChildren: () => import('app/payments/payments.module').then(m => m.PaymentsModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
