'use strict';

var dog = 'http://www.doggone.info/doggone';
export var authUrl = 'http://www.doggone.info/auth';

export function sendAuthState(state) {
  return fetch(authUrl, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({auth: state})
  });
}

export async function getAuthState() {
  let resp = await fetch(authUrl);
  return await resp.json();
}

//On start 
$('.container').hide(); 
$('.restart').hide();
showOrHideBoxes('hide');
$('.dog-db').hide();
$('.dog-input-container').hide();
$('.dog-input-container-update').hide(); 
$('#update-error').hide();
$('#delete-error').hide();
$('#login-error').hide();

//On clickng the "get started" button 
$('#get-start').on('click', function(){
    $('.instructions').hide(); 
    $('.login').show(); 
    $('.choose-instructions').hide(); 
    $('.container').hide(); 
    getInfo(); 
    $('.dog-db').show();
    getAuthState().then(data => {
      console.log('State retrieved...');
      if (data) {
        showOrHideBoxes('show');
      } else {
        console.log('Not authenticated!');
      }
    });
});

function showOrHideBoxes(showOrHide) {
  if (showOrHide == 'hide') {
    $('.dog-db-deletion').hide();
    $('.dog-db-update').hide();
    $('.dog-db-addition').hide();
  } else {
    $('.dog-db-deletion').show();
    $('.dog-db-update').show();
    $('.dog-db-addition').show();
  }
}

//On clicking 'Adding a dog' feature 
$('.dog-enter').on('click', function(){
  $('.dog-details').show(); 
  $('.dog-input-container').show();
  $('.dog-db').hide();
  showOrHideBoxes('hide');
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
    showOrHideBoxes('hide');
});

function updateFields(respJson) {
  $('#input-dog-name-2').val(respJson.Name);
  $('#input-dog-breed-2').val(respJson.Breed);
  $('#input-dog-age-2').val(respJson.Age);
  $('#input-dog-sex-2').val(respJson.Gender);
  $('#input-dog-image-2').val(respJson.URL)
}

//Update Block 
$('#submit-update').on('click', function() {
  var id_dog = $('#input-one').val();
  if ($('#' + id_dog).length) {
    $('#update-error').hide();
    $('#' + id_dog).css('color', 'green');
    $('.dog-input-container-update').show(); 
    showOrHideBoxes('hide');
    
    fetch(dog + '/' + id_dog).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText); 
    }).then(responseJson => updateFields(responseJson));

    $('#submit-dog-2').on('click', function () {
      console.log('Update sent!');
      updateItem(id_dog,
        $('#input-dog-name-2').val(),
        $('#input-dog-sex-2').val(),
        $('#input-dog-age-2').val(),
        $('#input-dog-breed-2').val(),
        $('#input-dog-image-2').val());
      $('.dog-db').hide();
      $('#results-list').empty();
      getInfo();
      $('.dog-db').show();
      $('.dog-input-container-update').hide();
      showOrHideBoxes('show');    // obviously, they are authorized
      $('#input-one').val('');
      return false; 
    });

  } else {
    $('#update-error').show();
  }
  return false; 
});

$('#submit-deletion').on('click', function() {
  let id = $('#input-two').val();
  if ($('#' + id).length) {
    $('#delete-error').hide();
    $('#' + $('#input-two').val()).css('color', 'red');
    setTimeout(() => {deleteItem($('#input-two').val());}, 2000);
  } else {
    $('#delete-error').show();   
  } 
});

$('#submit-dog').on('click', function() {
  addItem($('#input-dog-name').val(),
          $('#input-dog-sex').val(),
          $('#input-dog-age').val(),
          $('#input-dog-breed').val(),
          $('#input-dog-image').val());
  $('.dog-input-container').hide();
  clearAddFields();
  showOrHideBoxes('show');
  $('.dog-db').hide();
  $('#results-list').empty();
  getInfo();
  $('.dog-db').show();
  return false; 
});

function clearAddFields() {
  $('#input-dog-name').val('');
  $('#input-dog-sex').val('');
  $('#input-dog-age').val('');
  $('#input-dog-breed').val('');
  $('#input-dog-image').val('');
}

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


function addItem(name, gender, age, breed, url) {
  fetch(dog, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({Name: name, Gender: gender, Age: age, Breed: breed, URL: url})
  });
}

function updateItem(id, name, gender, age, breed, url) {
  fetch(dog + '/' + id, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({_id: id, Name: name, Gender: gender, Age: age, Breed: breed, URL: url})
  });
}
