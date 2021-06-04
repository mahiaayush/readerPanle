function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
  $('#restitle').html('');
  var tnum = 1; var arrayOut = [];
  $.each(data.content, function(key, value){
  if ($.inArray(value.name, arrayOut) === -1) {
	  arrayOut.push(value.name);
	  var tstring = value.name;
	  var tlength = 30;
	  var trimmedTitle = tstring.length > tlength ? tstring.substring(0, tlength - 3) + "..." : tstring;
	  $('#restitle').append('<li class="reslink" id="link'+tnum+'" data="'+value.path+'"> '+trimmedTitle+' </li>');
	  tnum++;
  }
  });
}
function closeNav() {
 document.getElementById("mySidepanel").style.width = "0";
}
function pageInit(){
  $("#tatalPages").html($("[class^='ContentPage']").length);
  $("#pagesLengh").html($("[class^='ContentPage']").length);
  $("[class^='ContentPage']").each(function(item, ind){
    let temp  =`<a id="pagesID`+ (item + 1)+`" href="#"><img src="images/img1.png" alt="..." class="img-thumbnail"> <h6>Page `+ (item + 1)+`</h6></a>`;
    $("#pages_thumbs").append(temp)
    $("#pagesID"+ (item + 1)).click(function(){
      let match= $(this).attr('id').match(/\d/gm)[0];
      $("#staticEmail").val(match);
      $('#issueviewWindow').animate({scrollTop:$('.ContentPage'+ match).position().top  }, 'slow');
    });
  });
}

	function runScript(e) {
		//See notes about 'which' and 'key'
		if (e.keyCode == 13) {
			SearchJSON();
			return false;
		}
	}
	var goblValSearch = "";
	var golobalC=1;
	function SearchJSON(){
		openNav();
		$("#collapseTwo").collapse('show');
		$('#result').html('');
		var searchField = $('#searchTxt').val();
		if(searchField === '')  {
			$('#result').html('');
			window.location.href = window.location.origin + window.location.pathname;
			return;
		}
		///////////mark text code////////////////////
		var Contents=$(".issue_contents");
		if(Contents.find("mark").length>0){
			Contents.unmark("mark");
		}
		let mkCount=1; 
		Contents.mark(searchField, { "acrossElements": true, "separateWordSearch": false, "diacritics": false, "frames":true,each: function(node){
			node.setAttribute("data-attribute_id", "markID_"+ mkCount);
			
			mkCount++;
		} });
			
		if(Contents.find("mark").length>0){
			if(goblValSearch == "" || goblValSearch != searchField ){
				goblValSearch = searchField ;
				Contents.find("mark").removeAttr('selected-mark');
				Contents.find("mark").eq(golobalC-1).attr('selected-mark', 'true');
				golobalC ++;
				
			}  else if (goblValSearch == searchField) {
				if(Contents.find("mark").length == golobalC-1){
					golobalC=1;
				}
				Contents.find("mark").removeAttr('selected-mark');
				Contents.find("mark").eq(golobalC-1).attr('selected-mark', 'true');
				golobalC ++;
			}
			var s = document.getElementById('issueviewWindow');
			s.scrollTo(0, Contents.find('mark').offset().top - 250);
		}
		var expression = new RegExp(searchField, "i");
		var matexp = new RegExp(searchField, "gi");
		var num = 0; 
		var arr = [];
		$.each(data.content, function(key, value){
			if (value.name.search(expression) != -1 || value.description.search(expression) != -1) {
			 if(value.name.match(matexp)) arr.push(value.name.match(matexp).length);
			 if(value.description.match(matexp)) arr.push(value.description.match(matexp).length);
			}
		});
		var sum = arr.reduce(function(a, b){ return a + b; }, 0);
		if(sum > 100){
			$('#result').append('<div class="context-box rounded mb-2">Too many results to preview.</div>');
		}else{
			$.each(data.content, function(key, value){
				if (value.name.search(expression) != -1 || value.description.search(expression) != -1){
					num++;	
					var title = value.name;
					var string = value.description;
					var slength = 75;
					var count = 0;
				 if(title.toUpperCase().indexOf(searchField.toUpperCase()) > -1 || string.toUpperCase().indexOf(searchField.toUpperCase()) > -1){
					var newtitle = title.replace(matexp, '<span class=\"highlight-text\"><strong>$&</strong></span>');
					var newstring = string.replace(matexp, '<span class=\"highlight-text\" ><strong>$&</strong></span>'); //id=\"highlight_'+num+'\"
					var count = string.match(matexp).length;
					var length = string.toUpperCase().indexOf(searchField.toUpperCase())+slength;
					var start = string.toUpperCase().indexOf(searchField.toUpperCase());
					var trimmedString = newstring.length > slength ? '..'+newstring.substring(start-10, length - 3) + "..." : newstring;
				 }else{
					var newtitle = title;
					var newstring = string;
					var trimmedString = newstring.length > slength ? newstring.substring(0, slength - 3) + "..." : newstring;
				 }
				$('#result').append('<div tot="'+newstring.length+'" len="'+length+'" st="'+start+'" class="context-box rounded mb-2 link-class" id="path'+num+'" data="'+value.path+'" title="'+title+'"> '+trimmedString+' </div>');
			}
			});
			if(num == 0){
				$('#result').append('<div class="context-box rounded mb-2">No results to preview.</div>');	
			}
		}
	}
$(document).ready(function(){
	//$.ajaxSetup({ cache: false });
	$('.searchBtn').click(function(){
		SearchJSON();
	});

	//oncontext page click
	$('#result').on('click', '.link-class', function() {
		var id = $(this).attr('id');
		var url_string = $('#'+id).attr('data');
		var searchField = $('#searchTxt').val();
		window.location.href = url_string+'?key='+searchField;
		//$('#searchTxt').val($.trim(searchField));
		$("#result").html('');
	});
	//default load on page-load
	var url = new URL(window.location.href);
	var key = url.searchParams.get("key");
	if(key){
		$('#searchTxt').val($.trim(key));
		SearchJSON();
	}
	//on TOC page title click
	$('#restitle').on('click', '.reslink', function() {
		var tid = $(this).attr('id');
		var turl = $('#'+tid).attr('data');
		window.location.href = turl;
	});						
});