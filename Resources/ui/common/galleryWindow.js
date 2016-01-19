Ti.include(	
	
);

BizDir.ui.createGalleryPagesWindow = function (data) {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;	
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:data.nama,
			backgroundColor: '#000',
	        barColor: '#1e5c69',
	        tintColor:"#1e5c69",
	        navBarHidden:false,
	        navTintColor:'#fff',
	        titleAttributes:{color:'#fff'},
	        // backgroundImage:BizDir.bgImage
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:data.nama,
			backgroundColor: '#000',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});
	};	
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	var slider = Ti.UI.createScrollableView({
    	width:screenwidth,
    	height:(screenheight)-180,
    	top:0 + spacer,
    	backgroundColor:'#000',
    	showPagingControl:true
    });
    
    var thumbslider = Ti.UI.createScrollView({
    	width:screenwidth,
    	height:120,
    	backgroundColor:'#000',
    	layout:'horizontal',
    	contentHeight:120 - spacer,
    	contentWidth:'auto',
    	bottom:60
    });
    var imageThumb = [];
    for (var i=0; i < data.length; i++) {
    	if(data[i].type == 1){
    		var imageBig = Ti.Media.createVideoPlayer({
	    		width:screenwidth,
	    		height:360,
	    		url:data[i].main,
	    		autoplay:false
	    		// defaultImage:'images/slidebg.png'
	    	});
    	} else if(data[i].type == 0){
    		var imageBig = Ti.UI.createImageView({
	    		width:screenwidth,
	    		height:Ti.UI.SIZE,
	    		image:data[i].main,
	    		defaultImage:'images/slidebg.png'
	    	});	
    	}
    	
    	 imageThumb[i] = Ti.UI.createImageView({
    		height:100,
    		width:Ti.UI.SIZE,
    		image:data[i].thumb,
    		left:5,
			defaultImage:'/images/defaultimage.png',
    		page:i
    	});
		
		imageThumb[i].addEventListener('click', function(e){
			slider.currentPage = e.source.page;
		});  	
    	
    	slider.addView(imageBig);
    	thumbslider.add(imageThumb[i]);
    };
	
	win.addEventListener('close', function(){
		imageBig.stop();
	});
	
	function iPhoneinit(){
		win.add(slider);
		win.add(thumbslider);
	}
	
	iPhoneinit();
	
	if (BizDir.ui.device == 'ipad') {
		var padnavBar = Ti.UI.createView({
			height:60,
			backgroundColor: '#1e5c69',
			width:screenwidth,
			top:0
		});
		
		var titleLabel = Ti.UI.createLabel({
			width:Ti.UI.SIZE,
			height:	Ti.UI.SIZE,
			text:'Gallery',
			color:'#fff',
			font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
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