var placeInDeck = 0;
var playerCards = [];
var dealerCards = [];
var deck = [];
var isBust = 0;
var winTotal = 0;
var gameIsOver = false;
const dealerBust = 2;
const playerBust = 1;
var wager = 0;


function deal(){


	resetGame();
	//initialize spaces
	
	wager = prompt("Enter a Wager");
	

	// Store Cards for later reference
	playerCards[0] = deck[0];
	playerCards[1] = deck[2];
	dealerCards[0] = deck[1];
	dealerCards[1] = deck[3];

	// Place cards on play area
	sleep(300);
	placeCard(deck[0],'player', 1);
	placeCard(deck[1],'dealer', 1);
	placeCard(deck[2],'player', 2);
	placeCard(deck[3],'dealer', 2);

	

	placeInDeck = 4

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function clearSpace(cardSpace){
	cardSpace.addClass('empty');
	cardSpace.html('-');
}

function placeCard(card, who, slot){
	// A delay to make the game more dramatic
	

	//gets element that we are placing a card in
	currentSpace = $("#" + who + "-card-space" + slot)
	if(card.match(/\d+/) == "13"){
		card =  "K" + card[2];
	}else if(card.match(/\d+/) == "12"){
		card = "Q" + card[2];
	}else if(card.match(/\d+/) == "11"){
		card = "J" + card[2];
	}else if(card.match(/\d+/) == "1"){
		card = "A" + card[1];
	}
	currentSpace.html(card);
	currentSpace.removeClass("empty");
	calculateTotals();
}


function shuffleDeck(){

	var deck = [];
	// fill our deck in order (for now)
	//suit loop
	var suit = "";
	for(s=1; s<=4; s++){
		if(s === 1){
			suit = "h";
		}
		else if(s === 2){
			suit = "s";
		}
		else if(s === 3){
			suit = "d";
		}
		else if(s === 4){
			suit = "c";
		}
		//card number loop
		for(i=1; i<=13; i++){
			deck.push(i+suit);
		}
	}
	// console.log(deck);

	var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	// Shuffle the deck
	for(i = 0; i< numberOfTimesToShuffle; i++){
		//  pick two random cards from the deck, and switch them.
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}

	console.log(deck);

	return deck;
}

function calculateTotals (){
	var playerTotal = 0;
	var dealerTotal = 0;
	var numPlayerAces = 0;
	var numDealerAces = 0;

	// Calculate hand value for player
	for( i =0; i < playerCards.length; i++){
		cardValue = Number(playerCards[i].match(/\d+/))
		if(cardValue > 10){
			cardValue = 10;
		}else if(cardValue === 1){
			cardValue = 11;
			numPlayerAces++;
		}
		playerTotal += cardValue;
	}

// Calculate hand value for dealer

	for( i =0; i < dealerCards.length; i++){
		cardValue = Number(dealerCards[i].match(/\d+/))
		if(cardValue > 10){
			cardValue = 10;
		}else if(cardValue === 1){
			numDealerAces++;
			cardValue = 11;
		}
		dealerTotal += cardValue;
	}


	// Handle Aces being 1 or 11
	while(numPlayerAces > 0 && playerTotal > 21 ){
		numPlayerAces--;
		playerTotal -= 10;
	}
	while(numDealerAces > 0 && dealerTotal > 21 ){
		numDealerAces --;
		dealerTotal -= 10;
	}

	$("#player-total").html(playerTotal);
	$("#dealer-total").html(dealerTotal);

	
	if( playerTotal > 21 ){
		bust("player");
	}else if( dealerTotal > 21 ){
		bust("dealer");
	}
}

function getDealerTotal(){
	return Number($("#dealer-total").innerHTML)
}

function getPlayerTotal(){
	return Number($("#player-total").innerHTML)
}

function stand(){
	while( getDealerTotal() < 17 ) {
		dealerCards.push(deck[placeInDeck]);
		sleep(300);
		placeCard(deck[placeInDeck++], "dealer", dealerCards.length);
	}
	if(!isBust && !gameIsOver){
		if(getPlayerTotal() > getDealerTotal()){
			sendMessage("You Won!");
			endGame("win");
		}else if(getPlayerTotal() === getDealerTotal()){
			sendMessage("You Tied.");
			endGame("tie");
		}else{
			sendMessage("You Lost!");
			endGame("loss");
		}
	}
}

function sendMessage(message){
	$("#message").html(message);
}

function updateWins(){
	$("#win-count").html(winTotal);
}

function bust(who) {
	if(who === "player"){
		//player lost and dealer won
		sendMessage("You have busted. Hit Deal to play again.");
		isBust = playerBust;
		endGame("loss");

	}else{
		sendMessage("The Dealer busted! You Win! Hit Deal to play again.");
		isBust = dealerBust;
		endGame("win");
	}
}

function endGame(winOrLoss){
	if(winOrLoss === "win"){
		winTotal += Number(wager);
	}else if(winOrLoss === "loss"){
		winTotal -= Number(wager);
	}
	gameIsOver = true;
	updateWins();

}

function resetGame(){
	if(!gameIsOver){
		endGame("loss");
	}
	placeinDeck = 0;
	playerCards = [];
	dealerCards = [];
	isBust = 0;
	sendMessage("");
	gameIsOver = false;
	deck = shuffleDeck();
	$("#player-total").html(0);
	$("#dealer-total").html(0);
	sendMessage('');
	var cardSpaces = $(".card");
	for(i = 0; i < cardSpaces.length; i++){
		clearSpace(cardSpaces[i]);
	}
}

function hit(){
	if(!gameIsOver){
		if( isBust === playerBust){
			sendMessage("You already busted. Hit Deal to play again");
			return;
		}else{
			playerCards.push(deck[placeInDeck]);
			sleep(300);
			placeCard(deck[placeInDeck++],"player", playerCards.length);
		}
	}
}