//////////////////////Get name///////////////////////////////////////////
$(function() {
	$.ajax({
   		type: 'GET',
   		url: 'http://gate.atlascon.cz:9999/rest/a/listNames',
   		success: function(data) {
   			for (var i = 0; i < data.length; i++) {
     		$("#tbl").append("<option>"+data[i]+"</option>");
     		}
     		$('#note2').html( "Name of Applications are loaded....");
   		},
   	  	error: function() {
   	     $('#note3').html('error loading listNames!');
    	},
	});
//////////////////////Get name space///////////////////////////////////////////

$(document).ready(function(e) {
  $('#tbl').on("change", function() {
        var middle =$("#tbl").val();
		$.ajax({
			type: 'GET',
			url:'http://gate.atlascon.cz:9999/rest/a/'+middle+'/namespace',
			success:function(data2){
				$('#text').html("<h3>"+data2 +"</h3>");
				$('#note4').html( "<span style=color:#F5F5F5;font-weight:bold>"+ data2 +"</span>  has been selected as NameSpace of Application....");
			},
			error: function() {
				$('#note5').html('error loading Name Space!');
	    	},
		});
	});

  });

//////////////////////////post(name and namespace)/////////////////////////////////////////////
 	$('#add-applic').on('click', function() {
	 	var name = $('#Name').val();
	 	var name_space = $('#NameSpace').val();
    	$.ajax({
      		type: 'PUT',
      		url: 'http://gate.atlascon.cz:9999/rest/a/'+ name+"/"+name_space ,
      		contentType: "application/json",
      		success: function(NewApp) {
			$('#note6').html( NewApp + " are succcessfully sended to server...");
      		},
      		error: function() {
      		$('#note7').html("Error in Posting data to server!");
	        	
	    	},
    	});
	});





});

