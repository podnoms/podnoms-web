import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';
import { PatreonComponent } from './redirects/patreon/patreon.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        ComponentsModule,
        NgxCaptchaModule,
        LoggerModule.forRoot(environment.logConfig),
    ],
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, PatreonComponent],
    providers: [AuthService, CookieService],
})
export class AuthModule {}
