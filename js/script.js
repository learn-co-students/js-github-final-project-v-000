$(document).ready(function(){
  submitForm();
});

function GithubInteractor(token){
  this.token = token;
}
var token = new GithubInteractor("token")

function createIssue(repoName, repoOwner, title, body){
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: "json",
    headers: {'Authorization': 'token ' + token.token},
    data: JSON.stringify({'title' : title, 'body' : body})
  }).done(function(response){
    handleResponse(response);
  }).fail(function(response){
    handleError(response);
  });
}

function submitForm(){
  $('#submit').click(function(e) {
    e.preventDefault()
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  })
}

function handleResponse(response){
  $('#issue').append('<div>'+ response.title +'</div>');
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}
