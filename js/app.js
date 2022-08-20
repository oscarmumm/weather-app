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
            return clima = {
                ciudad: data.name,
                pais: data.sys.country,
                descripcion: data.weather[0].description,
                temperaturaActual: data.main.temp,
                sensacionTermica: data.main.feels_like,
                temperaturaMaxima: data.main.temp_max,
                temperaturaMinima: data.main.temp_min,
                presion: data.main.pressure,
                humedad: data.main.humidity,
                visibilidad: (data.visibility)/1000,
                velocidadViento: (data.wind.speed)*3.6,
                direccionViento: data.wind.deg
            }
            // console.log(data)
            // console.log("Ciudad / Pais: ", data.name +" / "+ data.sys.country)
            // console.log("Condicion climatica: ", data.weather[0].description)
            // console.log("Temperatura actual: ", data.main.temp)
            // console.log("Sensacion termica: ", data.main.feels_like)
            // console.log("Maxima: ", data.main.temp_max)
            // console.log("Minnima: ", data.main.temp_min)
            // console.log("Presion atmosferica: ", data.main.pressure)
            // console.log("Humedad: ", data.main.humidity)
            // console.log("Visibilidad: ", (data.visibility)/1000)//divido para pasarlo a km
            // console.log("Velocidad del viento: ", (data.wind.speed)*3.6)//multiplico para pasarlo a km/h
            // console.log("Direccion del viento: ", data.wind.deg)//viene expresado en grados (ver tabla)

        })
}

botonBuscar.addEventListener("click", ()=>{
    let ubicacion = buscador.value
    console.log('ubicacion:', ubicacion)
    fetchLocation(ubicacion)
})


/*
tabla de viento:
N:  337.5 a 360 y 0 a 22.5
NE: 22.5 a 67.5
E: 67.5 a 112.5
SE: 112.5 a 157.5
S: 157.5 a 202.5
SO: 202.5 a 247.5
O: 247.5 a 292.5
NO: 292.5 a 337.5
*/

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