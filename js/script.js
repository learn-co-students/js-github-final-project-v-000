function createIssue(repoName, repoOwner, title, body, token) {
  var issue = {
    'title': title,
    'body': body
  }

  var baseUrl = 'https://github.com/repos/';
  var url = baseUrl + repoOwner + "/" + repoName + '/issues';

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: { Authorization: 'token ' + token}, //where do i put in the token???
    data.JSON.stringify(issue)
  })
  .done(success)
  .fail(function(error) {
    console.log('Post error: ' + error);
  });

}

function success(response) {
  var html = '<a href="' + response.html_url + '">' + response.title + '</a>';
  $('#issue').append(html);
}

function bindSubmitButton() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    event.preventDefault();

    createIssue(repoName, repoOwner, title, body);
  });
}

$(document).ready(function() {
  bindSubmitButton;
});
