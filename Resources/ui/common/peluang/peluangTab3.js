BizDir.ui.createPeluangTab3Window = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;
	
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:'Business Opportunities',
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
			title:'Business Opportunities',
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

	var data = [];
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:0 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var tableView = Ti.UI.createTableView({
		top:100 + spacer,
		width:screenwidth,
		height:Ti.UI.FILL,
		// data: data1,
		backgroundColor:'transparent'
	});
	
	function displaytable(data){
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
			
			var infoWrapper = Ti.UI.createView({
				width:screenwidth - 130,
				left:0,
				height:15,
				layout:'horizontal',
				data:data[i],
				top:5
			});
			
				var emailCountImage = Ti.UI.createImageView({
					width:10,
					height:9,
					left:5,
					image:'images/peluang/message.png',
					data:data[i]
				});
				
				var emailCountLabel = Ti.UI.createLabel({
					width:40,
					font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:data[i].emailCount,
					left:5,
					data:data[i]
				});
				
				var viewCountImage = Ti.UI.createImageView({
					width:10,
					height:6,
					left:5,
					image:'images/forum/view.png',
					data:data[i]
				});
				
				var viewCountLabel = Ti.UI.createLabel({
					width: Ti.UI.SIZE,
					font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:data[i].viewCount,
					left:5,
					data:data[i]
				});
				
			infoWrapper.add(emailCountImage);
			infoWrapper.add(emailCountLabel);	
			infoWrapper.add(viewCountImage);
			infoWrapper.add(viewCountLabel);
			
			var margin = Ti.UI.createView({
				width:screenwidth - 130,	
				data:data[i],
				height:1,
				top:10,
				data:data[i],
			});
			
			descWrapper.add(titleLabel);
			descWrapper.add(infoWrapper);
			descWrapper.add(margin);
			
			container.add(imageLogo);
			container.add(descWrapper);
			
			row.add(container);
			row.addEventListener('click', function(e){
				BizDir.peluangTab3.open(BizDir.ui.createPeluangPagesWindow(e.source.data));
			});
			
			
			tableData.push(row);
		}
		tableView.data = tableData;
		// searchtableView.search = searchFilterBar;
		// searchtableView.filter = 'nama';
	}
	
	function getPeluang(catID){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/peluangusaha/'+catID+'/'+page;		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		Ti.API.info('Weather: '+apiurl);
		xhr.open('GET', apiurl);
		
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			displaytable(json.result.data);
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
			// alert('Invalid username or password!');
		};
	}
	
	getPeluang(3);

	function iPhoneinit(){
		win.add(blurBG);
		// win.add(overlayView);
		win.add(advertising);
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
			text:'Business Opportunities',
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