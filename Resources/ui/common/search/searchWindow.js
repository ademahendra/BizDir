Ti.include(	
	'/ui/common/pagesWindow.js'
);
BizDir.ui.createSearchWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039'; //e.coords.longitude;
    var longitude = '115.162806'; //e.coords.latitude;
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Search',
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
			title:'Search',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'}
		});
	};
	
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
	}
	
	var backgroundLayer = Ti.UI.createImageView({
		width:screenwidth,
		height:screenheight,
		top:0,
		image:BizDir.bgImage		
	});
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:2
	    // }  
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
	
	labelArea.addEventListener('click', function(){
		if(!BizDir.winCatOpen){
			BizDir.winCatOpen = true;
			BizDir.navGroup.openWindow(BizDir.ui.createAreaSearchWindow());
		}
	});
	
	buttonSearchArea.addEventListener('click', function(){
		if(!BizDir.winCatOpen){
			BizDir.winCatOpen = true;
			BizDir.navGroup.openWindow(BizDir.ui.createAreaSearchWindow());
		}
	});
	
	var searchFilterBar = Ti.UI.createSearchBar({
		barColor:'#1e5c69', 
	    showCancel:false,
	    height:43,
	    top:44 + spacer,
	    hintText:'Search for Company',
	    backgroundColor:'transparent',	    
	});		
	
	var searchtableView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		separatorColor:'transparent',
		// search:searchFilterBar,
		top:90 + spacer,
		height:screenheight-90,
		// filterAttribute:'filter',
		// headerView:searchFilterBar
		
	});
	
	
	var tableData = [];
	// Ti.API.info('Length: '+dataAnggota.length);
	function displaySearch(dataAnggota){
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
			
			
			Ti.API.info('Logo :'+dataAnggota[i].logo);
			var imageFile = 'http://www.bizdir.id/images/anggota/'+dataAnggota[i].dir+'/'+dataAnggota[i].id+'/'+dataAnggota[i].id+'.png';
			Ti.API.info('Image : '+imageFile);
			if(dataAnggota[i].logo == '' && dataAnggota[i].logo == null){
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
			
			var imageLogo = Ti.UI.createImageView({
				width:50,
				height:50,
				left:50,
				image:imageFile,
				data:dataAnggota[i],
				defaultImage:'/images/defaultimage.png'
			});
			
			var descWrapper = Ti.UI.createView({
				layout:'vertical',
				left:120,
				width:screenwidth - 180,
				height:Ti.UI.SIZE,
				data:dataAnggota[i]	,
				top:10		
			});
			
			var titleLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:dataAnggota[i].nama,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:dataAnggota[i],
				height:Ti.UI.SIZE						
			});
			
			var addressLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:dataAnggota[i].alamat,
				font:{fontSize:9,fontWeight:'normal',fontFamily:'HelveticaNeue'},
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
			
			row.add(container);
			row.addEventListener('click', function(e){
				if(!BizDir.winisOpen){
					BizDir.winisOpen = true;
					BizDir.navGroup.openWindow(BizDir.ui.createPagesWindow(e.source.data, BizDir.navGroup));
				}
			});
			
			
			tableData.push(row);
		}
		searchtableView.data = tableData;
		searchFilterBar.blur();
		// searchtableView.search = searchFilterBar;
		// searchtableView.filter = 'nama';
	}
	
	searchFilterBar.addEventListener('change', function(){
		// searchFilterBar.blur();
		// var value = searchFilterBar.value;
		// if(value != ''){
			// var searchData = BizDir.searchAnggota(0,20,value, BizDir.locationID, BizDir.cityID);
			// tableData = [];
			// displaySearch(searchData);
		// }
	});
	
	searchFilterBar.addEventListener('return', function(e){
	    var value = searchFilterBar.value;
		if(value != ''){
			var searchData = BizDir.searchAnggota(0,20,value, BizDir.locationID, BizDir.cityID);
			tableData = [];
			displaySearch(searchData);
		}
	    searchFilterBar.blur();
	});
	
	function searchInit(){
		areaView.add(iconArea);
		areaView.add(labelArea);
		areaView.add(buttonSearchArea);
		
		win.add(blurBG);
		win.add(searchFilterBar);
		win.add(searchtableView);
		win.add(areaView);		
	}
		
	searchInit();
	
	Ti.App.addEventListener('updateAreaSearch', function(data) 
	{ 
		labelArea.text = 'In: '+BizDir.locationArea; 
		blurBG.image = BizDir.bgImage;
		blurBG.blur = {
	        type:blur.IOS_BLUR, radiusInPixels:2
	    }; 
		var data = BizDir.selectAnggota(0,200, BizDir.locationID, BizDir.cityID);
		displaySearch(data);
	});
	
	win.addEventListener('open', function(){
		if (BizDir.locationID !== 0) {
        	if (BizDir.cityID !== null || typeof(BizDir.cityID) !== undefined) {
        		var data = BizDir.selectAnggota(0,200, BizDir.locationID, BizDir.cityID);
				displaySearch(data);
        	} else {
        		
        	}     
        }
        
		var data = BizDir.selectAnggota(0,200, BizDir.locationID, BizDir.cityID);
		displaySearch(data);	
		
		searchFilterBar.focus();
	});
	
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
			text:'Search',
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