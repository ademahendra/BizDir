Ti.include(	
	
);

BizDir.ui.createSubCategoryWindow = function (data) {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;
	
	var categoryItem = [
		{title:'Nature Product',icon:'icon_4.png', id:1},
	];
	
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
	        titleAttributes:{color:'#fff'},
	        backgroundImage:BizDir.bgImage
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
	        backgroundImage:BizDir.bgImage,
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
	
	var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.2
    });
    
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:44 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var areaView = Ti.UI.createView({
		width:screenwidth,
		height:44,
		backgroundColor:'#1e5c69',
		top:0 + spacer
	});
	
		var labelArea = Ti.UI.createLabel({
			text:'In: '+BizDir.locationArea,
			left:35,
			right:45,
			color:'#fff',
			textAlign:'left'
		});
		
		var iconArea = Ti.UI.createImageView({
			left:10,
			width:12,
			height:18,
			image:'images/marker.png'
		});
		
		var buttonSearchArea = Ti.UI.createButton({
			right:10,
			width:30,
			height:30,
			backgroundImage:'images/location.png'
		});
	
	
	var subTable = Ti.UI.createTableView({
		top:150 + spacer,
		backgroundColor:'transparent',
		width:screenwidth,
		height:screenheight - 220,
	});
	
	var datasub = BizDir.selectSubCategory(data.id);
	function showTableData(data){
		var tableData = [];
		for (var i = 0; i < data.length; i++) {
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				hasDetail:true,
				height:50,
				hasChild:true,
				id:data[i].id,
				nama:data[i].nama
			});
			
			var container = Ti.UI.createView({
				width:screenwidth,				
				height:50,
				left:0,
				right:0,
				backgroundColor:'transparent',
				id:data[i].id,
				nama:data[i].nama
			});
			
			var subLabel = Ti.UI.createLabel({
				left:10,
				right:20,
				text:data[i].nama,
				color:'#fff',
				id:data[i].id,
				nama:data[i].nama,
				font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			});
			
			container.add(subLabel);
			container.addEventListener('click', function(e){
				BizDir.navGroupCat.openWindow(BizDir.ui.createListCategoryWindow({
					nama:e.source.nama,
					id:e.source.id
				}));
			});
			
			
			row.add(container);
			tableData.push(row);
		};
		subTable.data = tableData;
	}
	showTableData(datasub);	
	
	function iPhoneinit(){
		areaView.add(iconArea);
		areaView.add(labelArea);
		areaView.add(buttonSearchArea);
		
		win.add(blurBG);
		// win.add(overlayView);	
		win.add(areaView);
		win.add(advertising);
		win.add(subTable);
	}
	
	Ti.App.addEventListener('updateAreaSubCat', function(data) 
	{ 
		labelArea.text = 'In: '+BizDir.locationArea; 
	});
	
	iPhoneinit();
	if (BizDir.ui.device == 'ipad') {
		win.navBarHidden = true;
		
		var padnavBar = Ti.UI.createView({
			height:60,
			backgroundColor: '#1e5c69',
			width:screenwidth,
			top:0
		});
		
		var titleLabel = Ti.UI.createLabel({
			width:Ti.UI.SIZE,
			height:	Ti.UI.SIZE,
			text:data.nama,
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
		
		var spacer = 60;
		padnavBar.add(titleLabel);
		padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	
	return win;
};	