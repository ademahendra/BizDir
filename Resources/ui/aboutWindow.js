BizDir.ui.createAboutWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;

	var latitude = '-8.691039'; //e.coords.longitude;
    var longitude = '115.162806'; //e.coords.latitude;
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'About',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#333",
	        navTintColor:'#fff',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'About',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'}
		});
	};
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	var navIcon = Ti.UI.createButton({
		width:26,
		height:26,
		backgroundImage:'images/menu_navigation.png',
		top:20,
		left:10,
	});
	
	win.setLeftNavButton(navIcon);
	
	navIcon.addEventListener('click', function(){
		window.toggleLeftView();
	});
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:2
	    // }  
    });
	
	var aboutView = Ti.UI.createScrollView({
		backgroundColor:'transparent',
		separatorColor:'transparent',
		top:0 + spacer,
		height:Ti.UI.FILL,
		contentWidth:screenwidth,
		contentHeight:'auto'
	});
	
	var logoBizDir = Ti.UI.createImageView({
		top:40,
		image:'images/logo_bizdir.png',
		backgroundColor:'#1e5c69',
		width:95,
		height:105,
		borderRadius:20
	});
	
	var contentWrapper = Ti.UI.createView({
		top:100,
		width:screenwidth,
		height:Ti.UI.FILL,
		backgroundColor:'#fff',
		layout:'vertical'
	});
	
		var titleLabel = Ti.UI.createLabel({
		    color : '#333',
		    width:screenwidth-20,
		    font : {
		        fontSize : 18,
		        fontWeight : 'bold',
		        fontFamily:'HelveticaNeueBold'
		    },
		    height : Ti.UI.SIZE,
		    text : 'KADIN Indonesia Business Directory (BizDir)',
		    textAlign : 'left',
		    top:70
		});
		
		var contentLabel = Ti.UI.createLabel({
		    color : '#333',
		    width:screenwidth-20,
		    font : {
		        fontSize : 14,
		        fontWeight : 'normal',
		        fontFamily:'HelveticaNeue'
		    },
		    height : Ti.UI.SIZE,
		    text : 'Welcome to BizDir - the trusted business directory for contact citations for your business in Indonesia. We provide complete listings of businesses and organisations registered with and verified by the Indonesian Chamber of Commerce and Industry (KADIN).  Because we scrutinise our resources, our business directory only contains real businesses and websites with whom you want to have dealings.'+
					'BizDir will give you access to over 100,000 KADIN members companies and organisations from a wide spectrum of industries of all sizes and origins. As a networking and information platform, we help ventures/companies grow by providing business connections and facilitating the sharing of knowledge and experience',
		    textAlign : 'left',
		    top:20
		});
		
	contentWrapper.add(titleLabel);
	contentWrapper.add(contentLabel);	
	
	
	aboutView.add(contentWrapper);
	aboutView.add(logoBizDir);
	
	function promoInit(){		
		win.add(blurBG);
		win.add(aboutView);		
	}
		
	promoInit();
	
	win.addEventListener('open', function(){
		
	});
	
	if (BizDir.ui.device == 'ipad') {
		var padnavBar = Ti.UI.createView({
			height:60,
			backgroundColor: '#1e5c69',
			width:screenwidth,
			top:0
		});
		
		var titleLabel = Ti.UI.createLabel({
			width:screenwidth - 120,
			height:	Ti.UI.SIZE,
			text:'About',
			color:'#fff',
			font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			textAlign:'center'
		});
		
		var backButton = Ti.UI.createButton({
			width:40,
			height:40,
			backgroundImage:'images/back.png',
			left:10
		});
		
		backButton.addEventListener('click', function(){
			win.close();
		});
		
		padnavBar.add(titleLabel);
		// padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	
	return win;
};	