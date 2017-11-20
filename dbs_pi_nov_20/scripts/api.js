function test_fn(){
	alert("clicked button");
	makeRequest();

}
function add_listeners(){
	document.getElementById("1").addEventListener("click", show_orders_form);
	document.getElementById("5").addEventListener("click", show_requests_form);
	document.getElementById("6").addEventListener("click", show_goods_form);
}
add_listeners();
