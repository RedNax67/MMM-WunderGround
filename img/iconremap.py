# iconremap.py
# William Skellenger <wskellenger@gmail.com>
# 6-March-2017
#
# Utility to remap weather numeric types to wunderground descriptive names.
# Mapping technique taken from the bbcwx desklet for the Cinnamon desktop, Chris Hastie
#
# ----
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import shutil, os, json

#lots of varying info on these codes.
#from: https://apidev.accuweather.com/developers/weatherIcons
#also: https://developer.accuweather.com/weather-icons
#also: https://gist.github.com/aloncarmel/8575527
#also: https://github.com/ikromin/jphotoframe/blob/master/src/net/igorkromin/WeatherConditionCodes.java

yahoo_codes = {
        "00": "tornado",
        "01": "tropical_storm",
        "02": "hurricane",
        "03": "severe_thunderstoms",
        "04": "thunderstoms",
        "05": "mixed_rain_and_snow",
        "06": "mixed_rain_and_sleet",
        "07": "mixed_snow_and_sleet",
        "08": "freezing_drizzle",
        "09": "drizzle",
        "10": "freezing_rain",
        "11": "showers1",
        "12": "showers2",
        "13": "snow_flurries",
        "14": "light_snow_showers",
        "15": "blowing_snow",
        "16": "snow",
        "17": "hail",
        "18": "sleet",
        "19": "dust",
        "20": "foggy",
        "21": "haze",
        "22": "smoky",
        "23": "blustery",
        "24": "windy",
        "25": "cold",
        "26": "cloudy",
        "27": "mostly_cloudy_night",
        "28": "mostly_cloudy_day",
        "29": "partly_cloudy_night",
        "30": "partly_cloudy_day",
        "31": "clear_night",
        "32": "sunny",
        "33": "fair_night",
        "34": "fair_day",
        "35": "mixed_rain_and_hail",
        "36": "hot",
        "37": "isolated_thunderstorms",
        "38": "scattered_thunderstorms1",
        "39": "scattered_thunderstorms2",
        "40": "scattered_showers",
        "41": "heavy_snow1",
        "42": "scatterd_snow_showers",
        "43": "heavy_snow2",
        "44": "partly_cloudy",
        "45": "thundershowers",   #night?
        "46": "snow_showers",     #night?
        "47": "isolated_thundershowers",
        "3200": "not_available",
        }

#see: https://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&_ga=1.30437887.153121224.1487080712
DAY=0
NIGHT=1

wunderground = {
        "chanceflurries": ["13", "46"],
        "chancerain":     ["39", "45"],	
        "chancesleet":    ["06", "45"],
        "chancesnow":     ["41", "46"],
        "chancetstorms":  ["37", "47"],
        "clear":          ["32", "31"],
        "cloudy":         ["26", "27"],
        "flurries":       ["13", "46"],
        "fog":            ["20", "20"],
        "hazy":           ["22", "22"],
        "mostlycloudy":   ["28", "27"],
        "mostlysunny":    ["34", "27"],
        "partlycloudy":   ["30", "29"],
        "partlysunny":    ["30", "29"],
        "sleet":          ["18", "45"],
        "rain":           ["12", "45"],
        "snow":           ["16", "46"],
        "sunny":          ["32", "31"],
        "tstorms":        ["04", "47"],
        "unknown":        ["na", "na"],
        }


#the files in removelist will be deleted at the end of the run
removelist = []

def copyfile(src, dest):
    try:
        shutil.copyfile(src, dest)
    except IOError:
        print "ERROR IN COPY %s --> %s" %(src, dest)
        print "  * %s doesn't exist" %(src)
        pass

def getjsonmap():
    jf = open('iconmeta.json')
    j = json.load(jf)
    jf.close()
    return j['map']


def main():

    #create missing files from jsonmap if necessary
    jsonmap = getjsonmap()

    #create files if they are missing
    for newnumeric in jsonmap.keys():
        copyfile(jsonmap[newnumeric] + ".png", newnumeric + ".png")

    print "-----"

    #look for a .png file with the given name
    for descriptivename in wunderground.keys():

        numericname = wunderground[descriptivename][DAY]
        nightnumericname = wunderground[descriptivename][NIGHT]

        #copy the numeric name --> descriptive name
        copyfile(numericname + '.png', descriptivename + '.png')
        removelist.append(numericname + '.png')

        #copy night numeric name --> "nt_" + descriptive name
        copyfile(nightnumericname + '.png', 'nt_' + descriptivename + '.png')
        removelist.append(nightnumericname + '.png')

    #delete the files we don't need anymore
    for oldfile in removelist:
        print "Removing %s" %(oldfile)
        try:
            os.remove(oldfile)
        except OSError:
            pass  #if we can't delete the file, don't care

main()
