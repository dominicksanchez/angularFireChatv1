webpackJsonp([0],{

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserslistPageModule", function() { return UserslistPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userslist__ = __webpack_require__(487);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserslistPageModule = (function () {
    function UserslistPageModule() {
    }
    return UserslistPageModule;
}());
UserslistPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__userslist__["a" /* UserslistPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__userslist__["a" /* UserslistPage */]),
        ],
    })
], UserslistPageModule);

//# sourceMappingURL=userslist.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserslistPage = (function () {
    function UserslistPage(navCtrl, navParams, toastCtrl, userProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.userProvider = userProvider;
        this.alertCtrl = alertCtrl;
        this.searchUserArr = [];
        this.searching = false;
        this.searchStr = '';
        this.noResult = false;
        this.userLoggedId = navParams.data.userId;
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]();
        this.getUsers();
    }
    UserslistPage.prototype.getUsers = function () {
        var _this = this;
        this.userProvider.users().then(function (users) {
            var modifiedUsers = [];
            Object.keys(users).map(function (key) {
                if (users[key].hasOwnProperty('displayName')) {
                    modifiedUsers = modifiedUsers.concat([users[key]]);
                }
            });
            console.log('modifiedUsers', modifiedUsers);
            _this.users = modifiedUsers;
        });
    };
    UserslistPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchUser();
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.searching = false;
            _this.searchUser();
        });
    };
    UserslistPage.prototype.onSearchInput = function () {
        this.searching = true;
    };
    UserslistPage.prototype.searchUser = function () {
        var _this = this;
        if (this.searchStr.trim() != '') {
            this.users = this.users.filter(function (user) {
                return (user.displayName.toLowerCase().indexOf(_this.searchStr.toLowerCase()) > -1);
            });
            if (this.users.length == 0) {
                this.noResult = true;
            }
            else {
                this.noResult = false;
            }
        }
        else {
            this.getUsers();
        }
    };
    UserslistPage.prototype.sendFriendRequest = function (recipient, index) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Send a friend request?',
            message: "Do you want " + recipient['displayName'] + " to be your friend?",
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
                        _this.users.splice(index, 1);
                        _this.userProvider.sendFriendRequest(recipient).then(function () {
                            var toast = _this.toastCtrl.create({
                                message: "Friend request to " + recipient.displayName + " was sent",
                                duration: 5000
                            });
                            toast.present();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    return UserslistPage;
}());
UserslistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-userslist',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\userslist\userslist.html"*/'<ion-content no-padding>\n\n  <ion-searchbar [(ngModel)]="searchStr" [formControl]="searchControl" (ionInput)="onSearchInput()"></ion-searchbar>\n\n  <div *ngIf="searching" class="spinner-container">\n\n    <ion-spinner item-start="" name="bubbles" class="spinner spinner-ios spinner-bubbles spinner-ios-bubbles"></ion-spinner>\n\n  </div>\n\n  <ion-list *ngIf="!searching" class="usersList">\n\n    <div *ngIf="users && users.length">\n\n      <ion-item *ngFor="let user of users; let i = index">\n\n        <ion-avatar item-start>\n\n          <span class="unreadCount" *ngIf="user.unread">{{user.unread}}</span>\n\n          <img src="{{user.photo}}" *ngIf="user.photo;else photo;">\n\n          <ng-template #photo><span class="icon-circle">{{user.displayName && user.displayName.charAt(0)}}</span></ng-template>\n\n          <span [class]="user.status"></span>\n\n        </ion-avatar>\n\n        <ion-label>\n\n          <h3>{{user.displayName}}</h3>\n\n          <p>{{user.email}}</p>\n\n        </ion-label>\n\n        <button ion-button item-end icon-left icon-only small color="light-blue" (click)="sendFriendRequest(user, i)">\n\n          <ion-icon name="person-add"></ion-icon>\n\n        </button>\n\n      </ion-item>\n\n    </div>\n\n    <ion-item *ngIf="users && users.length === 0">\n\n      <ion-label>\n\n        <p class="noFriends">No friends yet</p>\n\n      </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\userslist\userslist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], UserslistPage);

//# sourceMappingURL=userslist.js.map

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(8);
var debounceTime_1 = __webpack_require__(489);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(25);
var async_1 = __webpack_require__(92);
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map

/***/ })

});
//# sourceMappingURL=0.js.map