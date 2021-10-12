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
    var shuffledArray = shuffle(quiz[currentQuestion]["choices"])
    for (var i = 0; i < shuffledArray.length; i++) {

        radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = shuffledArray[i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = shuffledArray[i];

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
        document.getElementById('score').innerHTML = '<p>Score: 0 right answers out of ' + quiz.length + ' possible</p>';
    }
}

function shuffle(array) {
    const clone = []
    for (i = 0; i < array.length; i++) {
        clone[i] = array[i]
    }

    let currentIndex = clone.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [clone[currentIndex], clone[randomIndex]] = [
            clone[randomIndex], clone[currentIndex]];
    }

    return clone;
}

function checkAnswer(quiz) {
    console.log('checking answer')

    //are we asking a question, or proceeding to next question?
    if (askingQuestion) {

        //change button text to next question, so next time they click it, it goes to next question
        document.getElementById('check').innerHTML = 'Next';
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
            if (radios[i].value === quiz[currentQuestion]["choices"][quiz[currentQuestion]["choices"].length - 1]) {
                correctIndex = i;
            }
        }

        //set the color if they got it right, or wrong
        if (userpick === quiz[currentQuestion]["choices"][quiz[currentQuestion]["choices"].length - 1]) {
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


    if (document.getElementById('card').classList.contains('wrong_answer')) {
        document.getElementById('card').classList.remove('wrong_answer')
    }

    if (document.getElementById('card').classList.contains('correct_answer')) {
        document.getElementById('card').classList.remove('correct_answer')
    }

    document.getElementById('content').innerHTML = '<h5>You\'re Done!</h5>';
    document.getElementById('content').innerHTML += '<p>Click next to go to other 2ts like this one</p>';
    //delete the button
    const button = document.getElementById('check');
    button.parentNode.removeChild(button); //js requires you to delete elements from the parent


    var elem = document.getElementById("actions");
    elem.innerHTML = "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" id=\"check\"\n" +
        "               href='https://webdesign.eastsideprep.org/~dyezbick/twotruths/index.html'>\n" +
        "                Go ->" +
        "            </a>\n"
    elem = document.getElementById("question");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("score");
    elem.parentNode.removeChild(elem);
}

function createQuiz(quiz) {
    console.log("creating quiz");
    document.getElementById('quiz').innerHTML = "<div id=\"card\" class=\"demo-card-wide mdl-card mdl-shadow--2dp\">\n" +
        "        <div class=\"mdl-card__supporting-text\">\n" +
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
