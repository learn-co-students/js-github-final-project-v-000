function GithubInteractor(token) {
	this.token = token;
}

function handleResponse(results) {
	if (results.status !== 201) {
		handleError(results);
	}
	$('#issue').append(results.title);
}

function handleError(results) {
	console.log("Post error: " + results.meta.status + ' ' + results.data.message);
}
function createIssue(repoName, repoOwner, issueTitle, issueBody) {
	
	var data = JSON.stringify({
		title: issueTitle, 
		body: issueBody
	});
	var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
	console.log(url);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: data,
		headers: {
			Authorization: ' 56640ab68452599e337a47a56b20d6714107a4d7'
  		},

	}).done(function(results) {
		console.log(results);
		handleResponse(results);
	});
}

function submitForm() {
	
	$('form').submit(function(event) {
		event.preventDefault();
		var name = $('input#repoName').val();
	var owner = $('input#repoOwner').val();
	var title = $('input#title').val();
	var body = $('input#body').val();
		console.log(name);
		console.log(owner);
		console.log(title);
		console.log(body);
		createIssue(name, owner, title, body)

	});

}

$(document).ready(function() {
	submitForm();
});

//65c545b8db8e9c4cf715e9a3d316fe6317c7ecab

// {
//   "title": "Found a bug",
//   "body": "I'm having a problem with this.",
//   "assignee": "octocat",
//   "assignees": [
//     {
//       "login": "octocat",
//       "id": 1,
//       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
//       "gravatar_id": "",
//       "url": "https://api.github.com/users/octocat",
//       "html_url": "https://github.com/octocat",
//       "followers_url": "https://api.github.com/users/octocat/followers",
//       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
//       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
//       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
//       "organizations_url": "https://api.github.com/users/octocat/orgs",
//       "repos_url": "https://api.github.com/users/octocat/repos",
//       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
//       "received_events_url": "https://api.github.com/users/octocat/received_events",
//       "type": "User",
//       "site_admin": false
//     }
//   ],
//   "milestone": 1,
//   "labels": [
//     "bug"
//   ]
// }
