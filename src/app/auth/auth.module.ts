import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, AuthRoutingModule],
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent
    ]
})
export class AuthModule {}
