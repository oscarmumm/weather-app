const apikey = "1e0852abb42466a00a4d6d999c3e2b64"

const buscador = document.getElementById("buscador")
const botonBuscar = document.getElementById("boton-buscar")


let fetchLocation = function (ubicacion) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}"&limit=1&appid=1e0852abb42466a00a4d6d999c3e2b64`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('data:', data)
            fetchWeather(data[0].lat, data[0].lon)
        })
    }

let fetchWeather = function(latitud, longitud) {
    console.log("se ejecuta fetchWeather")
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apikey}&units=metric&lang=sp`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log("Ciudad / Pais: ", data.name +" / "+ data.sys.country)
            console.log("Condicion climatica: ", data.weather[0].description)
            console.log("Temperatura actual: ", data.main.temp)
            console.log("Sensacion termica: ", data.main.feels_like)
            console.log("Maxima: ", data.main.temp_max)
            console.log("Minnima: ", data.main.temp_min)
            console.log("Presion atmosferica: ", data.main.pressure)
            console.log("Humedad: ", data.main.humidity)
            console.log(data.weather)
        })
}

botonBuscar.addEventListener("click", ()=>{
    let ubicacion = buscador.value
    console.log('ubicacion:', ubicacion)
    fetchLocation(ubicacion)
})


/*
Api call para obtener las coordenadas de 
latitud y longitud de una determinada ciudad:

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

Ejejmplo:
http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

DOC: https://openweathermap.org/api/geocoding-api#direct


Api call para obtener los datos meteorológicos:

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

Ejemplo:
https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}

DOC: https://openweathermap.org/current
*/