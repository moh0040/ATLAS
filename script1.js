$(function() {
///////////////////////////////////////////////start
var $name=$('#Name');
var $namesp=$('#NameSpace');
var RestApi1='http://gate.atlascon.cz:9999/rest/a/';
//////////////////////////////////////////Get nameApp
	$.ajax({
   		type: 'GET',
   		url: RestApi1+'listNames',
   		success: function(data) {
   			for (var i = 0; i < data.length; i++) {
     		    $("#tbl").append("<option>"+data[i]+"</option>");
     		}
   		},
   	  	error: function() {
   	        alert("error to load name of application !");
    	}
	});
/////////////////////////////////////////////////////////////Get name-space
  $('#tbl').on("change", function() {
        var middle =$("#tbl").val();
		$.ajax({
			type: 'GET',
			url:RestApi1+middle+'/namespace',
			success:function(data2){
     		    document.getElementById('tbl_S').value = data2;
			},
			error: function() {
			    alert("error to load name-space of application !");
	    	},
		});
	});
//////////////////////////////////////////////////////////////////////////disable and enable submit button
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
/////////////////////////////////////////////////////////////////////////////////adding new data(post)(name and namespace)
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
                    url: RestApi1+a+'/'+b,
                    data:order,
                    contentType: "application/json",
                    success: function(data4) {
                        var id1=order.put.parameters[0].name;
                        $("#tbl").append("<option>"+id1+"</option>");
                    },
                    error: function() {
                        alert("error to adding new name and name-space of application !");
                    },
                });
            };
            $("#Name").val('');
            $("#NameSpace").val('');
   });
////////////////////////////////////////end
});
