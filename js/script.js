var token = "7b8eed31d1b6354640410c70eb536b7ac5666ea3"
var baseUrl = "https://api.github.com/repos/"


$(document).ready(function() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		getIssue();
	});
});


function GithubInteractor(token) {
	this.token = token
}



function createIssue(repoName, repoOwner, title, body, token) {
	$.ajax({
		url: baseUrl + repoOwner + '/' + repoName + '/issues',
		type: "POST",
		dataType: 'json',
		data: JSON.stringify({
			title: title,
			body: body
		}),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "token " + token); 
		},
		success: function(response) {
			handleResponse(response);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		handleError(jqXHR, textStatus, errorThrown);
	});
};

function getIssue() {
	var repoName = $("#repoName").val();
	var repoOwner = $("#repoOwner").val();
	var title = $("#title").val();
	var body = $("#body").val();
	createIssue(repoName, repoOwner, title, body, token);
};

function handleResponse(response) {
	$('#issue').append('<div><a href="' + response.html_url + '">' + response.title + '</a></div>');
}

function handleError(jqXHR, textStatus, errorThrown) {
	console.log("Post error: " + errorThrown);
}