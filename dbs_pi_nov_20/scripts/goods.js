var ip2 = "10.50.2.179:8081"

function show_goods_form(){
	var form="<h2> Search Inventory </h2><form id='display_goods_search_form'>Inventory Name<br><input type='text' name='name' id='g_name'>Sport<input type='text' name='sport' id='g_sport'><label onclick='goods_search()'>SUBMIT</label></form>";
	document.getElementById("mid").innerHTML = form;
}

  function goods_search() {
	httpRequest = new XMLHttpRequest();
	    if (!httpRequest) {
	      alert('Giving up :( Cannot create an XMLHTTP instance');
	      return false;
	    }
	    httpRequest.onreadystatechange = goods_search_response;
	    var goodsid=document.getElementById("g_name").value;
	    var userid=document.getElementById("g_sport").value;
	    var par="";
	    if(goodsid.length>0){
	    	par=par+"&name="+goodsid;
	    }
	    if(userid.length>0){
	    	par=par+"&sportname="+userid;
	    }
	    if(par.length>0){
	    	par = "?"+par.substr(1,par.length);
	    }
	    var request="http://"+ip2+"/goods/search"+par;
	    alert(request);
	    httpRequest.open('GET', request,true);
	    httpRequest.send();
	  }

function goods_search_response() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        goods_search_response_table(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

function goods_search_response_table(json_string){
	var json=JSON.parse(json_string);
	var table="<table id=functionalities><tr>";
	var keys = ['id','Name','SportName','Quantity_Total','Quantity_available'];
	for(var i=0;i<keys.length;i++){
		table+="<th>"+keys[i]+"</th>";
	}
	table+="</tr>";
	for (var i = 0; i < json.length; i++){
		var rows="";
		for(var key=0;key<keys.length;key++){
			rows+="<td>"+json[i][keys[key]]+"</td>";
		}
		table+="<tr>"+rows+"</tr>";
	}
	table+="</table>";
	table+="<div id='goods_update_button'><button onclick='shift_goods_update_form()'>UPDATE</button><div>";
	alert(table);
	document.getElementById("mid-right").innerHTML=table;
}

function shift_goods_update_form(){
	document.getElementById("mid-right").style.float="left";
	document.getElementById("mid").style.float="right";
	show_goods_update_form();
}

function show_goods_update_form(){
	table="<h2>Update Inventory</h2><form id='goods_update_form'>ID<br><input type='text' name='id'>Inventory Name<input type='text' name='goodsname'>Sport<input type='text' name='sportname'>Total Total Units<input type='text' name='totalquantity'>Units Available<input type='text' name='availquantity'><label onclick='goods_update_post()'>SUBMIT</label></form>";
	document.getElementById("mid").innerHTML=table;

}

function goods_update_post() {
	alert("goods update called");
	var updateRequest = new XMLHttpRequest();
    if (!updateRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    updateRequest.onreadystatechange = goods_update_response;
    //geting elements from form
    var form_elements=document.getElementById("goods_update_form");
    var param="";
    var parm_name=['id','goodsname','sportname','totalquantity','availquantity'];
     for(var i=0;i<5;i++){
      	if(form_elements[i].value.length>0){
      		param+="&"+parm_name[i]+"="+form_elements[i].value;
      	}
      	//alert(form_elements[i].value);
      }
      if(param.length>0){
      	param=param.substring(1,param.length);
      }
      alert(param);
	  var request="http://"+ip2+"/goods/update";
	   
	  updateRequest.open('POST', request,true);
	  updateRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  updateRequest.send(param);
	}

function goods_update_response() {
    if (updateRequest.readyState === XMLHttpRequest.DONE) {
      if (updateRequest.status === 200) {
      	alert("got response");
        alert(updateRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
