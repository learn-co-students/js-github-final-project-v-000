$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor("addyourtokenhere");

function submitForm(){
 $("form").on('submit', function(e){
   var name = $('#repoName').val();
   var owner = $('#repoOwner').val();
   var title = $('#title').val();
   var body = $('#body').val();
   createIssue(name, owner, title, body)
   e.preventDefault();
 });
}

function createIssue(name, owner, title, body){
  var data = {
    title: title,
    body: body
  }

  $.ajax({
    title: title,
    body: body,
    url: 'https://api.github.com/repos/' + owner + '/' + name + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
  }).done(function(results){
    handleResponse(results);
  }).fail(function(error){
    handleError(error.jqXHR, error.status, error);
  });
}

function handleResponse(response){
    $('#issue').append('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jqXHR, status, error){
  console.log("Post error: " + error);
}
