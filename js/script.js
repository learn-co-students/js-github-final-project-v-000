function createIssue(repoName, repoOwner, title, body) {
  var issue = {
    'title': title,
    'body': body
  }

  var baseUrl = 'https://github.com/'
  var url = baseUrl + repoOwner + repoName + '/issues'

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: { Authorization: 'c9ccc98c97c3745242a7590445ac1cf941a0bfce' },
    data.JSON.stringify(issue)
  }).fail(function(error) {
    console.log('Post error: ' + error);
  });

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
