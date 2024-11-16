var questions = [];
var n_asked = 0;
var n_solved = -1;

var n_timer = null;
var start_time = null;

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

function setStatus(text) {
    let status = document.getElementById('status');
    status.innerText = text;
}

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

function updateQuestion(prefix, ix, predicate) {
    let div = document.getElementById(prefix);
    if (ix < 0 || ix >= questions.length) {
        div.classList.add("invisible");
        return;
    }
    let op1 = document.getElementById(prefix + "_op");
    let q = questions[ix];
    if (predicate === undefined) {
        predicate = function (x) { return x.replace("!", ""); }
    }
    op1.innerHTML = predicate(q[0]);
    if (div.classList.contains("invisible")) {
        div.classList.remove("invisible");
    }
}

function updateQuestions() {
    if (n_solved == n_asked) {
        updateQuestion("c", 999);
        updateQuestion("n", 999);
    }
    else {
        updateQuestion("c", n_asked - 1, function (x) {
            return x.replace(/(.)!/g, "〇");
        });
        updateQuestion("n", n_asked);
    }
    updateQuestion("a", n_solved - 1);
    //
    let num = document.getElementById('num');
    if (n_asked <= 0) {
        num.innerText = "";
    }
    else if (n_asked == n_solved) {
        num.innerText = n_asked + "問完了";
    }
    else {
        num.innerText = n_asked + "問目";
    }
    if (n_solved > 0) {
        let ans = document.getElementById("a_ans");
        let q = questions[n_solved - 1];
        ans.innerHTML = q[1];
    }
}

function startSequence(orderedQuestions) {
    if (orderedQuestions !== undefined) {
        questions = orderedQuestions;
    }
    fisherYatesShuffle(questions);
    n_asked = 0;
    n_solved = -1;
    updateQuestions();
    hideStopwatch();
    setStatus("クリックするとはじまります（全" + questions.length + "問）");
}

function nextSequence() {
    if (questions.length == 0) {
        return;
    }
    if (n_asked < questions.length) {
        n_asked++;
    }
    if (n_solved < questions.length) {
        n_solved++;
    }
    if (n_asked == 1) {
        startStopwatch();
        setStatus("");
    }
    if (n_solved == questions.length) {
        stopStopwatch();
    }
    updateQuestions();
}
