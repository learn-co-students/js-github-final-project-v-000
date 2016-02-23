function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("PutTokenHere");

function Issue(url, title, body) {
  this.url = url;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector) {
  var link = $('<a>').attr('href', this.url).text(this.title);
  selector.append(link);
}

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);

    event.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  var data = {
    title: title,
    body: body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);

}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body);
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

$(document).ready(function(){
  submitForm();
});