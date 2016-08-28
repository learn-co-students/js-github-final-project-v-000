$(function(){
  submitForm()
});

function GithubInteractor(token) {
  // creates a GithubInteractor object
  this.token = token;
}

function submitForm() {
  // should call createIssue();
  var repoName = $("#repoName").val();
  var repoOwner = $("#repoOwner").val();
  var title = $("#title").val();
  var body = $("#body").val();

  $("submit").on("click", function(){
    createIssue(repoName, repoOwner, title, body);
  });
};

function createIssue(repoName, repoOwner, title, body) {
  // should make an Ajax POST request to the Github API
  // POST /repos/:owner/:repo/issues
  var token = "f8d2f557c4ba9f702ad4a055c47defb414007626";
  var interactor = new GithubInteractor(token)
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues"

  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + interactor.token
    },
    data: JSON.stringify(data),
    success: function(response) {
      handleResponse(response);
    },
    error: function(XHR, textStatus, error) {
      handleError(XHR, textStatus, error);
    }
  });
};


function handleResponse(response) {
  //Once the form has been submitted, you'll want to add a link
  //to the page to enter a repo name
  $("#issue").html('<a href="' + response.html_url +'">' + response.title + '</a>')
};

function handleError(XHR, textStatus, errorThrown) {
  //If the POST request fails, the function should print out
  // Post error: error_nameto the console.
  console.log("Post error: " + errorThrown);
};
