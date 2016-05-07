$(document).ready(function(){
  bindCreateButton();
});

var github_token = new GithubInteractor('TOKEN_GOES_HERE');

var bindCreateButton = function() {
  $('#create').click(function(event){
    // github_token = new GithubInteractor($('#token').val());
    createIssue($('#repoName').val(), $('#repoOwner').val(), $('#issueTitle').val(), $('#body').val());
    event.stopPropagation();
  });
};

function createIssue(repoName, repoOwner, issueTitle, issueBody){
  var github_url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';

  var token = github_token.token;
  var issue_obj = {
    title: issueTitle,
    body: issueBody
  };

  $.ajax({
    url: github_url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(issue_obj),
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token: " + token);
    },
    success: handleResponse,
    error: handleError
  });
};

function GithubInteractor(token){
  this.token = token;
};

function handleResponse(jsonData){
  console.log(jsonData);
};

function handleError(errorData, textStatus, errorThrown){
  console.dir(errorData);
  console.log('Post error: ' + errorThrown);
};
