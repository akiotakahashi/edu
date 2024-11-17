
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomChoice(candidates) {
    return candidates[randomInt(0, candidates.length)];
}

function fisherYatesShuffle(arr) {
    for(let i = arr.length - 1 ; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function factorize(n) {
    let factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

function primeDecomposition(n, limit = 10) {
    let factors = [];
    for (let i = 2; i <= Math.min(n, limit); i++) {
        while (n % i == 0) {
            factors.push(i)
            n = n / i;
        }
    }
    if (n > 1) {
        factors.push(n);
    }
    return factors;
}

function decomposition(n) {
    let primes = [10,7,5,4,3,2];
    let factors = [];
    for (let ix in primes) {
        let p = primes[ix];
        while (n % p == 0) {
            factors.push(p);
            n = n / p;
        }
    }
    if (n > 1) {
        factors.push(n);
    }
    return factors.sort();
}

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

function setStatus(text) {
    let status = document.getElementById('status');
    status.innerText = text;
}

function init(questions) {
    updateQuestions();
    hideStopwatch();
    setStatus("");
    startSequence(questions);
}
