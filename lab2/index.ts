type Channel = {key: string, time: number}
const channels: Channel[][] = [[], [], [], []];


let startTime: (number|null)[] = [null, null, null, null];
let selectedChannel: number|null = null;

let recordChannels : NodeListOf<Element>;
let playChannelBtns : NodeListOf<HTMLButtonElement>;

appStart();

function appStart(): void {
    getRecordChannel();
    getPlayChannels();

    addEventOnKeyButtons();
    makeSound();
    selectChannel();
    playChannel();
    playAllChannels();
}


function selectChannel(): void {
    for (const record of recordChannels as any){ 
        record.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement; 
            const recordValue = target.dataset.record;
            const parsedValue = Number(recordValue);

            if (selectedChannel !== parsedValue) {
                selectedChannel = parsedValue;
                startTime[parsedValue] = e.timeStamp;
            }else{
                selectedChannel = null;
            }
            makeButtonDisabled();
        })
    }  
}

function makeSound(): void {
    window.addEventListener("keydown", (e) => {
        const audio: HTMLAudioElement = getAudio(e.key);
        recordSound(audio, e.timeStamp);
        console.log(channels);

    })
}

function getAudio(key: string) {
    const audio : HTMLAudioElement = document.querySelector(`[data-key="${key}"]`)
    audio.currentTime = 0;
    audio.play();

    return audio;
}

function playChannel(): void {
    
    for (const channel of playChannelBtns as any){ 
        channel.addEventListener("click", (e: MouseEvent) => {

            const target = e.target as HTMLButtonElement; 
            const currentChannel = channels[target.dataset.channel];
            
            let index: number = channel.dataset.channel;
            let time: string;

            currentChannel.forEach( sound => {
                time = `${sound.time - startTime[target.dataset.channel].toFixed()}ms`;

                setTimeout(() => {
                    getAudio(sound.key);

                }, sound.time - startTime[target.dataset.channel])
                
            })
            addAnimationToProgressBar(index, time);
            console.log(channel);
        })
    }

}

function addAnimationToProgressBar(index: number, time: string){
    const progressBars : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".progressBar");

    for (const progress of progressBars as any){  
        if (index == progress.dataset.progressbar) { 
            progress.style = "";

            setTimeout(() => {
                progress.style.animation = `progressBarAnim ${time} linear`;
            }, 0)
        } 
    }
}


function playAllChannels(): void{
    document.querySelector("#allChannels").addEventListener("click", () => {
        channels.forEach((channel, index) => {
            let time: string;
            
            channel.forEach(sound => {
                time = `${sound.time - Number(startTime[index].toFixed())}ms`;
                setTimeout(() => {
                    getAudio(sound.key);
                }, sound.time - startTime[index])
            })
            addAnimationToProgressBar(index, time);
        })
    })
}

function makeButtonDisabled(){

    for (const channel of playChannelBtns as any){ 
        if (selectedChannel == null) {
            channel.disabled = false;
            channel.classList.remove("disable");
        } else{
            channel.disabled = true;
            channel.classList.add("disable");
        }
    }

    for (const button of recordChannels as any){ 
        if (selectedChannel == null) {
            button.disabled = false;
            button.classList.remove("disable");
        } else if (Number(button.dataset.record) !== selectedChannel) {
            button.disabled = true;
            button.classList.add("disable");
        }
    }
}

function recordSound(audio: HTMLAudioElement, timestamp: number): void {
    if (selectedChannel != null) {
        channels[selectedChannel].push({
            key: audio.dataset.key,
            time: timestamp,
        });
    }
}

function addEventOnKeyButtons(): void{
    const keyButtons : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".keyButton");
    window.addEventListener("keydown", (e) => {

        for (const btn of keyButtons as any){
            if (e.key == btn.dataset.keybutton) {
                btn.classList.add("playing");

                setTimeout(() => {
                    btn.classList.remove("playing");
                }, 100)
            } 
   
        }
    })

}

function getRecordChannel(): void{
    recordChannels = document.querySelectorAll(".recordChannel");
}

function getPlayChannels(): void {
    playChannelBtns = document.querySelectorAll(".btnChannel");
}

