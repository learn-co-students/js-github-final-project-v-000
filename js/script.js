function createIssue() {
  var title = $('#title').val();
  var body = $('#body').val();
  var owner = $('#repoOwner').val();
  var repo = $('#repoName').val();
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues'
  var payload = {
    title: title,
    body: body
  }
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(payload),
    success: function(data) {
      $('#issue').append('<p><a href="' + data.html_url + '">' + data.title + '</a></p>');
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log('Post error: ' + errorThrown);
    },
    headers: {
      Authorization: "token ef140b4635315013863f2efbacd1d6a76de3982d"
    }
  });
}

$(document).ready(function() {
  $('form').on('submit', function(event) {
    createIssue();
    event.preventDefault();
  });
});
