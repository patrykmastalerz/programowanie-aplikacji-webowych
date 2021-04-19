import { IWeatherData } from './interface';
import { UIWeather } from './uiWeather';

export class App {
    opwApiKey = '8030280095c14fd30fd407266b2a4e1a';
    cityInput: HTMLInputElement;
    addCityBtn: HTMLButtonElement;
    uiWeather: UIWeather;

    constructor(uiWeather: UIWeather) {
        this.getInputAndButton();
        this.getCityData();
        this.getWeatherAllCities();
        this.uiWeather = uiWeather;
    }


    getWeatherAllCities(){
        let city:string [] = this.getData();

        city.forEach( element => {
            let info = this.getCityInfo(element);
            info.then( resp => {
                if (resp.cod === 200) {
                    console.log(resp);
                    this.uiWeather.renderWeatherElement(resp);
                }
            })
        })
        // console.log(city.length)
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
