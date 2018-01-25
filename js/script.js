function GithubInteractor(token) {
  this.token = token;
}

var tokenHolder = new GithubInteractor("4b55b2eab6734859d021d2fe62ce251b42721541")

var createIssue = function(repoName, repoOwner, issueTitle, issueBody){
  var data = {
    'title': issueTitle,
    'body': issueBody
  };
  // alert('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues')
  var postData = $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + tokenHolder);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
    .fail(handleError)
};

function handleResponse(response) {
  $('#issue').append(response["title"]);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

var bindSubmitButton = function() {
  // call functions here
  $('#submit').click(function() {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
  });
};

$(document).ready(function(){
  bindSubmitButton();
});
