Ti.include(	
	
);

BizDir.ui.createNewsPagesWindow = function (data) {
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
			height:screenheight,
			title:data.nama,
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#1e5c69",
	        navBarHidden:false,
	        navTintColor:'#fff',
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:data.nama,
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
	
	var container = Ti.UI.createScrollView({
		width:screenwidth,
		height:screenheight,
		contentWidth:screenwidth,
		contentHeight:'auto',
		top:0  + spacer,
		layout:'vertical'
	});
	
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:0,
		image:'images/home/homeadvertising.jpg'
	});
	
	var imageWrapper  = Ti.UI.createView({
		width:screenwidth,
		height:Ti.UI.SIZE,
		top:0,
		backgroundColor:'transparent'
	});
	
	var imageNews = Ti.UI.createImageView({
		width:screenwidth,
		height:Ti.UI.SIZE,
		defaultImage:'/images/defaultimage.png',
		image:data.picture,
		top:0,
	});
	
	var titleviewBG = Ti.UI.createView({
		width:screenwidth,
		height:Ti.UI.SIZE,
		bottom:0,
		backgroundColor:'#333',
		opacity:0.8,
		layout:'vertical'
	});
		var spacer = Ti.UI.createImageView({
			width:screenwidth,
			height:5,
			top:0,
		});
	
		var titleLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			height:Ti.UI.SIZE,
			color:'#fff',
			font: {
	            fontSize: 12,
	            fontWeight: 'normal',
	            fontFamily: 'HelveticaNeue'
	        },
	        text:data.title
		});
		
		var dateLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			height:Ti.UI.SIZE,
			color:'#fff',
			font: {
	            fontSize: 10,
	            fontWeight: 'normal',
	            fontFamily: 'HelveticaNeue'
	        },
	        text:data.uDate
		});
		
		titleviewBG.add(spacer);
		titleviewBG.add(titleLabel);
		titleviewBG.add(dateLabel);
		titleviewBG.add(spacer);
	
	imageWrapper.add(imageNews);
	imageWrapper.add(titleviewBG);
	
	var contentLabel = styedlabel.createLabel({
        width: screenwidth - 20,
        height:Ti.UI.SIZE,
        top: 10,
        color: '#000000',
        left:10,
        font: {
            fontSize: 12,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue'
        },
        html: data.description
    });
	
	function iPhoneinit(){
		container.add(advertising);
		container.add(imageWrapper);
		container.add(contentLabel);
		
		win.add(container);
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
			width:screenwidth - 120,
			height:	Ti.UI.SIZE,
			text:data.nama,
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