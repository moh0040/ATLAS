//////////////////////Get name///////////////////////////////////////////
$(function() {
	$.ajax({
   		type: 'GET',
   		url: 'http://gate.atlascon.cz:9999/rest/a/listNames',
   		success: function(data) {
   			for (var i = 0; i < data.length; i++) {
     		$("#tbl2").append("<option>"+data[i]+"</option>");
     		}
   		},
   	  	error: function() {
        alert('error loading listNames!');
    	},
	});
//////////////////////Get name space///////////////////////////////////////////
	$('input#get').click(function(){
		var middle = $('#tbl2 :selected').text(); 
		$.ajax({
			type: 'GET',
			url:'http://gate.atlascon.cz:9999/rest/a/'+middle+'/namespace',
			success:function(data2){
				$('#text').html(data2);
			},
			error: function() {
	        	alert('error loading Name Space!');
	    	},
		});
	});
//////////////////////////post(name and namespace)/////////////////////////////////////////////
 	$('#add-order').on('click', function() {
	 	var name = $('#name').val();
	 	var namespace = $('#namespace').val();
    	$.ajax({
      		type: 'POST',
      		url: 'http://gate.atlascon.cz:9999/rest/a/'+ name+"/"+namespace ,
      		contentType: "application/json",
      		success: function(newOrder) {
			console.log("Data added!", newOrder);
      		},
      		error: function() {
	        	alert('error in Posting data to server!');
	    	},
    	});
	});
});




