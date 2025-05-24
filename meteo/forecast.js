const CL_ON = "on",
    CL_LD = "ld",
    CL_ER = "er",
    CL_CH = "ch",
    EV_CL = "click";

const DECIMALES = 3;

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

const CODIGOS_OPENMETEO = {
    0: { descripcion: "cielo despejado", icono: "☀️" },
    1: { descripcion: "principalmente despejado", icono: "🌤️" },
    2: { descripcion: "parcialmente nublado", icono: "⛅" },
    3: { descripcion: "cubierto", icono: "☁️" },
    45: { descripcion: "niebla", icono: "🌫️" },
    48: { descripcion: "depósito de niebla de escarcha", icono: "🌫️❄️" },
    51: { descripcion: "llovizna ligera", icono: "🌦️" },
    53: { descripcion: "llovizna moderada", icono: "🌧️" },
    55: { descripcion: "llovizna densa", icono: "🌧️🌧️" },
    56: { descripcion: "llovizna helada ligera", icono: "🌧️❄️" },
    57: { descripcion: "llovizna helada densa", icono: "🌧️❄️❄️" },
    61: { descripcion: "lluvia leve", icono: "🌦️" },
    63: { descripcion: "lluvia moderada", icono: "🌧️" },
    65: { descripcion: "lluvia fuerte", icono: "🌧️🌧️" },
    66: { descripcion: "lluvia helada ligera", icono: "🌧️❄️" },
    67: { descripcion: "lluvia helada fuerte", icono: "🌧️❄️❄️" },
    71: { descripcion: "nieve leve", icono: "🌨️" },
    73: { descripcion: "nieve moderada", icono: "❄️" },
    75: { descripcion: "nieve fuerte", icono: "❄️❄️" },
    77: { descripcion: "granos de nieve", icono: "🌨️❄️" },
    80: { descripcion: "chubasco leve", icono: "🌦️" },
    81: { descripcion: "chubasco moderado", icono: "🌧️" },
    82: { descripcion: "chubasco violento", icono: "⛈️" },
    85: { descripcion: "chubascos de nieve ligeros", icono: "🌨️" },
    86: { descripcion: "chubascos de nieve fuerte", icono: "🌨️❄️" },
    95: { descripcion: "tormenta", icono: "⛈️" },
    96: { descripcion: "tormenta con granizo leve", icono: "⛈️🌨️" },
    99: { descripcion: "tormenta con granizo fuerte", icono: "⛈️🌨️🌨️" }
};

const CODIGOS_OPENWEATHER = {
    200: { descripcion: "tormenta con lluvia ligera", icono: "⛈️🌦️" },
    201: { descripcion: "tormenta con lluvia", icono: "⛈️" },
    202: { descripcion: "tormenta con lluvia fuerte", icono: "⛈️🌧️" },
    210: { descripcion: "tormenta ligera", icono: "🌩️" },
    211: { descripcion: "tormenta", icono: "🌩️" },
    212: { descripcion: "tormenta fuerte", icono: "🌩️⚡" },
    221: { descripcion: "tormenta irregular", icono: "🌩️🌧️" },
    230: { descripcion: "tormenta con llovizna ligera", icono: "⛈️🌦️" },
    231: { descripcion: "tormenta con llovizna", icono: "⛈️" },
    232: { descripcion: "tormenta con llovizna fuerte", icono: "⛈️🌧️" },
  
    300: { descripcion: "llovizna ligera", icono: "🌦️" },
    301: { descripcion: "llovizna", icono: "🌧️" },
    302: { descripcion: "llovizna intensa", icono: "🌧️🌧️" },
    310: { descripcion: "llovizna ligera y lluvia", icono: "🌦️" },
    311: { descripcion: "llovizna y lluvia", icono: "🌧️" },
    312: { descripcion: "llovizna y lluvia intensa", icono: "🌧️🌧️" },
    313: { descripcion: "chubascos y llovizna", icono: "🌧️🌦️" },
    314: { descripcion: "chubascos y llovizna fuerte", icono: "🌧️🌧️" },
    321: { descripcion: "chubascos de llovizna", icono: "🌦️" },
  
    500: { descripcion: "lluvia ligera", icono: "🌦️" },
    501: { descripcion: "lluvia moderada", icono: "🌧️" },
    502: { descripcion: "lluvia fuerte", icono: "🌧️🌧️" },
    503: { descripcion: "lluvia muy fuerte", icono: "🌧️🌧️🌧️" },
    504: { descripcion: "lluvia extrema", icono: "🌧️⚠️" },
    511: { descripcion: "lluvia helada", icono: "🌧️❄️" },
    520: { descripcion: "chubascos ligeros", icono: "🌦️" },
    521: { descripcion: "chubascos", icono: "🌧️" },
    522: { descripcion: "chubascos fuertes", icono: "🌧️🌧️" },
    531: { descripcion: "chubascos irregulares", icono: "🌧️🌦️" },
  
    600: { descripcion: "nieve ligera", icono: "🌨️" },
    601: { descripcion: "nieve", icono: "❄️" },
    602: { descripcion: "nieve intensa", icono: "❄️❄️" },
    611: { descripcion: "aguanieve", icono: "🌨️🌧️" },
    612: { descripcion: "chubascos de aguanieve", icono: "🌨️🌧️" },
    613: { descripcion: "chubascos de nieve", icono: "🌨️" },
    615: { descripcion: "lluvia ligera y nieve", icono: "🌧️❄️" },
    616: { descripcion: "lluvia y nieve", icono: "🌧️❄️" },
    620: { descripcion: "chubascos de nieve ligera", icono: "🌨️" },
    621: { descripcion: "chubascos de nieve", icono: "❄️" },
    622: { descripcion: "chubascos de nieve intensa", icono: "❄️❄️" },
  
    701: { descripcion: "niebla", icono: "🌫️" },
    711: { descripcion: "humo", icono: "💨" },
    721: { descripcion: "neblina", icono: "🌫️" },
    731: { descripcion: "arena/polvo", icono: "🌪️" },
    741: { descripcion: "niebla densa", icono: "🌫️🌫️" },
    751: { descripcion: "arena", icono: "🏜️" },
    761: { descripcion: "polvo", icono: "💨" },
    762: { descripcion: "cenizas volcánicas", icono: "🌋" },
    771: { descripcion: "ráfagas de viento", icono: "💨" },
    781: { descripcion: "tornado", icono: "🌪️" },
  
    800: { descripcion: "cielo despejado", icono: "☀️" },
    801: { descripcion: "pocas nubes", icono: "🌤️" },
    802: { descripcion: "nubes dispersas", icono: "⛅" },
    803: { descripcion: "nubes rotas", icono: "🌥️" },
    804: { descripcion: "nublado", icono: "☁️" }
};

const CODIGOS_TOMORROW = {
    1000: { descripcion: "Despejado", icono: "☀️" },
    1100: { descripcion: "Mayormente despejado", icono: "🌤️" },
    1101: { descripcion: "Parcialmente nublado", icono: "⛅" },
    1102: { descripcion: "Mayormente nublado", icono: "🌥️" },
    1001: { descripcion: "Nublado", icono: "☁️" },
    2000: { descripcion: "Niebla", icono: "🌫️" },
    2100: { descripcion: "Neblina ligera", icono: "🌁" },
    4000: { descripcion: "Llovizna", icono: "🌦️" },
    4001: { descripcion: "Lluvia", icono: "🌧️" },
    4200: { descripcion: "Lluvia ligera", icono: "🌦️" },
    4201: { descripcion: "Lluvia intensa", icono: "🌧️" },
    5000: { descripcion: "Nieve", icono: "🌨️" },
    5001: { descripcion: "Nieve ligera", icono: "🌨️" },
    5100: { descripcion: "Nieve ligera", icono: "🌨️" },
    5101: { descripcion: "Nieve intensa", icono: "❄️" },
    6000: { descripcion: "Aguanieve", icono: "🌨️" },
    6001: { descripcion: "Aguanieve intensa", icono: "🌨️" },
    6200: { descripcion: "Aguanieve ligera", icono: "🌨️" },
    6201: { descripcion: "Aguanieve intensa", icono: "🌨️" },
    7000: { descripcion: "Granizo", icono: "🌩️" },
    7101: { descripcion: "Granizo intenso", icono: "🌩️" },
    7102: { descripcion: "Granizo ligero", icono: "🌩️" },
    8000: { descripcion: "Tormenta eléctrica", icono: "⛈️" }
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
    "openweathermap3": "https://api.openweathermap.org/data/2.5/forecast?lat=#&lon=#&lang=es&units=metric&APPID=e3993f2ed6f2dd3b82764b0fc55d3f2c",
    "tomorrow.io": "https://api.tomorrow.io/v4/weather/forecast?location=#,#&timesteps=1m,1h,1d&units=metric&apikey=adsRpJYHZQlvE6nrSQ14AUDqvOUb7qnH&fields=temperature,humidity,pressureSeaLevel,cloudCover,precipitationProbability,precipitationIntensity,uvIndex,windSpeed,windDirection,visibility,weatherCode",
    "open-meteo-16": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&timeformat=unixtime&timezone=auto&forecast_days=16",
    "open-meteo-ARO": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&hourly=temperature_2m,apparent_temperature,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,cape,relative_humidity_2m,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&models=arome_seamless&timeformat=unixtime",
    "open-meteo-ARP": "https://api.open-meteo.com/v1/forecast?latitude=#&longitude=#&hourly=temperature_2m,apparent_temperature,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,cape,relative_humidity_2m,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&models=arpege_seamless&timeformat=unixtime",
    //"openweathermap": "https://api.openweathermap.org/data/2.5/onecall?lat=#&lon=#&lang=es&cnt=1&units=metric&APPID=e3993f2ed6f2dd3b82764b0fc55d3f2c",
    //"met.no": "https://api.met.no/weatherapi/locationforecast/1.9/?lat=#&lon=#",
    //"darksky": "https://api.darksky.net/forecast/a48eb522ce6b50ffcb1b69cf4655c8eb/#,#?units=si&lang=es"
};

function getUrl (src, coords) {
    var url = Sources[src];
    url = url.replace("#", coords[0].toFixed(DECIMALES));
    url = url.replace("#", coords[1].toFixed(DECIMALES));
    return url;
}

async function getUrlData (url) {
    const cdata = sessionStorage[url];
    if (cdata && (JSON.parse(cdata).tscache + 600000 > Date.now() || $("footer > .cache").hasClass(CL_ON))) {
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
        const codigo = CODIGOS_OPENMETEO[normalizar(d.weather_code, i)] || { descripcion: "desconocido", icono: "❓" };
        m.text = `<span title="${codigo.descripcion}">${codigo.icono}</span>`;
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
            const codigo = CODIGOS_OPENWEATHER[d.weather[0].id] || { descripcion: "desconocido", icono: "❓" };
            m.text = `<span title="${codigo.descripcion}">${codigo.icono}</span>`;
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
            m.rach = parseFloat(d.wind.gust * 3.6).toFixed(1);
            const codigo = CODIGOS_OPENWEATHER[d.weather[0].id] || { descripcion: "desconocido", icono: "❓" };
            m.text = `<span title="${codigo.descripcion}">${codigo.icono}</span>`;
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
    },
    "tomorrow.io": function (data) {
        var r = [];
        data = data.timelines.hourly;
        for (var i = 0; i < data.length; i++) {
            var m = {}, d = data[i];
            m.fech = new Date(d.time);
            d = d.values;
            m.temp = d.temperature.toFixed(1);
            m.nubo = d.cloudCover;
            m.hume = d.humidity;
            m.pres = d.pressureSeaLevel.toFixed(0);
            m.prec = d.rainIntensity;
            m.vien = d.windSpeed.toFixed(1);
            m.vdir = d.windDirection;
            m.radi = d.uvIndex;
            const codigo = CODIGOS_TOMORROW[d.weatherCode] || { descripcion: "desconocido", icono: "❓" };
            m.text = `<span title="${codigo.descripcion}">${codigo.icono}</span>`;
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
        $("main").append(
            $('<div class="ubicacion">').append(
                $("<a>")
                    .html(loc.n)
                    .data("c", loc.c)
                    .append("<time>")
            )
        );
    }

    for (const loc of localizaciones) {
        addLocalizacion(loc);
    }
}());

(function loadCache () {
    $("footer > .cache").on(EV_CL, (e) => {
        const ison = $($(e.target).toggleClass(CL_ON)[0]).hasClass(CL_ON);
        localStorage.setItem("almfor.cacheon", ison);
    });
    $("footer > .cache").toggleClass(CL_ON, localStorage.getItem("almfor.cacheon") === "true");
}());

$("footer > .ubicaciones").on(EV_CL, (e) => {
    window.location = "ubicaciones.html";
});

let ultimaPosicion;
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
        ultimaPosicion = ultimaPosicion || await getPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
        return [ultimaPosicion.coords.latitude, ultimaPosicion.coords.longitude];
    } catch (err) {
        mostrarMensaje("Error de geolocalización", err);
        throw err;
    }
}