/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */
 

var NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');
const exec = require('child_process').exec; 



module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-WunderGround helper started ...');
	this.fetcherRunning = false;
	this.wunderPayload = "";
  },

  getWifi: function() {
    var self = this;

    console.log('Execute wlan probe');
    exec('sudo iw wlan0 link', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        var wifilink=stdout.split("\n");
        for( var i = 0; i < wifilink.length; ++i ) {
            if (wifilink[i].indexOf('SSID:') !== -1) {
                var apArr=wifilink[i].split(" ");
                var ap=apArr[1];
                console.log(ap);
            }
            if (wifilink[i].indexOf('signal:') !== -1) {
                var signalArr = wifilink[i].split(" ");
                var signal = String(130 + parseInt(signalArr[1]));
                console.log(signal);
            }
        }
        self.sendSocketNotification('WIFI_STRENGTH', {'wifi_strength':signal.toString(),'wifi_ap':ap});
    });
  },
  
  getStorage: function() {
    var self = this;

    console.log('Execute wlan probe');
    exec('df -h --output=size,used,avail,pcent /', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        var storage=stdout.split("\n");
		var storageArr=storage[1].split(/\s+/);

        self.sendSocketNotification('SYSTEM_STORAGE', {'store_size':storageArr[1],'store_used':storageArr[2],'store_avail':storageArr[3],'store_pcent':storageArr[4]});
    });
  },

  
  getTemp: function() {
        var self = this;
        exec('/opt/vc/bin/vcgencmd measure_temp', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            var tempArr=stdout.split("=");
            var temp=tempArr[1];
            console.log(temp);
            self.sendSocketNotification('SYSTEM_TEMP', {'system_temp':temp});
        });
  },

  getMem: function() {
        var self = this;
        exec('free -oh|grep Mem:', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            
            var memArr=stdout.split(/\s+/);
            self.sendSocketNotification('SYSTEM_MEM', {'mem_size':String(memArr[1]),'mem_used':memArr[2],'mem_free':memArr[3]});
        });
  },
  
  fetchWunderground: function() {
        var self = this;
        this.fetcherRunning = true; 
        
        var params = this.config.apikey;
        var wulang = this.config.lang.toUpperCase();
        if (wulang == "DE") {
            wulang = "DL";
        }
        params +=
            "/conditions/hourly/forecast10day/astronomy/alerts/lang:" +
            wulang;
        params += "/q/" + this.config.pws;
        params += ".json";
        
        var Wurl = this.config.apiBase + params;
		console.log(moment().format() + " 4 " + this.name  + ": " + Wurl);
        request({
            url: Wurl,
            method: 'GET'
                }, function(error, response, body) {

                    if (!error && response.statusCode == 200) {
                        this.wunderPayload = body;
                        // console.log(moment().format() + " 5 " + self.name + ": " + body);
                        self.sendSocketNotification('WUNDERGROUND',body);
                    } else {
                        console.log(moment().format() + " 6 " + self.name + ": " + error);
                    }
                        
                    setTimeout(function() {
                        self.fetchWunderground();
                    }, self.config.updateInterval);

                }
        );
        
        


  },
  
  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    console.log(notification);
    
    var self = this;
    
    if(notification === "GET_WUNDERGROUND"){
            
        this.config = payload;
        console.log('Lets get WunderGround');

        if (!this.fetcherRunning) {
            this.fetchWunderground();
        } else {
	        var self = this;
        
			var params = this.config.apikey;
			var wulang = this.config.lang.toUpperCase();
			if (wulang == "DE") {
				wulang = "DL";
			}
			params +=
				"/conditions/hourly/forecast10day/astronomy/alerts/lang:" +
				wulang;
			params += "/q/" + this.config.pws;
			params += ".json";
			
			var Wurl = this.config.apiBase + params;
			console.log(moment().format() + " 3 " + this.name  + ": " + Wurl);
			request({
				url: Wurl,
				method: 'GET'
					}, function(error, response, body) {
	
						if (!error && response.statusCode == 200) {
								this.wunderPayload = body;
                                // console.log(moment().format() + " 1 " + self.name + ": " + body);
                                self.sendSocketNotification('WUNDERGROUND',body);
						} else {
                            console.log(moment().format() + " 2 " + self.name + ": " + error);
                        }
                        
                }
			);
        
        }			
    }
    
    if (notification === 'GET_WIFI') {
      this.getWifi();
    }
    if (notification === 'GET_SYSTEM_TEMP') {
      this.getTemp();
    }
    if (notification === 'GET_SYSTEM_MEM') {
      this.getMem();
    }
    if (notification === 'GET_SYSTEM_STORAGE') {
      this.getStorage();
    }
  }

});
