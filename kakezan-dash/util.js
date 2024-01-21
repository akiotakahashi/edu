function onFullScreenChanged() {
    let fs = document.getElementById("fullscreen");
    let se = document.getElementById("safari_escape");
    if (fs.checked) {
        let target = document.documentElement;
        if(document.fullscreenEnabled) {
            target.requestFullscreen();
        } else if(document.webkitFullscreenEnabled) {
            target.webkitRequestFullscreen();
        } else {
            alert('未対応のブラウザです');
            return false;
        }
        se.hidden = false;
    }
    else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else {
            return false;
        }
        se.hidden = true;
    }
}

function onMouseDown(e) {
    if (e.button != 0) { return; }
    nextSequence();
}

function init(questions) {
    updateQuestions();
    hideStopwatch();
    setStatus("");
    startSequence(questions);
}
