import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        ComponentsModule,
        NgxCaptchaModule
    ],
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent]
})
export class AuthModule {}
