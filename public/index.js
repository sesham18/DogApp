'use strict';

var dog = 'http://localhost:3000/doggone';

//On start 
$('.container').hide(); 
$('.restart').hide();
$('.restart').hide(); 
$('.dog-db').hide(); 
$('.dog-db-deletion').hide();
$('.dog-input-container').hide();
$('.dog-db-deletion').hide();
$('.dog-db-addition').hide(); 
$('.dog-db-update').hide(); 
$('.dog-input-container-update').hide(); 
$('#update-error').hide();

//On clickng the "get started" button 
$('#get-start').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').hide(); 
    getInfo(); 
    $('.dog-db').show();    
    $('.dog-db-deletion').show();
    $('.dog-db-addition').show();
    $('.dog-db-update').show();  
});

//On clicking 'Adding a dog' feature 
$('.dog-enter').on('click', function(){
  $('.dog-details').show(); 
  $('.dog-db').hide(); 
  $('.dog-db-deletion').hide();
  $('.dog-input-container').show();
  $('.dog-db-update').hide(); 
  $('.dog-db-addition').hide(); 
}); 

//On clicking the login button 
$('#login').on('click', function(){
    $('.instructions').hide(); 
    $('.choose-instructions').hide(); 
    $('.container').show(); 
});

//On clicking the home button 
$('.home').on('click', function(){
    $('.instructions').show(); 
    $('.choose-instructions').show(); 
    $('.container').hide(); 
    $('.dog-details').hide(); 
    $('.contain-results').hide(); 
    $('.dog-db').hide(); 
    $('.dog-input-container').hide();
    $('.dog-db-deletion').hide();
    $('.dog-db-update').hide(); 
    $('.dog-db-addition').hide(); 
});

function updateFields(respJson) {
  $('#input-dog-name-2').val(respJson.Name);
  $('#input-dog-breed-2').val(respJson.Breed);
  $('#input-dog-age-2').val(respJson.Age);
  $('#input-dog-sex-2').val(respJson.Gender);
}

//Update Block 
$('#submit-update').on('click', function() {
  var id_dog = $('#input-one').val();
  if ($('#' + id_dog).length) {
    $('#update-error').hide();
    $('#' + id_dog).css('color', 'green');
    $('.dog-input-container-update').show(); 
    $('.dog-db-deletion').hide();
    $('.dog-db-update').hide(); 
    $('.dog-db-addition').hide(); 
    
    fetch(dog + '/' + id_dog).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText); 
    }).then(responseJson => updateFields(responseJson));

    $('#submit-dog-2').on('click', function () {
      updateItem(id_dog,
        $('#input-dog-name-2').val(),
        $('#input-dog-sex-2').val(),
        $('#input-dog-age-2').val(),
        $('#input-dog-breed-2').val());
        
        $('.dog-input-container-update').hide();
        $('#results-list').hide();
        $('#results-list').empty();
        getInfo();
    });

  } else {
    $('#update-error').show();
  }
});

$('#submit-deletion').on('click', function() {
  $('#' + $('#input-two').val()).css('color', 'red');
  setTimeout(() => {deleteItem($('#input-two').val());}, 2000);
});

$('#submit-dog').on('click', function() {
  addItem($('#input-dog-name').val(),
          $('#input-dog-sex').val(),
          $('#input-dog-age').val())
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
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(`
      <div class="dog-stats-element" id=${responseJson[i]._id}>
        <h3>${responseJson[i].Name}</h3>
        <p>Age: ${responseJson[i].Age}</p>
        <p>Breed: ${responseJson[i].Breed}</p>
        <p>Gender: ${responseJson[i].Gender}</p>
        <p>ID: ${responseJson[i]._id}</p>
        <img src="` + responseJson[i].URL + `" alt="Dog ` + responseJson[i].Name +  `" height="200" width="200" class="center">
      </div>`
    )
  }; 
  $('#results-list').show(); 
  $('#results').removeClass('hidden');
}; 

/*
$(".dog-button").on('click', function(event) {
  console.log("beginning delete"); 
  event.preventDefault(); 
  deleteItem($(event.currentTarget).closest('.dog-stats').attr('_id')); 
}); 
*/

function deleteItem(itemId){
  console.log("deleting"); 
  // add error handling
  fetch(dog + '/' + itemId, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({_id: itemId})
  });
  $('#results-list').hide();
  console.log('hidden results');
  $('#results-list').empty();
  getInfo();
  console.log('got results...');
  $("#input-two").val('');
  $('#results-list').show();
}

function addItem(name, gender, age, breed) {
  fetch(dog, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({Name: name, Gender: gender, Age: age, Breed: breed})
  });
  // window.location.reload();
}

function updateItem(id, name, gender, age, breed) {
  fetch(dog + '/' + id, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({_id: id, Name: name, Gender: gender, Age: age, Breed: breed})
  });
  /*
  $('.dog-input-container-update').hide();
  console.log('hidden results');
  $('#results-list').empty();
  getInfo();
  console.log('got results...');
  $('#input-one').val('');
  $('#results-list').show();
  //window.location.reload();
  */
}
