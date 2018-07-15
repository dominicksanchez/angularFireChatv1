webpackJsonp([4],{

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(434);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = (function () {
    function RegisterPageModule() {
    }
    return RegisterPageModule;
}());
RegisterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
        ],
    })
], RegisterPageModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, authProvider, toastCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.isRegisterDisable = false;
        this.registerForm = formBuilder.group({
            name: [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required],
            email: [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
            pass: [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(5)])]
        });
    }
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.isRegisterDisable = true;
        this.authProvider.register(this.email, this.pass)
            .then(function (user) {
            console.log(user);
            _this.authProvider.createUser(user.uid, user.email, user.photoURL, _this.name);
            user.sendEmailVerification();
            _this.navCtrl.push('LoginPage');
            _this.email = '';
            _this.pass = '';
            var toast = _this.toastCtrl.create({
                message: 'Email verification sent',
                duration: 5000
            });
            toast.present();
            _this.isRegisterDisable = false;
        }).catch(function (err) {
            var toast = _this.toastCtrl.create({
                message: err.message,
                duration: 3000
            });
            _this.isRegisterDisable = false;
            toast.present();
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\register\register.html"*/'<ion-header>\n\n  <ion-navbar color="light-blue">\n\n    <ion-title>Register</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding margin-top>\n\n  <form (submit)="register()" [formGroup]="registerForm">\n\n		<ion-item no-padding>\n\n			<ion-label floating>Name</ion-label>\n\n			<ion-input \n\n				type="text" \n\n				[(ngModel)]="name" \n\n				name="name"\n\n				[formControl]="registerForm.controls[\'name\']"\n\n			></ion-input>\n\n		</ion-item>\n\n  	<ion-item no-padding>\n\n  	  <ion-label floating>Email</ion-label>\n\n			<ion-input \n\n				type="text" \n\n				[(ngModel)]="email" \n\n				name="email"\n\n				[formControl]="registerForm.controls[\'email\']"\n\n			></ion-input>\n\n		</ion-item>\n\n		<div \n\n			*ngIf="registerForm.controls[\'email\'].hasError(\'pattern\') && \n\n			registerForm.controls[\'email\'].touched" \n\n			class="errorColor fSize12 mt5" \n\n			padding-left>Email Address is invalid\n\n		</div>\n\n  	<ion-item no-padding>\n\n  	  <ion-label floating>Password</ion-label>\n\n			<ion-input\n\n				type="password" \n\n				[(ngModel)]="pass" \n\n				name="pass"\n\n				[formControl]="registerForm.controls[\'pass\']"\n\n			></ion-input>\n\n		</ion-item>\n\n		<div \n\n			*ngIf="registerForm.controls[\'pass\'].hasError(\'required\') && \n\n			registerForm.controls[\'pass\'].touched" \n\n			class="errorColor fSize12 mt5" \n\n			padding-left>Password is required\n\n		</div>\n\n		<div *ngIf="registerForm.controls[\'pass\'].hasError(\'minlength\') && \n\n			registerForm.controls[\'pass\'].touched" \n\n			class="errorColor fSize12 mt5" \n\n			padding-left>Your password must be at least 5 characters long.\n\n		</div>\n\n		<button ion-button color="default" medium float-right full margin-top [disabled]="isRegisterDisable">REGISTER</button>\n\n		\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=4.js.map