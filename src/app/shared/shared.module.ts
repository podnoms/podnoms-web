import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { HumaniseTimePipe } from './pipes/humanise-time.pipe';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { authServiceConfig } from '../auth/auth-config';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule
    ],
    exports: [FormsModule, ReactiveFormsModule, OrderByPipe, HumaniseTimePipe],
    declarations: [OrderByPipe, HumaniseTimePipe],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: authServiceConfig
        }
    ]
})
export class SharedModule {}
