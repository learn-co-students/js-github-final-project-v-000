$(document).ready(function(){
  // submitForm();
});


function GithubInteractor(token ){
  this.token = token;
  this.baseURL = 'https://api/github.com/repos/';
}

var interactor = new GithubInteractor("token ;) ")

function createIssue(repoName,repoOwner,title,content){
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";

  var data = {
    'title': title,
    'body': content,
    // 'assignee': repoOwner
  }

  $.ajax({
    type:'POST',
    url: url,
    beforeSend: function(xhr){
      xhr.setRequestHeader('Authorization', 'token' + interactor.token)
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function Issue(uRL, issueTitle, issueBody){
  this.uRL = uRL
  this.issueTitle = issueTitle
  this.issueBody = issueBody
}

function handleResponse(response){
  var localIssue = new Issue(response.html_url, response.title, response.body)
  localIssue.renderIssue($('#issue'));
}

Issue.prototype.renderIssue = function(jquery_selector) {
  var link = $('<a>')
  .attr('href', this.uRL)
  .text(this.issueTitle);
  jquery_selector.append(link);
}

function submitForm(){
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function handleError(xhr, textStatus, error) {
  console.log('Post error: ' + error);
}


// Issue.prototype.