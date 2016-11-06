$(document).ready(function(){
  submitForm();
})

function submitForm() {
  $('form').on("submit", function (event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
  //call other methods here to process the data
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
  console.log("There was an error creating your issue!" + error);
}

function createIssue() {
  const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/' + 'issues';
  const token = new GithubInteractor("34a968e3319d7123c25f3bb656b660fd54adc25b");

  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: url,
    type: POST,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data),
  }).done(handleResponse).fail(handleError);
};
