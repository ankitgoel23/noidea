var username ="";
function send_message(message){
    var prevState = $("#container").html();
    //console.log(prevState.length);
    if(prevState.length > 9){
        prevState = prevState +"<br>";
    }
    else{
        prevState =""
    }
    $("#container").html(prevState +"<span class = 'current_message'>" +"<span class ='bot'>Chatbot: </span>" +message+"</span>");
    //$("#container").html("<span class ='bot'>Chatbot: </span>"+message);
    $(".current_message").hide();
    $(".current_message").delay(500).fadeIn();
    $(".current_message").removeClass("current_message");
}
function get_username(){
    send_message("Hello! What is your name?");
}
function ai(message){
    if(username <3){
        username = message;
        send_message("Nice to meet you "+username+". How are you?");
    }
    else if(message.toLowerCase().indexOf("how are you")>=0){
        send_message("Thanks, I am good!");
    }else{
        $.ajax({
            url:'/products',
            contentType: 'application/json',
            data: { 
                ajaxid: 4, 
                UserID: 'UserID',
                EmailAddress: 'EmailAddress',
                mes:message
            },
            success: function(data){
                send_message(data);
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
}
        // pre-submit callback 

$(function(){
    get_username();
    $("#textbox").keypress(function(event){
       if(event.which == 13){
           if($("#enter").prop("checked")){
               $("#send").click();
               event.preventDefault();
           }
       } 
    });
    $("#send").click(function(){
        var newMessage = $("#textbox").val();
        var userName = "<span class ='username' >You: </span>"
        $("#textbox").val("");
        var prevState = $("#container").html();
        //console.log(prevState.length);
        if(prevState.length > 9){
            prevState = prevState +"<br>";
        }
        else{
            prevState =""
        }
        $("#container").html(prevState + userName +newMessage);
        $("#container").scrollTop($("#container").prop("scrollHeight"));
        ai(newMessage);
    })
});
$(document).ready(function() {
    var options = {
        beforeSubmit: showRequest, 
        // pre-submit callback 
        success: showResponse 
        // post-submit callback 
    }; 
    // bind to the form's submit event 
    $('#frmUploader').submit(function () {
        //alert('Uploading is starting.'); 
        $(this).ajaxSubmit(options); 
        // always return false to prevent standard browser submit and page navigation 
        return false; }); 
}); 
function showRequest(formData, jqForm, options) {
            alert('Uploading is starting.'); 
            return true; } 
        // post-submit callback 
function showResponse(responseText, statusText, xhr, $form) { alert('status: ' + statusText + '\n\nresponseText: \n' + responseText ); }
