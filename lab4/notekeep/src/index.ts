import { App } from './app';
import { UIWeather } from './uiWeather';
import './main.scss';

const uiWeather = new UIWeather();
const app = new App(uiWeather);
