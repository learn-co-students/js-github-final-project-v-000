$(document).ready(function() {
  $('form').on("submit", submitForm); 
}); 

class GithubInteractor {
  constructor(token) {
    this.token = token;  
  }
}

function submitForm(event) {
  event.preventDefault(); 
  var repoName = $('#repoName').val(); 
  var repoOwner = $('#repoOwner').val(); 
  var title = $('#title').val(); 
  var body = $('#body').val(); 
  createIssue(repoName, repoOwner, title, body); 
}

function createIssue(repoName, repoOwner, issueName, issueBody) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues"; 
  var ghi = new GithubInteractor("ACCESS TOKEN HERE");   
  $.ajax({
    url: url, 
    type: "POST", 
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + ghi.token);  
    }, 
    data: JSON.stringify({title: issueName, body: issueBody}), 
  }).done(function(response) {
    handleResponse(response);  
  }).fail(function(response) {
    handleError(response);  
  }); 
}

function handleResponse(response) {
  var issueLink = "<a href=" + response.html_url + ">" + response.title + "</a>"; 
  $("#issue").html(issueLink); 
}

function handleError(response, testStatus, errorThrown) {
  console.log("Post error: " + errorThrown); 
}
