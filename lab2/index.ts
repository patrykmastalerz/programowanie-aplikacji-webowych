type Channel = {key: string, time: number}

let startTime: (number|null)[] = [null, null, null, null];
let selectedChannel: number|null = null;
const channels: Channel[][] = [[], [], [], []];

appStart();

function appStart(): void {
    makeSound();
    selectChannel();
    playChannel();
}


function selectChannel(): void {

    const recordChannels : NodeListOf<Element> = document.querySelectorAll(".recordChannel") 

    for (const record of recordChannels as any){ 
        record.addEventListener("click", (e: MouseEvent) => {
            const recordValue = (<HTMLInputElement>e.target).dataset.record;
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
        const audio = getAudio(e.key);
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
    const playChannelBtn : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");
    for (const channel of playChannelBtn as any){ 
        channel.addEventListener("click", (e) => {
            console.log(e);
            const currentChannel = channels[e.target.dataset.channel];

            currentChannel.forEach( sound => {
                setTimeout(() => {
                    getAudio(sound.key);
                }, sound.time - startTime)
            })
        })
    }
    
}

function makeButtonDisabled(){
    console.log(selectedChannel);
    const buttons : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".recordChannel");
    const channels : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");

    for (const channel of channels as any){ 
        if (selectedChannel == null) {
            channel.disabled = false;
        } else{
            channel.disabled = true;
        }
    }

    for (const button of buttons as any){ 
        if (selectedChannel == null) {
            button.disabled = false;
        } else if (Number(button.dataset.record) !== selectedChannel) {
            button.disabled = true;
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
// function onPlayChannel1(): void {
//     channel1.forEach(sound => {
//         setTimeout(() => makeSound(sound.key), sound.time)
//     })
// }


// function onKeyDown(ev: KeyboardEvent): void{
//     const key = ev.key;
//     const time = ev.timeStamp;
//     console.log(time);

//     makeSound(key);
//     // channel1.push({key, time});
// }

// po kliknieciu nagrywal -> biorac pod uwage roznice czasowe
// odtwarzal dzwiek po kanale



//odtwarzanie dzwieku
// function setPlayOnButtonChannels(): void{
    
//     document.querySelector("#btnChannel1").addEventListener('click', onPlayChannel1);
// }