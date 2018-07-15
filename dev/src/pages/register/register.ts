import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name: string;
  email:string;
  pass:string;
  registerForm: FormGroup;
  isRegisterDisable:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
      pass: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  register() {
    this.isRegisterDisable = true;
    this.authProvider.register(this.email, this.pass)
    .then((user) => {
      console.log(user);
      this.authProvider.createUser(user.uid, user.email, user.photoURL, this.name);
      user.sendEmailVerification();
      this.navCtrl.push('LandingPage');
      this.email = '';
      this.pass = '';
      let toast = this.toastCtrl.create({
        message: 'Email verification sent',
        duration: 5000
      });
      toast.present();
      this.isRegisterDisable = false;
    }).catch((err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });
      this.isRegisterDisable = false;
      toast.present();
    })
  }
}
