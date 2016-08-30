$(document).ready(function(){
  submitForm();
});

class GithubInteractor {
  constructor(token) {
    this.token = token;
  };
}

function submitForm() {
  $('#submit').click(function(e) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  var src = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var issueData = { 
    "title": title,
    "body": body
  };
  var ghInt = new GithubInteractor("INSERT API KEY FOR PRODUCTION HERE");

  $.ajax({
    url : src,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(issueData),
    headers: {
      Authorization: "token " + ghInt.token
    },
    success: function(issue) {
      handleResponse(issue);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      handleError(jqXHR, textStatus, errorThrown);
    }
  })
};

function handleResponse(issue) {1
  var link = '<a href="' + issue.html_url +'">' + issue.title + '</a>';
  $("#issue").append(link);
};

function handleError(jqXHR, textStatus, errorThrown) {
  console.log(`Post error: ${errorThrown}`);
};