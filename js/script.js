function submitForm() {
  $('input[type="submit"]').on('click', function(event) {
    var repo = $('#repoName').val();
    var owner = $('repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(owner, repo, title, body);
    event.preventDefault();
  })
}

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("a641ed83a29390239096cce57af1f30c56d37ff7")

function handleResponse(response) {
  var url = response.html_url;
  var title = response.title;

  $('#issue').append($('<a>').attr('href', url).text(title));
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

//make ajax POST requent
function createIssue(owner, repo, title, body) {
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/repos/' + repo + '/' + owner + '/issues',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data),
  }).done(handleResponse).fail(handleError);
}


