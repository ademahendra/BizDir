Ti.include(	
	'/ui/common/pagesWindow.js'
);

BizDir.ui.createListCategoryWindow = function (data) {
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
	        tintColor:"#333",
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
	
	var tableData = [];
	
	var dataQuery = BizDir.selectAnggotaByCategory(0, 30, BizDir.locationID, BizDir.cityID, data.id);
	function fillTable(dataAnggota){
		for(var i = 0; i < dataAnggota.length; i++){
			var row = Ti.UI.createTableViewRow({
				backgroundColor:'transparent',
				width:screenwidth,
				hasChild:true,
				height:Ti.UI.SIZE,
				filter:dataAnggota[i].nama,
				data:dataAnggota[i]			
			});
			
			var container = Ti.UI.createView({
				width:screenwidth-15,
				height:Ti.UI.SIZE,
				left:15,	
				data:dataAnggota[i]		
			});
			
			var imageFile = dataAnggota[i].logo;
			if(dataAnggota[i].logo == '' || dataAnggota[i].logo == null){
				var imageFile = '/images/defaultimage.png';
			}
			
			var imageVerified;
			if(dataAnggota[i].verifikasi == '1'){
				imageVerified = "images/verifiedbutton.png";
			} else {
				imageVerified = "images/unverifiedbutton.png";
			}
			
			var verifiedLogo = Ti.UI.createImageView({
				width:33,
				height:40,
				left:0,
				image:imageVerified,
				data:dataAnggota[i],
				// defaultImage:'/images/defaultimage.png'
			});	
			
			Ti.API.info('Logo '+dataAnggota[i].logo+' reg '+imageFile);
			var imageLogo = Ti.UI.createImageView({
				width:50,
				height:50,
				left:50,
				image:imageFile,
				hires:true,
				data:dataAnggota[i],
				defaultImage:'/images/defaultimage.png'
			});
			
			var descWrapper = Ti.UI.createView({
				layout:'vertical',
				left:120,
				width:screenwidth - 180,
				data:dataAnggota[i],
				height:Ti.UI.SIZE,
				top:10			
			});
			
			var titleLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:dataAnggota[i].nama,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:dataAnggota[i],
				height:Ti.UI.SIZE,
			});
			
			var addressLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:dataAnggota[i].alamat,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:dataAnggota[i]						
			});
			
			var margin = Ti.UI.createView({
				width:screenwidth - 130,	
				data:dataAnggota[i],
				height:1,
				top:10		
			});
			
			descWrapper.add(titleLabel);
			descWrapper.add(addressLabel);
			descWrapper.add(margin);
			container.add(verifiedLogo);
			container.add(imageLogo);
			container.add(descWrapper);
			
			container.addEventListener('click', function(e){
				Ti.API.info('title: '+e.source.data.nama);
				BizDir.navGroupCat.openWindow(BizDir.ui.createPagesWindow(e.source.data, BizDir.navGroupCat));
			});
			
			row.add(container);
			tableData.push(row);
		}
		subTable.data = tableData;
	}
	
	fillTable(dataQuery);
	
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

	Ti.App.addEventListener('updateAreaListCat', function(data) 
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