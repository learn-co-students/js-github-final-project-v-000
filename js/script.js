$(document).ready(function() {
  submitForm();
}); 

var baseURL = 'https://api.github.com';

function GithubInteractor (token){
  this.token = token;
}


var submitForm = function(){
  $('input[type=submit').click(function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  })

};

var createIssue = function(repoName, repoOwner, title, body){
  var newObj = { title: title, body: body};
  $.ajax({
    url: baseURL + '/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + GithubInteractor.token);
    },
    dataType: 'json',
    data: JSON.stringify(newObj),
    success: function (json){
      handleResponse(json);
    },
    error: function (xhr, textStatus, errorThrown){
      handleError(xhr, textStatus, errorThrown);
    }
  });
}

function handleResponse(json) {
  $('#issue').append('<a href= ' + json.html_url + '>' + json.title + '</a>');
}

function handleError(xhr, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
}



