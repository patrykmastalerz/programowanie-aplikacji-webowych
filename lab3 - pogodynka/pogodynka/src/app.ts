import { IWeatherData } from './interface';

export class App {
    opwApiKey = '8030280095c14fd30fd407266b2a4e1a';
    cityInput: HTMLInputElement;
    addCityBtn: HTMLButtonElement;
    uiWeather = new UIWeather();

    constructor() {
        this.getInputAndButton();
        this.getCityData();
        this.getWeatherAllCities();
        
    }


    getWeatherAllCities(){
        let city:any [] = this.getData();

        city.forEach( element => {
            let info = this.getCityInfo(element);
            info.then( resp => {
                if (resp.cod === 200) {
                    console.log("tutaj renderowanie widoku")
                    this.uiWeather.renderWeatherElement(resp);
                }
            })
        })
        console.log(city.length)
    }

    saveCities(city: string): boolean {
        let existingCities = this.getData();

        if (!existingCities.includes(city)) {
            existingCities.push(city);
            localStorage.setItem('cities', JSON.stringify(existingCities));
            return true;
        }
        return false;
    }



    getCityData(){
        this.addCityBtn.addEventListener("click", () => {
            const city = this.getCityInfo(this.cityInput.value);
            
            city.then(resp => {
                if(resp.cod === 200){
                    let isAdded = this.saveCities(resp.name);
                    // let isAdded = this.saveCities(this.cityInput.value);
                    if (isAdded) 
                        this.uiWeather.renderWeatherElement(resp);
                }
            })
        });
    }

    getInputAndButton(){
        this.cityInput = <HTMLInputElement>document.getElementById("cityInput");
        this.addCityBtn = <HTMLButtonElement>document.getElementById("cityAddButton");
    }

    async getCityInfo(city: string) {
        const weather = await this.getWeather(city);
        return weather;
    }
    async getWeather(city: string): Promise<IWeatherData> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData: IWeatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
    }
   


    getData() {
        // const data = localStorage.getItem('weatherData');
        const data = localStorage.getItem('cities');
        if (data) {
            return JSON.parse(data);
            // return data;
        } else {
            return [];
        }
    }


    
    // saveData(data: any) {
    //     localStorage.setItem('weatherData', JSON.stringify(data));
    // }
}

class UIWeather{
    name: string;
    temp: number;
    wrapper: HTMLDivElement;

    constructor() {
        this.getWrapper();
    }

    getWrapper(){
        this.wrapper = <HTMLDivElement>document.getElementById('wrapper');
    }

    removeCity(name: string){
        const city = <HTMLDivElement>document.getElementById(name);

        const allCities: string[] = JSON.parse(localStorage.getItem('cities'));
        console.log(allCities);
        const newCities = allCities.filter((e) => e !== name);
        localStorage.setItem('cities', JSON.stringify(newCities));
        this.wrapper.removeChild(city);
    }

    renderWeatherElement(weatherData: IWeatherData){
        // const wrapper = document.getElementById('wrapper');
        const weatherWrapper = document.createElement('div');
        weatherWrapper.className = "weatherWrapper";
        weatherWrapper.id = weatherData.name;

        // main details
        const weatherMainInfoWrapper = document.createElement('div');
        weatherMainInfoWrapper.className = "weatherMain"

        const weatherCityName = document.createElement("span");
        weatherCityName.textContent = weatherData.name;
        weatherCityName.className = "weatherCity";

        const weatherClouds = document.createElement("span");
        weatherClouds.textContent = `${weatherData.weather}`;
        weatherClouds.className = "weatherCoulds";

        console.log(weatherData)
        // console.log(weatherData.weather[0])
        const weatherIcon = document.createElement("img");
        // weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        const weatherTemp = document.createElement("span");
        weatherTemp.textContent = `${(weatherData.main.temp.toFixed(1))} °C`;
        weatherTemp.className = "weatherTemp";

        weatherMainInfoWrapper.appendChild(weatherCityName);
        weatherMainInfoWrapper.appendChild(weatherClouds);
        weatherMainInfoWrapper.appendChild(weatherIcon);
        weatherMainInfoWrapper.appendChild(weatherTemp);

        // details
        const weatherDetailInfoWrapper = document.createElement('div');
        weatherDetailInfoWrapper.className = "weatherDetails";
        
        const weatherHumidity = document.createElement("span");
        weatherHumidity.textContent = `Wilgotność: ${(weatherData.main.humidity)}%`;
        weatherHumidity.className = "weatherHumidity";

        const weatherPressure = document.createElement("span");
        weatherPressure.textContent = `Ciśnienie: ${(weatherData.main.pressure)}hPa`;
        weatherPressure.className = "weatherPressure";

        const removeBtn = document.createElement("button");
        removeBtn.textContent= "Usuń";
        removeBtn.className = "removeCityButton";
        removeBtn.addEventListener('click', () => {
            this.removeCity(weatherWrapper.id);
            //this.wrapper.removeChild(weatherWrapper);
        });

        weatherDetailInfoWrapper.appendChild(weatherHumidity);
        weatherDetailInfoWrapper.appendChild(weatherPressure);
        weatherDetailInfoWrapper.appendChild(removeBtn);

        weatherWrapper.appendChild(weatherMainInfoWrapper);
        weatherWrapper.appendChild(weatherDetailInfoWrapper);

        this.wrapper.appendChild(weatherWrapper);
    }
}