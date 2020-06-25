import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { BoilerplateComponent } from './components/boilerplate/boilerplate.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { ErrorComponent } from './components/error-pages/error/error.component';
import { RedirollComponent } from './components/shared/rediroll/rediroll.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    { path: '.env', pathMatch: 'full', component: RedirollComponent },
    { path: 'wp-login.php', pathMatch: 'full', component: RedirollComponent },
    { path: 'wp-admin', pathMatch: 'full', component: RedirollComponent },
    { path: 'error', pathMatch: 'full', component: ErrorComponent },
    { path: '404', pathMatch: 'full', component: NotFoundComponent },
    {
        path: '_/:key',
        component: BoilerplateComponent,
    },
    {
        path: 'podcasts',
        loadChildren: () =>
            import('./podcasts/podcasts.module').then((m) => m.PodcastsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'convert',
        loadChildren: () =>
            import('app/public/public.module').then((m) => m.PublicModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('app/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'public',
        loadChildren: () =>
            import('app/public/public.module').then((m) => m.PublicModule),
    },
    {
        path: 'sharing',
        loadChildren: () =>
            import('app/public/public.module').then((m) => m.PublicModule),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('app/admin/admin.module').then((m) => m.AdminModule),
    },
    {
        path: 'debug',
        loadChildren: () =>
            import('app/debug/debug.module').then((m) => m.DebugModule),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('app/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'payments',
        loadChildren: () =>
            import('app/payments/payments.module').then(
                (m) => m.PaymentsModule
            ),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            enableTracing: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
