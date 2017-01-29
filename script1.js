$(function() {



var $name=$('#Name');
var $namesp=$('#NameSpace');
//////////////////////////////////////////Get name
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
///////////////////////////////////////////////////Get name space
  $('#tbl').on("change", function() {
        var middle =$("#tbl").val();
		$.ajax({
			type: 'GET',
			url:'http://gate.atlascon.cz:9999/rest/a/'+middle+'/namespace',
			success:function(data2){
     		    document.getElementById('tbl_S').value = data2;
			    $('#note4').html( "<span style=color:#F5F5F5;>"+ data2 +"</span>  has been selected as NameSpace of Application....");
			},
			error: function() {
			    $('#note5').html('error loading Name Space!');
	    	},
		});
	});
///////////////////////////////////////////////////disable and enable submit button

    var $input = $('#Name,#NameSpace'),
    $register = $('.button6');

    $register.attr('disabled', true);
    $input.keyup(function() {
        var trigger = false;
        $input.each(function() {
            if (!$(this).val()) {
            trigger = true;
            }
        });
        trigger ? $register.attr('disabled', true) : $register.removeAttr('disabled');
    });


////////////////////////////////////////////////////////////////////post(name and namespace)
 	$('.button6').on('click', function() {

var order =
            {
                "put": {
                    "tags": ["apps"],
                    "operationId": "createApp",
                    "parameters": [{
                        "name": $name.val(),
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }, {
                        "name": $namesp.val(),
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }],
                    "responses": {
                        "default": {
                            "description": "successful operation"
                        }
                    }
                }
            };



            var a =$name.val();
            var b=$namesp.val();

       if (confirm('Do you sure ?')) {
       	$.ajax({
         		type: 'PUT',
         		url: 'http://gate.atlascon.cz:9999/rest/a/'+a+'/'+b,
         		data:order,
         		contentType: "application/json",
         		success: function(data4) {



                				var id1=order.put.parameters[0].name;
                				 $("#tbl").append("<option>"+id1+"</option>");


                				//var id2=order.put.parameters[1].name;
                				//$("#name").append(id2);


         		},
         		error: function() {


   	    	},
       	});
       };
   });


////////////////////////////////////////end
});

