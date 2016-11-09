function GithubInteractor(token) {
  this.token = token;
}

var createIssue = function(repoName, repoOwner, issueTitle, issueBody){
  var data = {
    'public':   true,
    'description': description,
    'files': {}
  };

  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    // some action
  });
};
