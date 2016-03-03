'use strict';

function GithubInteractor(token){
  this.token = token;
};

var interactor = new GithubInteractor('ecd031bcfe2e362bea04cf06142421557f2a3c36');

function Issue(url, title, body){
  this.url = url, this.title = title, this.body = body;
};

Issue.prototype.displayIssue = function(selector){
  var link = $('<a>').attr('href', this.url).text(this.title);
  selector.append(link);
}

function handleResponse(response){
  var issue = new Issue(response.html_url, response.title, response.body);
  issue.displayIssue($('#issue'));
};

function handleError(jqXHR, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
};

function createIssue(repoName,repoOwner, title, body){
  var data = {title: title, body: body}
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.overrideMimeType('Authorization', 'token ' + interactor.token );
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
};
