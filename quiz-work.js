$(function(){

	var allQuestions =[
	{question: "Aragorn's sword Anduril was formed from the shards of which other sword?",
		choices:["Excalibur", "Sting", "Narsil", "Glamdring"],
		correct: 2},
	{question: "How many rings were given to the 'Dwarf-lords in their halls of stone'?",
		choices:["Three", "Seven", "One", "Five"],
		correct: 1},
	{question: "Which fortress was Frodo taken to after being stung by Shelob?",
		choices:["Isengard", "Tower of Cirith Ungol", "Dol Guldur", "Minas Morgul"],
		correct: 3},
	{question: "What is the material of the shirt that Bilbo gives to Frodo?",
		choices:["Valyrian steel", "Adamantium", "Mithril", "Carbon Fiber"],
		correct: 2}
	];
	var currentIndex = 0;
	var score = 0;

	function quiz(currentIndex){
		$('.question').html('<p>'+allQuestions[currentIndex].question+'</p>');

		for(var i = 0; i<4; i++){
			$('.answers').append('<input type="radio" name="guess" value = '+i+'>'+allQuestions[currentIndex].choices[i]+'<br>');
		}
		$("input:radio[name=guess][value="+allQuestions[currentIndex].save+"]").attr('checked',true);
	}

	function CompleteQuiz(){
		for(var j = 0; j < allQuestions.length; j++){
			if(allQuestions[j].rightchoice == true){
				score++;
			}
		}

		$('.answers').empty();
		$('.question').empty();
		$('.done').remove();
		$('.content').hide().append('<div class = "gameover"><br><h3> You have completed the quiz!</h3> <h4>Score: '+score+' out of ' +allQuestions.length+'</h4></div>').fadeIn();
	}

	quiz(currentIndex);

	$(':submit[value="Back"]').on('click', function(){
		if(currentIndex > 0){
			currentIndex--;
			$('.answers, .question').fadeOut('fast',function(){
				$('.answers').empty();
				quiz(currentIndex);
			}).fadeIn();
		}
	});

	$(':submit[value="Next"]').on('click', function(){
		var selected = $("input:radio[name=guess]:checked");
		if(selected.val() == allQuestions[currentIndex].correct){
			allQuestions[currentIndex].rightchoice = true;
		}
		else{
			allQuestions[currentIndex].rightchoice = false;
		}

		if(selected.val() != undefined){
			currentIndex++;
			if(currentIndex == allQuestions.length){
				$('.answers, .question, .done').fadeOut('fast', function(){
					$('.answers').empty();
					quiz(currentIndex);
				});
				setTimeout(CompleteQuiz, 400);
			}
			else{
				allQuestions[currentIndex-1].save = selected.val();
				$('.answers, .question').fadeOut('fast', function(){
					$('.answers').empty();
					quiz(currentIndex);
				}).fadeIn();
			}
		}
		else{
			alert("You must fill in a bubble!");
		}
	});
});


