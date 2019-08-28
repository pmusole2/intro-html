/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//All Variables
var scores, roundScore, activePlayer, gamePlaying, prevRoll, setLevel;

init()

// Code for setting winning level;
document.querySelector('.fa-sign-in-alt').addEventListener('click', () => {
    if(document.querySelector('#setLevel').value >= 30){
        setLevel = document.querySelector('#setLevel').value;
    } else {
        alert('Enter a Number above 30 to begin the game!!');
    }
});



//Event Listener for Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(setLevel >= 30 ){
        if(gamePlaying){
            //1. need a random number
            var dice = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1; // Generate random number for Dice 2
            prevRoll = dice;

            //2. Display the result
            var diceDom = document.querySelector('.dice')
            var diceDom = document.querySelector('.dice-2') // Added for dice 2
            diceDom.style.display = 'block';
            diceDom.style.display = 'block'; // To show dice 2 in the UI with the correctly rolled number
            diceDom.src = 'dice-' + dice + '.png';
            diceDom.src = 'dice-' + dice + '.png'; //To roll the correct dice same as the random number Generated for Dice 2

            //3. Update round score only if the rolled number wasn't a 1

            if(dice !== 1 && dice2 != 1){
                //Add score
                roundScore += (dice + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

                // Coding Challenge / If player rolls two 6 in a row;
                /* if(prevRoll == 6 && dice == 6){
                    roundScore = 0;
                    scores[activePlayer] = roundScore;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                    document.querySelector('#score-' + activePlayer).textContent = '0';

                } */
                } else {
                //Next player
                nextPlayer();
            } 
        }
    } else {
        alert('Please enter a winning level number above 30 to begin the game!!!');
        return;  
    }  
});

//Event Listener for Hold Button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. Add Current score to players global score
        scores[activePlayer] += roundScore;
        
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //3. check if player won the game
        if(scores[activePlayer] >= setLevel){
            // Update the UI and end game
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
            document.querySelector('.dice').style.display = 'none'; // Hide Dice 1 if game has ended
            document.querySelector('.dice-2').style.display = 'none'; // Hide dice 2 if the game has ended
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            } else {
            //Continue
            nextPlayer();
        }
    }  
});

// Event Listener for New Button
document.querySelector('.btn-new').addEventListener('click', init);

//Function to avoid reusing code

function nextPlayer(){
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Updating UI after player has rolled a 1
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    // Changing the Player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Removing the dice
    document.querySelector('.dice').style.display =  'none';
    document.querySelector('.dice-2').style.display = 'none'; // Hide Dice 2
}

//Init Function 
function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //Checking the level to begin with

    document.querySelector('.dice').style.display =  'none';
    document.querySelector('.dice-2').style.display = 'none'; // Hide Dice 2

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/* Game rules Modal */

/* To open the modal */
document.querySelector('#game-rules').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block';
});

/* To close the modal */
document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

/* Close modal if any other part of the screen is clicked */

window.addEventListener('click', (event) => {
    if(event.target == document.querySelector('.modal')){
        document.querySelector('.modal').style.display = 'none';
    }
});

//document.querySelector('#current-' + activePlayer).textContent = diceDom;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
