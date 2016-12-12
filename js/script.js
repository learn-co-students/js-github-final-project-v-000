function GithubInteractor(token) {
    this.token = (typeof token !== 'undefined') ? token : 'ed2d1e8f34f250e347791f0d9e215c775e320379'
}

function handleResponse(data){
  $('#issue').append(data.title);
}

function handleError(xht, status, error){
  console.log("Post error: " + error);
}

function createIssue(repoName, repoOwner , issueTitle, issueBody){
  var url = ("https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues");
  $.ajax({
    url: url,
    type: 'POST',
    datatype: 'jsonp',
    data: JSON.stringify({ title: issueTitle, body: issueBody }),
    headers: { Authorization: "ed2d1e8f34f250e347791f0d9e215c775e320379" },
    success: function(data){
      handleResponse(data);
    },
    error: function(xht, status, error){
      handleError(xht, status, error);
    }
  })
}

function submitForm(){
  $('form').on('submit', function(event){
    var name = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(name, owner, title, body);
    event.preventDefault();
  })
}

$(document).ready(function(){
  submitForm();
})
