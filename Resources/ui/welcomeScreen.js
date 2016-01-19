Ti.include(	
	'/ui/common/search/searchWindow.js'
);

BizDir.ui.createWelcomeScreen = function () {
	var screenwidth = Ti.Platform.displayCaps.platformWidth;
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
			title:'Home',
			backgroundColor: '#f1f1f1',
	        barColor: '#2892ff',
	        tintColor:"#2892ff",
	        navTintColor:'#fff',
	        navBarHidden:true,
	        backgroundImage:'images/welcome/splash.png'
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Home',
			backgroundColor: '#f1f1f1',
	        barColor: '#05bee0',
	        barImage:'images/template/bg.png',
	        navBarHidden:true,
	        backgroundImage:'images/welcome/splash.png'
		});
	};
	
	var pb = Titanium.UI.createProgressBar({
	    // top:10,
	    height:'auto',
	    min:0,
	    max:100,
	    left:10,
	    right:10,
	    value:0,
	    color:'#fff',
	    message:'Downloading 0%',
	    font:{fontSize:14, fontWeight:'bold'},
	    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	});
	
	var zip = require('de.marcelpociot.zip');
	Ti.API.info("module is => " + zip);

	
	function downloadDatabase(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/api/download';
		// Ti.API.info('URL : '+apiurl);
		var params = {
			'phoneid' : Titanium.Platform.id,
			'phonetype' : 'iOS'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(data){
			Ti.API.info('Download Done');
			
			var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'database.zip');
			f.write(this.responseData); // write to the file
			var filedb = Ti.Filesystem.getApplicationDataDirectory()+'bizdir.sqlite';
						
			zip.unzip({
				// TiFile object containing the zip file to open
				file: Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'database.zip'),
				// Directory to extract the files to
				target: 	Ti.Filesystem.applicationDataDirectory,
				// OverWrite existing files? default: TRUE
				overwrite:	true,
				// Success callback
				success: function(e){
					
					var db = Ti.Database.install(filedb, 'BizDir');
					db.file.setRemoteBackup(false);
					if(Titanium.App.Properties.getString('name') == '' || Titanium.App.Properties.getString('name') == null){
						BizDir.ui.createLoginWindow().open();	
					} else { 
						window.open(); //init the app
					}
				},
				// error callback
				error: function(e){
					allert('Something Wrong');
				},
				progress:function(e)
				{
					var progress = Math.round( e.progress * 100 );
					pb.value = Math.floor(e.progress * 100);
					pb.message = 'Uncompress Databasae '+progress + '%';
				}
			});
// 			

			
		};
		// xhr.timeout = 30000;
		xhr.ondatastream = function(e){
			// Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
			pb.value = Math.floor(e.progress * 100);
			pb.message = 'Downloading '+Math.floor(e.progress * 100)+'%';
		};
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	function updateDatabase(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/api/update';
		// Ti.API.info('URL : '+apiurl);
		var params = {
			'phoneid' : Titanium.Platform.id,
			'phonetype' : 'iOS'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(data){
			Ti.API.info('Download Done');
			Ti.API.info('DB Version: ' + this.responseData);
			var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'update.zip');
			f.write(this.responseData); // write to the file
			zip.unzip({
				// TiFile object containing the zip file to open
				file: Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'update.zip'),
				// Directory to extract the files to
				target: (Ti.Filesystem.applicationDataDirectory,'update.txt'),
				// OverWrite existing files? default: TRUE
				overwrite:	true,
				// Success callback
				success: function(e){
					var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'update.txt');
					var fs = Ti.Filesystem.openStream(file);
					fs.open(Ti.Filesystem.MODE_READ);
					
					var string = fs.read(file.size());
					Ti.API.info('String: '+string);
					var decodeText = Ti.Utils.base64decode(string);
					Ti.API.info('String Decode: '+decodeText);
					// window.open(); //init the app
					
				},
				// error callback
				error: function(e){
					allert('Something Wrong');
				},
				progress:function(e)
				{
					var progress = Math.round( e.progress * 100 );
					pb.value = Math.floor(e.progress * 100);
					pb.message = 'Uncompress Databasae '+progress + '%';
				}
			});
			
			
		};
		// xhr.timeout = 30000;
		xhr.ondatastream = function(e){
			// Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
			pb.value = Math.floor(e.progress * 100);
			pb.message = 'Updating '+Math.floor(e.progress * 100)+'%';
		};
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	function downloadFolder(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/file/downloadfolder';
		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(data){
			Ti.API.info('Download Done');
			var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory);
			f.write(this.responseData); // write to the file
		};
		// xhr.timeout = 30000;
		xhr.ondatastream = function(e){

			pb.value = Math.floor(e.progress * 100);
			pb.message = 'Updating '+Math.floor(e.progress * 100)+'%';
		};
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
		
	function iPhoneinit(){
		win.add(pb);
		pb.show();
		if(dbFile.exists()) {
			Ti.API.info('Update');
			updateDatabase();
			// downloadFolder();	
		} else {
			downloadDatabase();
		}	 
	}
	
	iPhoneinit();
	
	return win;
};	