/**
 * Set the information about your questions here. The correct answer string needs to match
 * the correct choice exactly, as it does string matching. (case sensitive)
 *
 */


var currentQuestion = 0;
var score = 0;
var askingQuestion = true;

function loadQuestion(quiz) {

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
    if (currentQuestion == 0) {
        document.getElementById('score').innerHTML = '<p>Score: 0 right answers out of ' + quiz.length + ' possible</p>';
    }
}

function checkAnswer() {

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
            if (radios[i].value == quiz[currentQuestion]["correct"]) {
                correctIndex = i;
            }
        }

        //set the color if they got it right, or wrong
        if (userpick == quiz[currentQuestion]["correct"]) {
            score++;
            document.getElementsByTagName('label')[correctIndex].style.color = "green";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h3>Correct!</h3>";
        } else {
            document.getElementsByTagName('label')[correctIndex].style.color = "red";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h3>Incorrect</h3>";
        }

        document.getElementById('explanation').innerHTML += '<p>' + quiz[currentQuestion]["explanation"] + '</p>';
        document.getElementById('score').innerHTML = '<p>score: ' + score + ' right answers out of ' + quiz.length + ' possible</p>';


    } else { //reset form and move to next question

        //setting up so user can ask a question
        askingQuestion = true;

        //change button text back to 'submit answer'
        document.getElementById('check').innerHTML = 'Submit Answer';

        document.getElementById('explanation').innerHTML = "";

        //if we're not on last question, increase question number
        if (currentQuestion < quiz.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showFinalResults();
        }

    }
}

function showFinalResults() {

    document.getElementById('content').innerHTML = '<h2>You Completed The Quiz</h2>';
    document.getElementById('content').innerHTML += '<p>Below are your results:</p>';
    document.getElementById('content').innerHTML += '<h2>' + score + ' out of ' + quiz.length + ' questions, ' + Math.round(score / quiz.length * 100) + '%</h2>';

    //delete the button
    var button = document.getElementById('check');
    button.parentNode.removeChild(button); //js requires you to delete elements from the parent

    //remove question
    document.getElementById('question').innerHTML = "";

}
