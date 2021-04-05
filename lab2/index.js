var channels = [[], [], [], []];
var startTime = [null, null, null, null];
var selectedChannel = null;
var recordChannels;
var playChannelBtns;
appStart();
function appStart() {
    getRecordChannel();
    getPlayChannels();
    addEventOnKeyButtons();
    makeSound();
    selectChannel();
    playChannel();
    playAllChannels();
}
function getRecordChannel() {
    recordChannels = document.querySelectorAll(".recordChannel");
}
function getPlayChannels() {
    playChannelBtns = document.querySelectorAll(".btnChannel");
}
function selectChannel() {
    //const recordChannels : NodeListOf<Element> = document.querySelectorAll(".recordChannel"); 
    for (var _i = 0, _a = recordChannels; _i < _a.length; _i++) {
        var record = _a[_i];
        record.addEventListener("click", function (e) {
            var target = e.target;
            var recordValue = target.dataset.record;
            var parsedValue = Number(recordValue);
            if (selectedChannel !== parsedValue) {
                selectedChannel = parsedValue;
                startTime[parsedValue] = e.timeStamp;
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
    //const playChannelBtn : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");
    for (var _i = 0, _a = playChannelBtns; _i < _a.length; _i++) {
        var channel = _a[_i];
        channel.addEventListener("click", function (e) {
            console.log(e);
            var target = e.target;
            var currentChannel = channels[target.dataset.channel];
            currentChannel.forEach(function (sound) {
                setTimeout(function () {
                    getAudio(sound.key);
                }, sound.time - startTime[target.dataset.channel]);
            });
        });
    }
}
function playAllChannels() {
    document.querySelector("#allChannels").addEventListener("click", function () {
        channels.forEach(function (channel, index) {
            channel.forEach(function (sound) {
                setTimeout(function () {
                    getAudio(sound.key);
                }, sound.time - startTime[index]);
            });
        });
    });
}
function makeButtonDisabled() {
    console.log(selectedChannel);
    // const buttons : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".recordChannel");
    // const channels : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btnChannel");
    for (var _i = 0, _a = playChannelBtns; _i < _a.length; _i++) {
        var channel = _a[_i];
        if (selectedChannel == null) {
            channel.disabled = false;
        }
        else {
            channel.disabled = true;
        }
    }
    for (var _b = 0, _c = recordChannels; _b < _c.length; _b++) {
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
function addEventOnKeyButtons() {
    var keyButtons = document.querySelectorAll(".keyButton");
    window.addEventListener("keydown", function (e) {
        var _loop_1 = function (btn) {
            if (e.key == btn.dataset.keybutton) {
                btn.classList.add("playing");
                setTimeout(function () {
                    btn.classList.remove("playing");
                }, 100);
            }
        };
        for (var _i = 0, _a = keyButtons; _i < _a.length; _i++) {
            var btn = _a[_i];
            _loop_1(btn);
        }
    });
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
