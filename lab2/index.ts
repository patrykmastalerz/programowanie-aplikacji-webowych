let hitHatSound: HTMLAudioElement;
let clapSound: HTMLAudioElement;
let boomSound: HTMLAudioElement;
let kickSound: HTMLAudioElement;

let recordChannel1: HTMLButtonElement;
let recordChannel2: HTMLButtonElement;
let recordChannel3: HTMLButtonElement;
let recordChannel4: HTMLButtonElement;

const channel1: any[] = [];
const channel2: any[] = [];
const channel3: any[] = [];
const channel4: any[] = [];

appStart();

function appStart(): void {
    document.body.addEventListener('keypress', onKeyDown);

    setPlayOnButtonChannels();
    getSounds();
}

function onPlayChannel1(): void {
    channel1.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time)
    })
}

function setPlayOnButtonChannels(): void{
    document.querySelector("#btnChannel1").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel2").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel3").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel4").addEventListener('click', onPlayChannel1);
}

function getRecordButtons(): void{
    recordChannel1 = document.querySelector("#startRecordChannel1").addEventListener('click', onStartRecord);
    recordChannel2 = document.querySelector("#startRecordChannel2")
    recordChannel3 = document.querySelector("#startRecordChannel3");
    recordChannel4 = document.querySelector("#startRecordChannel4");
}

function onStartRecord(): void {
    
}

function getSounds(): void{
    hitHatSound = document.querySelector('[data-sound="hihat"]');
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}

function onKeyDown(ev: KeyboardEvent): void{
    const key = ev.key;
    const time = ev.timeStamp;

    channel1.push({key, time});
}

function playSound(key: string): void {
    switch (key){
        case 'q':
            hitHatSound.currentTime = 0;
            hitHatSound.play();
            break;
        case 'w':
            clapSound.currentTime = 0;
            clapSound.play();
            break;    
        case 'e':
            boomSound.currentTime = 0;
            boomSound.play();
            break; 
        case 'r':
            boomSound.currentTime = 0;
            boomSound.play();
            break; 
    }
}