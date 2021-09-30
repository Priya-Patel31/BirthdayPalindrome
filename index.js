var dateString = document.querySelector("#datePicker");
var btn = document.querySelector("#check");
var outputDiv = document.querySelector(".output");
var outputDivTwo = document.querySelector(".outputDiv")



  function reverseString(strings){
    // var date1 = strings.value ;
    var str =strings.split('');
    var reverse = str.reverse();
    var reversedString = reverse.join('');

    return  reversedString;
  }
  function palindrome(str){
    var reverse = reverseString(str);
     return str === reverse;
    
  }
  function convertDate (date){
    var dateStr = {day :"",month :"",year :"" };
    if(date.day < 10){
      dateStr.day ="0"+date.day;
    }else{
      dateStr.day = date.day.toString();
    }
    
    if(date.month < 10){
      dateStr.month ="0"+date.month;
    }else{
      dateStr.month = date.month.toString();
    }

    
      dateStr.year = date.year.toString();
   
      return dateStr;
  }

function getAllDateFormates(date){
  var dateStr = convertDate(date);

  var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year;
  var mmyyyydd = dateStr.month+dateStr.year+dateStr.day;
  var yyyyddmm = dateStr.year+dateStr.day+dateStr.month;
  var ddmmyy =  dateStr.day+dateStr.month+dateStr.year.slice(-2);
  var mmyydd = dateStr.month+dateStr.year.slice(-2)+dateStr.day;
  var yyddmm = dateStr.year.slice(-2)+dateStr.day+dateStr.month;

    return [ddmmyyyy,mmyyyydd,yyyyddmm,ddmmyy,mmyydd,yyddmm];
}

function checkAllDateFormates(date)
{
  var listOfPalindrome = getAllDateFormates(date);
  var palindromes = false;
  for(var i = 0 ; i < listOfPalindrome.length;i++)
  {
    if(palindrome(listOfPalindrome[i]))
    {
      palindromes = true;
      break;    
    }
    
  }
  return palindromes;
}
function nextDate(date)
{
    var day = date.day+1;
    var month = date.month;
    var year = date.year;


    var daysInMonths = ["31","28","31","30","31","30","31","31","30","31","30","31"];

    if(month === 2)
    {
        if(leapYear(year))
        {
            if(day > 29)
            {
              day= 1;
              month++;
            }
        }else{
          if(day > 28)
          {
            day= 1;
            month++;
          }
        }
    }else
    {
        if(day > daysInMonths[month-1])
        {
            day= 1;
            month++;
        }
    }

  if(month >12)
  {
      month = 1;
      year++;
  }
  return {day: day , month: month ,year: year};
}

function leapYear(year){
  if(year%400 ===0){
    return true;
  }
  if(year%100 === 0){
    return false;

  }
  if(year%4 === 0){
    return true;
  }
  return false;
}
function nextPalindromeDate(date)
{
    var count = 0;
    var nextDates = nextDate(date);
    while(1){
      count++;
    var palindrome = checkAllDateFormates(nextDates);
    if(palindrome)
    {
      break;
    }
      nextDates = nextDate(nextDates);
      
    }
    return [count,nextDates];
  }

  function previousDate(date){
    var day = date.day-1;
    var month = date.month;
    var year = date.year;


    var daysInMonths = ["31","28","31","30","31","30","31","31","30","31","30","31"];


    if(day === 0){
        month--;
        if(month === 0){
            month = 12;
            day = 31;
            year--;
        }else if(month === 2){
            if(leapYear(year)){
                day = 29;
            }else{
                day = 28;
            }
        }else{
            day = daysInMonths[month-1];
        }
    }

    
  return {day : day , month : month ,year :year};
}
// function previousPalindromeDate(date)
// {
//     var counter1 = 0;
//     var previousDates = previousDate(date);
//     while(1){
//       counter1++;
//     var palindrome = checkAllDateFormates(previousDates);
//     if(palindrome)
//     {
//       break;
//     }
//       previousDates = previousDate(previousDates);
      
//     }
//     return [counter1 , previousDates];
// }
  

  btn.addEventListener("click" ,() =>{
    var Str = dateString.value;

    if(Str !== "")
    {
          listofdates = Str.split("-");
          //console.log(listofdates);
          var date = 
          {
            day : Number(listofdates[2]),
            month: Number(listofdates[1]),
            year: Number(listofdates[0])
          };
          console.log(date);
          var isPalindrome = checkAllDateFormates(date);
            if(isPalindrome)
            {
              outputDiv.style.display = "block";
              outputDiv.innerText = "Yayy !! Your birthday is palindrome🥳🥳";

            }else{
              let [count,nextDates] = nextPalindromeDate(date);
              //let [counter1,previousDates] = previousPalindromeDate(date);
              
                outputDiv.style.display = "block";
                outputDiv.innerText = `The next palindrome date is ${nextDates["day"]}-${nextDates["month"]}-${nextDates["year"]}. Which is ${count} day away😔.`;

                    // if(count === 1)
                    // {
                    //     outputDiv.innerText = `The next palindrome date is ${nextDates["day"]}-${nextDates["month"]}-${nextDates["year"]}. Which is ${count} day away😔.`;
                    // }else
                    // {
                    //     outputDiv.innerText = `The next palindrome date is ${nextDates["day"]}-${nextDates["month"]}-${nextDates["year"]}. Which is ${counter1} days away😔.`;
                    // }
              }
            
    }else{
        outputDiv.style.display = "block";
        outputDiv.innerText = "Can't be empty";
    }
    
  });
 