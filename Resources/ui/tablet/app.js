var fullwidth = Ti.Platform.displayCaps.platformWidth;
var screenwidth = Ti.Platform.displayCaps.platformWidth - 190;
var screenheight = Ti.Platform.displayCaps.platformHeight;
// var blur = require('bencoding.blur');
var styedlabel = require('ti.styledlabel');
var dbFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'bizdir.sqlite');	
var filedb = Ti.Filesystem.getApplicationDataDirectory()+'bizdir.sqlite';
//defined tabbar as view
var tabbar = Ti.UI.createView({
	width:0,
	height:0
});

var tabbar2 = Ti.UI.createView({
	width:0,
	height:0
});
var userLogoLabel;
var userLabel;

var NappSlideMenu = require('dk.napp.slidemenu');

var blurBG = Ti.UI.createImageView({
	height:Ti.UI.FILL, width:Ti.UI.FILL,
	image:BizDir.bgImage,
	// blur:{
		// type:blur.GAUSSIAN_BLUR, radiusInPixels:2.5
	// },
	top:0,left:0
});

var userView = Ti.UI.createView({
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    top: 0,
    opacity: 0.7,
});
var char1 = 'A';
var textUser = "";
if (Titanium.App.Properties.getString('name') !== null) {
    char1 = Titanium.App.Properties.getString('name').charAt(0);
    textUser = Titanium.App.Properties.getString('name');
}

var wrapper = Ti.UI.createView({
    width: 95,
    backgroundColor: 'transparent',
    height: 160,
    top: 50,
});

userLogoLabel = Ti.UI.createLabel({
    width: 25,
    height: 25,
    color: '#fff',
    textAlign: 'center',
    font: {
        fontSize: 25,
        fontWeight: 'normal',
        fontFamily: 'HelveticaNeue'
    },
    text: char1
});

userLabel = Ti.UI.createLabel({
    width: 95,
    height: Ti.UI.SIZE,
    color: '#fff',
    font: {
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'HelveticaNeue'
    },
    text: textUser,
    top:60,
    textAlign:'center'
});

userView.add(userLogoLabel);
wrapper.add(userView);
wrapper.add(userLabel);
wrapper.addEventListener('click', function () {
    window.setCenterWindow(profileWindow());
    // window.toggleLeftView();
});

var leftMenu = Ti.UI.createView({
	width:95,
	height:screenheight,
	backgroundColor:'transparent',
	left:0
});

leftMenu.add(wrapper);

var menuWrapper = Ti.UI.createView({
	width:95,
	height:600,
	layout:'vertical'
});

function padMenu(data){
	for (var i=0; i < data.length; i++) {
		Ti.API.info('Menu '+i);
		var btnWrapper = Ti.UI.createButton({
			width:95,
			height:60,
			style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
			data:data[i]
		});
		
		var menuIcon = Ti.UI.createImageView({
			width:18,
			height:18,
			image:'/images/optionmenu/' +data[i].icon,
			data:data[i],
			top:0
		});
		
		var labelIcon = Ti.UI.createLabel({
			width:95,
			height:20,
			bottom:10,
			data:data[i],
			text:data[i].title,
			color:'#fff',
			textAlign:'center',
			font: {
		        fontSize: 12,
		        fontWeight: 'normal',
		        fontFamily: 'HelveticaNeue'
		    },
		});
		
		btnWrapper.add(menuIcon);
		btnWrapper.add(labelIcon);
		btnWrapper.addEventListener('click', function(e){
			Ti.API.info('Click ID ' + e.source.data.id);
            if (e.source.data.id === 0) {
                window.setCenterWindow(homeWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 1) {
                window.setCenterWindow(faveWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 2) {
                window.setCenterWindow(categoryWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 3) {
                window.setCenterWindow(newsWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 4) {
                window.setCenterWindow(forumWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 5) {
                window.setCenterWindow(promotionWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.hide();
            } else if (e.source.data.id === 6) {
                window.setCenterWindow(calendarWindow());
                // window.toggleLeftView();
                tabbar.hide();
                tabbar2.show();
            } else if (e.source.data.id === 8) {
                window.setCenterWindow(aboutWindow());
                // window.toggleLeftView();
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
		
		menuWrapper.add(btnWrapper);
	};
};



var centerWindow = Ti.UI.createWindow({
	width:screenwidth,
	height:screenheight,
	backgroundColor:'#fff',
	opacity:0.8,
	navBarHidden:false
});

var profileWindow = function () {
    BizDir.navGroupProfile = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createProfileWindow()
    });

    return BizDir.navGroupProfile;
};


var homeWindow = function () {
    BizDir.navGroup = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createHomeWindow(),
        width:screenwidth        
    });

    return BizDir.navGroup;
};

var faveWindow = function () {
    BizDir.navGroupFave = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createFaveWindow()
    });

    return BizDir.navGroupFave;
};

var categoryWindow = function () {
    BizDir.navGroupCat = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createCategoryWindow()
    });

    return BizDir.navGroupCat;
};

var peluangWindow = function () {
    BizDir.peluangGroup = Ti.UI.createTabGroup({
        navBarHidden: true,
        barColor: '#fff',
        title: 'Business Opportunities',
        translucent: true,
        extendEdges: [Ti.UI.EXTEND_EDGE_TOP],
        tabsBackgroundColor: '#fff',
        bottom:-50
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
	
	tabbar = new BizDir.ui.CustomTabBar({
	    tabBar: BizDir.peluangGroup,
	    imagePath: 'images/peluang/',    
	    height: 56,
	    tabWidth:screenwidth,
	    backgroundColor:'#1e5c69',
	    activeBackgroundColor:'#0a434f',
	    items: [
	        { image: 'icon-sell-offers.png', selected: 'icon-sell-offers-active.png' , width: screenwidth / 4, title:'Sell Offers'},
	        { image: 'icon-buying-needs.png', selected: 'icon-buying-needs-active.png', width: screenwidth / 4, title:'Buying Needs'},
	        { image: 'icon_bid-tender.png', selected: 'icon_bid-tender-active.png' , width: screenwidth / 4, title:'bid/Tender'},
	        { image: 'icon_partnership.png', selected: 'icon_partnership-active.png' , width: screenwidth / 4, title:'Partnership'}
	    ]
	});
	
    BizDir.peluangGroup.setActiveTab(0);

    return BizDir.peluangGroup;
};

var newsWindow = function () {
    BizDir.navGroupNews = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createNewsWindow()
    });

    return BizDir.navGroupNews;
};

var forumWindow = function () {
    BizDir.navGroupForum = Ti.UI.iOS.createNavigationWindow({
        window: BizDir.ui.createForumWindow()
    });

    return BizDir.navGroupForum;
};

var calendarWindow = function () {
    BizDir.calendarGroup = Ti.UI.createTabGroup({
        navBarHidden: true,
        barColor: '#fff',
        title: 'Event Calendar',
        translucent: true,
        extendEdges: [Ti.UI.EXTEND_EDGE_TOP],
        tabsBackgroundColor: '#fff',
        bottom:-50
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

	tabbar2 = new BizDir.ui.CustomTabBar({
	    tabBar: BizDir.calendarGroup,
	    imagePath: 'images/icon/',    
	    height: 56,
	    tabWidth:screenwidth,
	    backgroundColor:'#1e5c69',
	    activeBackgroundColor:'#0a434f',
	    items: [
	        { image: 'icon_kadin.png', selected: 'icon_kadin-active.png' , width: screenwidth / 3, title:'Kadin'},
	        { image: 'icon_seminar.png', selected: 'icon_seminar-active.png', width: screenwidth / 3, title:'Seminar'},
	        { image: 'icon_exhibition.png', selected: 'icon_exhibition-active.png' , width: screenwidth / 3, title:'Exhibition'}
	    ]
	});

    BizDir.calendarGroup.setActiveTab(0);

    return BizDir.calendarGroup;
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

var window = NappSlideMenu.createSlideMenuWindow({
   centerWindow: homeWindow(),
   backgroundImage:BizDir.blurImage,
   width:fullwidth
});

padMenu(menu);
leftMenu.add(menuWrapper);

Ti.App.addEventListener('updatePadHome', function(data) 
{ 	
	Ti.API.info('Fire '+BizDir.blurImage);
	
	window.backgroundImage = BizDir.blurImage;
});


window.add(leftMenu);

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
    var welcome = BizDir.ui.createWelcomeScreen();
    welcome.open();
}
// window.open();

