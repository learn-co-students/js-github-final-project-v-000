function GithubInteractor(token) {
  this.token = token
}

function createIssue(repoName, repoOwner, title, body) {
  var interactor = new GithubInteractor("3e4d8cf6298d6a54482a6d0b63753d3ffddc1281");
  var url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: `token ${interactor.token}`
    },
    data: JSON.stringify({
      title: title,
      body: body
    })
  }).done(handleResponse).fail(handleError);
}

function bindSubmitButton() {
  $(':submit').click(function(e) {
    e.preventDefault();
    createIssue($('#repoName').val(), $('#repoOwner').val(), $('#title').val(), $('#body').val());
  });
};

function handleResponse(response) {
  $('#issue').append($('<a>').attr("href", response.url).text(response.title))
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown);
}

$(document).ready(function(){
  bindSubmitButton();
});
