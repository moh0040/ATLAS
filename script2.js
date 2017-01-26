//////////////////////Get name///////////////////////////////////////////
$(document).ready(function(e) {
$(function() {
	$.ajax({
   		type: 'GET',
   		url: 'http://gate.atlascon.cz:9999/rest/s/listSchemaNames',
   		success: function(data) {
   			for (var i = 0; i < data.length; i++) {
     		$("#table_schema").append("<option>"+data[i]+"</option>");
     		}
     		//$('#note2').html( "Name of Applications are loaded....");
   		},
   	  	error: function() {
   	     //$('#note3').html('error loading listNames!');
    	},
	});


  $('#table_schema').on("change", function() {
        var schem =$("#table_schema").val();
    $.ajax({
      type: 'GET',
      url:'http://gate.atlascon.cz:9999/rest/s/listVersions/'+schem,
      success:function(data2){
        for (var i = 0; i < data2.length; i++) {
        $("#table_version").html("<option>"+data2[i]+"</option>");
        }

        //$('#note4').html( "<span style=color:#F5F5F5;font-weight:bold>"+ data2 +"</span>  has been selected as version of Schema....");
      },
      error: function() {
        //$('#note5').html('error loading Name Space!');
        },
    });
  });

  });


//////////////////////////////////////////////////////////////
  $('#table_schema').on("change", function() {
        var schema1 =$("#table_schema").val();

          $('#table_version').on("change", function() {
        var version1 =$("#table_version").val();

              $.ajax({
                type: 'GET',
                url:'http://gate.atlascon.cz:9999/rest/s/original/'+schema1+"/"+version1,
                success:function(data3){
                var str = JSON.stringify(data3, undefined, 4);
                document.getElementById('myTextArea').innerHTML = str;

                  //$('#note4').html( "<span style=color:#F5F5F5;>"+ data2 +"</span>  has been selected as NameSpace of Application....");
                },
                error: function() {
                  //$('#note5').html('error loading Name Space!');
                  },
              });





              });



  });











});

