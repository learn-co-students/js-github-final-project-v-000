var ghToken = 'removed this before pushing to gh';

function createIssue(repoName, repoOwner, title, body) {
  var data = {
    title: title,
    body: body
  };

  const token = new GithubInteractor(ghToken);

  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    data: JSON.stringify(data),
    dataType: 'json',
    headers: {
    Authorization: ghToken
     }
  }).done(function(results) {

    handleResponse(results);
  }).fail(function(error) {
  handleError(error);
});
}


function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(response) {
  $('#issue').append("<a href="+response.html_url+">"+response.title+"</a>");
}

function handleError(error) {
  console.log("Post error: " + error.name );
}

function submitForm() {
  $("form").on('submit', function(e){
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
      e.preventDefault();
    });
}

$(document).ready(function() {
  submitForm();
});
