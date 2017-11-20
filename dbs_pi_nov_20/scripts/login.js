var ip2="http://10.50.2.179:8081";

function login_response() {
	//alert("in login respons status : "+httpRequest.readyState);
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        window.location.href="http://localhost/dbs_pi_nov_20/api.html";
        //orders_search_response_table(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  function login() {
	httpRequest = new XMLHttpRequest();
	    if (!httpRequest) {
	      alert('Giving up :( Cannot create an XMLHTTP instance');
	      return false;
	    }
	    httpRequest.onreadystatechange = login_response;
	    var name=document.getElementById("id").value;
		var password=document.getElementById("password").value;
	    
	    if(name.length<=0 || password.length<=0){
	    	alert("Invalid login credentials");
	    	window.location.href="http://localhost/dbs_pi_nov_20/";
	    }
	    else{
	    	par="username="+name+"&password="+password;
	    	var request=ip2+"/users/login";
	    	  
	        httpRequest.open('POST', request,true);
	        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        httpRequest.send(par);
	    }

	    
	  }