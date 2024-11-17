var questions = [];
var n_asked = 0;
var n_solved = -1;

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
