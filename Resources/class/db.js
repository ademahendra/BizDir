(function () {

    BizDir.installDatabase = function () {
        // var db = Ti.Database.install(dbFile, 'BizDir');
        var db = Ti.Database.install('ui/bizdir.sqlite', 'BizDir');
    };

    BizDir.openDatabase = function () {
        var db = Ti.Database.open('BizDir');
    };

    BizDir.closeDatabase = function () {
        var db = Ti.Database.open('BizDir');
        db.close();
    };

    BizDir.insertFave = function (listingid) {
        var db = Ti.Database.open('BizDir');
        db.execute('insert into fave (listingid) VALUES (?)',
        listingid);
        db.close();
    };

    BizDir.deleteFave = function (listingid) {
        var db = Ti.Database.open('BizDir');
        db.execute('delete from fave where listingid=' + listingid);
        db.close();
    };
    
    BizDir.selectVersion = function () {
        var tableCity = Ti.Database.open('BizDir');
        var selectCity = tableCity.execute('select * from t_setting where id = 1');
        var dataCity = [];
        for (x = 0; x < selectCity.getRowCount(); x++) {
            dataCity.push({
                version: selectCity.fieldByName('value'),
                lastUpdate: selectCity.fieldByName('lastUpdateDate')
            });
            selectCity.next();
        }
        selectCity = null;
        tableCity.close();
        return dataCity;
    };

    BizDir.selectCity = function () {
        var tableCity = Ti.Database.open('BizDir');
        var selectCity = tableCity.execute('select * from t_kota where stat = 1');
        var dataCity = [];
        dataCity.push({
            id: null,
            idProvinsi: 0,
            nama: 'Indonesia',
            title: 'Indonesia',
            utc: 7
        });
        for (x = 0; x < selectCity.getRowCount(); x++) {
            dataCity.push({
                id: selectCity.fieldByName('id'),
                idProvinsi: selectCity.fieldByName('idProvinsi'),
                nama: selectCity.fieldByName('nama'),
                title: selectCity.fieldByName('nama'),
                utc: selectCity.fieldByName('utc')

            });
            selectCity.next();
        }
        selectCity = null;
        tableCity.close();
        return dataCity;
    };

    BizDir.selectProvince = function () {
        var tableProvince = Ti.Database.open('BizDir');
        var selectProvince = tableProvince.execute('select * from t_provinsi where stat = 1');
        var dataProvince = [];
        dataProvince.push({
            id: null,
            nama: 'Indonesia',
            title: 'Indonesia',
            utc: 7
        });
        for (x = 0; x < selectProvince.getRowCount(); x++) {
            dataProvince.push({
                id: selectProvince.fieldByName('id'),
                nama: selectProvince.fieldByName('nama'),
                title: selectProvince.fieldByName('nama'),
                utc: selectProvince.fieldByName('utc')
            });
            selectProvince.next();
        }
        selectProvince = null;
        tableProvince.close();
        return dataProvince;
    };
    
    BizDir.selectCitySearch = function (keyword) {
        var tableCity = Ti.Database.open('BizDir');
        var selectCity = tableCity.execute("select * from t_kota where stat = 1 and nama like '%"+keyword+"%'");
        var dataCity = [];
        dataCity.push({
            id: null,
            idProvinsi: 0,
            nama: 'Indonesia',
            title: 'Indonesia',
            utc: 7
        });
        for (x = 0; x < selectCity.getRowCount(); x++) {
            dataCity.push({
                id: selectCity.fieldByName('id'),
                idProvinsi: selectCity.fieldByName('idProvinsi'),
                nama: selectCity.fieldByName('nama'),
                title: selectCity.fieldByName('nama'),
                utc: selectCity.fieldByName('utc')

            });
            selectCity.next();
        }
        selectCity = null;
        tableCity.close();
        return dataCity;
    };

    BizDir.selectProvinceSearch = function (keyword) {
        var tableProvince = Ti.Database.open('BizDir');
        var selectProvince = tableProvince.execute("select * from t_provinsi where stat = 1  and nama like '%"+keyword+"%'");
        var dataProvince = [];
        dataProvince.push({
            id: null,
            nama: 'Indonesia',
            title: 'Indonesia',
            utc: 7
        });
        for (x = 0; x < selectProvince.getRowCount(); x++) {
            dataProvince.push({
                id: selectProvince.fieldByName('id'),
                nama: selectProvince.fieldByName('nama'),
                title: selectProvince.fieldByName('nama'),
                utc: selectProvince.fieldByName('utc')
            });
            selectProvince.next();
        }
        selectProvince = null;
        tableProvince.close();
        return dataProvince;
    };

    BizDir.selectAnggota = function (page, limit, location, cityID) {
    	
    	// Ti.API.info('Masuk City 1:' +cityID);
    	// Ti.API.info('Masuk Province 1:'+location);
    	var provinceFilter = '';
        var cityFilter = '';
        if (location !== 0 && location !== null && location !== undefined) {
        	Ti.API.info('Masuk Province 2:'+location);
            provinceFilter = " and t_anggota.idProvinsi = " + location; 
        }
         if (cityID !== null && cityID !== undefined &&  cityID !== 0) {
         	Ti.API.info('Masuk City 2'+cityID);
            cityFilter = " and t_anggota.idKota = " + cityID; 
            provinceFilter = "";
        }
        var db = Ti.Database.open('BizDir');
        
        var selectAnggota = db.execute("select t_anggota.*, t_kota.nama as city, t_provinsi.nama as province "+
        " from t_anggota "+
        " left join t_kota on t_kota.id = t_anggota.idKota "+  
        " left join t_provinsi on t_provinsi.id = t_anggota.idProvinsi "+
        " where t_anggota.stat = 1 " + provinceFilter + " " + cityFilter + " limit " + page + "," + limit + "");
        var dataAnggota = [];
        for (x = 0; x < selectAnggota.getRowCount(); x++) {
            dataAnggota.push({
                id: selectAnggota.fieldByName('id'),
                nama: selectAnggota.fieldByName('nama'),
                logo: selectAnggota.fieldByName('logo'),
                alamat: selectAnggota.fieldByName('alamat'),
                kota: selectAnggota.fieldByName('city'),
                kodePos: selectAnggota.fieldByName('kodePos'),
                kecamatan: selectAnggota.fieldByName('kecamatan'),
                kelurahan: selectAnggota.fieldByName('kelurahan'),
                provinsi: selectAnggota.fieldByName('province'),
                email: selectAnggota.fieldByName('email'),
                telepon: selectAnggota.fieldByName('telepon'),
                produk: selectAnggota.fieldByName('produk'),
                verifikasi: selectAnggota.fieldByName('verifikasi'),
                dir: selectAnggota.fieldByName('dir')
            });
            selectAnggota.next();
        }
        selectAnggota = null;
        db.close();
        return dataAnggota;
    };
    
    BizDir.faveAnggota = function (fave, location, cityID) {
        var provinceFilter = '';
        var cityFilter = '';
        if (location !== 0 && location !== null && location !== undefined) {
        	Ti.API.info('Masuk Province 2:'+location);
            provinceFilter = " and t_anggota.idProvinsi = " + location; 
        }
         if (cityID !== null && cityID !== undefined &&  cityID !== 0) {
         	Ti.API.info('Masuk City 2'+cityID);
            cityFilter = " and t_anggota.idKota = " + cityID; 
            provinceFilter = "";
        }
        var db = Ti.Database.open('BizDir');
        var selectAnggota = db.execute("select t_anggota.*, t_kota.nama as city, t_provinsi.nama as province "+
        " from t_anggota "+
        " left join t_kota on t_kota.id = t_anggota.idKota "+  
        " left join t_provinsi on t_provinsi.id = t_anggota.idProvinsi "+
        " where t_anggota.stat = 1 " + provinceFilter + " " + cityFilter + " and t_anggota.id IN ("+fave+")");
        var dataAnggota = [];
        for (x = 0; x < selectAnggota.getRowCount(); x++) {
            dataAnggota.push({
                id: selectAnggota.fieldByName('id'),
                nama: selectAnggota.fieldByName('nama'),
                logo: selectAnggota.fieldByName('logo'),
                alamat: selectAnggota.fieldByName('alamat'),
                kota: selectAnggota.fieldByName('city'),
                kodePos: selectAnggota.fieldByName('kodePos'),
                kecamatan: selectAnggota.fieldByName('kecamatan'),
                kelurahan: selectAnggota.fieldByName('kelurahan'),
                provinsi: selectAnggota.fieldByName('province'),
                email: selectAnggota.fieldByName('email'),
                telepon: selectAnggota.fieldByName('telepon'),
                produk: selectAnggota.fieldByName('produk'),
                verifikasi: selectAnggota.fieldByName('verifikasi'),
                dir: selectAnggota.fieldByName('dir')
            });
            selectAnggota.next();
        }
        selectAnggota = null;
        db.close();
        return dataAnggota;
    };


    BizDir.searchAnggota = function (page, limit, keyword, location, cityID) {        
        var provinceFilter = '';
        var cityFilter = '';
        if (location !== 0 && location !== null && location !== undefined) {
        	Ti.API.info('Masuk Province 2:'+location);
            provinceFilter = " and t_anggota.idProvinsi = " + location; 
        }
         if (cityID !== null && cityID !== undefined &&  cityID !== 0) {
         	Ti.API.info('Masuk City 2'+cityID);
            cityFilter = " and t_anggota.idKota = " + cityID; 
            provinceFilter = "";
        }
        var db = Ti.Database.open('BizDir');

        var selectAnggota = db.execute("select t_anggota.*, t_kota.nama as city, t_provinsi.nama as province "+
        " from t_anggota "+
        " left join t_kota on t_kota.id = t_anggota.idKota "+  
        " left join t_provinsi on t_provinsi.id = t_anggota.idProvinsi "+
        "where t_anggota.stat = 1 " + provinceFilter + " " + cityFilter + " and t_anggota.nama like '%" + keyword + "%' limit " + page + "," + limit + "");
        var dataAnggota = [];
        for (x = 0; x < selectAnggota.getRowCount(); x++) {
            dataAnggota.push({
                id: selectAnggota.fieldByName('id'),
                nama: selectAnggota.fieldByName('nama'),
                logo: selectAnggota.fieldByName('logo'),
                alamat: selectAnggota.fieldByName('alamat'),
                kota: selectAnggota.fieldByName('city'),
                kodePos: selectAnggota.fieldByName('kodePos'),
                kecamatan: selectAnggota.fieldByName('kecamatan'),
                kelurahan: selectAnggota.fieldByName('kelurahan'),
                provinsi: selectAnggota.fieldByName('province'),
                email: selectAnggota.fieldByName('email'),
                telepon: selectAnggota.fieldByName('telepon'),
                produk: selectAnggota.fieldByName('produk'),
                verifikasi: selectAnggota.fieldByName('verifikasi'),
                dir: selectAnggota.fieldByName('dir')
            });
            selectAnggota.next();
        }
        selectAnggota = null;
        db.close();
        return dataAnggota;
    };

    BizDir.selectAnggotaByCategory = function (page, limit, location, cityID, subcatid) {
        var provinceFilter = '';
        var cityFilter = '';
        if (location !== 0 && location !== null && location !== undefined) {
        	Ti.API.info('Masuk Province 2:'+location);
            provinceFilter = " and t_anggota.idProvinsi = " + location; 
        }
         if (cityID !== null && cityID !== undefined &&  cityID !== 0) {
         	Ti.API.info('Masuk City 2'+cityID);
            cityFilter = " and t_anggota.idKota = " + cityID; 
            provinceFilter = "";
        }
        var db = Ti.Database.open('BizDir');

        var selectAnggota = db.execute("select t_anggota.*, t_kota.nama as city, t_provinsi.nama as province "+
        	"from t_anggota  "+
        	" left join t_category_assignment on t_category_assignment.idAnggota = t_anggota.id "+
        	" left join t_kota on t_kota.id = t_anggota.idKota "+  
        	" left join t_provinsi on t_provinsi.id = t_anggota.idProvinsi "+
        	" where t_anggota.stat = 1 " + provinceFilter + " " + cityFilter + " AND t_category_assignment.idSubCategory = '"+subcatid+"' limit " + page + "," + limit + "");
        var dataAnggota = [];
        for (x = 0; x < selectAnggota.getRowCount(); x++) {
            dataAnggota.push({
                id: selectAnggota.fieldByName('id'),
                nama: selectAnggota.fieldByName('nama'),
                logo: selectAnggota.fieldByName('logo'),
                alamat: selectAnggota.fieldByName('alamat'),
                kota: selectAnggota.fieldByName('city'),
                kodePos: selectAnggota.fieldByName('kodePos'),
                kecamatan: selectAnggota.fieldByName('kecamatan'),
                kelurahan: selectAnggota.fieldByName('kelurahan'),
                provinsi: selectAnggota.fieldByName('province'),
                email: selectAnggota.fieldByName('email'),
                telepon: selectAnggota.fieldByName('telepon'),
                produk: selectAnggota.fieldByName('produk'),
                verifikasi: selectAnggota.fieldByName('verifikasi'),
                dir: selectAnggota.fieldByName('dir')
            });
            selectAnggota.next();
        }
        selectAnggota = null;
        db.close();
        return dataAnggota;
    };


    BizDir.selectFaveDetail = function (listingid) {
        var db = Ti.Database.open('BizDir');
        var selectFave = db.execute('select * from fave where listingid=\'' + listingid + '\'');
        var store = [];
        for (i = 0; i < selectFave.getRowCount(); i++) {
            store.push({
                listingid: selectFave.fieldByName('listingid')
            });
            selectFave.next();
        }
        selectFave = null;
        db.close();
        return store;
    };

    BizDir.selectCategory = function () {
        var db = Ti.Database.open('BizDir');
        var query = db.execute('select * from t_category where stat = 1');
        var data = [];
        
        for (x = 0; x < query.getRowCount(); x++) {
            data.push({
                id: query.fieldByName('id'),
                nama: query.fieldByName('nama'),
                picture: query.fieldByName('picture'),
                deskripsi: query.fieldByName('deskripsi')
            });
            query.next();
        }
        query = null;
        db.close();
        return data;
    };

    BizDir.selectSubCategory = function (id) {
        var db = Ti.Database.open('BizDir');
        var query = db.execute("select * from t_category_sub where stat = 1 and idCategory = '" + id + "'");
        var data = [];
    	
        for (x = 0; x < query.getRowCount(); x++) {
            data.push({
                id: query.fieldByName('id'),
                nama: query.fieldByName('nama'),
                idcategory: query.fieldByName('idCategory')
            });
            query.next();
        }
        query = null;
        db.close();
        return data;
    };
    
    BizDir.selectEvent = function (idsub) {
        var db = Ti.Database.open('BizDir');
        var query = db.execute('SELECT * FROM t_event where idCategorySub = '+idsub+' and stat = 1 order by startDate desc');
        var data = [];
        for (x = 0; x < query.getRowCount(); x++) {
            data.push({
                id: query.fieldByName('id'),
                title: query.fieldByName('title'),
                startDate: query.fieldByName('startDate'),
                startTime: query.fieldByName('startTime'),
                endDate: query.fieldByName('endDate'),
                endTime: query.fieldByName('endTime'),
                description: query.fieldByName('description'),
                kadinId: query.fieldByName('kadinId')
            });
            query.next();
        }
        query = null;
        db.close();
        return data;
    };

})();