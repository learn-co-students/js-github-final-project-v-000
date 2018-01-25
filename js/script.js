var authToken = "7b8eed31d1b6354640410c70eb536b7ac5666ea3"


$(document).ready(function() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		getIssue();
	});
});


function GithubInteractor(token) {
	this.token = token
	this.baseUrl = "https://api.github.com/repos/"
}

function Issue(issueUrl, title, body) {
	this.issueUrl = issueUrl
	this.title = title
	this.body = body
}

Issue.prototype.renderIssue = function(selector) {
	var link = $('<a>')
	.attr('href', this.issueUrl)
	.text(this.title);
	selector.append(link);
}

var interactor = new GithubInteractor(authToken)

function createIssue(repoName, repoOwner, title, body) {
	var data = { title: title, body: body }
	$.ajax({
		url: interactor.baseUrl + repoOwner + '/' + repoName + '/issues',
		type: "POST",
		dataType: 'json',
		data: JSON.stringify(data),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "token " + interactor.token); 
		}
	})
	.done(handleResponse)
	.fail(handleError);
}

function getIssue() {
	var repoName = $("#repoName").val();
	var repoOwner = $("#repoOwner").val();
	var title = $("#title").val();
	var body = $("#body").val();
	createIssue(repoName, repoOwner, title, body);
};

function handleResponse(response) {
	var issue = new Issue(response.html_url, response.title, response.body);
	issue.renderIssue($('#issue'));
	// $('#issue').append('<div><a href="' + response.html_url + '">' + response.title + '</a></div>');
}

function handleError(jqXHR, textStatus, errorThrown) {
	console.log("Post error: " + errorThrown);
}