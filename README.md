# Module: Weather Underground Forecast
This is a module for MagicMirror, modified of the default `weatherforecast` module. 

This is similar to the default `weatherforecast` module, however it has additional functionality (such as displaying the probability of precipitation for each day). It also retrieves its data from Weather Underground instead of OpenWeatherMap.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'wuforecast',
		position: 'top_right',	// This can be any of the regions.
									// Best results in left or right regions.
		config: {
			// See 'Configuration options' for more information.
			location: 'France/Paris',
			appid: 'abcde12345abcde12345abcde12345ab' //wunderground.com API key.
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>location</code></td>
			<td>The location used for weather information.<br>
				<br><b>US Example:</b> <code>NY/New_York</code>
				<br><b>Example:</b> <code>France/Paris</code><br>
                                <br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>appid</code></td>
			<td>The <a href="https://www.wunderground.com/weather/api/d/pricing" target="_blank">Weather Underground</a> API key, which can be obtained by creating an OpenWeatherMap account. You need either Cumulus or Anvil plan for this module. As long as you make less than 500 queries a day, this is free.<br>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>units</code></td>
			<td>What units to use. Specified by config.js<br>
				<br><b>Possible values:</b> <code>config.units</code> = Specified by config.js, <code>default</code> = Kelvin, <code>metric</code> = Celsius, <code>imperial</code> =Fahrenheit
				<br><b>Default value:</b> <code>config.units</code>
			</td>
		</tr>
		<tr>
			<td><code>pop</code></td>
			<td>Display or not display the probability of precipitation. Specified by config.js<br>
				<br><b>Possible values:</b> <code>true</code> = Display the Probability of Precipitation if above 0%, <code>false</code> = Do not display the Probability of Precipitation
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>degreeSym</code></td>
			<td>Display or not display the degree symbol after the high and low temps. Specified by config.js<br>
				<br><b>Possible values:</b> <code>true</code> = Display the degree symbol after the high/low temps.  <code>False</code> = Do not dsplay the degree symbol after the high/low temps.
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>maxNumberOfDays</code></td>
			<td>How many days of forecast to return. Specified by config.js<br>
				<br><b>Possible values:</b> <code>1</code> - <code>10</code>
				<br><b>Default value:</b> <code>7</code> (7 days)
				<br>This value is optional. By default the wuforecast module will return 7 days.
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)
				<br>Note that wunderground updates every 15 minutes maximum. Also free version of API only allows 500 calls per day.
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>900000</code> (15 minutes)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Speed of the update animation. (Milliseconds)<br>
				<br><b>Possible values:</b><code>0</code> - <code>5000</code>
				<br><b>Default value:</b> <code>2000</code> (2 seconds)
			</td>
		</tr>

		<tr>
			<td><code>lang</code></td>
			<td>The language of the days.<br>
				<br><b>Possible values:</b> <code>en</code>, <code>nl</code>, <code>ru</code>, etc ...
				<br><b>Default value:</b> uses value of <i>config.language</i>
			</td>
		</tr>
		<tr>
			<td><code>fade</code></td>
			<td>Fade the future events to black. (Gradient)<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>fadePoint</code></td>
			<td>Where to start fade?<br>
				<br><b>Possible values:</b> <code>0</code> (top of the list) - <code>1</code> (bottom of list)
				<br><b>Default value:</b> <code>0.25</code>
			</td>
		</tr>
		<tr>
			<td><code>initialLoadDelay</code></td>
			<td>The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds)<br>
				<br><b>Possible values:</b> <code>1000</code> - <code>5000</code>
				<br><b>Default value:</b>  <code>0</code>
			</td>
		</tr>
		<tr>
			<td><code>retryDelay</code></td>
			<td>The delay before retrying after a request failure. (Milliseconds)<br>
				<br><b>Possible values:</b> <code>1000</code> - <code>60000</code>
				<br><b>Default value:</b>  <code>2500</code>
			</td>
		</tr>
		<tr>
			<td><code>apiBase</code></td>
			<td>The Weather Underground base URL.<br>
				<br><b>Default value:</b>  <code>'http://api.wunderground.com/api/'</code>
			</td>
		</tr>
		<tr>
			<td><code>weatherEndpoint</code></td>
			<td>The Weather Underground API endPoint.<br>
				<br><b>Default value:</b>  <code>'/forecast10day/q/'</code>
			</td>
		</tr>

	</tbody>
</table>


