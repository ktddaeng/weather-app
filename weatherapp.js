/*Global Vars*/
/*global document, window, alert, console, require, close*/
var momo, vi, neko = false;

/*MODEL*/
function model(data) {
    this.lArray = [1, 2, 3];
    var cond = data.query.results.channel.item.condition;
    var loc = data.query.results.channel.location;
    var cast = data.query.results.channel.item.forecast;
    var week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var d = cond.date, x;
    
    function ForecastBox(item, index) {
        this.code = item.code;
        var sum = d + index;
        if (sum > 6) {sum = sum - 7;}
        var dd = item.date.split(" "), str = week[sum] + ", " + dd[1] + " "+ dd[0];
        str = str.toUpperCase();
        this.date = str;
        this.high = item.high;
        this.low = item.low;
        this.status = item.text;
    }    

    //make new fahrenheight tempBox and put in array
    this.cArray = cond.temp;

    //get current day of the week
    d = d.split(",");
    x = d[1].split(" ");
    this.lArray[2] = x[4]+x[5];
    for (x = 0; x < 7; x++){
        if (d[0] === week[x]) {
            d = x;
            break;
        }
    }

    //make forecastBox items and push into array    
    var i;
    this.fArray = []; //empties array just in case
    for (i = 0; i < cast.length; i++) {
        var entryBox = new ForecastBox(cast[i], i);
        this.fArray.push(entryBox);
    }

    //register location and time
    this.lArray[0] = data.query.results.channel.location.city;
    this.lArray[1] = data.query.results.channel.location.region;    
}

/*VIEW*/
function view(mode) {
    var i, lo, stand;

    function addText(el, text) {
        var newText = document.createTextNode(text);
        el.appendChild(newText);
    } //end addText()

    /*add stuff into a div to shove into parent div*/
    function addThing(ee, el, thing) {
        el.appendChild(thing);
        ee.appendChild(el);
    }
    
    /*determines the weather status to be displayed by the code of the forecastBox object bc of limited icons*/
    function getCode(co) {
        /*0 THUNDER
        [0, 4], [37, 39], 45, 47*/
        if ((co >= 0 && co <= 4) || (co >= 37 && co <= 39) || co == 45 || co == 47) {
            return 0;
        }
        /*1 SNOW
        [5, 7], [13, 18], 25, [41, 43], 46*/
        if ((co >= 5 && co <= 7) || (co >= 13 && co <= 18) || co == 25 || (co >= 41 && co <= 43) || co == 46) {
            return 1;
        }
        /*2 SUNNY
        [31, 34], 36, 3200*/
        if ((co >= 31 && co <= 34) || co == 36) {
            return 2;
        }
        /*3 WINDY
        23, 24*/
        if (co == 23 || co == 24) {
            return 3;
        }
        /*4 SHOWERS
        [8, 12], 35, 40*/
        if ((co >= 8 && co <= 12) || co == 35 || co == 40) {
            return 4;
        }
        /*5 MOSTLY CLOUDY/CLOUDY
        [19,22], [25, 28]*/
        if ((co >= 19 && co <= 22) || (co >= 25 && co <= 28)) {
            return 5;
        }
        /*6 PARTLY CLOUDY
        [29, 30], 44*/
        if ((co >= 29 && co <= 30) || co == 44) {
            return 6;
        }
        return 2;
    }
    
    if (getCode(mode.fArray[0].code) == 2 || getCode(mode.fArray[0].code) == 6) { //red scheme
        grad = document.getElementsByTagName("body")[0].id = "hot";
    } else { //blue scheme            
        grad = document.getElementsByTagName("body")[0].id = "cold";       
    }
    
/*Change Current Weather*/
    cu = document.getElementById("contents");
    while (cu.firstChild) {
        cu.removeChild(cu.firstChild);
    } //empties list before filling again
    h = document.createElement("H1");
    var newText = document.createTextNode(mode.lArray[0] + ", " + mode.lArray[1]);
    h.appendChild(newText);
    cu.appendChild(h);

    /*First block*/
    var dda = document.createElement('div'),
        ddai = document.createElement('div'),
        iim = document.createElement('img'),
        bg = document.getElementById('bg');
        ccu = mode.fArray[0];
    iim.className = 'stat';
    dda.className = 'dda';
    ddai.appendChild(iim);
        dda.appendChild(ddai);

        var tt1 = document.createElement('div'),
            tt2 = document.createElement('div');
        tt1.className = 'tt1';
        addText(tt1, mode.lArray[2]); //time
        dda.appendChild(tt1);
        tt2.className = 'tt2';
        addText(tt2, ccu.date); //date
        dda.appendChild(tt2);

        cu.appendChild(dda);

        /*Second Block*/
        var ddb = document.createElement('div'),
            tt3 = document.createElement('div'),
            tt4 = document.createElement('div'),
            tt5 = document.createElement('div');   
        ddb.className = 'ddb';
        tt3.className = 'tt3';  
        tt4.className = 'tt3';
        tt4.id = 'tt4';
        tt5.className = 'tt3';
        addText(tt3, ccu.low + '\xB0');
        addText(tt5, ccu.high + '\xB0');
        addText(tt4, mode.cArray + '\xB0');
        ddb.appendChild(tt3);
        ddb.appendChild(tt4);
        ddb.appendChild(tt5);    
        cu.appendChild(ddb);

        var tt4b = document.createElement('div');
        tt4b.className = 'tt5';
        addText(tt4b, ccu.status);
        cu.appendChild(tt4b);
    
    function CurrentWeatherIcon() {        
        if (neko) {stand = "neko/";} else {stand = "standard/";}
        iim.src = stand + getCode(ccu.code) +".png";
        bg.src = iim.src;        
    }
    
    
    /*Change Forecast*/
    fo = document.getElementById("contents2");
    
    while (fo.firstChild) {
        fo.removeChild(fo.firstChild);
    } //empties list before filling again
    
    for (i = 1; i < mode.fArray.length; i++) {
        var o = mode.fArray[i],
            d = document.createElement('div'),
            im_low = document.createElement('img'),
            im_high = document.createElement('img');
        if (i % 2 == 0){
            d.id = 'fb_light';
        }else {
            d.id = 'fb_dark';
        }
        im_low.src = "low_arrow.png";
        im_low.className = "scr-im2";
        im_high.src = "high_arrow.png";
        im_high.className = "scr-im2";
        d.className = 'scr';
        
        /*IMAGE*/
        var d1 = document.createElement('div'),
            im = document.createElement('img');
        im.className = 'scr-im';
        im.id = 'scr-im-' + i;
        d1.appendChild(im);
        d.appendChild(d1);
        
        
        /*TEXT*/        
        var d2 = document.createElement('div');
        var d22 = document.createElement('div');
        d22.className = 'd22';
        
        var t1 = document.createElement('div');
        t1.className = 't1';
        addText(t1, o.date);
        d22.appendChild(t1);      
        
        var t2 = document.createElement('div');
        t2.className = 't2';
        addText(t2, o.status);
        d22.appendChild(t2);
        d2.appendChild(d22);  
        
        var t3 = document.createElement('div');
        t3.appendChild(im_low);
        t3.className = 't3';
        addText(t3, " " + o.low + "\xB0 ");
        t3.appendChild(im_high);
        addText(t3, " " + o.high + '\xB0');  
        d2.appendChild(t3);
        d.appendChild(d2);
        
        fo.appendChild(d);
        /*console.log("Date: " + o.date + ": code = " +
                    o.code + ", " + getCode(o.code) + ", high = " + o.high +
                    ", low = " + o.low + ", status = " + o.status);*/
    }
    
    function ForeCastIcon() {        
        for (i = 1; i < mode.fArray.length; i++) {
            var o = mode.fArray[i], pic = document.getElementById('scr-im-'+i);
            if (neko) {stand = "neko/";} else {stand = "standard/"}
            pic.src = stand + getCode(o.code) +".png";
        }
    }
this.layout = function() {
        /*BG change*/
    CurrentWeatherIcon();
    ForeCastIcon();
}
}

function checkNeko() {
    if (neko){
        neko = false;
        lo = document.getElementById("neko");
        newText = document.createTextNode("NEKO OFF");
        lo.replaceChild(newText, lo.childNodes[0]);
        vi.layout();
    } else {
        neko = true;
        lo = document.getElementById("neko");
        newText = document.createTextNode("NEKO ON");
        lo.replaceChild(newText, lo.childNodes[0]);
        vi.layout();
    }
    //This only calls the layout method so the page doesn't have to go through the painstaking process of changing up the entire layout again. Less work for everyone!
}

/* CONTROL */

/*Clears input box when clicked on*/
function clearInput(target){
    target.value = "";
}

function keyPr(kk){
    var ev = kk || window.event;
    var ch = event.charCode || event.keyCode;
    if (ch == 13) {        
        var entry = document.getElementById("zip").value;
        getJoe(entry);
    }
}

/* function to get new woeid and place by forcing the browser to make a query, in the form of asking Yahoo to download a Javascript file.*/
function getJoe(zip) {
    'use strict';
	var script = document.createElement('script');    
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select item,location from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zip + "') & format=json & callback=callbackFunction";
	document.body.appendChild(script);
}

function init(){
    getJoe("95616");
}

/* called when submit button is pushed */
function lookupZIP() {
    'use strict';
	var entry = document.getElementById("zip").value;
	getJoe(entry);
}

function callbackFunction(data) {
    'use strict';
    if (data.query.results === null) {
        alert ("Location not found");
    } else {
        momo = new model(data);
        vi = new view(momo);
        vi.layout();
    }
}