var hitHatSound;
var clapSound;
var boomSound;
var kickSound;
var recordChannel1;
var recordChannel2;
var recordChannel3;
var recordChannel4;
var channel1 = [];
var channel2 = [];
var channel3 = [];
var channel4 = [];
appStart();
function appStart() {
    document.body.addEventListener('keypress', onKeyDown);
    setPlayOnButtonChannels();
    getSounds();
}
function onPlayChannel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function setPlayOnButtonChannels() {
    document.querySelector("#btnChannel1").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel2").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel3").addEventListener('click', onPlayChannel1);
    document.querySelector("#btnChannel4").addEventListener('click', onPlayChannel1);
}
function getRecordButtons() {
    recordChannel1 = document.querySelector("#startRecordChannel1");
    recordChannel2 = document.querySelector("#startRecordChannel2");
    recordChannel3 = document.querySelector("#startRecordChannel3");
    recordChannel4 = document.querySelector("#startRecordChannel4");
}
function getSounds() {
    hitHatSound = document.querySelector('[data-sound="hihat"]');
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}
function onKeyDown(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    channel1.push({ key: key, time: time });
}
function playSound(key) {
    switch (key) {
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
