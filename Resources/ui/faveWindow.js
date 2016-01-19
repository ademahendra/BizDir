Ti.include(	
	
);

BizDir.ui.createFaveWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;
	
	var categoryItem = [
		{title:'Nature Product',icon:'icon_4.png', id:1},
	];
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:'Favorite',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#fff",
	        navTintColor:'#fff',
	        navBarHidden:false,	        
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:Ti.UI.FILL,
			title:'Favorite',
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
	
	if (BizDir.ui.device !== 'ipad') {
		win.setLeftNavButton(navIcon);
	}
	
	navIcon.addEventListener('click', function(){
		window.toggleLeftView();
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
    	opacity:0.2
    });
    
	
	
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:0 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var parentView = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    top: 0 + spacer,
	    width: Ti.UI.FILL
	});
	
	var data1 = [];

	
	var tableView = Ti.UI.createTableView({
		top:0 + spacer,
		width:screenwidth,
		height:Ti.UI.FILL,
		data: data1,
		backgroundColor:'transparent',
		editable:true
	});

	
	var tableData = [];
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
			
			var imageFile = 'http://www.bizdir.id/images/anggota/'+dataAnggota[i].dir+'/'+dataAnggota[i].id+'/'+dataAnggota[i].id+'.png';			
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
				height:Ti.UI.SIZE,
			});
			
			var addressLabel = Ti.UI.createLabel({
				top:5,
				left:0,
				text:dataAnggota[i].alamat,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:dataAnggota[i],
				height:Ti.UI.SIZE,
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
				Ti.API.info('title: '+e.source.data.nama);
				BizDir.navGroupFave.openWindow(BizDir.ui.createPagesWindow(e.source.data,BizDir.navGroupFave));
			});
			
			
			tableData.push(row);
		}
		tableView.data = tableData;
		// searchtableView.search = searchFilterBar;
		// searchtableView.filter = 'nama';
	}
	
	tableView.addEventListener('delete', function(e){
		var id = e.source.data.id;
		deleteFave(id);
	});
	
	function deleteFave(id){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/favorite/delete';
		var params = {
			'userid' : Ti.App.Properties.getString('uid'),
			'anggotaid' : id
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			if(json.status == 1){
				// Ti.App.Properties.setString('uid', json.result.id);
				alert('Success remove from favorite');
			}			
		};
		
		xhr.onerror = function(e){
			alert('Failed remove favorite');
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	function getFavorite(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/favorite/'+Ti.App.Properties.getString('uid');
		// Ti.API.info('URL : '+apiurl);
		var params = {
			// 'lang' : 'EN'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			var dataFave = json.result.data;
			Ti.API.info('Length: '+dataFave.length);
			if(dataFave.length > 0){
				var favelist = '';
				for (var i=0; i < dataFave.length; i++) {
					if(i == 0){
						favelist += dataFave[i].id;
					} else {
						favelist += ', '+dataFave[i].id;
					}
				};
			// filltable(json.result.data);
			// page++;
				var dataF = BizDir.faveAnggota(favelist, BizDir.locationID, BizDir.cityID);
				fillTable(dataF);
			}
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	getFavorite();
	
	function iPhoneinit(){
		win.add(blurBG);
		// win.add(overlayView);
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
			width:Ti.UI.SIZE,
			height:	Ti.UI.SIZE,
			text:'Favorite',
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
		// padnavBar.add(backButton);
		win.add(padnavBar);
	}
	return win;
};	