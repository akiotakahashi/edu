var n_timer = null;
var start_time = null;

function onTimer() {
    let now = new Date();
    let dt = (now.getTime() - start_time.getTime()) / 1000;
    let min = document.getElementById('minutes');
    let sec = document.getElementById('seconds');
    min.innerText = Math.floor(dt / 60);
    sec.innerText = Math.floor(dt % 60);
}

function hideStopwatch() {
    let sw = document.getElementById('stopwatch');
    sw.hidden = true;
}

function stopStopwatch() {
    if (n_timer === null) {
        return;
    }
    clearInterval(n_timer);
    n_timer = null;
    let sw = document.getElementById('stopwatch');
    sw.classList.remove("running");
    sw.classList.add("fixed");
    sw.hidden = false;
}

function startStopwatch() {
    stopStopwatch();
    start_time = new Date();
    n_timer = window.setInterval(onTimer, 1000);
    let sw = document.getElementById('stopwatch');
    sw.classList.remove("fixed");
    sw.classList.add("running");
    sw.hidden = false;
    onTimer();
}
