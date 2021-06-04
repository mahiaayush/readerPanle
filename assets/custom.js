$(function(){
if (localStorage.getItem('swipec')) {
	var swipec = localStorage.getItem('swipec');
	$('body').addClass(swipec);
    localStorage.removeItem("swipec");	
} 
windowWidth = jQuery(window).width();
if(windowWidth<800) { 
if($('.nextp').length){		
jQuery(document).swipe({
  swipe:function(event, direction, distance, duration, fingerCount) {
	  
    if(direction=='left'){
      localStorage.setItem('swipec', 'rightsp');		
		var link = $('.nextp').attr('href');  
			   window.location.href=link;
	} 
  }
});		
}		
if($('.prevp').length){
jQuery('body').swipe({
  swipe:function(event, direction, distance, duration, fingerCount) { 
	if(direction=='right'){
		localStorage.setItem('swipec', 'leftsp');
		var linkr = $('.prevp').attr('href'); 
	    window.location.href=linkr;
	}
  }
});		
}		
}
  $(document).on("click",".shareitc",function() {  
				jQuery(this).parents('.sharewrapper').toggleClass('need-share-button-opened');
  });
  $(document).on("click",".need-share-button_link",function() {
	            title = document.querySelector('title').innerText;
				content = document.getElementsByTagName('meta').namedItem('description').getAttribute('content');
				if($(document).find("meta[name='image']").length){
					imageurl = document.getElementsByTagName('meta').namedItem('image').getAttribute('content');
				}
				else{
					imageurl = '';
				} 
				surl = window.location.href;
				stitle = $(this).attr('title').toLowerCase();
root=$(this);
root.share = {  
	  	'twitter' : function() {
	  		var url = 'https://twitter.com/home?status=';
	  		url += encodeURIComponent(title) + encodeURIComponent(surl);
		root.popup(url);
	  	},
		'linkedin' : function() {
	  		var url = 'www.linkedin.com/shareArticle?mini=true';
	  		url += '&url=' + encodeURIComponent(surl);
	  		url += '&title=' + encodeURIComponent(title);
	  		url += '&source=' + encodeURIComponent(surl);

        root.popup(url);
	  	},
		'facebook' : function() {
	  		var url = 'www.facebook.com/sharer/share.php?';
	  		url += 'u=' + encodeURIComponent(surl);
	  		url += '&title=' + encodeURIComponent(title);
           root.popup(url);
	  	},
		'pinterest' : function() {
	  		var url = 'pinterest.com/pin/create/bookmarklet/?is_video=false';
	  		url += '&media=' + encodeURIComponent(imageurl);
	  		url += '&url=' + encodeURIComponent(surl);
	  		url += '&description=' + encodeURIComponent(content);
			root.popup(url);
	  	},
		'tumblr' : function() {
	  		var url = 'www.tumblr.com/share?v=3';
	  		url += '&u=' + encodeURIComponent(surl);
	  		url += '&t=' + encodeURIComponent(title);
			root.popup(url);
	  	},
		'reddit' : function() {
	  		var url = 'www.reddit.com/submit?';
	  		url += 'url=' + encodeURIComponent(surl);
	  		url += '&title=' + encodeURIComponent(title);
			root.popup(url);
	  	},
		'mail' : function() {
	  		var url = 'mailto:?subject=' + encodeURIComponent(title) + '&body='+ encodeURIComponent(surl) + ' - ' + encodeURIComponent(content);

	  		window.location.href = url;
	  	},
		'whatsapp' : function() {
	  		var url = 'https://web.whatsapp.com/send?text='; 
	  		url += encodeURIComponent(title)+'...';
	  		url += encodeURIComponent(surl);
           root.popup(url);
	  	},
  }
  
root.popup = function(url) { 
var popupWidth = 500,
		popupHeight = 400, 
		dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
	  dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
	  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
	  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
	  left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft,
	  top = ((height / 2) - (popupHeight / 2)) + dualScreenTop, 
	shareWindow = window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);

// Puts focus on the newWindow
if (window.focus) {
	shareWindow.focus();
}
}
if(stitle=='twitter'){
	root.share.twitter();  
  }
  else if(stitle=='linkedin'){
	root.share.linkedin();  
  }
  if(stitle=='facebook'){
	root.share.facebook();  
  }
  if(stitle=='pinterest'){
	root.share.pinterest();  
  }
  if(stitle=='tumblr'){
	root.share.tumblr();  
  }
  if(stitle=='reddit'){
	root.share.reddit();  
  }
  if(stitle=='mail'){
	root.share.mail();  
  }
  else if(stitle=='mail'){
	root.share.mail();  
  }
  else if(stitle=='whatsapp'){
	root.share.whatsapp();  
  }
  else{
	  
  }
  
  
});

});
function quizs(id){ 
    var elm = document.getElementById(id);   
	 var totalQn = $(elm).find('.questionq').length;
	 var qn = 0;
     var selections = [];
	 var qans = [];	 
	 $(elm).children('.questionq').eq(0).show();
	$(elm).find('.questionq').each(function( index ) {
	   qans.push($(this).attr('data-id'));
	});
	const next = elm.parentNode.querySelector(".next");  
	const prev = elm.parentNode.querySelector(".prev");  
  
  function choose(qn) {
    selections[qn] = +$(elm).children('.questionq').eq(qn).find('input[name="answer"]:checked').val();
  } 
 $(next).on('click', function (e) {
	 console.log(qn);
	 choose(qn); 
      if (isNaN(selections[qn])) {
      alert('Please make a selection!');
    } else { 
      qn++;
     displayNext();
    } 
 });
 $(prev).on('click', function (e) {
      qn--;  displayNext();  	
  });
  $(elm).on('click','.qzreset', function (e) { 
      	$(elm).children('.questionq').find('input:checkbox').removeClass('errr').removeAttr('checked').prop('type','radio').prop('checked', false);
		$(next).removeClass('disabled').text('Next');
		$(elm).children('.questionq').hide();
		$(elm).children('.questionq').eq(0).show();
		   qn = 0;
           selections = []; 
		    $(this).parent('p').remove();
  }); 
  
  function displayNext() {  
  if(selections[qn]!='undefined'){
	$(elm).children('.questionq').eq(qn).find($('input[value="'+selections[qn]+'"]')).prop('checked',true); 
  }
      if(qn === (totalQn - 1) || qn === totalQn){ 
           $(next).text('Submit');  if($(elm).find('.qzresult').length>0){	$(next).addClass('disabled');	}
        }
		else{ $(next).removeClass('disabled').text('Next'); } 
      if(qn < totalQn){
		  $(elm).children('.questionq').hide();
		      $(elm).children('.questionq').eq(qn).show();
        if(qn === 1){
           $(prev).removeClass('disabled');
        } else if(qn === 0){
           $(prev).addClass('disabled');
           $(next).show();
        }
		
	  }  
		else {  
		  $(next).addClass('disabled'); 
         var scoreElem = displayScore();
        $(elm).prepend(scoreElem).fadeIn(); 
qn--;		
      } 
  }
 function displayScore() { 
     $(elm).children('.questionq').find('input:radio').prop('type','checkbox');
    var score = $('<p>'); 
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] == qans[i]) {
        numCorrect++;
      }
	  else{
		  $(elm).children('.questionq').eq(i).find($('input[value="'+selections[i]+'"]')).addClass('errr').prop('checked',true);    
	  }
	  $(elm).children('.questionq').eq(i).find($('input[value="'+qans[i]+'"]')).prop('checked',true);    
	  
	  
	  
    } 
    score.append('<span class="qzresult">You scored- ' + numCorrect + ' out of ' +
                 totalQn + '.</span><svg class="qzreset" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 118.66" style="enable-background:new 0 0 122.88 118.66" xml:space="preserve"><g><path d="M106.2,22.2c1.78,2.21,3.43,4.55,5.06,7.46c5.99,10.64,8.52,22.73,7.49,34.54c-1.01,11.54-5.43,22.83-13.37,32.27 c-2.85,3.39-5.91,6.38-9.13,8.97c-11.11,8.93-24.28,13.34-37.41,13.22c-13.13-0.13-26.21-4.78-37.14-13.98 c-3.19-2.68-6.18-5.73-8.91-9.13C6.38,87.59,2.26,78.26,0.71,68.41c-1.53-9.67-0.59-19.83,3.07-29.66 c3.49-9.35,8.82-17.68,15.78-24.21C26.18,8.33,34.29,3.76,43.68,1.48c2.94-0.71,5.94-1.18,8.99-1.37c3.06-0.2,6.19-0.13,9.4,0.22 c2.01,0.22,3.46,2.03,3.24,4.04c-0.22,2.01-2.03,3.46-4.04,3.24c-2.78-0.31-5.49-0.37-8.14-0.2c-2.65,0.17-5.23,0.57-7.73,1.17 c-8.11,1.96-15.1,5.91-20.84,11.29C18.43,25.63,13.72,33,10.62,41.3c-3.21,8.61-4.04,17.51-2.7,25.96 c1.36,8.59,4.96,16.74,10.55,23.7c2.47,3.07,5.12,5.78,7.91,8.13c9.59,8.07,21.03,12.15,32.5,12.26c11.47,0.11,23-3.76,32.76-11.61 c2.9-2.33,5.62-4.98,8.13-7.97c6.92-8.22,10.77-18.09,11.66-28.2c0.91-10.37-1.32-20.99-6.57-30.33c-1.59-2.82-3.21-5.07-5.01-7.24 l-0.53,14.7c-0.07,2.02-1.76,3.6-3.78,3.52c-2.02-0.07-3.6-1.76-3.52-3.78l0.85-23.42c0.07-2.02,1.76-3.6,3.78-3.52 c0.13,0,0.25,0.02,0.37,0.03l0,0l22.7,3.19c2,0.28,3.4,2.12,3.12,4.13c-0.28,2-2.12,3.4-4.13,3.12L106.2,22.2L106.2,22.2z"/></g></svg>');
    return score;
  }  	
}  