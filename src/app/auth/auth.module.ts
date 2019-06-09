import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ResetComponent } from './reset/reset.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        ComponentsModule,
        NgxCaptchaModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetComponent
    ]
})
export class AuthModule {}
