webpackJsonp([7],{

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(428);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, formBuilder, authProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.storage = storage;
        this.isLoginDisable = false;
        this.loginForm = formBuilder.group({
            email: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
            pass: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
    }
    LoginPage.prototype.pushSignUp = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.pushResetPass = function () {
        this.navCtrl.push('ResetPasswordPage');
    };
    LoginPage.prototype.login = function () {
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
                _this.navCtrl.push('HomePage');
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
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\login\login.html"*/'<ion-header>\n\n	<ion-navbar color="light-blue">\n\n			<ion-title>Login</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n	\n\n<ion-content padding margin-top>\n\n	  <form (submit)="login()" [formGroup]="loginForm">\n\n	  	<ion-item no-padding>\n\n	  	  <ion-label floating>Email</ion-label>\n\n			<ion-input \n\n			type="text" \n\n			[(ngModel)]="email"\n\n			name="email"\n\n			[formControl]="loginForm.controls[\'email\']"\n\n			></ion-input>\n\n		</ion-item>\n\n			<div \n\n				*ngIf="loginForm.controls[\'email\'].hasError(\'pattern\') && \n\n				loginForm.controls[\'email\'].touched"\n\n				class="errorColor fSize12 mt5" \n\n				>Email Address is invalid\n\n			</div>\n\n	  	<ion-item no-padding>\n\n	  	  	<ion-label floating>Password</ion-label>\n\n			<ion-input \n\n			type="password"\n\n			[(ngModel)]="pass"\n\n			name="pass"\n\n			[formControl]="loginForm.controls[\'pass\']"\n\n			></ion-input>\n\n		</ion-item>\n\n			<div \n\n				*ngIf="loginForm.controls[\'pass\'].hasError(\'required\') && \n\n				loginForm.controls[\'pass\'].touched" \n\n				class="errorColor fSize12 mt5" \n\n				>Password is required\n\n			</div>\n\n\n\n			<div text-right margin-top>\n\n				<span (click)="pushSignUp()" padding-top padding-right>Sign up?</span>\n\n				<span (click)="pushResetPass()" padding-top>Forgot Password?</span>\n\n			</div>\n\n	  	<button ion-button color="light-blue" medium float-right full margin-top [disabled]="isLoginDisable">LOGIN</button>\n\n	  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=7.js.map