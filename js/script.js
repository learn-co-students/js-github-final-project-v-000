function submitForm() {
  $('#submit').click(function() {
    var repo = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repo, owner, title, body);
  })
}

function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var input = {
      'title':   title,
      'body': body, 
    }

  $.ajax({
  url: url,
  type: 'POST',
  dataType: 'json',
  data: JSON.stringify(input),
  headers: {
    Authorization: `token 03aecd6b27658911edf4566c7d2445d25ae793c1`
  }
}).done(function( data ) {
    handleResponse(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    handleError(jqXHR, textStatus, errorThrown);
});
}

function handleResponse(response) {
    var issuelink = "<a href='" + response.url +"'>" + response.title +"</a>"
    $('#issue').append(issuelink);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function GithubInteractor(token) {
  this.token = token;
}