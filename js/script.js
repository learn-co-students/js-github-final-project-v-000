function GithubInteractor(token){
  // set this.token and this.apiBaseUrl
  this.token = token
  this.apiBaseUrl = "https://api.github.com/repos/"
}

var interactor = new GithubInteractor("f0eb94d3fecced82d3072a347db2df55c30f3715")

function createIssue(repoName, repoOwner, title, body){
  // this function should make an Ajax POST request to the github API create issue end point
  // this endpoint should create an issue based on the info in the form.
  // when form is submitted
  // - add a link to the page to enter a repo name (thus we don't want to refresh on form
  //   submission)
  var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";
  debugger;
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function submitForm() {
  // needs to submit the form 
  // should call createIssue
  $('form').on('submit', function(event){
    // take form data and turn into JS object
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    debugger;
    // call createIssue and pass in repoName, repoOwner, title, body from form
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

function handleResponse(response) {
  debugger;
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown)
}

// token
// f0eb94d3fecced82d3072a347db2df55c30f3715