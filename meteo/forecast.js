const CL_ON = "on",
    CL_LD = "ld",
    CL_ER = "er",
    CL_CH = "ch",
    EV_CL = "click";

const ARR_D100 = [0,10,20,30,40,50,60,70,80,90,100];

const ESCALAS = {
	TEMPERATURA: {
		val: [-99,-50,-40,-35,-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50],
		col: ["#640050","#730064","#820078","#91008c","#a01ea0","#aa2daf","#b446be","#aa4bc3","#a050c8","#9646cd","#8c3cd2","#8232d7","#7828dc","#6e1ee1","#326ecd","#4682d7","#5a96e1","#6eaaeb","#64b9f5","#50be82","#5ac832","#6ed73c","#82e646","#96f05a","#ffff64","#fffa50","#fff03c","#ffdc32","#ffc832","#ffb432","#ffa000","#ff8c00","#ff7800","#ff6900","#f03c14","#dc3c14","#c81e0f","#b4000f","#a0000f","#82001e","#a00546","#c80a64","#dc3282","#f064a0","#ff82be"]
	},
	NUBES: {
		val: ARR_D100,
		col: ["#fff","#F0F0F5","#E0E0EB","#D1D1E0","#C2C2D6","#B2B2CC","#A3A3C2","#9494B8","#8585AD","#7575A3","#666699"]
	},
	PRECIP: {
		val: [0,0.1,1,2,4,6,8,10,12,14,16,20,26,35,43,51,65,75,85,95,105,115],
		col: ["#fff","#ccffff","#c7f7ff","#c2f0ff","#bde8ff","#b8e0ff","#b2d9ff","#add1ff","#a8c9ff","#a3c2ff","#9ebaff","#99b2ff","#94abff","#8fa3ff","#8a9cff","#8594ff","#808cff","#7a85ff","#757dff","#7075ff","#6b6eff","#6666ff"]
	},
	HUMEDAD: {
		val: ARR_D100,
		col: ["#EBEBFF","#D6D6FF","#C2C2FF","#ADADFF","#9999FF","#8585FF","#7070FF","#5C5CFF","#4747FF","#3333FF"]
	},
	VIENTO: {
		val: [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110],
		col: ["#ccffcc","#c2f5c2","#b8ebb8","#ade0ad","#a3d6a3","#99cc99","#8fc28f","#85b885","#7aad7a","#70a370","#669966","#5c8f5c","#528552","#477a47","#3d703d","#336633","#295c29","#1f521f","#144714","#0a3d0a","#003300"]
	},
    DIRECCION: {
        val: [0, 45, 135, 225, 260, 315, 360],
        col: ["#0B2161", "#FFBF00", "#FE2E2E", "#FE642E", "#AC58FA", "#0B2161"]            
    },
	RADIACION: {
		val: [0,1,3,5,7,8,9,10,11,12],
		col: ["#fff","#ffe6e6","#ffb3b3","#ff9999","#ff6666","#ff4d4d","#ff1a1a","#ff0000","#e60000","#cc0000","#b30000","#990000","#800000","#660000","#4d0000"]
	},
    PRESION: {
        val: [970,980,990,1000,1010,1020,1030],
        col: ["#00027e","#7072f8","#70bbf8","#a9d8ff","#b3ffa9","#f76c6c","#e01313"]
    }
};

const CODIGOS = {
	0: "cielo despejado",
	1: "principalmente despejado",
	2: "parcialmente nublado",
	3: "cubierto",
	45: "niebla ",
	48: "depósito de niebla de escarcha",
	51: "llovizna ligera",
	53: "llovizna moderada",
	55: "llovizna densa",
	56: "llovizna helada ligera",
	57: "llovizna helada densa",
	61: "lluvia leve",
	63: "lluvia moderada",
	65: "lluvia fuerte",
	66: "lluvia helada ligera",
	67: "lluvia helada fuerte",
	71: "nieve leve",
	73: "nieve moderada",
	75: "nieve fuerte",
	77: "granos de nieve",
	80: "chubasco leve",
	81: "chubasco moderado",
	82: "chubasco violento",
	85: "chubascos de nieve ligeros",
	86: "chubascos de nieve fuerte",
	95: "tormenta",
	96: "tormenta con granizo leve",
	99: "tormenta con granizo fuerte"
};

function getFromEscala (escala, valor) {
    if (!escala) {
        return null;
    }
    var i = 0;
	while (i < escala.val.length - 1) {
		if (escala.val[i] <= valor && valor < escala.val[i + 1]) {
			return escala.col[i];
		}
		i++;
	}
	return escala.col[escala.col.length - 1];
}

function colorearValores ($mto, subhijo) {
    var addColor = (el, escala) => {
        var val = parseFloat($(el).html());
        if (isNaN(val)) {
            if (!$(el).hasClass("en")) {
                $(el).html("&minus;");
            }
            return;
        }
        $(el).css("background-color", getFromEscala(escala, val));
    };
    subhijo = subhijo || "";
    $mto.find(`.temp${subhijo}`).each((i, el) => addColor(el, ESCALAS.TEMPERATURA));
    $mto.find(`.nubo${subhijo}`).each((i, el) => addColor(el, ESCALAS.NUBES));
    $mto.find(`.nuba${subhijo}`).each((i, el) => addColor(el, ESCALAS.NUBES));
    $mto.find(`.nume${subhijo}`).each((i, el) => addColor(el, ESCALAS.NUBES));
    $mto.find(`.nual${subhijo}`).each((i, el) => addColor(el, ESCALAS.NUBES));
    $mto.find(`.hume${subhijo}`).each((i, el) => addColor(el, ESCALAS.HUMEDAD));
    $mto.find(`.rach${subhijo}`).each((i, el) => addColor(el, ESCALAS.VIENTO));
    $mto.find(`.vien${subhijo}`).each((i, el) => addColor(el, ESCALAS.VIENTO));
    $mto.find(`.dire${subhijo}`).each((i, el) => addColor(el, ESCALAS.DIRECCION));
    $mto.find(`.lluv${subhijo}`).each((i, el) => addColor(el, ESCALAS.PRECIP));
    $mto.find(`.pres${subhijo}`).each((i, el) => addColor(el, ESCALAS.PRESION));
    $mto.find(`.uv${subhijo}`).each((i, el) => addColor(el, ESCALAS.RADIACION));
}

function formateaDate (fecha, formato) {
    const dobleDigito = (val) => {
        if (val < 10) {
            return `0${val}`;
        }
        return val;
    };
    const dias = ["D", "L", "M", "X", "J", "V", "S"];
    switch (formato) {
        case "HH":
            return dobleDigito(fecha.getHours());
        case "DDS":
            return `${fecha.getDate()} ${dias[fecha.getDay()]}`;
        case "HHMM":
            return `${dobleDigito(fecha.getHours())}:${dobleDigito(fecha.getMinutes())}`;
        default:
            return `${fecha.getDate()}/${fecha.getMonth() + 1} ${dias[fecha.getDay()]}`;
    }
}

const Sources = {
    "open-meteo-16": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&timeformat=unixtime&timezone=auto&forecast_days=16",
    "open-meteo-ARO": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&minutely_15=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,cape&models=meteofrance_arome_france_hd&timeformat=unixtime",
    "open-meteo-ARP": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&minutely_15=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,cape&models=meteofrance_arpege_europe&timeformat=unixtime",
    "openweathermap3": "https://api.openweathermap.org/data/2.5/forecast?lat=#&lon=#&lang=es&units=metric&APPID=e3993f2ed6f2dd3b82764b0fc55d3f2c",
    "openweathermap": "https://api.openweathermap.org/data/2.5/onecall?lat=#&lon=#&lang=es&cnt=1&units=metric&APPID=e3993f2ed6f2dd3b82764b0fc55d3f2c",
    "met.no": "https://api.met.no/weatherapi/locationforecast/1.9/?lat=#&lon=#",
    "darksky": "https://api.darksky.net/forecast/a48eb522ce6b50ffcb1b69cf4655c8eb/#,#?units=si&lang=es"
};

function getUrl (src, coords) {
    const DECIMALES = 3;
    var url = Sources[src];
    url = url.replace("#", coords[0].toFixed(DECIMALES));
    url = url.replace("#", coords[1].toFixed(DECIMALES));
    return url;
}

async function getUrlData (url) {
    const cdata = sessionStorage[url];
    if (cdata && JSON.parse(cdata).tscache + 600000 > Date.now()) {
        return JSON.parse(cdata);
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.tscache = Date.now();
        sessionStorage[url] = JSON.stringify(data);
        return data;
    } catch (err) {
        mostrarMensaje("Error al obtener pronóstico", err);
        if (cdata) {
            return JSON.parse(cdata);
        }
        throw err;
    }
}

function normalizar (propiedad, indice, decimales) {
    const defecto = decimales !== null ? 0 : "";
    if (!propiedad) {
        return defecto;
    }
    const val = propiedad[indice];
    if (!val) {
        return defecto;
    } else if (decimales !== null && typeof val === "number") {
        return +val.toFixed(decimales || 0);
    } else {
        return val;
    }
}

const openMeteoConverter = (data) => {
    var r = [];
    var d = data.hourly || data.minutely_15;
    for (var i = 0; i < d.time.length; i++) {
        var m = {};
        m.fech = new Date(normalizar(d.time, i) * 1000);
        m.temp = normalizar(d.apparent_temperature, i, 1);
        m.nubo = normalizar(d.cloud_cover, i);
        m.nuba = normalizar(d.cloud_cover_low, i);
        m.nume = normalizar(d.cloud_cover_mid, i);
        m.nual = normalizar(d.cloud_cover_high, i);
        m.hume = normalizar(d.relative_humidity_2m, i);
        m.pres = normalizar(d.surface_pressure, i, 0);
        m.prec = normalizar(d.precipitation, i, 1);
        m.vien = normalizar(d.wind_speed_10m, i, 1);
        m.vdir = normalizar(d.wind_direction_10m, i);
        m.rach = normalizar(d.wind_gusts_10m, i);
        m.uv = normalizar(d.uv_index, i, 1);
        m.text = CODIGOS[normalizar(d.weather_code, i)] || "---";
        m.cape = normalizar(d.cape, i);
        r.push(m);
    }
    return r;
};

var Converters = {
    "open-meteo-16": openMeteoConverter,
    "open-meteo-ARO": openMeteoConverter,
    "open-meteo-ARP": openMeteoConverter,
    "wunderground": function (data) {
        var r = [];
        data = data.hourly_forecast;
        for (var i = 0; i < data.length; i++) {
            var m = {}, d = data[i];
            m.fech = new Date(d.FCTTIME.epoch * 1000);
            m.temp = d.temp.metric;
            m.nubo = d.sky;
            m.hume = d.humidity;
            m.pres = d.mslp.metric;
            m.prec = parseFloat(d.qpf.metric);
            m.vien = d.wspd.metric;
            m.vdir = d.wdir.degrees;
            m.radi = d.uvi;
            m.text = d.wx;
            r.push(m);
        }
        return r;
    },
    "openweathermap": function (data) {
        var r = [];
        data = data.hourly;
        for (var i = 0; i < data.length; i++) {
            var m = {}, d = data[i];
            m.fech = new Date(d.dt * 1000);
            m.temp = d.temp.toFixed(1);
            m.ciel = d.weather[0].id;
            m.nubo = d.clouds;
            m.hume = d.humidity;
            m.pres = d.pressure.toFixed(0);
            m.prec = (d.rain && d.rain["1h"]) ? d.rain["1h"] : 0.0;
            m.prec += (d.snow && d.snow["1h"]) ? d.snow["1h"] : 0.0;
            m.vien = parseFloat(d.wind_speed * 3.6).toFixed(1);
            m.vdir = d.wind_deg;
            m.text = d.weather[0].description;
            r.push(m);
        }
        return r;
    },
    "openweathermap3": function (data) {
        var r = [];
        data = data.list;
        for (var i = 0; i < data.length; i++) {
            var m = {}, d = data[i];
            m.fech = new Date(d.dt * 1000);
            m.temp = d.main.temp.toFixed(1);
            m.ciel = d.weather.id;
            m.nubo = d.clouds.all;
            m.hume = d.main.humidity;
            m.pres = d.main.pressure.toFixed(0);
            m.prec = (d.rain && d.rain["3h"]) ? d.rain["3h"] : 0.0;
            m.prec += (d.snow && d.snow["3h"]) ? d.snow["3h"] : 0.0;
            m.vien = parseFloat(d.wind.speed * 3.6).toFixed(1);
            m.vdir = d.wind.deg;
            m.text = d.weather[0].description;
            r.push(m);
        }
        return r;
    },
    "met.no": function (data) {
        var r = [];
        var nodos = data.documentElement.getElementsByTagName("time");
        for (var nodo in nodos) {
            var m = {};
            m.fech = new Date(nodo.getAttribute("from"));
            m.temp = parseFloat(nodo.getElementsByTagName("temperature")[0].getAttribute("value")).toFixed(1);
            // m.ciel = "-";
            // m.nubo = parseFloat(nodo.getElementsByTagName("cloudiness")[0].getAttribute("value"));
            // m.hume = parseFloat(nodo.getElementsByTagName("humidity")[0].getAttribute("value"));
            // m.pres = parseFloat(nodo.getElementsByTagName("pressure")[0].getAttribute("value"));
            // m.prec = 0;
            // m.vien = parseFloat(nodo.getElementsByTagName("windSpeed")[0].getAttribute("mps"));/*TODO mps*/
            // m.vdir = parseFloat(nodo.getElementsByTagName("windDirection")[0].getAttribute("deg"));
            r.push(m);
        }
        return r;
    },
    "darksky": function (data) {
        var r = [];
        data = data.hourly.data;
        for (var i = 0; i < data.length; i++) {
            var m = {}, d = data[i];
            m.fech = new Date(d.time * 1000);
            m.temp = d.temperature.toFixed(1);
            m.ciel = d.weather.id;
            m.nubo = d.cloudCover * 100;
            m.hume = d.humidity * 100.0;
            m.pres = d.pressure.toFixed(0);
            m.prec = d.precipIntensity;
            m.vien = parseFloat(d.windGust * 3.6).toFixed(1);
            m.vdir = d.windBearing;
            m.radi = d.uvIndex;
            r.push(m);
        }
        return r;
    }
};

var toastTimer = null;

function mostrarMensaje (txt) {
    clearTimeout(toastTimer);
    $(".toast")
        .addClass(CL_ON)
        .html(txt);
    toastTimer = setTimeout(function () {
        $(".toast").removeClass(CL_ON);
    }, 7500);
}

function newSpan (contenido, clase) {
    if (contenido === undefined) {
        contenido = "";
    }
    let clasehtml = "";
    if (clase) {
        clasehtml = ` class="${clase}"`;
    }
    return $(`<span${clasehtml}>${contenido}</span>`);
}

(function crearFuentes () {
    var keys = Object.keys(Sources);
    for (var i = 0; i < keys.length; i++) {
        var $b = $(`<button>${keys[i]}</button>`);
        var activesrc = localStorage.getItem("almfor.activesrc");
        $b.on(EV_CL, function elegirFuente (e) {
            var $este = $(e.target);
            $este.parent().children().removeClass(CL_ON);
            $este.addClass(CL_ON);
            localStorage.setItem("almfor.activesrc", $este[0].innerHTML);
        });
        if ((activesrc && activesrc === keys[i]) || (!activesrc && i === 0)) {
            $b.addClass(CL_ON);
        }
        $(".fuentes").append($b);
    }
}());

(function crearLocalizaciones () {
    var localizaciones = [{
        "n": "Geolocalización"
    }]
    localizaciones = localizaciones.concat(JSON.parse(localStorage.getItem("almiji.locations") || "[]"));

    function addLocalizacion (loc) {
        $("body").append(
            $("<div class='ubicacion'>").append(
                $("<a>")
                    .html(loc.n)
                    .data("c", loc.c)
                    .append("<span>")
            )
        );
    }

    for (const loc of localizaciones) {
        addLocalizacion(loc);
    }
}());

async function getPosicion ($tar) {
    function getPosition(options) {
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    }

    if ($tar) {
        var coords = $tar.data("c");
        if (coords) {
            return coords;
        }
    }
    try {
        const p = await getPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
        return [p.coords.latitude, p.coords.longitude];
    } catch (err) {
        mostrarMensaje("Error de geolocalización", err);
        throw err;
    }
}