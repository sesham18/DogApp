'use strict';

const dogurl = 'https://warm-stream-27959.herokuapp.com/doggone';
const dog = 'http://localhost:8080/doggone' 

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
  console.log(responseJson[1].name); 
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><p>${responseJson[i].name}</p>
      <p>${responseJson[i].age}</p>
      <p>${responseJson[i].gender}</p></li>`
    )
  }; 
  $('#results-list').show(); 
  $('#results').removeClass('hidden');
}; 

