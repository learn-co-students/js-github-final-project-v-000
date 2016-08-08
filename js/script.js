// function that submits form, and on submit it should call createIssue
// 'use strict';

// class GithubInteractor{
//   constructor(token) {
//     this.token = token;
//   }

  

// }
$(document).ready(function() {
  submitForm();
});



function submitForm() {
  $('form').on("submit", function(event) {
    var repoName  = $("input#repoName").val(),
        repoOwner = $("input#repoOwner").val(),
        title     = $("input#title").val(),
        body      = $("input#body").val();

    // var interactor = new GithubInteractor("6fbe62e9d1f8c5b93eca40363899eac7533d891a");
    debugger
    // interactor.prototype.createIssue(repoName, repoOwner, title, body);
    createIssue(repoName, repoOwner, title, body);
  });

}


function GithubInteractor(token) {
  this.token = token;

  handleResponse = function(response) {
    debugger

    $.each(response, function(index, element) {
      $('#issue').append(
          $('<a>').text(element.html_url),
          $('<h2>').text(element.title),
          $('<p>').text(element.body)
        )
    })
  }
  
}

var createIssue = function(repo, owner, title, body) {
    debugger
    $.ajax({
      url: 'https://api.github.com/repos/'+owner+'/'+repo+'/issues',
      type: 'POST',
      data: JSON.stringify({ 
        title: title,
        body: body
      }),
      success: function(response) {
        debugger
        handleResponse(response)
      }
      // dataType: 'json',
    //   // headers: {
    //   //   Authorization: 'token '+this.token;
    //   // },
    });
  }

// var createIssue = function(repo, owner, title, body) {
//   // body...
//   $.ajax({
//     url: 'https://api.github.com/repos/'+owner+'/'+repo+'/issues'
//     type: 'POST',
//     dataType: 'json',
//     headers: {
//       Authorization: 'token '+this.token;
//     },
    
//   })

// function GithubInteractor(token) {
//   this.token = token;





// }
