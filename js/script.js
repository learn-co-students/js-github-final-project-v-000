function GithubInteractor(token){
	this.token = token;
}

function submitForm(){
	var name = $('#repoName').val();
	var owner = $('#repoOwner').val();
	var title = $('#title').val();
	var body = $('#body').val();
	
	createIssue(name, owner, title, body);
	event.preventDefault();
}


var inter = new GithubInteractor(token);

function createIssue(name, owner, title, body){
	var path = 'https://api.github.com/repos/' + owner + '/' + name + '/issues';
	console.log(path);

	$.ajax({
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', "token " + token);
		},
		url: path,
		type: 'POST',
		data: JSON.stringify({
			title: title,
			body: body
		})
	})
	.done(handleResponse)
	.fail(handleError)
}

function handleResponse(response){
	console.log(response);
	var a = $('<a>').attr('href', response.html_url).text(response.title)
	$('#issue').append(a);
}

function handleError(xhr, status, error){
 console.log('Post error: ' + error);
}

$(document).ready(function(){
	$("input[type='submit']").click(function(event){
		submitForm();
	});
});