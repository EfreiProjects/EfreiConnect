window.onload = function() {
  var webView = document.getElementById("webView");
  var load = true;

  webView.addEventListener("loadstart", function(){
    messageDisplay("Loading...", "rgb(109, 202, 236)");
  });

  webView.addEventListener("loadstop", function(){
    if(load){
      messageDisplay("Please enter your id and password", "rgb(182, 219, 73)");
      document.getElementById('inputs').style.display = 'block';
    }
    document.getElementById('submit').addEventListener("click", function(){
      var login = document.getElementsByName('login')[0].value;
      var password = document.getElementsByName('password')[0].value;
      var error = null;
      var message = null;
      if(login || password){
        var toExecute = "document.getElementsByName('login')[0].value='"+login+"'";
        webView.executeScript({ code: toExecute });
        toExecute = "document.getElementsByName('password')[0].value='"+password+"'";
        webView.executeScript({ code: toExecute });
        webView.executeScript({ code: "document.getElementById('logonForm_connect_button').click()" });
        window.setTimeout(function(){
          webView.executeScript({ code: "document.getElementById('feedbackForm_caution_text').innerHTML" }, function(result){
            if(result[0] == 'CAUTION: closing this window will disconnect you.')
              messageDisplay('You are connected, closing this window will disconnect you.');
          });
          webView.executeScript({ code: "document.getElementById('error_info_value').innerHTML" }, function(result){
            if(result[0] == 'Wrong login or password')
              messageDisplay('Wrong login or password', 'red');
          });
        }, 500);
      }
    });
  });

  webView.addEventListener("loadabort", function(){
    messageDisplay("Ucopia could not be reached, please check your connectivity.", "rgb(255, 121, 121)");
    load = false;
  });

  function messageDisplay(message, color){
    var display = document.getElementById('messageBox');
    display.innerText=message;
    display.style.color = color;
  }
};