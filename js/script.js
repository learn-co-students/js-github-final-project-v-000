// JS basics, jQuery, AJAX + API calls, and OO
// run in browser by typing `python -m SimpleHTTPServer`
// navigate to localhost:8000

class Issue {
  constructor(URL, title, body) {
    this.URL = URL;
    this.title = title;
    this.body = body;
  }
}

function GithubInteractor(token){
  this.token = token;
  this.baseUrl = "https://api.github.com/repos/";
}

var response = function(theResponse) {
  var issue = new Issue(theResponse.URL, theResponse.title, theResponse.body)
  var link = $('<a>')
      .attr('href', this.URL)
      .text(this.title);
  $('#issue').append(link)
}

var error = function(jqXHR, textStatus, theError) {
  console.log("Error: " + theError);
}

var createIssue = function(repoName, repoOwner, title, body) {
  var URL = interactor.baseUrl + repoOwner + "/" + repoName + "/issues";
  var API_KEY = "6b869cc1249cc97528aad8f866bec2ca1bfc87f2";
  var data = {
    'title': title,
    'body': body
  };

  $.ajax({
    url: URL,
    type: 'post',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + API_KEY);
    },
    data: JSON.stringify(data)
  })
  .done(response)
  .fail(error);
}

// create an issue: POST /repos/:owner/:repo/issues
// params: title:string, body:string

var submitForm = function() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
   
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

$(document).ready(function() {
  submitForm();
});