// JavaScript programmable drum sequencer with effects and parameters.
//@Shane Reynolds
//====================================================================


var myInterval;

// Error handling for metronome range input
document.getElementById('bpm').addEventListener('change', function (e) {
    if (document.getElementById('bpm').value == '') {
        e.target.value = 60;
    }
    else if (document.getElementById('bpm').value < 60) {
        e.target.value = 60;
    }
    else if (document.getElementById('bpm').value > 160) {
        e.target.value = 160;
    }
})


// The main looping function that performs the iterative logic, sweeping from first beat in the timeline to the last beat, before returning back.
function loopingFunction() {
    // The beats per minute is determined by dividing 60,000 (60,000 ms in a minute) into the value of the bpm number input
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
                // Get value of the range input for each instrument, and apply it to the volume of said instrument.
                for (var j = 0; j <= 3; j++) {
                    var vol = document.getElementsByClassName('form-range')[j].value;
                    document.getElementsByClassName('form-range')[j].style.backgroundSize = vol + '% 100%';
                }
                var kickVol = document.getElementsByClassName('kickVol')[0].value / 100;
                kick.volume = kickVol;

                var snareVol = document.getElementsByClassName('snareVol')[0].value / 100;
                snare.volume = snareVol;

                var clapVol = document.getElementsByClassName('clapVol')[0].value / 100;
                clap.volume = clapVol;

                var cowbellVol = document.getElementsByClassName('cowbellVol')[0].value / 100;
                cowbell.volume = cowbellVol;

                // Perform beat/bar ratio calculation and display.
                var beatCount = i % 4 + 1;
                var barCount = Math.ceil((i + 1) / 4);
                document.getElementsByClassName('barCount')[0].innerHTML = beatCount + '/' + barCount;

                // If metronome checkbox is checked, play the new bar metronome tick on the first and fifth bars, or the regular metronome tick.
                if (metronomeCheck.checked) {
                    if (i % 4 === 0) {
                        newBarMetronome.play();
                    }
                    else {
                        metronome.play();
                    }
                }


                document.getElementsByClassName('time')[i].classList.add('timeActive');
                //Playing instruments - if a block on the instruments channel is pressed, pla the note when the sequencer timeline arrives.
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


            }, bpm * i); // Correct beats per minute.

        }(i));

    }
}




// Event listener anonymous function for beginning the looping function.
document.getElementsByClassName('startBtn')[0].addEventListener('click', function () {
    var bpm = 60000 / (document.getElementById('bpm').value);

    var playBtnAudio = new Audio('./audio/play-btn-audio.mp3'); // Cassette on click.
    playBtnAudio.play();

    loopingFunction();
    myInterval = setInterval(loopingFunction, bpm * document.getElementsByClassName('time').length);

    //Error handling to ensure that the user cannot press the start button again once the start button has been pressed. This causes duplicate errors.
    document.getElementsByClassName('startBtn')[0].disabled = true;
    document.getElementsByClassName('stopBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = true;

});

// Event listener anonymous function for stopping the looping function.
document.getElementsByClassName('stopBtn')[0].addEventListener('click', function () {
    clearInterval(myInterval);
    var bpm = 60000 / (document.getElementById('bpm').value);
    var stopBtnAudio = new Audio('./audio/stop-btn-audio.mp3'); // Cassette off click.
    stopBtnAudio.play();
    setInterval(function () {
        document.getElementsByClassName('sequenceBox')[7].classList.remove('timeActive');
    }, bpm);


    document.getElementsByClassName('stopBtn')[0].disabled = true;
    document.getElementsByClassName('startBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = false;

});



// Functions for all four drum instruments - once called, they turn an instrument channel block to active (turned on orange)

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


// Calling the event listener functions for drawing the notes on the timeline. 
kickPlay();
snarePlay();
clapPlay();
cowbellPlay();

