$(document).ready(function(evt){
	// 날짜 포맷 처리
	$(".datepicker").keyup(function(evt){
		var str = this.value;
		if(str == "" || str.length <= 4){ return; }
		var arr = str.replace(/-/gi, "").split("");

		var rv = [];
		for(var i=0, d ; d = arr[i] ; i++){
			if(i == 4){ rv.push("-"); }
			if(i == 6){ rv.push("-"); }
			rv.push(d);
		}

		$(this).val(rv.join(""));
	});
});

// 회원 로그인 처리
function login(redirectUrl, orderYn ,type,goosCd,qtyList,setGoosId,buyNow,notAdtGoodsCd,notAdtQtyList){
	var specs = "height=720, width=460, scrollbars=yes";
	var redirectUrl = typeof(redirectUrl) == "undefined" || redirectUrl == "" ? "?redirectUrl=" + top.location.href : "?redirectUrl=" + redirectUrl;
	
	redirectUrl = redirectUrl.replace("&", "%26");
	redirectUrl = redirectUrl.replace("&", "%26");
	redirectUrl = redirectUrl.replace("&", "%26"); 
	redirectUrl = redirectUrl.replace("&", "%26"); 
	redirectUrl = redirectUrl.replace("&", "%26"); 
	redirectUrl = redirectUrl.replace("&", "%26"); 
	redirectUrl = redirectUrl.replace("&", "%26"); 
	
	var type = typeof(type) == "undefined" ? "" : "&type=" + type;  // 성인인증 후처리 분기타입
	var goosCd = typeof(goosCd) == "undefined" ? "" : "&goosCd=" + goosCd;
	var qtyList = typeof(qtyList) == "undefined" ? "" : "&qtyList=" + qtyList;
	var notAdtGoodsCd = typeof(goosCd) == "undefined" ? "" : "&notAdtGoodsCd=" + notAdtGoodsCd;
	var notAdtQtyList = typeof(goosCd) == "undefined" ? "" : "&notAdtQtyList=" + notAdtQtyList;
	var setGoosId = typeof(setGoosId) == "undefined" ? "" : "&setGoosId=" + setGoosId;
	var buyNow = typeof(buyNow) == "undefined" ? "" : "&buyNow=" + buyNow;
	var orderYn		= typeof(orderYn) == "undefined" ? "" : "&orderYn=" + orderYn; // 상품상세 바로구매용도

	window.open(ctx_curr + "/mm/mbshAuca/addLgin.do" + redirectUrl + orderYn + type + goosCd + qtyList + setGoosId + buyNow+notAdtGoodsCd+notAdtQtyList, "loginForm", specs);
}

// 회원 로그아웃 처리
function logout(data, callback){
	var data = typeof(data) == "undefined" ? {} : data;

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/mbshAuca/saveLogout.json",
        dataType    : "json",
        type        : "POST",
        data        : data,
        success     : function(data, textStatus, jqXHR){
            //console.log(data);

            if(!crew.ajaxValidate(data)){ return; }

            $.cookie("ssoLogin", null); // 메인페이지 sso 자동로그인 횟수 초기화
            gfnSsoDscdToknReq(fnSsoDscdToknCallback); // SSO 토큰만료
            alert("로그아웃되었습니다.");
            sessionStorage.removeItem("scrollPosition");
			sessionStorage.removeItem("goosListType");
			sessionStorage.removeItem("goosFilterTabArea");
			sessionStorage.removeItem("goosListNxtPage");	
			sessionStorage.removeItem("goodsListOrder");
            window.location.replace(ctx_shop + "/dm/main.do");
            wiseLogAggr("KR_PC_GNB_Logout");
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 바로구매 등록 처리 - 복수개 - 상품수량은 1개
function addBuyMultiOne(){
    if(arguments.length != 0){
        var onlnGoosCdList = [];
        var goosQtyList    = [];

        for(var i=0 ; i < arguments.length ; i++){
            if(typeof(arguments[i]) == "object"){
                for(var j=0 ; j < arguments[i].length ; j++){
                    onlnGoosCdList.push(arguments[i][j]);
                    goosQtyList.push(1);
                }
            }else if(typeof(arguments[i]) == "string"){
                var arr = arguments[i].split(/,/gi);

                for(var j=0, val ; val = arr[j] ; j++){
                    onlnGoosCdList.push(val);
                    goosQtyList.push(1);
                }
            }

        }

        addBuyMulti(onlnGoosCdList.join(","), goosQtyList.join(","));
    }
}


// 로그인후 바로구매로 이어지는 경우의 처리를 위한 로직
var loginCartInfo = {}

function loginBuy(){
	// 단건구매인 경우의 대응 처리
	if(loginCartInfo.buyType == "addBuy"){
		addBuy(loginCartInfo.onlnGoosCd, loginCartInfo.goosQty, false);
	}

	// 멀티구매인 경우의 대응 처리
	if(loginCartInfo.buyType == "addBuyMulti"){
		addBuyMulti(loginCartInfo.onlnGoosCdList, loginCartInfo.goosQtyList, loginCartInfo.callback, false);
	}
}


// 바로구매 멀티
function addBuyMulti(onlnGoosCdList, goosQtyList, callback, chkLogin){
    var chkLogin	= typeof(chkLogin) == "undefined" ? true : chkLogin;

    // 전송 데이터 구성
    var cart = { onlnGoosCdList : onlnGoosCdList, goosQtyList : goosQtyList, mode : "order" }

    // 전송전에 로그인 상태 체크
    if(chkLogin && !isLogin){
    	loginCartInfo = cart;
    	loginCartInfo.buyType	= "addBuyMulti";
    	loginCartInfo.callback	= callback;
        login("", "Y");
        return;
    }

    // 전송
    $.ajax({
        async       : true,
        url         : ctx_shop + "/cm/comm/addCartMulti.json",
        dataType    : "jsonp",
        type        : "POST",
        data        : cart,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            // 바로구매 처리
            $.ajax({
                async       : true,
                url         : ctx_shop + '/or/order/checkOrderPsbCartGoos.json',
                dataType    : "jsonp",
                type        : "POST",
                data        : {checkedCartSeq : data.info.cartSeq },
                success     : function(data, textStatus, jqXHR){
                    if(crew.ajaxValidate(data, false)){
                        if(data.resultCode != 1) {
                            alert(data.message);
                        } else if (data.resultCode == 1) {
                            window.location.href = ctx_shop + data.nextUrl;
                        }
                    } else {
                        alert('처리중 오류가 발생하였습니다.');
                    }
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert('처리중 오류가 발생하였습니다.');
                }
            });
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}



// 바로구매 처리
function addBuy(onlnGoosCd, goosQty, chkLogin){
	var cartType =	'Y';
    var goosQty 	= typeof(goosQty) == "undefined" ? 1 : goosQty;
    var chkLogin	= typeof(chkLogin) == "undefined" ? true : chkLogin;

    // 전송 데이터 구성
    var cart = { onlnGoosCd : onlnGoosCd, goosQty : goosQty, mode : "order" }

    // 전송전에 로그인 상태 체크
    if(chkLogin && !isLogin){
    	loginCartInfo = cart;
    	loginCartInfo.buyType = "addBuy";
    	login("",cartType,"",onlnGoosCd,goosQty,"");
        return;
    }
    
    newAddCartMulti(onlnGoosCd, goosQty, '', '', 'insert',cartType);

}

// 장바구니 상품 등록 처리 - 복수개 - 상품수량은 1개
function addCartMultiOne(){
	if(arguments.length != 0){
		var onlnGoosCdList = [];
		var goosQtyList    = [];

        for(var i=0 ; i < arguments.length ; i++){
        	if(typeof(arguments[i]) == "object"){
        		for(var j=0 ; j < arguments[i].length ; j++){
                    onlnGoosCdList.push(arguments[i][j]);
                    goosQtyList.push(1);
        		}
        	}else if(typeof(arguments[i]) == "string"){
        		var arr = arguments[i].split(/,/gi);

        		for(var j=0, val ; val = arr[j] ; j++){
                    onlnGoosCdList.push(val);
                    goosQtyList.push(1);
        		}
        	}

        }

		//addCartMulti(onlnGoosCdList.join(","), goosQtyList.join(","));
        newAddCartMulti(onlnGoosCdList.join(","), goosQtyList.join(","), '', '', 'insert', 'N');
	}
}

/**
 * HDDFS 리뉴얼 프로젝트 [김인호 - 2021.05.26] -  세트상품 장바구니 담기 추가 
 */
function newAddSetCartMulti(onlnGoosCdList, goosQtyList, setGoosId, setType) {
	var onlnGoosCdList   = typeof(onlnGoosCdList)  === "undefined" ? "" : onlnGoosCdList; 
	var dupMsg		= "장바구니에 동일한 상품이 존재합니다. 추가로 담으시겠습니까??";
	var inMode      = "insert"; 
	var setType = setType === "" ? "" : setType; // '' : 최초호출(조건따라서 레이어 혹은 장바구니 담기는 로직 ,  'I' : 새로담기
	var type = ""; 
	var cart = "";
	
	var sumResult = 0;
	for (var i = 0; i<goosQtyList.split(",").length; i++){
		sumResult += Number(goosQtyList.split(",")[i]) ;
	}
	
	for (var i = 0; i<goosQtyList.split(",").length; i++){
		if(Number(goosQtyList.split(",")[i]) > 50000){
			alert('최대 구매가능 수량은 50000개 입니다.');
			return false;
		}
	}
	
	var setEvtClsCd = ""; 
	$.ajax({
        url:  ctx_curr + "/or/order/getSetGoosCfm.json",
        method: "post",
        data: {setGoosId : setGoosId},
        async: true,
        dataType : 'json',
        success : function(data, textStatus, jqXHR) {
        	
        	if(data.cartIsLogin === "Y"){
        		isLogin = true;
        	}
        	
        	var  resultCode = data.resultCode;
        	setEvtClsCd = data.info.getEvtClsCd;
        	if(data.resultCode === 1) {  // 장바구니 세트상품 유
        		//수량변견 관련 layer호출
        		type = "exist"; //이미 장바구니 존재
        		evtCartLayer(type ,goosQtyList , setGoosId );
        		
        		if(data.info.getEvtClsCd === 001){
        			$("#hiddenSetQty").val(goosQtyList);
        		}
        		
        		if(setType !== ""){
        			cart = { onlnGoosCdList : onlnGoosCdList, goosQtyList : goosQtyList, setGoosId : setGoosId  , mode : inMode , setType : setType }
        			// 전송
               	    $.ajax({
               	        async       : false,
               	        url         : ctx_curr + "/cm/comm/addCartMulti.json",
               	        dataType    : "json",
               	        type        : "POST",
               	        data        : cart,
               	        success     : function(data, textStatus, jqXHR){

               	            if(data.resultCode === 1) { 
               	            	alert("장바구니에 담겼습니다 :)");
               	            	
               	            	$.ajax({
	               	                  async       : true,
	               	                  url         : ctx_curr + "/cm/comm/lnbInfo.json",
	               	                  dataType    : "json",
	               	                  type        : "POST",
	               	                  success     : function(data, textStatus, jqXHR){
	               	                     if(!crew.ajaxValidate(data)){ return; }
	               	                     
	               	                     var result =  data.cartCnt;
	               	                     if(result >= 99){
	               	                        result = "99+";
	               	                     }
		               	                 if($("#rwingCartCnt").length != 0){
		               	                    $("#rwingCartCnt").text(result).show();
		               	                 }
	               	                  },
	               	                  error       : function(jqXHR, textStatus, errorThrown){
	               	                  }
               	                });
               	            	$('.pop_o1').dialog("close");
               	            	$('.pop_o2').dialog("close");
               	            	if(setEvtClsCd == "001"){
               	            		if($(".sets_viewpopup").css("display") == "block"){
               	            			$(".sets_viewpopup").dialog("close");
               	            		}
               	            	}else{
               	            		setGoosEvtClose();
               	            	}
               	            	
               	            }else{
               	            	alert(data.message);
               	            }
               	        },
               	        error       : function(jqXHR, textStatus, errorThrown){
               	            console.log(jqXHR.status);   
               	            alert('처리중 오류가 발생하였습니다.',"");
               	        }
               	    });
        		}
        		
        	}else{ // 장바구니 세트상품 무
        		
        		setType = "I";
           	 	var cart = { onlnGoosCdList : onlnGoosCdList, goosQtyList : goosQtyList, setGoosId : setGoosId  , mode : inMode , setType : setType }
           	 	
           	 	// 전송
           	    $.ajax({
           	        async       : true,
           	        url         : ctx_curr + "/cm/comm/addCartMulti.json",
           	        dataType    : "json",
           	        type        : "POST",
           	        data        : cart,
           	        success     : function(data, textStatus, jqXHR){
           	        	
           	        	if(data.cartIsLogin === "Y"){
                    		isLogin = true;
                    	}
           	        	
           	            if(data.resultCode === 1) { 
           	            	alert("장바구니에 담겼습니다 :)");
           	            	
           	            	$.ajax({
             	                  async       : true,
             	                  url         : ctx_curr + "/cm/comm/lnbInfo.json",
             	                  dataType    : "json",
             	                  type        : "POST",
             	                  success     : function(data, textStatus, jqXHR){
             	                     if(!crew.ajaxValidate(data)){ return; }
             	                     
             	                     var result =  data.cartCnt;
             	                     if(result >= 99){
             	                        result = "99+";
             	                     }
             	                     if($("#rwingCartCnt").length != 0){
	               	                    $("#rwingCartCnt").text(result).show();
	               	                 }
             	                  },
             	                  error       : function(jqXHR, textStatus, errorThrown){
             	                  }
             	              });   
           	            	if(setEvtClsCd == "001"){
           	            		if($(".sets_viewpopup").css("display") == "block"){
           	            			$(".sets_viewpopup").dialog("close");
           	            		}
           	            	}else{
           	            		setGoosEvtClose();
           	            	}
           	            }else{
           	            	alert(data.message);
           	            }

           	        },
           	        error       : function(jqXHR, textStatus, errorThrown){
           	            console.log(jqXHR.status);        	
           	        }
           	    });
        	}
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	
        }
    });
}

// HDDFS 리뉴얼 프로젝트 [박용규 - 2021.09.08] - 한번에 담기 초기화
function initLayerCommon(){
	$("input[name='goosChk']").prop("checked",false);
	$(".selChoiceProductCartArea").find('li').remove();
	$(".selChoiceProductCart").hide();
	$.each($(".goosList"),function(i,el){
		$(el).removeClass("chk_on");
	});
	$(".totop").removeClass("addtocart_active");
}


/**
 * HDDFS 리뉴얼 프로젝트 [김영훈 - 2021.03.29] - 장바구니
 * HDDFS 리뉴얼 프로젝트 [김인호 - 2021.05.10] - 장바구니 > 바로구매 로직 추가 (buyNow)
 * @param onlnGoosCd
 * @param goosQty
 * @param callback
 */
function newAddCartMulti(onlnGoosCdList, goosQtyList, callback, cartType, mode,  buyNow){
	
	var cartType	= cartType ? cartType : "normal";
	var dupMsg		= "장바구니에 동일한 상품이 존재합니다. 추가로 담으시겠습니까?";
	var inMode      = typeof(mode) === "undefined" ? "insert" : mode;
	var buyNow = typeof(buyNow) === "undefined" ? "" : buyNow; //바로구매 
	var onlnGoosCdList   = typeof(onlnGoosCdList)  === "undefined" ? "" : onlnGoosCdList;
	
	var sumResult = 0;
	for (var i = 0; i<goosQtyList.split(",").length; i++){
		sumResult += Number(goosQtyList.split(",")[i]) ;
	}
	
	for (var i = 0; i<goosQtyList.split(",").length; i++){
		if(Number(goosQtyList.split(",")[i]) > 50000){
			alert('최대 구매가능 수량은 50000개 입니다.');
			
			if(buyNow === "Y" && !isLogin){
			   window.location.reload();
			}
			return false;
		}
	}
	
	if(buyNow === 'Y'){
		inMode = "order";
	}else{
		inMode = "insert";
	}
	
	var cart = { onlnGoosCdList : onlnGoosCdList, goosQtyList : goosQtyList,  mode : inMode , buyNow : buyNow  }
	 
    // 전송
    $.ajax({
        async       : true,
        url         : ctx_curr + "/cm/comm/addCartMulti.json",
        dataType    : "json",
        type        : "POST",
        data        : cart,
        success     : function(data, textStatus, jqXHR){
        	
        	if(typeof(data.exception) !== "undefined" && buyNow === "Y" && !isLogin){
        		alert(data.message);
        		window.location.reload();
        		return false;
        	}else if(typeof(data.exception) !== "undefined"){
        		alert(data.message);
        		window.location.reload();
        		return false;
        	}else if(data.resultCode !== 1) { 
        		alert(data.message);
        		window.location.reload();
        		return false;
        	}
        	/*
            if(!crew.ajaxValidate(data)){ 
            	return; 
            }
        	*/
        	if(typeof(data.info) !== "undefined" && typeof(data.info.onlnGoosCdListDup) !== "undefined"){
        			
	        		// 수량변경으로 모드 변경
	        		cart.mode     			= "update";
	                cart.goosQtyList        = data.info.goosQtyList;
	                cart.onlnGoosCdList     = data.info.onlnGoosCdList;
	                cart.onlnGoosCdListDup  = data.info.onlnGoosCdListDup;
        		
        			if(buyNow === 'Y'){
        				
	                    // 재요청
	                    $.ajax({
	                        async       : true,
	                        url         : ctx_curr + "/cm/comm/addCartMulti.json",
	                        dataType    : "json",
	                        type        : "POST",
	                        data        : cart,
	                        success     : function(data, textStatus, jqXHR){
	                            if(!crew.ajaxValidate(data)){ return; }
	                            
	                            if(data.cartIsLogin === "Y"){
                            		isLogin = true;
                            	}
	
	                            // 콜백함수가 존재하는 경우
	                            if(typeof(callback) == "function"){
	                                callback(data);
	                                return;
	                            }
	                            
	                            if(data.resultCode === 1) {  
	                            	addCartCount(sumResult);
	                            	location.href = ctx_shop + '/or/order/listCart.do?buyNow='+buyNow+'&onlnGoosCdList='+onlnGoosCdList
	                            }else{
	                            	alert(data.message);
	                            	return false;
	                            }
	                            
	                        },
	                        error       : function(jqXHR, textStatus, errorThrown){
	                            console.log(jqXHR.status);
	                        }
	                    });
        				
        			}else{
        				
        				if(data.info.setGoosYns === "Y"){
        					
        					// 재요청
    	                    $.ajax({
    	                        async       : true,
    	                        url         : ctx_curr + "/cm/comm/addCartMulti.json",
    	                        dataType    : "json",
    	                        type        : "POST",
    	                        data        : cart,
    	                        success     : function(data, textStatus, jqXHR){
    	                            if(!crew.ajaxValidate(data)){ return; }
    	                            
    	                            if(data.cartIsLogin === "Y"){
                                		isLogin = true;
                                	}
    	
    	                            // 콜백함수가 존재하는 경우
    	                            if(typeof(callback) == "function"){
    	                                callback(data);
    	                                return;
    	                            }
    	                            if(data.resultCode === 1) {  
	    	                            addCartCount(sumResult);
	    	                            initLayerCommon();
	    	                            if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
	    	                               location.href = ctx_shop + '/or/order/listCart.do?buyNow='+buyNow+'&onlnGoosCdList='+onlnGoosCdList
			                            }
    	                            }else{
    	                            	alert(data.message);
    	                            	return false;
    	                            }
    	                        	
    	                        },
    	                        error       : function(jqXHR, textStatus, errorThrown){
    	                            console.log(jqXHR.status);
    	                        }
    	                    });
        				}else{
        					if(confirm(dupMsg)){
        				    	
        	                    // 재요청
        	                    $.ajax({
        	                        async       : true,
        	                        url         : ctx_curr + "/cm/comm/addCartMulti.json",
        	                        dataType    : "json",
        	                        type        : "POST",
        	                        data        : cart,
        	                        success     : function(data, textStatus, jqXHR){
        	                            if(!crew.ajaxValidate(data)){ return; }
        	                            
        	                            if(data.cartIsLogin === "Y"){
                                    		isLogin = true;
                                    	}
        	
        	                            // 콜백함수가 존재하는 경우
        	                            if(typeof(callback) == "function"){
        	                                callback(data);
        	                                return;
        	                            }
        	                            
        	                            if(data.resultCode === 1) {  
        	                            	initLayerCommon();
        	                            	addCartCount(sumResult);
        	                            	if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
        	                            	   location.href = ctx_shop + '/or/order/listCart.do?buyNow='+buyNow+'&onlnGoosCdList='+onlnGoosCdList
        	                            	}
        	                            }else{
        	                            	alert(data.message);
        	                            	return false;
        	                            }
        	                        	
        	                        },
        	                        error : function(jqXHR, textStatus, errorThrown){
        	                            console.log(jqXHR.status);
        	                        }
        	                    });
        	                }else{
        	                	//initLayerCommon();
        	                }
        				}
        			}
	            	
	            }else{
	            	
	            	if(data.cartIsLogin === "Y"){
                		isLogin = true;
                	}
	            	
	            	if(typeof(callback) === "function"){
	                    callback(data);
	                    return;
	                }
	                
	                if(buyNow ==='Y'){
	                	location.href = ctx_shop + '/or/order/listCart.do?buyNow='+buyNow+'&onlnGoosCdList='+onlnGoosCdList
	                    return false;
	                }else{
	                	
	                	addCartCount(sumResult);
	                	initLayerCommon();
	                	if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
		            		location.href = ctx_shop + '/or/order/listCart.do?buyNow='+buyNow+'&onlnGoosCdList='+onlnGoosCdList
		                    return false;
		                }
	                }
	            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.status);        	
        }
    });

}


// 장바구니 상품 등록 처리 - 복수개
function addCartMulti(onlnGoosCdList, goosQtyList, callback, cartType){
	var cartType	= cartType ? cartType : "normal";
	var dupMsg		= "장바구니에 동일한 상품이 존재합니다. 추가로 담으시겠습니까?";

	// 장바구니 유형에 따른 메세지 처리
	if(cartType == "set"){
		dupMsg = "세트상품을 모두 담으시면 이미 담겨있는 세트상품의 수량정보가 달라질 수 있습니다. 모두담기를 계속 하시겠습니까?";
	}


	// 전송 데이터 구성
    var cart = { onlnGoosCdList : onlnGoosCdList, goosQtyList : goosQtyList, mode : "insert" }
    
    // 전송
    $.ajax({
        async       : true,
        url         : ctx_curr + "/cm/comm/addCartMulti.json",
        dataType    : "json",
        type        : "POST",
        data        : cart,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            console.log(data);

            if(typeof(data.info) != "undefined" && typeof(data.info.onlnGoosCdListDup) != "undefined"){
                if(confirm(dupMsg)){
                    // 수량변경으로 모드 변경
                    cart.mode               = "update";
                    cart.goosQtyList        = data.info.goosQtyList;
                    cart.onlnGoosCdList     = data.info.onlnGoosCdList;
                    cart.onlnGoosCdListDup  = data.info.onlnGoosCdListDup;

                    // 재요청
                    $.ajax({
                        async       : true,
                        url         : ctx_curr + "/cm/comm/addCartMulti.json",
                        dataType    : "json",
                        type        : "POST",
                        data        : cart,
                        success     : function(data, textStatus, jqXHR){
                            if(!crew.ajaxValidate(data)){ return; }

                            // 콜백함수가 존재하는 경우
                            if(typeof(callback) == "function"){
                                callback(data);
                                return;
                            }

                            if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
                                location.href = ctx_shop + "/or/order/listCart.do"
                            }else{
                            	fnLnbCountInfo();   //rightwing 장바구니 카운트 수정
                            }
                        },
                        error       : function(jqXHR, textStatus, errorThrown){
                            //console.log(jqXHR.status);
                        }
                    });
                }
            }else{
                // 콜백함수가 존재하는 경우
                if(typeof(callback) == "function"){
                    callback(data);
                    return;
                }

                if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
                    location.href = ctx_shop + "/or/order/listCart.do"
                }else{
                	fnLnbCountInfo();   //rightwing 장바구니 카운트 수정
                }
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

/**
 * @param onlnGoosCd
 * @param goosQty
 * @param callback
 */
//장바구니 상품 등록 처리
function newAddCart(onlnGoosCd, goosQty, callback, mode){

	var inGoosQty = typeof(goosQty) === "undefined" ? 1 : goosQty;
	var inMode = typeof(mode) === "undefined" ? "insert" : mode; 
	console.log("inMode"+inMode);
	// 전송 데이터 구성
	var cart = { onlnGoosCd : onlnGoosCd, goosQty : inGoosQty, mode : inMode }	
	
	// 전송
    $.ajax({
        url         : ctx_curr + "/cm/comm/addCart.json",
        async       : true,
        dataType    : "json",
        type        : "POST",
        data        : cart,
        success     : function(data, textStatus, jqXHR){
        	
        	console.log("data:"+  JSON.stringify(data));
        	
            if(!crew.ajaxValidate(data)){ 
            	return; 
            }
            if( inMode !== "order"){
            	console.log("data.info:"+ typeof(data.info));
            	if(typeof(data.info) !== "undefined") {

            		if(confirm("장바구니에 동일한 상품이 존재합니다. 추가로 담으시겠습니까?")) {
	            		// 수량변경으로 모드 변경
	                    cart.mode     = "update";
	            		cart.goosQty  = data.info.goosQty;	                	
	            		//console.log("cart.mode:"+ cart.mode +", cart.goosQty :"+ cart.goosQty);
	            		
	            		// 재요청
	                    $.ajax({
	                        async       : true,
	                        url         : ctx_curr + "/cm/comm/addCart.json",
	                        dataType    : "json",
	                        type        : "POST",
	                        data        : cart,
	                        success     : function(data) {
	                            if(!crew.ajaxValidate(data)) { 
	                            	return false; 
	                            }
	                            //console.log("result.data:"+ data);
	                            if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){                            	
	                                location.href = ctx_shop + "/or/order/listCart.do";
	                            	// HDDFS 리뉴얼 프로젝트 [김영훈 - 2021.03.29] - 장바구니 레이어 호출
	                            	//console.log("result.data:"+ data);
	                            	
	                            	
	                            	//setTimeout(cartLayerStat('CART'), 20);
	                                //return false;
	                            }
	
	                            // 콜백함수가 존재하는 경우
	                            if(typeof(callback) === "function"){ 
	                            	callback(data); 
	                            }
	                        },
	                        error       : function(jqXHR, textStatus, errorThrown){
	                        	alert("eror:"+ errorThrown);
	                        }
	                    });
	  	                        
	            	} else {
	            		console.log(" 장바구니에 추가로 담지 않음");
	            	}
	            } else {
	            	addCartCount(sumResult);
	                if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
	                    location.href = ctx_shop + "/or/order/listCart.do";
	                	// HDDFS 리뉴얼 프로젝트 [김영훈 - 2021.03.29] - 장바구니 레이어 호출
	                	
	                    /*if($("#rwingCartCnt").length != 0){
	                    	var text    = $("#rwingCartCnt").text();
	                    	var cnt = 0;
	                    	if(text == "99+"){
	                    		cnt ="99+";
	                    	}else{
	                    		cnt= text == '' ? 1 : Number(text) + Number(sumResult);
	                    	}
	                    	$("#rwingCartCnt").text(cnt).show();
	                    }*/ 
	                	
	                	//setTimeout(cartLayerStat('CART'), 20);
	                    //return false;
	                }
	                
	                /*if($("#rwingCartCnt").length != 0){
	                	var text    = $("#rwingCartCnt").text();
	                	var cnt = 0;
	                	if(text == "99+"){
	                		cnt ="99+";
	                	}else{
	                		cnt= text == '' ? 1 : Number(text) + Number(sumResult);
	                	}
	                	$("#rwingCartCnt").text(cnt).show();
	                }*/ 
	                
	                // 콜백함수가 존재하는 경우
	                if(typeof(callback) === "function"){ 
	                	callback(data);
	                }
	            }
            } else {
            	// HDDFS 리뉴얼 프로젝트 [김영훈 - 2021.03.29] - 장바구니 레이어 호출
            	location.href = ctx_shop + "/or/order/listCart.do";
            	addCartCount(sumResult);
            	/*if($("#rwingCartCnt").length != 0){
            		var text    = $("#rwingCartCnt").text();
            		var cnt = 0;
            		if(text == "99+"){
            			cnt ="99+";
            		}else{
            			cnt= text == '' ? 1 : Number(text) + Number(sumResult);
            		}
            		$("#rwingCartCnt").text(cnt).show();
            	}*/ 
            	
            	//setTimeout(cartLayerStat('CART'), 20);
                //return false;
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            console.log("error:"+ jqXHR.status);
        }
    });
}

// 장바구니 상품 등록 처리
function addCart(onlnGoosCd, goosQty, callback){
	var goosQty = typeof(goosQty) == "undefined" ? 1 : goosQty;

	// 전송 데이터 구성
	var cart = { onlnGoosCd : onlnGoosCd, goosQty : goosQty, mode : "insert" }

	// 전송
    $.ajax({
        async       : true,
        url         : ctx_curr + "/cm/comm/addCart.json",
        dataType    : "json",
        type        : "POST",
        data        : cart,
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            console.log(data);

            if(typeof(data.info) != "undefined"){
            	if(confirm("장바구니에 동일한 상품이 존재합니다. 추가로 담으시겠습니까?")){
            		// 수량변경으로 모드 변경
                    cart.mode     = "update";
            		cart.goosQty  = data.info.goosQty;

            		// 재요청
                    $.ajax({
                        async       : true,
                        url         : ctx_curr + "/cm/comm/addCart.json",
                        dataType    : "json",
                        type        : "POST",
                        data        : cart,
                        success     : function(data, textStatus, jqXHR){
                            if(!crew.ajaxValidate(data)){ return; }

                            if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
                            	location.href = ctx_shop + "/or/order/listCart.do"
                            	return;
                            }

                            // 콜백함수가 존재하는 경우
                            if(typeof(callback) == "function"){ callback(data); }
                        },
                        error       : function(jqXHR, textStatus, errorThrown){
                            //console.log(jqXHR.status);
                        }
                    });
            	}
            }else{
            	// rightWing 장바구니 개수 업데이트 처리
            	addCartCount(sumResult);
            	/*if($("#rwingCartCnt").length != 0){
            		var text    = $("#rwingCartCnt").text();
            		var cnt = 0;
            		if(text == "99+"){
            			cnt ="99+";
            		}else{
            			cnt= text == '' ? 1 : Number(text) + Number(sumResult);
            		}
            		$("#rwingCartCnt").text(cnt).show();
            	}*/
            	
                if(confirm("선택하신 상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
                    location.href = ctx_shop + "/or/order/listCart.do"
                    return;
                }else{
                    // 콜백함수가 존재하는 경우
                    if(typeof(callback) == "function"){ callback(data); }
                }
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 재입고 알림 팝업 활성화
function addAginRecpNtc(onlnGoosCd, aginRecpNtcSeq){
	var aginRecpNtcSeq = aginRecpNtcSeq ? aginRecpNtcSeq : "";

    // 로그인 체크
    if(!isLogin){
        alert("로그인 후 이용해주세요.");
        login();
        return;
    }

    // 등록가능개수 및 상품중복 판단.
    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/addAginRecpNtcCnt.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCd : onlnGoosCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            if(data.dupYn == 'Y'){
            	alert("이미 등록되어 있는 상품입니다.");
            	return;
            }


            // 등록불가인 경우
            if(data.regYn != 'Y'){
            	alert("재입고 알림은 최대 " + data.limitCnt + "개까지 등록 가능합니다.");
            	return;
            }

            // 팝업 처리
            var toolbar_str = 'no';
            var menubar_str = 'no';
            var statusbar_str = 'no';
            var scrollbar_str = 'yes';
            var resizable_str = 'no';
            var width = "670";
            var height = "870";

            var pop = window.open(ctx_curr + "/mm/my/addAginRecpNtc.do?onlnGoosCd=" + onlnGoosCd + "&aginRecpNtcSeq=" + aginRecpNtcSeq, "addAginRecpNtc", 'width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
            if(!pop){
            	alert("팝업을 해제해주십시오.");
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 브랜드 등록 처리
function addMyBrand(onlnBranCd, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/addMyBrand.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnBranCd : onlnBranCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).addClass("active");
            alert("관심브랜드에 등록되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 브랜드 삭제 처리
function removeMyBrand(onlnBranCd, obj, fn){
	if(!isLogin){ login(); return; }

	$.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/removeMyBrand.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnBranCd : onlnBranCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).removeClass("active");
            alert("관심브랜드가 삭제되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 관심 브랜드 등록/삭제 처리
function mergeMyBrand(onlnBranCd, obj, fn){
	if(!isLogin){ login(); return; }

	var cnrBranYn = $(obj).hasClass("active");
	if(cnrBranYn == true){
		if(!confirm("관심브랜드를 해제하시겠습니까?")){
			return;
		}
	}else{
		if(!confirm("관심브랜드로 설정하시겠습니까?")){
            return;
        }
	}

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/mergeMyBrand.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnBranCd : onlnBranCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            if(data.info.mode == "insert"){
                $(obj).addClass("active");
                alert("관심브랜드에 등록되었습니다.");
            }else if(data.info.mode == "delete"){
                $(obj).removeClass("active");
                alert("관심브랜드가 해제되었습니다.");
            }

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 상품 등록 처리
function addMyGoos(onlnGoosCd, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/addMyGoos.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCd : onlnGoosCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).addClass("active");
            alert("관심상품으로 등록되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 상품 삭제 처리
function removeMyGoos(onlnGoosCd, obj, fn, e){
	if(!isLogin){ login(); return; }
	e.preventDefault();
	if(!confirm("해당 상품을 관심상품에서 삭제하시겠습니까?")){
		return false;
	}
    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/removeMyGoos.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCd : onlnGoosCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }


            $(obj).removeClass("active");
            alert("관심상품이 삭제되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 상품 삭제 처리(복수개)
function removeSelectGoos(onlnGoosCds, obj, fn){
    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/myCont/deleteCnrGoos.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCds : onlnGoosCds.join(",") },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            alert("삭제되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 상품 등록/삭제 처리
function mergeMyGoos(onlnGoosCd, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/mergeMyGoos.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCd : onlnGoosCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            if(data.info.mode == "insert"){
                $(obj).addClass("active");
                alert("관심상품으로 등록되었습니다.");
            }else if(data.info.mode == "delete"){
                $(obj).removeClass("active");
                alert("관심상품이 삭제되었습니다.");
            }

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 이벤트 참여 처리
function addEvnt(evntId, bnfSeq, fn){
	// 로그인체크   ,  로그인 후 이용해주세요. ->  로그인 후 이용 가능합니다.
	if(!isLogin){ alert("로그인 후 이용 가능합니다."); login(); return; }

	// 기본값 설정
	var bnfSeq = typeof(bnfSeq) == "undefined" ? 0 : bnfSeq;

	// 전송
    $.ajax({
        async       : false,
        url         : ctx_curr + "/op/evnt/evntJoinValidation.json",
        dataType    : "json",
        type        : "POST",
        data        : { evntId : evntId, bnfSeq : bnfSeq },
        success     : function(data, textStatus, jqXHR){
        	
        	if(!crew.ajaxValidate(data)){ return; }
        	$.ajax({
                async       : false,
                url         : ctx_curr + "/op/evnt/evntJoin.json",
                dataType    : "json",
                type        : "POST",
                data        : { evntId : evntId, bnfSeq : bnfSeq },
                success     : function(data, textStatus, jqXHR){
                	if(!crew.ajaxValidate(data)){ return; }
                    // 이벤트 참여 결과 내용 구성
                    var winInfo = [];
                    var evntWinClsCd = data.info.evntWinClsCd;
                    if(evntWinClsCd == "001" || evntWinClsCd == "002" || evntWinClsCd == "004"){
                        var bnfListWinResult = data.info.bnfListWinResult;

                        // 참여당첨의 경우 당첨혜택정보가 없을때(블랙회원 or 대량구매회원) 참여완료 알림으로 처리
                        if(evntWinClsCd == "001" && bnfListWinResult.length == 0) {
                            alert("참여되었습니다.");
                        } else {
                            // 상세항목 구성
                            for(var i=0, bnf ; bnf = bnfListWinResult[i] ; i++){
                                if(bnf.svmtId != null){
                                    winInfo.push("적립금 : " + comma(bnf.rsvgAmt) + "원");
                                }

                                if(bnf.cupId != null){
                                    winInfo.push("쿠폰 : " + bnf.cupNm);
                                }


                                if(bnf.evntGvawCommNm != null){
                                	winInfo.push("경품 : " + bnf.evntGvawCommNm);
                                }

                            }

                            // 알림
                            if(winInfo.length != 0){
                                if(evntWinClsCd == "001" || evntWinClsCd == "004"){
                                	alert(winInfo.join(", ") + " 지급되었습니다.");
                                }else if(evntWinClsCd == "002"){
                                    alert(winInfo.join(",") + "이 당첨되었습니다.");
                                }
                            }else{
                                alert("당첨되지 않았습니다.");
                            }
                        }
                    } else if(evntWinClsCd == "003"){
                        alert("참여되었습니다.");
                    }

                    // 콜백함수가 존재하는 경우
                    if(typeof(fn) == "function"){ fn(data); }
                },
                error       : function(jqXHR, textStatus, errorThrown){
                	//console.log(jqXHR.status);
                }
            });
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// H.Style 참여 처리(이벤트 참여와 분리됨)
function addHstEvnt(evntId, bnfSeq, fn){
	// 로그인체크
	if(!isLogin){ alert("로그인 후 이용해주세요."); login(); return; }

	// 기본값 설정
	var bnfSeq = typeof(bnfSeq) == "undefined" ? 0 : bnfSeq;

	// 전송
    $.ajax({
        async       : false,
        url         : ctx_curr + "/op/evnt/evntJoinValidation.json",
        dataType    : "json",
        type        : "POST",
        data        : { evntId : evntId, bnfSeq : bnfSeq, hstYn : "Y" },
        success     : function(data, textStatus, jqXHR){
        	if(!crew.ajaxValidate(data)){ return; }
        	$.ajax({
                async       : false,
                url         : ctx_curr + "/op/evnt/evntJoin.json",
                dataType    : "json",
                type        : "POST",
                data        : { evntId : evntId, bnfSeq : bnfSeq , hstYn : "Y"},
                success     : function(data, textStatus, jqXHR){
                	if(!crew.ajaxValidate(data)){ return; }

                    // 이벤트 참여 결과 내용 구성
                    var winInfo = [];
                    var evntWinClsCd = data.info.evntWinClsCd;
                    if(evntWinClsCd == "001" || evntWinClsCd == "002"){
                        var bnfListWinResult = data.info.bnfListWinResult;

                        // 참여당첨의 경우 당첨혜택정보가 없을때(블랙회원 or 대량구매회원) 참여완료 알림으로 처리
                        if(evntWinClsCd == "001" && bnfListWinResult.length == 0) {
                            alert("참여되었습니다.");
                        } else {
                            // 상세항목 구성
                            for(var i=0, bnf ; bnf = bnfListWinResult[i] ; i++){
                                if(bnf.svmtId != null){
                                    winInfo.push("적립금 : " + comma(bnf.rsvgAmt) + "원");
                                }

                                if(bnf.cupId != null){
                                    winInfo.push("쿠폰 : " + bnf.cupNm);
                                }
                            }

                            // 알림
                            if(winInfo.length != 0){
                                if(evntWinClsCd == "001"){
                                	alert(winInfo.join(", ") + "지급되었습니다.");
                                }else if(evntWinClsCd == "002"){
                                    alert(winInfo.join(",") + "이 당첨되었습니다.");
                                }
                            }else{
                                alert("당첨되지 않았습니다.");
                            }
                        }
                    } else if(evntWinClsCd == "003"){
                        alert("참여되었습니다.");
                    }

                    // 콜백함수가 존재하는 경우
                    if(typeof(fn) == "function"){ fn(data); }
                },
                error       : function(jqXHR, textStatus, errorThrown){
                	//console.log(jqXHR.status);
                }
            });
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 이벤트 등록 처리
function addMyEvnt(evntId, obj, fn){
    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/addMyEvnt.json",
        dataType    : "json",
        type        : "POST",
        data        : { evntId : evntId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).addClass("active");
            alert("관심이벤트에 등록되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 이벤트 삭제 처리
function removeMyEvnt(evntId, obj, fn){
    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/removeMyEvnt.json",
        dataType    : "json",
        type        : "POST",
        data        : { evntId : evntId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).removeClass("active");
            alert("관심이벤트가 삭제되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 관심 이벤트 등록/삭제 처리
function mergeMyEvnt(evntId, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/mergeMyEvnt.json",
        dataType    : "json",
        type        : "POST",
        data        : { evntId : evntId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }


            // 아이콘 + 메세지 처리
            if(data.info.mode == "insert"){
                $(obj).addClass("active");
                alert("관심이벤트에 등록되었습니다.");
            }else if(data.info.mode == "delete"){
                $(obj).removeClass("active");
                alert("관심이벤트가 삭제되었습니다.");
            }

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 관심 기획전 등록 처리
function addMySpex(spexId, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/addMySpex.json",
        dataType    : "json",
        type        : "POST",
        data        : { spexId : spexId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).addClass("active");
            alert("관심기획전에 등록되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 관심 기획전 삭제 처리
function removeMySpex(spexId, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/removeMySpex.json",
        dataType    : "json",
        type        : "POST",
        data        : { spexId : spexId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            $(obj).removeClass("active");
            alert("관심기획전이 삭제되었습니다.");

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


// 관심 기획전 등록/삭제 처리
function mergeMySpex(spexId, obj, fn){
	if(!isLogin){ login(); return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/my/mergeMySpex.json",
        dataType    : "json",
        type        : "POST",
        data        : { spexId : spexId },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }

            // 아이콘 + 메세지 처리
            if(data.info.mode == "insert"){
                $(obj).addClass("active");
                alert("관심기획전에 등록되었습니다.");
            }else if(data.info.mode == "delete"){
                $(obj).removeClass("active");
                alert("관심기획전이 삭제되었습니다.");
            }

            // 콜백함수가 존재하는 경우
            if(typeof(fn) == "function"){ fn(obj); }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// 상품 미리보기 레이어
function previewGoos(onlnGoosCd){
    $.ajax({
        async       : true,
        url         : ctx_curr + "/gd/dtl/goosPreview.json",
        dataType    : "json",
        type        : "POST",
        data        : { onlnGoosCd : onlnGoosCd },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }
            $('#productPreview').remove();
            $('body').append(data.html);
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// gnb 브랜드 레이어의 카테고리 선택 이벤트 핸들
var gnbBranCtgInfo = {};
function selectGnbBranCtg(obj, goosCtgId){
	// 선택한 항목 활성화
	$(obj).parent().parent().find("a").removeClass("active");
	$(obj).addClass("active");


	// 한번 로딩된 데이터는 기존 데이터 사용
	if(typeof(gnbBranCtgInfo[goosCtgId]) != "undefined"){
		appendGnbBranCtg(gnbBranCtgInfo[goosCtgId]);
	}

    $.ajax({
        async       : true,
        url         : ctx_curr + "/cm/comm/getGnbGoosCtgBran.json",
        dataType    : "json",
        type        : "POST",
        data        : {goosCtgId:goosCtgId},
        success     : function(data, textStatus, jqXHR){

            if(!crew.ajaxValidate(data)){ return; }

            // 글로벌 데이터 등록
            gnbBranCtgInfo[goosCtgId] = data;

            // 영역 반영
            appendGnbBranCtg(data);
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}

// gnb 브랜드 레이어의 카테고리 선택영역 적용
function appendGnbBranCtg(data){
	var ctg        = data.ctg;
	var ctgList    = data.ctgList;
	var branList   = data.branList;

	// 대카테고리를 선택한 경우 중카테고리 교체
	if(ctg.lv == "1"){
		var html = [];

		for(var i = 0 ; i < ctgList.length ; i++){
			var c = ctgList[i];
			html.push("<li><a nohref style='cursor:pointer' onclick=\"javascript:selectGnbBranCtg(this, '" + c.goosCtgId + "')\">" + c.goosDispCtgNm + "</a></li>");
		}

		$(".small_category").find("ul").html(html.join(""));
	}

	// 브랜드 목록 정보 갱신
	var html = [];
    for(var i = 0 ; i < branList.length ; i++){
        var b = branList[i];
        html.push('<li><a href="' + ctx_shop + '/dm/bran/brand.do?onlnBranCd=' + b.onlnBranCd + '">' + b.branNm + "</a></li>");
    }
    $(".category_list").find("ul").html(html.join(""));

}


// 즐겨찾기 처리
function addBookmark(){
	var bookmarkURL = window.location.href;
	var bookmarkTitle = document.title;
	var triggerDefault = false;

	if (window.sidebar && window.sidebar.addPanel) {
	    // Firefox version &lt; 23
	    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
	} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') < -1)) || (window.opera && window.print)) {
	    // Firefox version &gt;= 23 and Opera Hotlist
	    var $this = $(this);
	    $this.attr('href', bookmarkURL);
	    $this.attr('title', bookmarkTitle);
	    $this.attr('rel', 'sidebar');
	    $this.off(e);
	    triggerDefault = true;
	} else if (window.external && ('AddFavorite' in window.external)) {
	    // IE Favorite
	    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
	} else {
	    // WebKit - Safari/Chrome
	    alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 를 이용해 이 페이지를 즐겨찾기에 추가할 수 있습니다.');
	}

	//return triggerDefault;
}

function issueCoupon(cupId,fn){
    if ( !isLogin ) {
        login();
        return;
    }
    $.ajax({
        async       : true,
        url         : ctx_curr + "/or/coupon/issueCoupon.json",
        dataType    : "json",
        type        : "POST",
        data        : {
            cupId:cupId
        },
        success     : function(data, textStatus, jqXHR){
            if(typeof(fn) == "function"){
                fn(data);
                return;
            }
            if ( data.resultCode == 1 ) {
                alert('쿠폰이 다운로드 되었습니다.');
            }
            else {
                alert(data.message);
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){

        }
    });
}

function issueCouponDeferred(cupId){
    if ( !isLogin ) {
        login();
        return;
    }
    var deferred = $.Deferred();
    $.ajax({
        async       : true,
        url         : ctx_curr + "/or/coupon/issueCoupon.json",
        dataType    : "json",
        type        : "POST",
        data        : {
            cupId:cupId
        },
        success     : function(data, textStatus, jqXHR){
            deferred.resolve(data);
        },
        error       : function(jqXHR, textStatus, errorThrown){
            deferred.resolve({resultCode:"999",message:"시스템에러가 발생하였습니다."});
        }
    });
    return deferred.promise();
}

function issueMultiCoupon(cupIds,fn) {
    if ( !isLogin ) {
        login();
        return;
    }
    var arr         = new Array(cupIds.length);
    var msg         = new Array(cupIds.length);
    var rtn         = {};
    for ( var i = 0; i<cupIds.length; i++ ) {
        arr[i]          = issueCouponDeferred(cupIds[i]);
    }
    for ( var i = 0; i<arr.length; i++ ) {
        arr[i].done(function(data){
            var allComplete = true;
            var succCnt     = 0;
            var failCnt     = 0;
            for ( var k = 0; k<arr.length; k++ ) {
                msg[k]          = data.message;
                rtn[cupIds[k]]  = data;
                if ( data.resultCode == '1' ) {
                    succCnt+=1;
                }
                else {
                    failCnt+=1;
                }
                if ( arr[k].state() != "resolved" ) {
                    allComplete = false;
                    break;
                }
            }

            if ( allComplete ) {
                if(typeof(fn) == "function"){
                    fn(rtn);
                }
                else {
                    if ( succCnt == arr.length ) {
                        alert('모든 쿠폰이 다운로드 되었습니다.');
                    }
                    else if ( succCnt == 0 ) {
                        alert('다운로드 받을 수 없는 쿠폰입니다.');
                    }
                    else {
                        alert('쿠폰 '+succCnt+'건이 다운로드 되었습니다.');
                    }
                }
            }
        });
    }

}

function showBrandAlarmViewLayer(onlnBranCd,type){
	// 로그인 체크
    if(!isLogin){
        login();
        return;
    }
    var data = {
    		onlnBranCd:onlnBranCd
    }
    
    $.ajax({
        url : ctx_curr + "/dm/bran/showBrandAlarmViewLayer.do",
        type : "POST",
        dataType : "html",
        data : data,
        success: function (data, textStatus, jqXHR) {
        	
            $('#brandAlarmArea').html(data);
            
            $('#parType').val(type);
            
            $(".pop_o6").dialog({
                //resizable: false,
                dialogClass: "pop_type1",
                width: 420,
                minHeight: 120,
                maxHeight: 600,
                modal: true,
                open : function(){
                	$("body").addClass("fixed");
    			},
    			close : function(){
    				$("body").removeClass("fixed");
    			}
            });
            
            //datepicker
        	$( function() {
        		$( ".datepicker" ).datepicker({
        		  showOn: "button",
        		  buttonImage: "../../images/KO/common/ic_calendar.png",
        		  buttonImageOnly: true,
        		  dateFormat: "yy-mm-dd",
        		  buttonText: "Select date",
        		  changeYear: true,
        		  changeMonth: true,
        		  showOtherMonths: true,
        		  monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12" ],
        		  dayNamesMin: [ "일","월","화","수","목","금","토" ],
        		});
        	});
            
            $("#btnAlarmClose").click(function(){
    			$("#layer_popup").dialog("close");
    		});
    	}
    });
    
    /*layerPopup("브랜드 알림 신청", ctx_shop + "/dm/bran/showBrandAlarmViewLayer.do?onlnBranCd=" + onlnBranCd);*/
}



// 숫자입력만 허용
function onlynum(event){
    var val     = $.trim($(this).val());
    var result  = "";

    for(var i=0, s ; s = val.substring(i, i+1) ; i++){
        if(!isNaN(s)){ result += s; }
    }

    $(this).val(parseInt(result || 0));
}

//HDDFS 리뉴얼 프로젝트 [ 김인호 - 2021.05.27 ] 숫자입력만 허용 
function onlynum2(event){
    var val     = $.trim($(this).val());
    var result  = "";

    for(var i=0, s ; s = val.substring(i, i+1) ; i++){
        if(!isNaN(s)){ result += s; }
    }

    $(this).val(parseInt(result || ""));
}

// 콤마찍기
function comma(num){
    var len, point, str, decimal;


    num = num + "";
    decimal = num.split(".")[1];
    num = num.split(".")[0];
    point = num.length % 3 ;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }

    if (typeof(decimal) != "undefined") {
    	str += "." + decimal;
    }

    return str;
}

// 자동 로그아웃 타이머 처리
function logoutAuto(){
	if(!isLogin){ return; }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/mm/mbshAuca/saveLogoutAuto.json",
        dataType    : "json",
        type        : "POST",
        data        : {},
        success     : function(data, textStatus, jqXHR){

            if(!crew.ajaxValidate(data, false)){
                var resultCode = data.resultCode;
                var message    = data.message;

                if(resultCode == "10"){
                	var time = data.info.time;
                	setTimeout(logoutAuto, USER_AUTO_LOGOUT_TIME * 1000);
                }else{
                	alert('처리중 오류가 발생하였습니다.');
                }
            }else{
                //alert("자동 로그아웃되었습니다.");
            	var popUrl = ctx_curr + '/mm/mbshAuca/autoLogoutPop.do?redirectUrl=' + encodeURIComponent(location.href);
                popOpen(popUrl, 'autoLogoutPop', 450, 270);
                location.reload();  // 일단 현재 페이지 새로고침
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR.status);
        }
    });
}


function isEmpty(value) {
    var trimValue = $.trim(value);
    return (trimValue == null || trimValue == undefined || trimValue == "");
}

// 수량 체크(1~999...)
function qtyValidation(qty){
    return /^[1-9][0-9]*$/.test(qty);
}

//지류쿠폰등록
function issuePptpCup(pptpCupNo,fn){
    if ( !isLogin ) {
        login();
        return;
    }
    $.ajax({
        async       : true,
        url         : ctx_curr + "/or/coupon/issuePptpCup.json",
        dataType    : "json",
        type        : "POST",
        data        : {
            pptpCupNo:pptpCupNo
        },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }
            if(typeof(fn) == "function"){
                fn(data);
                return;
            }
            if ( data.resultCode == 1 ) {
                alert('쿠폰이 등록 되었습니다.');
            }
            else {
                alert('쿠폰 등록 대상이 아닙니다.');
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){

        }
    });
}

// 이메일무단수집거부 팝업
function popEmailReject(){

    var width = "450";
    var height = "300";

    window.open(ctx_shop + "/cm/comm/emailReject.do", "emailReject", 'width='+width+',height='+height);
}

// SSO 토큰만료 콜백
function fnSsoDscdToknCallback(data) {
}


// 팝업함수
function popOpen(url, name, width, height){
      var toolbar_str = 'no';
      var menubar_str = 'no';
      var statusbar_str = 'no';
      var scrollbar_str = 'yes';
      var resizable_str = 'yes';
      window.open(url, name, 'width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

// 쿠키설정
function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키삭제
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function clearAllCookies(domain, path) {
	  var doc = document,
	      domain = domain || doc.domain,
	      path = path || '/',
	      cookies = doc.cookie.split(';'),
	      now = +(new Date);
	  for (var i = cookies.length - 1; i >= 0; i--) {
	    doc.cookie = cookies[i].split('=')[0] + '=; expires=' + now + '; domain=' + domain + '; path=' + path;
	  }
}

// 쿠키가져오기
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

// 윤년여부검사
function fnIsleafDate(year) {
	var vLeaf = false;

	if(year % 4 == 0) {
		vLeaf = true;

        if(year % 100 == 0) {
        	vLeaf = false;
        }

        if(year % 400 == 0) {
        	vLeaf = true;
        }
    }

	return vLeaf;
}

// 날짜 유효성 체크(YYYY-MM-DD)
function fnIsValidDate(date) {
	// 기본 날짜 형식 확인
	var vRegExpFormat = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g;
	if(!vRegExpFormat.test(date)) {
    	return false;
    }

	// 당월에 말일 넘어가지 않는지 확인
	var vSplitDate = date.split('-');
	var vYear = Number(vSplitDate[0]);
	var vMonth = Number(vSplitDate[1]);
	var vDay = Number(vSplitDate[2]);

	var vIsleaf = fnIsleafDate(vYear) ? 1 : 0; // 윤년여부 확인
	var vMonthEndDay = [31, 28 + vIsleaf, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if(vDay > vMonthEndDay[vMonth - 1]) {
		return false;
	}

	return true;
}

// 숫자만 체크(양수만)
function fnIsNumber(a) {
	return /^\d+$/.test(a);
}

// 이메일 체크
function fnIsEmail(a) {
	return /^([.0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/g.test(a);
}

// 휴대폰 체크
function fnIsPhoneNumber(a) {
	return /^([\d]){3}-?([\d]){3,4}-?([\d]){4}$/g.test(a);
}

function noStoc(onlnGoosCd,event){
	event.preventDefault();
	addAginRecpNtc(onlnGoosCd);
}

function goAdult(adult,type,onlnGoosCd,qty,buyNow,event){
	//event.preventDefault();
	event.stopPropagation();
	openPopup(adult,type,onlnGoosCd,qty,"",buyNow);
}

function goLogin(event){
	event.preventDefault();
	login();
}

function goCart(onlnGoosCdList, goosQtyList, callback, cartType, mode,  buyNow , event){
	event.preventDefault();
	if(buyNow == "Y"){
		if(!isLogin){
  			//login("","Y","cart",onlnGoosCdList.join(","),goosQtyList.join(","),"");
  			addBuy(onlnGoosCdList, goosQtyList);
  			return false;
  		}
	}
	newAddCartMulti(onlnGoosCdList, goosQtyList, callback, cartType, mode,  buyNow);
}


// 한국 핸드폰번호체크 010,011,016,017,018,019 외 불가처리
function fnIsKorPhonePrefix(preCellPhone) {
	if(preCellPhone.length != 3){ return false; }
	if(preCellPhone == '010' || preCellPhone == '011' || preCellPhone == '016' || preCellPhone == '017' || preCellPhone == '018' || preCellPhone == '019'){
		return true;
	}
	return false;
}

// 숫자만 입력
$(document).on("keyup", ".number", function() {
	$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
});

// 영문,숫자만 입력
$(document).on("keyup", ".engNumber", function() {
	$(this).val( $(this).val().replace(/[^0-9a-zA-Z]/gi,"") );
});

// 영문만 입력
$(document).on("keyup", ".eng", function() {
	$(this).val( $(this).val().replace(/[^a-zA-Z]/gi,"") );
});

// 두개의 날짜를 비료하여 차이를 반환한다.
function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}

// 생년월일 자동하이픈 처리
function fnAutoHypenBymd(str) {
	var vTmp = '';
	var vStr = str;
	vStr = vStr.replace(/-/g, '');

    if(vStr.length < 5){
    	vTmp = vStr;
    }else if(vStr.length < 7){
    	vTmp += vStr.substr(0, 4);
    	vTmp += '-';
    	vTmp += vStr.substr(4);
    }else {
    	vTmp += vStr.substr(0, 4);
    	vTmp += '-';
    	vTmp += vStr.substr(4, 2);
    	vTmp += '-';
    	vTmp += vStr.substr(6, 2);
    }

    return vTmp;
}

// 영문만 체크
function fnIsAlpha(a) {
	return /^[a-zA-Z]+$/g.test(a);
}

// 여권체크
function fnIsPassport(a) {
	return /^[0-9A-Z]+$/g.test(a);
}

// 영문대문자만 체크
function fnIsUpperAlpha(a) {
	return /^[A-Z]+$/g.test(a);
}


// 공백입력불가
function noSpaceEvnt(e){
	if(e.keyCode == 32){
		e.preventDefault();
	}
}

$(document).on("blur", ".upper", function() {
	$(this).val( $(this).val().toUpperCase() );
});

// 휴면해제 페이지이동
function fnMbshSleepRelease(mbshNo, authType, redirectUrl) {
    var $form = $('<form></form>');
    $form.attr('action', ctx_curr + '/mm/mbshAuca/membershipSleepRelease.do');
    $form.attr('method', 'post');
    $form.append('<input type="hidden" value="' + mbshNo + '" name="mbshNo">');
    $form.append('<input type="hidden" value="' + authType + '" name="authType">');
    $form.append('<input type="hidden" value="' + redirectUrl + '" name="redirectUrl">');
    $form.appendTo('body');
    $form.submit();
}

//숫자만 입력 
function isNumber(obj) {
	$(obj).val($(obj).val().replace(/[^0-9]/g,""));
}

// 한글명, 영문명 앞뒤 공백체크
function fnIsNotValidNameBlank1(a) {
	return /^ +| +$/g.test(a);
}

// 한글명, 영문명 중간 공백체크
function fnIsNotValidNameBlank2(a) {
	return / {2,}/g.test(a);
}

// 영문대문자, 공백만 체크
function fnIsUpperAlphaBlank(a) {
	return /^[A-Z ]+$/g.test(a);
}

// 공백체크
function fnIsCheckSpace(a) {
	return / /g.test(a);
} 
	
//연락처 하이픈 처리
function fnHpHyphen(hp) {
	return hp.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

// 동일문자 3번이상 체크
function fnIsThreeSameVal(a){
	var same = 0; //동일문자 카운트
	var chr_0;
	var chr_1;
	for(var i =0; i < a.length; i++){
		chr_0 = a.charAt(i);
		chr_1 = a.charAt(i+1);
		// 동일문자 카운트
		if(chr_0 == chr_1){
			same = same + 1;
		}else{
			if(same > 1){
				alert("동일 문자를 연속하여 3번 이상 사용할 수 없습니다.");
				return false;
			}
			same = 0;
		}
	}
	return true;
}

//이용약관, 개인정보처리방침, 영상정보처리기긱 운영/관리방침
function popPromoFooterMbshJoinTcnd(code){

    var width = "720";
    var height = "550";

    window.open(ctx_shop + "/cm/comm/promoMbshJoinTcnd.do?mbshJoinTcndCd="+code, "mbshJoinTcnd", 'width='+width+',height='+height);
}

/**
 * URL, 파라미터(object)를 받아서 context Path와 국적코드를 적용시킨 URL 리턴
 * url(URL-문자열)
 * param(URL 파라미터 - Object)
 */
function gfnMakeFullUrl(url, oParam){
	var sParam = (url.indexOf('?') > -1 ? '&' : '?');
	$.each(oParam, function(k,v){ sParam+=k+'='+v+'&' });

	return ctx_curr+"/"+url+sParam;
}

//적립금 발행
function issueSvmt(svmtId, rsvgAmt , fn){
	console.log(svmtId)
	console.log(rsvgAmt)
	// 로그인 체크
    if(!isLogin){
    	alert("로그인 후 이용 가능합니다 ");
        login();
        return;
    }

    $.ajax({
        async       : true,
        url         : ctx_curr + "/cm/comm/issueSvmt.json",
        dataType    : "json",
        type        : "POST",
        data        : {
      	  svmtId : svmtId,
      	  rsvgAmt : rsvgAmt
        },
        success     : function(data, textStatus, jqXHR){
            if(!crew.ajaxValidate(data)){ return; }
            if(typeof(fn) == "function"){
                fn(data);
                return;
            }
            if ( data.resultCode == 1 ) {
                alert('적립금이 다운로드 되었습니다.');
            }
            else {
                alert('적립금 다운로드 대상이 아닙니다.');
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){

        }
    });
}

/**
 * HDDFS 리뉴얼 프로젝트 [김진범 - 2021.06.03] - 적립금 혜택 엿보기
 * @param onlnGoosCd
 * @param goosQty
 * @param callback
 */
function getMaxDcPrc(goosCd, goosQty, setGoosCd, steGoosQty) {
	
	var goosCds  = typeof(goosCd) === "undefined" ? "" : goosCd; 
	var goosQtys   = typeof(goosQty) === "undefined" ? "" : goosQty;
	
	//var goosLen = goosCds.split(",").length;
	
	var setGoosCds = typeof(setGoosCd) === "undefined" ? "" : setGoosCd; 
	var steGoosQtys = typeof(steGoosQty) === "undefined" ? "" : steGoosQty;
	//var setGoosLen = setGoosCds.split(",").length;
	
	// 조회 상품이 1개 이상일 떄에만 로딩바 추가
	//if( goosLen > 1 || setGoosLen > 1){
	$(".loadProgBar").css("display","block");
	//}
	
	setTimeout(function(){		
		
		// 전송 데이터 구성
		var cart = { onlnGoosCd : goosCds, goosQty : goosQtys, setGoosCd : setGoosCds, setGoosQty : steGoosQtys};
		
		$.ajax({
			async		: false,
		  	url			: ctx_curr + "/or/order/maxDcAmtInfo.json",
		   	dataType	: "json",
		   	type		: "POST",
		   	data		: cart,
		   	success		: function(data){
		   		if( data.message !== null) {
		   			alert(data.message);
		   		} else {
		   			//$(this).addClass(" btn_tooltip");
		   			$("#maxSvmtInfoPop").show();
		   			$("#maxSvmtInfoPop").html(data.html);
		   		}
		   	},
		   	error		: function(data){
		   		alert("처리중 오류가 발생하였습니다.");
		   	},
		   	complete : function(data){
		   		//if( goosLen > 1 || setGoosLen > 1){
		   		$(".loadProgBar").css("display","none"); // 로딩바 노출
		   		//}
		   	}
		});
	}, 100);
} 

/**
 * HDDFS 리뉴얼 프로젝트 [김민수 - 2021.06.09] -  toast 메세지 공통 처리
 */
function commToastMsg(msg , type){
	alert(msg.replace( /[\t\r\n ]{2,}|[\t\r\n]/g, '<br>' ));
}

/*
 * HDDFS 리뉴얼 프로젝트 [김희연 - 2021.06.09]
 * @param obj
 * num_amount > '-','+' 버튼 > value값 변경작업
 */
function changeAmtBtn(obj) {
	var cntObj = $(obj).parent().children().eq(1);	//input [type=number] 오브젝트
	var cntVal = parseInt(cntObj.val());			//cntObj의 값
	var isEmpty = cntObj.val() == "" ? true : false;	//빈카여부 확인
	var range = $(obj).attr("count_range");			//'-'버튼 : 'm' , '+'버튼 : 'p'
	var amount = 1;
	//최소값
	var min = parseInt(cntObj.attr("min"));		//항목에 설정된 최소값
	var max = parseInt(cntObj.attr("max"));		//항목에 설정된 최대값
	
	//debugger;
	
	if(range == 'm') {
		
		if(isEmpty) {
			alert("수량을 확인해주세요.");
			return false;
		}else {
			if(cntVal == min) {
				amount = min;
				alert("해당 상품의 최소 주문 수량은 "+min+"개 입니다.");
			}else {
				amount = cntVal-1;
			}
		}

	}else if(range == 'p') {
		
		if(isEmpty) {
			alert("수량을 확인해주세요.");
			return false;
		}else {
			if(cntVal == max) {
				amount = max;
				alert("주문예정 수량보다 해당 상품의 재고가 부족합니다.");
			}else {
				amount = cntVal+1;			
			}			
		}
	}
	
	cntObj.val(cntVal);
	cntObj.attr("value", amount);
	return amount;
}

/*
 * input number 체크 : keydown 이벤트(숫자 외 입력 막기)
 * @param event : key 이벤트
 */
function checkNumber(event) {
	if((48 <= event.keyCode && event.keyCode <= 57) 			//키보드 숫자
			|| (96 <= event.keyCode && event.keyCode <= 105)	//키보드 숫자(num Lock)
			|| (event.keyCode == 8) || (event.keyCode == 37) || (event.keyCode == 39)) {		//Back-Space
	}else {
		return false;
	}
}

/*
 * HDDFS 리뉴얼 프로젝트 [김희연 - 2021.06.09] - input number 체크
 * @param obj	: input 오브젝트
 */
function checkAmt(obj, event) {
	var min = $(obj).attr("min");	//설정된 최소값
  	var max = $(obj).attr("max");	//설정된 최대값
  	var inputVal = $(obj).val();		//입력 후 value값
  	var value = inputVal.replace(/[^0-9]/g,"");	//숫자 외 제거 처리
  	
  	if(value == 0) {
		alert("수량을 확인해주세요.");
		$(obj).val(parseInt(min));
		$(obj).attr("value", parseInt(min));
		rtnVal = parseInt(min);
		//return false;
	}else if(parseInt(value) > parseInt(max)) {
		alert("주문예정 수량보다 해당 상품의 재고가 부족합니다.");
		$(obj).val(parseInt(min));
		$(obj).attr("value", parseInt(min));
		rtnVal = parseInt(min);
		//return false;
	}else if(parseInt(value) < parseInt(min)){
		alert("해당 상품의 최소 주문 수량은 "+min+"개 입니다.");
		$(obj).val(parseInt(min));
		$(obj).attr("value", parseInt(min));
		rtnVal = parseInt(min);
		//return false;
	}else{
		rtnVal = parseInt(value);
	}
  	$(obj).attr("value", rtnVal);
    return rtnVal;
}

function fnScriptVerVal() {
	var d = new Date();
	
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var hours = d.getHours();
	var minutes = parseInt(d.getMinutes() / 5);
	
	return year + '' + month + '' + date + '' + hours + '' + minutes;
}

/*
 *  HDDFS 리뉴얼 프로젝트 [김민수 - 2021.06.27] - 브랜드 IC 정보 반환
 *  CDN 활용 데이터 브랜드 , 카테고리 관련 처리 
 */
var loadBranIcKrJsonpList="";
var loadBranIcEnJsonpList="";
var loadBranKrJsonpList="";
var loadBranEnJsonpList="";
var loadCtgJsonpList="";


// 브랜드 IC 국문 리스트
function loadBranIcKrList(){
	if(loadBranIcKrJsonpList ==""){
		$.ajax({
	    	url: SERVER_SCRIPT_JSON + '/htmlGen/KO/gnbBranIcKr.js?ver=' + fnScriptVerVal(),
	        dataType: 'jsonp', 
	        async : false ,
	        jsonpCallback: 'myCallback',
	        success : function(json) {
	        	loadBranIcKrJsonpList = json != null ? json[0] : "";
	        	//브랜드KR 생성
	        	loadBranKrList();
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        }
	    });
	}
}

//브랜드 IC 영문 리스트
function loadBranIcEnList(){
	if(loadBranIcEnJsonpList ==""){
		$.ajax({
	    	url:  SERVER_SCRIPT_JSON + '/htmlGen/KO/gnbBranIcEn.js?ver=' + fnScriptVerVal(),
	        dataType: 'jsonp',
	        async : false ,
	        jsonpCallback: 'myCallback',
	        success : function(json) {
	        	loadBranIcEnJsonpList = json != null ? json[0] : "";
	        	//브랜드 EN 생성
	        	loadBranEnList();
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        }
	    });
	}
}

//브랜드 리스트 국문
function loadBranKrList(){
	if(loadBranKrJsonpList ==""){
		$.ajax({
	    	url: SERVER_SCRIPT_JSON + '/htmlGen/KO/gnbBranSiteMap.js?ver=' + fnScriptVerVal(),
	        dataType: 'jsonp',
	        async : false ,
	        jsonpCallback: 'myCallback',
	        success : function(subJson) {
	        	loadBranKrJsonpList = subJson != null ? subJson[0] : "";
	        	//검색 브랜드영역 생성
        		var html ="";
	    		//국문 브랜드 정보
	    		for(var i=0; i<loadBranIcKrJsonpList.length; i++){
	    			var chkClass = i ==0 ? "on" : "";
	    			var isDisabled ="";
	    			if(loadBranKrJsonpList[loadBranIcKrJsonpList[i]] == ""){
	    				isDisabled = "disabled";
	    			}
	    			html+="<li data-group-pos=\""+(i+1)+"\">";
	    			html+="<button onclick=\"chgBranTab(this,1);\" class=\""+chkClass+" "+isDisabled+" \">"+loadBranIcKrJsonpList[i]+"</button>";
	    			html+="<div class=\"sort_result brand_item branTabResult "+chkClass+"\">";
	    			var subDataList = loadBranKrJsonpList[loadBranIcKrJsonpList[i]];
	    			for(var j=0; j <subDataList.length; j++){
	    				html+="<span>";
	    				html+="<input type=\"button\" id=\"branKr_"+subDataList[j].onlnBranCd+"\" data-group=\"bran"+(i+1)+"\" value=\""+subDataList[j].onlnBranCd+"\" onclick=\"branAction('"+subDataList[j].onlnBranCd+"');\">";
	    				html+="<label for=\"branKr_"+subDataList[j].onlnBranCd+"\">"+subDataList[j].branNm+"</label>";
	    				html+="</span>";
	    			}
	    			html+="</div>";
	    			html+="</li>";
	    		}
	    		$("#brandKrList").html(html);
	        	
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        }
	    });
	}
}

//브랜드 리스트 영문
function loadBranEnList(){
	if(loadBranEnJsonpList==""){
		$.ajax({
	    	url: SERVER_SCRIPT_JSON + '/htmlGen/KO/gnbBranEnMap.js?ver=' + fnScriptVerVal(),
	        dataType: 'jsonp',
	        async : false ,
	        jsonpCallback: 'myCallback',
	        success : function(subJson) {
	        	loadBranEnJsonpList = subJson != null ? subJson[0] : "";
	        	var html = "";
	        	//영문 브랜드 영역 생성
        		for(var i=0; i<loadBranIcEnJsonpList.length; i++){
	    			var chkClass = i ==0 ? "on" : "";
	    			var isDisabled ="";
	    			if(loadBranEnJsonpList[loadBranIcEnJsonpList[i]] == ""){
	    				isDisabled = "disabled";
	    			}
	    			html+="<li data-group-pos=\""+(i+1)+"\">";
	    			html+="<button onclick=\"chgBranTab(this,2);\" class=\""+chkClass+" "+isDisabled+" \">"+loadBranIcEnJsonpList[i]+"</button>";
	    			html+="<div class=\"sort_result brand_item branTabResult brand_en "+chkClass+"\">";
	    			var subDataList = loadBranEnJsonpList[loadBranIcEnJsonpList[i]];
	    			for(var j=0; j <subDataList.length; j++){
	    				html+="<span>";
	    				html+="<input type=\"button\" id=\"branEn_"+subDataList[j].onlnBranCd+"\" data-group=\"bran"+(i+1)+"\" value=\""+subDataList[j].onlnBranCd+"\" onclick=\"branAction('"+subDataList[j].onlnBranCd+"');\">";
	    				html+="<label for=\"branEn_"+subDataList[j].onlnBranCd+"\">"+subDataList[j].branEngNm+"</label>";
	    				html+="</span>";
	    			}
	    			html+="</div>";
	    			html+="</li>";
	    		}
	    		$("#brandEnList").html(html);
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        }
	    });
	}
}

function loadCtgList(){
	if(loadCtgJsonpList ==""){
		$.ajax({
	        url: SERVER_SCRIPT_JSON + '/htmlGen/KO/goosCtg.js?ver=' + fnScriptVerVal(),
	        dataType: 'jsonp', 
	        async : true ,
	        jsonpCallback: 'myCallback', 
	        success : function(data) {
	        	loadCtgJsonpList = data; 
	        	//검색 카테고리 영역
        		var html ="";
        		for(var i=0; i<loadCtgJsonpList.length; i++){
        			var chkClass = i ==0 ? "on" : "";
        			var isDisabled ="";
        			if(loadCtgJsonpList[i].branList == ""){
        				isDisabled = "disabled";
        			}
        			html+="<li data-group-pos=\""+(i+1)+"\">";
        			html+="<button onclick=\"chgCateTab(this);\" class=\""+chkClass+" "+isDisabled+"\">"+loadCtgJsonpList[i].goosDispCtgNm+" <em>"+loadCtgJsonpList[i].branList.length+"</em></button>";
        			html+="<div class=\"sort_result brand_item cateTabResult "+chkClass+" brand_en\"  style=\"top:80px;\">";
        			var subDataList = loadCtgJsonpList[i].branList;
        			for(var j=0; j < subDataList.length; j++){
        				html+="<span>";
        				html+="<input type=\"button\" id=\"cate_"+subDataList[j].onlnBranCd+"\" data-group=\"cate"+(i+1)+"\" value=\""+subDataList[j].onlnBranCd+"\" onclick=\"branAction('"+subDataList[j].onlnBranCd+"');\">";
        				html+="<label for=\"cate_"+subDataList[j].onlnBranCd+"\">"+subDataList[j].branNm+"</label>";
        				html+="</span>";
        			}
        		}
        		
        		$("#cateList").html(html);
	        	setGoosCtg(data);
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	            console.log('실패 - jqXHR : ', jqXHR);
	            console.log('textStatus, : ', textStatus);
	            console.log('errorThrown, : ', errorThrown);
	        }
	    });	
	}
}

/**
 * HDDFS 리뉴얼 프로젝트 [김민수 - 2021.06.21] - 카테고리 JSON
 * 
 */
/*
function loadGnbDispCtgJsonp() {
    $.ajax({
        url: SERVER_SCRIPT_JSON + '/htmlGen/KO/goosCtg.js?ver=' + fnScriptVerVal(),
        dataType: 'jsonp', 
        jsonpCallback: 'myCallback', 
        success : function(data) {
        	setGoosCtg(data);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log('실패 - jqXHR : ', jqXHR);
            console.log('textStatus, : ', textStatus);
            console.log('errorThrown, : ', errorThrown);
        }
    });	
}
*/

function setGoosCtg(goosCtgList1) {
	var html = "";
	html+="";
	html+="";
	html+="";
	html+="";
	for(var i = 0; i < goosCtgList1.length; i++) {
		html+="<li  data-ctgid=\"ctg"+goosCtgList1[i].goosCtgId+"\">";
		if(goosCtgList1[i].subCtgList != null && goosCtgList1[i].subCtgList !=""){
			html+="<strong>"+goosCtgList1[i].goosDispCtgNm+"</strong>";
			var goosCtgList2 = goosCtgList1[i].subCtgList;
			for(var j = 0; j < goosCtgList2.length; j++) {
				if(j==0){
					html+="<ul class=\"depth_03\">";
					html+="<li><a rel=\"nosublink\" href=\""+ctx_shop+"/dm/ctg/category.do?goosCtgId="+goosCtgList1[i].goosCtgId+"\">"+goosCtgList1[i].goosDispCtgNm+" 전체보기</a></li>";
				}
				html+="<li><a rel=\"nosublink\" href=\""+ctx_shop+"/dm/ctg/category.do?goosCtgId="+goosCtgList2[j].goosCtgId+"\">"+goosCtgList2[j].goosDispCtgNm+"</a></li>"
				if(j == goosCtgList2.length-1){
					html+="</ul>";
				}
			}
		}else{
			html+="<a rel=\"nosublink\" href=\""+ctx_shop+"/dm/ctg/category.do?goosCtgId="+goosCtgList1[i].goosCtgId+"\">"+goosCtgList1[i].goosDispCtgNm+"</a>";
		}
		html+="</li>";
	}	 
    $('.serviceCtgList').html(html);
    
    $(function(){
    	$("#gnb .depth_02 li p").each(function(){
            // var gnbLuxuryImg = $(this).height();
            var gnbText = $(this).height();
            $(this).css({marginTop:-(gnbText/2)+"px"})
        })
    });
}


/**
 * HDDFS 리뉴얼 프로젝트 [김민수 - 2021.06.22] - 하트뿅뿅 관련
 * @param openStat
 */
function likeHeart(id){
	$(function(){
		var animation1 = bodymovin.loadAnimation({
			container: document.getElementById(id),
			path: SERVER_IMAGE+'/js/KO/heart2.html',
			renderer: 'svg', // Required
			loop: false, // Optional
			autoplay: false // Optional,
		});
		
		$(".btn_like.likethis, .heart-motion.after_login").on("click", function () {
			if($(this).hasClass("on")) {
				animation1.stop();
				animation1.play();					
			}
		});

		$(".sns_area_all .sns_event").click(function(){
			$(this).addClass("on");

		});
	})
}

/*
 * HDDFS 리뉴얼 프로젝트 [김희연 - 2021.06.25] - 무이자할부/카드혜택 레이아웃
 */
function showCardInfoLayer() {
	$(".credit_pop").dialog({
		dialogClass: "pop_type1",
        minHeight: 488,
        maxHeight: 600,
        width: 412,
        modal: true
    });
}

function luckyDealMake(){
	$.ajax({
        async       : true,
        url           : ctx_shop+"/dm/main/mainLckd.json",
        dataType    : "json",
        type        : "POST",
        success     : function(data, textStatus, jqXHR){
        	var list = data.lckd;
            var html = ""; 
            if(list != null){
            	if(list.goosList.length <1 ){
            		$(".luckyDealMenu").remove();
            	}else{
            		html+="<section class=\"luckybanner\">";
            		html+="<h3>럭키딜</h3>";
            		html+="<div class=\"box\">";
            		html+="<div class=\"luckybanner-swiper\">";
            		html+="<div class=\"swiper-wrapper\">";
            		for(var i=0; i<list.goosList.length; i++){
            			html+="<div class=\"swiper-slide\">";
            			html+="<a href=\""+ctx_shop+"/gd/dtl/goos.do?onlnGoosCd="+list.goosList[i].onlnGoosCd+"&MG=KR_PC_Main_Luckydeal_"+list.goosList[i].onlnGoosCd+"\">";
            			html+="<div>";
            			if(list.goosList[i].dcRate !="" && Number(list.goosList[i].dcRate) > 0){
            				html+="<i class=\"tnr_font\"><em>"+parseInt(list.goosList[i].dcRate)+"</em>%</i>";	
            			}
            			if(list.goosList[i].vdoIconYn =="Y" ){
            				html+="<em class=\"video\">동영상</em>";
            			}
            			html+="<span class=\"img\">";
            			html+="<img src=\""+SERVER_IMAGE_MNG+""+list.goosList[i].goosImgUrl+"?RS=212x212\">";
            			html+="</span>";
            			if(list.goosList[i].stocOnln < 1 || list.goosList[i].goosStatCd =="2" ){
            				html+="<p class=\"endofsale\">판매종료</p>";
            			}
            			html+="</div>";
            			html+="<dl>";
            			html+="<dt>"+list.goosList[i].branNm+"</dt>";
            			if(list.goosList[i].mdKwrdWrd !="" && list.goosList[i].mdKwrdWrd !=null){
            				html+="<dd class=\"tx_key\">"+list.goosList[i].mdKwrdWrd+"</dd>";	
            			}
            			html+="<dd>"+list.goosList[i].goosNm+"</dd>";
            			html+="</dl>";
            			html+="<ul>";
            			html+="<li>";
            			if(list.goosList[i].strkMarkYn =="Y" && list.goosList[i].goosApprBeyn =="N"){
            				html+="<del>$"+comma(list.goosList[i].pricOnln)+"</del>";
            				html+="<p>";
            				if(list.goosList[i].dcRate !="" && Number(list.goosList[i].dcRate) > 0){
            					html+=parseInt(list.goosList[i].dcRate)+"%";
            				}
            				html+="</p>";
            			}
            			html+="</li>";
            			html+="<li>";
            			html+="<strong>$"+comma(list.goosList[i].lastDcPric)+"</strong>";
    					html+="<p>"+comma(list.goosList[i].lastDcPricNtnl)+"<em>원</em></p>";
            			html+="</li>";
            			html+="</ul>";
            			html+="</a>";
            			html+="</div>";
            		}
            		html+="</div>";
            		html+="</div>";
            		html+="<div class=\"swiper-next\"></div>";
            		html+="<div class=\"swiper-prev\"></div>";
            		html+="</div>";
            		html+="</section>";
            		
            		$(".luckyDealMenu").html(html);
            		$(function(){
            			var swiperindex = $(".luckybanner-swiper .swiper-slide").length
            			if(swiperindex > 4){
            				var LuckyBannerswiper = new Swiper('.luckybanner-swiper', {
            					slidesPerView: 'auto',
            					loop:true,
            					lazy: {
            						loadPrevNext: true,
            						loadPrevNextAmount: 4
            					},
            					navigation: {
            						nextEl: '.luckybanner .swiper-next',
            						prevEl: '.luckybanner .swiper-prev',
            					},
            				});
            			}
            			else{
            				$(".luckybanner .swiper-next").hide()
            				$(".luckybanner .swiper-prev").hide()
            			}
            		});
            	}
            }
        },
        error       : function(jqXHR, textStatus, errorThrown){
            
        }
    });  
} 

function timeSaleMake(){ 
	$.ajax({
        async       : true,
        url           : ctx_shop+"/dm/main/tmSaleList.json",
        dataType    : "json",
        type        : "POST",
        success     : function(data, textStatus, jqXHR){
        	var tmDcList = data.tmDcList;
        	var tmDcPreList = data.tmDcPreList;
        	var html = "";
        	var count = 0;
        	if(tmDcList.length < 1 && tmDcPreList.length < 1){
        		$(".timeSaleMenu").remove();
        	}else{
        		html+="<section class=\"timesale\">";
        		html+="<h3>TIME SALE</h3>";
        		html+="<div class=\"box\">";
        		html+="<div class=\"timesale-swiper\">";
        		html+="<div class=\"swiper-wrapper\">"; 
        		for(var i =0; i < tmDcList.length; i++){
        			if(count < 20){
	        			html+="<div class=\"swiper-slide\" style=\"cursor: pointer;\" onclick=\"location.href='"+ctx_shop+"/dm/bran/brand.do?onlnBranCd="+tmDcList[i].onlnBranCd+"&MG=KR_PC_Main_Time_Sale_"+tmDcList[i].onlnBranCd+"';\">";
	            		html+="<a href=\""+ctx_shop+"/dm/bran/brand.do?onlnBranCd="+tmDcList[i].onlnBranCd+"&MG=KR_PC_Main_Time_Sale_"+tmDcList[i].onlnBranCd+"\">";
	            		html+="<u>"+tmDcList[i].dcRate+"% SALE</u>";
	            		html+="<u>"+tmDcList[i].branNm+"</u>";
	            		var dt = new Date(tmDcList[i].dcEndDttm);
	            		var year = dt.getFullYear();
	            		var month = Number(dt.getMonth()+1)<10 ? "0"+Number(dt.getMonth()+1) : Number(dt.getMonth()+1) ;
	            		var date = dt.getDate()<10 ? "0"+dt.getDate() : dt.getDate() ;
	            		var hours = dt.getHours() <10 ? "0"+dt.getHours() : dt.getHours() ;
	            		var minutes = dt.getMinutes() <10 ? "0"+dt.getMinutes() : dt.getMinutes() ;
	            		var seconds = dt.getSeconds() <10 ? "0"+dt.getSeconds() : dt.getSeconds() ;
	            		html+="<span class=\"get-standard-time\">"+year+"/"+month+"/"+date+" "+hours+":"+minutes+":"+seconds+"</span>";
	            		html+="</a>";
	            		html+="<img class=\"swiper-lazy\" src=\""+SERVER_IMAGE+"/images/KO/common/noimg.png?RS=530X412\" data-srcset=\""+SERVER_IMAGE_MNG+""+tmDcList[i].tmDcImg1Url+"?RS=670x710\" alt=\"\" data-src=\""+SERVER_IMAGE_MNG+""+tmDcList[i].tmDcImg1Url+"?RS=670x710\">";
	            		html+="</div>";
	            		count++;
        			}

         		}
        		for(var i =0; i < tmDcPreList.length; i++){
        			if(count< 20){ 
	        			html+="<div class=\"swiper-slide\" style=\"cursor: pointer;\" onclick=\"location.href='"+ctx_shop+"/dm/bran/brand.do?onlnBranCd="+tmDcPreList[i].onlnBranCd+"&MG=KR_PC_Main_Time_Sale_"+tmDcPreList[i].onlnBranCd+"';\">";
	        			html+="<div class=\"default\">";
	        			html+="<strong>coming soon</strong>";
	        			html+="<em>"+tmDcPreList[i].branNm+"</em>";
	        			var dt2 = new Date(tmDcPreList[i].dcStDttm);
	        			var year2 = dt2.getFullYear();
	            		var month2 = Number(dt2.getMonth()+1)<10 ? "0"+Number(dt2.getMonth()+1) : Number(dt2.getMonth()+1);
	            		var date2 = dt2.getDate()<10 ? "0"+dt2.getDate() : dt2.getDate() ;
	            		var hours2 = dt2.getHours() <10 ? "0"+dt2.getHours() : dt2.getHours() ;
	            		var minutes2 = dt2.getMinutes() <10 ? "0"+dt2.getMinutes() : dt2.getMinutes() ;
	            		var seconds2 = dt2.getSeconds() <10 ? "0"+dt2.getSeconds() : dt2.getSeconds() ;
	        			html+="<u>"+hours2+" : "+minutes2+"</u>";
	        			html+="<dl>";
	        			html+="<dt>남은시간</dt>";
	        			html+="<dd class=\"get-standard-time\">"+year2+"/"+month2+"/"+date2+" "+hours2+":"+minutes2+":"+seconds2+"</dd>";
	        			html+="</dl>";
	        			html+="</div>";
	        			html+="<img class=\"swiper-lazy\" src=\""+SERVER_IMAGE+"/images/KO/common/noimg.png?RS=530X412\" data-srcset=\""+SERVER_IMAGE_MNG+""+tmDcPreList[i].tmDcImg1Url+"?RS=670x710\" alt=\"\" data-src=\""+SERVER_IMAGE+"/images/KO/common/noimg.png?RS=530X412\">";
	        			html+="</div>";
	        			count++;
        			} 
        		}
        		html+="</div>";
        		html+="</div>";
        		html+="<div class=\"swiper-prev\"></div>";
        		html+="<div class=\"swiper-next\"></div>";
        		html+="</section>";
        		$(".timeSaleMenu").html(html);
        		
        		$(function(){
        			var swiperindex = $(".timesale-swiper .swiper-slide").length;
        			if(swiperindex > 2){
        				var LuckyBannerswiper = new Swiper('.timesale-swiper', {
        					slidesPerView: 'auto',
        					slidesPerGroup: 1,
        					observer:true,
        					observeParents:true,
        					spaceBetween: 20, // 2021-06-28 추가
        					lazy: {
        						loadPrevNext: true,
    						},
        					autoplay: {
        					 	delay: 5000,
        					 	disableOnInteraction: false,
        					},
        					navigation: {
        						nextEl: '.timesale .swiper-next',
        						prevEl: '.timesale .swiper-prev',
        					},
        				});
        			}
        			else{
        				$(".timesale-swiper .swiper-slide").css({margin:"0 auto"})
        				$(".timesale .swiper-next").hide()
        				$(".timesale .swiper-prev").hide()
        			}
        			
        			if (window.NodeList && !NodeList.prototype.forEach) {
        				NodeList.prototype.forEach = Array.prototype.forEach;
        			}
        			var TimeSale = document.querySelectorAll(".get-standard-time");
        			TimeSale.forEach(function(timer){
        				var countDownDate = new Date(timer.innerText).getTime();
        				var x = setInterval(function() {
        					var now = new Date().getTime();
        					var distance = countDownDate - now;
        					var h = Math.floor(distance / (1000 * 60 * 60));
        					var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        					var s = Math.floor((distance % (1000 * 60)) / 1000);
        						if(h < 10){
        							h = "0"+h;
        						}
        						if(m < 10){
        							m = "0"+m;
        						}
        						if(s < 10){
        							s = "0"+s;
        						}
        						timer.innerHTML = "<strong>"+h+"</strong><em>:</em><strong>"+m+"</strong><em>:</em><strong>"+s+"</strong>";
        						if (distance < 0) {
        							clearInterval(x);
        							timer.innerHTML = "EXPIRED";
        						}
        				}, 1000);
        			}); 
        		});
        	}
        },
	    error       : function(jqXHR, textStatus, errorThrown){
	        
	    }
	});  
}

// HDDFS 리뉴얼 프로젝트 [2021.07.27] - 장바구니 카운트 업데이트
function addCartCount(sumResult){
	
	if($("#rwingCartCnt").length != 0){
    	var text    = $("#rwingCartCnt").text();
    	var cnt = 0;
    	if(text == "99+"){
    		cnt ="99+";
    	}else{
    		cnt= text == '' ? 1 : Number(text) + Number(sumResult);
    	}
    	$("#rwingCartCnt").text(cnt).show();
    }	
}

function XSSCheck(str, level) {
    if (level == undefined || level == 0) {
        str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");
    } else if (level != undefined && level == 1) {
        str = str.replace(/\</g, "&lt;");
        str = str.replace(/\>/g, "&gt;");
    }
    return str;
}

/**
 * HDDFS 리뉴얼 프로젝트 [김인호 - 2021.10.06] -  와이즈로그 정보 수집
 */
function wiseLogAggr(MG){
	
	$.ajax({
        url         : ctx_curr + "/cm/comm/wiseLogAggr.json?MG="+MG,
        method      : "post",
        async       : true,
        dataType    : "json",
        success     : function(data, textStatus, jqXHR){
            
        },
        error       : function(jqXHR, textStatus, errorThrown){
        }
    });   
}


function hShareListMake(){ 
	$.ajax({
        async       : true,
        url           : ctx_shop+"/dm/main/mainHShareList.json",
        dataType    : "json",
        type        : "POST",
        success     : function(data, textStatus, jqXHR){
        	var hShareList = data.hShareList;
        	var html = "";
        	
        	if(hShareList.length < 1 && hShareList.length < 1){
        		$(".hShareMenu").remove();
        	}else{
        		html+="<section class=\"hshare\">";
        		html+="<h3>H.SHARE 뭉치면 싸진다!</h3>";
        		html+="<div class=\"box\">";
        		html+="<div class=\"hshare-swiper\">";
        		html+="<div class=\"swiper-wrapper\">"; 
        		for(var i =0; i < hShareList.length; i++){
        			html+="<div class=\"swiper-slide\">";
        			html+="<span class=\"info\">";
        			html+="<span class=\"share\"><strong>"+hShareList[i].maxTargPect+"</strong>명 뭉치면</span>";
        			html+="<span class=\"discount\">최대 <strong>"+hShareList[i].maxDcRate+"%</strong> 할인</span>";
        			html+="</span>";
        			html+="<a href=\""+ctx_shop+"/gd/dtl/goos.do?onlnGoosCd="+hShareList[i].onlnGoosCd+"\">";
        			html+="<span class=\"img\">";
        			html+="<img src=\""+SERVER_IMAGE_MNG+""+hShareList[i].goosImgUrl+"?RS=250x250\">";
        			html+="</span>";
        			html+="<span class=\"product\">";
        			html+="<span class=\"schedule\">";
        			var hShareEndDt = new Date(hShareList[i].hShareEndDttm).getTime();
        			var today = new Date().getTime();
        			var gap = hShareEndDt - today;
        			var day = (Math.ceil(gap / (1000 * 60 * 60* 24)))-1;
            		html+="<span class=\"date\">남은일정 <strong>D-"+day+"</strong></span>";
            		html+="<span class=\"peolpe\">참여인원 <strong><em>"+hShareList[i].pectCnt+"</em>/"+hShareList[i].maxTargPect+"</strong></span>";
            		html+="</span>";
            		html+="<span class=\"goodsnm\">";
            		html+="<strong>#"+hShareList[i].branNm+"</strong>";
            		html+="<em>"+hShareList[i].goosNm+"</em>";
            		html+="</span>";
            		html+="<span class=\"percent\">";
            		html+="<del>$"+comma(hShareList[i].saleUcstDolrAmt)+"</del>";
            		html+="<strong>"+hShareList[i].goosDcRate+"%</strong>";
            		html+="</span>";
            		html+="<span class=\"price\">";
            		html+="<i>최대혜택가</i> <strong>$"+comma(hShareList[i].lastDcPric)+"</strong>";
            		html+="<em>"+comma(hShareList[i].goosDcPriceXmny)+"원</em>";
            		html+="</span>";
            		html+="</a>";
            		html+="</div>";
         		}
        		html+="</div>";
        		html+="</div>";
        		html+="<div class=\"swiper-prev\"></div>";
        		html+="<div class=\"swiper-next\"></div>";
        		html+="</div>";
        		html+="</section>";
        		$(".hShareMenu").html(html);
        		
        		$(function(){
        			var HshareSwiper = new Swiper('.hshare-swiper', {
        				slidesPerView: 'auto',
        				slidesPerGroup: 1,
        				observer:true,
        				observeParents:true,
        				spaceBetween: 20,
        				watchOverflow:true,
        				navigation: {
        					nextEl: '.hshare .swiper-next',
        					prevEl: '.hshare .swiper-prev',
        				},
        				lazy: {
        					loadPrevNext: true,
        				},
        				//loop: $('.hshare-swiper .swiper-slide').length > 3 ? true : false,
        				on: {
        					init: function(){
        						if($(".hshare-swiper .swiper-slide").length < 3) {
        							$('.hshare .swiper-next').hide();
        							$('.hshare .swiper-prev').hide();
        						}
        					}
        				},
        			});
        		});
        	}

        },
	    error       : function(jqXHR, textStatus, errorThrown){
	        
	    }
	});  
}

/**
 * 22.06 고유식별정보 수집동의 팝업 보기/닫기, 22.10 수정
 */
/*function showUnqIdtInfoTermsPop(flag){
    if(flag == "open" && $('#psptRcvYn').val()== "N"){
        $('#psptRcvYn').val('N');
        $("#unqIdtInfoTermsPop").dialog('open');
    }else if(flag == "check"){
        $('#psptRcvYn').val('Y');
        $('#unqIdtInfoTermsPop').dialog('close');
    }else{
        $('#unqIdtInfoTermsPop').dialog('close');
    }
}*/
function uniqAgree(){
	if($('input.uniqeChk').is(":checked")){
		$('.input_passport input, input.input_passport').prop("disabled", false);
		$('#psptRcvYn').val('Y');
	} else {
		$('#psptRcvYn').val('N');
		$('.input_passport input').val('');
		$('.input_passport input').prop("disabled", true);
	}
}
function showUnqIdtInfoTermsPop(flag){
    if(flag == "open"){
        $("#unqIdtInfoTermsPop").dialog('open');
    }else if(flag == "agree"){
    	if(!$('input.uniqeChk').is(":checked")){
    		$('input.uniqeChk').prop('checked',true);
    	}
    	if($(".join_form.input_passport").length > 0 || $(".info_table.input_passport").length > 0){
    		$('.input_passport input').prop("disabled", false);
    	}
    	if($(".passport_wrap").length > 0){
    		$('input.input_passport').prop("disabled", false);
    	}
    	$('#psptRcvYn').val('Y');
        $('#unqIdtInfoTermsPop').dialog('close');
    }else if(flag == "disagree"){
    	if($('input.uniqeChk').is(":checked")){
			$('input.uniqeChk').prop('checked',false);
		}
    	if($(".join_form.input_passport").length > 0 || $(".info_table.input_passport").length > 0){
    		$('.input_passport input').val('');
    		$('.input_passport input').prop("disabled", true);
    	}
    	if($(".passport_wrap").length > 0){
    		//$('input.input_passport').val('');
    		//$('input.input_passport').prop("disabled", true);
    	}
    	
    	$('#psptRcvYn').val('N');
        $('#unqIdtInfoTermsPop').dialog('close');
    }else{
        $('#unqIdtInfoTermsPop').dialog('close');
    }
}

/**
 * 여권정보 형식 validation
 */
function validationDataForPassport(natiCd){
    var psptNo = $('#psptNo').val();
    
    if(natiCd=='KOR'){ // M00000000, M000X0000
        if($('#psptNo').val().length != 9) { // 9자
            return false;
        }
        if(!psptNo.startsWith('M')) { // M00000000, M000X0000
        	return false;
        }else if(psptNo.startsWith('M') && !fnIsAlpha(psptNo.charAt(4))){ // M00000000
        	if(!fnIsNumber(psptNo.substr(1))){
        		return false;
        	}
        }else if(psptNo.startsWith('M') && fnIsAlpha(psptNo.charAt(4))){ // M000X0000
        	if(!fnIsNumber(psptNo.substr(1, 3)) || !fnIsNumber(psptNo.substr(5))){
        		return false;
        	}
        }
    }else if(natiCd=='CHN'){ // X00000000, XX0000000, EX0000000
        if($('#psptNo').val().length != 9) { // 9자
        	return false;
        }
        if(!fnIsAlpha(psptNo.substr(0, 1))){ // X00000000
        	return false;
        }else if(fnIsAlpha(psptNo.substr(0, 1))){
        	if(fnIsAlpha(psptNo.substr(0, 2))){
        		if(!fnIsNumber(psptNo.substr(2))){ // XX0000000
            		return false;
            	}
        	}else{
        		if(psptNo.startsWith('E')){// EX0000000
        			return false;
        		}else if(!fnIsNumber(psptNo.substr(1))){ // X00000000
            		return false;
            	}
        	} 	
        }
    }else if(natiCd=='USA'){ // 숫자 9자리
        if($('#psptNo').val().length != 9) {
        	return false;
        }
        if(!fnIsNumber($('#psptNo').val())){
    		return false;
    	}
    }else if(natiCd=='VNM'){ // 8자리 이상 9자리 이하
        if($('#psptNo').val().length < 8 || $('#psptNo').val().length > 9) {
        	return false;
        }
    }
    
    return true;
}
