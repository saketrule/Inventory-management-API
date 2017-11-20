var ip2 = "10.50.2.179:8081"

function show_requests_form(){
	//alert("jhii0");
	var form="<center><h2>Request Search Form<h2></center><form id='display_requests_search_form'>GoodsId<br><input type='text' name='goodsid' id='r_goodsid'>UserId<input type='text' name='userid' id='r_userid'><label id='index_login_button' onclick='requests_search()'>SUBMIT</label></form>";
	document.getElementById("mid").innerHTML = form;
}

  function requests_search() {
	httpRequest = new XMLHttpRequest();
	    if (!httpRequest) {
	      alert('Giving up :( Cannot create an XMLHTTP instance');
	      return false;
	    }
	    httpRequest.onreadystatechange = requests_search_response;
	    var goodsid=document.getElementById("r_goodsid").value;
	    var userid=document.getElementById("r_userid").value;
	    var par="";
	    if(goodsid.length>0){
	    	par=par+"&goodsid="+goodsid;
	    }
	    if(userid.length>0){
	    	par=par+"&userid="+userid;
	    }
	    if(par.length>0){
	    	par = "?"+par.substr(1,par.length);
	    }
	    var request="http://"+ip2+"/goods_requested/search"+par;
	    //alert(request);
	    httpRequest.open('GET', request,true);
	    httpRequest.send();
	  }

function requests_search_response() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        //alert(httpRequest.responseText);
        requests_search_response_table(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

function requests_search_response_table(json_string){
	var json=JSON.parse(json_string);
	var table="<table id=functionalities><tr>";
	var keys = ['id','GoodsId','UserId','Quantity','Status'];
	for(var i=0;i<keys.length;i++){
		table+="<th>"+keys[i]+"</th>";
	}
	table+="</tr>";
	for (var i = 0; i < json.length; i++) {
		var rows="";
		for(var key=0;key<keys.length;key++){
			rows+="<td>"+json[i][keys[key]]+"</td>";
		}
		table+="<tr>"+rows+"</tr>";
	}
	table+="</table>";
	table+="<div id='requests_update_button'><button id='index_login_button' onclick='shift_requests_update_form()'>UPDATE</button><div>";
	//alert(table);
	document.getElementById("mid-right").innerHTML=table;
}

function shift_requests_update_form(){
	document.getElementById("mid-right").style.float="left";
	document.getElementById("mid").style.float="right";
	show_requests_update_form();
}

function show_requests_update_form(){
	table="<center><h2>Update Goods Requested</h2></center><form id='requests_update_form'>ID<br><input type='text' name='id'>GoodsId<input type='text' name='goodsid'>UserId<input type='text' name='userid'>Quantity<input type='text' name='quantity'>Status<input type='text' name='status'><label id='index_login_button' onclick='requests_update_post()'>SUBMIT</label></form>";
	document.getElementById("mid").innerHTML=table;
}

function requests_update_post() {
	
	var updateRequest = new XMLHttpRequest();
    if (!updateRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    updateRequest.onreadystatechange = requests_update_response;
    //geting elements from form
    var form_elements=document.getElementById("requests_update_form");
    var param="";
    var parm_name=['id','goodsid','userid','quantity','status'];
     for(var i=0;i<5;i++){
      	if(form_elements[i].value.length>0){
      		param+="&"+parm_name[i]+"="+form_elements[i].value;
      	}
      	//alert(form_elements[i].value);
      }
      if(param.length>0){
      	param=param.substring(1,param.length);
      }
      //alert(param);
	  var request="http://"+ip2+"/goods_requested/update";
	   
	  updateRequest.open('POST', request,true);
	  updateRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  updateRequest.send(param);
	}

function requests_update_response() {
    if (updateRequest.readyState === XMLHttpRequest.DONE) {
      if (updateRequest.status === 200) {
      	alert("got response");
        alert(updateRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
