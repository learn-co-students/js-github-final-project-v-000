$(document).ready(function(){
  
  bindSubmitButton();

});

function GithubInteractor(token){
  this.token=token;
}

var ghInteractor = new GithubInteractor('key')

var handleResponse=function(issue){
  var link = $('<a>').attr('href', issue.html_url).text(issue.title);
  var listItem = $('<li>').append(link);
  
  $('ol#issue').append(listItem);
}

var handleError=function(jqXHR, textStatus, errorThrown){
  var errorMessage = errorThrown
  console.log("Post error: " + errorMessage);
}

var createIssue=function(repoName, repoOwner, title, body){
  var issueData = {
    'title': title, 
    'body': body
  };
  var url='https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';

$.ajax({
  url: url,
  type: 'POST',
  DataType: 'json',
  headers: { "Authorization": "token " + ghInteractor.token
    }, 
  data: JSON.stringify(issueData)
  })
  .done(handleResponse).fail(handleError);
}

var bindSubmitButton= function(){
  $('form').submit(function(event) {
    var repoOwner = $('#repoOwner').val();
    var repoName = $('#repoName').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();

    });
  };


