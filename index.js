const apiKey='9123ece9d19373f351e15a52713c6743'

let card=document.querySelector('.weather-card')

let inputEl=document.getElementById('city-name')

let submitBtn=document.getElementById('submit-btn')

submitBtn.addEventListener('click', searchForWeather)

inputEl.addEventListener('keydown',function(event){
    if(event.key=='Enter')
    {
        searchForWeather()  
    }
})

//on first load of the webpage, i have my hometown's weather
getWeatherData('Siliguri')


function searchForWeather(){

    let city=inputEl.value.trim()

    if(city==="")
        return

    inputEl.value=""

    getWeatherData(city)

}

async function getWeatherData(city)
{

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    try{
        const response=await fetch(url)

        if(!response.ok)
            throw new Error("Request failed. Couldnt fetch weather data")

        const data=await response.json()

        displayWeatherData(data)
    }
    catch(error)
    {
        displayError(error)
    }
    
}

function displayWeatherData(data)
{
    //object destructuring, here we have nested objects that kinda make it look very complicated
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data

    card.innerText=""
    card.style.display='flex'

    let cityName=document.createElement('h1')
    cityName.innerText=`${city}`
    card.append(cityName)
    cityName.classList.add('city-name-display')

    let tempEl=document.createElement('p')
    tempEl.innerText=`${(temp-273.15).toFixed(1)}°C`
    card.append(tempEl)
    tempEl.classList.add('temp-display')

    let humidityEl=document.createElement('p')
    humidityEl.innerText=`Humidity: ${humidity}%`
    card.append(humidityEl)
    humidityEl.classList.add('humidity-display')

    let descriptionEl=document.createElement('p')
    descriptionEl.innerText=`${description}`
    card.append(descriptionEl)
    descriptionEl.classList.add('description-display')

    let emoji=getEmoji(id)

    let emojiEl=document.createElement('p')
    emojiEl.innerText=`${emoji}`
    card.append(emojiEl)
    emojiEl.classList.add('emoji-display')
}


function getEmoji(id)
{
    switch(true){
        case (id>=200 && id<=232):
            return "⛈️"
        case (id>=300 && id<=321):
            return "🌧️"
        case (id>=500 && id<=531):
            return "🌧️"
        case (id>=600 && id<=622):
            return "🌨️"
        case (id>=700 && id<=781):
            return "🌫️"
        case (id===800):
            return "☀️"
        case (id>800 && id<=804):
            return "☁️"
        default:
            return "❔"
    }
}


function displayError(error)
{
    console.error(error)
    card.innerText=""
    let errorMessage=document.createElement('p')
    errorMessage.innerText="Please enter a valid city name!" 
    errorMessage.classList.add('error-message')
    card.append(errorMessage)   
}