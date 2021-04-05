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
function selectChannel() {
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
    var _loop_1 = function (channel) {
        channel.addEventListener("click", function (e) {
            var target = e.target;
            var currentChannel = channels[target.dataset.channel];
            var index = channel.dataset.channel;
            var time;
            currentChannel.forEach(function (sound) {
                time = sound.time - startTime[target.dataset.channel].toFixed() + "ms";
                setTimeout(function () {
                    getAudio(sound.key);
                }, sound.time - startTime[target.dataset.channel]);
            });
            addAnimationToProgressBar(index, time);
            console.log(channel);
        });
    };
    for (var _i = 0, _a = playChannelBtns; _i < _a.length; _i++) {
        var channel = _a[_i];
        _loop_1(channel);
    }
}
function addAnimationToProgressBar(index, time) {
    var progressBars = document.querySelectorAll(".progressBar");
    var _loop_2 = function (progress) {
        if (index == progress.dataset.progressbar) {
            progress.style = "";
            setTimeout(function () {
                progress.style.animation = "progressBarAnim " + time + " linear";
            }, 0);
        }
    };
    for (var _i = 0, _a = progressBars; _i < _a.length; _i++) {
        var progress = _a[_i];
        _loop_2(progress);
    }
}
function playAllChannels() {
    document.querySelector("#allChannels").addEventListener("click", function () {
        channels.forEach(function (channel, index) {
            var time;
            channel.forEach(function (sound) {
                time = sound.time - Number(startTime[index].toFixed()) + "ms";
                setTimeout(function () {
                    getAudio(sound.key);
                }, sound.time - startTime[index]);
            });
            addAnimationToProgressBar(index, time);
        });
    });
}
function makeButtonDisabled() {
    for (var _i = 0, _a = playChannelBtns; _i < _a.length; _i++) {
        var channel = _a[_i];
        if (selectedChannel == null) {
            channel.disabled = false;
            channel.classList.remove("disable");
        }
        else {
            channel.disabled = true;
            channel.classList.add("disable");
        }
    }
    for (var _b = 0, _c = recordChannels; _b < _c.length; _b++) {
        var button = _c[_b];
        if (selectedChannel == null) {
            button.disabled = false;
            button.classList.remove("disable");
        }
        else if (Number(button.dataset.record) !== selectedChannel) {
            button.disabled = true;
            button.classList.add("disable");
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
        var _loop_3 = function (btn) {
            if (e.key == btn.dataset.keybutton) {
                btn.classList.add("playing");
                setTimeout(function () {
                    btn.classList.remove("playing");
                }, 100);
            }
        };
        for (var _i = 0, _a = keyButtons; _i < _a.length; _i++) {
            var btn = _a[_i];
            _loop_3(btn);
        }
    });
}
function getRecordChannel() {
    recordChannels = document.querySelectorAll(".recordChannel");
}
function getPlayChannels() {
    playChannelBtns = document.querySelectorAll(".btnChannel");
}
