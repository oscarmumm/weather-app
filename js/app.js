// 'use strict'

const apikey = "1e0852abb42466a00a4d6d999c3e2b64"

const centralCard = document.getElementById("central_card")
const centralCardInicial = document.getElementById("central_card_inicial")
const cardPronostico = document.getElementById("pronostico")

const buscador = document.getElementById("buscador")
const botonBuscar = document.getElementById("boton-buscar")
const botonUbicacion = document.getElementById("boton-ubicacion")

const ciudad = document.getElementById("ciudad")
const pais = document.getElementById("pais")
const icono = document.getElementById("icono-clima")
const descripcion = document.getElementById("descripcion")
const temperaturaActual = document.getElementById("temperatura-actual")
const sensacionTermica = document.getElementById("sensacion-termica")
const presion = document.getElementById("presion")
const humedad = document.getElementById("humedad")
const visibilidad = document.getElementById("visibilidad")
const viento = document.getElementById("viento")

let ubicacion = {}
// PARA OBTENER LA UBICACIÓN DEL USUARIO
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;
    console.log("Ubicacion obtenida por dispositivo:")
    console.log(`Latitud: ${crd.latitude}`)
    console.log(`Longitud: ${crd.longitude}`)
    console.log(`Presición: ${crd.accuracy} metros`)
    return ubicacion = {
            lat: crd.latitude,
            lon: crd.longitude
        }
    }
    //    console.log('Your current position is:');
    //    console.log(`Latitude : ${crd.latitude}`);
    //    console.log(`Longitude: ${crd.longitude}`);
    //    console.log(`More or less ${crd.accuracy} meters.`);
    //}

function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

navigator.geolocation.getCurrentPosition(success, error, options);



botonUbicacion.addEventListener("click", ()=>{
    console.log("cliqueaste el boton de buscar ubicacion")
    fetchWeather(ubicacion.lat, ubicacion.lon)
})

function fetchLocation (ubicacion) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}"&limit=1&appid=${apikey}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log('data:', data)
            fetchWeather(data[0].lat, data[0].lon)
        })
    }

function fetchWeather (latitud, longitud) {
    console.log("se ejecuta fetchWeather")
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apikey}&units=metric&lang=sp`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.weather[0].id)
            return clima = {
                ciudad: data.name,
                pais: data.sys.country,
                id: data.weather[0].id,
                icono: buscarIcono(calcularHora(data.timezone), data.weather[0].id),
                descripcion: data.weather[0].description,
                temperaturaActual: Math.round(data.main.temp),
                sensacionTermica: Math.round(data.main.feels_like),
                temperaturaMaxima: Math.round(data.main.temp_max),
                temperaturaMinima: Math.round(data.main.temp_min),
                presion: Math.round(data.main.pressure),
                humedad: Math.round(data.main.humidity),
                visibilidad: Math.round((data.visibility)/1000),
                velocidadViento: Math.round((data.wind.speed)*3.6),
                direccionViento: data.wind.deg
            }
        })
        .then(clima => {
            console.log(clima)
            mostrarDatos(clima)
        })
}

function mostrarDatos (clima) {
    ciudad.innerText = `${clima.ciudad}`;
    pais.innerText = `${clima.pais}`;
    icono.src = `/icons/${clima.icono}`
    descripcion.innerText = `${clima.descripcion}`;
    temperaturaActual.innerText = `${clima.temperaturaActual} °C`;
    sensacionTermica.innerText = `Sensación térmica ${clima.sensacionTermica} °C`;
    presion.innerText = `Presión atmosférica: ${clima.presion} hpa`;
    humedad.innerText = `Humedad: ${clima.humedad} %`;
    visibilidad.innerText = `Visibilidad: ${clima.visibilidad} km`;
    viento.innerText = `Viento: ${clima.velocidadViento} km/h`;
    centralCardInicial.classList.add("oculto")
    centralCard.classList.remove("oculto")
    cardPronostico.classList.remove("oculto")
}

botonBuscar.addEventListener("click", ()=>{
    let ubicacion = buscador.value
    console.log('ubicacion:', ubicacion)
    fetchLocation(ubicacion)
})

function calcularHora (zona) {
    const fecha = new Date()
    console.log(fecha)
    let hora = fecha.getUTCHours()
    hora = hora + (zona/3600)
    if (hora > 24) {
        hora = hora - 24
        return hora
    } else if (hora < 0) {
        hora = hora + 24
        return hora
    } else {
        return hora
    }
}

function buscarIcono (hora, id) {
    //condicional dia
    if (6 < hora && hora < 19) {
        console.log("es de dia")
        switch(true){
            case (200 <= id && id < 299):
                return "11d.svg"
                break;
            case (300 <= id && id < 399):
                return "09d.svg"
                break;
            case (500 <= id && id < 505):
                return "10d.svg"
                break;
            case (511 <= id && id < 699):
                return "13d.svg"
                break;
            case (700 <= id && id < 799):
                return "50d.svg"
                break;
            case (id === 800):
                return "01d.svg"
                break;
            case (id === 801):
                return "02d.svg"
                break;
            case (id === 802):
                return "03d.svg"
                break;
            case (id === 803):
                return "04d.svg"
                break;
            case (id === 804):
                return "04d.svg"
                break;
        }
    } else {
        console.log("es de noche")
        switch(true) {
            case (200 <= id && id < 300):
                return "11n.svg"
                break;
            case (300 <= id && id< 399):
                return "09n.svg"
                break;
            case (500 <= id && id< 505):
                return "10n.svg"
                break;
            case (511 <= id && id< 699):
                return "13n.svg"
                break;
            case (700 <= id && id< 799):
                return "50n.svg"
                break;
            case (id === 800):
                return "01n.svg"
                break;
            case (id === 801):
                return "02n.svg"
                break;
            case (id === 802):
                return "03n.svg"
                break;
            case (id === 803):
                return "04n.svg"
                break;
            case (id === 804):
                return "04n.svg"
                break;
        }
    }
}

