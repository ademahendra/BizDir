BizDir.ui.createCalendarTab3Window = function () {
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
	        navTintColor:"#1e5c69",
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
	
	win.setLeftNavButton(navIcon);
	
	navIcon.addEventListener('click', function(){
		window.toggleLeftView();
	});

	var tabBarNews = Titanium.UI.iOS.createTabbedBar({
	    labels:['International', 'National'],
	    backgroundColor:'#fff',
	    top:0 + spacer,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    height:35,
	    width:screenwidth,
	    color:'#fff'
	});

	var data = [];
	
	var tableView = Ti.UI.createTableView({
		top:35 + spacer,
		width:screenwidth,
		height:Ti.UI.FILL,
		// data: data1,
		backgroundColor:'transparent'
	});
	
	
	var secondtabView = Ti.UI.createTableView({
		top:0,
		width:screenwidth,
		height:Ti.UI.FILL,
		// data: data2,
		backgroundColor:'transparent'
	});	
	
	tabBarNews.addEventListener('click', function(e){
		switch(e.index){
	        case 0: {
	        	var data1 = BizDir.selectEvent(5);
				displayEvent(data1);
	            break;
	        }
	        case 1: {
	        	var data1 = BizDir.selectEvent(6);
				displayEvent(data1);
	            break;
	        }
       	}
	});
	
	tabBarNews.index = 0;
	
	var data1 = BizDir.selectEvent(5);
	displayEvent(data1);
	function displayEvent(data){
		var tableData = [];
		for(var i = 0; i < data.length; i++){
			var row = Ti.UI.createTableViewRow({
				backgroundColor:'transparent',
				width:screenwidth,
				hasChild:true,
				height:Ti.UI.SIZE,
				filter:data[i].nama,
				data:data[i]			
			});
			
			var container = Ti.UI.createView({
				width:screenwidth-15,
				height:Ti.UI.SIZE,
				left:15,
				data:data[i]
			});
						
			var imageLogo = Ti.UI.createView({
				width:60,
				height:60,
				left:0,				
				data:data[i],
				backgroundImage:'images/bgdate.png'
			});
			
			var ts = data[i].startDate;
			var dt = ts.split(" ");
			var date = dt[0];
			var dateSplit = date.split("-");
			var finalDate = BizDir.datetime.monthToNameShort(parseInt(dateSplit[1])) + " " + dateSplit[0];
			
			
			var dayLabel = Ti.UI.createLabel({
				top:10,
				text:dateSplit[2],
				font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:data[i],
				height:Ti.UI.SIZE						
			});
			
			var monthLabel = Ti.UI.createLabel({
				bottom:10,
				text:finalDate,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:data[i],
				height:Ti.UI.SIZE						
			});
			
			imageLogo.add(dayLabel);
			imageLogo.add(monthLabel);
			
			var descWrapper = Ti.UI.createView({
				layout:'vertical',
				left:70,
				width:screenwidth - 130,
				height:Ti.UI.SIZE,
				data:data[i],
				top:10		
			});
			
			var titleLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:data[i].title,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:data[i],
				height:Ti.UI.SIZE						
			});
			
			var fulldateLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:data[i].alamat,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:data[i].startDate+" "+data[i].startTime
			});
			
			var margin = Ti.UI.createView({
				width:screenwidth - 130,	
				data:data[i],
				height:1,
				top:10		
			});
			
			descWrapper.add(titleLabel);
			descWrapper.add(fulldateLabel);
			descWrapper.add(margin);
			
			container.add(imageLogo);
			container.add(descWrapper);
			
			row.add(container);
			row.addEventListener('click', function(e){
				BizDir.calendarTab3.open(BizDir.ui.createCalendarEventWindow(e.source.data));
			});
			
			
			tableData.push(row);
		}
		tableView.data = tableData;
		// searchtableView.search = searchFilterBar;
		// searchtableView.filter = 'nama';
	}

	function iPhoneinit(){
		win.add(blurBG);
		// win.add(overlayView);// win.add(overlayView);
		
		win.add(tabBarNews);
		win.add(tableView);
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
		// padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	return win;

};