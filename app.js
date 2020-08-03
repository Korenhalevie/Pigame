/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, lastDiceWasSix;


// buttom new game
document.querySelector('.btn-new').addEventListener('click', init)
document.querySelector('.btn-roll').addEventListener('click', function(){
   if (gamePlaying){
    // 1. random number
    var dice = Math.floor(Math.random() * 6) +1;

    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display= 'block';
    diceDOM.src = 'dice-' + dice + '.png'

    //3. update the round score IF the called number was NOT a 1
    if (dice === 6) {
        if (lastDiceWasSix) {
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            nextPlayer();
        } else {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDiceWasSix = true;
        }
        
    } else if (dice !== 1 ){
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
  }
});

// hold buttom
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    scores[activePlayer] += roundScore; // calculating the score
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; // update the player score 
    var input = document.querySelector('.final-score').value;
    if(input){
        var winningScore = input;    
    }
    else {
        winningScore = 100;
    }
    
        if (scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'winner!';
        hideDice();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        //document.querySelector('.btn-roll').style.display = 'none'
        //document.querySelector('.btn-hold').style.display = 'none'
        gamePlaying = false;
    }   else {
        nextPlayer(); //next player
    }
 } 
});


/*************************** 
        Functions
***************************/


// NEXT TURN
function nextPlayer(){
    dice = null;
    lastDiceWasSix = false;
    roundScore = 0; 
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
};

// INITIATE THE GAME
function init (){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    console.log(document.querySelector('.btn-roll'));
    document.querySelector('.btn-roll').style.display = 'block'
    document.querySelector('.btn-hold').style.display = 'block'
    hideDice();
    gamePlaying = true;

     
}
 
// HIDE THE DICE
function hideDice(){
    document.querySelector('.dice').style.display = 'none'
};

hideDice();




