
var token = "notatoken"


function GithubInteractor (token) {
  this.token = token;
}
function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues'
  var data = {
    "title": title,
    "body": body
  };
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    handleResponse(response)
  })
  .fail(function(response) {
    handleError();
    // console.log("Post Error: " + response.responseText);
  })
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function handleResponse(response) {
  $("#issue").append("<a href=" + response.html_url + ">" + response.title + "</a>")
}

$(document).ready(function(){
  submitForm();
});

function submitForm(){
  $('form').on('submit', function(event){
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

