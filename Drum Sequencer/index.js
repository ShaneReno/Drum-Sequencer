var myInterval;

function loopingFunction(stopFlag) {

    var indexLength = document.getElementsByClassName('time').length;
    for (var i = 0; i < indexLength; i++) {


        (function (i) {


            setTimeout(function () {
                document.getElementsByClassName('time')[i].classList.add('timeActive');
                if (i === 0) {
                    document.getElementsByClassName('time')[indexLength - 1].classList.remove('timeActive');
                }
                else {
                    document.getElementsByClassName('time')[i - 1].classList.remove('timeActive');
                }

                console.log("TimeActive added " + i);
            }, 500 * i);

        }(i));

    }
}





document.getElementsByClassName('startBtn')[0].addEventListener('click', function () {

    loopingFunction();
    myInterval = setInterval(loopingFunction, 500 * document.getElementsByClassName('time').length);
    document.getElementsByClassName('startBtn')[0].disabled = true;
    document.getElementsByClassName('stopBtn')[0].disabled = false;

});


document.getElementsByClassName('stopBtn')[0].addEventListener('click', function () {
    clearInterval(myInterval);

    setInterval(function () {
        document.getElementsByClassName('sequenceBox')[7].classList.remove('timeActive');
    }, 500);


    document.getElementsByClassName('stopBtn')[0].disabled = true;
    document.getElementsByClassName('startBtn')[0].disabled = false;

});

