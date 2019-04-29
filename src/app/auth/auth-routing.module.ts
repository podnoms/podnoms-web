import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'reset', pathMatch: 'full', component: ForgotPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
