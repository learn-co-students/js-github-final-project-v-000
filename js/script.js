function bindSubmitButton() {
  $(':submit').on('click', function() {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
  });
}

$(document).ready(function() {
  bindSubmitButton;
});
