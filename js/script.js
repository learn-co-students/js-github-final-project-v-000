var endpoint = "/repos/" + owner + "/" + name + "/issues"


function createIssue(name, owner, title, body){} 
 var data = {
  "title": title,
  "body": body,
  "assignee": owner,
  }

  $.ajax({
    url: endpoint,
    type: "POST",
    dataType: "json"
    headers: {
    Authorization: 'token ' + token
     },
     data: JSON.stringify(data)
   }).done(function(response){  });
};

function submitForm(){
  $('form').on('submit', function(event){
    var name = $('#repoName').val() ;
    var title = $('#title').val();
    var body = $('#body').val();
    var owner = $('#repoOwner').val();
    createIssue(name, owner, title, body);
    event.preventDefault();
  });

 
}

