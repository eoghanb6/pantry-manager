import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ForgotPasswordPage } from './forgotpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForgotPasswordPage
      }
    ])
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
