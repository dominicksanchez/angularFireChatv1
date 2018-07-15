import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  resetPassForm: FormGroup;
  isResetPassDisabled:boolean = false;
  email:string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public toastCtrl: ToastController
  ) {
    this.resetPassForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
    });
  }

  resetPass() {
    this.isResetPassDisabled = true;
    this.authProvider.resetPassword(this.email)
    .then((res) => {
      let toast = this.toastCtrl.create({
        message: 'Email for password reset was sent',
        duration: 5000
      });
      this.isResetPassDisabled = false;
      toast.present();
    })
    .catch((err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 5000
      });
      this.isResetPassDisabled = false;
      toast.present();
    });
  }
}
