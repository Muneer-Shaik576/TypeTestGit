let spinner = document.getElementById("spinner");
let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let containerEl = document.getElementById("containerE1");
let uniqueId ;

quoteDisplay.addEventListener("selectstart", function(e) {
    e.preventDefault(); // Prevent text selection
});

quoteDisplay.addEventListener("contextmenu", function(e) {
    e.preventDefault(); // Prevent right-click context menu (copy/paste)
});

document.addEventListener("keydown", function(e) {
    // Prevent "Control + C" from copying text
    if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
    }
});

function adjustTextareaSize() {
    const textarea = document.getElementById('quoteInput');
    const screenHeight = window.innerHeight;
    const textareaHeight = screenHeight * 0.3; // You can adjust the percentage as needed
    textarea.style.height = textareaHeight + 'px';
}

adjustTextareaSize();

function makeHttpRequestMethod() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            speedTypingTest.classList.remove("d-none");
            containerEl.classList.add("main");
            containerEl.classList.remove("speed-type-container-2");
            spinner.classList.add("d-none");
            return response.json();
        })
        .then(function(jsonObj) {
            console.log(jsonObj);
            let {
                content
            } = jsonObj;
            quoteDisplay.textContent = content;
        });
}

makeHttpRequestMethod();
timer.textContent = 0;
uniqueId = setInterval(function() {
    timer.textContent = parseInt(timer.textContent) + 1;
}, 1000);

submitBtn.addEventListener("click", function() {
    let userEnteredText = quoteInput.value;
    const array=quoteDisplay.textContent.split(" ")
    let r=(array.length/timer.textContent)*60
    if (userEnteredText === quoteDisplay.textContent) {
        result.textContent = "You typed in "+array.length+" words in " + timer.textContent + " seconds Your Score is "+parseInt(r)+"Wpm";
        clearInterval(uniqueId);
    } else {
        result.textContent = "You typed incorrect sentence";
        clearInterval(uniqueId);
        uniqueId = setInterval(function() {
            timer.textContent = parseInt(timer.textContent) + 1;
        }, 1000);
    }
});

resetBtn.addEventListener("click", function() {
    result.textContent = "";
    quoteInput.value = "";
    clearInterval(uniqueId);
    timer.textContent = 0;

    speedTypingTest.classList.add("d-none");
    containerEl.classList.remove("speed-type-container");
    containerEl.classList.add("speed-type-container-2");
    spinner.classList.remove("d-none");

    makeHttpRequestMethod();
    uniqueId = setInterval(function() {
        timer.textContent = parseInt(timer.textContent) + 1;
    }, 1000);
});
