webpackJsonp([10],{

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http, afAuth, storage, db) {
        var _this = this;
        this.http = http;
        this.afAuth = afAuth;
        this.storage = storage;
        this.db = db;
        this.user = db.object('/users');
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.loggedUserId = user.uid;
                _this.updateOnConnect();
                _this.updateOnDisconnect();
                _this.updateOnIdle();
            }
        });
    }
    AuthProvider.prototype.loggedUser = function () {
        return this.afAuth.authState;
    };
    AuthProvider.prototype.loggedUserMetaData = function (uid) {
        return this.db.object('/users/' + uid);
    };
    AuthProvider.prototype.updateOnConnect = function () {
        var _this = this;
        return this.db.object('.info/connected').subscribe(function (connected) {
            if (connected) {
                var status_1 = connected.$value ? 'online' : 'offline';
                _this.updateStatus(status_1);
            }
        });
    };
    AuthProvider.prototype.updateOnDisconnect = function () {
        __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users/' + this.loggedUserId)
            .onDisconnect()
            .update({ status: 'offline', lastLogin: __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP });
    };
    AuthProvider.prototype.updateOnIdle = function () {
        var _this = this;
        this.mouseEvent = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"]
            .fromEvent(document, "mouseMove")
            .throttleTime(2000)
            .subscribe(function () {
            _this.updateStatus('online');
            _this.resetTimer();
        });
    };
    AuthProvider.prototype.resetTimer = function () {
        var _this = this;
        this.timer.unsubscribe();
        this.timer = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].timer(5000)
            .subscribe(function () {
            _this.updateStatus('away');
        });
    };
    AuthProvider.prototype.updateStatus = function (status) {
        this.db.object('users/' + this.loggedUserId).update({ 'status': status });
    };
    AuthProvider.prototype.register = function (email, pass) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.login = function (email, pass) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    };
    AuthProvider.prototype.fbLogin = function () {
        var _this = this;
        var fbAuth = this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].FacebookAuthProvider());
        fbAuth.then(function (res) {
            var data = res.user;
            console.log('res', res.user);
            _this.db.object('/users/' + data.uid).set({ email: data.email, photo: '', displayName: data.displayName, isVerified: true });
        });
        return fbAuth;
    };
    AuthProvider.prototype.googleLogin = function () {
        var _this = this;
        var googleAuth = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider());
        googleAuth.then(function (res) {
            var data = res.user;
            _this.db.object('/users/' + data.uid).set({ email: data.email, photo: data.photoURL, displayName: data.displayName, isVerified: true });
        });
        return googleAuth;
    };
    AuthProvider.prototype.createUser = function (uId, email, photo, name) {
        this.db.object('/users/' + uId).set({ email: email, photo: photo, displayName: name });
    };
    AuthProvider.prototype.loginVerified = function (uId) {
        var _this = this;
        // check first if user account already verified
        var user = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users/' + uId);
        user.once("value")
            .then(function (snapshot) {
            if (!snapshot.hasChild('isVerified')) {
                _this.db.object('/users/' + uId).update({ isVerified: true });
            }
        });
    };
    AuthProvider.prototype.loggedOut = function () {
        this.updateStatus('offline');
        this.afAuth.auth.signOut();
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/chats/chats.module": [
		468,
		9
	],
	"../pages/individual-chat/individual-chat.module": [
		469,
		8
	],
	"../pages/landing/landing.module": [
		470,
		7
	],
	"../pages/notifications/notifications.module": [
		471,
		6
	],
	"../pages/profile/profile.module": [
		472,
		5
	],
	"../pages/register/register.module": [
		473,
		4
	],
	"../pages/reset-password/reset-password.module": [
		474,
		3
	],
	"../pages/settings/settings.module": [
		475,
		2
	],
	"../pages/tabs/tabs.module": [
		476,
		1
	],
	"../pages/userslist/userslist.module": [
		477,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 208;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatProvider = (function () {
    function ChatProvider(http, db, afAuth) {
        var _this = this;
        this.http = http;
        this.db = db;
        this.afAuth = afAuth;
        this.usersRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users');
        this.chatArr = [];
        afAuth.authState.subscribe(function (user) {
            _this.user = _this.db.object('/users/' + user.uid, { preserveSnapshot: true });
            _this.user.subscribe(function (userData) {
                _this.user = userData.val();
                var photo;
                if (!('photo' in _this.user)) {
                    photo = 'none';
                }
                else {
                    photo = userData.val().photo;
                }
                _this.getLoggedUserPhoto(photo);
                _this.loggedUserId = userData.key;
                _this.loggedUserName = userData.val().displayName;
            });
        });
    }
    ChatProvider.prototype.getUsers = function () {
        this.users = this.db.list('/users', {
            query: {
                orderByChild: 'isVerified',
                equalTo: true
            }
        });
        return this.users;
    };
    ChatProvider.prototype.getLoggedUserPhoto = function (photo) {
        this.loggedUserPhoto = photo;
    };
    ChatProvider.prototype.getLoggedUserId = function () {
        return this.loggedUserId;
    };
    ChatProvider.prototype.chatMember = function (user2Id, user2) {
        var user1Id = this.loggedUserId;
        var user1 = this.loggedUserName;
        // let user2 = receiverId;
        var roomName = (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1);
        roomName = roomName.replace(/\ /g, '-');
        var obj = {};
        obj[user1] = true;
        obj[user2] = true;
        this.db.object('/chat_room/' + roomName).set(obj);
        this.roomName = roomName;
        return roomName;
    };
    ChatProvider.prototype.sendMessage = function (chatMsg, receiverId) {
        this.db.list('/chats/' + this.roomName).push({
            name: this.loggedUserName,
            senderPhoto: this.loggedUserPhoto,
            message: chatMsg,
            timestamp: __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"].ServerValue.TIMESTAMP
        });
        var unreadObj = {};
        unreadObj[this.roomName] = true;
        this.db.list("/users/" + receiverId + "/unreadMessage/").push(unreadObj);
    };
    ChatProvider.prototype.loadChats = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.chatArr = [];
            var chatRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/chats/" + _this.roomName + "/").limitToLast(2);
            chatRef.once('value', function (snapshot) {
                var snapObjs = snapshot.val();
            });
            chatRef.on('child_added', function (addedSnap) {
                if (!_this.firstKnownKey) {
                    _this.firstKnownKey = addedSnap.key;
                }
                addedSnap.val()['key'] = addedSnap.key;
                _this.chatArr.push(addedSnap.val());
                if (_this.chatArr.length >= 2) {
                    resolve(_this.chatArr);
                }
            });
        });
        return promise;
    };
    ChatProvider.prototype.scrollChats = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var chatRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/chats/" + _this.roomName + "/").orderByChild('timestamp').endAt(_this.firstKnownKey).limitToLast(2);
            console.log('this.firstKnownKey', _this.firstKnownKey);
            chatRef.once('value', function (snapshot) {
                var snapObjs = snapshot.val();
                for (var objKey in snapObjs) {
                    snapObjs[objKey].key = objKey;
                    _this.chatArr.unshift(snapObjs[objKey]);
                }
                console.log('this.chatArr', _this.chatArr);
                resolve(_this.chatArr);
            });
        });
        return promise;
    };
    ChatProvider.prototype.loadChatUsersFriendReq = function (loggedUserId) {
        return this.db.object("/users/" + loggedUserId + "/");
    };
    ChatProvider.prototype.getFriendMetaData = function (friendKey) {
        return this.db.object("/users/" + friendKey + "/");
    };
    ChatProvider.prototype.lastUreadMessage = function (roomName) {
        return this.db.object("/chats/" + roomName + "/");
    };
    ChatProvider.prototype.loadChatUsers = function (userId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var userArr = [];
            var userLoggedRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + _this.loggedUserId + "/unreadMessage/");
            var userRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + userId + "/friends/");
            userRef.once('value', function (snap) {
                var _loop_1 = function (userKey) {
                    if (snap.val()[userKey] == true) {
                        var userChildRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("users/" + userKey);
                        userChildRef.once('value', function (childSnap) {
                            var childObj = childSnap.val();
                            childObj.key = userKey;
                            var user1 = _this.loggedUserName;
                            var user2 = childSnap.val()['displayName'];
                            var roomName = (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1);
                            roomName = roomName.replace(/\ /g, '-');
                            var lastChatRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/chats/" + roomName + "/").limitToLast(1);
                            lastChatRef.on('value', function (lastChatRefSnap) {
                                var lastChatObj = lastChatRefSnap.val();
                                for (var lastChatKey in lastChatObj) {
                                    var lastMsg = lastChatObj[lastChatKey].message;
                                    var lastMsgTimeStamp = lastChatObj[lastChatKey].timestamp;
                                    childObj.lastMsg = lastMsg;
                                    childObj.lastMsgTimeStamp = lastMsgTimeStamp;
                                }
                            });
                            userLoggedRef.on('value', function (userLoggedRefSnap) {
                                var obj = userLoggedRefSnap.val();
                                var unreadCount = 0;
                                for (var key in obj) {
                                    for (var userKey_1 in obj[key]) {
                                        if (userKey_1 == roomName) {
                                            unreadCount++;
                                        }
                                    }
                                }
                                childObj.unreadCount = unreadCount;
                            });
                            userArr.push(childObj);
                            console.log('userArr', userArr);
                        });
                        var userStatusRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + userKey + "/");
                        userStatusRef.on('child_changed', function (userSnap) {
                            if (userSnap.ref.key == 'status') {
                                var userCounter = 0;
                                for (var _i = 0, userArr_1 = userArr; _i < userArr_1.length; _i++) {
                                    var userObj = userArr_1[_i];
                                    if (userObj.key == userKey) {
                                        userArr[userCounter].status = userSnap.val();
                                    }
                                    userCounter++;
                                }
                                resolve(userArr);
                            }
                        });
                    }
                };
                for (var userKey in snap.val()) {
                    _loop_1(userKey);
                }
            });
            userRef.on('child_changed', function (snap) {
                var userChildRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("users/" + snap.key);
                userChildRef.once('value', function (userSnap) {
                    userArr.push(userSnap.val());
                    resolve(userArr);
                });
            });
            resolve(userArr);
        });
        return promise;
    };
    ChatProvider.prototype.getRemoveUnreadMsg = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var userUnreadRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + _this.loggedUserId + "/unreadMessage/");
            userUnreadRef.once('value', function (snap) {
                var snapObj = snap.val();
                for (var snapParentKey in snapObj) {
                    for (var snapKey in snapObj[snapParentKey]) {
                        if (snapKey == _this.roomName) {
                            userUnreadRef.child(snapParentKey).remove();
                        }
                    }
                }
            });
        });
        return promise;
    };
    return ChatProvider;
}());
ChatProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
], ChatProvider);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushnotifProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PushnotifProvider = (function () {
    function PushnotifProvider(db, afAuth) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.messaging = __WEBPACK_IMPORTED_MODULE_3_firebase__["messaging"]();
        this.currentMessage = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.afAuth.authState.subscribe(function (user) {
            _this.userLoggedId = user.uid;
        });
    }
    PushnotifProvider.prototype.updateToken = function (token) {
        var _this = this;
        this.afAuth.authState.take(1).subscribe(function (user) {
            console.log('updated . . .');
            if (!user)
                return;
            var data = (_a = {}, _a[user.uid] = token, _a);
            _this.db.object('/fcmTokens/').update(data);
            var _a;
        });
    };
    PushnotifProvider.prototype.getPermission = function () {
        var _this = this;
        this.messaging.requestPermission()
            .then(function () {
            console.log('Notification permission granted.');
            return _this.messaging.getToken();
        })
            .then(function (token) {
            console.log(token);
            _this.updateToken(token);
        })
            .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
    };
    PushnotifProvider.prototype.receiveMessage = function () {
        var _this = this;
        this.messaging.onMessage(function (payload) {
            console.log("Message received. ", payload);
            _this.currentMessage.next(payload);
        });
    };
    return PushnotifProvider;
}());
PushnotifProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], PushnotifProvider);

//# sourceMappingURL=pushnotif.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotifProvider = (function () {
    function NotifProvider(http, db, afAuth) {
        this.http = http;
        this.db = db;
        this.afAuth = afAuth;
    }
    NotifProvider.prototype.getNotifCount = function (userId) {
        return this.db.list("/notification/" + userId);
    };
    NotifProvider.prototype.getUnreadMsgCount = function (userId) {
        return this.db.list("/users/" + userId + "/unreadMessage/");
    };
    NotifProvider.prototype.loadListOfNotif = function (userId) {
        return this.db.list("/notification/" + userId);
    };
    NotifProvider.prototype.acceptFriendRequest = function (acceptorId, senderUserId, notifKey) {
        var _this = this;
        console.log('senderId', senderUserId);
        console.log('acceptorId', acceptorId);
        var promise = new Promise(function (resolve, reject) {
            var removeNotif = _this.db.object("/notification/" + acceptorId + "/" + notifKey).remove(); // remove the notification nodes under notif key.
            removeNotif.then(function (success) {
                __WEBPACK_IMPORTED_MODULE_5_firebase__["database"]().ref("/notification/" + senderUserId + "/").push({
                    senderId: acceptorId,
                    description: 'accepted',
                    dateAdded: __WEBPACK_IMPORTED_MODULE_5_firebase__["database"].ServerValue.TIMESTAMP
                });
                var $obj1 = {};
                $obj1[senderUserId] = true;
                var updateUser1 = _this.db.object("/users/" + acceptorId + "/friends/").update($obj1);
                var $obj2 = {};
                $obj2[acceptorId] = true;
                var updateUser2 = _this.db.object("/users/" + senderUserId + "/friends/").update($obj2);
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    NotifProvider.prototype.getUserData = function (userId) {
        var promise = new Promise(function (resolve, reject) {
            var userRef = __WEBPACK_IMPORTED_MODULE_5_firebase__["database"]().ref("users");
            var userChildRef = userRef.child(userId);
            userChildRef.once('value', function (snapshot) {
                resolve(snapshot.val());
            });
        });
        return promise;
    };
    return NotifProvider;
}());
NotifProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], NotifProvider);

//# sourceMappingURL=notif.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserProvider = (function () {
    function UserProvider(http, afAuth, afdb) {
        var _this = this;
        this.http = http;
        this.afAuth = afAuth;
        this.afdb = afdb;
        this.usersRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('users/');
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.loggedUserId = user.uid;
            }
        });
    }
    UserProvider.prototype.users = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var dbRefUsers = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref().child('users'); // create reference to users
            var usersArr = [];
            var removeUser = [];
            dbRefUsers.once('value', function (childSnap) {
                var _loop_1 = function (key) {
                    var childObj = childSnap.val()[key]; // create a variable that hold the obj
                    var friendListUpdate = function () {
                        if ('friends' in childObj) {
                            for (var friendKey in childObj.friends) {
                                if (friendKey == _this.loggedUserId) {
                                    removeUser.push(childObj.email);
                                }
                            }
                        }
                        if (key == _this.loggedUserId) {
                            removeUser.push(childObj.email);
                        }
                        var countUser = 0;
                        for (var _i = 0, usersArr_1 = usersArr; _i < usersArr_1.length; _i++) {
                            var user = usersArr_1[_i];
                            if (removeUser.indexOf(user.email) != -1) {
                                usersArr.splice(countUser, 1);
                            }
                            countUser++;
                        }
                    };
                    friendListUpdate();
                    var dbRefList = dbRefUsers.child(key); // create a child reference of the users
                    dbRefList.on('child_changed', function (snap) {
                        childObj[snap.key] = snap.val();
                        resolve(usersArr);
                    });
                    usersArr.push(childObj);
                    var dbRefListAdded = dbRefUsers.child(key); // create a child reference of the users
                    dbRefListAdded.on('child_added', function (snap) {
                        childObj[snap.key] = snap.val();
                        childObj['key'] = key;
                        friendListUpdate();
                        resolve(usersArr);
                    });
                };
                for (var key in childSnap.val()) {
                    _loop_1(key);
                }
                resolve(usersArr);
            });
        });
        return promise;
    };
    UserProvider.prototype.userDetails = function (userId) {
        return this.afdb.object("/users/" + userId);
    };
    UserProvider.prototype.sendFriendRequest = function (recipient) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // insert new notification
            __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/notification/" + recipient.key + "/").push({
                senderId: _this.loggedUserId,
                description: 'requested',
                dateAdded: __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"].ServerValue.TIMESTAMP
            });
            // add to users->friends node
            var addFriendsToUser1 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + recipient.key + "/friends/" + _this.loggedUserId).set('false');
            var addFriendsToUser2 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("/users/" + _this.loggedUserId + "/friends/" + recipient.key).set('false');
            resolve(addFriendsToUser2);
        });
        return promise;
        //   let promise = new Promise((resolve, reject) => {
        //     // insert new notification
        //     firebase.database().ref(`/notification/${recipient.key}`).push({
        //       senderId: this.loggedUserId,
        //       description: 'requested',
        //       dateAdded: firebase.database.ServerValue.TIMESTAMP
        //     });
        //     // add friendReq node to the sender user
        //     firebase.database().ref(`users/${this.loggedUserId}/friendReq/${recipient.key}`).set('false');
        //     // add friend node to the recipient user
        //     let friendReq =  firebase.database().ref(`users/${recipient.key}/friends/${this.loggedUserId}`).set('false');
        //     resolve(friendReq);
        //   });
        //   return promise;
        // }
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
], UserProvider);

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(321);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_chat_chat__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_user_user__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_pushnotif_pushnotif__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_notif_notif__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Firebase Imports



// Auth Service



// Providers




// Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyAAGkJZJsX9QGUEkKzx_ZEEzQWFJJ27oEs",
    authDomain: "ionicapp-2e811.firebaseapp.com",
    databaseURL: "https://ionicapp-2e811.firebaseio.com",
    storageBucket: "ionicapp-2e811.appspot.com",
    messagingSenderId: "1063432282060"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                tabsPlacement: 'top',
                tabsHideOnSubPages: true
            }, {
                links: [
                    { loadChildren: '../pages/chats/chats.module#ChatsPageModule', name: 'ChatsPage', segment: 'chats', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/individual-chat/individual-chat.module#IndividualChatPageModule', name: 'IndividualChatPage', segment: 'individual-chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/userslist/userslist.module#UserslistPageModule', name: 'UserslistPage', segment: 'userslist', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_pushnotif_pushnotif__["a" /* PushnotifProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_notif_notif__["a" /* NotifProvider */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["c" /* DatePipe */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authProvider, storage) {
        var _this = this;
        this.authProvider = authProvider;
        this.storage = storage;
        this.rootPage = 'LandingPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                if (user.emailVerified) {
                    _this.rootPage = 'TabsPage';
                }
                else {
                    _this.rootPage = 'LandingPage';
                }
            }
            else {
                _this.rootPage = 'LandingPage';
            }
        });
        // storage.get('userId').then((user) => {
        //   if(user != null) {
        //     this.rootPage = 'TabsPage';
        //   }else {
        //     this.rootPage = 'LandingPage';
        //   }
        // });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[305]);
//# sourceMappingURL=main.js.map