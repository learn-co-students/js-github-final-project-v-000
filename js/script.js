function GithubInteractor(token){
	this.token=token;
}

var interactor= new GithubInteractor("");

function handleError(error){
	var message=error.statusText;
	if(message==undefined) {message='Unauthorized'};
	console.log('Post error: '+message);
	//debugger;
};

function handleResponse(response){
	//debugger;
	var html='<a href="'+response.html_url+'">'+response.title+'</a>';
	$('#issue').html(html);
};

function createIssue(repoName, repoOwner, title, body){
	console.log("creating issue...");
	var postUrl='https://api.github.com/repos/'+repoOwner+'/'+repoName+'/issues';
	var postData={title: title, body: body};
	//debugger;
	$.ajax({
		url:postUrl, 
		type: 'POST',
		beforeSend: function(xhr) {
    		xhr.setRequestHeader("Authorization", "token "+interactor.token);
    	}, 
    	data: JSON.stringify(postData)
	}).done(handleResponse).fail(handleError);
}

function bindSubmit(){
	$('form').submit(function(event){
		event.preventDefault();
		var name=$('#repoName').val();
		var owner=$('#repoOwner').val();
		var name=$('#title').val();
		var name=$('#body').val();
		createIssue(name, owner, title, body);
	});
}




$( document ).ready(function() {
	bindSubmit();
    console.log( "ready!" );
});