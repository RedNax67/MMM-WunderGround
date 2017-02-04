/* global Module */
/* Magic Mirror
 * Module: WunderGround
 *
 * By RedNax
 * MIT Licensed.
 */
Module.register("MMM-WunderGround", {

    // Default module config.
    defaults: {
        apikey: "",
        pws: "",
        currentweather: 1,
        coloricon: false,
        units: config.units,
        updateInterval: 10 * 60 * 1000, // every 10 minutes
        animationSpeed: 1000,
        timeFormat: config.timeFormat,
        lang: config.language,
        showWindDirection: true,
        fade: true,
        fadePoint: 0.25, // Start on 1/4th of the list.
        tz: "",
        fcdaycount: "5",
        fcdaystart: "0",
        hourly: "0",
        hourlyinterval: "3",
        hourlycount: "2",
        fctext: "1",
        alerttime: 5000,
        roundTmpDecs: 1,
        UseCardinals: 0,
        layout: "vertical",
        sysstat: 0,




        initialLoadDelay: 2500, // 2.5 seconds delay. This delay is used to keep the OpenWeather API happy.
        retryDelay: 2500,

        apiBase: "http://api.wunderground.com/api/",
		colorIconBase: "./modules/MMM-WunderGround/img/VCloudsWeatherIcons/",

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
            "hazy": "wi-day-haze",
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
            "hazy": "wi-night-alt-cloudy-windy",
            "mostlycloudy": "wi-night-alt-cloudy",
            "mostlysunny": "wi-night-alt-partly-cloudy",
            "partlycloudy": "wi-night-alt-partly-cloudy",
            "partlysunny": "wi-night-alt-partly-cloudy",
            "rain": "wi-night-alt-rain",
            "sleet": "wi-night-alt-sleet",
            "snow": "wi-night-alt-snow",
            "tstorms": "wi-night-alt-thunderstorm"
        },

        iconTableDayColor: {
            "chanceflurries": "chanceflurries.png",
            "chancerain": "chancerain.png",
            "chancesleet": "chancesleet.png",
            "chancesnow": "chancesnow.png",
            "chancetstorms": "chancestorms.png",
            "clear": "clear.png",
            "cloudy": "cloudy.png",
            "flurries": "flurries.png",
            "fog": "fog.png",
            "haze": "hazy.png",
            "hazy": "hazy.png",
            "mostlycloudy": "mostlycloudy.png",
            "mostlysunny": "mostlysunny.png",
            "partlycloudy": "partlycloudy.png",
            "partlysunny": "partlysunny.png",
            "rain": "rain.png",
            "sleet": "sleet.png",
            "snow": "snow.png",
            "tstorms": "tsstorms.png"
        },

        iconTableNightColor: {
            "chanceflurries": "nt_chanceflurries.png",
            "chancerain": "nt_chancerain.png",
            "chancesleet": "nt_chancesleet.png",
            "chancesnow": "nt_chancesnow.png",
            "chancetstorms": "nt_chancestorms.png",
            "clear": "nt_clear.png",
            "cloudy": "nt_cloudy.png",
            "flurries": "nt_flurries.png",
            "fog": "nt_fog.png",
            "haze": "nt_hazy.png",
            "hazy": "nt_hazy.png",
            "mostlycloudy": "nt_mostlycloudy.png",
            "mostlysunny": "nt_mostlysunny.png",
            "partlycloudy": "nt_partlycloudy.png",
            "partlysunny": "nt_partlysunny.png",
            "rain": "nt_rain.png",
            "sleet": "nt_sleet.png",
            "snow": "nt_snow.png",
            "tstorms": "nt_tsstorms.png"
        },

        moonPhaseTable: {
            "1": "wi-moon-new",
            "2": "wi-moon-waxing-crescent-1",
            "3": "wi-moon-waxing-crescent-2",
            "4": "wi-moon-waxing-crescent-3",
            "5": "wi-moon-waxing-crescent-4",
            "6": "wi-moon-waxing-crescent-5",
            "7": "wi-moon-waxing-crescent-6",
            "8": "wi-moon-first-quarter",
            "9": "wi-moon-waxing-gibbous-1",
            "10": "wi-moon-waxing-gibbous-2",
            "11": "wi-moon-waxing-gibbous-3",
            "12": "wi-moon-waxing-gibbous-4",
            "13": "wi-moon-waxing-gibbous-5",
            "14": "wi-moon-waxing-gibbous-6",
            "15": "wi-moon-full",
            "16": "wi-moon-waning-gibbous-1",
            "17": "wi-moon-waning-gibbous-2",
            "18": "wi-moon-waning-gibbous-3",
            "19": "wi-moon-waning-gibbous-4",
            "20": "wi-moon-waning-gibbous-5",
            "21": "wi-moon-waning-gibbous-6",
            "22": "wi-moon-third-quarter",
            "23": "wi-moon-waning-crescent-1",
            "24": "wi-moon-waning-crescent-2",
            "25": "wi-moon-waning-crescent-3",
            "26": "wi-moon-waning-crescent-4",
            "27": "wi-moon-waning-crescent-5",
            "28": "wi-moon-waning-crescent-6"
        }
    },

    // Define required translations.
    getTranslations: function () {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json",
            de: "translations/de.json",
            dl: "translations/de.json",
            fr: "translations/fr.json",
            pl: "translations/pl.json"
            
        };
    },

    // Define required scripts.
    getScripts: function () {
        return ["moment.js"];
    },

    // Define required scripts.
    getStyles: function () {
        return ["weather-icons.css", "weather-icons-wind.css",
            "MMM-WunderGround.css"
        ];
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting module: " + this.name);

        // Set locale.
        moment.locale(config.language);

        this.forecast = [];
        this.hourlyforecast = [];
        this.loaded = false;
        this.error = false;
        this.errorDescription = "";
        //this.scheduleUpdate(this.config.initialLoadDelay);
		this.getWunder();
        this.updateTimer = null;
		this.systemp = "";
		this.wifiap = "";
		this.wifistrength = "";
		this.storage_size = 0;
		this.storage_used = 0;
		this.storage_free = 0;
		this.storage_pcent = 0;
		this.mem_used =  0;
		this.mem_size = 0;
		this.mem_free = 0;
		this.haveforecast = 0;
		

    },
    
    getWunder: function() {
		Log.info("WunderGround: Getting weather.");
		this.sendSocketNotification("GET_WUNDERGROUND",this.config);
	}, 

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");
        var f;
        var forecast;
        var iconCell;
        var icon;
        var maxTempCell;
        var minTempCell;
        var popCell;
        var mmCell;
        var hourCell;
        var dayCell;
        var startingPoint;
        var currentStep;
        var steps;



        if (this.config.apikey === "") {
            wrapper.innerHTML = this.translate("APIKEY") + this.name +
                ".";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        if (this.error) {
            wrapper.innerHTML = "Error: " + this.errorDescription;
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("LOADING");
            wrapper.className = "dimmed light small";
            return wrapper;
        }
        if (this.config.currentweather === 1) {
            var small = document.createElement("div");
            small.className = "normal medium";

            var spacer = document.createElement("span");
            spacer.innerHTML = "&nbsp;";

            var table_sitrep = document.createElement("table");
            //table_sitrep.className = "middle";
			//table_sitrep.setAttribute("width", "25%");

            var row_sitrep = document.createElement("tr");
			

            var windIcon = document.createElement("td");
            windIcon.className = "wi " + this.windSpeed;
            row_sitrep.appendChild(windIcon);
            row_sitrep.className = "pop";
    
            var windDirectionIcon = document.createElement("td");
            if (this.config.UseCardinals === 0) {
                windDirectionIcon.className = "wi wi-wind " + this.windDirection;
                windDirectionIcon.innerHTML = "&nbsp;";
            } else {
                windDirectionIcon.innerHTML = this.windDirectionTxt;
            }
            row_sitrep.appendChild(windDirectionIcon);
            
            var HumidityIcon = document.createElement("td");
            HumidityIcon.className = "wi wi-humidity lpad";
            row_sitrep.appendChild(HumidityIcon);

            var HumidityTxt = document.createElement("td");
            HumidityTxt.innerHTML = this.Humidity + "&nbsp;";
			HumidityTxt.className = "vcen left";
            row_sitrep.appendChild(HumidityTxt);

            var sunriseSunsetIcon = document.createElement("td");
            sunriseSunsetIcon.className = "wi " + this.sunriseSunsetIcon;
            row_sitrep.appendChild(sunriseSunsetIcon);
    
            var sunriseSunsetTxt = document.createElement("td");
            sunriseSunsetTxt.innerHTML = this.sunriseSunsetTime;
			sunriseSunsetTxt.className = "vcen left";
            row_sitrep.appendChild(sunriseSunsetTxt);

            var moonPhaseIcon = document.createElement("td");
			moonPhaseIcon.innerHTML = this.moonPhaseIcon;
            row_sitrep.appendChild(moonPhaseIcon);
            
            table_sitrep.appendChild(row_sitrep);
            small.appendChild(table_sitrep);

            var large = document.createElement("div");
            large.className = "large light";

            var weatherIcon = document.createElement("span");
            if (this.config.coloricon) {
                weatherIcon.innerHTML = this.weatherTypeTxt;
            } else {
                weatherIcon.className = "wi " + this.weatherType;
            }

			var temperature = document.createElement("span");
			temperature.className = "bright";
			temperature.innerHTML = " " + this.temperature + "&deg;";
			large.appendChild(weatherIcon);
			large.appendChild(temperature);

            wrapper.appendChild(small);
            wrapper.appendChild(large);

        }
        
        // Forecast table

        var table = document.createElement("table");
        table.className = "small";
        table.setAttribute("width", "25%");

        // this.config.layout = "vertical";
        
        if (this.config.layout == "vertical") {

            var row = document.createElement("tr");
            table.appendChild(row);

            if (this.config.fctext == 1) {
                var forecastTextCell = document.createElement("td");
                forecastTextCell.className = "forecastText";
                forecastTextCell.setAttribute("colSpan", "10");
            
                forecastTextCell.innerHTML = this.forecastText;

                row.appendChild(forecastTextCell);
            }

            row = document.createElement("tr");

            var dayHeader = document.createElement("th");
            dayHeader.className = "day";
            dayHeader.innerHTML = "";
            row.appendChild(dayHeader);

            var iconHeader = document.createElement("th");
            iconHeader.className = "tableheader icon";
            iconHeader.innerHTML = "";
            row.appendChild(iconHeader);

            var maxtempHeader = document.createElement("th");
            maxtempHeader.className = "align-center bright tableheader";
            row.appendChild(maxtempHeader);

            var maxtempicon = document.createElement("span");
            maxtempicon.className = "wi wi-thermometer";
            maxtempHeader.appendChild(maxtempicon);


            var mintempHeader = document.createElement("th");
            mintempHeader.className = "align-center bright tableheader";
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

            if (this.config.hourly == 1) {
                for (f in this.forecast) {
                    forecast = this.hourlyforecast[f * this.config.hourlyinterval];

                    row = document.createElement("tr");
                    table.appendChild(row);

                    hourCell = document.createElement("td");
                    hourCell.className = "hourv";
                    hourCell.innerHTML = forecast.hour;
                    row.appendChild(hourCell);

                    iconCell = document.createElement("td");
                    iconCell.className =
                        "align-center bright weather-icon";
                    row.appendChild(iconCell);

                    icon = document.createElement("span");
                    icon.className = "wi " + forecast.icon;
                    iconCell.appendChild(icon);

                    maxTempCell = document.createElement("td");
                    maxTempCell.innerHTML = forecast.maxTemp + "&deg;";
                    maxTempCell.className = "align-right max-temp";
                    row.appendChild(maxTempCell);

                    minTempCell = document.createElement("td");
                    minTempCell.innerHTML = forecast.minTemp + "&deg;";
                    minTempCell.className = "align-right min-temp";
                    row.appendChild(minTempCell);

                    popCell = document.createElement("td");
                    popCell.innerHTML = forecast.pop + "%";
                    popCell.className = "align-right pop";
                    row.appendChild(popCell);

                    mmCell = document.createElement("td");
                    mmCell.innerHTML = forecast.mm ;
                    mmCell.className = "align-right mm";
                    row.appendChild(mmCell);

                    if (f > this.config.hourlycount) {
                        break;
                    }
                }
            }


            for (f in this.forecast) {
                forecast = this.forecast[f];

                row = document.createElement("tr");
                table.appendChild(row);

                dayCell = document.createElement("td");
                dayCell.className = "day";
                dayCell.innerHTML = forecast.day;
                row.appendChild(dayCell);

                iconCell = document.createElement("td");
                iconCell.className = "align-center bright weather-icon";
                row.appendChild(iconCell);

                icon = document.createElement("span");
                icon.className = "wi " + forecast.icon;
                iconCell.appendChild(icon);

                maxTempCell = document.createElement("td");
                maxTempCell.innerHTML = forecast.maxTemp + "&deg;";
                maxTempCell.className = "align-right max-temp";
                row.appendChild(maxTempCell);

                minTempCell = document.createElement("td");
                minTempCell.innerHTML = forecast.minTemp + "&deg;";
                minTempCell.className = "align-right min-temp";
                row.appendChild(minTempCell);

                popCell = document.createElement("td");
                popCell.innerHTML = forecast.pop + "%";
                popCell.className = "align-right pop";
                row.appendChild(popCell);

                mmCell = document.createElement("td");
                mmCell.innerHTML = forecast.mm ;
                mmCell.className = "align-right mm";
                row.appendChild(mmCell);

                if (this.config.fade && this.config.fadePoint < 1) {
                    if (this.config.fadePoint < 0) {
                        this.config.fadePoint = 0;
                    }
                    startingPoint = this.forecast.length * this.config.fadePoint;
                    steps = this.forecast.length - startingPoint;
                    if (f >= startingPoint) {
                        currentStep = f - startingPoint;
                        row.style.opacity = 1 - (1 / steps *
                            currentStep);
                    }
                }

            }


            wrapper.appendChild(table);

        } else {

		// horizontal
		
            var fctable = document.createElement("div");
            var divider = document.createElement("hr");
            divider.className = "hrDivider";
            fctable.appendChild(divider);

            if (this.config.fctext == 1) {
                var row = document.createElement("tr");
                var forecastTextCell = document.createElement("td");

                forecastTextCell.className = "forecastText";
                forecastTextCell.setAttribute("colSpan", "10");
                forecastTextCell.innerHTML = this.forecastText;

                row.appendChild(forecastTextCell);
                table.appendChild(row);
                fctable.appendChild(table);
                fctable.appendChild(divider.cloneNode(true));
            }

            table = document.createElement("table");
            table.className = "small";
            table.setAttribute("width", "25%");

            if (this.config.sysstat == 1) {

				row_mem = document.createElement("tr");
				row_storage = document.createElement("tr");
				row_stemp = document.createElement("tr");
				row_wifi = document.createElement("tr");
				
				iconCell = document.createElement("td");
                iconCell.className = "align-right bright weather-icon";
				
                icon = document.createElement("span");
                icon.className = "wi wi-thermometer";
                
				iconCell.appendChild(icon);
                row_stemp.appendChild(iconCell);
				
				sysTempCell = document.createElement("td");
                sysTempCell.innerHTML = this.systemp;
				sysTempCell.className = "align-left";
                row_stemp.appendChild(sysTempCell);
				
				iconCell = document.createElement("td");
                iconCell.className = "align-right bright weather-icon";
                icon = document.createElement("span");

                icon.className = "fa fa-wifi ";
                iconCell.appendChild(icon);
                row_stemp.appendChild(iconCell);

				WifiCell = document.createElement("td");
                WifiCell.innerHTML = this.wifiap + " @ " + this.wifistrength + "%";
				WifiCell.className = "align-left";
								
                row_stemp.appendChild(WifiCell);
				table.appendChild(row_stemp);

				
				FillCell = document.createElement("td");
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = "Size";
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = "Used";
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = "Free";
                row_mem.appendChild(FillCell);
				table.appendChild(row_mem);

				row_mem = document.createElement("tr");
				FillCell = document.createElement("td");
				FillCell.innerHTML = "Memory";
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.mem_size;
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.mem_used;
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.mem_free;
                row_mem.appendChild(FillCell);
				table.appendChild(row_mem);

				row_mem = document.createElement("tr");
				FillCell = document.createElement("td");
				FillCell.innerHTML = "Storage";
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.storage_size;
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.storage_used;
                row_mem.appendChild(FillCell);
				FillCell = document.createElement("td");
				FillCell.innerHTML = this.storage_free;
                row_mem.appendChild(FillCell);
				table.appendChild(row_mem);
				
										
				fctable.appendChild(table);
				fctable.appendChild(document.createElement("hr"));
				
				table = document.createElement("table");
				table.className = "small";
				table.setAttribute("width", "25%");


			}	
				
			

            if (this.config.hourly == 1) {

                row_time = document.createElement("tr");
                row_icon = document.createElement("tr");
                row_temp = document.createElement("tr");
                row_pop = document.createElement("tr");
                row_wind = document.createElement("tr");
                

                for (f in this.forecast) {
                    forecast = this.hourlyforecast[f * this.config.hourlyinterval];

                    hourCell = document.createElement("td");
                    hourCell.className = "hour";
                    hourCell.innerHTML = forecast.hour;
                    row_time.appendChild(hourCell);


                    iconCell = document.createElement("td");
                    iconCell.className = "align-center bright weather-icon";
                    icon = document.createElement("span");
					if (this.config.coloricon) {
						icon.innerHTML = forecast.icon_url;
					} else {
						icon.className = "wi " + forecast.icon;
					}
                    iconCell.appendChild(icon);
                    row_icon.appendChild(iconCell);

                    maxTempCell = document.createElement("td");
                    maxTempCell.innerHTML = forecast.maxTemp + "&deg;/" + forecast.minTemp + "&deg;";
                    maxTempCell.className = "hour";
                    row_temp.appendChild(maxTempCell);

                    mmCell = document.createElement("td");

                    if (this.config.units == "metric") {
                        mmCell.innerHTML = forecast.pop + "%/" + forecast.mm;
                        mmCell.className = "hour";
                    } else {
                        mmCell.innerHTML = forecast.pop + "%/" + forecast.mm;
                        mmCell.className = "hour";

                    }

                    row_pop.appendChild(mmCell);
                    
                    windDirectionIcon = document.createElement("td");
                    windDirectionIcon.className = "center";

                    windDirectionIconCell = document.createElement("i");
                    windDirectionIconCell.className = "wi " + forecast.windSpd;
                    windDirectionIcon.appendChild(windDirectionIconCell);
                    
                    spacer = document.createElement("i");
                    spacer.innerHTML = "&nbsp;&nbsp;";
                    windDirectionIcon.appendChild(spacer);


                    windDirectionIconCell = document.createElement("i");
                    
                    if (this.config.UseCardinals === 0) {
                        windDirectionIconCell.className = "wi wi-wind " + forecast.windDir;
                    } else {
                        windDirectionIcon.innerHTML = this.windDir;
                    }
                    windDirectionIcon.appendChild(windDirectionIconCell);

                    row_wind.appendChild(windDirectionIcon);

                                       
                    

                    var nl = Number(f) + 1;
                    if (( nl % 4 ) === 0 ) {
                            table.appendChild(row_time);
                            table.appendChild(row_icon);
                            table.appendChild(row_temp);
                            table.appendChild(row_pop);
                            table.appendChild(row_wind);
                            row_time = document.createElement("tr");
                            row_icon = document.createElement("tr");
                            row_temp = document.createElement("tr");
                            row_pop = document.createElement("tr");
                            row_wind = document.createElement("tr");
                    }

                    if (f > this.config.hourlycount) {
                        break;
                    }
                }


                table.appendChild(row_time);
                table.appendChild(row_icon);
                table.appendChild(row_temp);
                table.appendChild(row_pop);
                table.appendChild(row_wind);
                fctable.appendChild(table);
                fctable.appendChild(divider.cloneNode(true));

            }

            table = document.createElement("table");
            table.className = "small";
            table.setAttribute("width", "25%");

            row_time = document.createElement("tr");
            row_icon = document.createElement("tr");
            row_temp = document.createElement("tr");
            row_pop = document.createElement("tr");
            row_wind = document.createElement("tr");
            


            for (f in this.forecast) {
                forecast = this.forecast[f];

                dayCell = document.createElement("td");
                dayCell.className = "hour";
                dayCell.innerHTML = forecast.day;
                row_time.appendChild(dayCell);

                iconCell = document.createElement("td");
                iconCell.className = "align-center bright weather-icon";

                icon = document.createElement("span");
				if (this.config.coloricon) {
					icon.innerHTML = forecast.icon_url;
				} else {
					icon.className = "wi " + forecast.icon;
				}
                iconCell.appendChild(icon);

                row_icon.appendChild(iconCell);

                maxTempCell = document.createElement("td");
                maxTempCell.innerHTML = forecast.maxTemp + "&deg;/" + forecast.minTemp + "&deg;";
                maxTempCell.className = "hour";
                row_temp.appendChild(maxTempCell);

                mmCell = document.createElement("td");
                if (this.config.units == "metric") {
                    mmCell.innerHTML = forecast.pop + "%/" + forecast.mm;
                    mmCell.className = "hour";
                } else {
                    mmCell.innerHTML = forecast.pop + "%/" + forecast.mm;
                    mmCell.className = "hour";

                }

                row_pop.appendChild(mmCell);
				
        				windDirectionIcon = document.createElement("td");
                windDirectionIcon.className = "center";
                windDirectionIconCell = document.createElement("i");
                windDirectionIconCell.className = "wi " + forecast.windSpd;
                windDirectionIcon.appendChild(windDirectionIconCell);
                    
                spacer = document.createElement("i");
                spacer.innerHTML = "&nbsp;&nbsp;";
                windDirectionIcon.appendChild(spacer);


                    windDirectionIconCell = document.createElement("i");
                    
                    if (this.config.UseCardinals === 0) {
                        windDirectionIconCell.className = "wi wi-wind " + forecast.windDir;
                    } else {
                        windDirectionIcon.innerHTML = this.windDir;
                    }
                    windDirectionIcon.appendChild(windDirectionIconCell);

                    row_wind.appendChild(windDirectionIcon);


                
                var nl = Number(f) + 1;
                if (( nl % 4 ) === 0 ) {
                    table.appendChild(row_time);
                    table.appendChild(row_icon);
                    table.appendChild(row_temp);
                    table.appendChild(row_pop);
					table.appendChild(row_wind);
                    row_time = document.createElement("tr");
                    row_icon = document.createElement("tr");
                    row_temp = document.createElement("tr");
                    row_pop = document.createElement("tr");
					row_wind = document.createElement("tr");
                }

            }

            table.appendChild(row_time);
            table.appendChild(row_icon);
            table.appendChild(row_temp);
            table.appendChild(row_pop);
            table.appendChild(row_wind);
            fctable.appendChild(table);
            wrapper.appendChild(fctable);


        }
        return wrapper;

    },

    /* updateWeather(compliments)
     * Requests new data from openweather.org.
     * Calls processWeather on succesfull response.
     */
    updateWeather: function () {
        var url = this.config.apiBase + this.getParams();
        var self = this;
        var retry = true;

        if (this.config.sysstat == 1) {
			self.sendSocketNotification('GET_WIFI');
			self.sendSocketNotification('GET_SYSTEM_TEMP');
			self.sendSocketNotification('GET_SYSTEM_MEM');
			self.sendSocketNotification('GET_SYSTEM_STORAGE');
		}
		Log.info(moment().format() + ": " + this.name + " updating weather.");
        var weatherRequest = new XMLHttpRequest();
        weatherRequest.open("GET", url, true);
        weatherRequest.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    self.processWeather(JSON.parse(this.response));
                } else if (this.status === 401) {
                    self.config.appid = "";
                    self.updateDom(self.config.animationSpeed);

                    Log.error(self.name + ": Incorrect APPID.");
                    retry = false;
                } else {
                    Log.error(self.name +
                        ":* Could not load weather.");
                }

                if (retry) {
                    self.scheduleUpdate((self.loaded) ? -1 :
                        self.config.retryDelay);
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
    getParams: function () {
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

        console.log(params);


        return params;
    },

    /* processWeather(data)
     * Uses the received data to set the various values.
     *
     * argument data object - Weather information received form openweather.org.
     */

    processWeather: function (data) {
        if (data.current_observation.estimated.hasOwnProperty("estimated") && this.haveforecast == 1 ) {
            return;
        }
		
		this.haveforecast = 1;
        
        if (data.response.hasOwnProperty("error")) {
            this.errorDescription = data.response.error.description;
            this.error = true;
            this.updateDom(this.config.animationSpeed);
        } else {
            this.error = false;
            var forecast;
            var i;
            var count;
		if (this.config.coloricon) {
            var iconTable = this.config.iconTableDayColor;
		} else {
            var iconTable = this.config.iconTableDay;
		}
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




            // The moment().format("h") method has a bug on the Raspberry Pi.
            // So we need to generate the timestring manually.
            // See issue: https://github.com/MichMich/MagicMirror/issues/181

            var sunriseSunsetDateObject = (sunrise < now && sunset >
                now) ? sunset : sunrise;
            var timeString = moment(sunriseSunsetDateObject).format(
                "HH:mm");

            if (this.config.timeFormat !== 24) {
                if (this.config.showPeriod) {
                    if (this.config.showPeriodUpper) {
                        timeString = moment(sunriseSunsetDateObject).format(
                            "h:mm A");
                    } else {
                        timeString = moment(sunriseSunsetDateObject).format(
                            "h:mm a");
                    }
                } else {
                    timeString = moment(sunriseSunsetDateObject).format(
                        "h:mm");
                }
            }

            this.sunriseSunsetTime = timeString;
            this.sunriseSunsetIcon = (sunrise < now && sunset > now) ?
                "wi-sunset" : "wi-sunrise";
            if (this.config.coloricon) {
		this.iconTable = (sunrise < now && sunset > now) ? this.config
                .iconTableDayColor : this.config.iconTableNightColor;
                    } else {
		this.iconTable = (sunrise < now && sunset > now) ? this.config
                .iconTableDay : this.config.iconTableNight;
		}


            for (i = 0, count = data.alerts.length; i < count; i++) {

                var talert = data.alerts[i].description;
                var malert = data.alerts[i].message;
                if (talert.length < malert.length) {
                    talert = malert;
                }
                if (this.config.alerttruncatestring !== "") {
                    var ialert = talert.indexOf(this.config.alerttruncatestring);
                    if (ialert > 0) {
                        talert = talert.substring(1, ialert);
                    }
                }
                this.alertmsg = this.alertmsg + talert;

                this.alerttext = this.alerttext + "<B style=\"color:" +
                    data.alerts[i].level_meteoalarm_name + "\">" + this
                    .translate(data.alerts[i].type) + "</B>";
                if (i < (count - 1)) {
                    this.alerttext = this.alerttext + "<BR>";
                }

            }

            if (this.alertmsg !== "" && this.config.show_popup == 1 ) {
                this.sendNotification("SHOW_ALERT", {
                    type: "alert",
                    message: this.alertmsg,
                    title: this.alerttext,
                    timer: this.config.alerttime
                });
            }

            this.weatherType = this.iconTable[data.current_observation.icon];
            //Log.info("observation logo " + this.weatherType)
            this.windDirection = this.deg2Cardinal(data.current_observation.wind_degrees);
            this.windDirectionTxt = data.current_observation.wind_dir;
            this.Humidity = data.current_observation.relative_humidity;
            this.Humidity = this.Humidity.substring(0,this.Humidity.length -1);
            this.windSpeed = "wi-wind-beaufort-" + this.ms2Beaufort(data.current_observation.wind_kph);
            this.moonPhaseIcon = this.config.moonPhaseTable[data.moon_phase.ageOfMoon];
			this.moonPhaseIcon = "<img class='moonPhaseIcon' src='https://www.wunderground.com/graphics/moonpictsnew/moon" + data.moon_phase.ageOfMoon + ".gif'>";


            if (this.config.units == "metric") {
                this.temperature = data.current_observation.temp_c;
                this.forecastText = this.wordwrap(data.forecast.txt_forecast
                    .forecastday[0].fcttext_metric.replace(/(.*\d+)(C)(.*)/gi, "$1°C$3"), 35, "<BR>"); //  Wordwrap the text so it doesn"t mess up the display
            } else {
                this.temperature = data.current_observation.temp_f;
                this.forecastText = this.wordwrap(data.forecast.txt_forecast
                    .forecastday[0].fcttext, 35, "<BR>"); //  Wordwrap the text so it doesn"t mess up the display
            }

            this.temperature = this.roundValue(this.temperature);
			this.weatherTypeTxt = "<img src='./modules/MMM-WunderGround/img/VCloudsWeatherIcons/" + 
                                    data.current_observation.icon_url.replace('http://icons.wxug.com/i/c/k/', '').replace('.gif', '.png') +
									"' style='vertical-align:middle' class='currentWeatherIcon'>";

            if (this.alerttext !== "") {
                this.forecastText = "<B>" + this.alerttext + "</B><BR>" +
                    this.forecastText;
            }


            this.forecast = [];
            for (i = this.config.fcdaystart, count = data.forecast.simpleforecast
                .forecastday.length; i < this.config.fcdaycount; i++) {

                forecast = data.forecast.simpleforecast.forecastday[i];

                if (this.config.units == "metric") {
                    this.tmaxTemp = forecast.high.celsius;
                    this.tminTemp = forecast.low.celsius;
                    if (Number(forecast.snow_allday.cm) >  0 ) {
						this.tmm = forecast.snow_allday.cm + "cm";
					} else {
						this.tmm = forecast.qpf_allday.mm + "mm";
					}
                } else {
                    this.tmaxTemp = forecast.high.fahrenheit;
                    this.tminTemp = forecast.low.fahrenheit;
                    if (Number(forecast.snow_allday.in) >  0 ) {
						this.tmm = forecast.snow_allday.in + "in";
					} else {
						this.tmm = forecast.qpf_allday.in + "in";
					}
                }

                this.maxTemp = this.roundValue(this.maxTemp);
                this.minTemp = this.roundValue(this.minTemp);
				
                this.windDir = this.deg2Cardinal(forecast.maxwind.degrees);
                this.windSpd = "wi-wind-beaufort-" + this.ms2Beaufort(forecast.maxwind.kph);

				this.icon_url = "<img style='max-height:100%; max-width:100%; vertical-align:middle' src='./modules/MMM-WunderGround/img/VCloudsWeatherIcons/" + 
                                forecast.icon_url.replace('http://icons.wxug.com/i/c/k/', '').replace('.gif', '.png')+"' class='forecastWeatherIcon'>";
                
                this.forecast.push({

                    day: forecast.date.weekday_short,
                    maxTemp: this.tmaxTemp,
                    minTemp: this.tminTemp,
                    icon: this.config.iconTableDay[forecast.icon],
					icon_url: this.icon_url,
                    pop: forecast.pop,
					windDir: this.windDir,
					windSpd: this.windSpd, 
                    mm: this.tmm
					
                });


            }

            if (this.config.hourly == 1) {
                this.hourlyforecast = [];
                for (i = 0, count = data.hourly_forecast.length; i <
                    count; i++) {

                    var hourlyforecast = data.hourly_forecast[i];

                    if (this.config.units == "metric") {
                        this.tmaxTemp = hourlyforecast.temp.metric;
                        this.tminTemp = hourlyforecast.feelslike.metric;
						if (Number(forecast.snow_allday.cm) >  0 ) {
							this.tmm = forecast.snow_allday.cm + "cm";
						} else {
							this.tmm = forecast.qpf_allday.mm + "mm";
						}
						this.thour = hourlyforecast.FCTTIME.hour + ":00";
                    } else {
                        this.tmaxTemp = hourlyforecast.temp.english;
                        this.tminTemp = hourlyforecast.feelslike.english;
						if (Number(forecast.snow_allday.in) >  0 ) {
							this.tmm = forecast.snow_allday.in + "in";
						} else {
							this.tmm = forecast.qpf_allday.in + "in";
						}
                        this.thour = hourlyforecast.FCTTIME.civil;
                    }
                    this.tthour = Number(hourlyforecast.FCTTIME.hour);
                    if (this.config.coloricon) {
                        this.ForecastIcon = (this.sunrhour < this.tthour &&
                        this.sunshour > this.tthour) ? this.config.iconTableDayColor[
                        hourlyforecast.icon] : this.config.iconTableNightColor[
                        hourlyforecast.icon];
                    } else {
                        this.ForecastIcon = (this.sunrhour < this.tthour &&
                        this.sunshour > this.tthour) ? this.config.iconTableDay[
                        hourlyforecast.icon] : this.config.iconTableNight[
                        hourlyforecast.icon];
                    }
                    
					this.ForecastIconUrl = "<img style='max-height:100%; max-width:100%; vertical-align:middle' src='./modules/MMM-WunderGround/img/VCloudsWeatherIcons/" + 
                                            hourlyforecast.icon_url.replace('http://icons.wxug.com/i/c/k/', '').replace('.gif', '.png')+"' class='forecastWeatherIcon'>";
			

                    this.windDir = this.deg2Cardinal(hourlyforecast.wdir.degrees);
                    this.windSpd = "wi-wind-beaufort-" + this.ms2Beaufort(hourlyforecast.wspd.metric);

                        
                    this.hourlyforecast.push({

                        hour: this.thour,
                        maxTemp: this.tmaxTemp,
                        minTemp: this.tminTemp,
                        icon: this.ForecastIcon,
						icon_url: this.ForecastIconUrl,
                        pop: hourlyforecast.pop,
                        windDir: this.windDir,
                        windSpd: this.windSpd,
                        mm: this.tmm
                    });
                }
            }




            Log.log(this.forecast);

            this.loaded = true;
            this.updateDom(this.config.animationSpeed);
        }
    },

    /* scheduleUpdate()
     * Schedule next update.
     *
     * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
     */
    scheduleUpdate: function (delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        var self = this;
        clearTimeout(this.updateTimer);
        Log.info(moment().format() + ": " + this.name + " scheduling next update in " + nextLoad + " seconds.");
        this.updateTimer = setTimeout(function () {
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
    ms2Beaufort: function (kmh) {
        var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102,
            117, 1000
        ];
        for (var beaufort in speeds) {
            var speed = speeds[beaufort];
            if (speed > kmh) {
                return beaufort;
            }
        }
        return 12;
    },

    wordwrap: function (str, width, brk) {

        brk = brk || "n";
        width = width || 75;

        if (!str) {
            return str;
        }

        var re = new RegExp(".{1," + width +
            "}(\\s|$)|\\ S+?(\\s|$)", "g");

        return str.match(RegExp(re)).join(brk);

    },

    /* function(temperature)
     * Rounds a temperature to 1 decimal.
     *
     * argument temperature number - Temperature.
     *
     * return number - Rounded Temperature.
     */

    deg2Cardinal: function (deg) {
        if (deg > 11.25 && deg <= 33.75) {
            return "wi-from-nne";
        } else if (deg > 33.75 && deg <= 56.25) {
            return "wi-from-ne";
        } else if (deg > 56.25 && deg <= 78.75) {
            return "wi-from-ene";
        } else if (deg > 78.75 && deg <= 101.25) {
            return "wi-from-e";
        } else if (deg > 101.25 && deg <= 123.75) {
            return "wi-from-ese";
        } else if (deg > 123.75 && deg <= 146.25) {
            return "wi-from-se";
        } else if (deg > 146.25 && deg <= 168.75) {
            return "wi-from-sse";
        } else if (deg > 168.75 && deg <= 191.25) {
            return "wi-from-s";
        } else if (deg > 191.25 && deg <= 213.75) {
            return "wi-from-ssw";
        } else if (deg > 213.75 && deg <= 236.25) {
            return "wi-from-sw";
        } else if (deg > 236.25 && deg <= 258.75) {
            return "wi-from-wsw";
        } else if (deg > 258.75 && deg <= 281.25) {
            return "wi-from-w";
        } else if (deg > 281.25 && deg <= 303.75) {
            return "wi-from-wnw";
        } else if (deg > 303.75 && deg <= 326.25) {
            return "wi-from-nw";
        } else if (deg > 326.25 && deg <= 348.75) {
            return "wi-from-nnw";
        } else {
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
    roundValue: function (temperature) {
        return parseFloat(temperature).toFixed(this.config.roundTmpDecs);
    },
    
    socketNotificationReceived: function(notification, payload) {
		var self = this;

		Log.info('Wunderground received ' + notification)
        if (notification === 'WIFI_STRENGTH') {
            Log.info('received WIFI_STRENGTH');
			Log.info(payload.wifi_strength);
			this.wifiap = payload.wifi_ap;
			this.wifistrength=payload.wifi_strength;
			self.updateDom(self.config.animationSpeed);
        }
        if (notification === 'SYSTEM_TEMP') {
            Log.info('received SYSTEM_TEMP');
			Log.info(payload.system_temp);
			this.systemp=payload.system_temp;
			self.updateDom(self.config.animationSpeed);
        }
        if (notification === 'SYSTEM_MEM') {
            Log.info('received SYSTEM_MEM');
			Log.info(payload);
			this.mem_size=payload.mem_size;
			this.mem_used=payload.mem_used;
			this.mem_free=payload.mem_free;
			self.updateDom(self.config.animationSpeed);
		}
        if (notification === 'SYSTEM_STORAGE') {
            Log.info('received SYSTEM_STORAGE');
			Log.info(payload);
			this.storage_size=payload.store_size;
			this.storage_used=payload.store_used;
			this.storage_free=payload.store_avail;
			self.updateDom(self.config.animationSpeed);
        }
        if (notification === 'WUNDERGROUND') {
            Log.info('received WUNDERGROUND');
			Log.info(payload);
			self.processWeather(JSON.parse(payload));
        }

	}

});