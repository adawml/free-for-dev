    var dq_searchForm = document.searchHeader;
	var dq_searchTextbox = document.getElementById("basicSearchTerm");

	// HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
	var dq_autoSearchType = "basic";              // 일반, 해시태그 구분 타입
	
	// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - dq_searchAutoSaveTabsDivID 추가
	var dq_resultDivID = "autoList";                 //자동완성레이어 ID
	var dq_searchTotalDivID = "allSearchArea";  //기존 검색 목록 
	//var dq_searchTotalDivID = "advanced_search_01";  //기존 검색 목록 
	var dq_searchTabsDivID = "searchTabBox";         //기존 검색  탭
	var dq_searchAutoSaveTabsDivID = "autoSaveTab";  //자동 저장 표시 영역
	var dq_searchBrandInfoDivID = "brandInfo";       //브랜드 검색 영역
	var dq_searchCtgInfoDivID = "ctgInfo";           //브랜드 > 카테고리 영역
	var dq_noAutoComplete = "no_autoComplete";		 //자동완성 없음 텍스트 영역
	var dq_autoCompleteBtn = "autoCompleteBtn";		 //자동완성 버튼  
	var dq_hStartTag = "<em>";   					 //하이라이팅 시작 테그
	var dq_hEndTag = "</em>";                        //하이라이팅 끝 테그
	var dq_bgColor = "#f3f3f3";                      //선택빽그라운드색
	var dq_intervalTime = 500;                       //자동완성 입력대기 시간

	var dq_acResult = new Object();               //결과값
	var dq_acLine = 0;                            //자동완성 키워드 선택  위치(순번)
	var dq_searchResultList = "";                 //자동완성결과리스트
	var dq_searchCateList = "";				      //자동완성 카테고리 리스트
	var dq_searchBrandList = "";				  //자동완성 브랜드 리스트
	var dq_searchRedirectList = "";				  //자동완성 리디렉션 리스트
	var dq_transKeyword = "";					  //자동완성 변환
	var dq_searchKeyword = "";	                  //검색어(한영변환안된)
	var dq_ajaxReqObj = "";                       //ajax request object

	var dq_keyStatus = 1;                         //키상태구분값
	var dq_acuse = 1;                             //자동완성사용여부
	var dq_engFlag = 0;
	var dq_acDisplayFlag = 0;
	var dq_acArrowFlag = 0;
	var dq_acArrowOpenFlag = 0;
	var dq_acFormFlag = 0;
	var dq_acListFlag = 0;
	var dq_browserType = dqc_getBrowserType();
	var dq_keywordBak = "";
	var dq_keywordOld = "";
	
	var showType = "";
	
	// 인트로 검색창에 포커스 갔을때 전환
	$("#basicSearchTermIntro").on("focus",function(){
		changeSearchType('1');
	});
	
	$("#basicSearchTerm").on("focus",function(){
		changeSearchType('2');
	});
	
	dq_keywordBak = dq_keywordOld = dq_searchTextbox.value;

	// HDDFS 리뉴얼 프로젝트 [이승훈-2021.06.22] - 인트로 해시태그 자동완성 추가
	function changeSearchType(type){
		if(type == '1'){
			showType = "intro";
			dq_searchTextbox = document.getElementById("basicSearchTermIntro");
			dq_searchTotalDivID = "advanced_search_intro";
			dq_resultDivID = "autoListIntro";
			dq_noAutoComplete = "no_autoCompleteIntro";		 
			dq_autoCompleteBtn = "autoCompleteBtnIntro";
		}else{
			showType = "";
			dq_searchTextbox = document.getElementById("basicSearchTerm");
			dq_searchTotalDivID = "allSearchArea";
			dq_resultDivID = "autoList";
			dq_noAutoComplete = "no_autoComplete";		 
			dq_autoCompleteBtn = "autoCompleteBtn";
		}
	}
	
	// HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
	function changeSearchTextBox(){
		$("#basicSearchTerm").val('');
		$("#hashSearchTerm").val('');
		// 전활 할때 결과값 초기화 
		dq_acResult = new Object();
		
		if(dq_autoSearchType == "basic"){
			dq_autoSearchType = "hash";
			dq_searchTextbox = document.getElementById("hashSearchTerm");
			$("#hashSearchTerm").focus();
			if(showType == "intro"){
				dq_searchTextbox = document.getElementById("hashSearchTermIntro");
			}
		} else {
			dq_autoSearchType = "basic";
			dq_searchTextbox = document.getElementById("basicSearchTerm");
			$("#basicSearchTerm").focus();
			if(showType == "intro"){
				dq_searchTextbox = document.getElementById("basicSearchTermIntro");
			}
		}
	}
	
	function dq_handleEnter(kind,event)
	{
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

		if (keyCode == 13)
		{
			fn_searchMain();
			return false;
		}
		else
		{
			return true;
		}
	}

	function dq_keywordSearch(keyword)
	{
		dq_searchTextbox.value = keyword;
		dq_searchForm.submit();
	}

	//setTextbox
	function dq_setTextbox(flag, ev)
	{
		
		var _event;
		var key;
		dq_stateChange();

		switch(dq_browserType)
		{
			case 1 : // IE
				_event = window.event;
				key = _event.keyCode;
				break;
			case 2 : // Netscape
				key = ev.which;
				break;
			default :
				key = _event.keyCode;
				break;
		}

		if(dq_keyStatus == 1 && flag && key != 13)
			dq_keyStatus = 2;

	}

	function dq_stateChange()
	{
		dq_searchTextbox.onclick = dq_acDisplayView;
		
	}

	function dq_acDisplayView()
 	{
		dq_acDisplayFlag = 1;
		dq_acFormFlag = 0;
		dq_reqAcResultShow();
 	}

 	function dq_acDisplayCheck()
 	{
 		
		if(dq_acDisplayFlag)
		{
			dq_acDisplayFlag=0;
			return ;
		}

		if(dq_acArrowFlag){
			return;
		}

		if(dq_acFormFlag){
			return;
		}
			

		dq_acDisplayHide();
	}
 	
    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - dq_searchAutoSaveTabsDivID 추가
 	function dq_acDisplayHide()
 	{

 		var resultDiv = document.getElementById(dq_resultDivID);
 		var searchTotalDiv = document.getElementById(dq_searchTotalDivID);
 		var searchTabsDiv = document.getElementById(dq_searchTabsDivID);
 		//var searchAutoSaveTabsDiv = document.getElementById(dq_searchAutoSaveTabsDivID);
 		
 		// 브랜드 영역
 		//var searchBrandInfoDiv = document.getElementsByClassName(dq_searchBrandInfoDivID);
 		//var searchCtgInfoDiv = document.getElementsByClassName(dq_searchCtgInfoDivID);
 		
		if(resultDiv.style.display == "none"){
			
			if(dq_searchTextbox.value == "" || dq_acuse == 0){
				if(dq_acListFlag == 0){
					//console.log("여기실행?");
					//searchTotalDiv.style.display = "none";
					//searchTabsDiv.style.display = "none";
					//searchAutoSaveTabsDiv.style.display = "none";
				}else{
					//$("#advanced_search_01").show();
					searchTotalDiv.style.display = "block";
					searchTabsDiv.style.display = "block";
					//searchAutoSaveTabsDiv.style.display = "block";
					//console.log("여기실행2?");
					// 브랜드 영역
					//$(".brandInfo").hide();
					//$(".ctgInfo").hide();
					//searchBrandInfoDiv.style.display = "none";
					//searchCtgInfoDiv.style.display = "none";
				}
			}
			//return ;
		}else{
			if(dq_searchTextbox.value == "" || dq_acuse == 0){
				resultDiv.style.display = "none";
				
				searchTotalDiv.style.display = "block";
				searchTabsDiv.style.display = "block";
				
				//console.log("여기실행3?");
				if($("#brandTab").attr("tabIndex")==0){
					// 브랜드 영역
					$(".brand_search").show();
					//$(".ctgInfo").show();
				}else{
					//$("#advanced_search_01").show();
					//searchTotalDiv.style.display = "block";
					//searchAutoSaveTabsDiv.style.display = "block";
				}
				//searchBrandInfoDiv.style.display = "none";
				//searchCtgInfoDiv.style.display = "none";
			}else{
				resultDiv.style.display = "none";
				
				// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.17] - 레이어 다시 올라올때 처리를 위해 추가
				//searchTabsDiv.style.display = "block";
				//searchAutoSaveTabsDiv.style.display = "block";
				// 브랜드 영역
				//$(".brand_search").hide();
				//$(".ctgInfo").hide();

				//searchBrandInfoDiv.style.display = "none";
				//searchCtgInfoDiv.style.display = "none";
			}
		}

		//dq_setDisplayStyle(0);
		dq_acListFlag = 0;
		dq_acLine = 0;
	}
 	
    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - dq_searchAutoSaveTabsDivID 추가
 	function dq_setDisplayStyle(type)
 	{
 		var resultDiv = document.getElementById(dq_resultDivID);
 		
 		var searchTotalDiv = document.getElementById(dq_searchTotalDivID);
 		var searchTabsDiv = document.getElementById(dq_searchTabsDivID);
 		//var searchAutoSaveTabsDiv = document.getElementById(dq_searchAutoSaveTabsDivID);
 		
 		// 브랜드 영역
 		//var searchBrandInfoDiv = document.getElementsByClassName(dq_searchBrandInfoDivID);
 		//var searchCtgInfoDiv = document.getElementsByClassName(dq_searchCtgInfoDivID);
 		
 		if(type==0)
		{
			resultDiv.style.display = "none";
			
			//$("#advanced_search_01").show();
			searchTotalDiv.style.display = "block";
			searchTabsDiv.style.display = "block";
			//searchAutoSaveTabsDiv.style.display = "block";
			//console.log("여기실행5?");
			// 브랜드 영역
			$(".brand_search").hide();
			//$(".ctgInfo").hide();

			//searchBrandInfoDiv.style.display = "none";
			//searchCtgInfoDiv.style.display = "none";
			//dq_switchImage(0);
		}
		else if(type==1)
		{
			resultDiv.style.display = "block";
			
			//$("#advanced_search_01").hide();
			searchTotalDiv.style.display = "none";
			searchTabsDiv.style.display = "none";
			//searchAutoSaveTabsDiv.style.display = "none";
			//console.log("여기실행6?");
			
			// 브랜드 영역
			$(".brand_search").hide();
			//dq_switchImage(1);
		}
		else if(type==2)
		{
			resultDiv.style.display = "none";
			//dq_switchImage(1);
		}
 	}

 	function dq_reqAcResultShow()
	{
		//console.log("실행2");
		//console.log("brandTab" + $("#brandTab").attr("tabIndex"));
 		var resultDiv = document.getElementById(dq_resultDivID);
 		
 		var searchTotalDiv = document.getElementById(dq_searchTotalDivID);
 		var searchTabsDiv = document.getElementById(dq_searchTabsDivID);
 		//var searchAutoSaveTabsDiv = document.getElementById(dq_searchAutoSaveTabsDivID);
 		
 		// 브랜드 영역
 		//var searchBrandInfoDiv = document.getElementsByClassName(dq_searchBrandInfoDivID);
 		//var searchCtgInfoDiv = document.getElementsByClassName(dq_searchCtgInfoDivID);

 		
 		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
 		// 검색어가 없거나 사용중이 아니라면 
		if(dq_searchTextbox.value == "" || dq_acuse == 0){
			//if(!$("#brandTab").hasClass("is_selected on")){
			//console.log("test : " + $("#brandTab").attr("tabIndex"));
			if($("#brandTab").attr("tabIndex") == -1){
				resultDiv.style.display = "none";
				//$("#advanced_search_01").show();
				searchTotalDiv.style.display = "block";
				searchTabsDiv.style.display = "block";
				//searchAutoSaveTabsDiv.style.display = "block";
				
				// 브랜드 영역
				//searchBrandInfoDiv.style.display = "none";
				//searchCtgInfoDiv.style.display = "none";
				//console.log("이부분 실행?");
			}
		}
		
	 	if(dq_acListFlag && dq_acDisplayFlag)
	 	{
	 		//console.log("dq_acDisplayFlag>>>>>>>"+dq_acDisplayFlag);
	 		//dq_acDisplayHide();
			//return;
		}

		var o = dq_getAcResult();
	 	if(o && o[1][0] != ""){
	 		//console.log("이부분은 실행?");
	 		dq_acResultShow(o[0], o[1], o[2], o[3], o[4], o[5]);
	 	}
	 	else {
	 		//console.log("아니면 이부분은 실행? : " + o);
	 		dq_reqSearch();
	 	}
 	}

 	function dq_getAcResult()
 	{
		var ke = dqc_trimSpace(dq_searchTextbox.value);

	 	return typeof(dq_acResult[ke])=="undefined" ? null : dq_acResult[ke];
 	}

 	function dq_setAcResult(aq, al, cate, brand, redirect, transKeyword)
 	{
 		dq_acResult[aq] = new Array(aq, al, cate, brand, redirect, transKeyword);
 	}

 	function dq_acResultShow(aq, al, cate, brand, redirect, transKeyword)
 	{
		if(aq != dqc_trimSpace(dq_searchTextbox.value))
			dq_engFlag = 1;
 		else
			if(aq && aq != "" && aq != dqc_trimSpace(dq_searchTextbox.value))
				return ;

	 	dq_searchKeyword = aq;
	 	dq_searchResultList = al;
	 	//console.log("aq>>>>>>>>>>"+aq);
	 	//console.log("al>>>>>>>>>>"+al);
	 	//console.log("cate>>>>>>>>>>"+cate);
	 	//console.log("brand>>>>>>>>>>"+brand);
	 	dq_searchCateList = cate;
	 	dq_searchBrandList = brand;
	 	dq_searchRedirectList = redirect;
	 	dq_transKeyword = transKeyword;

	 	dq_printAcResult();

	 	if(dq_searchResultList.length){
	 		dq_acListFlag = 1;
	 	}else{
	 		dq_acListFlag = 0;
	 	}

	 	if(dq_acListFlag)
	 	{
	 		dq_setAcPos(0);
	 		
			/*if(dq_browserType == 1)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewIE;
			else if(dq_browserType == 2)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewFF;*/
		}
	}

 	function dq_setAcPos(v)
 	{
 		dq_acLine = v;
		setTimeout('dq_setAcLineBgColor();', 10);
 	}

 	function dq_printAcResult()
 	{
 		var resultDiv = document.getElementById(dq_resultDivID);
 		//console.log("여기도?");
 		// 자동완성 키워드가 없을때
		if(dq_searchResultList[0] == ""){
			// 자동완성이 사용중이라면 
			if($("#autoOffYn").val() != 'N'){
				$("#"+dq_resultDivID).find(".normal_box").remove();
				$("#"+dq_resultDivID).find(".hashtag_box").remove();
				$("#"+dq_resultDivID).prepend(dq_getAcNoResultList());
				//resultDiv.innerHTML = dq_getAcNoResultList();
				// 브랜드, 리디렉터 결과도 없다면
		        if(dq_searchBrandList == "" && dq_searchRedirectList == ""){
		        	//$("#autoList").show();
		        	$(".normal_box").hide();
		        	$(".hashtag_box").hide();
		     		$("#"+dq_noAutoComplete).show();
		        	$("#"+dq_noAutoComplete).text('해당 단어로 시작하는 검색어가 없습니다.');
		        }else if(dq_autoSearchType == "hash" && dq_searchResultList == "") {
		        	// 해시태그 일때
		        	//$("#autoList").show();
		        	$(".normal_box").hide();
		        	$(".hashtag_box").hide();
		     		$("#"+dq_noAutoComplete).show();
		        	$("#"+dq_noAutoComplete).text('해당 단어로 시작하는 검색어가 없습니다.');
		        }else{
		        	$(".normal_box").show();
		        	$(".hashtag_box").show();
		     		$("#"+dq_noAutoComplete).hide();
		        }
			}
		}else{
			if($("#autoOffYn").val() != 'N'){
				$("#"+dq_resultDivID).find(".normal_box").remove();
				$("#"+dq_resultDivID).find(".hashtag_box").remove();
				$("#"+dq_resultDivID).prepend(dq_getAcResultList());
				$("#"+dq_noAutoComplete).hide();
				//resultDiv.innerHTML = dq_getAcResultList();
			}
	 	}

		dq_setDisplayStyle(1);

	 	setTimeout('dq_setAcLineBgColor();', 10);
 	}

 	function dq_setAcLineBgColor()
 	{
 		var o1, o2, qs_ac_len;

		if(!dq_acListFlag)
			return;

		qs_ac_len = dq_searchResultList.length;

	 	for(i=0;i<qs_ac_len;i++)
	 	{
			o1 = document.getElementById('dq_ac' + (i+1));

			if(o1 != null)
			{
				if((i+1) == dq_acLine)
					o1.style.backgroundColor = dq_bgColor;
				else
					o1.style.backgroundColor = '';
			}
		}
	 	
	 	
	 	for(i=0;i<qs_ac_len;i++)
        {
            o1 = document.getElementById('dq_ac' + (i+1));

            if(o1 != null)
            {
                if(dq_acLine == 0) {
                }
                if((i+1) == dq_acLine){
                    o1.style.backgroundColor = dq_bgColor;
                    
                    var s_acq = eval('dq_acq' + dq_acLine);
                }else{
                    o1.style.backgroundColor = '';
                }
            }
        }
	 	
	 	
 	}

 	function dq_acKeywordTextViewIE()
	{
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(dq_resultDivID);
		var qs_ac_len = dq_searchResultList.length;
		
		
	 	if(e.keyCode==39)
	 		dq_reqAcResultShow();

	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey))
	 	{
		 	if(!dq_acListFlag)
		 	{
				dq_reqAcResultShow();
			 	return;
			}

			if(dq_acLine < qs_ac_len)
			{
				if(dq_acLine == 0)
					dq_keywordBak = dq_searchTextbox.value;

				dq_acLine++;

			 	ac = eval('dq_ac' + dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
		 	}
	 	}

	 	if(dq_acListFlag && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey)))
	 	{
			if(!dq_acListFlag)
				return;

		 	if(dq_acLine <= 1)
		 	{
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	}
		 	else
		 	{
				dq_acLine--;

			 	ac = eval('dq_ac'+ dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
			}
		}
	}

 	function dq_acKeywordTextViewFF(fireFoxEvent)
	{
		var ac, acq;
		var resultDiv = document.getElementById(resultDiv);
		var qs_ac_len = dq_searchResultList.length;
		

	 	if(fireFoxEvent.keyCode==39)
	 		dq_reqAcResultShow();

	 	if(fireFoxEvent.keyCode==40 || fireFoxEvent.keyCode==9)
	 	{
		 	if(!dq_acListFlag)
		 	{
		 		dq_reqAcResultShow();
			 	return;
			}
			if(dq_acLine < qs_ac_len)
			{
				if(dq_acLine == 0)
					dq_keywordBak = dq_searchTextbox.value;

				dq_acLine++;

			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);

			 	dq_keywordOld = dq_searchTextbox.value = acq.value;

			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	fireFoxEvent.preventDefault();
		 	}
	 	}

	 	if(dq_acListFlag && (fireFoxEvent.keyCode==38 || fireFoxEvent.keyCode==9))
	 	{
			if(!dq_acListFlag)
				return;

		 	if(dq_acLine <= 1)
		 	{
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	}
		 	else
		 	{
		 		dq_acLine-- ;

			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);

			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	dq_searchTextbox.focus() ;
			 	dq_setAcLineBgColor() ;
			 	fireFoxEvent.preventDefault();
			}
		}
	}

 	function dq_reqSearch()
 	{
 		//console.log("dq_reqSearch 안에 val 확인 : " + dq_searchTextbox.value);
		var sv;
		var ke = dqc_trimSpace(dq_searchTextbox.value);

		ke = ke.replace(/ /g, "%20");

		while(ke.indexOf("\\") != -1)
			ke = ke.replace(/ /g, "%20").replace("\\", "");

		while(ke.indexOf("\'") != -1)
			ke = ke.replace(/ /g, "%20").replace("\'", "");

	 	if(ke == "")
	 	{
	 		dq_acDisplayHide();
			return;
		}
	 	// HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
	 	if(dq_autoSearchType != "hash"){
	 		sv = ctx_curr+"/sr/getSmartMakerHtml.do?searchTerm=" + escape(encodeURIComponent(ke));
	 	} else {
	 		sv = ctx_curr+"/sr/getHashSmartMakerHtml.do?searchTerm=" + escape(encodeURIComponent(ke));
	 	}
		//alert(sv);

	 	dq_ajaxReqObj = dqc_getXMLHTTP();

	 	if(dq_ajaxReqObj)
	 	{
	 		//console.log("실행 확인 ");
			dq_ajaxReqObj.open("GET", sv, true);
		 	dq_ajaxReqObj.onreadystatechange = dq_acShow;
	 	}

	 	try
	 	{
			dq_ajaxReqObj.send(null);
	 	}
	 	catch(e)
	 	{
			return 0;
		}
	}

 	function dq_acShow()
 	{
 		//console.log("dq_acShow 안에 dq_acuse 확인 : " + dq_acuse);
		if(dq_acuse == 1)
	 	{
			if(dq_ajaxReqObj.readyState==4 && dq_ajaxReqObj.responseText && dq_ajaxReqObj.status==200)
			{
				eval(dq_ajaxReqObj.responseText);
				dq_setAcResult(dq_searchKeyword, dq_searchResultList,  dq_searchCateList, dq_searchBrandList, dq_searchRedirectList, dq_transKeyword);
				dq_acResultShow(dq_searchKeyword, dq_searchResultList,  dq_searchCateList, dq_searchBrandList, dq_searchRedirectList, dq_transKeyword);
			}
	 	}
	 	else
	 	{
	 		dq_setDisplayStyle(2);
	 	}
 	}

 	function dq_setAcInput(keyword)
 	{
		if(!dq_acListFlag)
			return;

	 	dq_keywordOld = dq_searchTextbox.value = keyword;
	 	dq_searchTextbox.focus();
	 	dq_acDisplayHide();
 	}

    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - dq_acOff 변경
	function dq_acOff()
	{
		//$("#auto_keyword").dialog( "close" );
		//var resultDiv = document.getElementById(dq_resultDivID);				//autoList 자동완성 영역
//		var searchTotalDiv = document.getElementById(dq_searchTotalDivID);		//searchTotal = 최근,인기검색어 영역
		
 		/*dq_acuse = 0;
		dq_acListFlag = 0;
		dq_acLine = 0;*/
 		//resultDiv.innerHTML = dq_getAcNoSmartMaker();
		$(".normal_box").hide();
		$(".hashtag_box").hide();
 		$("#"+dq_noAutoComplete).show();
 		$("#"+dq_noAutoComplete).text('자동완성기능을 사용하고 있지 않습니다.');
		/*$("#searchHeader").find("[name=autoOffYn]").val('Y');*/
 		$("#autoOffYn").val('N');
 		$(".switch").find("input[id='" + dq_autoCompleteBtn + "']").attr('checked', false);
 		
		//resultDiv.style.display = "none";
		//searchTotalDiv.style.display = "none";
 	}

	function dq_acArrow(){
		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
		//$("#auto_keyword").dialog( "close" );
		var resultDiv = document.getElementById(dq_resultDivID);				//autoList 자동완성 영역

		if(dq_acuse == 0)
		{
			dq_keywordOld = "";
			dq_acuse = 1;
		}
		
		//resultDiv.innerHTML = dq_getAcResultList();
		$("#"+dq_resultDivID).find(".normal_box").remove();
		$("#"+dq_resultDivID).find(".hashtag_box").remove();
		$("#"+dq_resultDivID).prepend(dq_getAcResultList());
		
 		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - dq_acArrow 수정		
		$("#autoOffYn").val('Y');
		$(".switch").find("input[id='" + dq_autoCompleteBtn + "']").attr('checked', true);
		
		//dq_searchTextbox.focus();
		dq_wi();
		
		// 해당 키워드 없을때 
        /*if(dq_searchBrandList == "" && dq_searchRedirectList == ""){
        	$(".normal_box").hide();
    		$(".hashtag_box").hide();
     		$("#no_autoComplete").show();
        	$("#no_autoComplete").text('해당 단어로 시작하는 검색어가 없습니다.');
        }*/
		if(dq_searchTextbox.value != ""){
			dq_printAcResult();
		}

		//document.body.onclick=null;
	}

	function dq_switchImage(type)
	{
		if(type==0)
		{
			//document.getElementById("imgIntro0").src = "";
			//document.getElementById("imgIntro0").title = "";
		}
		else if(type==1)
		{
			//document.getElementById("imgIntro0").src = "";
			//document.getElementById("imgIntro0").title = "";
		}
 	}

	function dq_setMouseon()
 	{
	 	dq_acFormFlag = 1;
 	}

 	function dq_setMouseoff()
 	{
	 	dq_acFormFlag = 0;
		dq_searchTextbox.focus();
 	}
 	
 	function dq_branAction(branCd){
 		//에르메스 퍼퓸(057601) -> 에르메스 뷰티(057701), 조르지오 아르마니 향수(008101) -> 조르지오 아르마니(008001), 구찌 퍼퓸(024401) -> 구찌 뷰티(063401), 버버리 퍼퓸(025101) -> 버버리 뷰티(053601)
 		//헤라(622201), 라네즈(622301), 프리메라(622401), 아이오페(622501), 마몽드(622601), 한율(627801) -> 설화수(622101)
 		//카비시(663801), 코드그라피(656501), 커버낫(640701), 이벳필드(642601), 팔렛(656601), 그레이버(656401), 플랙(642101), 로라로라(656602), 세인트페인(656603) -> 마하그리드(642001)
 		if(branCd == '057601'){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=057701");
 		}else if(branCd == '008101'){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=008001");
 		}else if(branCd == '024401'){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=063401");
 		}else if(branCd == '025101'){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=053601");
 		}else if((branCd == '622201') || (branCd == '622301') || (branCd == '622401') || (branCd == '622501') || (branCd == '622601') || (branCd == '627801')){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=622101");
 		}else if((branCd == '663801') || (branCd == '656501') || (branCd == '640701') || (branCd == '642601') || (branCd == '656601') || (branCd == '656401') || (branCd == '642101') || (branCd == '656602') || (branCd == '656603')){
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd=642001");
 		}else{
 			$(location).attr('href', ctx_curr+"/dm/bran/brand.do?onlnBranCd="+branCd);
 		}
 	}
 	
    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.16] - 레이아웃 변경
 	// 자동완성 응답 결과 반환
 	function dq_getAcResultList()
 	{
 		var keyword = "";
 		var keywordOrign = "";
 		var keywordLength = 0;
 		var lenValue = 40;
 		var text = "";
 		var lCateTmp = new Array();
 		var lCateTmpTmp = new Array();
 		var pos = 0;
 		//var branNm = "";
 		var branNm = new Array();
 		var keywordTemp = new Array();
 		
 	    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
 		// 일반 검색일때
 		if(dq_autoSearchType != "hash"){
 			
 			// 일반 자동완성 목록 start
 			text +=	'<div class="normal_box">';
 			
	 		// 리디렉션(바로가기) 영역
	 		if(dq_searchRedirectList != ""){
	 			text += '    <div class="brand_shop">';
	 			text += '        <strong class="tag">BRAND</strong>';
	 			
	        	for(i = 0; i < dq_searchRedirectList.length; i++){
	        		keywordTemp = dq_searchRedirectList[i].split("@^^@");
	        		
	        		keyword = keywordOrign = keywordTemp[0];
	        		
					keywordLength = dqc_strlen(keywordOrign);
					
					if(dq_engFlag == 0)
						pos = keywordOrign.indexOf(dq_searchTextbox.value);
					else if(dq_engFlag == 1)
						pos = keywordOrign.indexOf(dq_searchKeyword);
					
					if(pos >= 0)
					{
						if(pos == 0)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
						}
						else if(pos == keywordOrign.length - 1)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);
						}
						else
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
						}
					}
	        		
	        		//text += "        <a href=\""+keywordTemp[1]+"\">"+keywordTemp[0]+"</a>";
	        		text += "        <a href=\""+keywordTemp[1]+"\">"+ keyword +"</a>";
	        		
	            }
	        	text += "    </div>";
	        }
	
	 		text += '    <div class="searchresults_list">';
	 		
	 		// 브랜드 영역
	 		if(dq_searchBrandList != ""){
	 			var reprBran = new Array();
	 			var tempArr = new Array();
		 		for(i=0;i<dq_searchBrandList.length;i++){
		 			if(dq_searchBrandList[i].indexOf(">") != -1){ // 대표브랜드 일 경우
		 				reprBran = dq_searchBrandList[i].split(">");
		 				tempArr.push("[대표] "+reprBran[0].split(",").join(","));
		 				tempArr.push(reprBran[1].split(",").join(","));
		 			}else{
		 				tempArr.push(dq_searchBrandList[i]);
		 			}
		 		}
		 		// 대표브랜드 중복제거
	 			var brandArr = tempArr.filter(function(el, index){
	 				return tempArr.indexOf(el) === index;
	 			});
	 			text += '        <div class="searchresults_brand">';
	 			text += '        	<ul>';
	 			for(i=0;i<brandArr.length;i++){
        			branNm = brandArr[i].split("_");
        			text += "        <li><a href=\"javascript:dq_branAction('"+branNm[1]+"');\">"+branNm[0]+"</a></li>";
	 			}
	 			text += "            </ul>";
	 			text += "        </div>";
	 		}
	 		
	
	        // 자동완성 검색어 영역
	 		if(dq_searchResultList != null && dq_searchResultList.length > 0)
	 		{
	 			text += '        <div class="searchresults_word">';
	        	text += '           <ul>';
			 	for(i= 0 ; i < dq_searchResultList.length ; i++)
			 	{
			 		keyword = keywordOrign = dq_searchResultList[i];
	
					keywordLength = dqc_strlen(keywordOrign);
	
					if(dq_engFlag == 0)
						pos = keywordOrign.indexOf(dq_searchTextbox.value);
					else if(dq_engFlag == 1)
						pos = keywordOrign.indexOf(dq_searchKeyword);
	
					if(pos >= 0)
					{
						if(pos == 0)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
						}
						else if(pos == keywordOrign.length - 1)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);
						}
						else
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
						}
					}
					
					text += "<li id='dq_ac" + (i+1) + "' onmouseover=\"dq_setAcPos('" + (i+1) + "')\" onFocus=\"dq_setAcPos('" + (i+1) + "');\" onmouseout=\"dq_setAcPos(0);\"  onBlur=\"dq_setAcPos(0);\" onclick=\"dq_setAcInput('" + keywordOrign + "');dq_keywordSearch('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput('" + keywordOrign + "');\" style=\"this.style.backgroundColor=''\" >";
					text += "<a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(keywordOrign) +"&searchLayerYn="+encodeURIComponent("Y")+"&searchType="+encodeURIComponent("basic")+"\">"+ keyword +"</a>";
					text +=	"<input type=\"hidden\" id=\"dq_acqHidden" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";
					text += "<span id='dq_acq" + (i+1) + "' style='display:none'>" + keywordOrign + "</span></li>";
					
			 	}
	        	text += "    	    </ul>";
	        	text += "        </div>";		 	
			}
	 		
	 		// 카테고리 영역
	 		if(dq_searchCateList != ""){
	 			
	        	text += '    <div class="searchresults_category">';
	        	// a 링크 들어갔을때
	        	//text += "		 <p class=\"sh_multi_tit\"><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(dq_searchKeyword) +"&searchLayerYn="+encodeURIComponent("Y")+"\"> "+dq_searchKeyword+"</a></p>";
	        	text += "		 <strong>"+dq_searchKeyword+"<strong>";
	        	text += "        <ul>";
		        
			 	for(jj=0; jj < dq_searchCateList.length; jj++){
			 		
			 		lCateTmp = dq_searchCateList[jj].split("@");
			 		lCateTmpTmp = lCateTmp[0].split("_");
			 		
			 		text += "        <li><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(dq_transKeyword) +"&lCate="+encodeURIComponent(lCateTmp[0])+"&searchType="+encodeURIComponent("basic")+"\">"+lCateTmpTmp[0]+"<span>"+comma(lCateTmp[1])+"</span></a></li>";
			 	}
	        	text += "    	 </ul>";
	        	text += "    </div>";	
		 	}
	 		text += "  </div>";	//end searchresults_list
	 		text += "</div>";	//end normal_box
 		} else {
 	 	    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
	        // 해시 태그 일때, 자동완성 영역만 노출
	 		if(dq_searchResultList != null && dq_searchResultList.length > 0)
	 		{
	        	text += '    <div class="hashtag_box">';
	        	text += "        <ul>";
	        	
			 	for(i= 0 ; i < dq_searchResultList.length ; i++)
			 	{
			 		keyword = keywordOrign = dq_searchResultList[i];
	
					keywordLength = dqc_strlen(keywordOrign);
	
					if(dq_engFlag == 0)
						pos = keywordOrign.indexOf(dq_searchTextbox.value);
					else if(dq_engFlag == 1)
						pos = keywordOrign.indexOf(dq_searchKeyword);
	
					if(pos >= 0)
					{
						if(pos == 0)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
						}
						else if(pos == keywordOrign.length - 1)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);
						}
						else
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
						}
					}
					
					text += "<li id='dq_ac" + (i+1) + "' onmouseover=\"dq_setAcPos('" + (i+1) + "')\" onFocus=\"dq_setAcPos('" + (i+1) + "');\" onmouseout=\"dq_setAcPos(0);\"  onBlur=\"dq_setAcPos(0);\" onclick=\"dq_setAcInput('" + keywordOrign + "');dq_keywordSearch('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput('" + keywordOrign + "');\" style=\"this.style.backgroundColor=''\" >";
					text += "<a href=\""+ctx_curr+"/sr/hashSearchResult.do?searchTerm="+ encodeURIComponent(keywordOrign) +"&searchLayerYn="+encodeURIComponent("Y")+"&searchType="+encodeURIComponent("hash")+"\">#"+ keyword +"</a>";
					text +=	"<input type=\"hidden\" id=\"dq_acqHidden" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";
					text += "<span id='dq_acq" + (i+1) + "' style='display:none'>" + keywordOrign + "</span></li>";
					
			 	}
	        	text += "    	 </ul>";
	        	text += "    </div>";		 	
			}
 		}
 		
 		// 하단 자동완성 버튼 영역
 		/*text +=	"    <div class=\"none_autoword\" id=\"no_autoComplete\" style=\"display:none;\">자동완성기능을 사용하고 있지 않습니다.</div>";
 		text += "        <span class=\"switch autoword\">";
 		
		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.30] - 자동완성 체크버튼 상태 변경 		
 		if($("#autoOffYn").val() === 'Y') {
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\" checked=\"checked\">";
 		}else{
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\">";
 		}
 		
 		text += "            <label for=\"autoCompleteBtn\">";
 		text += "                <span class=\"slider\"></span>";
 		text += "                <span>자동완성</span>";
	    text += "            </label>";
	    text += "        </span>";*/
 		
	 	return text;
	}
 	
    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.17] - 레이아웃 변경 	
 	// 해당 단어로 시작하는 자동완성 검색어가 없을때
 	function dq_getAcNoResultList()
 	{
 		//console.log("여기인가?");
 		var branNm = new Array();
 		var keywordTemp = new Array();
 		
 		var text = "";
 		
 	    // HDDFS 리뉴얼 프로젝트 [이승훈-2021.05.07] - 해시태그 자동완성 추가
 		if(dq_autoSearchType != "hash"){
	 			
 			// 일반 자동완성 목록 start
 			text +=	'<div class="normal_box">';
 			
 			// 리디렉션(바로가기) 영역
	 		if(dq_searchRedirectList != ""){
	 			text += '    <div class="brand_shop">';
	 			text += '        <strong class="tag">BRAND</strong>';
	 			
	        	for(i = 0; i < dq_searchRedirectList.length; i++){
	        		keywordTemp = dq_searchRedirectList[i].split("@^^@");
	        		
	        		keyword = keywordOrign = keywordTemp[0];
	        		
					keywordLength = dqc_strlen(keywordOrign);
	
					if(dq_engFlag == 0)
						pos = keywordOrign.indexOf(dq_searchTextbox.value);
					else if(dq_engFlag == 1)
						pos = keywordOrign.indexOf(dq_searchKeyword);
	
					if(pos >= 0)
					{
						if(pos == 0)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
						}
						else if(pos == keywordOrign.length - 1)
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);
						}
						else
						{
							if(dq_engFlag == 0)
								keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
							else if(dq_engFlag == 1)
								keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
						}
					}
	        		
	        		//text += "        <a href=\""+keywordTemp[1]+"\">"+keywordTemp[0]+"</a>";
	        		text += "        <a href=\""+keywordTemp[1]+"\">"+ keyword +"</a>";
	        		
	            }
	        	text += "    </div>";
	        }
	
	 		text += '    <div class="searchresults_list">';
	 		
	 		
	 		// 브랜드 영역
	 		if(dq_searchBrandList != ""){
	 			var reprBran = new Array();
	 			var tempArr = new Array();
		 		for(i=0;i<dq_searchBrandList.length;i++){
		 			if(dq_searchBrandList[i].indexOf(">") != -1){ // 대표브랜드 일 경우
		 				reprBran = dq_searchBrandList[i].split(">");
		 				tempArr.push("[대표] "+reprBran[0].split(",").join(","));
		 				tempArr.push(reprBran[1].split(",").join(","));
		 			}else{
		 				tempArr.push(dq_searchBrandList[i]);
		 			}
		 		}
		 		// 대표브랜드 중복제거
	 			var brandArr = tempArr.filter(function(el, index){
	 				return tempArr.indexOf(el) === index;
	 			});
	 			
	 			text += '        <div class="searchresults_brand">';
	 			text += '        	<ul>';
	 			for(i=0;i<brandArr.length;i++){
        			branNm = brandArr[i].split("_");
        			text += "        <li><a href=\"javascript:dq_branAction('"+branNm[1]+"');\">"+branNm[0]+"</a></li>";
	 			}
	 			text += "            </ul>";
	 			text += "        </div>";
	 		}
	 		
	 		// 자동완성 영역 없음 
	 		/*text += '        <div class="searchresults_word">';
	 		text += "        </div>";*/
	 		
	 		// 카테고리 영역
	 		if(dq_searchCateList != ""){
	 			
	        	text += '    <div class="searchresults_category">';
	        	// a 링크 들어갔을때
	        	//text += "		 <p class=\"sh_multi_tit\"><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(dq_searchKeyword) +"&searchLayerYn="+encodeURIComponent("Y")+"\"> "+dq_searchKeyword+"</a></p>";
	        	text += "		 <strong>"+dq_searchKeyword+"<strong>";
	        	text += "        <ul>";
		        
			 	for(jj=0; jj < dq_searchCateList.length; jj++){
			 		
			 		lCateTmp = dq_searchCateList[jj].split("@");
			 		lCateTmpTmp = lCateTmp[0].split("_");
			 		
			 		text += "        <li><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(dq_searchKeyword) +"&lCate="+encodeURIComponent(lCateTmp[0])+"&searchType="+encodeURIComponent("basic")+"\">"+lCateTmpTmp[0]+"<span>"+comma(lCateTmp[1])+"</span></a></li>";
			 	}
	        	text += "    	 </ul>";
	        	text += "    </div>";	
		 	}
	 		
	 		text += "  </div>";	//end searchresults_list
	 		text += "</div>";	//end normal_box
 		}
        
 		// 하단 자동완성 버튼 영역
 		/*text +=	"    <div class=\"none_autoword\" id=\"no_autoComplete\" style=\"display:none;\">자동완성기능을 사용하고 있지 않습니다.</div>";
 		text += "        <span class=\"switch autoword\">";
 		
		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.30] - 자동완성 체크버튼 상태 변경 		
 		if($("#autoOffYn").val() === 'Y') {
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\" checked=\"checked\">";
 		}else{
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\">";
 		}
 		
 		text += "            <label for=\"autoCompleteBtn\">";
 		text += "                <span class=\"slider\"></span>";
 		text += "                <span>자동완성</span>";
	    text += "            </label>";
	    text += "        </span>";*/
	    
		return text;
 	}
/*
 	function dq_getAcNoKeyword()
 	{
 		var text = "";
 		text +=	"<div class=\"autocomplate_list\">";
 		text += "<p class=\"no_keyword ico_comb r_no\" id=\"noRcnt\">자동완성기능이 활성화 되었습니다.</p>";
	    text += "    <div class=\"search_toolbar\">";
	    text += "        <button type=\"button\" onclick=\"javascript:autoSwitch('off');\">자동완성 끄기</button>";
	    //text += "        <button type=\"button\" class=\"ico_com i_close\">닫기</button>";
	    text += "    </div>";
	    text += "</div>";
	    
	 	return text;
 	}

 	function dq_getAcOnNoKeyword()
 	{
 		var text = "";
 		text +=	"<div class=\"autocomplate_list\">";
 		text += "<p class=\"no_keyword ico_comb r_no\" id=\"noRcnt\">자동완성기능을 사용하고 있지 않습니다.</p>";
	    text += "    <div class=\"search_toolbar\">";
	    text += "        <button type=\"button\" onclick=\"javascript:autoSwitch('off');\">자동완성 끄기</button>";
	    //text += "        <button type=\"button\" class=\"ico_com i_close\">닫기</button>";
	    text += "    </div>";
	    text += "</div>";

	 	return text;
 	}
 	
 	//자동완성 비활성화인경우
 	function dq_getAcNoSmartMaker(){
 		
 		var text = "";
	    
 		// 하단 자동완성 버튼 영역
 		text +=	"    <div class=\"none_autoword\" id=\"no_autoComplete\" style=\"display:none;\">자동완성기능을 사용하고 있지 않습니다.</div>";
 		text += "        <span class=\"switch autoword\">";
 		
		// HDDFS 리뉴얼 프로젝트 [이승훈-2021.04.30] - 자동완성 체크버튼 상태 변경 		
 		if($("#autoOffYn").val() === 'Y') {
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\" checked=\"checked\">";
 		}else{
 			text += "            <input type=\"checkbox\" id=\"autoCompleteBtn\" onclick=\"javascript:autoCompleteSwitch();\">";
 		}
 		
 		text += "            <label for=\"autoCompleteBtn\">";
 		text += "                <span class=\"slider\"></span>";
 		text += "                <span>자동완성</span>";
	    text += "            </label>";
	    text += "        </span>";    
 		
	 	return text;
 	}*/

 	function dq_wi()
 	{
 		//console.log("dq_wi() 실행중");
		if(dq_acuse==0)
			return;
		
		var keyword = dq_searchTextbox.value;
		
		//console.log("dq_wi() 실행중 : " +keyword);
		
	 	if(keyword == "" && keyword != dq_keywordOld)
	 		dq_acDisplayHide();

		if(keyword != "" && keyword != dq_keywordOld && dq_keyStatus != 1)
		{
			var o = null;

			o = dq_getAcResult();
			if(o && o[1][0] != ""){
				//console.log("dq_acResultShow() 실행");
				dq_acResultShow(o[0], o[1], o[2], o[3], o[4], o[5]);
				
			}else{
				//console.log("dq_reqSearch 실행");
				dq_reqSearch();
			}
		}
		
		dq_keywordOld = keyword;

		var dq_iw_id = setTimeout(dq_wi, dq_intervalTime);
		
		if(!$('.advanced_search').hasClass('adsearch_open')){
			clearTimeout(dq_iw_id);
		}
 	}

	setTimeout("dq_wi()", dq_intervalTime);
