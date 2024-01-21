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
    let op1 = document.getElementById(prefix + "_op1");
    let op2 = document.getElementById(prefix + "_op2");
    let q = questions[ix];
    if (predicate === undefined) {
        predicate = function (x) { return x; }
    }
    op1.innerText = predicate(q[0]);
    op2.innerText = predicate(q[1]);
    div.classList.remove("invisible");
}

function generateHint(a, b) {
    if (false) {
    }
    // 25x4の組み合わせ
    else if (a % 25 == 0 && b % 4 == 0) { return `(${a}x4)x${b/4}`; }
    else if (a % 4 == 0 && b % 25 == 0) { return `${a/4}x(4x${b})`; }
    // 15x4の組み合わせ
    else if (a % 15 == 0 && b % 4 == 0) { return `${a/15}x(15x4)x${b/4}`; }
    else if (a % 4 == 0 && b % 15 == 0) { return `${a/4}x(4x15)x${b/15}`; }
    // 15x2の組み合わせ
    else if (a % 15 == 0 && b % 2 == 0) { return `(${a}x2)x${b/2}`; }
    else if (a % 2 == 0 && b % 15 == 0) { return `${a/2}x(2x${b})`; }
    // 5x2の組み合わせ
    else if (a % 5 == 0 && b % 2 == 0) { return `(${a}x2)x${b/2}`; }
    else if (a % 2 == 0 && b % 5 == 0) { return `${a/2}x(2x${b})`; }
    // Nx5の組み合わせ
    else if (a % 5 == 0) { return `(${a/5}x${b})x10/2`; }
    else if (b % 5 == 0) { return `(${a}x${b/5})x10/2`; }
    // 素因数分解
    else {
        let A = primeDecomposition(a).join("x");
        let B = primeDecomposition(b).join("x");
        return A + " x " + B;
    }
}

function updateQuestions() {
    if (n_solved == n_asked) {
        updateQuestion("c", 999);
        updateQuestion("n", 999);
    }
    else {
        updateQuestion("c", n_asked - 1);
        updateQuestion("n", n_asked);
    }
    updateQuestion("a", n_solved - 1);
    //
    let hint = document.getElementById('h');
    if (n_asked < 1 || n_asked > questions.length || n_solved >= questions.length) {
        hint.classList.add("invisible");
    }
    else {
        let q = questions[n_asked - 1];
        var h_txt = q[2];
        if (h_txt === undefined) {
            h_txt = generateHint(q[0], q[1]);
        }
        hint.innerHTML = h_txt
            .replaceAll(/^1x|x1$|\/1$|x1x/g, "")
            .replaceAll("/", "<small>÷</small>")
            .replaceAll("x", "<small>×</small>");
        hint.classList.remove("invisible");
    }
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
        ans.innerText = q[0] * q[1];
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
