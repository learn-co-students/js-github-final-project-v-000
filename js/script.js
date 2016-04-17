function GithubInteractor (token) {
  this.token = token;
}
function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues'
  // var url = 'https://api.github.com/repos/c1505/pull/issues'
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
    // console.log(response.html_url)
    $("body").append("<a href=" + response.html_url + ">" + response.html_url + "</a>")
  })
  .fail(function(response) {
    console.log("Post Error: " + response.responseText);
  })
}

function handleResponse(response) {
  $("body").append("<a href=" + response.html_url + ">" + response.html_url + "</a>")
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

