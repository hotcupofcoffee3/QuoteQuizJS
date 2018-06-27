/*** Set up Quote Quiz HTML ***/

	function startQuoteQuiz(){
		setCurrentQuote();
	}

/*** Quotes and Authors ***/

	//  Quote constructor function and array of "Quote" object literals
		function Quotes(author, quote) {
			this.author = author;
			this.quote = quote;
		};

	// Quotes
		var quotes = [
			new Quotes("Bertrand Russell", "\"The whole problem with the world is that fools and fanatics are always so certain of themselves, and wiser people so full of doubts.\""),
			new Quotes("Dr. Seuss", "\"Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.\""),
			new Quotes("Albert Einstein", "\"Insanity: doing the same thing over and over again and expecting different results.\""),
			new Quotes("Albert Einstein", "\"If you can't explain it to a six year old, you don't understand it yourself.\""),
			new Quotes("Albert Einstein", "\"Peace cannot be kept by force; it can only be achieved by understanding.\""),
			new Quotes("Albert Einstein", "\"Strive not to be a success, but rather to be of value.\""),
			new Quotes("Karl Pilkington", "\"If you don\'t have a plan, you can end up doing some interesting things.\""),
			new Quotes("Ricky Gervais", "\"Comedy is an intellectual pursuit.\""),
			new Quotes("Ricky Gervais", "\"I know I ruffle feathers but some people\'s feathers need a little ruffling.\""),
			new Quotes("Ricky Gervais", "\"Beliefs don\'t change facts. Facts, if you\'re reasonable, should change your beliefs.\""),
			new Quotes("Chinese Proverb", "\"The best time to plant a tree was 20 years ago. The second best time is now.\""),
			new Quotes("Socrates", "\"An unexamined life is not worth living.\""),
			new Quotes("Vincent Van Gogh", "\"If you hear a voice within you say \'you cannot paint,\' then by all means paint and that voice will be silenced.\""),
			new Quotes("Aristotle", "\"There is only one way to avoid criticism: do nothing, say nothing, and be nothing.\""),
			new Quotes("Ralph Waldo Emerson", "\"The only person you are destined to become is the person you decide to be.\"")
		];

	// Creates "authors" array from "quotes" array.
		function createAuthorsArray(){
			let authorsArray = [];
			for (quoteIndex in quotes){
				if (authorsArray.includes(quotes[quoteIndex].author)){
						continue;
				} else {
					authorsArray.push(quotes[quoteIndex].author);
				}
			}
			return authorsArray;
		}

		let authors = createAuthorsArray();

/*** Set Random Quote and Choices ***/

	//  Random number generator based on total number of items in array.
		function randomIndexNumberFrom(thisArray) {
			return Math.floor(Math.random() * thisArray.length);
		}

	// Generates random choices array
		function populateChoicesArray(withThisCurrentQuoteNumber){
			let choicesArray = [];

			// Current quote's author
			choicesArray.push(quotes[withThisCurrentQuoteNumber].author);

			// Adds 2 more random authors to "choicesArray".
			for(i = 0; i < 2; i++){
				let currentAuthorIndex = randomIndexNumberFrom(authors);

				// Makes sure "choicesArray" does not include the author already.
				while(choicesArray.includes(authors[currentAuthorIndex])){
					currentAuthorIndex = randomIndexNumberFrom(authors);
				}
				choicesArray.push(authors[currentAuthorIndex]);
			}
			return choicesArray;
		}

	// Generates choice list as an HTML String
		function createChoiceListFrom(thisArray){
			let choiceList = "";
			for(i = 0; i < 3; i++){
				let randomChoiceIndex = randomIndexNumberFrom(thisArray);
				choiceList += "<li id='choice" + i + "' onclick='submitAnswer(this);'>"  + thisArray[randomChoiceIndex] + "</li>";
				// Removes array item at "randomChoiceIndex" index
				thisArray.splice(randomChoiceIndex, 1);
			}
			return choiceList;
		}

/*** Submit Answer ***/

	// Submits answer for evaluation.
		function submitAnswer(choice) {

			for(i = 0; i < 3; i++){
				document.getElementById("choice" + i).attributes[1].value = "";
				document.getElementById("choice" + i).style.cursor = "default";
			}

			tries++;

			if(choice.innerHTML == quotes[currentQuoteNumber].author){
				score++;
				choice.style.backgroundColor = "rgba(24,151,28,1)";
				document.getElementById("results").innerHTML = "Correct! You're now " + score + " for " + tries + "!";
			} else {
				document.getElementById("results").innerHTML = "Nope! You're now " + score + " for " + tries + "!";
				choice.style.backgroundColor = "rgba(157,22,26,1)";
			}
			// Removes quote and places in a "used" array for later retrieval.
			setTimeout(goToNextQuote,500);
		}

/*** Remove and Refill Quote Arrays ***/

	// Removes quote into used array
		function removeQuoteAndPutIntoUsedArrayFrom(thisQuoteNumber){
			// Pushes the just-used quote into "usedQuotes" as a "new Object".
				usedQuotes.push(quotes[thisQuoteNumber]);
			// Removes the just-used quote from "quotes".
				quotes.splice(thisQuoteNumber, 1);
		}

	// Put back all quotes from used array into quotes array.
		function emptyUsedQuoteArrayAndRefillQuoteArray(){
			while (usedQuotes.length > 0){
				quotes.push(usedQuotes.pop());
			}
		}

/*** Set Current and Next Quote ***/

	//  Various variable declarations.
		var tries = 0;
		var score = 0;
		var currentQuoteNumber;
		var usedQuotes = [];

	//  Populates HTML with Current Quote.
		function setCurrentQuote() {
			// Current quote index number
				currentQuoteNumber = randomIndexNumberFrom(quotes);
			// The Quote
				document.getElementById("quote").innerHTML = quotes[currentQuoteNumber].quote;
			// The Choices Array
				let choices = populateChoicesArray(currentQuoteNumber);
			// Prints the whole of the "choiceList" string to the "choices" unordered list element.
				document.getElementById("choices").innerHTML = createChoiceListFrom(choices);
		}

	// Removes quote and places in a "used" array for later repopulation (so no quote gets used twice in a quiz).
		function goToNextQuote() {

			removeQuoteAndPutIntoUsedArrayFrom(currentQuoteNumber);

			// If 10 quotes have been shown, the quiz is over.
				if(usedQuotes.length === 10){

					emptyUsedQuoteArrayAndRefillQuoteArray();

					document.getElementById("results").innerHTML = "";
					document.getElementById("choices").innerHTML = "<div id='playAgain' onclick='setCurrentQuote();'>Go Again?</div>";
					document.getElementById("quote").innerHTML = "<div id='finalScore'>Final Score: <br><br>" + score + " out of " + tries + "!</div>";

					tries = 0;
					score = 0;

				} else {
					setCurrentQuote();
				}
		}

		startQuoteQuiz();
