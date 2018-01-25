
function GithubInteractor(token) {
  this.token = token

}

var createIssue = function(name, owner, title, body) {

  var name = name
  var owner = owner
  var title = title
  var body = body
  var newurl = "https://api.github.com/repos/" + owner + '/' + name + '/issues'
  
  var issueData = {"title": title,
  "body": body,
  }
  var idata = JSON.stringify(issueData)
  debugger
  var token = new GithubInteractor('eeb850c0aef9a4c71342fc362a4c3590231e2d49').token
  $.ajax({
    url: newurl,
    type: 'POST', 
    dataType: 'json', 
    data: idata,
    headers: {
    'Authorization': 'token ' + token
  }
   })
  .done(handleResponse)
  .fail(handleError)



  }


var handleResponse = function(data) {

  $('#issue').html(data.title)

}


var handleError = function(callback) {

  console.log('Post error: Unauthorized')
}

var submitForm = function() {

  
  

  $("#submit").on('click', function(e){
    event.preventDefault()
  var name = $('#repoName').val()
  var owner = $('#repoOwner').val()
  var title = $('#title').val()
  var body = $('#body').val()
    createIssue(name, owner, title, body)
  })

}






$(document).ready(function(){

 submitForm()
});
