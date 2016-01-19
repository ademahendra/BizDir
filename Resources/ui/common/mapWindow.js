BizDir.ui.createMapWindow = function (data, latitude, longitude) {
    // var screenwidth = Ti.Platform.displayCaps.platformWidth;
    var screenheight = Ti.Platform.displayCaps.platformHeight;     
    // var latitude = '-8.691039';	 //	e.coords.longitude;
    // var longitude = '115.162806';//	e.coords.latitude;	   
    
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
    
    var MapModule = require('ti.map');
   
	var mapView = MapModule.createView({
        mapType: MapModule.STANDARD_TYPE,
        animate: true,
        regionFit: true,
        // userLocation: true,
        width: screenwidth,
        top: 0 + spacer,
        bottom: 0
    });
       

    if(!BizDir.isAndroid()){
	    Titanium.Geolocation.purpose = "For GPS Application";
	    Titanium.Geolocation.distanceFilter = 10;
	    Titanium.Geolocation.PROVIDER_GPS;
	    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    }

    var authoGeo = true;
    
    if (Titanium.Geolocation.locationServicesEnabled === false) {
        Titanium.UI.createAlertDialog({
            title: 'BizDir',
            message: 'Your device has GPS turned off - turn it on.'
        }).show();
        authoGeo = false;
    } else {
        //alert('GPS ON');
        if (Titanium.Platform.name !== 'android') {
            var authorization = Titanium.Geolocation.locationServicesAuthorization;

            if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
                Ti.UI.createAlertDialog({
                    title: 'Travelling Bali',
                    message: 'You have disallowed Travelling Bali from running geolocation services.'
                }).show();
                authoGeo = false;
            } else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
                Ti.UI.createAlertDialog({
                    title: 'Travelling Bali',
                    message: 'Your system has disallowed Travelling Bali from running geolocation services.'
                }).show();
                authoGeo = false;
            }
        }
    }
    
    Titanium.Geolocation.getCurrentPosition(function (e) {
        if (e.error) {
            // manage the error
            return;
        }
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;

    });
    
    

	var retrieveData = function(){
		// alert(data.glat+":"+data.glon);
		var origin = String(BizDir.latitude + ',' + BizDir.longitude);
        var travelMode = 'driving';

        var destination = String(latitude+','+longitude);
        
        mapView.region = {latitude:latitude,longitude:longitude,latitudeDelta:0.09,longitudeDelta:0.09};
        
		var url = "http://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&sensor=true&mode=driving&overview_polyline=true";
		Ti.API.info(url);
	    xhr = Titanium.Network.createHTTPClient();
	    xhr.open('GET',url);
	    
	    
		
	    xhr.onload = function(){
	    	// alert(this.responseText);
	        var jsonPoint = JSON.parse(this.responseText);
	        // alert(this.responseText);
	    
		    var steps = jsonPoint.routes[0].overview_polyline.points;
		   	// alert('steps');

		    var linePoints = BizDir.decodeLine(steps);
		    // alert('decode');			    
		    var route = {name:'Direction to '+data.title, points:linePoints, color: "blue", width:5};
		    
			    var startAnnotation = MapModule.createAnnotation({
	                pincolor: MapModule.ANNOTATION_AZURE,
	                latitude: BizDir.latitude,
	                longitude: BizDir.longitude,
	                title: 'Current location'
	           	});
				
				var endAnnotation = MapModule.createAnnotation({
		                pincolor: MapModule.ANNOTATION_GREEN,
		                latitude: latitude,
		                longitude: longitude,
		                title: data.nama
		        });
 
            	var androidroute = MapModule.createRoute({
            		name:'Direction to '+data.nama, 
            		points:linePoints, 
            		color: "blue", 
            		width:5
            	});
            	mapView.addRoute(androidroute);
            	// mapView.addRoute(route);
            // }
            mapView.addAnnotation(startAnnotation);
            mapView.addAnnotation(endAnnotation);
	    };
	     
	    // if(authoGeo)
	    // {
	    	xhr.send();
		// }
		
		
	};
	
	
	// win.add(mapView);
	win.addEventListener('open', function(){
		win.add(mapView);		
		retrieveData();	
	});
	
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