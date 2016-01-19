BizDir.ui.createCalendarEventWindow = function (data) {
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
			title:'Event Calendar',
			backgroundColor: '#1e5c69',
	        barColor: '#1e5c69',
	        navTintColor:"#fff",
	        tintColor:"#1e5c69",
	        navBarHidden:false,	   	           
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff',backgroundColor: '#1e5c69'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:'Event Calendar',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'},
	        // backgroundImage:BizDir.bgImage
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
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:1
	    // }  
    });
    
    var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.3
    });
	
	var scrollView = Ti.UI.createScrollView({
		top:0 + spacer,
		width:screenwidth,
		height:Ti.UI.FILL,
		contentWidth:screenwidth,
		contentHeight:'auto',
		backgroundColor:'transparent',
		layout:'vertical'
	});
	
	var container = Ti.UI.createView({
		width:screenwidth,
		height:150,
		top:0,
		layout:'horizontal'
	});
				
	var imageLogo = Ti.UI.createView({
		width:60,
		height:60,
		left:10,
		top:20,				
		backgroundImage:'images/bgdate.png'
	});
	
	Ti.API.info('date :::> '+data.startDate);
	var ts = data.startDate;
	var dt = ts.split(" ");
	var date = dt[0];
	var dateSplit = date.split("-");
	var finalDate = BizDir.datetime.monthToNameShort(parseInt(dateSplit[1])) + " " + dateSplit[0];
	
	
	var dayLabel = Ti.UI.createLabel({
		top:10,
		text:dateSplit[2],
		font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		height:Ti.UI.SIZE						
	});
	
	var monthLabel = Ti.UI.createLabel({
		bottom:10,
		text:finalDate,
		font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
		color:'#fff',
		height:Ti.UI.SIZE						
	});
			
	imageLogo.add(dayLabel);
	imageLogo.add(monthLabel);
	
	var descWrapper = Ti.UI.createView({
		layout:'vertical',
		left:10,
		width:screenwidth - 130,
		height:Ti.UI.SIZE,
		top:20		
	});
	
	var titleLabel = Ti.UI.createLabel({
		top:5,
		left:0,
		text:data.title,
		font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		height:Ti.UI.SIZE						
	});
	
	var fulldateLabel = Ti.UI.createLabel({
		top:5,
		left:0,
		text:data.alamat,
		font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
		color:'#fff',
		data:data.startDate+" "+data.startTime
	});
	
	var margin = Ti.UI.createView({
		width:screenwidth - 130,	
		height:1,
		top:10		
	});
	
	descWrapper.add(titleLabel);
	descWrapper.add(fulldateLabel);
	descWrapper.add(margin);
	
	container.add(imageLogo);
	container.add(descWrapper);
	
	var contentWrapper = Ti.UI.createView({
		 width: screenwidth,
		 top:0,
		 height:Ti.UI.FILL,
		 backgroundColor:'#fff'
	});
			
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
	
	contentWrapper.add(contentLabel);

	scrollView.add(container);
	scrollView.add(contentWrapper);

	function iPhoneinit(){
		win.add(blurBG);
		// // win.add(overlayView);
		win.add(scrollView);
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
			text:'Event Calendar',
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