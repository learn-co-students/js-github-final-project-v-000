// loads the page
$(document).ready(function(){
  var repoName, title, body;
  submitForm();
});
// creates the object
function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}
// sets a prototype to create a new issue
Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}
// creates githubinteractor constructor
   function GithubInteractor(token) {
     this.token = token;
     this.apiBaseUrl = "https://api.github.com/repos/";
   }
// sets variable of a new instance of an interactor
   var interactor = new GithubInteractor("IdputmytokenhereifItrustedpeopleongithubbutttttttttt")
// submits data and turns into object properties.
   function submitForm(){
  $('form').on('submit', function(event){
    // take data below and turn into object with properties
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

  function handleResponse(response) {
    // handles callback function
    var issue = new Issue(response.html_url, response.title, response.body)
 // renders issue link on page
    issue.renderIssue($('#issue'));
  }

  function handleError(jqHHR, textStatus, error) {
    // handles error
    console.log("Post error: " + error);
  }

  function createIssue(repoName, repoOwner, title, body) {
    // calls github api with a post
    var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";
    // formats response via JSON
    var data = {
      title: title,
      body: body,
    }
    $.ajax({
      type: "POST",
      url: url,
      beforSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token" + interactor.token);
      },
      data: JSON.stringify(data)
    })
    .done(handleResponse)
    .fail(handleError);
  }
