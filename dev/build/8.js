webpackJsonp([8],{

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageModule", function() { return LandingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__landing__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LandingPageModule = (function () {
    function LandingPageModule() {
    }
    return LandingPageModule;
}());
LandingPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__landing__["a" /* LandingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__landing__["a" /* LandingPage */]),
        ],
    })
], LandingPageModule);

//# sourceMappingURL=landing.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LandingPage = (function () {
    function LandingPage(navCtrl, navParams, authProvider, storage, formBuilder, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.isLoginDisable = true;
        this.loginForm = formBuilder.group({
            email: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
            pass: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
    }
    LandingPage.prototype.navPush = function (page) {
        this.navCtrl.push(page);
    };
    LandingPage.prototype.hasInput = function () {
        if (this.loginForm.status == 'VALID') {
            this.isLoginDisable = false;
        }
        else {
            this.isLoginDisable = true;
        }
    };
    LandingPage.prototype.login = function () {
        var _this = this;
        this.isLoginDisable = true;
        this.authProvider.login(this.email, this.pass)
            .then(function (res) {
            if (!res.emailVerified) {
                var toast = _this.toastCtrl.create({
                    message: 'Please verify your email to active your account',
                    duration: 5000
                });
                _this.isLoginDisable = false;
                toast.present();
            }
            else {
                // update the verified key to true
                _this.authProvider.loginVerified(res.uid);
                _this.storage.set('userId', res.uid);
                _this.storage.set('userName', res.displayName);
                _this.storage.set('userEmail', res.email);
                // this.navCtrl.push('HomePage');
                _this.navCtrl.setRoot('HomePage');
            }
        })
            .catch(function (err) {
            var toast = _this.toastCtrl.create({
                message: err.message,
                duration: 5000
            });
            _this.isLoginDisable = false;
            toast.present();
        });
    };
    LandingPage.prototype.fbLoginBtn = function () {
        var _this = this;
        this.authProvider.fbLogin().then(function (res) {
            var data = res.user;
            _this.storage.set('userId', data.uid);
            _this.storage.set('userName', data.displayName);
            _this.storage.set('userEmail', data.email);
            _this.navCtrl.push('HomePage');
        });
    };
    LandingPage.prototype.googleLoginBtn = function () {
        var _this = this;
        this.authProvider.googleLogin().then(function (res) {
            var data = res.user;
            _this.storage.set('userId', data.uid);
            _this.storage.set('userName', data.displayName);
            _this.storage.set('userEmail', data.email);
            _this.navCtrl.push('HomePage');
        });
    };
    return LandingPage;
}());
LandingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-landing',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\landing\landing.html"*/'<ion-content padding>\n\n  <div text-center margin-top>\n\n      <h1><img src="./assets/images/logo.svg" class="appLogo" alt="FireChat" no-margin></h1>\n\n  </div>\n\n  <ion-grid>\n\n      <ion-row>\n\n        <form (submit)="login()" [formGroup]="loginForm" col-12 no-padding>\n\n          <ion-item no-padding>\n\n            <ion-label floating>Email</ion-label>\n\n          <ion-input \n\n          type="text" \n\n          [(ngModel)]="email"\n\n          name="email"\n\n          [formControl]="loginForm.controls[\'email\']"\n\n          (keyup)="hasInput()"\n\n          ></ion-input>\n\n        </ion-item>\n\n          <div \n\n            *ngIf="loginForm.controls[\'email\'].hasError(\'pattern\') && \n\n            loginForm.controls[\'email\'].touched"\n\n            class="errorColor fSize12 mt5" \n\n            >Email Address is invalid\n\n          </div>\n\n          <ion-item no-padding>\n\n              <ion-label floating>Password</ion-label>\n\n          <ion-input \n\n          type="password"\n\n          [(ngModel)]="pass"\n\n          name="pass"\n\n          [formControl]="loginForm.controls[\'pass\']"\n\n          (keyup)="hasInput()"\n\n          ></ion-input>\n\n        </ion-item>\n\n          <div \n\n            *ngIf="loginForm.controls[\'pass\'].hasError(\'required\') && \n\n            loginForm.controls[\'pass\'].touched" \n\n            class="errorColor fSize12 mt5" \n\n            >Password is required\n\n          </div>\n\n    \n\n          <div text-right margin-top>\n\n            <span (click)="navPush(\'RegisterPage\')" padding-top padding-right>Sign up?</span>\n\n            <span (click)="navPush(\'ResetPasswordPage\')" padding-top>Forgot Password?</span>\n\n          </div>\n\n          <button ion-button color="light-blue" medium float-right full margin-top [disabled]="isLoginDisable">LOGIN</button>\n\n        </form>\n\n\n\n        <button ion-button icon-left medium full margin-top class="fbBtn mt200" (click)="fbLoginBtn()">\n\n          <ion-icon name="logo-facebook"></ion-icon>\n\n          LOGIN WITH FACEBOOK\n\n        </button>\n\n\n\n        <button ion-button icon-left medium full margin-top class="googleBtn" (click)="googleLoginBtn()">\n\n          <ion-icon name="logo-googleplus"></ion-icon>\n\n          LOGIN WITH GOOGLE\n\n        </button>\n\n      </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\landing\landing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */]])
], LandingPage);

//# sourceMappingURL=landing.js.map

/***/ })

});
//# sourceMappingURL=8.js.map