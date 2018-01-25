$(document).ready(function(){
  submitForm();
})

  function GithubInteractor(token){
    this.token = token;
  }

  var interaction = new GithubInteractor("")


function createIssue(name, owner, title, body){ 
  var endpoint = "https://api.github.com/repos/" + owner + "/" + name + "/issues"
   var data = {
     "title": title,
      "body": body,
    }

  $.ajax({
    url: endpoint,
    type: "POST",
    dataType: "json",
    headers: {
    Authorization: 'token ' + interaction.token
     },
     data: JSON.stringify(data)
   }).done(handleResponse).fail(handleError);
}

function submitForm(){
  $('form').on('submit', function(event){
    var name = $('#repoName').val() ;
    var title = $('#title').val();
    var body = $('#body').val();
    var owner = $('#repoOwner').val();
    createIssue(name, owner, title, body);
    event.preventDefault();
  }); 
}

function Issue(url, title, body) {
  this.url = url;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(issueSelector){
  var link = "<li><a href =" + this.url + ">" + this.title + "</a></li>"
  issueSelector.append(link);
}

function handleResponse(response) {
  var issue = new Issue(response.url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(XHR, status, error) {
  console.log("Post error: " + error);
}


