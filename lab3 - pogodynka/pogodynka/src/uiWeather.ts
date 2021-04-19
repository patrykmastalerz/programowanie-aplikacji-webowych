import { IWeatherData } from './interface';

export class UIWeather{
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
        //weatherClouds.textContent = `${weatherData.weather[0].main}`;
        weatherClouds.className = "weatherCoulds";

       
        console.log(weatherData.weather);
        console.log(weatherData.weather[0].icon);
        const weatherIcon = document.createElement("img");
        //weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

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

        //remove btn
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