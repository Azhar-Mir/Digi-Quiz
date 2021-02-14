//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons ");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const optionContainer = document.querySelector(".option-container");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


// if startQuiz button clicked
start_btn.onclick = ()=>
{
   info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>
{
   info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>
{
   info_box.classList.remove("activeInfo"); //hide info box
   quiz_box.classList.add("activeQuiz"); //show quiz box
   getNewQuestion();
   queCounter(1); //passing 1 parameter to queCounter
   startTimer(15); //calling startTimer function
   startTimerLine(0); //calling startTimerLine function
}
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const que_text = document.querySelector(".que_text");
// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
  que_numb=1;
  userScore = 0;
  info_box.classList.remove("activeInfo"); //hide info box
   quiz_box.classList.add("activeQuiz"); //show quiz box
   result_box.classList.remove("activeResult"); //hide result box
   reset();
   setAvailableQuestion();
   getNewQuestion();
   queCounter(que_numb); //passing que_numb value to queCounter
   clearInterval(counter); //clear counter
   clearInterval(counterLine); //clear counterLine
   startTimer(timeValue); //calling startTimer function
   startTimerLine(widthValue); //calling startTimerLine function
   timeText.textContent = "Time Left"; //change the text of timeText to Time Left
   next_btn.classList.remove("show"); //hide the next button
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>
{
   window.location.reload(); //reload the current window
}
// if Next Que button clicked
next_btn.onclick = ()=>
{
   if(que_count < questions.length - 1){ //if question count is less than total question length
       questionCounter++;
       que_count++; //increment the que_count value
       que_numb++; //increment the que_numb value
       getNewQuestion();
       queCounter(que_numb); //passing que_numb value to queCounter
       clearInterval(counter); //clear counter
       clearInterval(counterLine); //clear counterLine
       startTimer(timeValue); //calling startTimer function
       startTimerLine(widthValue); //calling startTimerLine function
       timeText.textContent = "Time Left"; //change the timeText to Time Left
       next_btn.classList.remove("show"); //hide the next button
   }
   else
   {
       clearInterval(counter); //clear counter
       clearInterval(counterLine); //clear counterLine
       showResult(); //calling showResult function
   }
}
let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
function setAvailableQuestion()
{
   const totalQuestion=questions.length;
  for(let i=0; i<totalQuestion;i++)
   {
        availableQuestions.push(questions[i])
   }
}
function getNewQuestion()
{
optionList.innerHTML='';
questionCounter=0;
bottom_ques_counter.innerHTML= (questionCounter+1)  + " of "+questions.length+" Question ";
const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
console.log(questionIndex);
currentQuestion=questionIndex;
console.log(currentQuestion);
const temp=currentQuestion.question;
que_text.innerHTML=temp;
console.log(que_text.innerHTML);
const index1=availableQuestions.indexOf(questionIndex);
 availableQuestions.splice(index1,1);
const optionlen=currentQuestion.options.length;
for (let i=0;i<optionlen;i++)
{
  availableOptions.push(i);
}

let animationDelay=0.2;
for (let i=0;i<optionlen;i++)
{
const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
const index2=availableOptions.indexOf(optionIndex);
availableOptions.splice(index2,1);
const option=document.createElement("div");
option.innerHTML=currentQuestion.options[optionIndex];
option.id=optionIndex;
option.style.animationDelay=animationDelay + 's';
animationDelay=animationDelay + 0.2;
option.className="option";
optionList.appendChild(option);
option.setAttribute("onclick","getResult(this)");
}
questionCounter++;
}
function next(){
  if(questionCounter===questions.length){
    console.log("quiz over");
  }
  else{
    getNewQuestion();
  }
}
function getResult(ele)
{
  const id1 = (ele.innerHTML);
 const allOptions = optionList.children.length;
  if(id1 === currentQuestion.answer)
  {
    userScore += 1; //upgrading score value with 1
    ele.classList.add("correct"); //adding green color to correct selected option
    ele.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  }
  else
  {
      ele.classList.add("incorrect"); //adding red color to correct selected option
      ele.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      console.log("Wrong Answer");

      for(i=0; i < allOptions; i++)
      {
          if(optionList.children[i].textContent == currentQuestion.answer)
          { //if there is an option which is matched to an array answer
              optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
              optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
              console.log("Auto selected correct answer.");
          }
      }
   }
    for(i=0; i < allOptions; i++)
    {
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option

}
window.onload =function()
{
  setAvailableQuestion();
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
function showResult(){
   info_box.classList.remove("activeInfo"); //hide info box
   quiz_box.classList.remove("activeQuiz"); //hide quiz box
   result_box.classList.add("activeResult"); //show result box
   const scoreText = result_box.querySelector(".score_text");
   if (userScore > 3){ // if user scored more than 3
       //creating a new span tag and passing the user score number and total question number
       let scoreTag = '<span>and Congrats!! 🎉🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
   }
   else if(userScore > 2){ // if user scored more than 1
       let scoreTag = '<span>and Nice 😎😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;
   }
   else{ // if user scored less than 1
       let scoreTag = '<span>and Sorry 😐😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;
   }
}
function startTimer(time)
{
   counter = setInterval(timer, 1000);
   function timer()
   {
       timeCount.textContent = time; //changing the value of timeCount with time value
       time--; //decrement the time value
       if(time < 9)
       { //if timer is less than 9
           let addZero = timeCount.textContent;
           timeCount.textContent = "0" + addZero; //add a 0 before time value
       }
       if(time < 0)
       { //if timer is less than 0
           clearInterval(counter); //clear counter
           timeText.textContent = "Time Off"; //change the time text to time off
           const allOptions = optionList.children.length; //getting all option items
           let correcAns = questions[questionCounter].answer; //getting correct answer from array
           for(i=0; i < allOptions; i++)
           {
               if(optionList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                   optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                   optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                   console.log("Time Off: Auto selected correct answer.");
               }
           }
           for(i=0; i < allOptions; i++)
           {
               optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
           }
           next_btn.classList.add("show"); //show the next button if user selected any option
       }
   }
}
function startTimerLine(time)
{
   counterLine = setInterval(timer, 29);
   function timer()
   {
       time += 1; //upgrading time value with 1
       time_line.style.width = time + "px"; //increasing width of time_line with px by time value
       if(time > 549){ //if time value is greater than 549
           clearInterval(counterLine); //clear counterLine
       }
   }
}
function reset()
{
  questionCounter=0;
  que_count=0;
  bottom_ques_counter.innerHTML = questionCounter;
  console.log(bottom_ques_counter.innerHTML);
}

function queCounter(index)
{
   //creating a new span tag and passing the question number and total question
   let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
   bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
   console.log(bottom_ques_counter.innerHTML);

}
