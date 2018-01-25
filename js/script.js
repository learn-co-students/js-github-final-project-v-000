function GithubInteractor(token) {
  this.token = token;
};

var interactor = new GithubInteractor("f1dab444af0ec93c7808c951cfa0649380f691a6")

function createIssue(name, owner, title, body) {
  var url = "https://api.github.com/repos/" + owner + "/" + name + "/issues";
  var data = {
    title: title,
    body: body
  };
  $.ajax({
    type: "POST",
    url: url,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
};

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
};

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}