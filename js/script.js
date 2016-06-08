var github_token = new GithubInteractor('my token');

function GithubInteractor(token){
  this.token = token;
}

function submitForm(){
  $('form').on('submit', function(event){
    event.preventDefault();
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    debugger;
    createIssue(repoName, repoOwner, title, body);
  });
};

function createIssue(name, owner, issueTitle, issueBody){
  debugger;
  $.ajax({
    url: "https://api.github.com/repos/" + owner + "/" + name + "/issues",
    type: "POST",
    dataType: "json",
    header: { Authentication: GithubInteractor.token },
    data: JSON.stringify({ title: issueTitle, body: issueBody })
  }).done(handleResponse).fail(handleError)
}

function handleResponse(response){
  $('#issue').append($('<a>').attr('href', response.html_url).text(response.title));
};

function handleError(errorData, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
};

$(document).ready(function(){
  submitForm()
});
