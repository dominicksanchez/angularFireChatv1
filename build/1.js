webpackJsonp([1],{

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPageModule = (function () {
    function TabsPageModule() {
    }
    return TabsPageModule;
}());
TabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */]),
        ],
    })
], TabsPageModule);

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pushnotif_pushnotif__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notif_notif__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage(navCtrl, pushnotifProvider, notifProvider, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.pushnotifProvider = pushnotifProvider;
        this.notifProvider = notifProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.tab1 = "ChatsPage";
        this.tab2 = "NotificationsPage";
        this.tab3 = "UserslistPage";
        this.tabsParam = {};
        this.storage.get('userId').then(function (userId) {
            _this.loggedUserId = userId;
            _this.loadNotifCount(userId);
            _this.loadUnreadMsgCount(userId);
            _this.tabsParam['userId'] = userId;
        });
    }
    TabsPage.prototype.ngOnInit = function () {
        this.pushnotifProvider.getPermission();
        this.pushnotifProvider.receiveMessage();
    };
    TabsPage.prototype.loadNotifCount = function (userId) {
        var _this = this;
        this.notifProvider.getNotifCount(userId).subscribe(function (res) {
            _this.notifCount = res.length;
        });
    };
    TabsPage.prototype.loadUnreadMsgCount = function (userId) {
        var _this = this;
        this.notifProvider.getUnreadMsgCount(userId).subscribe(function (unread) {
            _this.unreadMsgCount = unread.length;
        });
    };
    TabsPage.prototype.logoutClick = function () {
        var _this = this;
        console.log('logout');
        var confirm = this.alertCtrl.create({
            title: 'Log out confirmation',
            message: "Are you sure do you want to log out?",
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Yes clicked');
                        localStorage.clear();
                        _this.navCtrl.push('LandingPage');
                    }
                }
            ]
        });
        confirm.present();
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\tabs\tabs.html"*/'<ion-tabs color="light-blue">\n\n  <ion-tab tabIcon="chatbubbles" [rootParams]="tabsParam" tabTitle="Chats" [root]="tab1" tabBadge="{{unreadMsgCount > 0 ? unreadMsgCount : null}}" tabBadgeStyle="danger"></ion-tab>\n\n  <ion-tab tabIcon="notifications" tabTitle="Notifications" [root]="tab2" [rootParams]="tabsParam" tabBadge="{{notifCount > 0 ? notifCount : null}}" tabBadgeStyle="danger"></ion-tab>\n\n  <ion-tab tabIcon="person-add" tabTitle="Users" [rootParams]="tabsParam" [root]="tab3"></ion-tab>\n\n  <ion-tab tabIcon="log-out" tabTitle="Log out" [rootParams]="tabsParam" [root]="tab4" (ionSelect)="logoutClick()"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\tabs\tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_pushnotif_pushnotif__["a" /* PushnotifProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_notif_notif__["a" /* NotifProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ })

});
//# sourceMappingURL=1.js.map