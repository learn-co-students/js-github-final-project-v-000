function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor('testtoken')
var token = interactor.token

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var data = {
    'title': issueTitle,
    'body': issueBody
  };
  var interactor = this;
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: token
    }
  }).done(function(response){
    handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown){
    handleError(jqXHR, textStatus, errorThrown);
  });  
}

function handleResponse(response){
  var link = '<a href="' + response['html_url'] + '">' + response['title'] + '</a><br>'
  $('#issue').append(link);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}

function bindSubmit(){
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repoName, respoOwner, issueTitle, issueBody);
    event.preventDefault();
  });
}

$(document).ready(function(){
  bindSubmit();
});