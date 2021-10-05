var currentQuestion = 0;
var score = 0;
var askingQuestion = true;

function loadQuestion(quiz) {
    console.log('loading next question')

    if (document.getElementById('card').classList.contains('wrong_answer')) {
        document.getElementById('card').classList.remove('wrong_answer')
    }

    if (document.getElementById('card').classList.contains('correct_answer')) {
        document.getElementById('card').classList.remove('correct_answer')
    }


    //set temporary variable for creating radio buttons
    var radioButton;

    //clear out radio buttons from previous question
    document.getElementById('content').innerHTML = "";

    //loop through choices, and create radio buttons
    for (var i = 0; i < quiz[currentQuestion]["choices"].length; i++) {

        radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = quiz[currentQuestion]["choices"][i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = quiz[currentQuestion]["choices"][i];

        //create a <br> tag to separate options
        var br = document.createElement('br');

        //attach them to content. Attach br tag, then label, then radio button
        document.getElementById('content').insertAdjacentElement("afterbegin", br);
        document.getElementById('content').insertBefore(label, br);
        document.getElementById('content').insertBefore(radioButton, label);
    }

    //load the question
    document.getElementById('question').innerHTML = quiz[currentQuestion]["question"];

    //setup score for first time
    if (currentQuestion === 0) {
        document.getElementById('score').innerHTML = '<p>score: 0 right answers out of ' + quiz.length + ' possible</p>';
    }
}

function checkAnswer(quiz) {
    console.log('checking answer')

    //are we asking a question, or proceeding to next question?
    if (askingQuestion) {

        //change button text to next question, so next time they click it, it goes to next question
        document.getElementById('check').innerHTML = 'Next Question';
        askingQuestion = false;

        //determine which radio button they clicked
        var userpick;
        var correctIndex;
        var radios = document.getElementsByName('quiz');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { //if this radio button is checked
                userpick = radios[i].value;
            }
            //get index of correct answer
            if (radios[i].value === quiz[currentQuestion]["correct"]) {
                correctIndex = i;
            }
        }

        //set the color if they got it right, or wrong
        if (userpick === quiz[currentQuestion]["correct"]) {
            score++;
            document.getElementsByTagName('label')[correctIndex].style.color = "green";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h5>Correct!</h5>";

            document.getElementById('card').classList.add('correct_answer')
        } else {
            document.getElementsByTagName('label')[correctIndex].style.color = "red";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h5>Incorrect</h5>";

            document.getElementById('card').classList.add('wrong_answer')
        }

        document.getElementById('explanation').innerHTML += `<p> ${quiz[currentQuestion]["explanation"]} </p>`;
        document.getElementById('score').innerHTML = `<p>Score: ${score} right answers out of ${quiz.length} possible</p>`;


    } else { //reset form and move to next question

        //setting up so user can ask a question
        askingQuestion = true;

        //change button text back to 'submit answer'
        document.getElementById('check').innerHTML = 'Submit Answer';

        document.getElementById('explanation').innerHTML = "";

        //if we're not on last question, increase question number
        if (currentQuestion < quiz.length - 1) {
            currentQuestion++;
            loadQuestion(quiz);
        } else {
            showFinalResults();
        }

    }
}

function showFinalResults() {
    console.log('showing final results')

    document.getElementById('content').innerHTML = '<h5>You Completed The Quiz</h5>';
    document.getElementById('content').innerHTML += '<p>Below are your results:</p>';
    document.getElementById('content').innerHTML += '<h5>' + score + ' out of ' + quiz.length + ' questions, ' + Math.round(score / quiz.length * 100) + '%</h5>';

    //delete the button
    const button = document.getElementById('check');
    button.parentNode.removeChild(button); //js requires you to delete elements from the parent


    var elem = document.getElementById("actions");
    elem.innerHTML = "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" id=\"check\"\n" +
        "               onclick=\"restart(quiz)\">\n" +
        "                Restart Quiz\n" +
        "            </a>\n"
    elem = document.getElementById("question");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("score");
    elem.parentNode.removeChild(elem);
}

function createQuiz(quiz) {
    console.log("creating quiz");
    document.getElementById('quiz').innerHTML = "<div id=\"card\" class=\"demo-card-wide mdl-card mdl-shadow--2dp\">\n" +
        "        <div class=\"mdl-card__title\">\n" +
        "            <h2 class=\"mdl-card__title-text\">Quiz!!!</h2>\n" +
        "        </div>\n" +
        "        <div class=\"mdl-card__supporting-text\">\n" +
        "            <div id=\"score\"><p>Score: 0 right answers out of 0 possible</p></div>\n" +
        "            <h5 id=\"question\">Question here</h5>\n" +
        "\n" +
        "            <div id=\"content\">\n" +
        "            </div>\n" +
        "\n" +
        "            <div id=\"response\">\n" +
        "                <div id=\"explanation\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div id=\"actions\" class=\"mdl-card__actions mdl-card--border\">\n" +
        "            <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" id=\"check\"\n" +
        "               onclick=\"checkAnswer(quiz)\">\n" +
        "                Submit Answer\n" +
        "            </a>\n" +
        "        </div>\n" +
        "    </div>"

    loadQuestion(quiz);
}

function restart(quiz) {
    document.getElementById('quiz').innerHTML = "";
    currentQuestion = 0;
    score = 0;
    askingQuestion = true;
    createQuiz(quiz);
}
