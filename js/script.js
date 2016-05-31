$(document).ready(function(){
  bindCreateButton();
});

var github_token = new GithubInteractor('TOKEN_GOES_HERE');

var bindCreateButton = function() {
  $('form').on("submit", function(event){
    var repo = $('#repoName').val(),
    owner = $('#repoOwner').val(),
    title = $('#title').val(),
    body = $('#body').val();

    createIssue(repo, owner, title, body);
    event.preventDefault();
  });
};

function createIssue(repo, owner, title, body){
  var github_url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues';

  var token = github_token.token;
  var issue_obj = {
    title: title,
    body: body
  }
  $.ajax({
    url: github_url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(issue_obj),
    success: handleResponse,
    error: handleError
  });
};

function GithubInteractor(token){
  this.token = token;
};

function handleResponse(jsonData){
  $('#issue').append($('<a>').attr('href', jsonData.html_url).text(jsonData.title));
};

function handleError(errorData, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
};
