'use strict';

var dog = 'http://localhost:3000/doggone'; 
$('.container').hide(); 
$('.restart').hide();
$('.restart').hide(); 
$('.dog-details').hide(); 
$('.dog-db').hide(); 

$('#get-start').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').hide(); 
    getInfo(); 
    $('.dog-db').show();    
});

$('.dog-enter').on('click', function(){
  $('.dog-details').show(); 
  $('.dog-db').hide(); 
}); 

$('#login').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').show(); 
});

$('.home').on('click', function(){
    $('.instructions').show(); 
    $('.choose-instructions').show(); 
    $('.container').hide(); 
    $('.dog-details').hide(); 
    $('.contain-results').hide(); 
    $('.dog-db').hide(); 
});

function getInfo() { 
  console.log(dog); 
  fetch(dog)
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
}; 

function displayResults(responseJson){
  console.log(responseJson); 
  console.log(responseJson.length); 
  console.log(responseJson[1].Name); 
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<div class = "dog-stats"><h3>${responseJson[i].Name}</h3><hr>
      <ul>Age: ${responseJson[i].Age}</p>
      <p>Gender: ${responseJson[i].Gender}</p><button class = "dog-button">Delete</button></div>`
    )
  }; 
  $('#results-list').show(); 
  $('#results').removeClass('hidden');
}; 

$(".dog-button").on('click', function(event) {
  console.log("beginning delete"); 
  event.preventDefault(); 
  deleteItem($(event.currentTarget).closest('.dog-stats').attr('_id')); 
}); 

function deleteItem(itemId){
  console.log("deleting"); 
  $.ajax({
    url: dog + '/' + itemId, 
    method: 'delete', 
    success: displayResults()
  }); 
}

