function createIssue() {

},


function submitForm() {
  makeAjaxRequest(endpoint, success);
},

function makeAjaxRequest(endpoint, success) {
  $.ajax({ url : endpoint, dataType : "jsonp", success: success})
}

