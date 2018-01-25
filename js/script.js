$(document).ready(function(){
  submitForm();
});

function GithubInteractor(token){
  this.token = token;
  this.apiUrl = "https://api.github.com/repos/";
}

var ghInteractor = new GithubInteractor("Api key");

function submitForm() {
$('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner =$('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
});

}

class Issue {
 constructor(url, title, body) {
   this.url = url;
   this.title = title;
   this.body = body;
 }

 renderIssue(selector) {
   var issueLink = $('<a>').attr('href', this.url).text(this.title);
  //  var issueBody = $('<p>').text(this.body);
     selector.append(issueLink);
    //  selector.append(issueBody);
 }
}

function handleResponse(data){
  var issue = new Issue(data.html_url, data.title, data.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, errorThrown){
    console.log("Post error: " + errorThrown);
}

function createIssue(repoName, repoOwner, title, body){
  var data = {
    'title': title,
    'body': body
    }
   var url = ghInteractor.apiUrl + repoOwner + "/" + repoName + "/issues";
  $.ajax({
   url: url,
   type: 'POST',
   dataType: 'json',
   headers: {
     Authorization: "token " + ghInteractor.token //removed token
   },
   data: JSON.stringify(data)
 }).done(handleResponse)
 .fail(handleError);   //POST request fails, the function should print out Post error: error_name to the console.


}
