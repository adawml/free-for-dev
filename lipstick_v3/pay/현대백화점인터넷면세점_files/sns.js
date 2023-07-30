/******************************************************************************
	작성자 : 김기석
	작성일 : 2017.08.27
	기능 : SNS 공유 관련 라이브러리
******************************************************************************/
$.crewSnsLib = {
	// 기본값 설정 
	defaults : {
		width		: "600",		// 새창에 띄울때 사용할 옵션들...
		height		: "600",
		scrollbars	: "no", 
		status		: "no", 
		left		: 0, 
		top			: 0, 
		url			: "",			// 공유할 경로 정보
		windowName	: "SNS Share"	// 새창 이름. 그냥 계속 새창으로 띄우려면 _blank로 지정
	}, 

	// 페이스북 공유하기
	shareFacebook : function(url, options){
		// 경로를 지정하지 않으면 현재 경로
		var url = typeof(url) == "undefined" ? location.href : url;
		
		// 옵션 초기화
		options		= $.extend(true, {}, $.crewSnsLib.defaults, options);
		options.url	= "https://www.facebook.com/sharer.php?u=" + escape((encodeURI(url)));

		// 오픈
		$.crewSnsLib.open(options);
	}, 

	// 카카오 공유하기
	shareKakao : function(url, options){
		// 경로를 지정하지 않으면 현재 경로
		var url = typeof(url) == "undefined" ? location.href : url;
		
		// 옵션 초기화
		options		= $.extend(true, {}, $.crewSnsLib.defaults, options);
		options.url	= "https://story.kakao.com/share?url=" + escape((encodeURI(url)));

		// 오픈
		$.crewSnsLib.open(options);
	}, 
	
	
	
	// 트위터 공유하기
	shareTwitter : function(text, url, options){
		// 기본값 설정
		var text	= typeof(text) == "undefined" ? document.title : text;
		var url 	= typeof(url) == "undefined" ? location.href : url;
		
		// 옵션 초기화
		options		= $.extend(true, {}, $.crewSnsLib.defaults, options);
		options.url	= "https://twitter.com/share?text=" + escape(encodeURI(text)) + "&url=" + escape(encodeURI(url));

		// 오픈
		$.crewSnsLib.open(options);
	}, 
	
	
	// 네이버 블로그 공유하기
	shareNaver : function(title, url, options){
		// 기본값 설정
		var title	= typeof(title) == "undefined" ? document.title : title;
		var url 	= typeof(url) == "undefined" ? location.href : url;
		
		// 옵션 초기화
		options		= $.extend(true, {}, $.crewSnsLib.defaults, options);
		options.url	= "http://share.naver.com/web/shareView.nhn?title=" + encodeURI(title) + "&url=" + encodeURI(encodeURIComponent(url));

		// 오픈
		$.crewSnsLib.open(options);
	}, 

	
	// 메일로 공유하기
	shareMail : function(title, url, options){
		alert("메일은 메일전송 정의된후 구현 진행!");
	}, 

	
	// 창띄우기
	open : function(options){
		window.open(options.url, options.windowName, $.crewSnsLib.getWindowOpenOption(options));
	}, 
	
	
	// 새창띄울때 옵션 정보 반환
	getWindowOpenOption : function(options){
		var opt = [];
		opt.push("width=" + options.width);
		opt.push("height=" + options.height);
		opt.push("scrollbars=" + options.scrollbars);
		opt.push("status=" + options.status);
		opt.push("left=" + options.left);
		opt.push("top=" + options.height);
		
		return opt.join(",");
	}, 
};


(function($) {
	/*
	$.fn.validateForm		= $.crewFormLib.validateForm;
	$.fn.serializeObject	= $.crewFormLib.serializeObject;
	$.fn.fillForm			= $.crewFormLib.fillForm;
	*/
})(jQuery);



$(document).ready(function(evt){
	// SNS 공유 처리
	$(".shareFacebook").click(function(){
		var url = $(this).attr("shareUrl") ? $(this).attr("shareUrl") : location.href;
		$.crewSnsLib.shareFacebook(url);
	});

	$(".shareKakao").click(function(){
		var url = $(this).attr("shareUrl") ? $(this).attr("shareUrl") : location.href;
		$.crewSnsLib.shareKakao(url);
	});

	$(".shareTwitter").click(function(){
		var text = $(this).attr("shareText") ? $(this).attr("shareText") : document.title;
		var url  = $(this).attr("shareUrl") ? $(this).attr("shareUrl") : location.href;
		$.crewSnsLib.shareTwitter(url);
	});

	$(".shareNaver").click(function(){
		var text = $(this).attr("shareText") ? $(this).attr("shareText") : document.title;
		var url  = $(this).attr("shareUrl") ? $(this).attr("shareUrl") : location.href;
		$.crewSnsLib.shareNaver(text, url);
	});




});