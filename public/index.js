'use strict';

const dogurl = 'https://warm-stream-27959.herokuapp.com/doggone'; 

$('.container').hide(); 
$('.restart').hide();
$('.restart').hide();  


$('#get-start').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').hide(); 
    getInfo4(); 
});

$('#login').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').show(); 
})

$('.home').on('click', function(){
    $('.instructions').show(); 
    $('.choose-instructions').show(); 
    $('.container').hide(); 
})

$('.restart').on('click', function(){
  $('.instructions').show(); 
});


//Starting sequence
function watchForm() {
  $('.buttonval').on('click', function(event) {
    event.preventDefault(); 
   $('.container').hide();
   $('.intro-pic').hide(); 
   const locGet = $('#js-search-term').val();
   const cuisine = $('#js-cuisine-type').val();
   getInfo(cuisine);
   getInfo2(locGet, cuisine);
 
   
  });
  //This is in case the user hits restart on the first page. 
  $('.restart').on('click', function(){
    $('.instructions').show();
    $('.container').hide();
 });
}
$(watchForm);


function getInfo4() { 
  console.log(dogurl); 
  fetch(dogurl)
    .then(response => {
      if(response.ok) {
        return response.json(); 
      }
      throw new Error(response.statusText); 
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
   });
}

//First accesses MealDB to get recipes
function getInfo(cuisine) {
 const url1 = meal + cuisine;
 console.log(url1);
 fetch(url1)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayResults(responseJson))
   .catch(err => {
     $('#js-error-message').text(`Something went wrong: ${err.message}`);
   });
};


function displayResults(responseJson) { //Displaying results for first API call. 
 console.log(responseJson);
 var arr = responseJson;
 console.log(arr);
 let lenTotal = arr.meals.length;
 for (let i = 0; i < lenTotal; i++){
  $('#results-list-1').append(
   `<li><h3>${arr.meals[i].strMeal}</h3>
   <p> <a href="https://www.themealdb.com/meal.php?c=${arr.meals[i].idMeal}">Recipe</p>
   </li>`
  );
 };
 $('#results').removeClass('hidden');
 
 $('.restart').on('click', function(){ 
    $('#results').addClass('hidden');
    $('#results-list-1').empty(); 
    $('#results-list-2').empty(); 
    $('#js-search-term').reset(); 
    $('#js-cuisine-type').reset(); 
  }); 
};
