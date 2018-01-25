function submitForm() {
  $('form').on("submit", function (e) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  })
}

function GithubInteractor(token) {
  this.token = token;
}

//Once the form has been submitted, you'll want to add a link to the page to enter a repo name
function handleResponse(parsedJSON) {
  const link = '<a href="'+ parsedJSON.html_url +'">' + parsedJSON.title +'<a>';
  $('#issue').append(link);
}

function handleError(error) {
  console.log('Post error: Unauthorized');
}

function createIssue(repoName, repoOwner, title, body) {
  const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/' + 'issues';
  const token = new GithubInteractor("425c68360e6007a0952fc6c1e73bbb1d8be501bb");

  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data),
  }).done(handleResponse).fail(handleError);
}

$(document).ready(function(){
  submitForm();
});
