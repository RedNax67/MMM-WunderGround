/* global Module */

/* Magic Mirror
 * Module: WunderGround
 *
 * By RedNax
 * MIT Licensed.
 */

Module.register("MMM-WunderGround",{

	// Default module config.
	defaults: {
		apikey: "",
		pws: "",		
		units: config.units,
		//units: 'imperial',
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 1000,
		timeFormat: config.timeFormat,
		lang: config.language,
		showWindDirection: true,
		fade: true,
		fadePoint: 0.25, // Start on 1/4th of the list.
		tz: "",
		//lang: 'NL', 
		fcdaycount: "5",
		fcdaystart: "0",
		hourly: '0',
		hourlyinterval: "3",
		hourlycount: "2",
		fctext: '1',
		alerttime: 5000,
		


		initialLoadDelay: 2500, // 2.5 seconds delay. This delay is used to keep the OpenWeather API happy.
		retryDelay: 2500,

		apiBase: "http://api.wunderground.com/api/",

		iconTableDay: {                        
            "chanceflurries": "wi-day-snow-wind",
            "chancerain": "wi-day-showers",
            "chancesleet": "wi-day-sleet",
            "chancesnow": "wi-day-snow",
            "chancetstorms": "wi-day-storm-showers",
            "clear": "wi-day-sunny",
            "cloudy": "wi-cloud",
            "flurries": "wi-snow-wind",
            "fog": "wi-fog",
            "haze": "wi-day-haze",
            "mostlycloudy": "wi-cloudy",
            "mostlysunny": "wi-day-sunny-overcast",
            "partlycloudy": "wi-day-cloudy",
            "partlysunny": "wi-day-cloudy-high",
            "rain": "wi-rain",
            "sleet": "wi-sleet",
            "snow": "wi-snow",
            "tstorms": "wi-thunderstorm"
		},
		
		iconTableNight: {                        
			"chanceflurries": "wi-night-snow-wind",
			"chancerain": "wi-night-showers",
			"chancesleet": "wi-night-sleet",
			"chancesnow": "wi-night-alt-snow",
			"chancetstorms": "wi-night-alt-storm-showers",
			"clear": "wi-night-clear",
			"cloudy": "wi-night-alt-cloudy",
			"flurries": "wi-night-alt-snow-wind",
			"fog": "wi-night-fog",
			"haze": "wi-night-alt-cloudy-windy",
			"mostlycloudy": "wi-night-alt-cloudy",
			"mostlysunny": "wi-night-alt-partly-cloudy",
			"partlycloudy": "wi-night-alt-partly-cloudy",
			"partlysunny": "wi-night-alt-partly-cloudy",
			"rain": "wi-night-alt-rain",
			"sleet": "wi-night-alt-sleet",
			"snow": "wi-night-alt-snow",
			"tstorms": "wi-night-alt-thunderstorm"
		}
	},

// Define required translations.
	getTranslations: function() {
		return {
            en: "translations/en.json",
            nl: "translations/nl.json",
			de: "translations/de.json",
			dl: "translations/de.json"			
		}
	},
	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return [this.file('weather-icons.css'), this.file('weather-icons-wind.css'), this.file('MMM-WunderGround.css') ];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		
		// Set locale.
		moment.locale(config.language);

		this.forecast = [];
		this.hourlyforecast = [];
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;

	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var table = document.createElement("table");
		table.className = "small";
		table.setAttribute("width", "25%");


		if (this.config.apikey === "") {
			wrapper.innerHTML = this.translate('APIKEY') + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}


		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		
		var small = document.createElement("div");
		small.className = "normal medium";

		var windIcon = document.createElement("span");
		windIcon.className = "wi " + this.windSpeed;
		small.appendChild(windIcon);
		
		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";
		small.appendChild(spacer);
		small.appendChild(spacer);

		var windDirectionIcon = document.createElement("span");
		windDirectionIcon.className = "wi wi-wind " + this.windDirection;
		small.appendChild(windDirectionIcon);
				
		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";
		small.appendChild(spacer);
		
		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";
		small.appendChild(spacer);

		var sunriseSunsetIcon = document.createElement("span");
		sunriseSunsetIcon.className = "wi dimmed " + this.sunriseSunsetIcon;
		small.appendChild(sunriseSunsetIcon);

		var sunriseSunsetTime = document.createElement("span");
		sunriseSunsetTime.innerHTML = " " + this.sunriseSunsetTime;
		small.appendChild(sunriseSunsetTime);

		var large = document.createElement("div");
		large.className = "large light";

		var weatherIcon = document.createElement("span");
		weatherIcon.className = "wi weathericon " + this.weatherType;
		large.appendChild(weatherIcon);

		var temperature = document.createElement("span");
		temperature.className = "bright";
		temperature.innerHTML = " " + this.temperature + "&deg;";
		large.appendChild(temperature);
				
		wrapper.appendChild(small);
		wrapper.appendChild(large);
		
		
		// Forecast table

		var row = document.createElement("tr");
		table.appendChild(row);

        if ( this.config.fctext == 1 ) {		
		  var forecastTextCell = document.createElement("td");
		  forecastTextCell.className = "forecastText";
		  forecastTextCell.setAttribute("colSpan", "10");
		  forecastTextCell.innerHTML = this.forecastText;
		
		  row.appendChild(forecastTextCell);
		}

		var row = document.createElement("tr");
		
		var dayHeader = document.createElement("th");
		dayHeader.className = "day"
		dayHeader.innerHTML = ""
		row.appendChild(dayHeader);
		
		var iconHeader = document.createElement("th");
		iconHeader.className = "tableheader icon"
		iconHeader.innerHTML = ""
		row.appendChild(iconHeader);
		
		var maxtempHeader = document.createElement("th");
		maxtempHeader.className = "align-center bright tableheader"
		row.appendChild(maxtempHeader);

        var maxtempicon = document.createElement("span");
        maxtempicon.className = "wi wi-thermometer";
        maxtempHeader.appendChild(maxtempicon);
		
	
		var mintempHeader = document.createElement("th");
		mintempHeader.className = "align-center bright tableheader"
		row.appendChild(mintempHeader);

        var mintempicon = document.createElement("span");
        mintempicon.className = "wi wi-thermometer-exterior";
        mintempHeader.appendChild(mintempicon);

		
		var popiconHeader = document.createElement("th");
		popiconHeader.className = "align-center bright tableheader";
		popiconHeader.setAttribute("colSpan", "10");
		row.appendChild(popiconHeader);

        var popicon = document.createElement("span");
        popicon.className = "wi wi-umbrella";
		popicon.setAttribute("colSpan", "10");
        popiconHeader.appendChild(popicon);
		
		table.appendChild(row);

		if (this.config.hourly == 1 ) {
			for (var f in this.forecast) {
				var forecast = this.hourlyforecast[f * this.config.hourlyinterval];
	
				var row = document.createElement("tr");
				table.appendChild(row);
	
				var hourCell = document.createElement("td");
				hourCell.className = "hour";
				hourCell.innerHTML = forecast.hour;
				row.appendChild(hourCell);
	
				var iconCell = document.createElement("td");
				iconCell.className = "align-center bright weather-icon";
				row.appendChild(iconCell);
	
				var icon = document.createElement("span");
				icon.className = "wi " + forecast.icon;
				iconCell.appendChild(icon);
	
				var maxTempCell = document.createElement("td");
				maxTempCell.innerHTML = forecast.maxTemp + "&deg;";
				maxTempCell.className = "align-right max-temp";
				row.appendChild(maxTempCell);
	
				var minTempCell = document.createElement("td");
				minTempCell.innerHTML = forecast.minTemp + "&deg;";
				minTempCell.className = "align-right min-temp";
				row.appendChild(minTempCell);
	
				var popCell = document.createElement("td");
				popCell.innerHTML = forecast.pop + "%";
				popCell.className = "align-right pop";
				row.appendChild(popCell);
	
				var mmCell = document.createElement("td");
				if  ( this.config.units == 'metric' ) {
					mmCell.innerHTML = forecast.mm + "mm";
					mmCell.className = "align-right mm";
				} else {
					mmCell.innerHTML = forecast.mm + "in";
					mmCell.className = "align-right mm";
					
				}
				row.appendChild(mmCell);
	
				if ( f > this.config.hourlycount ) { break; }
			
           
			}
		}
		

		for (var f in this.forecast) {
			var forecast = this.forecast[f];

			var row = document.createElement("tr");
			table.appendChild(row);

			var dayCell = document.createElement("td");
			dayCell.className = "day";
			dayCell.innerHTML = forecast.day;
			row.appendChild(dayCell);

            var iconCell = document.createElement("td");
            iconCell.className = "align-center bright weather-icon";
            row.appendChild(iconCell);

            var icon = document.createElement("span");
            icon.className = "wi " + forecast.icon;
            iconCell.appendChild(icon);

			var maxTempCell = document.createElement("td");
			maxTempCell.innerHTML = forecast.maxTemp + "&deg;";
			maxTempCell.className = "align-right max-temp";
			row.appendChild(maxTempCell);

			var minTempCell = document.createElement("td");
			minTempCell.innerHTML = forecast.minTemp + "&deg;";
			minTempCell.className = "align-right min-temp";
			row.appendChild(minTempCell);

			var popCell = document.createElement("td");
			popCell.innerHTML = forecast.pop + "%";
			popCell.className = "align-right pop";
			row.appendChild(popCell);

			var mmCell = document.createElement("td");
			if  ( this.config.units == 'metric' ) {
				mmCell.innerHTML = forecast.mm + "mm";
				mmCell.className = "align-right mm";
			} else {
				mmCell.innerHTML = forecast.mm + "in";
				mmCell.className = "align-right mm";
				
			}
			row.appendChild(mmCell);

			if (this.config.fade && this.config.fadePoint < 1) {
				if (this.config.fadePoint < 0) {
					this.config.fadePoint = 0;
				}
				var startingPoint = this.forecast.length * this.config.fadePoint;
				var steps = this.forecast.length - startingPoint;
				if (f >= startingPoint) {
					var currentStep = f - startingPoint;
					row.style.opacity = 1 - (1 / steps * currentStep);
				}
			}

		}
		wrapper.appendChild(table);

		return wrapper;
	},

	/* updateWeather(compliments)
	 * Requests new data from openweather.org.
	 * Calls processWeather on succesfull response.
	 */
	updateWeather: function() {
		var url = this.config.apiBase + this.getParams();
		var self = this;
		var retry = true;

		var weatherRequest = new XMLHttpRequest();
		weatherRequest.open("GET", url, true);
		weatherRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processWeather(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.config.appid = "";
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect APPID.");
					retry = false;
				} else {
					Log.error(self.name + ":* Could not load weather.");
				}

				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		weatherRequest.send();
	},

	/* getParams(compliments)
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams: function() {
        var params  = this.config.apikey;
		var wulang = this.config.lang.toUpperCase();
		if ( wulang == "DE" ) {
			wulang = "DL";
		}
		params += "/conditions/hourly/forecast10day/astronomy/alerts/lang:" + wulang; 
		params += "/q/" + this.config.pws;
		params += ".json";
		
		console.log(params);
		

		return params;
	},

	/* processWeather(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - Weather information received form openweather.org.
	 */
	 
	processWeather: function(data) {
		
		
		var iconTable = this.config.iconTableDay;
		this.alerttext = "";
		this.alertmsg = "";
		
		var now = new Date();
        		
		var sunrise = new Date();
		this.sunrhour = Number(data.sun_phase.sunrise.hour);
		sunrise.setHours(data.sun_phase.sunrise.hour);
		sunrise.setMinutes(data.sun_phase.sunrise.minute);
		
		var sunset = new Date();
		this.sunshour = Number(data.sun_phase.sunset.hour);
		sunset.setHours(data.sun_phase.sunset.hour);
		sunset.setMinutes(data.sun_phase.sunset.minute);
		
		
		// The moment().format('h') method has a bug on the Raspberry Pi.
		// So we need to generate the timestring manually.
		// See issue: https://github.com/MichMich/MagicMirror/issues/181

		var sunriseSunsetDateObject = (sunrise < now && sunset > now) ? sunset : sunrise;
		var timeString = moment(sunriseSunsetDateObject).format('HH:mm');

		if (this.config.timeFormat !== 24) {
			if (this.config.showPeriod) {
				if (this.config.showPeriodUpper) {
					timeString = moment(sunriseSunsetDateObject).format('h:mm A');
				} else {
					timeString = moment(sunriseSunsetDateObject).format('h:mm a');
				}
			} else {
				timeString = moment(sunriseSunsetDateObject).format('h:mm');
			}
		}

		this.sunriseSunsetTime = timeString;
		this.sunriseSunsetIcon = (sunrise < now && sunset > now) ? "wi-sunset" : "wi-sunrise";
		this.iconTable = (sunrise < now && sunset > now) ? this.config.iconTableDay : this.config.iconTableNight;

		
		for (var i = 0, count = data.alerts.length; i < count; i++) {
			
				var talert = data.alerts[i].description;
				var malert = data.alerts[i].message;
				if ( talert.length < malert.length ) {
					talert =  malert;
				}
			    if ( this.config.alerttruncatestring != "" ) { 
					var ialert = talert.indexOf(this.config.alerttruncatestring);
					if ( ialert > 0 ) {
						talert = talert.substring(1,ialert);
					}
				}
				this.alertmsg = this.alertmsg + talert;
	
				this.alerttext = this.alerttext + "<B style=\"color:" + data.alerts[i].level_meteoalarm_name + "\">" + this.translate(data.alerts[i].type) + "</B>";
				if ( i < (count - 1) ) {
						this.alerttext = this.alerttext + "<BR>";
				} 
			
		}
		
		if ( this.alertmsg != "" ) {
			this.sendNotification("SHOW_ALERT", {type: "alert", message: this.alertmsg, title: this.alerttext, timer: this.config.alerttime });
		}
			
		this.weatherType = this.iconTable[data.current_observation.icon];
		this.windDirection = this.deg2Cardinal(data.current_observation.wind_degrees);
		this.windSpeed = "wi-wind-beaufort-" + this.ms2Beaufort(data.current_observation.wind_kph);

		if  ( this.config.units == 'metric' ) {
			this.temperature = data.current_observation.temp_c;
			this.forecastText = this.wordwrap(data.forecast.txt_forecast.forecastday[0].fcttext_metric,30,'<BR>'); //  Wordwrap the text so it doesn't mess up the display 
		} else {
			this.temperature = data.current_observation.temp_f;
			this.forecastText = this.wordwrap(data.forecast.txt_forecast.forecastday[0].fcttext,30,'<BR>'); //  Wordwrap the text so it doesn't mess up the display 
		}
		
		this.forecastText = "<B>" + this.alerttext + "</B><BR>" + this.forecastText;
		

		this.forecast = [];
		for (var i = this.config.fcdaystart, count = data.forecast.simpleforecast.forecastday.length; i < this.config.fcdaycount ; i++) {
			
			

			var forecast = data.forecast.simpleforecast.forecastday[i];
			
			if  ( this.config.units == 'metric' ) {
					this.tmaxTemp = forecast.high.celsius,
					this.tminTemp = forecast.low.celsius,
					this.tmm = forecast.qpf_allday.mm
			} else {
					this.tmaxTemp = forecast.high.fahrenheit,
					this.tminTemp = forecast.low.fahrenheit,
					this.tmm = forecast.qpf_allday.in
			}
			
			var fcticon = 

			this.forecast.push({

				day:     forecast.date.weekday_short,
				maxTemp: this.tmaxTemp,
				minTemp: this.tminTemp,
				icon:    this.iconTable[forecast.icon],
				pop:	 forecast.pop,
				mm:		 this.tmm
			});
			
			
		}

		if (this.config.hourly == 1 ) {
		this.hourlyforecast = [];
		for (var i = 0, count = data.hourly_forecast.length; i < count; i++) {

			var hourlyforecast = data.hourly_forecast[i];
			
			if  ( this.config.units == 'metric' ) {
					this.tmaxTemp = hourlyforecast.temp.metric,
					this.tminTemp = hourlyforecast.feelslike.metric,
					this.tmm = hourlyforecast.qpf.metric,
					this.thour = hourlyforecast.FCTTIME.hour + ":00"
			} else {
					this.tmaxTemp = hourlyforecast.temp.english,
					this.tminTemp = hourlyforecast.feelslike.english,
					this.tmm = hourlyforecast.qpf.english
					this.thour = hourlyforecast.FCTTIME.civil
			}
			this.tthour=Number(hourlyforecast.FCTTIME.hour);
			this.ForecastIcon = (this.sunrhour < this.tthour && this.sunshour > this.tthour) ? this.config.iconTableDay[hourlyforecast.icon] : this.config.iconTableNight[hourlyforecast.icon];
			


			this.hourlyforecast.push({

				hour:    this.thour,
				maxTemp: this.tmaxTemp,
				minTemp: this.tminTemp,
				icon:    this.ForecastIcon,
				pop:	 hourlyforecast.pop,
				mm:		 this.tmm
			});
		}
		}
		
		
		
		
		Log.log(this.forecast);

		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updateWeather();
		}, nextLoad);
	},

	/* ms2Beaufort(ms)
	 * Converts m2 to beaufort (windspeed).
	 *
	 * argument ms number - Windspeed in m/s.
	 *
	 * return number - Windspeed in beaufort.
	 */
	ms2Beaufort: function(kmh) {
		var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
		for (var beaufort in speeds) {
			var speed = speeds[beaufort];
			if (speed > kmh) {
				return beaufort;
			}
		}
		return 12;
	},
	
	wordwrap: function ( str, width, brk ) {
 
    brk = brk || 'n';
    width = width || 75;
 
    if (!str) { return str; }
 
    var re = new RegExp('.{1,'+ width +'}(\\s|$)|\\ S+?(\\s|$)','g'); 
	
    return str.match( RegExp(re) ).join( brk );
 
},

		/* function(temperature)
	 * Rounds a temperature to 1 decimal.
	 *
	 * argument temperature number - Temperature.
	 *
	 * return number - Rounded Temperature.
	 */
	 
	deg2Cardinal: function(deg) {
                if (deg>11.25 && deg<=33.75){
                        return "wi-from-nne";
                }else if (deg>33.75 && deg<=56.25){  
                        return "wi-from-ne";
                }else if (deg>56.25 && deg<=78.75){
                        return "wi-from-ene";
                }else if (deg>78.75 && deg<=101.25){
                        return "wi-from-e";
                }else if (deg>101.25 && deg<=123.75){
                        return "wi-from-ese";
                }else if (deg>123.75 && deg<=146.25){
                        return "wi-from-se";
                }else if (deg>146.25 && deg<=168.75){
                        return "wi-from-sse";
                }else if (deg>168.75 && deg<=191.25){
                        return "wi-from-s";
                }else if (deg>191.25 && deg<=213.75){
                        return "wi-from-ssw";
                }else if (deg>213.75 && deg<=236.25){
                        return "wi-from-sw";
                }else if (deg>236.25 && deg<=258.75){
                        return "wi-from-wsw";
                }else if (deg>258.75 && deg<=281.25){
                        return "wi-from-w";
                }else if (deg>281.25 && deg<=303.75){
                        return "wi-from-wnw";
                }else if (deg>303.75 && deg<=326.25){
                        return "wi-from-nw";
                }else if (deg>326.25 && deg<=348.75){
                        return "wi-from-nnw";
                }else{
                         return "wi-from-n";
                }
	},

	/* function(temperature)
	 * Rounds a temperature to 1 decimal.
	 *
	 * argument temperature number - Temperature.
	 *
	 * return number - Rounded Temperature.
	 */
	roundValue: function(temperature) {
		return parseFloat(temperature).toFixed(1);
	}
});
