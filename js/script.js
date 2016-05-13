function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, title, issue) {
  //make an ajax post request to github api, 'issue endpoint'.
  //add link to index, prevent default so page doesn't refresh.
  var URL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues'
  var TOKEN = "fc32e292d9ec17c50d9da8ab3f44d271b82649df";

  var data = {
    'title': title,
    'body': issue
  };

  $.ajax({
    url: URL,
    type: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    headers: {
      TOKEN
    }
  }).done(function() {
    $("#issue").text("posted.")
  });
}

function handleResponse() {

}

function handleError() {

}
