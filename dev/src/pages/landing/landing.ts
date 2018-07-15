import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  email:string;
  pass:string;
  isLoginDisable:boolean = true;
  loginForm: FormGroup;
  message;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
      pass: [null, Validators.required]
    });
  }

  navPush(page:string) {
    this.navCtrl.push(page);
  }

  hasInput() {
    if(this.loginForm.status == 'VALID') {
      this.isLoginDisable = false;
    }else {
      this.isLoginDisable = true;
    }
  }

  login() {
    this.isLoginDisable = true;
    this.authProvider.login(this.email, this.pass)
    .then((res) => { 
      if(!res.emailVerified) {
        let toast = this.toastCtrl.create({
          message: 'Please verify your email to active your account',
          duration: 5000
        });
        this.isLoginDisable = false;
        toast.present();
      }else {
        // update the verified key to true
        this.authProvider.loginVerified(res.uid);
        this.storage.set('userId', res.uid);
        this.storage.set('userName', res.displayName);
        this.storage.set('userEmail', res.email);

        this.navCtrl.setRoot('TabsPage');
      }
    })
    .catch((err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 5000
      });
      this.isLoginDisable = false;
      toast.present();
    })
  }

  fbLoginBtn() {
    this.authProvider.fbLogin().then((res) => {
      let data = res.user;
      this.storage.set('userId', data.uid);
      this.storage.set('userName', data.displayName);
      this.storage.set('userEmail', data.email);
      this.navCtrl.setRoot('TabsPage');
    });
  }

  googleLoginBtn() {
    this.authProvider.googleLogin().then((res) => {
      let data = res.user;
      this.storage.set('userId', data.uid);
      this.storage.set('userName', data.displayName);
      this.storage.set('userEmail', data.email);
      this.navCtrl.setRoot('TabsPage');
    });
  }
}
