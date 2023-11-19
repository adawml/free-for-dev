// 링크처리 - history.back에 대한 대응 처리
var hashInfo	= {};
function goHashLink(url){
	var loc = document.location.pathname;
	
	if(loc != "/shop/gd/dtl/goos.do"){
		// hashInfo 정보 저장
		hashInfo.scrollTop = $(window).scrollTop();
	    
	    if(navigator.cookieEnabled){
	    	sessionStorage.setItem("hashInfo", JSON.stringify(hashInfo));
	    }
	    
	    // 해쉬등록 및 이동 처리
	    document.location.hash = "#hash=" + hashInfo.scrollTop;
	    document.location.href = url;
	}else{
		document.location.href = url;
	}
}


// 스크롤의 위치를 해당 위치까지 이동시킴. -> 최초에 window가 로딩되고 랜더링이 끝나지 않은 상태에서는 scrollTop이 적용되지 않음
var chkScrollTop = 0;
function moveScrollTop(){
    $(window).scrollTop(chkScrollTop);
    
    if($(window).scrollTop() != chkScrollTop){
    	$(window).scrollTop($(window).scrollTop() - 1);    // window scroll 이벤트가 초기에 잡히지 않는 현상이 발생해서 스크롤을 강제도 이동시킴.
        setTimeout(moveScrollTop, 10);
    }
}

// 해쉬에서 정보를 획득함. -> ready, load등의 이벤트에 적용하지 않음. -> 페이지에서 가장먼저 구동되어야 하는 기능임.
// 다른쪽에서 hashInfo의 값을 사용해야 함.
var hash = document.location.hash;
if(hash != ""){
    if(hash.replace("#", "").substring(0, 4) == "hash"){
        history.replaceState('', document.title, location.href.substring(0, location.href.indexOf("#")));
        history.back();
        //스마트폰 기종에 따라 뒤로가기시 스크립트 동작 문제인지 빈화면이 나오는 경우가 있음. 임시방편으로 document.write 실행
        document.write(" ");

        if(navigator.cookieEnabled){
        	hashInfo = sessionStorage.getItem("hashInfo") != null ? JSON.parse(sessionStorage.getItem("hashInfo")) : null;
            sessionStorage.removeItem("hashInfo");		// 의도하지 않는 hash정보를 사용할 수 있으므로 바로 앞페이지에서 이전으로 접근하는 경우만 허용하도록 클리어 처리를 함.
        }else{
        	hashInfo.scrollTop = hash.replace("#", "").substring(5) * 1;
        }
    }
}















