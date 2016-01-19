var Ti;
Titanium.UI.orientation = Titanium.UI.PORTRAIT;
var screenwidth = Ti.Platform.displayCaps.platformWidth;
var screenheight = Ti.Platform.displayCaps.platformHeight;
// var blur = require('bencoding.blur');
var styedlabel = require('ti.styledlabel');
var dbFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'bizdir.sqlite');
var filedb = Ti.Filesystem.getApplicationDataDirectory() + 'bizdir.sqlite';



Ti.include(
// libraries
'class/cs.js');

BizDir.apiurl = 'http://www.bizdir.id/';
BizDir.locationArea = 'Indonesia';
BizDir.locationID = 0;
BizDir.cityID = null;
BizDir.bgImage = 'images/bg_1.jpg';
BizDir.provinceImage = 'images/logo_bizdir.png';
BizDir.blurImage = 'images/bg_1.jpg';

BizDir.winisOpen = false;
BizDir.winCatOpen = false;

Ti.include(
    'class/ui.js',
    'class/db.js',
    'class/datetime.js');


BizDir.latitude = '-7.977148908184675'; //e.coords.longitude;
BizDir.longitude = '112.6340644359741'; //e.coords.latitude;
//gps start to get current location
Titanium.Geolocation.purpose = "GPS user coordinates";
Titanium.Geolocation.distanceFilter = 10; // set the granularity of the location event

Titanium.Geolocation.getCurrentPosition(function (e) {
    if (e.error) {
        return;
    }

    BizDir.longitude = e.coords.longitude;
    BizDir.latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
});

Titanium.Geolocation.addEventListener('location', function (e) {
    if (e.error) {
        // manage the error
        return;
    }

    BizDir.longitude = e.coords.longitude;
    BizDir.latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
});

if (!BizDir.isAndroid()) {
    Titanium.Geolocation.purpose = "For GPS Application";
    Titanium.Geolocation.distanceFilter = 10;
    Titanium.Geolocation.PROVIDER_GPS;
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
}

var authoGeo = true;

if (Titanium.Geolocation.locationServicesEnabled === false) {
    Titanium.UI.createAlertDialog({
        title: 'BizDir',
        message: 'Your device has GPS turned off - turn it on.'
    }).show();
    authoGeo = false;
} else {
    if (Titanium.Platform.name !== 'android') {
        var authorization = Titanium.Geolocation.locationServicesAuthorization;

        if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
            Ti.UI.createAlertDialog({
                title: 'BizDir',
                message: 'You have disallowed BizDir from running geolocation services.'
            }).show();
            authoGeo = false;
        } else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
            Ti.UI.createAlertDialog({
                title: 'BizDir',
                message: 'Your system has disallowed BizDir from running geolocation services.'
            }).show();
            authoGeo = false;
        }
    }
}
// 
// BizDir.createDatabase();
// 
var menu = [{
    title: 'Search',
    icon: 'icon_3.png',
    id: 0
}, {
    title: 'Favorite',
    icon: 'icon_4.png',
    id: 1
}, {
    title: 'Category',
    icon: 'icon_5.png',
    id: 2
}, {
    title: 'Opportunities',
    icon: 'icon_15.png',
    id: 11
}, {
    title: 'News',
    icon: 'icon_6.png',
    id: 3
}, {
    title: 'Forum',
    icon: 'icon_7.png',
    id: 4
}, {
    title: 'Promotion',
    icon: 'icon_9.png',
    id: 5
}, {
    title: 'Event Calendar',
    icon: 'icon_10.png',
    id: 6
},
// {title:'Download',icon:'icon_11.png', id:7},
{
    title: 'About',
    icon: 'icon_12.png',
    id: 8
}, {
    title: 'FAQ',
    icon: 'icon_13.png',
    id: 9
}, {
    title: 'Logout',
    icon: 'icon_14.png',
    id: 10
}

];

function download() {
    var xhr = Titanium.Network.createHTTPClient();
    var apiurl = 'http://www.bizdir.id/v2/api/download';
    // Ti.API.info('URL : '+apiurl);
    var params = {
        'phoneid': Titanium.Platform.id,
            'phonetype': 'iOS'
    };
    xhr.username = 'bizdir';
    xhr.password = 'm4Pl1x231';

    xhr.open('POST', apiurl);
    xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
    xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
    xhr.send(params);
    // Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
    xhr.onload = function () {
        Ti.API.info('Response : ' + this.responseText);
        var json = JSON.parse(this.responseText);
    };

    xhr.onerror = function (e) {
        // dialog.show();
        // Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
        Ti.API.info('Something Wrong ::> ' + e.error);
    };
}
// 4A2493C6-A6B2-4797-B7AB-6CE9CADBA6B7
Ti.API.info('UDID ' + Titanium.Platform.id);
// download();
Ti.API.info('App ID', Titanium.App.id);

var slideUp = Ti.UI.createAnimation();
slideUp.bottom = screenwidth;
slideUp.duration = 300;


if (BizDir.ui.device == 'ipad') {
	 Ti.include(
        
        '/ui/homeWindow.js',
        '/ui/areaSearchWindow.js',
        '/ui/faveWindow.js',
        '/ui/categoryWindow.js',
        '/ui/businessWindow.js',
        '/ui/common/peluang/peluangTab1.js',
        '/ui/common/peluang/peluangTab2.js',
        '/ui/common/peluang/peluangTab3.js',
        '/ui/common/peluang/peluangTab4.js',
        '/ui/common/peluang/peluangPages.js',
        '/ui/newsWindow.js',
        '/ui/forumWindow.js',
        '/ui/promotionWindow.js',
        '/ui/calendarWindow.js',
        '/ui/common/calendar/tab2Window.js',
        '/ui/common/calendar/tab3Window.js',
        '/ui/common/calendar/eventWindow.js',
        '/ui/aboutWindow.js',
        '/ui/faqWindow.js',
        
        '/ui/loginWindow.js',
        '/ui/common/weatherWindow.js',
        '/ui/common/profileWindow.js',
        '/ui/welcomeScreen.js',        
        '/ui/tablet/app.js'
     );
} else {

    Ti.include(
        '/ui/homeWindow.js',
        '/ui/categoryWindow.js',
        '/ui/newsWindow.js',
        '/ui/calendarWindow.js',
        '/ui/businessWindow.js',
        '/ui/common/peluang/peluangTab1.js',
        '/ui/common/peluang/peluangTab2.js',
        '/ui/common/peluang/peluangTab3.js',
        '/ui/common/peluang/peluangTab4.js',
        '/ui/common/peluang/peluangPages.js',
        '/ui/common/calendar/tab2Window.js',
        '/ui/common/calendar/tab3Window.js',
        '/ui/common/calendar/eventWindow.js',
        '/ui/faveWindow.js',
        '/ui/aboutWindow.js',
        '/ui/faqWindow.js',
        '/ui/forumWindow.js',
        '/ui/promotionWindow.js',
        '/ui/welcomeScreen.js',
        '/ui/areaSearchWindow.js',
        '/ui/loginWindow.js',
        '/ui/common/weatherWindow.js',
        '/ui/common/profileWindow.js');
    // 
    

    var winLeft = Ti.UI.createWindow({
        barColor: '#2892ff',
        tintColor: "#2892ff",
        backgroundImage: '/images/optionmenu/bg_1.jpg',
        navBarHidden: false,
        fullscreen: false
    });

    var imageOverlay = Ti.UI.createImageView({
        width: screenwidth,
        height: screenheight,
        image: 'images/optionmenu/fg_1.png',
        top: 0
    });

    winLeft.add(imageOverlay);

    var leftTableView = Ti.UI.createTableView({
        backgroundColor: 'transparent',
        separatorColor: 'transparent',
        // height:350:
        center: 1
    });

    var winNav;
    var userLogoLabel;
    var userLabel;
    var tabbar = Ti.UI.createView({
		width:0,
		height:0
	});
	
	var tabbar2 = Ti.UI.createView({
		width:0,
		height:0
	});

    var filltableRow = function (data) {
        var tableData = [];
        var userrow = Ti.UI.createTableViewRow({
            hasChild: false,
            backgroundColor: 'transparent',
            height: 120
        });

        var wrapper = Ti.UI.createView({
            width: screenwidth,
            backgroundColor: 'transparent',
            height: 120
        });

        var userView = Ti.UI.createView({
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#ccc',
            left: 10,
            opacity: 0.7,
        });
        var char1 = 'A';
        var textUser = "";
        if (Titanium.App.Properties.getString('name') !== null) {
            char1 = Titanium.App.Properties.getString('name').charAt(0);
            textUser = Titanium.App.Properties.getString('name');
        }

        userLogoLabel = Ti.UI.createLabel({
            width: 40,
            height: 40,
            color: '#fff',
            textAlign: 'center',
            font: {
                fontSize: 38,
                fontWeight: 'normal',
                fontFamily: 'HelveticaNeue'
            },
            text: char1
        });

        userView.add(userLogoLabel);

        userLabel = Ti.UI.createLabel({
            width: screenwidth - 110,
            height: 100,
            left: 100,
            color: '#fff',
            font: {
                fontSize: 28,
                fontWeight: 'normal',
                fontFamily: 'HelveticaNeue'
            },
            text: textUser
        });

        wrapper.add(userView);
        wrapper.add(userLabel);
        userrow.add(wrapper);

        userrow.addEventListener('click', function () {
            window.setCenterWindow(profileWindow());
            window.toggleLeftView();
        });

        tableData.push(userrow);
        for (var i = 0; i < data.length; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                backgroundColor: 'transparent',
                height: 50,
                data: data[i]
            });

            var viewMenu = Ti.UI.createView({
                height: 50,
                width: screenwidth,
                data: data[i]
            });

            var iconLabel = Ti.UI.createImageView({
                left: 30,
                top: 12,
                width: 25,
                height: 25,
                image: '/images/optionmenu/' + data[i].icon,
                data: data[i]
            });

            var titleLabel = Ti.UI.createLabel({
                font: {
                    fontSize: 18,
                    fontWeight: 'light',
                    fontFamily: 'Helvetica Neue'
                },
                left: 80,
                text: data[i].title,
                color: '#ffffff',
                textAlign: 'left',
                width: screenwidth - 50,
                data: data[i]
            });

            viewMenu.add(iconLabel);
            viewMenu.add(titleLabel);
            row.add(viewMenu);

            row.addEventListener('click', function (e) {
                Ti.API.info('Click ID ' + e.source.data.id);
                if (e.source.data.id === 0) {
                    window.setCenterWindow(homeWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 1) {
                    window.setCenterWindow(faveWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 2) {
                    window.setCenterWindow(categoryWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 3) {
                    window.setCenterWindow(newsWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 4) {
                    window.setCenterWindow(forumWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 5) {
                    window.setCenterWindow(promotionWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 6) {
                    window.setCenterWindow(calendarWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.show();
                } else if (e.source.data.id === 8) {
                    window.setCenterWindow(aboutWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 9) {
                    window.setCenterWindow(faqWindow());
                    window.toggleLeftView();
                    tabbar.hide();
                	tabbar2.hide();
                } else if (e.source.data.id === 11) {
                    window.setCenterWindow(peluangWindow());
                    window.toggleLeftView();
                    tabbar.show();
                	tabbar2.hide();
                } else if (e.source.data.id === 10) {
                    Ti.App.Properties.setString('uid', null);
                    Ti.App.Properties.setString('name', null);
                    tabbar.hide();
                	tabbar2.hide();
                    BizDir.ui.createLoginWindow().open();
                    
                }
            });
            tableData.push(row);
        }
        leftTableView.data = tableData;
    };

    filltableRow(menu);

    Ti.App.addEventListener('doneLogin', function (data) {
        userLabel.text = Titanium.App.Properties.getString('name');
        userLogoLabel.text = Titanium.App.Properties.getString('name').charAt(0);
    });

    winLeft.add(leftTableView);

    var homeWindow = function () {
        BizDir.navGroup = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createHomeWindow()
        });

        return BizDir.navGroup;
    };

    var categoryWindow = function () {
        BizDir.navGroupCat = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createCategoryWindow()
        });

        return BizDir.navGroupCat;
    };

    var promotionWindow = function () {
        BizDir.navGroupPromotion = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createPromotionWindow()
        });

        return BizDir.navGroupPromotion;
    };

    var aboutWindow = function () {
        BizDir.navGroupAbout = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createAboutWindow()
        });
        return BizDir.navGroupAbout;
    };


    var faqWindow = function () {
        BizDir.navGroupFaq = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createFaqWindow()
        });

        return BizDir.navGroupFaq;
    };

    var newsWindow = function () {
        BizDir.navGroupNews = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createNewsWindow()
        });

        return BizDir.navGroupNews;
    };

    var faveWindow = function () {
        BizDir.navGroupFave = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createFaveWindow()
        });

        return BizDir.navGroupFave;
    };

    var forumWindow = function () {
        BizDir.navGroupForum = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createForumWindow()
        });

        return BizDir.navGroupForum;
    };

    var profileWindow = function () {
        BizDir.navGroupProfile = Ti.UI.iOS.createNavigationWindow({
            window: BizDir.ui.createProfileWindow()
        });

        return BizDir.navGroupProfile;
    };

    var calendarWindow = function () {
        BizDir.calendarGroup = Ti.UI.createTabGroup({
            navBarHidden: true,
            barColor: '#fff',
            title: 'Event Calendar',
            translucent: true,
            extendEdges: [Ti.UI.EXTEND_EDGE_TOP],
            tabsBackgroundColor: '#fff',
            // bottom:-50
        });

        BizDir.calendarTab1 = Titanium.UI.createTab({
            window: BizDir.ui.createCalendarTab1Window(),
            width: screenwidth / 3,
            title: ' Kadin',
            icon: 'images/icon/icon_kadin.png'
        });

        BizDir.calendarTab2 = Titanium.UI.createTab({
            window: BizDir.ui.createCalendarTab2Window(),
            width: screenwidth / 3,
            title: ' Seminar',
            icon: 'images/icon/icon_seminar.png'
        });

        BizDir.calendarTab3 = Titanium.UI.createTab({
            window: BizDir.ui.createCalendarTab3Window(),
            width: screenwidth / 3,
            title: ' Exhibition',
            icon: 'images/icon/icon_exhibition.png'
        });

        BizDir.calendarGroup.addTab(BizDir.calendarTab1);
        BizDir.calendarGroup.addTab(BizDir.calendarTab2);
        BizDir.calendarGroup.addTab(BizDir.calendarTab3);

		// tabbar2 = new BizDir.ui.CustomTabBar({
		    // tabBar: BizDir.calendarGroup,
		    // imagePath: 'images/icon/',    
		    // height: 56,
		    // tabWidth:screenwidth,
		    // backgroundColor:'#1e5c69',
		    // activeBackgroundColor:'#0a434f',
		    // items: [
		        // { image: 'icon_kadin.png', selected: 'icon_kadin-active.png' , width: screenwidth / 3, title:'Kadin'},
		        // { image: 'icon_seminar.png', selected: 'icon_seminar-active.png', width: screenwidth / 3, title:'Seminar'},
		        // { image: 'icon_exhibition.png', selected: 'icon_exhibition-active.png' , width: screenwidth / 3, title:'Exhibition'}
		    // ]
		// });

        BizDir.calendarGroup.setActiveTab(0);
        

        return BizDir.calendarGroup;
    };

    var peluangWindow = function () {
        BizDir.peluangGroup = Ti.UI.createTabGroup({
            navBarHidden: true,
            barColor: '#fff',
            title: 'Business Opportunities',
            translucent: true,
            extendEdges: [Ti.UI.EXTEND_EDGE_TOP],
            tabsBackgroundColor: '#fff',
            // bottom:-50
        });

        BizDir.peluangTab1 = Titanium.UI.createTab({
            window: BizDir.ui.createPeluangTab1Window(),
            width: screenwidth / 4,
            title: ' Sell Offers',
            icon: 'images/peluang/icon-sell-offers.png'
        });

        BizDir.peluangTab2 = Titanium.UI.createTab({
            window: BizDir.ui.createPeluangTab2Window(),
            width: screenwidth / 4,
            title: ' Buying Needs',
            icon: 'images/peluang/icon-buying-needs.png'
        });

        BizDir.peluangTab3 = Titanium.UI.createTab({
            window: BizDir.ui.createPeluangTab3Window(),
            width: screenwidth / 4,
            title: ' Bid/Tender',
            icon: 'images/peluang/icon_bid-tender.png'
        });

        BizDir.peluangTab4 = Titanium.UI.createTab({
            window: BizDir.ui.createPeluangTab4Window(),
            width: screenwidth / 4,
            title: ' Partnership',
            icon: 'images/peluang/icon_partnership.png'
        });

        BizDir.peluangGroup.addTab(BizDir.peluangTab1);
        BizDir.peluangGroup.addTab(BizDir.peluangTab2);
        BizDir.peluangGroup.addTab(BizDir.peluangTab3);
        BizDir.peluangGroup.addTab(BizDir.peluangTab4);

		// tabbar = new BizDir.ui.CustomTabBar({
		    // tabBar: BizDir.peluangGroup,
		    // imagePath: 'images/peluang/',    
		    // height: 56,
		    // tabWidth:screenwidth,
		    // backgroundColor:'#1e5c69',
		    // activeBackgroundColor:'#0a434f',
		    // items: [
		        // { image: 'icon-sell-offers.png', selected: 'icon-sell-offers-active.png' , width: screenwidth / 4, title:'Sell Offers'},
		        // { image: 'icon-buying-needs.png', selected: 'icon-buying-needs-active.png', width: screenwidth / 4, title:'Buying Needs'},
		        // { image: 'icon_bid-tender.png', selected: 'icon_bid-tender-active.png' , width: screenwidth / 4, title:'bid/Tender'},
		        // { image: 'icon_partnership.png', selected: 'icon_partnership-active.png' , width: screenwidth / 4, title:'Partnership'}
		    // ]
		// });

        BizDir.peluangGroup.setActiveTab(0);

        return BizDir.peluangGroup;
    };

    var navController = homeWindow();
    ////////////////////////////////////////////////
    // NappSlideMenu WINDOW
    var NappSlideMenu = require('dk.napp.slidemenu');

    var window = NappSlideMenu.createSlideMenuWindow({
        centerWindow: navController,
        leftWindow: winLeft,
        leftLedge: 70
    });



    window.addEventListener("viewWillOpen", function (e) {
        // Ti.API.info(e);
    });
    window.addEventListener("viewWillClose", function (e) {
        // Ti.API.info(e);
    });

    window.addEventListener("viewDidOpen", function (e) {
        // Ti.API.info(e);
    });
    window.addEventListener("viewDidClose", function (e) {
        // Ti.API.info(e);
    });

    window.addEventListener("didChangeOffset", function (e) {
        //Ti.API.info(e);
    });
    window.addEventListener("centerViewDidShow", function (e) {
        // Ti.API.info(e);
    });

    // window.open(); //init the app

    //install DB from local
    var db = Ti.Database.install('ui/bizdir.sqlite', 'BizDir');
	dbFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'bizdir.sqlite');

    Ti.API.info('Path ' + Ti.Filesystem.getApplicationDataDirectory());

    if (dbFile.exists()) {
        function checkversionDatabase() {
            var xhr = Titanium.Network.createHTTPClient();
            var apiurl = 'http://www.bizdir.id/v2/api/version';

            xhr.username = 'bizdir';
            xhr.password = 'm4Pl1x231';

            xhr.open('GET', apiurl);
            xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
            xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
            xhr.send();

            xhr.onload = function (data) {
                Ti.API.info('Version: ' + this.responseData);                
                var json = JSON.parse(this.responseText);
                var query = BizDir.selectVersion();
                var version = query.version;
                var lastUpdate = query.lastUpdate;
                Ti.API.info('Date Version : '+lastUpdate+' !== '+json.date);
                if (version !== json.version) {
                    //update db
                    
                    if (lastUpdate !== json.date) {
                        var welcome = BizDir.ui.createWelcomeScreen();
                        welcome.open();
                    }
                } else {
                    if (lastUpdate !== json.date) {
                        var welcome = BizDir.ui.createWelcomeScreen();
                        welcome.open();
                    }
                }
            };
            xhr.onerror = function (e) {
                Ti.API.info('Something Wrong ::> ' + e.error);
                window.open(); //init the app
            };
        }

        // checkversionDatabase();

        // Ti.API.info('App Username '+Titanium.App.Properties.getString('name')); 	
        if (Titanium.App.Properties.getString('name') == '' || Titanium.App.Properties.getString('name') == null) {
            BizDir.ui.createLoginWindow().open();
        } else {
            window.open(); //init the app
        }
    } else {
        // var welcome = BizDir.ui.createWelcomeScreen();
        // welcome.open();
        window.open(); //init the app
    }
}