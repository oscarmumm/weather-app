const apikey = "1e0852abb42466a00a4d6d999c3e2b64"

const buscador = document.getElementById("buscador")
const botonBuscar = document.getElementById("boton-buscar")

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

let fetchLocation = function (ubicacion) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}"&limit=1&appid=${apikey}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log('data:', data)
            fetchWeather(data[0].lat, data[0].lon)
        })
    }

let fetchWeather = function(latitud, longitud) {
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

let mostrarDatos = function (clima) {
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
}

botonBuscar.addEventListener("click", ()=>{
    let ubicacion = buscador.value
    console.log('ubicacion:', ubicacion)
    fetchLocation(ubicacion)
})

let calcularHora = function (zona) {
    const fecha = new Date()
    let hora = fecha.getUTCHours()
    hora = hora + (zona/3600)
    if (hora > 24) {
        hora = hora - 24
        return hora
    } else {
        return hora
    }
}

let buscarIcono = function (hora, id) {
    if (6 < hora && hora < 19) {
        console.log(hora)
        switch(id){
            case (200 <= id < 299):
                return "11d.svg"
                break;
            case (300 <= id < 399):
                return "09d.svg"
                break;
            case (500 <= id < 505):
                return "10d.svg"
                break;
            case (511 <= id < 699):
                return "13d.svg"
                break;
            case (700 <= id< 799):
                return "50d.svg"
                break;
            case 800:
                return "01d.svg"
                break;
            case 801:
                return "02d.svg"
                break;
            case 802:
                return "03d.svg"
                break;
            case 803:
                return "04d.svg"
                break;
            case 804:
                return "04d.svg"
                break;
        }
    } else {
        console.log("estas aca! Hora: ", hora)
        switch(id) {
            case (id >= 200 && id < 300):
                return "11n.svg"
                break;
            case (300 <= id < 399):
                return "09n.svg"
                break;
            case (500 <= id < 505):
                return "10n.svg"
                break;
            case (511 <= id < 699):
                return "13n.svg"
                break;
            case (700 <= id < 799):
                return "50n.svg"
                break;
            case 800:
                return "01n.svg"
                break;
            case 801:
                return "02n.svg"
                break;
            case 802:
                return "03n.svg"
                break;
            case 803:
                return "04n.svg"
                break;
            case 804:
                return "04n.svg"
                break;
        }
    }
}

