
$(document).ready(function(){
	
	/*검색레이어영역 탭 클릭시 레이러 감추기 방어*/
	/*$('#recomTab').click(function(){
		$("#blockYn").val('Y');
	});
	$('#rcntTab').click(function(){
		$("#blockYn").val('Y');
	});
	$('#recomTab-wing').click(function(){
		$("#blockYn").val('Y');
	});
	$('#rcntTab-wing').click(function(){
		$("#blockYn").val('Y');
	});*/
	
	// 검색창 마케팅문구 가져오기
    $.ajax({
        async       : true,
        url         : ctx_curr+"/sr/listMktSrchWrd.json",
        dataType    : "json",
        type        : "POST",
        cache       : false,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            // 데이터가 없는 경우 그냥 리턴
            if(data.list.length == 0){ return; }
            
            // 데이터가 있는 경우
            var cnt = randomRange(0, data.list.length-1);	//랜덤함수를 사용하여 하나의 마케팅문구를 출력한다.
            var list = data.list[cnt];
            
            if(typeof(list.srchWrd) != "undefined"){
            	$("#searchHeader").find("#basicSearchTerm").attr('placeholder', list.srchWrd);
            	//$("#searchHeader").find("[name=searchTerm]").attr('placeholder', list.srchWrd);
                $("#searchHeader").find("[name=movUrl]").val(list.movUrl);
                $("#searchHeaderIntro").find("#basicSearchTermIntro").attr('placeholder', list.srchWrd);
                //$("#searchHeaderIntro").find("[name=searchTerm]").attr('placeholder', list.srchWrd);
                $("#searchHeaderIntro").find("[name=movUrl]").val(list.movUrl);
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
    var autoOffYn = $("#searchHeader").find("[name=autoOffYn]").val();
    
    if(autoOffYn == "Y"){
        //dq_acOff();
        //dq_acOff_wing();
    }
    
});

function randomRange(n1, n2) {
	return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

/*
 * 최근검색어, 인기검색어 json가져오기
 * */
function getSearchLayer(){
    
//    var rcntOffYn = $("#searchHeader").find("[name=rcntOffYn]").val();
	
    // 데이터 요청
    $.ajax({
        async       : true,
        url         : ctx_curr+"/sr/searchLayer.json",
        dataType    : "json",
        type        : "POST",
        cache       : false,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }
            setSrchLayerHtml(data);
            
            var rcntOffYn = data.rcntOffYn;
            if(rcntOffYn == "Y")	rcntOnOff("ready", "off");
            else	rcntOnOff("ready", "on");
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

function setSrchLayerHtml(data){
	
	
	/*인기검색어 리스트*/
	var html = "";
    if(data.trendList.length > 0){
    	$.each(data.trendList,function(key){
            var list = data.trendList[key];
            var ranking = 0;
            var prev_rank = 0;
            var isUpDown = '';
            
            if(ranking != null && prev_rank != null){
            	ranking = list.RANKING-1;
                prev_rank = list.PREV_RANK-1;
            	if(ranking < prev_rank){
                	isUpDown = 'up';
                }else if(ranking > prev_rank){
                	isUpDown = 'down';
                }
            }
            
            html += "<li><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+encodeURIComponent(list.KEYWORD)+"&searchLayerYn="+encodeURIComponent("Y")+"\"><em class=\"num\">"+(key+1)+".</em>"+list.KEYWORD+"</a><span class=\"count "+isUpDown+"\">"+list.REQUESTED+"회</span></li>";
            
            
        });
    	
    	$("#trendKeyword-wing").html(html);
    	$("#trendKeyword").html(html);
        
    }
    
    /*추천검색어 리스트*/
    html = "";
    if(data.recomList.length > 0){
    	$.each(data.recomList,function(key){
            var list = data.recomList[key];
            html += "<li><i class='ico_com ico_keysh'>검색</i><a href=\""+list.movUrl+"\">"+list.srchWrd+"</a></li>";
        });
    	
    	$("#recomKeyword").html(html);
    	$("#recomKeyword-wing").html(html);
    }
    
    /*최근검색어 리스트*/
    html = "";
    if(data.recentList.length > 0){
    	$.each(data.recentList,function(key){
            var list = data.recentList[key];
            html += "<li><i class='ico_com ico_keysh'>검색</i><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(list.srchWrd) +"&searchLayerYn="+encodeURIComponent("Y")+"\">"+list.srchWrd+"</a><button type=\"button\" class=\"ico_com del2\" onclick=\"javascript:delRcntKeyword('"+list.srchWrd+"');\">삭제</button></li>";
    	});
    	$("#his-list").html(html);
        $("#his-list-wing").html(html);
        $("#delRcnt").show();
        $("#delRcnt-wing").show();
    }else{
    	$("#his-list").find('li').remove();
        $("#his-list-wing").find('li').remove();
        
        $("#noRecent").show();
        $("#noRecent-wing").show();
        
        $("#rcntWrdYn").val("N");
        
        $("#delRcnt").hide();
        $("#delRcnt-wing").hide();
        
    }
}
/*
function delRcntKeyword(keyword){
	
	$("#preventHide").val('Y');
	
	$("#srchWrd").val(keyword);		//삭제할 최근검색어
	var param = $("#searchHeader").serialize();
    
	// 데이터 요청
    $.ajax({
        async       : true,
        url         : ctx_curr+"/sr/delSrchWrd.json",
        dataType    : "json",
        type        : "POST",
        cache       : false,
        data        : param,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }
            
            html = "";
            if(data.recentList.length > 0){
            	$.each(data.recentList,function(key){
                    var list = data.recentList[key];
                    html += "<li><a href=\""+ctx_curr+"/sr/searchResult.do?searchTerm="+ encodeURIComponent(list.srchWrd) +"\">"+list.srchWrd+"</a><button type=\"button\" class=\"ico_com del2\" onclick=\"javascript:delRcntKeyword('"+list.srchWrd+"');\">삭제</button></li>";
            	});
            	$("#his-list").html(html);
                $("#his-list-wing").html(html);
                $("#delRcnt").show();
                $("#delRcnt-wing").show();
                
            }else{
            	$("#his-list").find('li').remove();
                $("#his-list-wing").find('li').remove();
                $("#noRecent").show();
                $("#noRecent-wing").show();
                $("#rcntWrdYn").val('N');
                $("#delRcnt").hide();
                $("#delRcnt-wing").hide();
            }
            
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

function searchActionHeader(gubun){
	if(gubun == 'wing'){
		$("#searchHeader").find("[name=searchTerm]").val($("#searchTermWing").val());
	}
	
	var keyword = $("#searchHeader").find("[name=searchTerm]").val();
	var url = $("#searchHeader").find("[name=movUrl]").val();
	
	if(keyword == '' && url != ''){
		location.href = url;
	}else{
		searchHeader.action = ctx_curr+"/sr/searchResult.do";
	    searchHeader.submit();
	}
}

function searchActionHeaderWing(gubun){

	if(gubun == 'wing'){
		$("#searchHeader").find("[name=searchTerm]").val($("#searchTermWing").val());
	}
	
	var keyword = $("#searchHeader").find("[name=searchTerm]").val();
	var url = $("#searchHeader").find("[name=movUrl]").val();
	
	if(keyword == '' && url != ''){
		location.href = url;
	}else{
		searchHeader.action = ctx_curr+"/sr/searchResult.do";
	    searchHeader.submit();
	}
}

function autoClose(gubun){
    if(gubun == "top"){
        $("#autoList").hide();
        $("#topKeyword").hide();
    }else{
        $("#autoList-wing").hide();
        $("#topKeyword-wing").hide();
    }
}

function rcntOnOff(gubun, trans){
    
    var html = "";
    var htmlWing = "";
    
    if(gubun == "wing")	$("#topKeyword-wing").show();
    
    if(gubun == "top")	$("#topKeyword").show();
    
    if(trans == "on"){
    	
    	if($("#rcntWrdYn").val() == "N"){
    		$("#noRecent").show();
    		$("#noRecent-wing").show();
    	}
        
        $("#noAutoSave").hide();
        $("#noAutoSave-wing").hide();
        
        $("#his-list").show();
        $("#his-list-wing").show();
        
        //html += "<a href=\"javascript:rcntOnOff('top', 'off');\">자동저장 끄기</a>";
        html += "<button type=\"button\" class=\"ico_com close\" onclick=\"javascript:autoClose('top');\">닫기</button>";
        
        //htmlWing += "<a href=\"javascript:rcntOnOff('wing', 'off');\">자동저장 끄기</a>";
        htmlWing += "<button type=\"button\" class=\"ico_com close\" onclick=\"javascript:autoClose('wing');\">닫기</button>";
        
        $("#saveOff").html(html);
        $("#saveOff-wing").html(htmlWing);
        $("#searchHeader").find("[name=rcntOffYn]").val('N');	//최근검색어 자동저장여부
        
        if($("#his-list").find("li").length) {
            $("#delRcnt").show();
        }
        if($("#his-list-wing").find("li").length) {
        	$("#delRcnt-wing").show();
        }
    }
    
    if(trans == "off"){
    	
    	html = "";
        htmlWing = "";
        
        $("#noRecent").hide();
        $("#noRecent-wing").hide();
        
        $("#noAutoSave").show();
        $("#noAutoSave-wing").show();
        
        $("#his-list").hide();
        $("#his-list-wing").hide();
        
        html += "<a href=\"javascript:rcntOnOff('top', 'on');\">자동저장 켜기</a>";
        html += "<button type=\"button\" class=\"ico_com close\" onclick=\"javascript:autoClose('top');\">닫기</button>";
        
        htmlWing += "<a href=\"javascript:rcntOnOff('wing', 'on');\">자동저장 켜기</a>";
        htmlWing += "<button type=\"button\" class=\"ico_com close\" onclick=\"javascript:autoClose('wing');\">닫기</button>";
        
        $("#saveOff").html(html);
        $("#saveOff-wing").html(htmlWing);
        $("#searchHeader").find("[name=rcntOffYn]").val('Y');	//최근검색어 자동저장여부
        $("#delRcnt").hide();
        $("#delRcnt-wing").hide();
    }
    
    if(gubun != "ready") {
    	
        var rcntOffYn = $("#searchHeader").find("[name=rcntOffYn]").val();
    	
        $.ajax({
            async       : true,
            url         : ctx_curr+"/sr/srchWrdSave.json",
            dataType    : "json",
            type        : "POST",
            cache       : false,
            data		: {"rcntOffYn" : rcntOffYn},
            success     : function(data, textStatus, jqXHR){
                if(!crew.ajaxValidate(data)){ return; }
            },
            error       : function(jqXHR, textStatus, errorThrown){
                //console.log(jqXHR.status);
            }
        });
        
    }
}

function blockAction(){
	alert("blockAction>>>");
	$("#blockYn").val('Y');
}*/

