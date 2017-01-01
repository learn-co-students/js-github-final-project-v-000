$( document ).ready(function() {
  submitForm();
})

function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}




Issue.prototype.renderIssue = function(selector) {
  var link = $('<a>').attr('href', this.issueURL)
  .text(this.title);
  selector.append(link);
};

function GithubInteractor(token){
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
}

var newGithubInteractor = new GithubInteractor("2c292741678a1f7615ccef529a972fa9158aa10c");

function submitForm() {
    $('form').on('submit', function(event) {
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    var url = "https://api.github.com/repos/" + this.repoOwner + "/" + this.repoName + "/issues";
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });

}


function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body);
  issue.renderIssue($('#issue'))
}

function handleError(error) {
  console.log('Post error: Unauthorized')
}



function createIssue(repoName, repoOwner, title, body) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  var data = {
    title: title,
    body: body
  };
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + newGithubInteractor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
  .fail(handleError);

}
