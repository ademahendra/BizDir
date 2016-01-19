BizDir.ui.createPromotionPage = function (data) {
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
			title:'Promotion',
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
			title:'Promotion',
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
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:2
	    // }  
    });
	
	var promoView = Ti.UI.createScrollView({
		width:screenwidth,
		top:0 + spacer,
		height:Ti.UI.FILL,
		layout:'vertical',
		backgroundColor:'#fff'
	});
			
	var imagePromo = Ti.UI.createImageView({
		width:screenwidth,
		height:Ti.UI.SIZE,
		top:0,
		image:data.picture,
		defaultImage:'images/promotion/adsholder.png'
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
	    text : data.title,
	    textAlign : 'left',
	    top:20
	});
	
	var descLabel = Ti.UI.createLabel({
	    color : '#333',
	    width:screenwidth-20,
	    font : {
	        fontSize : 14,
	        fontWeight : 'normal',
	        fontFamily:'HelveticaNeue'
	    },
	    height : Ti.UI.SIZE,
	    text : data.description,
	    textAlign : 'left',
	    top:10
	});
	
	
	
	function promoInit(){	
		promoView.add(imagePromo);
		promoView.add(titleLabel);
		promoView.add(descLabel);	
		win.add(blurBG);
		win.add(promoView);		
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
			text:'Promotion',
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
		padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	return win;
};	