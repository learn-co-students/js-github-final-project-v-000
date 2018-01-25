$(document).ready(function(){
  submitForm();
});


function Issue(url, title, body){
  this.url = url;
  this.title = title;
  this.body = body;
}

function GithubInteractor(token){
this.token = token
this.apiBaseUrl = "https://api.github.com/repos/";

}


function handleResponse(response){
var issue = new Issue(response.html_url, response.title, response.body);
  $('#issue').append(issue.title);
}

function handleError(jqXHR, textStatus, error){
console.log("Post error: " + error)

}
var interactor = new GithubInteractor("05d4da55e3999d2f0f7d08eba54257f9248868a7")

function submitForm(){
$('form').on('submit', function(event){
  var repoName = $('#repoName')
  var repoOwner = $('#repoOwner')
  var title = $('#title')
  var body = $('#body')
  createIssue(repoName, repoOwner, title, body);
  event.preventDefault();
  })

}


function createIssue(repoName, repoOwner, title, body){
  var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues"
  var data = {
    title: title, 
    body: body
  }

  $.ajax({
    type: "POST", 
    url: url, 
    debugger
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}