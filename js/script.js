$(document).ready(function(){
  submitForm();
})

function submitForm() {
  $('form').on('submit', function(event){
    const repoName = $('#repoName').val();
    const repoOwner = $('#repoOwner').val();
    const title = $('#title').val();
    const body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

function GithubInteractor(token) {
  this.token = token;
}

// function handleResponse(error) {
//   $("#issue").text(error.title);
// }

function handleResponse(parseJSON) {
  const link = '<a href="'+ parseJSON.html_url +'">' + parseJSON.title +'<a>';
  $('#issue').append(link);
}

function handleError(error) {
  console.log("Post error: Unauthorized");
}

function createIssue (repoName, repoOwner, title, body) {
  const token = new GithubInteractor("874f2945674236f14c88541ad6f8f589ecf3b7ae");
  const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  const data = {
    title: title,
    body: body
  }
  // $.getJSON is the equivalent of $.get or $.ajax - ajax is the parent method.
  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}