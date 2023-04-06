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
    var indexLength = document.getElementsByClassName('time').length;
    for (var i = 0; i < indexLength; i++) {
        //console.log(" bpm is " + bpm);


        (function (i) {


            setTimeout(function () {
                document.getElementsByClassName('time')[i].classList.add('timeActive');
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

    loopingFunction();
    myInterval = setInterval(loopingFunction, bpm * document.getElementsByClassName('time').length);
    document.getElementsByClassName('startBtn')[0].disabled = true;
    document.getElementsByClassName('stopBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = true;

});


document.getElementsByClassName('stopBtn')[0].addEventListener('click', function () {
    clearInterval(myInterval);
    var bpm = 60000 / (document.getElementById('bpm').value);
    setInterval(function () {
        document.getElementsByClassName('sequenceBox')[7].classList.remove('timeActive');
    }, bpm);


    document.getElementsByClassName('stopBtn')[0].disabled = true;
    document.getElementsByClassName('startBtn')[0].disabled = false;
    document.getElementById('bpm').disabled = false;

});

