var startTime = null;
var selectedChannel = null;
var channels = [[], [], [], []];
appStart();
function appStart() {
    makeSound();
    selectChannel();
    playChannel();
}
function selectChannel() {
    var recordChannels = document.querySelectorAll(".recordChannel");
    for (var _i = 0, _a = recordChannels; _i < _a.length; _i++) {
        var record = _a[_i];
        record.addEventListener("click", function (e) {
            var recordValue = e.target.dataset.record;
            if (selectedChannel !== Number(recordValue)) {
                selectedChannel = Number(recordValue);
                startTime = e.timeStamp;
            }
            else {
                selectedChannel = null;
            }
            makeButtonDisabled();
        });
    }
}
function makeSound() {
    window.addEventListener("keydown", function (e) {
        var audio = getAudio(e.key);
        recordSound(audio, e.timeStamp);
        console.log(channels);
    });
}
function getAudio(key) {
    var audio = document.querySelector("[data-key=\"" + key + "\"]");
    audio.currentTime = 0;
    audio.play();
    return audio;
}
function playChannel() {
    var playChannelBtn = document.querySelectorAll(".btnChannel");
    for (var _i = 0, _a = playChannelBtn; _i < _a.length; _i++) {
        var channel = _a[_i];
        channel.addEventListener("click", function (e) {
            console.log(e);
            var currentChannel = channels[e.target.dataset.channel];
            currentChannel.forEach(function (sound) {
                setTimeout(function () {
                    getAudio(sound.key);
                }, sound.time - startTime);
            });
        });
    }
}
function makeButtonDisabled() {
    console.log(selectedChannel);
    var buttons = document.querySelectorAll(".recordChannel");
    var channels = document.querySelectorAll(".btnChannel");
    for (var _i = 0, _a = channels; _i < _a.length; _i++) {
        var channel = _a[_i];
        if (selectedChannel == null) {
            channel.disabled = false;
        }
        else {
            channel.disabled = true;
        }
    }
    for (var _b = 0, _c = buttons; _b < _c.length; _b++) {
        var button = _c[_b];
        if (selectedChannel == null) {
            button.disabled = false;
        }
        else if (Number(button.dataset.record) !== selectedChannel) {
            button.disabled = true;
        }
    }
}
function recordSound(audio, timestamp) {
    if (selectedChannel != null) {
        channels[selectedChannel].push({
            key: audio.dataset.key,
            time: timestamp
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
