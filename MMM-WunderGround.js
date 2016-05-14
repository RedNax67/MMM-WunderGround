/* global Module */

/* Magic Mirror
 * Module: WeatherForecast
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("MMM-WunderGround",{

	// Default module config.
	defaults: {
		location: "",
		apikey: "",
		units: config.units,
		maxNumberOfDays: 7,
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 1000,
		timeFormat: config.timeFormat,
		lang: config.language,
		showWindDirection: true,
		fade: true,
		fadePoint: 0.25, // Start on 1/4th of the list.
		tz: "",

		initialLoadDelay: 2500, // 2.5 seconds delay. This delay is used to keep the OpenWeather API happy.
		retryDelay: 2500,

		apiVersion: "2.5",
		apiBase: "http://api.wunderground.com/api/",

		iconTable: {                        
            // meteoblue
            "clear": "wi-day-sunny",
			"partlycloudy": "wi-day-sunny-overcast",
			"mostlycloudy": "wi-day-cloudy",
			"cloudy": "wi-cloudy",
            "fog": "wi-day-fog",
            "chancerain": "wi-rain",
            "sleet": "wi-day-rain-mix",
            "tstorms": "wi-day-thunderstorm",
			"snow": "wi-snow",
			"10": "wi-day-snow",
			"11": "wi-rain-mix",
            "12": "wi-sprinkle",
			"13": "wi-day-snow",
            "rain": "wi-day-rain",
            "15": "wi-day-snow",
    
	"16": "wi-day-sprinkle",
            "17": "wi-day-snow"
		},
	},

	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return ["weather-icons.css", "weather-icons-wind.css", "MMM-WunderGround.css" ];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		
		// Set locale.
		moment.locale(config.language);

		this.forecast = [];
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
			wrapper.innerHTML = "Please set the correct openweather <i>appid</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.config.city === "") {
			wrapper.innerHTML = "Please set the openweather <i>location</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = "Weerbericht laden...";
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

		var row = document.createElement("tr");
		table.appendChild(row);
			
		var forecastTextCell = document.createElement("td");
		forecastTextCell.className = "forecastText";
		forecastTextCell.innerHTML = this.forecastText.replace(/\.\ /g, ".<br>");
		forecastTextCell.setAttribute("colSpan", "0");
		row.appendChild(forecastTextCell);

		for (var f in this.forecast) {
			var forecast = this.forecast[f];

			var row = document.createElement("tr");
			table.appendChild(row);

			var dayCell = document.createElement("td");
			dayCell.className = "day";
			dayCell.innerHTML = forecast.day;
			row.appendChild(dayCell);

			var iconCell = document.createElement("td");
			iconCell.className = "bright weather-icon";
			row.appendChild(iconCell);

			var icon = document.createElement("span");
			icon.className = "align-center wi " + forecast.icon;
			iconCell.appendChild(icon);

			var maxTempCell = document.createElement("td");
			maxTempCell.innerHTML = forecast.maxTemp;
			maxTempCell.className = "align-right bright max-temp";
			row.appendChild(maxTempCell);

			var minTempCell = document.createElement("td");
			minTempCell.innerHTML = forecast.minTemp;
			minTempCell.className = "align-right min-temp";
			row.appendChild(minTempCell);

			var popCell = document.createElement("td");
			popCell.innerHTML = forecast.pop + "%";
			popCell.className = "align-right min-temp";
			row.appendChild(popCell);


			var mmCell = document.createElement("td");
			mmCell.innerHTML = forecast.mm + "mm";
			mmCell.className = "align-right min-temp";
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
					Log.error(self.name + ": Could not load weather.");
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
		params += "/conditions/forecast10day/astronomy/lang:" + this.config.lang;
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
		
		this.temperature = data.current_observation.temp_c;
		this.weatherType = this.config.iconTable[data.current_observation.icon];
		this.windSpeed = "wi-wind-beaufort-" + this.ms2Beaufort(data.current_observation.wind_kph);
		this.windDirection = this.deg2Cardinal(data.current_observation.wind_degrees);
		this.forecastText = data.forecast.txt_forecast.forecastday[0].fcttext_metric;

		this.forecast = [];
		for (var i = 0, count = data.forecast.simpleforecast.forecastday.length; i < count; i++) {

			var forecast = data.forecast.simpleforecast.forecastday[i];
			this.forecast.push({

				day:     forecast.date.weekday_short,
				maxTemp: forecast.high.celsius,
				minTemp: forecast.low.celsius,
				icon:    this.config.iconTable[forecast.icon],
				pop:	 forecast.pop,
				mm:		 forecast.qpf_allday.mm
			});
		}
		
		
		var now = new Date();
        		
		var sunrise = new Date();
		sunrise.setHours(data.sun_phase.sunrise.hour);
		sunrise.setMinutes(data.sun_phase.sunrise.minute);
		
		//if ( now > sunrise ) { sunrise = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000); }

		var sunset = new Date();
		sunset.setHours(data.sun_phase.sunset.hour);
		sunset.setMinutes(data.sun_phase.sunset.minute);
		
		//if ( now > sunset ) { sunset = new Date(sunset.getTime() + 24 * 60 * 60 * 1000); }

		
		
		// The moment().format('h') method has a bug on the Raspberry Pi.
		// So we need to generate the timestring manually.
		// See issue: https://github.com/MichMich/MagicMirror/issues/181

		var sunriseSunsetDateObject = (sunrise < now && sunset > now) ? sunset : sunrise;
		var timeString = moment(sunriseSunsetDateObject).format('HH:mm');

		if (this.config.timeFormat !== 24) {
			//var hours = sunriseSunsetDateObject.getHours() % 12 || 12;
			if (this.config.showPeriod) {
				if (this.config.showPeriodUpper) {
					//timeString = hours + moment(sunriseSunsetDateObject).format(':mm A');
					timeString = moment(sunriseSunsetDateObject).format('h:mm A');
				} else {
					//timeString = hours + moment(sunriseSunsetDateObject).format(':mm a');
					timeString = moment(sunriseSunsetDateObject).format('h:mm a');
				}
			} else {
				//timeString = hours + moment(sunriseSunsetDateObject).format(':mm');
				timeString = moment(sunriseSunsetDateObject).format('h:mm');
			}
		}

		this.sunriseSunsetTime = timeString;
		this.sunriseSunsetIcon = (sunrise < now && sunset > now) ? "wi-sunset" : "wi-sunrise";

		
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
