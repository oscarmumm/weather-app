// 'use strict'

const apikey = "1e0852abb42466a00a4d6d999c3e2b64"

const body = document.querySelector("body")
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

// PARA OBTENER LA UBICACIÓN DEL USUARIO
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;
    return ubicacion = {
            lat: crd.latitude,
            lon: crd.longitude
        }
    }

function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

navigator.geolocation.getCurrentPosition(success, error, options);



botonUbicacion.addEventListener("click", ()=>{
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${ubicacion.lat}&lon=${ubicacion.lon}&limit=1&appid=${apikey}`)
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
            fetchWeather(ubicacion.lat, ubicacion.lon)
            return nombreCiudad = data[0].name
        })
})

function fetchLocation (ubicacion) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}"&limit=1&appid=${apikey}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            fetchWeather(data[0].lat, data[0].lon)
            return nombreCiudad = data[0].name
        })
    }

function fetchWeather (latitud, longitud) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apikey}&units=metric&lang=sp`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            return clima = {
                ciudad: nombreCiudad,
                pais: data.sys.country,
                id: data.weather[0].id,
                icono: buscarIcono(calcularHora(data.timezone), data.weather[0].id)[0],
                descripcion: data.weather[0].description,
                fondo: buscarIcono(calcularHora(data.timezone), data.weather[0].id)[1],
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
    body.style.backgroundImage = clima.fondo
    buscador.value = ""
    centralCardInicial.classList.add("oculto")
    centralCard.classList.remove("oculto")
    //cardPronostico.classList.remove("oculto")
}

botonBuscar.addEventListener("click", ()=>{
    let ubicacion = buscador.value
    fetchLocation(ubicacion)
})

document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        let ubicacion = buscador.value
        if(buscador.value === "") {
            alert("Por favor ingrese una ubicación válida")
        } else {
            fetchLocation(ubicacion)
        }
    }
});

function calcularHora (zona) {
    const fecha = new Date()
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
    if (6 < hora && hora < 19) {
        switch(true){
            case (200 <= id && id < 299):
                return ["11d.svg", "url(/img/dia_tormenta_electrica.webp)"]
                break;
            case (300 <= id && id < 399):
                return ["09d.svg", "url(/img/dia_lluvia.webp)"]
                break;
            case (500 <= id && id < 600):
                return ["10d.svg", "url(/img/dia_lluvia.webp)"]
                break;
            case (600 <= id && id < 699):
                return ["13d.svg", "url(/img/dia_nevando.webp)"]
                break;
            case (700 <= id && id < 799):
                return ["50d.svg", "url(/img/dia_niebla.webp)"]
                break;
            case (id === 800):
                return ["01d.svg", "url(/img/dia_despejado.webp)"]
                break;
            case (id === 801):
                return ["02d.svg", "url(/img/dia_nublado.webp)"]
                break;
            case (id === 802):
                return ["03d.svg", "url(/img/dia_nublado.webp)"]
                break;
            case (id === 803):
                return ["04d.svg", "url(/img/dia_nublado.webp)"]
                break;
            case (id === 804):
                return ["04d.svg", "url(/img/dia_nublado.webp)"]
                break;
        }
    } else {
        switch(true) {
            case (200 <= id && id < 300):
                return ["11n.svg", "url(/img/noche_tormenta_electrica.webp)"]
                break;
            case (300 <= id && id < 399):
                return ["09n.svg", "url(/img/noche_lluvia.webp)"]
                break;
            case (500 <= id && id < 600):
                return ["10n.svg", "url(/img/noche_lluvia.webp)"]
                break;
            case (600 <= id && id < 699):
                return ["13n.svg", "url(/img/noche_nevando.webp)"]
                break;
            case (700 <= id && id < 799):
                return ["50n.svg", "url(/img/noche_niebla.webp)"]
                break;
            case (id === 800):
                return ["01n.svg", "url(/img/noche_despejada.webp)"]
                break;
            case (id === 801):
                return ["02n.svg", "url(/img/noche_nublada.webp)"]
                break;
            case (id === 802):
                return ["03n.svg", "url(/img/noche_nublada.webp)"]
                break;
            case (id === 803):
                return ["04n.svg", "url(/img/noche_nublada.webp)"]
                break;
            case (id === 804):
                return ["04n.svg", "url(/img/noche_nublada.webp)"]
                break;
        }
    }
}

