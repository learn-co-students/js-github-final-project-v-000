
function GithubInteractor(token) {
  this.token = token;
}

function submitForm() {
  $('form').on('submit', function(event) {
      var name = $('#repoName').val();
      var owner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(name, owner, title, body);
      event.preventDefault();
  })
}

function createIssue(repoName, repoOwner, title, body) {

  var interactor = new GithubInteractor("c3530ee51984b4cdfa9e51c07df26f8b258169aa");
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues"
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);

}

function handleResponse(response) {
  var link = response["html_url"];
  var link_title = response["title"];
  console.log("test");
  $('#issue').html($('<a>').attr('href', link).text(link_title))
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

$(document).ready(function() {
  submitForm();
});
