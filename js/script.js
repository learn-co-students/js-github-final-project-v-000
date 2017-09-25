function GithubInteractor(token){
  // set this.token and this.apiBaseUrl
  this.token = token
}


function createIssue(repoName, repoOwner, title, body){
  // this function should make an Ajax POST request to the github API create issue end point
  // this endpoint should create an issue based on the info in the form.
  // when form is submitted
  // - add a link to the page to enter a repo name (thus we don't want to refresh on form
  //   submission)
  var interactor = new GithubInteractor("f0eb94d3fecced82d3072a347db2df55c30f3715")
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  debugger;
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function submitForm() {
  // needs to submit the form 
  // should call createIssue
  $('form').on('submit', function(event){
    // take form data and turn into JS object
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    debugger;
    // call createIssue and pass in repoName, repoOwner, title, body from form
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown)
}

// token
// 59bb0ad60b3ff2e4bf478da9cf7381937c879a96