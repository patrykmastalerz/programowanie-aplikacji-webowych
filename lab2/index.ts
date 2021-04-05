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

function getRecordChannel(): void{
    recordChannels = document.querySelectorAll(".recordChannel");
}

function getPlayChannels(): void {
    playChannelBtns = document.querySelectorAll(".btnChannel");
}

function selectChannel(): void {

    //const recordChannels : NodeListOf<Element> = document.querySelectorAll(".recordChannel"); 

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
    //const playChannelBtn : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");
    for (const channel of playChannelBtns as any){ 
        channel.addEventListener("click", (e: MouseEvent) => {
            console.log(e);
            const target = e.target as HTMLButtonElement; 
            const currentChannel = channels[target.dataset.channel];

            currentChannel.forEach( sound => {
                setTimeout(() => {
                    getAudio(sound.key);
                }, sound.time - startTime[target.dataset.channel])
            })
        })
    }

}

function playAllChannels(): void{
    document.querySelector("#allChannels").addEventListener("click", () => {
        channels.forEach((channel, index) => {
            channel.forEach(sound => {
                setTimeout(() => {
                    getAudio(sound.key);
                }, sound.time - startTime[index])
            })
        })
    })
}

function makeButtonDisabled(){
    console.log(selectedChannel);
    // const buttons : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".recordChannel");
    // const channels : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");

    for (const channel of playChannelBtns as any){ 
        if (selectedChannel == null) {
            channel.disabled = false;
        } else{
            channel.disabled = true;
        }
    }

    for (const button of recordChannels as any){ 
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




    // for (const btn of keyButtons as any){ 
    //     btn.addEventListener("keydown", (e: MouseEvent) => {
    //         btn.classList.add("playing");
    //         console.log("dziala");
    //         btn.forEach( () => {
    //             setTimeout(() => {
    //                 btn.classList.remove("playing");
    //             }, 1000)
    //         })
    //     })
    // }


}
