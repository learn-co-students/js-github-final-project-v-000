function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor("");


function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var postInfo = {
    title: title, 
    body: body
  };
  $.ajax({
    url: url,
    type: "POST", 
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(postInfo)
  }).done(handleResponse).fail(handleError);
   // $("#load-cars").on("click", function(event) {
   //  fetchJSON();
   //  event.preventDefault();
}

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);

    event.preventDefault();
  });
}

function handleError(error) {
  var alert = error.statusText;
  if (alert == undefined) {
    alert = "Unauthorized"
  };
  console.log('Post error: ' + alert)
}

function handleResponse(response) {
  var issue = '<a href="'+response.html_url+'">'+response.title+'</a>';
   $('#issue').html(issue);
}

$(document).ready(function() {
  submitForm();
});