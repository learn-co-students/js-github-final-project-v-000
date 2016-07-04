// jQuery(document).ready(function() {
//
//   // function handleResponse();
//
//   var repoName = $("#repoName").val()
//
//   var repoOwner = $("#repoOwner").val()
//
//   var issueTitle = $("#title").val()
//
//   var issueBody = $("#body").val()
// });


function GithubInteractor(token){
  this.token = token
};

function createIssue(repoName, repoOwner, issueTitle, issueBody){
  var data = {}
      data.title = issueTitle
      data.body = issueBody
      // debugger
  $.ajax({
    url: 'https://api.github.com/repos/blake41/temp/issues',
    type: 'POST',
    dataType: 'JSON',
    data: JSON.stringify(data),
    success: function(success){
      handleResponse(success)
    },
    error: function(error) {
      handleError(error)
    }

  })
}
function handleResponse(success){
  event.stopPropagation();
  debugger
  $('#issue').append(success.title)

}

function handleError(error){
  console.log("Post error: Unauthorized")
}

//
// $("#submit").on('click', function(event){
//   debugger
//
//   var repoName = $("#repoName").val()
//
//   var repoOwner = $("#repoOwner").val()
//
//   var issueTitle = $("#title").val()
//
//   var issueBody = $("#body").val()
//
//   createIssue(repoName, repoOwner, issueTitle, issueBody)
//
// })
