var myInterval;
document.getElementById('bpm').addEventListener('change', function (e) {
    if (document.getElementById('bpm').value == '') {
        e.target.value = 60;
    }
    else if (document.getElementById('bpm').value < 60) {
        e.target.value = 60;
    }
    else if (document.getElementById('bpm').value > 200) {
        e.target.value = 200;
    }
})



function loopingFunction(stopFlag) {
    var bpm = 60000 / (document.getElementById('bpm').value);
    //Audio for loop
    var metronome = new Audio('./audio/metronome.mp3');
    var newBarMetronome = new Audio('./audio/new-bar-metronome.mp3');
    var kick = new Audio('./audio/kick.mp3');
    var snare = new Audio('./audio/snare.mp3');
    var clap = new Audio('./audio/clap.mp3');
    var cowbell = new Audio('./audio/cowbell.mp3');
    var indexLength = document.getElementsByClassName('time').length;
    for (var i = 0; i < indexLength; i++) {
        (function (i) {


            var metronomeCheck = document.getElementById('metronome');



            setTimeout(function () {
                if (metronomeCheck.checked) {
                    if (i % 4 === 0) {
                        newBarMetronome.play();
                    }
                    else {
                        metronome.play();
                    }
                }



                document.getElementsByClassName('time')[i].classList.add('timeActive');
                //Playing instruments
                if (document.querySelectorAll('.timeline-kick')[i].classList.contains('kick-active')) {
                    kick.play();
                }
                if (document.querySelectorAll('.timeline-snare')[i].classList.contains('snare-active')) {
                    snare.play();
                }
                if (document.querySelectorAll('.timeline-clap')[i].classList.contains('clap-active')) {
                    clap.play();
                }
                if (document.querySelectorAll('.timeline-cowbell')[i].classList.contains('cowbell-active')) {
                    cowbell.play();
                }

                if (i === 0) {
                    document.getElementsByClassName('time')[indexLength - 1].classList.remove('timeActive');
                }
                else {
                    document.getElementsByClassName('time')[i - 1].classList.remove('timeActive');
                }


            }, bpm * i);

        }(i));

    }
}





document.getElementsByClassName('startBtn')[0].addEventListener('click', function () {
    var bpm = 60000 / (document.getElementById('bpm').value);

    var playBtnAudio = new Audio('./audio/play-btn-audio.mp3');
    playBtnAudio.play();

    loopingFunction();
    myInterval = setInterval(loopingFunction, bpm * document.getElementsByClassName('time').length);
    document.getElementsByClassName('startBtn')[0].disabled = true;
    document.getElementsByClassName('stopBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = true;

});


document.getElementsByClassName('stopBtn')[0].addEventListener('click', function () {
    clearInterval(myInterval);
    var bpm = 60000 / (document.getElementById('bpm').value);
    var stopBtnAudio = new Audio('./audio/stop-btn-audio.mp3');
    stopBtnAudio.play();
    setInterval(function () {
        document.getElementsByClassName('sequenceBox')[7].classList.remove('timeActive');
    }, bpm);


    document.getElementsByClassName('stopBtn')[0].disabled = true;
    document.getElementsByClassName('startBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = false;

});



function kickPlay() {
    for (var i = 0; i < document.getElementsByClassName('timeline-kick').length; i++) {
        (function (i) {

            document.getElementsByClassName('timeline-kick')[i].addEventListener('click', function () {
                document.getElementsByClassName('timeline-kick')[i].classList.toggle('kick-active');
            });


        }(i));
    }
}

function snarePlay() {
    for (var i = 0; i < document.getElementsByClassName('timeline-snare').length; i++) {
        (function (i) {

            document.getElementsByClassName('timeline-snare')[i].addEventListener('click', function () {
                document.getElementsByClassName('timeline-snare')[i].classList.toggle('snare-active');
            });


        }(i));
    }
}

function clapPlay() {
    for (var i = 0; i < document.getElementsByClassName('timeline-clap').length; i++) {
        (function (i) {

            document.getElementsByClassName('timeline-clap')[i].addEventListener('click', function () {
                document.getElementsByClassName('timeline-clap')[i].classList.toggle('clap-active');
            });


        }(i));
    }
}

function cowbellPlay() {
    for (var i = 0; i < document.getElementsByClassName('timeline-cowbell').length; i++) {
        (function (i) {

            document.getElementsByClassName('timeline-cowbell')[i].addEventListener('click', function () {
                document.getElementsByClassName('timeline-cowbell')[i].classList.toggle('cowbell-active');
            });


        }(i));
    }
}





//Main Loop
kickPlay();
snarePlay();
clapPlay();
cowbellPlay();