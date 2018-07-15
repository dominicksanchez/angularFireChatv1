webpackJsonp([6],{

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications__ = __webpack_require__(481);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationsPageModule = (function () {
    function NotificationsPageModule() {
    }
    return NotificationsPageModule;
}());
NotificationsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */]),
        ],
    })
], NotificationsPageModule);

//# sourceMappingURL=notifications.module.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notif_notif__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams, notifProvider, alertCtrl, toastCtrl, datePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.notifProvider = notifProvider;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.datePipe = datePipe;
        this.userLoggedId = navParams.data.userId;
        this.loadListOfNotif(this.userLoggedId);
        this.loadNotifCount(this.userLoggedId);
    }
    NotificationsPage.prototype.loadNotifCount = function (userId) {
        var _this = this;
        this.notifProvider.getNotifCount(userId).subscribe(function (res) {
            _this.notifCount = res.length;
        });
    };
    NotificationsPage.prototype.loadListOfNotif = function (userId) {
        var _this = this;
        this.notifProvider.loadListOfNotif(userId).subscribe(function (notifList) {
            var notifArr = [];
            var _loop_1 = function (notif) {
                _this.notifProvider.getUserData(notif.senderId).then(function (userData) {
                    userData['dateAdded'] = notif.dateAdded;
                    userData['notifDesc'] = notif.description;
                    userData['userId'] = notif.senderId;
                    userData['notifKey'] = notif.$key;
                    notifArr.push(userData);
                });
            };
            for (var _i = 0, notifList_1 = notifList; _i < notifList_1.length; _i++) {
                var notif = notifList_1[_i];
                _loop_1(notif);
            }
            _this.notifLists = notifArr;
        });
    };
    NotificationsPage.prototype.acceptRequest = function (user, i) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Request confirmation',
            message: "Do you accept " + user['displayName'] + " friend request?",
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Accept',
                    handler: function () {
                        console.log('userobj', user);
                        _this.notifProvider.acceptFriendRequest(_this.userLoggedId, user['userId'], user['notifKey']).then(function (res) {
                            var toast = _this.toastCtrl.create({
                                message: "You are now friends with " + user['displayName'],
                                duration: 3000
                            });
                            toast.present();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notifications',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\notifications\notifications.html"*/'<ion-content no-padding>\n\n    <ion-item-divider color="light">Notifications</ion-item-divider>\n\n\n\n    <ion-item *ngFor="let user of notifLists; let i = index">\n\n        <ion-avatar item-start>\n\n          <img src="{{user.photo}}" *ngIf="user.photo;else photo;">\n\n          <ng-template #photo><span class="icon-circle">{{user.displayName.charAt(0)}}</span></ng-template>\n\n          <span [class]="user.status"></span>\n\n        </ion-avatar>\n\n        <ion-label>\n\n          <h3>{{user.displayName}}</h3>\n\n          <p *ngIf="user.notifDesc == \'requested\'">sent you a friend request</p>\n\n          <p *ngIf="user.notifDesc == \'accepted\'">accepted your friend request</p>\n\n        </ion-label>\n\n        <button ion-button item-end color="light-blue" (click)="acceptRequest(user, i)" no-margin *ngIf="user.notifDesc == \'requested\'">\n\n          Accept\n\n        </button>\n\n        <ion-note item-end *ngIf="user.notifDesc == \'accepted\'">{{user.dateAdded | date:\'shortTime\'}}</ion-note>\n\n    </ion-item>\n\n    <ion-item *ngIf="notifCount == 0">\n\n        <ion-label>\n\n          <p>No notification yet</p>\n\n        </ion-label>\n\n      </ion-item>\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\notifications\notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_notif_notif__["a" /* NotifProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ })

});
//# sourceMappingURL=6.js.map