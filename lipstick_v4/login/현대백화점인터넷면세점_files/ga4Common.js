/* GA4 Common JS */
$(document).ready(function(){
	/** 
	 * 인트로 (2023-07-26 리뉴얼 이전버전 주석처리)
	 */
	// 로고
	// $(document).on("click", ".intro_box .intro_contens .intro_logo a", function(){
	// 	GA_Event("click_PC_국문_인트로", "인트로", "인트로", "메인");
	// });
	
	// 메인으로 이동하기
	// $(document).on("click", ".intro_box .btn_gohome a", function(){
	// 	GA_Event("click_PC_국문_인트로", "이동하기", "이동하기", "메인");
	// });
	
	// 검색
	// $(document).on("click", ".intro_box .intro_contens .introsearcharea button", function(){
	// 	if ($(this).hasClass("btn_tag") == true){
	// 		GA_Event("click_PC_국문_인트로", "인트로", "인트로", "해시태그검색");
	// 	} else if ($(this).hasClass("btn_text") == true){
	// 		GA_Event("click_PC_국문_인트로", "인트로", "인트로", "일반검색");
	// 	} else if ($(this).attr("id") == "srchBtn"){
	// 		if ($(this).parents(".introsearcharea").hasClass("taginput") == true){
	// 			GA_Event("click_PC_국문_인트로", "인트로", "인트로", "해시태그검색");
	// 		} else {
	// 			GA_Event("click_PC_국문_인트로", "인트로", "인트로", "검색");
	// 		}
	// 	}
	// });
	
	// 해시태그 검색어
	// $(document).on("click", ".intro_contens .hashtag_area a", function(){
	// 	var tagTerm = $(this).text().replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_인트로", "인트로", "인트로_해시태그검색어", "검색어_"+tagTerm);
	// });


	/** 
	 * 메인 (2023-07-26 리뉴얼)
	 */
	//상단메뉴
	$(document).on("click", ".wrap-main-category .inner-main-category .swiper-slide", function(){    
		let categoryName = $(this).find("a").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "상단메뉴", "상단메뉴_카테고리", categoryName);		
	});

	//메인배너 (2023-07-26 수정)
	$(document).on("click", ".area-visual .box-visual .swiper-slide", function(){    
		if($(this).find("img").length){
			let bannerNameImg = $(this).find(".visual-txt__tit").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "배너_"+bannerNameImg);
		}
		else if($(this).find("video").length){
			var bannerNameVideo = $(this).find("video").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "배너_"+bannerNameVideo);
		}		
	});

	//오늘의 특가
	$(document).on("click", ".main-content .special-price .box-tit a", function(){
		GA_Event("click_PC_국문_메인", "오늘의특가", "오늘의특가", "더보기");		
	});
	$(document).on("click", ".main-content .special-price .area-tab ul.tab-special-price li", function(){   
		let tabName = $(this).find("button").text().replace(/\s/g, ""); 
		GA_Event("click_PC_국문_메인", "오늘의특가", "오늘의특가", "탭_"+tabName);		
	});
	$(document).on("click", ".main-content .special-price .area-tab #special-price--1 ul li", function(){   
		let productName = $(this).find(".product__brand-info").text().replace(/\s/g, ""); 
		GA_Event("click_PC_국문_메인", "오늘의특가", "오늘의특가_특가상품", "상품_"+productName);		
	});
	$(document).on("click", ".main-content .special-price .area-tab #special-price--2 ul li", function(){   
		let brandName = $(this).find(".product__img--logo img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "오늘의특가", "오늘의특가_특가브랜드", "브랜드_"+brandName);
	}); 

	//쇼핑혜택
	$(document).on("click", ".main-content .customer-benefit .wrap-tit ul li", function(){    
		let tabName = $(this).find("button").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "쇼핑혜택", "쇼핑혜택_탭", "탭_"+tabName);		
	});
	$(document).on("click", ".main-content .customer-benefit .tab-content.is-active .swiper-slide", function(){
		let tabName = $(this).parents(".area-tab").find(".wrap-tit ul li.is-active button").text().replace(/\s/g, "");
		let bannerName = $(this).find(".customer-benefit__tit").text().replace(/\s/g, "");
		if($(this).hasClass("product-more-link")) {
			GA_Event("click_PC_국문_메인", "쇼핑혜택", "쇼핑혜택_탭"+tabName, "배너_더보기");			
		}
		else{
			GA_Event("click_PC_국문_메인", "쇼핑혜택", "쇼핑혜택_탭"+tabName, "배너_"+bannerName);			
		}    
	});

	//TREND.H (THE FRONT ROW)
	$(document).on("click", ".main-content .front-row .box-tit a", function(){
		GA_Event("click_PC_국문_메인", "THEFRONTROW", "THEFRONTROW", "더보기");		
	});
	$(document).on("click", ".main-content .front-row .swiper__front-row .swiper-slide .front-row__img a", function(){	
		let bannerName = $(this).parents(".swiper-slide").find(".front-row__info .front-row__tit").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "THEFRONTROW", "THEFRONTROW배너", "배너_"+bannerName);		
	});
	$(document).on("click", ".main-content .front-row .swiper__front-row .swiper-slide .front-row__wrap .product__item a", function(){
		let bannerName = $(this).parents(".swiper-slide").find(".front-row__info .front-row__tit").text().replace(/\s/g, "");
		let brandName = $(this).find(".product__brand").text().replace(/\s/g, "");
		let productName = $(this).find(".product__brand-info").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "THEFRONTROW", "THEFRONTROW배너_"+bannerName, "상품_"+brandName+productName);		
	});

	//띠배너
	$(document).on("click", ".main-content .main-banner .swiper-slide a", function(){	
		let bannerName = $(this).find(".main-banner__tit").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "띠배너", "띠배너", "배너_"+bannerName);		
	});

	//H.SHARE
	$(document).on("click", ".main-content .h-share .swiper__h-share .swiper-slide .product__item a", function(){	
		let brandName = $(this).find(".product__brand").text().replace(/\s/g, "");
		let productName = $(this).find(".product__brand-info").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "H.SHARE", "H.SHARE_상품", "상품_"+brandName+productName);		
	});

	//해시태그
	$(document).on("click", ".main-content .hash-tag ul.tab-hash-tag li", function(){
		let tabName = $(this).find("button").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "해시태그둘러보기", "해시태그둘러보기_탭", "탭_"+tabName);		
	});
	$(document).on("click", ".main-content .hash-tag .tab-content.is-active .hash-tag-inner ul.list-product li", function(){	
		let tabName = $(this).parents(".hash-tag").find("ul.tab-hash-tag li.is-active button").text().replace(/\s/g, "");
		let brandName = $(this).find(".product__brand").text().replace(/\s/g, "");
		let productName = $(this).find(".product__brand-info").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "해시태그둘러보기", "해시태그둘러보기_탭_"+tabName, "상품_"+brandName+productName);		
	});
	$(document).on("click", ".main-content .hash-tag .tab-content.is-active .hash-tag-banner .hash-tag__more a", function(){
		let tabName = $(this).parents(".hash-tag").find("ul.tab-hash-tag li.is-active button").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_메인", "해시태그둘러보기", "해시태그둘러보기_탭_"+tabName, "더보기");		
	});


	/** 
	 * 메인 (2023-07-26 리뉴얼 이전버전 주석처리)
	 */
	// // 인트로로 이동하기
	// $(document).on("click", ".btn_gointro a", function(){
	// 	GA_Event("click_PC_국문_메인", "이동하기", "이동하기", "INTRO");
	// });

	// // 메인팝업
	// $(document).on("click", ".main_popup .mainPopList .swiper-slide", function(){
	// 	var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너_팝업", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".main_popup .close_section input[class='today_close'] + label", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너_팝업", "오늘하루보지않기");
	// });
	// $(document).on("click", ".main_popup .close_section .popup_close", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너_팝업", "닫기");
	// });

	// // 메인배너
	// $(document).on("click", ".keyvisual .swiper-slide", function(){
	// 	var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".keyvisual .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "좌측이동");
	// });
	// $(document).on("click", ".keyvisual .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "우측이동");
	// });

	// // 메인배너 - 스와이프(/js/KO/main.ui.js)

	// // 메인배너 전체보기
	// $(document).on("click", ".keyvisual .controller .swiper-more", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "전체보기");
	// });
	// $(document).on("click", ".popevent_box .p_box a.p_item", function(){
	// 	var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너_전체보기", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".popevent_box .popevent_close", function(){
	// 	GA_Event("click_PC_국문_메인", "메인배너", "메인배너_전체보기", "닫기");
	// });

	// // 특화관배너
	// $(document).on("click", ".brandbanner-swiper .swiper-slide a", function(){
	// 	var bnnrNm = $(this).find("p").text().replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "특화관배너", "특화관배너", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".brandbanner .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "특화관배너", "특화관배너", "좌측이동");
	// });
	// $(document).on("click", ".brandbanner .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "특화관배너", "특화관배너", "우측이동");
	// });

	// // 럭키딜
	// $(document).on("click", ".luckybanner-swiper .swiper-slide a", function(){
	// 	var prodNm = $(this).find("dl dd").text();
	// 	GA_Event("click_PC_국문_메인", "럭키딜", "럭키딜_상품", "상품_"+prodNm);
	// });
	// $(document).on("click", ".luckybanner .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "럭키딜", "럭키딜", "좌측이동");
	// });
	// $(document).on("click", ".luckybanner .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "럭키딜", "럭키딜", "우측이동");
	// });
	
	// // TIMESALE
	// $(document).on("click", ".timesale-swiper .swiper-slide", function(){
	// 	var bnnrNm = $(this).find("u").text().replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "TIMESALE", "TIMESALE", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".timesale .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "TIMESALE", "TIMESALE", "좌측이동");
	// });
	// $(document).on("click", ".timesale .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "TIMESALE", "TIMESALE", "우측이동");
	// });
	
	// // H.SHARE
	// $(document).on("click", ".hshare-swiper .swiper-slide a", function(){
	// 	var prodNm = $(this).find(".goodsnm em").text();
	// 	GA_Event("click_PC_국문_메인", "HSHARE", "HSHARE_상품", "상품_"+prodNm);
	// });
	// $(document).on("click", ".hshare .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "HSHARE", "HSHARE", "좌측이동");
	// });
	// $(document).on("click", ".hshare .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "HSHARE", "HSHARE", "우측이동");
	// });
	
	// // 해시태그배너
	// $(document).on("click", ".hashtag .title h3", function(){
	// 	var bnnrNm = $(this).parents(".title").find("img").attr("alt").replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너", "배너_"+bnnrNm);
	// });
	// $(document).on("click", ".hashtag .title .btn", function(){
	// 	var bnnrNm = $(this).parents(".title").find("img").attr("alt").replace(/\s/g, "");
	// 	if ($(this).parents(".hashtag").hasClass("open") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_"+bnnrNm, "펼치기");
	// 	} else {
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_"+bnnrNm, "닫기");
	// 	}
	// });

	// // 해시태그배너 탭
	// $(document).on("click", ".hashtag .tab_round .tab_item", function(){
	// 	if ($(this).hasClass("tab_prod") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_상품");
	// 	} else if ($(this).hasClass("tab_bran") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_브랜드");
	// 	} else if ($(this).hasClass("tab_setProd") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_세트상품");
	// 	} else if ($(this).hasClass("tab_even") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_이벤트");
	// 	} else if ($(this).hasClass("tab_spec") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_기획전");
	// 	} else if ($(this).hasClass("tab_sale") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_세일");
	// 	} else if ($(this).hasClass("tab_gift") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_사은행사");
	// 	} else if ($(this).hasClass("tab_coup") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_쿠폰");
	// 	} else if ($(this).hasClass("tab_mile") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭", "탭_적립금");
	// 	}
	// });

	// // 해시태그배너 탭 배너
	// $(document).on("click", ".hashtag .product_module .product_itme a", function(){
	// 	var tabNm = $(this).parents(".pro_banner");
	// 	if (tabNm.hasClass("pro_prod") == true){
	// 		// 상품
	// 		var prodNm = $(this).find(".tx_ex").text();
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_상품", "상품_"+prodNm);
	// 	} else if (tabNm.hasClass("pro_bran") == true){
	// 		// 브랜드(circle형/square형)
	// 		var branNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_브랜드", "브랜드_"+branNm);
	// 	} else if (tabNm.hasClass("pro_setProd") == true){
	// 		// 세트상품(기본세트/이상세트)
	// 		var prodNm = $(this).find("img").attr("alt");
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_세트상품", "세트상품_"+prodNm);
	// 	} else if (tabNm.hasClass("pro_even") == true){
	// 		// 이벤트(이미지형/텍스트형)
	// 		if ($(this).parents(".product_module").hasClass("img_banner")){
	// 			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_이벤트", "이벤트_"+bnnrNm);
	// 		} else if (($(this).parents(".product_module").hasClass("text_banner"))){
	// 			var bnnrNm = $(this).find("dl dt").text().replace(/\s/g, "");
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_이벤트", "이벤트_"+bnnrNm);
	// 		}
	// 	} else if (tabNm.hasClass("pro_spec") == true){
	// 		// 기획전(이미지형/텍스트형)
	// 		if ($(this).parents(".product_module").hasClass("img_banner")){
	// 			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_기획전", "기획전_"+bnnrNm);
	// 		} else if (($(this).parents(".product_module").hasClass("text_banner"))){
	// 			var bnnrNm = $(this).find("dl dt").text().replace(/\s/g, "");
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_기획전", "기획전_"+bnnrNm);
	// 		}
	// 	} else if (tabNm.hasClass("pro_sale") == true){
	// 		// 세일
	// 		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_세일", "세일_"+bnnrNm);
	// 	} else if (tabNm.hasClass("pro_gift") == true){
	// 		// 사은행사
	// 		var bnnrNm = $(this).find("dl dt").text().replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_사은행사", "사은행사_"+bnnrNm);
	// 	} else if (tabNm.hasClass("pro_coup") == true){
	// 		// 쿠폰
	// 		var coupTxt = $(this).parents(".product_itme").find("dl dt").text(),
	// 			coupTxt1 = $(this).parents(".product_itme").find("strong").text(),
	// 			coupNm = (coupTxt+"_"+coupTxt1).replace(/\s/g, ""),
	// 			coupNmCut = coupNm.substring(0, 20);
	// 		if (coupNm.length > 20){ // 글자수 제한(20자 이상 삭제)
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_쿠폰", "쿠폰_"+coupNmCut+"⋯");
	// 		} else {
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_쿠폰", "쿠폰_"+coupNm);
	// 		}
	// 	} else if (tabNm.hasClass("pro_mile") == true){
	// 		// 적립금
	// 		var mileTxt = $(this).parents(".product_itme").find("p").text(),
	// 			mileTxt1 = $(this).parents(".product_itme").find("span").text(),
	// 			mileTxt2 = $(this).parents(".product_itme").find("strong").text(),
	// 			mileNm = (mileTxt+"_"+mileTxt1+"_"+mileTxt2).replace(/\s/g, ""),
	// 			mileNmCut = mileNm.substring(0, 20);
	// 		if (mileNm.length > 20){ // 글자수 제한(20자 이상 삭제)
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_적립금", "적립금_"+mileNmCut+"⋯");
	// 		} else {
	// 			GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_적립금", "적립금_"+mileNm);
	// 		}
	// 	}
	// });
	// // 해시태그배너 상품 버튼(로그인, 장바구니, 바로구매, 재입고알림)(/js/KO/common.js)

	// // 해시태그배너 탭 배너 더보기
	// $(document).on("click", ".hashtag .pro_banner a.more", function(){
	// 	var tabNm = $(this).parents(".pro_banner");
	// 	if (tabNm.hasClass("pro_prod") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_상품", "더보기");
	// 	} else if (tabNm.hasClass("pro_bran") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_브랜드", "더보기");
	// 	} else if (tabNm.hasClass("pro_setProd") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_세트상품", "더보기");
	// 	} else if (tabNm.hasClass("pro_even") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_이벤트", "더보기");
	// 	} else if (tabNm.hasClass("pro_spec") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_기획전", "더보기");
	// 	} else if (tabNm.hasClass("pro_sale") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_세일", "더보기");
	// 	} else if (tabNm.hasClass("pro_gift") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_사은행사", "더보기");
	// 	} else if (tabNm.hasClass("pro_coup") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_쿠폰", "더보기");
	// 	} else if (tabNm.hasClass("pro_mile") == true){
	// 		GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_적립금", "더보기");
	// 	}
	// });

	// // 해시태그배너 좌우이동
	// // 브랜드
	// $(document).on("click", ".hashtag .pro_bran .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_브랜드", "좌측이동");
	// });
	// $(document).on("click", ".hashtag .pro_bran .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_브랜드", "우측이동");
	// });
	// // 이벤트(텍스트형)
	// $(document).on("click", ".hashtag .pro_even .text_banner .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_이벤트", "좌측이동");
	// });
	// $(document).on("click", ".hashtag .pro_even .text_banner .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_이벤트", "우측이동");
	// });
	// // 기획전(텍스트형)
	// $(document).on("click", ".hashtag .pro_spec .text_banner .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_기획전", "좌측이동");
	// });
	// $(document).on("click", ".hashtag .pro_spec .text_banner .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_기획전", "우측이동");
	// });
	// // 사은행사 
	// $(document).on("click", ".hashtag .pro_gift .swiper-prev", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_사은행사", "좌측이동");
	// });
	// $(document).on("click", ".hashtag .pro_gift .swiper-next", function(){
	// 	GA_Event("click_PC_국문_메인", "해시태그배너", "해시태그배너_탭_사은행사", "우측이동");
	// });


	/** 
	 * 공통(Header/Footer)
	 */
	// 맨위로 버튼
	$(document).on("click", ".totop", function(){
		GA_Event("click_PC_국문_공통", "Floating", "Floating", "맨위로");
	});

	/* 공통 > Header */ /* (2023-07-26 리뉴얼) */ /* (2023-07-26 수정)*/
	//Header
	$(document).on("click", ".area-gnb .wrap-gnb-util ul.list-gnb-util li a", function(){    
		let buttonName = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "Header", "Header", buttonName);
	});
	$(document).on("click", ".area-gnb .wrap-gnb-logo .btn_gnb", function(){        
		GA_Event("click_PC_국문_공통", "Header", "Header", "햄버거");
	});
	$(document).on("click", ".area-gnb .wrap-gnb-logo h1", function(){        
		GA_Event("click_PC_국문_공통", "Header", "Header", "홈버튼");
	});
	$(document).on("click", ".area-gnb .wrap-gnb-logo .wrap-gnb-search button", function(){    
		let buttonName = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "Header", "Header", buttonName);
	});
	$(document).on("click", ".area-gnb .wrap-gnb-logo .default_menu > ul > li > a", function(){
		let buttonCheck = $(this).parent();
		if(!buttonCheck.hasClass("hidden_menu")){
			let buttonName = $(this).find("strong").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_공통", "Header", "Header", buttonName);
		}
	});
	$(document).on("click", ".area-gnb .wrap-gnb-util .box-gnb-util ul.list-language li a", function(){
		let languageName = $(this);
		if(languageName.hasClass("ko")){
			GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_한국어");
		}
		else if(languageName.hasClass("cn")){
			GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_중국어");
		}
		else if(languageName.hasClass("en")){
			GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_영어");
		}
	});

	//퀵메뉴
	$(document).on("click", ".area-gnb .wrap-gnb-logo .default_menu .swiper-slide a", function(){
		let buttonName = $(this).find("p").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "퀵메뉴", "퀵메뉴_더보기", buttonName);
	});

	//햄버거메뉴
	$(document).on("click", ".navication .gnb-category__content ul.gnb-category--list > li > a", function(){
		let categoryName = $(this).find("span").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_카테고리", "카테고리_"+categoryName);
	});
	$(document).on("click", ".navication .gnb-category__content ul.gnb-category--2depth > li > a", function(){
		let categoryName1st = $(this).parents(".gnb-category__inner").find("ul.gnb-category--list > li.is-active > a > span").text().replace(/\s/g, "");
		let categoryName2nd = $(this).find("span").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "카테고리_"+categoryName1st, "카테고리_"+categoryName2nd);
	});
	$(document).on("click", ".navication .gnb-category__content ul.gnb-category--3depth > li > a", function(){
		let categoryName2nd = $(this).parents(".gnb-category__inner").find("ul.gnb-category--2depth.is-active > li.is-active > a > span").text().replace(/\s/g, "");
		let categoryName3rd = $(this).find("span").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "카테고리_"+categoryName2nd, categoryName2nd+"_"+categoryName3rd); //2023-07-26 수정
	});
	$(document).on("click", ".navication .wrap-gnb-service .gnb-service ul.list-quick-link li a", function(){
		let buttonName = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_전체서비스", buttonName);
	});
	$(document).on("click", ".navication .gnb-showroom .swiper-slide", function(){
		let eventName1st = $(this).find(".product__brand").text().replace(/\s/g, "");
		let eventName2nd = $(this).find(".product__brand-info").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_쇼룸", "이벤트_"+eventName1st+eventName2nd);
	});


	/* 공통 > Header */ /* (2023-07-26 리뉴얼 이전버전 주석처리) */
	// 홈버튼, 햄버거, 햄버거 닫기
	// $(document).on("click", "#header h1", function(){
	// 	GA_Event("click_PC_국문_공통", "Header", "Header", "홈버튼");
	// });
	// $(document).on("click", "#header .btn_gnb", function(){
	// 	GA_Event("click_PC_국문_공통", "Header", "Header", "햄버거");
	// });
	// $(document).on("click", ".navication .gnb_close, .gnb_dim", function(){
	// 	if ($(document).on("click", ".navication").hasClass("open") == true){			
	// 		GA_Event("click_PC_국문_공통", "Header", "Header_햄버거", "닫기");
	// 	}
	// });

	// // 유틸메뉴
	// $(document).on("click", ".default_menu #loginBtn", function(){
	// 	GA_Event("click_PC_국문_공통", "Header", "Header", "로그인");
	// });
	// $(document).on("click", ".default_menu #logoutBtn", function(){
	// 	GA_Event("click_PC_국문_공통", "Header", "Header", "로그아웃");
	// });
	// $(document).on("click", ".default_menu .menu_login_join[href*='join.do']", function(){
	// 	GA_Event("click_PC_국문_공통", "Header", "Header", "회원가입");
	// });
	// $(document).on("click", ".default_menu li a", function(){
	// 	var menuNm = $(this).parents("li");
	// 	if (menuNm.hasClass("item_01") == true){
	// 		GA_Event("click_PC_국문_공통", "Header", "Header", "장바구니");
	// 	} else if (menuNm.hasClass("item_02") == true){
	// 		GA_Event("click_PC_국문_공통", "Header", "Header", "주문조회");
	// 	} else if (menuNm.hasClass("item_03") == true){
	// 		GA_Event("click_PC_국문_공통", "Header", "Header", "마이현대");
	// 	} else if (menuNm.hasClass("item_04") == true){
	// 		GA_Event("click_PC_국문_공통", "Header", "Header", "고객센터");
	// 	} else if (menuNm.hasClass("item_05") == true){
	// 		GA_Event("click_PC_국문_공통", "Header", "Header", "공식사이트");
	// 	} else if (menuNm.hasClass("language") == true){
	// 		$(document).on("click", ".default_menu .language div a", function(){
	// 			if ($(this).hasClass("ko") == true){					
	// 				GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_한국어");
	// 			} else if ($(this).hasClass("cn") == true){					
	// 				GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_중국어");
	// 			} else if ($(this).hasClass("en") == true){					
	// 				GA_Event("click_PC_국문_공통", "Header", "Header_언어", "언어_영어");
	// 			} 
	// 		});
	// 	} else if (menuNm.hasClass("currency") == true){
	// 		// 환율(KRW/CNY)
	// 		$(document).on("click", ".default_menu .currency div a", function(){
	// 			var curnTp = $(this).text();
	// 			GA_Event("click_PC_국문_공통", "Header", "Header_환율", "환율_"+curnTp);
	// 		});
	// 	}
	// });

	// // 히든메뉴
	// $(document).on("click", ".hidden_menu .item .swiper-slide a", function(){
	// 	var menuNm = $(this).find("p").text().replace(/\s/g, "");
	// 	GA_Event("click_PC_국문_공통", "퀵메뉴", "퀵메뉴_더보기", menuNm);
	// });
	
	// // GNB 퀵메뉴
	// $(document).on("click", ".quick_link li.ql_03 a", function(){
	// 	GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴", "주문내역");
	// });
	// $(document).on("click", ".quick_link li.ql_01 a", function(){
	// 	GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴", "주문가능시간");
	// });
	// $(document).on("click", ".quick_link li.ql_04 a", function(){
	// 	GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴", "출국정보");
	// });
	// $(document).on("click", ".quick_link li.ql_02 a", function(){
	// 	GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴", "여권정보");
	// });

	// // GNB - depth(/js/KO/common.ui.js)
	// // GNB - menu
	// $(document).on("click", "#gnb ul.depth_02 li a", function(){
	// 	var gnbDepth = $(this).parents("ul.depth_02");
	// 	if (gnbDepth.hasClass("serviceMenu") == true){
	// 		var gnbNm = $(this).text().replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_전체서비스", gnbNm);
	// 	} else if (gnbDepth.hasClass("serviceCtgList") == true){ // depth03
	// 		var	gnbNm = $(this).parents("ul.depth_03").siblings("strong").text().replace(/\s/g, ""),
	// 			gnbNm1 = $(this).text().replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_카테고리", "카테고리_"+gnbNm+"_"+gnbNm1);
	// 	} else if (gnbDepth.hasClass("gnb_luxury") == true){
	// 		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_공식스토어", "브랜드_"+gnbNm);
	// 	} else if (gnbDepth.hasClass("gnb_brand") == true){
	// 		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
	// 		GA_Event("click_PC_국문_공통", "햄버거_메뉴", "햄버거_메뉴_행사중인브랜드", "브랜드_"+gnbNm);
	// 	}
	// });
	
	/* 공통 > Footer */
	// 홈버튼, SNS
	$(document).on("click", ".copyright .logo span", function(){
		GA_Event("click_PC_국문_공통", "Footer", "Footer", "홈버튼");
	});
	$(document).on("click", "#footer .sns_link a", function(){
		if ($(this).hasClass("facebook") == true){
			GA_Event("click_PC_국문_공통", "Footer", "Footer_SNS", "Facebook");
		} else if ($(this).hasClass("instagram") == true){ 
			GA_Event("click_PC_국문_공통", "Footer", "Footer_SNS", "Instagram");
		} 
	});
	
	// FNB
	$(document).on("click", "#footer .policy_menu a", function(){
		var menuNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "Footer", "Footer_안내메뉴", menuNm);
	});
	
	// 패밀리사이트
	$(document).on("click", "#footer .family_site .list a", function(){
		var siteNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_공통", "Footer", "Footer_Familysite", siteNm);
	});


	/** 
	 * 마이현대(공통)
	 */
	// 마이현대 메뉴
	$(document).on("click", ".mypresent dl a, .mymenu ul li a", function(){
		var menuNm = $(this).contents().not($(this).children("dd")).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_마이현대_주문내역", "마이현대", "마이현대_메뉴", "메뉴_"+menuNm);
	});


	/** 
	 * 마이현대 > 주문내역
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("id") == "onlnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역", "주문내역_탭", "탭_온라인주문내역");
		} else if ($(this).parent().attr("id") == "oflnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역", "주문내역_탭", "탭_오프라인주문내역");
		}
	});

	// 탭 depth02
	$(document).on("click", ".myhd_content .tab-action ul[class^=tab_2depth] li a", function(){
		if ($(".tab_1depth li.ui-tabs-active").attr("id") == "onlnOrder"){
			if ($(this).parent().attr("id") == "tabCtgDpatType"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_기준", "기준_출국일기준");
			} else if ($(this).parent().attr("id") == "tabCtgOrderType"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_기준", "기준_주문일기준");
			}
		} else if ($(".tab_1depth li.ui-tabs-active").attr("id") == "oflnOrder"){
			if ($(this).parent().attr("id") == "tabCtgDpatType"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_기준", "기준_출국일기준");
			} else if ($(this).parent().attr("id") == "tabCtgOrderType"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_기준", "기준_주문일기준");
			}
		}
	});

	// 탭 필터 - 날짜
	$(document).on("click", ".myhd_content .period .textbox.monthbox li a", function(){
		if ($(".tab_1depth li.ui-tabs-active").attr("id") == "onlnOrder"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_날짜", "날짜_12개월");
			}
		} else if ($(".tab_1depth li.ui-tabs-active").attr("id") == "oflnOrder"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_날짜", "날짜_12개월");
			}
		}
	});	

	// 탭 필터 - 검색날짜
	$(document).on("click", ".myhd_content .period .dcheck_btn", function(){
		var stDt = $(this).parents(".period").find(".datepicker_box input.datepicker#stDt").val().replace(/\s/g, ""),
			endDt = $(this).parents(".period").find(".datepicker_box input.datepicker#endDt").val().replace(/\s/g, "");
		if ($(".tab_1depth li.ui-tabs-active").attr("id") == "onlnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($(".tab_1depth li.ui-tabs-active").attr("id") == "oflnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		}
	});

	// 탭 정렬 - 주문상태
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='orderStat']", function(){
		var val = $(this).val();
		if ($(".tab_1depth li.ui-tabs-active").attr("id") == "onlnOrder"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_전체");
			} else if (val == "010"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_입금대기");
			} else if (val == "020"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_주문완료");
			} else if (val == "030^040"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_상품준비중");
			} else if (val == "050"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_인도대기");
			} else if (val == "065"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_인도완료");
			} else if (val == "060"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_미인도");
			} else if (val == "080"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_취소신청");
			} else if (val == "070"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_반품신청");
			} else if (val == "100"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_취소완료");
			} else if (val == "090"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_정렬기준", "정렬기준_반품완료");
			}
		} else if ($(".tab_1depth li.ui-tabs-active").attr("id") == "oflnOrder"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_전체");
			} else if (val == "010"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_입금대기");
			} else if (val == "020"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_주문완료");
			} else if (val == "030^040"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_상품준비중");
			} else if (val == "050"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_인도대기");
			} else if (val == "065"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_인도완료");
			} else if (val == "060"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_미인도");
			} else if (val == "080"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_취소신청");
			} else if (val == "070"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_반품신청");
			} else if (val == "100"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_취소완료");
			} else if (val == "090"){
				GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_정렬기준", "정렬기준_반품완료");
			}
		}
	});

	// 주문번호
	$(document).on("click", "#my_order .list_table01 a.order_number", function(){
		var orderNo = $(this).text();
		if ($(".tab_1depth li.ui-tabs-active").attr("id") == "onlnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_온라인주문내역", "주문내역_탭_온라인주문내역_주문상세", "주문상세_"+orderNo);
		} else if ($(".tab_1depth li.ui-tabs-active").attr("id") == "oflnOrder"){
			GA_Event("click_PC_국문_마이현대_주문내역", "주문내역_탭_오프라인주문내역", "주문내역_탭_오프라인주문내역_주문상세", "주문상세_"+orderNo);
		}
	});


	/** 
	 * 마이현대 > 스페셜오더/H.Share
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("id") == "spord"){
			GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭", "탭_스페셜오더");
		} else if ($(this).parent().attr("id") == "hshare"){
			GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭", "탭_HSHARE");
		}
	});
	
	// 신청내역, 신청상태 버튼
	$(document).on("click", ".tb_list .detail_open_box td a", function(){
		var OrderNo = $(this).text().replace(/\s/g, "");
		if ($(this).parents(".tb_list").attr("id") == "spord_Tb"){
			GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더_상품", "상품_"+OrderNo);
		} else if ($(this).parents(".tb_list").attr("id") == "hshare_Tb"){
			GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE_상품", "상품_"+OrderNo);
		}
	});
	$(document).on("click", ".tb_list .detail_open_box td button", function(){
		var btnNm = $(this).attr("onclick");
		if ($(this).parents(".tb_list").attr("id") == "spord_Tb"){
			if (btnNm.indexOf("spordCancle") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더", "신청취소");
			} else if (btnNm.indexOf("spordReOrder") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더", "재신청");
			} else if (btnNm.indexOf("hshareCancle") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더", "취소");
			} else if (btnNm.indexOf("location.href") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더", "구매하러가기");
			} else if (btnNm.indexOf("hshareReOrder") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_스페셜오더", "재참여");
			}
		} else if ($(this).parents(".tb_list").attr("id") == "hshare_Tb"){
			if (btnNm.indexOf("spordCancle") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE", "신청취소");
			} else if (btnNm.indexOf("spordReOrder") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE", "재신청");
			} else if (btnNm.indexOf("hshareCancle") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE", "취소");
			} else if (btnNm.indexOf("location.href") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE", "구매하러가기");
			} else if (btnNm.indexOf("hshareReOrder") > -1){
				GA_Event("click_PC_국문_마이현대_스페셜오더HSHARE", "스페셜오더HSHARE", "스페셜오더HSHARE_탭_HSHARE", "재참여");
			}
		}
	});


	/** 
	 * 마이현대 > 적립금내역
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("id") == "normal"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역", "적립금내역_탭", "탭_일반");
		} else if ($(this).parent().attr("id") == "event"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역", "적립금내역_탭", "탭_이벤트플러스");
		} else if ($(this).parent().attr("id") == "bran"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역", "적립금내역_탭", "탭_브랜드플러스");
		} else if ($(this).parent().attr("id") == "ptns"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역", "적립금내역_탭", "탭_제휴플러스");
		} else if ($(this).parent().attr("id") == "payment"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역", "적립금내역_탭", "탭_결제플러스");
		}
	});
	
	// 탭 필터 - 날짜
	$(document).on("click", ".myhd_content .period .textbox.monthbox li a", function(){
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "normal"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "event"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "bran"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "ptns"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "payment"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_날짜", "날짜_12개월");
			}
		}
	});	

	// 탭 필터 - 검색날짜
	$(document).on("click", ".myhd_content .period .dcheck_btn", function(){
		var stDt = $(this).parents(".period").find(".datepicker_box input.datepicker#stDt").val().replace(/\s/g, ""),
			endDt = $(this).parents(".period").find(".datepicker_box input.datepicker#endDt").val().replace(/\s/g, "");
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "normal"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "event"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "bran"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "ptns"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "payment"){
			GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		}
	});

	// 탭 정렬 - 채널구분
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='siteChlCd']", function(){
		var val = $(this).val();
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "normal"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_채널구분_APP");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "event"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_채널구분_APP");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "bran"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_채널구분_APP");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "ptns"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_채널구분_APP");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "payment"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_채널구분_APP");
			}
		}
	});

	// 탭 정렬 - 사용구분
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='svmtUseCd']", function(){
		var val = $(this).val();
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "normal"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "002"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "001"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_일반", "적립금내역_탭_일반_정렬기준", "정렬기준_사용구분_사용");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "event"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "002"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "001"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_이벤트플러스", "적립금내역_탭_이벤트플러스_정렬기준", "정렬기준_사용구분_사용");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "bran"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "002"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "001"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_브랜드플러스", "적립금내역_탭_브랜드플러스_정렬기준", "정렬기준_사용구분_사용");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "ptns"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "002"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "001"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_제휴플러스", "적립금내역_탭_제휴플러스_정렬기준", "정렬기준_사용구분_사용");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "payment"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "002"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "001"){
				GA_Event("click_PC_국문_마이현대_적립금내역", "적립금내역_탭_결제플러스", "적립금내역_탭_결제플러스_정렬기준", "정렬기준_사용구분_사용");
			}
		}
	});


	/** 
	 * 마이현대 > 쿠폰내역
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("id") == "listCup"){
			GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역", "쿠폰내역_탭", "탭_쿠폰내역");
		} else if ($(this).parent().attr("id") == "dnldCup"){
			GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역", "쿠폰내역_탭", "탭_다운로드가능쿠폰");
		}
	});

	// 탭 필터 - 날짜
	$(document).on("click", ".myhd_content .period .textbox.monthbox li a", function(){
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "listCup"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "dnldCup"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_날짜", "날짜_12개월");
			}
		}
	});	

	// 탭 필터 - 검색날짜
	$(document).on("click", ".myhd_content .period .dcheck_btn", function(){
		var stDt = $(this).parents(".period").find(".datepicker_box input.datepicker#stDt").val().replace(/\s/g, ""),
			endDt = $(this).parents(".period").find(".datepicker_box input.datepicker#endDt").val().replace(/\s/g, "");
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "listCup"){
			GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "dnldCup"){
			GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		}
	});

	// 탭 정렬 - 채널구분
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='siteChlCd']", function(){
		var val = $(this).val();
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "listCup"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_채널구분_APP");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "dnldCup"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_채널구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_채널구분_전체");
			} else if (val == "PC"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_채널구분_PC");
			} else if (val == "MO"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_채널구분_모바일웹");
			} else if (val == "AP"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_채널구분_APP");
			}
		}
	});

	// 탭 정렬 - 사용구분
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='useCls']", function(){
		var val = $(this).val();
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "listCup"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_사용구분");
			} else if (val == "A"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "N"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_사용구분_미사용");
			} else if (val == "Y"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_사용구분_사용");
			} else if (val == "E"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_쿠폰내역", "쿠폰내역_탭_쿠폰내역_정렬기준", "정렬기준_사용구분_기간만료");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "dnldCup"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_사용구분");
			} else if (val == "A"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "N"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_사용구분_미사용");
			} else if (val == "Y"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_사용구분_사용");
			} else if (val == "E"){
				GA_Event("click_PC_국문_마이현대_쿠폰내역", "쿠폰내역_탭_다운로드가능쿠폰", "쿠폰내역_탭_다운로드가능쿠폰_정렬기준", "정렬기준_사용구분_기간만료");
			}
		}
	});


	/** 
	 * 마이현대 > 예치금/상품권전환금
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("id") == "cdpst"){
			GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금", "예치금상품권전환금_탭", "탭_예치금");
		} else if ($(this).parent().attr("id") == "gfca"){
			GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금", "예치금상품권전환금_탭", "탭_상품권전환금");
		}
	});

	// 탭 필터 - 날짜
	$(document).on("click", ".myhd_content .period .textbox.monthbox li a", function(){
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "cdpst"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_날짜", "날짜_12개월");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "gfca"){
			if ($(this).attr("onclick") == "fnDateSetting(this,'1');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_날짜", "날짜_1개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'3');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_날짜", "날짜_3개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,'6');"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_날짜", "날짜_6개월");
			} else if ($(this).attr("onclick") == "fnDateSetting(this,12);"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_날짜", "날짜_12개월");
			}
		}
	});	

	// 탭 필터 - 검색날짜
	$(document).on("click", ".myhd_content .period .dcheck_btn", function(){
		var stDt = $(this).parents(".period").find(".datepicker_box input.datepicker#stDt").val().replace(/\s/g, ""),
			endDt = $(this).parents(".period").find(".datepicker_box input.datepicker#endDt").val().replace(/\s/g, "");
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "cdpst"){
			GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "gfca"){
			GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_검색날짜", "검색날짜_"+stDt+"~"+endDt);
		}
	});

	// 탭 정렬 - 사용구분
	$(document).on("change", ".myhd_content .sorting_wrap.myhd select[name='useStat']", function(){
		var val = $(this).val();
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "cdpst"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "SAVE"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "USE"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_정렬기준", "정렬기준_사용구분_사용");
			} else if (val == "WITHDRAW"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금_정렬기준", "정렬기준_사용구분_출금");
			}
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("id") == "gfca"){
			if (val == ""){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_정렬기준", "정렬기준_사용구분");
			} else if (val == "ALL"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_정렬기준", "정렬기준_사용구분_전체");
			} else if (val == "SAVE"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_정렬기준", "정렬기준_사용구분_적립");
			} else if (val == "USE"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_정렬기준", "정렬기준_사용구분_사용");
			} else if (val == "WITHDRAW"){
				GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_상품권전환금", "예치금상품권전환금_탭_상품권전환금_정렬기준", "정렬기준_사용구분_출금");
			}
		}
	});

	// 예치금 출금신청 버튼
	$(document).on("click", ".myhd_content .myhd_dashbord.in_dashbord .button button", function(){
		GA_Event("click_PC_국문_마이현대_예치금상품권전환금", "예치금상품권전환금_탭_예치금", "예치금상품권전환금_탭_예치금", "출금신청");
	});


	/** 
	 * 마이현대 > 관심상품/브랜드
	 */
	// 탭 depth01
	$(document).on("click", ".tab-style ul[class^='tab_1depth'] li a", function(){
		if ($(this).parent().attr("onclick") == "goCnrlist('listCnrGoos');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭", "탭_관심상품");
		} else if ($(this).parent().attr("onclick") == "goCnrlist('listCnrBran');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭", "탭_관심브랜드");
		}
	});
	
	// 관심상품/브랜드 리스트
	$(document).on("click", ".myhd_content .product_list li a", function(){
		var prodNm = $(this).find(".tx_ex").text(),
			branNm = $(this).find("p.brname").text().replace(/\s/g, "");
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("onclick") == "goCnrlist('listCnrGoos');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭_관심상품", "상품_"+prodNm);
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("onclick") == "goCnrlist('listCnrBran');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭_관심브랜드", "브랜드_"+branNm);
		}
	});
	// 관심상품 버튼(장바구니, 바로구매, 재입고일림)(/js/KO/common.js)

	// 관심취소 버튼
	$(document).on("click", ".myhd_content .product_list li .img_w em.btn_like", function(){
		if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("onclick") == "goCnrlist('listCnrGoos');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭_관심상품", "관심취소");
		} else if ($("ul[class^='tab_1depth'] li.ui-tabs-active").attr("onclick") == "goCnrlist('listCnrBran');"){
			GA_Event("click_PC_국문_마이현대_관심상품브랜드", "관심상품브랜드", "관심상품브랜드_탭_관심브랜드", "관심취소");
		}
	});


	/** 
	 * 마이현대 > 상품평
	 */
	// 탭 depth01
	$(document).on("click", ".myhd_asis .tab_type01 li a", function(){
		if ($(this).attr("title") == "comment01"){
			GA_Event("click_PC_국문_마이현대_상품평", "상품평", "상품평_탭", "탭_작성완료상품");
		} else if ($(this).attr("title") == "comment02"){
			GA_Event("click_PC_국문_마이현대_상품평", "상품평", "상품평_탭", "탭_미작성상품");
		} 
	});
	
	// 작성완료상품 버튼
	$(document).on("click", "#wrtGrvwsList .review_type .grade_wrap .btn_box button", function(){
		var btnNm = $(this).attr("onclick");
		if (btnNm.indexOf("delGrvws") > -1){
			GA_Event("click_PC_국문_마이현대_상품평", "상품평", "상품평_탭_작성완료상품", "삭제");
		} else if (btnNm.indexOf("openEdtGoosGrvwsFormPop") > -1){
			GA_Event("click_PC_국문_마이현대_상품평", "상품평", "상품평_탭_작성완료상품", "수정");
		}
	});
	
	// 미작성상품 버튼
	$(document).on("click", "#notWrtGrvwsList td button", function(){
		GA_Event("click_PC_국문_마이현대_상품평", "상품평", "상품평_탭_미작성상품", "작성");
	});


	/** 
	 * 마이현대 > 기본정보관리
	 */
	// 마케팅정보수신동의여부 버튼
	$(document).on("click", "#frmDetailBaseInfoMnge .tb_write01 input[type='checkbox'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			if ($(this).prev("input").attr("id") == "agrYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의취소_마케팅정보수신동의");
			} else if ($(this).prev("input").attr("id") == "smsRcvYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의취소_SMS");
			} else if ($(this).prev("input").attr("id") == "mailRcvYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의취소_이메일");
			}
		} else {
			if ($(this).prev("input").attr("id") == "agrYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의_마케팅정보수신동의");
			} else if ($(this).prev("input").attr("id") == "smsRcvYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의_SMS");
			} else if ($(this).prev("input").attr("id") == "mailRcvYn"){
				GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_마케팅정보수신동의", "마케팅정보수신동의_이메일");
			}
		}
	});
	
	// 개인정보유효기간 버튼
	$(document).on("click", "#frmDetailBaseInfoMnge .tb_write01 .expiration_day input[type='radio'] + label", function(){
		if ($(this).prev("input").attr("id") == "expiration_day01"){
			GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_개인정보유효기간", "개인정보유효기간_1년");
		} else if ($(this).prev("input").attr("id") == "expiration_day02"){
			GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_개인정보유효기간", "개인정보유효기간_3년");
		} else if ($(this).prev("input").attr("id") == "expiration_day04"){
			GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_개인정보유효기간", "개인정보유효기간_탈퇴시파기");
		} 
	});
	
	// 회원구분 버튼
	$(document).on("click", "#frmDetailBaseInfoMnge button#btnChgUmbMbsh", function(){
		GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_회원구분", "H.Point통합회원 전환");
	});
	
	// 회원탈퇴 버튼
	$(document).on("click", "#frmDetailBaseInfoMnge button#btnMbshWithdrawal", function(){
		GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_회원탈퇴", "회원탈퇴");
	});
	$(document).on("click", "#frmMbshWithdrawal button#btnCancel", function(){
		GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_회원탈퇴", "취소");
	});
	$(document).on("click", "#frmMbshWithdrawal button#btnConfirm", function(){
		GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_회원탈퇴", "탈퇴신청");
	});
	
	// 회원탈퇴 사유
	$(document).on("click", "#widrResnCd-menu li", function(){
		var selNm = $(this).find(".ui-state-active").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_마이현대_기본정보관리", "기본정보관리", "기본정보관리_회원탈퇴사유", "회원탈퇴사유_"+selNm);
	});


	/** 
	 * 고객센터
	 */
	// LNB
	$(document).on("click", ".lnb_customer .lnb li a", function(){
		var lnbNm = $(this).parents("ul").siblings("span").text().replace(/\s/g, ""),
			lnbNm1 = $(this).text().replace(/\s/g, "");
		if ($(this).parents("ul").prev("span").length > 0){
			GA_Event("click_PC_국문_고객센터", lnbNm, lnbNm, lnbNm1);
		} else {
			GA_Event("click_PC_국문_고객센터", lnbNm1, lnbNm1, "더보기");
		}
	});

	// FAQ 검색어(/om/consmComm/main.jsp)
	
	// 자주묻는 질문 Top10
	$(document).on("click", ".faq_top10 .faq dt a", function(){
		var faqNm = $(this).contents().not($(this).children("span")).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_고객센터", "자주묻는질문TOP10", "자주묻는질문TOP10", faqNm);
	});
	
	// 공지사항, 당첨자발표 리스트
	$(document).on("click", ".notice_wrap .notice ul li a", function(){
		var notiNm = $(this).text().replace(/\s/g, ""),
			notiNmCut = notiNm.substring(0, 10);
		if (notiNm.length > 10){ // 글자수 제한(10자 이상 삭제)
			if ($(this).parents(".notice").hasClass("notice_list") == true){
				GA_Event("click_PC_국문_고객센터", "공지사항", "공지사항_상세", notiNmCut+"⋯");
			} else if ($(this).parents(".notice").hasClass("notice_event") == true){
				GA_Event("click_PC_국문_고객센터", "당첨자발표", "당첨자발표_상세", notiNmCut+"⋯");
			} 
		} else {
			if ($(this).parents(".notice").hasClass("notice_list") == true){
				GA_Event("click_PC_국문_고객센터", "공지사항", "공지사항_상세", notiNm);
			} else if ($(this).parents(".notice").hasClass("notice_event") == true){
				GA_Event("click_PC_국문_고객센터", "당첨자발표", "당첨자발표_상세", notiNm);
			} 
		}
	});
	
	// 공지사항, 당첨자발표 더보기
	$(document).on("click", ".notice_wrap .notice .more", function(){
		if ($(this).parents(".notice").hasClass("notice_list") == true){
			GA_Event("click_PC_국문_고객센터", "공지사항", "공지사항", "더보기");
		} else if ($(this).parents(".notice").hasClass("notice_event") == true){
			GA_Event("click_PC_국문_고객센터", "당첨자발표", "당첨자발표", "더보기");
		} 
	});


	/** 
	 * 고객센터 > FAQ
	 */
	// FAQ 탭
	$(document).on("click", ".faq_tab ul li a", function(){
		if ($(this).parent().index() == 0){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_FAQTOP10");
		} else if ($(this).parent().index() == 1){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_전체");
		} else if ($(this).parent().index() == 2){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_기타");
		} else if ($(this).parent().index() == 3){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_주문/결제");
		} else if ($(this).parent().index() == 4){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_교환/환불");
		} else if ($(this).parent().index() == 5){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_상품수령");
		} else if ($(this).parent().index() == 6){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_적립금/쿠폰");
		} else if ($(this).parent().index() == 7){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_상품/브랜드");
		} else if ($(this).parent().index() == 8){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_회원/멤버쉽");
		} else if ($(this).parent().index() == 9){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ", "FAQ_탭", "탭_h.point");
		}
	});
	
	// FAQ 탭 리스트
	$(document).on("click", ".faq_list .faq dt a", function(){
		var tabNm = $(".faq_tab ul li a.active").parent(),
			faqNm = $(this).contents().not($(this).children("span")).text().replace(/\s/g, "");
		if (tabNm.index() == 0){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_FAQTOP10_질문", faqNm);
		} else if (tabNm.index() == 1){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_전체_질문", faqNm);
		} else if (tabNm.index() == 2){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_기타_질문", faqNm);
		} else if (tabNm.index() == 3){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_주문/결제_질문", faqNm);
		} else if (tabNm.index() == 4){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_교환/환불_질문", faqNm);
		} else if (tabNm.index() == 5){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_상품수령_질문", faqNm);
		} else if (tabNm.index() == 6){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_적립금/쿠폰_질문", faqNm);
		} else if (tabNm.index() == 7){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_상품/브랜드_질문", faqNm);
		} else if (tabNm.index() == 8){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_회원/멤버쉽_질문", faqNm);
		} else if (tabNm.index() == 9){ 
			GA_Event("click_PC_국문_고객센터_FAQ", "FAQ_탭", "FAQ_탭_h.point_질문", faqNm);
		}
	});


	/** 
	 * 검색
	 */
	// 검색어(/tiles/searchLayer.jsp)

	// 검색유형 선택
	$(document).on("click", "#header .searchfield .select_search button", function(){
		if ($(".select_search").hasClass("tag") == true){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_검색유형선택", "해시태그검색");
		} else {
			GA_Event("click_PC_국문_검색", "검색전", "검색전_검색유형선택", "일반검색");
		}
	});

	// 검색 > 검색전
	// 검색 탭
	$(document).on("click", ".advanced_search .tab-action #searchTabBox li a", function(){
		if ($(this).parent().attr("id") == "rcntTab"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_탭", "탭_최근인기검색어");
		} else if($(this).parent().attr("id") === "brandTab"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_탭", "탭_브랜드검색");
			
			// 하위 탭 '브랜드/카테고리'도 작동하는 이슈
			// tiles/searchLayer.jsp에 트리거 되어져 있음.
			// $(".tab_round #default_brand_tab a").trigger('click');
		}
	});

	// 최근인기검색어
	$(document).on("click", ".adsearch_panel .popular_search .words_box .words_list li a", function(){
		var srchTerm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "검색전", "검색전_최근검색어", "검색어_"+srchTerm);
	});
	$(document).on("click", ".adsearch_panel .popular_search .words_box #deleteAll", function(){
		GA_Event("click_PC_국문_검색", "검색전", "검색전_최근검색어", "전체삭제");
	});
	$(document).on("click", ".adsearch_panel .popular_search .words_box .switch input[id='autoSaveBtn'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_최근검색어", "자동저장끄기");
		} else {
			GA_Event("click_PC_국문_검색", "검색전", "검색전_최근검색어", "자동저장켜키");
		}
	});
	$(document).on("click", ".adsearch_panel .popular_search .hashtag_area .list button", function(){
		var srchTerm = $(this).text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/gi, "").substring(3).replace(/\s/g, "");
		if ($(this).attr("onclick").indexOf("hashSearchResult.do") > -1){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_인기해시태그검색어", "검색어_"+srchTerm);
		} else if ($(this).attr("onclick").indexOf("searchResult.do") > -1){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_인기검색어", "검색어_"+srchTerm);
		}
	});
	
	// 브랜드검색
	$(document).on("click", ".adsearch_panel .brand_search .tab-action .tab_round li a", function(){
		if ($(this).parent().attr("id") == "default_brand_tab"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "브랜드검색_브랜드");
		} else if($(this).parent().attr("id") == "default_category_tab"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "브랜드검색_카테고리");
		}
	});
	$(document).on("click", ".adsearch_panel .brand_search .sort_wrap .sortbtn_wrap li a", function(){
		if ($(this).attr("onclick") == "switchBranTab('01');"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "정렬_가나다순");
		} else if($(this).attr("onclick") == "switchBranTab('02');"){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "정렬_ABC순");
		}
	});
	$(document).on("click", ".adsearch_panel .brand_search .sort_wrap .lang_sort .brand_cate li button", function(){
		var sortNm = $(this).contents().not($(this).children("em")).text().replace(/\s/g, "");
		if ($(this).parents("#advanced_search_02").find("#advanced_search_brand_01").length > 0){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "정렬기준_"+sortNm);
		} else if ($(this).parents("#advanced_search_02").find("#advanced_search_brand_02").length > 0){
			GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "카테고리_"+sortNm);
		} 
	});
	$(document).on("click", ".adsearch_panel .brand_search .sort_result input[type='button'] + label", function(){
		var branNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "검색전", "검색전_브랜드검색", "브랜드_"+branNm);
	});

	// 검색 > 자동완성, 키워드
	$(document).on("click", ".search_autocomplete .brand_shop a", function(){
		var srchKwd = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "검색후", "검색후_키워드", "키워드_"+srchKwd);
	});
	$(document).on("click", ".search_autocomplete .searchresults_brand li a", function(){
		var srchBran = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "자동완성", "자동완성_연관브랜드", "브랜드_"+srchBran);
	});
	$(document).on("click", ".search_autocomplete .searchresults_word li a", function(){
		var srchWord = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "자동완성", "자동완성_연관검색어", "검색어_"+srchWord);
	});
	$(document).on("click", ".search_autocomplete .searchresults_category li a", function(){
		var srchCtgy = $(this).contents().not($(this).children()).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "자동완성", "자동완성_연관카테고리", "카테고리_"+srchCtgy);
	});
	$(document).on("click", ".search_autocomplete .hashtag_box ul li a", function(){
		var srchTag = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_검색", "자동완성", "자동완성_연관해시태그", "해시태그_"+srchTag);
	});
	$(document).on("click", ".search_autocomplete .switch.autoword input[id='autoCompleteBtn'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_검색", "자동완성", "자동완성_설정", "자동완성끄기");
		} else {
			GA_Event("click_PC_국문_검색", "자동완성", "자동완성_설정", "자동완성켜키");
		}
	});
	
	// 검색 레이어 닫기
	$(document).on("click", "#header .advanced_search .search_close", function(){
		if ($("#basicSearchTerm").val() == "" && $("#hashSearchTerm").val() == ""){
			GA_Event("click_PC_국문_검색", "검색전", "검색전", "닫기");
		} else {
			GA_Event("click_PC_국문_검색", "자동완성", "자동완성_설정", "닫기");
		}
	});
	

	/** 
	 * 검색결과(일반검색/해시태그검색)
	 */
	if ($("#container").find(".searchcontent_wrap").length > 0){
		var urlParams = new URLSearchParams(window.location.search);

		// 인기검색어(검색결과 없을 시)
		$(document).on("click", ".searchcontent_wrap #noSearchData .hotkey_list .tag a", function(){
			var tagTerm = $(this).find("button").text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/gi, "").substring(3).replace(/\s/g, "");
			GA_Event("click_PC_국문_검색결과", "검색결과없음", "검색결과없음_인기검색어", "검색어_"+tagTerm);
		});
		
		/* 검색결과 > 일반검색 */
		if (urlParams.get("searchType") == "basic"){
			// 연관검색어
			$(document).on("click", ".searchcontent_wrap .result_list li a", function(){
				var srchTerm = $(this).text().replace(/\s/g, "");
				GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_연관검색어", "검색어_"+srchTerm);
			});

			// 필터 펼치기/닫기
			$(document).on("click", ".searchcontent_wrap .filter_wrap .filter_onoff button", function(){
				if ($(this).parents(".filter_wrap").hasClass("open") == true){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색", "검색필터펼치기");
				} else {
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색", "검색필터닫기");
				}
			});

			// 상세필터 - 콘텐츠, 쇼핑정보, 가격, 브랜드, 카테고리 
			$(document).on("click", ".searchcontent_wrap .filter_wrap table td .check_group input[type='checkbox'] + label, .searchcontent_wrap .filter_wrap table td .sort_result input[type='checkbox'] + label", function(){
				var filtTp = $(this).prev("input").attr("name"),
					filtChk = $(this).prev("input").is(":checked"),
					filtNm = $(this).text().replace(/\s/g, "");
				if (filtChk == true){
					if (filtTp == "contentsFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_콘텐츠", "상세취소필터_"+filtNm);
					} else if (filtTp == "shopFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_쇼핑정보", "상세취소필터_"+filtNm);
					} else if (filtTp == "priceFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_가격", "상세취소필터_"+filtNm);
					} else if (filtTp == "branFilter"){ // 브랜드 국문
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_브랜드", "상세취소필터_"+filtNm);
					} else if (filtTp == "branEngFilter"){ // 브랜드 영문
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_브랜드", "상세취소필터_"+filtNm);
					} else if (filtTp == "cateFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_카테고리", "상세취소필터_"+filtNm);
					}
				} else {
					if (filtTp == "contentsFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_콘텐츠", "상세필터_"+filtNm);
					} else if (filtTp == "shopFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_쇼핑정보", "상세필터_"+filtNm);
					} else if (filtTp == "priceFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_가격", "상세필터_"+filtNm);
					} else if (filtTp == "branFilter"){ // 브랜드 국문
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_브랜드", "상세필터_"+filtNm);
					} else if (filtTp == "branEngFilter"){ // 브랜드 영문
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_브랜드", "상세필터_"+filtNm);
					} else if (filtTp == "cateFilter"){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_필터_카테고리", "상세필터_"+filtNm);
					}
				}
			});

			// 검색필터 - 가격, 결과내검색
			var filterPrice = 0, filterSrch = 0;
			$(document).on("change", ".searchcontent_wrap .filter_wrap .input_group1.price .input_w input", function(){
				filterPrice = 1;
			});
			$(document).on("change", ".searchcontent_wrap .filter_wrap .input_group1.search .input_w input", function(){
				filterSrch = 1;
			});
			$(document).on("click", ".searchcontent_wrap .filter_wrap .search_btnarea .search_btn", function(){
				if ($(".searchcontent_wrap .filter_wrap .input_group1.search .input_w input").val() == ""){
					filterSrch = 0;
				}
				
				if (filterPrice == 0 && filterSrch == 0){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_검색필터", "검색");
				} else {
					if (filterPrice == 1){
						var stPr = $(".input_group1.price .input_w input#priceFilterStr").val(),
							endPr = $(".input_group1.price .input_w input#priceFilterEnd").val();
						GA_Event("click_PC_국문_검색결과", "일반검색", "필터_가격_$"+stPr+"~"+endPr, "검색");
					}
					if (filterSrch == 1){
						var srchTerm = $(".input_group1.search .input_w input#filterText").val();
						GA_Event("click_PC_국문_검색결과", "일반검색", "필터_결과내검색_"+srchTerm, "검색");
					}
				}
			});

			// 필터 초기화 버튼
			$(document).on("click", ".searchcontent_wrap .filter_wrap .search_btnarea .reset_btn", function(){
				GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_검색필터", "초기화");
			});

			// 상세필터, 검색필터 취소(/tiles/gd/searchResultFilter.jsp)

			// 필터 전체취소 - 콘텐츠, 쇼핑정보, 가격, 브랜드, 카테고리
			$(document).on("click", ".searchcontent_wrap .filter_wrap table tr .check_all_group .btn_all_x", function(){
				if ($(this).attr("onclick") == "searchTabInit(0);"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_콘텐츠", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(1);"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_쇼핑정보", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(2);"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_가격", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(3);"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_브랜드", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(4);"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_취소필터_카테고리", "전체취소");
				}
			});

			// 검색결과 정렬기준
			$(document).on("change", ".searchcontent_wrap #filterArea select[id='goodsListOrder']", function(){
				var val = $(this).val();
				if (val == "best"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_베스트순");
				} else if (val == "new"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_신상품순");
				} else if (val == "priceAsc"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_낮은가격순");
				} else if (val == "priceDesc"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_높은가격순");
				} else if (val == "dcRate"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_높은할인순");
				} else if (val == "grvws"){
					GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_정렬기준", "정렬기준_상품평많은순");
				}
			});

			// 검색결과 상품
			$(document).on("click", ".searchcontent_wrap .product_list .product_itme a", function(){
				var prodNm = $(this).find(".tx_ex").text();
				GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_상품", "상품_"+prodNm);
			});
			// 검색결과 상품 버튼(로그인, 장바구니, 바로구매, 재입고알림)(/js/KO/common.js)
			
			// 검색결과 상품 선택
			$(document).on("click", ".searchcontent_wrap .product_list .product_itme .chk.nolabel input[name='goosChk'] + label", function(){
				GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_상품", "체크박스");
			});
			
			// 검색결과 상품 선택취소 - 일반검색(/sr/searchResult.jsp)

			// 검색결과 선택상품 버튼
			$(document).on("click", ".selectedproduct.addtocart .swiper-button-disabled", function(){
				if ($(this).hasClass("selecteditem-prev") == true){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "이전");
				} else if ($(this).hasClass("selecteditem-next") == true){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "다음");
				}
			});

			// 검색결과 선택상품 수량
			$(document).on("click", ".selectedproduct.addtocart .selecteditem_swiper .num_amount input[type='button']", function(){
				if ($(this).val() == "-"){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "상품수량감소");
				} else if ($(this).val() == "+"){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "상품수량증가");
				}
			});

			// 검색결과 선택상품 구매
			$(document).on("click", ".selectedproduct.addtocart .selected_btns > *", function(){
				if ($(this).attr("onclick") == "showLayerMaxDcPrc();"){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "적립금혜택엿보기");
				} else if ($(this).attr("onclick") == "addCartSelectGoosList('N');"){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "장바구니");
				} else if ($(this).attr("onclick") == "addCartSelectGoosList('Y');"){
					GA_Event("click_PC_국문_검색결과", "일반검색_한번에담기", "일반검색_한번에담기", "바로구매");
				}
			});

			// 검색결과 콘텐츠
			$(document).on("click", ".searchcontent_wrap .product_list li > a", function(){
				if ($(this).find(".searchevent_type").length > 0){
					// 이벤트, 기획전
					var bnnrTp = $(this).attr("href"),
						bnnrNm = $(this).find("strong").text().replace(/\s/g, "");
					if(bnnrTp.indexOf("evnt") > -1){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_콘텐츠", "이벤트_"+bnnrNm);
					} else if(bnnrTp.indexOf("spex") > -1){
						GA_Event("click_PC_국문_검색결과", "일반검색", "일반검색_콘텐츠", "기획전_"+bnnrNm);
					}
				}
			});
			
		/* 검색결과 > 해시태그검색 */
		} else if (urlParams.get("searchType") == "hash"){ 
			// 필터 펼치기/닫기
			$(document).on("click", ".searchcontent_wrap .filter_wrap .filter_onoff button", function(){
				if ($(this).parents(".filter_wrap").hasClass("open") == true){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색", "검색필터펼치기");
				} else {
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색", "검색필터닫기");
				}
			});
			
			// 상세필터 - 콘텐츠, 쇼핑정보, 가격, 브랜드, 카테고리
			$(document).on("click", ".searchcontent_wrap .filter_wrap table td .check_group input[type='checkbox'] + label, .searchcontent_wrap .filter_wrap table td .sort_result input[type='checkbox'] + label", function(){
				var filtChk = $(this).prev("input").is(":checked"),
					filtTp = $(this).prev("input").attr("name"),
					filtNm = $(this).text().replace(/\s/g, "");
				if (filtChk == true){
					if (filtTp == "contentsFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_콘텐츠", "상세취소필터_"+filtNm);
					} else if (filtTp == "shopFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_쇼핑정보", "상세취소필터_"+filtNm);
					} else if (filtTp == "priceFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_가격", "상세취소필터_"+filtNm);
					} else if (filtTp == "branFilter"){ // 브랜드 국문
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_브랜드", "상세취소필터_"+filtNm);
					} else if (filtTp == "branEngFilter"){ // 브랜드 영문
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_브랜드", "상세취소필터_"+filtNm);
					} else if (filtTp == "cateFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_카테고리", "상세취소필터_"+filtNm);
					}
				} else {
					if (filtTp == "contentsFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_콘텐츠", "상세필터_"+filtNm);
					} else if (filtTp == "shopFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_쇼핑정보", "상세필터_"+filtNm);
					} else if (filtTp == "priceFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_가격", "상세필터_"+filtNm);
					} else if (filtTp == "branFilter"){ // 브랜드 국문
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_브랜드", "상세필터_"+filtNm);
					} else if (filtTp == "branEngFilter"){ // 브랜드 영문
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_브랜드", "상세필터_"+filtNm);
					} else if (filtTp == "cateFilter"){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_필터_카테고리", "상세필터_"+filtNm);
					}
				}
			});
			
			// 검색필터 검색 - 가격
			var filterPrice = 0;
			$(document).on("change", ".searchcontent_wrap .filter_wrap .input_group1.price .input_w input", function(){
				filterPrice = 1;
			});
			$(document).on("click", ".searchcontent_wrap .filter_wrap .search_btnarea .search_btn", function(){
				if (filterPrice == 1){
					var stPr = $(".input_group1.price .input_w input#priceFilterStr").val(),
						endPr = $(".input_group1.price .input_w input#priceFilterEnd").val();
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "필터_가격_$"+stPr+"~"+endPr, "검색");
				} else {
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_검색필터", "검색");
				}
			});
			
			// 필터 초기화 버튼
			$(document).on("click", ".searchcontent_wrap .filter_wrap .search_btnarea .reset_btn", function(){
				GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_검색필터", "초기화");
			});
			
			// 상세필터, 검색필터 취소(/tiles/gd/searchResultFilter.jsp)

			// 필터 전체취소 - 콘텐츠, 쇼핑정보, 가격, 브랜드, 카테고리
			$(document).on("click", ".searchcontent_wrap .filter_wrap table tr .check_all_group .btn_all_x", function(){
				if ($(this).attr("onclick") == "searchTabInit(0);"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_콘텐츠", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(1);"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_쇼핑정보", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(2);"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_가격", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(3);"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_브랜드", "전체취소");
				} else if ($(this).attr("onclick") == "searchTabInit(4);"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_취소필터_카테고리", "전체취소");
				}
			});
			
			// 검색결과 정렬기준
			$(document).on("change", ".searchcontent_wrap #filterArea select[id='goodsListOrder']", function(){
				var val = $(this).val();
				if (val == "random"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_정렬기준", "정렬기준_랜덤보기");
				} else if (val == "group"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_정렬기준", "정렬기준_그룹보기");
				}
			});

			// 검색결과 상품
			$(document).on("click", ".searchcontent_wrap .product_list .product_itme a", function(){
				var prodNm = $(this).find(".tx_ex").text();
				GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_상품", "상품_"+prodNm);
			});
			// 검색결과 상품 버튼(로그인, 장바구니, 바로구매, 재입고알림)(/js/KO/common.js)
			
			// 검색결과 상품 선택
			$(document).on("click", ".searchcontent_wrap .product_list .product_itme .chk.nolabel input[name='goosChk'] + label", function(){
				GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_상품", "체크박스");
			});

			// 검색결과 상품 선택취소 - 해시태그검색(/sr/hashSearchResult.jsp)

			// 검색결과 선택상품 버튼
			$(document).on("click", ".selectedproduct.addtocart .swiper-button-disabled", function(){
				if ($(this).hasClass("selecteditem-prev") == true){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "이전");
				} else if ($(this).hasClass("selecteditem-next") == true){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "다음");
				}
			});

			// 검색결과 선택상품 수량
			$(document).on("click", ".selectedproduct.addtocart .selecteditem_swiper .num_amount input[type='button']", function(){
				if ($(this).val() == "-"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "상품수량감소");
				} else if ($(this).val() == "+"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "상품수량증가");
				}
			});

			// 검색결과 선택상품 구매
			$(document).on("click", ".selectedproduct.addtocart .selected_btns > *", function(){
				if ($(this).attr("onclick") == "showLayerMaxDcPrc();"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "적립금혜택엿보기");
				} else if ($(this).attr("onclick") == "addCartSelectGoosList('N');"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "장바구니");
				} else if ($(this).attr("onclick") == "addCartSelectGoosList('Y');"){
					GA_Event("click_PC_국문_검색결과", "해시태그검색_한번에담기", "해시태그검색_한번에담기", "바로구매");
				}
			});
			
			// 검색결과 콘텐츠
			$(document).on("click", ".searchcontent_wrap .product_list li > a, .searchcontent_wrap .product_list li button", function(){
				if ($(this).parents("li").hasClass("pord_duble") == true){
					// 이미지, 동영상(영상은 클릭요소 아님)
					var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "콘텐츠_"+bnnrNm);
				} else if ($(this).find(".img_brand").length > 0){
					// 브랜드
					var branNm = $(this).find("img").attr("alt").replace(/\s/g, "");
					GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "브랜드_"+branNm);
				} else if ($(this).find(".searchevent_type").length > 0){
					// 사은행사, 세트상품, 세일, 타임세일, 럭키딜, 이벤트, 기획전
					var bnnrTp = $(this).parents("li").find(".searchevent_type"),
						bnnrNm = $(this).find("strong").text().replace(/\s/g, "");
					if (bnnrTp.hasClass("type_gift") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "사은행사_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_setProd") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "세트상품_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_sale") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "세일_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_timeSale") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "타임세일_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_lucky") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "럭키딜_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_even") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "이벤트_"+bnnrNm);
					} else if(bnnrTp.hasClass("type_spec") == true){
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "기획전_"+bnnrNm);
					}
				} else if ($(this).parents("li").find(".searchpoint_type").length > 0){
					// 적립금
					var mileTxt = $(this).parents("li").find(".point_txt").text(),
						mileTxt1 = $(this).parents("li").find("em").text(),
						mileTxt2 = $(this).parents("li").find(".point_price").text(),
						mileNm = (mileTxt+"_"+mileTxt1+"_"+mileTxt2).replace(/\s/g, ""),
						mileNmCut = mileNm.substring(0, 20);
					if (mileNm.length > 20){ // 글자수 제한(20자 이상 삭제)
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "적립금_"+mileNmCut+"⋯");
					} else {
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "적립금_"+mileNm);
					}
				} else if ($(this).parents("li").find(".product_module.coupon").length > 0){
					// 쿠폰
					var coupTxt = $(this).parents("li").find("dl dt").text(),
						coupTxt1 = $(this).parents("li").find("strong").text(),
						coupNm = (coupTxt+"_"+coupTxt1).replace(/\s/g, ""),
						coupNmCut = coupNm.substring(0, 20);
					if (coupNm.length > 20){ // 글자수 제한(20자 이상 삭제)
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "쿠폰_"+coupNmCut+"⋯");
					} else {
						GA_Event("click_PC_국문_검색결과", "해시태그검색", "해시태그검색_콘텐츠", "쿠폰_"+coupNm);
					}
				} 
			});
		}
	}


	/** 
	 * 장바구니
	 */
	// 상단 탭
	$(document).on("click", ".cart_wrap .title_tab li a", function(){
		if ($(this).attr("id") == "tabCart"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_탭", "탭_장바구니");
		} else if ($(this).attr("id") == "tabPspt"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_탭", "탭_여권정보");
		} else if ($(this).attr("id") == "tabDpat"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_탭", "탭_출국정보");
		}
	});
	
	// 장바구니 정렬
	$(document).on("change", ".cart_contens .sorting_wrap select[name='cartCd']", function(){
		var val = $(this).val();
		if (val == "001"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_정렬기준", "정렬기준_늦게담은순");
		} else if (val == "002"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_정렬기준", "정렬기준_먼저담은순");
		} else if (val == "003"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_정렬기준", "정렬기준_높은금액순");
		} else if (val == "004"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_정렬기준", "정렬기준_낮은금액순");
		} else if (val == "005"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_정렬기준", "정렬기준_브랜드순(ABC)");
		}
	});

	// 장바구니 상단 버튼
	$(document).on("click", ".cart_contens .sorting_wrap .cartdel_btn a", function(){
		if ($(this).attr("onclick") == "deleteSelectedCart();"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상단", "선택삭제");
		} else if ($(this).attr("onclick") == "deleteRostCart();"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상단", "품절삭제");
		} 
	});
	
	// 장바구니 상품 선택
	$(document).on("click", ".cart_contens .chk.nolabel input[id='cart_chk1'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품전체선택취소");
		} else {
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품전체선택");
		}
	});
	$(document).on("click", ".cart_list .item_chk .chk.nolabel input[name='cartSeq'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품선택취소");
		} else {
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품선택");
		}
	});
	
	// 장바구니 상품 버튼
	$(document).on("click", ".cart_list .item_chk .btn_area button", function(){
		if ($(this).hasClass("btn_pin") == true){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "계속담아두기");
		} else if ($(this).hasClass("btn_like") == true){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "관심상품");
		} else if ($(this).hasClass("btn_del") == true){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품삭제");
		}		
	});
	
	// 장바구니 상품정보
	$(document).on("click", ".cart_list .item_area .item_info_wrap > a", function(){
		var prodNm = $(this).parents(".item_info_wrap").find(".item_title span").text();
		GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품_"+prodNm);
	});
	
	// 장바구니 상품수량
	$(document).on("click", ".cart_list .cart_amount.num_amount input[type='button']", function(){
		if ($(this).val() == "-"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품수량감소");
		} else if ($(this).val() == "+"){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "상품수량증가");
		}
	});
	
	// 장바구니 상품구매
	$(document).on("click", ".cart_list .item_buy button", function(){
		var btnNm = $(this).attr("onclick");
		if (btnNm.indexOf("goOrder") > -1){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "바로구매");
		} else if (btnNm.indexOf("addAginRecpNtc") > -1){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_상품", "재입고알림");
		} 
	});
	
	// 하단붙박이 버튼
	$(document).on("click", ".pay_table .pay_btm .pay_check input[type='checkbox'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_하단붙박이", "품절제외");
		} else {
			GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_하단붙박이", "품절포함");
		}
	});
	$(document).on("click", ".pay_table .pay_btm .pay_btns button[onclick='maxDcAmtInfo();']", function(){
		GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_하단붙박이", "적립금혜택엿보기");
	});
	$(document).on("click", ".pay_table .pay_btm .pay_btns a[onclick='goOrder();']", function(){
		GA_Event("click_PC_국문_장바구니", "장바구니", "장바구니_하단붙박이", "주문하기");
	});
	
	// 여권정보 저장하기
	$(document).on("click", "form[id='frmMbshPsptMnge'] .form_wrap #btnInptMbshPwdPop", function(){
		GA_Event("click_PC_국문_장바구니", "여권정보", "여권정보", "저장하기");
	});
	
	// 출국정보 저장하기(/or/order/addMbshDpatInfo.jsp)


	/** 
	 * 장바구니 > 주문서
	 */
	// 상단 탭
	if ($(".orderpayment_wrap .title_tab li #tabOrder").hasClass("on") == true){
		GA_Event("click_PC_국문_주문서", "주문서", "주문서_탭", "탭_주문결제");
	}
	$(document).on("click", ".orderpayment_wrap .title_tab li a", function(){
		if ($(this).attr("href").indexOf("listCart") > -1){
			GA_Event("click_PC_국문_주문서", "주문서", "주문서_탭", "탭_장바구니");
		}
	});
	
	// 할인탭
	$(document).on("click", ".order_sheet .accordion li .title a.btn", function(){
		var tabNm = $(this).parents("li");
		if (tabNm.attr("id") == "fregInfoTit"){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_사은품");
		} else if (tabNm.find(".coupon_list").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_쿠폰할인");
		} else if (tabNm.attr("id") == "cardInfoTit"){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_카드/제휴즉시할인정보");
		} else if (tabNm.find(".partnership_discount #ptnrPmptDcPoinAmtDoma").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_제휴사인증할인");
		} else if (tabNm.find(".point_discount").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_적립금할인");
		} else if (tabNm.find(".conversion_amount").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_예치금/선수금/상품권전환금");
		} else if (tabNm.find(".affiliate_point_discount").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_제휴포인트할인");
		} else if (tabNm.find(".partnership_discount #koreanAir").length > 0){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_대한항공스카이패스마일리지적립");
		} else if (tabNm.attr("id") == "sbagUseYn"){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_친환경캠페인참여");
		} else if (tabNm.attr("id") == "settInfoTit"){
			GA_Event("click_PC_국문_주문서", "할인", "할인", "할인탭_결제정보");
		}
	});
	
	// 할인탭 - 쿠폰할인
	$(document).on("click", ".order_sheet .coupon_list .coupon_select .seemore_btn", function(){
		if ($(this).attr("onclick") == "cupLayerPopup('goos');"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_쿠폰할인", "상품쿠폰");
		} else if ($(this).attr("onclick") == "cupLayerPopup('cart');"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_쿠폰할인", "장바구니쿠폰");
		}
	});

	// 할인탭 - 카드/제휴즉시할인정보
	$(document).on("click", ".order_sheet .card_discount .chk input[type='radio'] + label", function(){
		var discNm = $(this).find("strong").contents().not($("strong").children("span")).text().replace(/\s/g, ""),
			discAm = $(this).find("p").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_카드제휴즉시할인정보", discNm+discAm);
	});
	
	// 할인탭 - 제휴사인증할인
	$(document).on("change", ".order_sheet .partnership_discount select[id='ptnrPmptDcType']", function(){
		var val = $(this).val();
		if (val == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴사인증할인", "필터_선택");
		} else if (val == "001"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴사인증할인", "필터_KT");
		} else if (val == "003"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴사인증할인", "필터_LGU+");
		}
	});
	
	// 할인탭 - 적립금할인
	// 할인탭 - 적립금할인 > 즉시할인적립금
	$(document).on("click", ".order_sheet .whether_use_points li input[name='pmptUseSvmtUseYn'] + label", function(){
		if ($(this).prev().val() == "Y"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "전액즉시사용");
		} else if ($(this).prev().val() == "N"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "적립");
		}
	});
	// 할인탭 - 적립금할인 > 일반적립금
	$(document).on("change", ".order_sheet .enter_amount input[name='svmtAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "일반적립금0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "일반적립금"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='svmtAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "일반적립금전액사용");
	});
	// 할인탭 - 적립금할인 > 이벤트플러스
	$(document).on("change", ".order_sheet .enter_amount input[name='evntSvmtAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "이벤트플러스0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "이벤트플러스"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='evntSvmtAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "이벤트플러스전액사용");
	});
	// 할인탭 - 적립금할인 > 브랜드플러스
	$(document).on("change", ".order_sheet .enter_amount input[name='branSvmtAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "브랜드플러스0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "브랜드플러스"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='branSvmtAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "브랜드플러스전액사용");
	});
	// 할인탭 - 적립금할인 > 제휴플러스
	$(document).on("click", ".order_sheet .enter_amount #ptnsSvmtUseYn a.btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "제휴플러스선택하기");
	});
	$(document).on("click", "#ptnsSvmtLayerPopup .btn_group a", function(){
		var mileAm = $(".order_sheet .enter_amount #ptnsSvmtUseYn #dispPtnsSvmtAmt").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "제휴플러스"+mileAm+"원");
	});
	// 할인탭 - 적립금할인 > 결제플러스
	$(document).on("click", ".order_sheet .enter_amount #settSvmtUseYn a.btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "결제플러스선택하기");
	});
	$(document).on("click", "#settSvmtLayerPopup .btn_group a", function(){
		var mileAm = $(".order_sheet .enter_amount #settSvmtUseYn #dispPtnsSvmtAmt").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_적립금할인", "결제플러스"+mileAm+"원");
	});
	
	// 할인탭 - 예치금/선수금/상품권전환금
	// 할인탭 > 예치금
	$(document).on("change", ".order_sheet .enter_amount input[name='cdpstAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "예치금0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "예치금"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='cdpstAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "예치금전액사용");
	});
	// 할인탭 > 선수금
	$(document).on("change", ".order_sheet .enter_amount input[name='advsAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "선수금0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "선수금"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='advsAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "선수금전액사용");
	});
	// 할인탭 > 상품권전환금
	$(document).on("change", ".order_sheet .enter_amount input[name='gfcaCdpstAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "상품권전환금0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "상품권전환금"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='gfcaCdpstAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_예치금선수금상품권할인", "상품권전환금전액사용");
	});

	// 할인탭 - 제휴포인트할인
	// 할인탭 - 제휴포인트할인 > H.Point
	$(document).on("change", ".order_sheet .enter_amount input[name='hpoinAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.Point0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.Point"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='hpoinAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.Point전액사용");
	});
	$(document).on("click", ".order_sheet .affiliate_point_discount .certification li a", function(){
		if ($(this).attr("id") == "btnHpoinUseAuca"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.Point_SMS인증");
		} else {			
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.Point_충전");
		}
	});
	// 할인탭 - 제휴포인트할인 > H.Point Plus
	$(document).on("click", ".order_sheet .affiliate_point_discount .h_point_plus .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.PointPlus조회하기");
	});
	$(document).on("click", ".order_sheet .affiliate_point_discount .chk input[name='hpoinPlsUseYn'] + label", function(){
		if ($(this).prev().val() == "Y"){
			var pointAm = $(this).find("#dispHpoinPlsAmt2").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.PointPlus사용"+pointAm+"원");
		} else if ($(this).prev().val() == "N"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "H.PointPlus미사용");
		}
	});

	// 할인탭 - 제휴포인트할인 > 복지포인트
	$(document).on("change", ".order_sheet .enter_amount input[name='ezwelWlfrPoinAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='ezwelWlfrPoinAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트전액사용");
	});
	// 할인탭 - 제휴포인트할인 > 복지적립금
	$(document).on("change", ".order_sheet .enter_amount input[name='ezwelSvmtAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='ezwelSvmtAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트전액사용");
	});
	// 할인탭 - 제휴포인트할인 > 특별복지포인트
	$(document).on("change", ".order_sheet .enter_amount input[name='ezwelSpclPoinAmt']", function(){
		var mileAm = $(this).val();
		if (mileAm == ""){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트0원");
		} else {
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트"+mileAm+"원");
		}
	});
	$(document).on("click", ".order_sheet .enter_amount input[name='ezwelSpclPoinAmt'] + .btn", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "복지포인트전액사용");
	});
	// 할인탭 - 제휴포인트할인 > 간편적립포인트
	$(document).on("click", ".order_sheet .affiliate_point_discount .enter_amount.guide .btn", function(){
		if ($(this).indexOf("simpRsvgPoinIssuLayerPopup") > -1){			
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_제휴포인트할인", "간편적립포인트적립하러가기");
		}
	});
	
	// 할인탭 - 대한항공스카이패스마일리지적립
	$(document).on("click", ".order_sheet .partnership_discount #koreanAir", function(){
		GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_대한항공스카이패스마일리지적립", "조회");
	});
	
	// 할인탭 - 친환경캠페인참여
	$(document).on("click", ".order_sheet .shoping_bag .box_bag li input[name='sbagUseYn'] + label", function(){
		if ($(this).prev().val() == "N"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_친환경캠페인참여", "쇼핑백사용안함");
		} else if ($(this).prev().val() == "Y"){
			GA_Event("click_PC_국문_주문서", "할인", "할인_할인탭_친환경캠페인참여", "쇼핑백사용");
		}
	});
	
	// 할인탭 - 결제정보
	// 탭
	$(document).on("click", ".payment_method .tab_square li a", function(){
		var tabNm = $(this).contents().not($("a").children()).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭", "탭_"+tabNm);
	});
	// 공통 버튼
	$(document).on("click", ".payment_method .chk input.befSettWaySaveYn + label", function(){
		var tabNm = $(this).parents(".payment_method").find("li.ui-tabs-active a").contents().not($("a").children()).text().replace(/\s/g, "");
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_"+tabNm, "선택한결제수단다음에도사용안함");
		} else {
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_"+tabNm, "선택한결제수단다음에도사용");
		}
	});
	$(document).on("click", ".payment_method .cash_receipts input[id='receipt__rcnt'] + label", function(){
		var tabNm = $(this).parents(".payment_method").find("li.ui-tabs-active a").contents().not($("a").children()).text().replace(/\s/g, "");
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_"+tabNm, "현금영수증신청안함");
		} else {
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_"+tabNm, "현금영수증신청");
		}
	});
	// 할인탭 - 결제정보 > H.POINT PAY
	$(document).on("click", ".payment_method .payway_area_hpay .hpay_choose input[name='hpay'] + label", function(){
		if ($(this).attr("for") == "hpay_01"){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_H.POINT PAY", "hpay카드결제");
		} else if ($(this).attr("for") == "hpay_02"){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_H.POINT PAY", "hpay계좌이체");
		}
	});
	// 할인탭 - 결제정보 > 신용카드
	$(document).on("click", ".payment_method .payway_area_card #cartItem .orderSettCardList", function(){
		GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_신용카드", "카드변경");
	});
	// 할인탭 - 결제정보 > 간편결제
	$(document).on("click", ".payment_method .payway_area_easy .easypayment .item", function(){
		var payNm = $(this).find("p").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_간편결제", "간편결제_"+payNm);
	});
	// 할인탭 - 결제정보 > 다른결제수단
	$(document).on("click", ".payment_method .payway_area_other .item input[class='settSvmt'] + label div", function(){
		if ($(this).parents(".item").hasClass("card_banktransfer") == true){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_다른결제수단", "무통장입금");
		} else if ($(this).parents(".item").hasClass("card_mobilepayment") == true){
			GA_Event("click_PC_국문_주문서", "결제정보", "결제정보_탭_다른결제수단", "휴대폰소액결제");
		}
	});

	// 최종 결제정보
	$(document).on("click", ".payment_sheet .confirm .btn", function(){
		GA_Event("click_PC_국문_주문서", "결제정보", "결제정보", "결제하기");
	});
	$(document).on("click", ".payment_sheet .confirm input[id='chkAgree'] + label", function(){
		if ($(this).prev("input").is(":checked")){
			GA_Event("click_PC_국문_주문서", "최종결제", "결제정보", "주문내역확인동의안함");
		} else {
			GA_Event("click_PC_국문_주문서", "최종결제", "결제정보", "주문내역확인동의");
		}
	});


	/** 
	 * 로그인
	 */
	// 로그인 탭
	$(document).on("click", ".pop_addLgin #ulAucaType li a", function(){
		if ($(this).attr("title") == "login01"){
			GA_Event("click_PC_국문_로그인", "로그인팝업", "로그인팝업_탭", "탭_H.Point통합회원");
		} else if ($(this).attr("title") == "login02"){
			GA_Event("click_PC_국문_로그인", "로그인팝업", "로그인팝업_탭", "탭_면세점간편회원");
		}
	});
	
	// 아이디저장 버튼
	$(document).on("click", ".pop_addLgin .id_save .checkbox input[name='saveId'] + label", function(){
		if ($(this).parents(".tab_view_box").attr("id") == "login01"){
			if ($(this).prev("input").is(":checked")){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원", "아이디저장안함");
			} else {
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원", "아이디저장");
			}
		} else if ($(this).parents(".tab_view_box").attr("id") == "login02"){
			if ($(this).prev("input").is(":checked")){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원", "아이디저장안함");
			} else {
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원", "아이디저장");
			}
		}
	});
	
	// 아이디찾기, 비밀번호찾기
	$(document).on("click", ".pop_addLgin .id_save .find_idpw a", function(){
		if ($(this).parents(".tab_view_box").attr("id") == "login01"){
			if ($(this).attr("id") == "aFindId"){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원", "아이디찿기");
			} else if ($(this).attr("id") == "aFindPwd"){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원", "비밀번호찾기");
			}
		} else if ($(this).parents(".tab_view_box").attr("id") == "login02"){
			if ($(this).index() == 0){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원", "아이디찿기");
			} else if ($(this).index() == 1){
				GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원", "비밀번호찾기");
			}
		}
	});
	
	// 로그인 버튼
	$(document).on("click", ".pop_addLgin form .btn_login button", function(){
		if ($(this).parents(".tab_view_box").attr("id") == "login01"){
			GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원", "로그인");
		} else if ($(this).parents(".tab_view_box").attr("id") == "login02"){
			GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원", "로그인");
		}
	});
	
	// SNS간편로그인
	$(document).on("click", ".pop_addLgin .sns_type ul li a", function(){
		var loginTp = $(this).text().replace(/\s/g, "");
		if ($(this).parents(".tab_view_box").attr("id") == "login01"){
			GA_Event("click_PC_국문_로그인", "로그인팝업_탭_H.Point통합회원", "로그인팝업_탭_H.Point통합회원_소셜로그인", "소셜로그인_"+loginTp);
		} else if ($(this).parents(".tab_view_box").attr("id") == "login02"){
			GA_Event("click_PC_국문_로그인", "로그인팝업_탭_면세점간편회원", "로그인팝업_탭_면세점간편회원_소셜로그인", "소셜로그인_"+loginTp);
		}
	});
	
	// 비회원 버튼
	$(document).on("click", ".pop_addLgin .fix_btn ul li a", function(){
		if ($(this).parent().index() == 0){ 
			GA_Event("click_PC_국문_로그인", "로그인팝업", "로그인팝업_비회원", "비회원_비회원주문");
		} else if ($(this).parent().index() == 1){ 
			GA_Event("click_PC_국문_로그인", "로그인팝업", "로그인팝업_비회원", "비회원_비회원주문조회");
		}
	});
	
	// 비회원 주문조회
	$(document).on("click", "form[name='searchNmbshOrderForm'] .btn_login button", function(){
		GA_Event("click_PC_국문_로그인", "비회원주문조회", "비회원주문조회", "주문조회");
	});	
	
	// 회원가입 버튼
	$(document).on("click", ".pop_addLgin .txt_btn a, form[name='searchNmbshOrderForm'] ~ .txt_btn a", function(){
		GA_Event("click_PC_국문_로그인", "로그인팝업", "로그인팝업", "회원가입");
	});
	
	// 면세점간편회원 - 아이디찾기
	$(document).on("click", "form[name='frmMbshFindIdAuth'] .tabcon .basic_btn_box button", function(){
		GA_Event("click_PC_국문_로그인", "아이디찾기", "아이디찾기", "확인");
	});

	// 면세점간편회원 - 비밀번호찾기
	$(document).on("click", "form[name='frmMbshFindPwd'] .basic_btn_box button", function(){
		GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_아이디조회", "확인");
	});
	// 면세점간편회원 - 비밀번호찾기 > 본인인증
	$(document).on("click", "form[name='frmMbshFindPwdAuth'] .find_id .choice_box a", function(){
		if ($(this).find("p").attr("id") == "smsAuca"){
			GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_본인인증", "SMS인증");
		} else if ($(this).find("p").attr("id") == "emailAuca"){
			GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_본인인증", "이메일인증");
		}
	});
	// 면세점간편회원 - 비밀번호찾기 > SMS 인증 팝업
	// 면세점간편회원 - 비밀번호찾기 > SMS 인증 팝업 - 확인 버튼(/mm/mbshAuca/membershipFindPwdSmsAuthPop.jsp)
	$(document).on("click", "form[name='frmMbshFindPwdSmsAuth'] .basic_btn_box button", function(){
		GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_SMS인증", "취소");
		window.close();
	});

	// 면세점간편회원 - 비밀번호찾기 > 이메일 인증 팝업
	$(document).on("click", "form[name='frmMbshFindPwdEmailAuth'] .basic_btn_box button", function(){
		GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_이메일인증", "취소");
		window.close();
	});

	// 비밀번호 변경
	$(document).on("click", "form[name='frmMbshFindPwdChg'] #btnChange", function(){
		GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_비밀번호변경", "비밀번호변경");
	});
	
	// 비밀번호 변경완료 버튼
	$(document).on("click", "form[name='frmMbshFindPwdCplt'] .basic_btn_box a", function(){
		if ($(this).attr("id") == "btnMain"){
			GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_비밀번호변경완료", "메인");
		} else if ($(this).attr("id") == "btnLogin"){
			GA_Event("click_PC_국문_로그인", "비밀번호찾기", "비밀번호찾기_비밀번호변경완료", "로그인");
		}
	});
	

	/** 
	 * 회원가입(온라인/오프라인)
	 */
	$(document).on("click", ".join_wrap .type_group .choice_box li #btnUmbJoin", function(){
		GA_Event("click_PC_국문_회원가입_온라인", "온라인", "온라인", "H.point통합회원");
	});
	$(document).on("click", ".join_wrap .type_group .choice_box li a", function(){
		if ($(this).attr("onclick") == "moveTermsAgree('N','KR','N')"){
			GA_Event("click_PC_국문_회원가입_온라인", "온라인", "온라인", "간편회원내국인");
		} else if ($(this).attr("onclick") == "moveTermsAgree('N','KR','Y')"){
			GA_Event("click_PC_국문_회원가입_오프라인", "오프라인", "오프라인", "간편회원내국인");
		}
	});
	$(document).on("click", ".join_wrap .type_group .choice_box li .type_fo_link a", function(){
		if ($(this).attr("onclick") == "moveTermsAgree('Y','KR','N')"){
			GA_Event("click_PC_국문_회원가입_온라인", "온라인", "온라인", "Foreigners_한국어");
		} else if ($(this).attr("onclick") == "moveTermsAgree('Y','EN','N')"){
			GA_Event("click_PC_국문_회원가입_온라인", "온라인", "온라인", "Foreigners_영어");
		} else if ($(this).attr("onclick") == "moveTermsAgree('Y','CN','N')"){
			GA_Event("click_PC_국문_회원가입_온라인", "온라인", "온라인", "Foreigners_중국어");
		} else if ($(this).attr("onclick") == "moveTermsAgree('Y','KR','Y')"){
			GA_Event("click_PC_국문_회원가입_오프라인", "오프라인", "오프라인", "Foreigners_한국어");
		} else if ($(this).attr("onclick") == "moveTermsAgree('Y','EN','Y')"){
			GA_Event("click_PC_국문_회원가입_오프라인", "오프라인", "오프라인", "Foreigners_영어");
		} else if ($(this).attr("onclick") == "moveTermsAgree('Y','CN','Y')"){
			GA_Event("click_PC_국문_회원가입_오프라인", "오프라인", "오프라인", "Foreigners_중국어");
		}
	});
	// 회원가입 > STEP01(/mm/mbshJoin/termsAgree.do)
	// 회원가입 > STEP02(/mm/mbshJoin/authentication.jsp)
	// 회원가입 > STEP03(/mm/mbshJoin/localInformation.jsp)
	// 회원가입 > STEP04(/mm/mbshJoin/joinComplete.jsp)
	

	/** 
	 * 상품상세
	 */
	if ($("#content.productdetail").find(".pd_hshare").length == 0){ // 상품상세(H.Share)와 구분 조건식
		// 상품 브랜드
		$(document).on("click", ".productdetail .pd_visual .summary_info .tit strong a", function(){
			var branNm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_상품상세", "상단", "상단", "브랜드_"+branNm);
		});
		
		// 좋아요 버튼
		$(document).on("click", ".productdetail .pd_visual .info_button .wish_popup button", function(){
			GA_Event("click_PC_국문_상품상세", "상단", "상단", "좋아요");
		});

		// 공유하기 버튼
		$(document).on("click", ".productdetail .pd_visual .info_button .sns_popup .sns_link a", function(){
			if ($(this).hasClass("facebook") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_공유하기", "공유하기_Facebook");
			} else if ($(this).hasClass("blog") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_공유하기", "공유하기_Blog");
			} else if ($(this).hasClass("kakao") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_공유하기", "공유하기_KakaoStoryzkzkdh");
			} else if ($(this).hasClass("email") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_공유하기", "공유하기_Email");
			}
		});
		
		// 상품구매 버튼
		$(document).on("click", ".productdetail .pd_info .button_area .square_tooltip button", function(){
			GA_Event("click_PC_국문_상품상세", "상단", "상단", "적립금혜택엿보기");
		});
		$(document).on("click", ".productdetail .pd_info .button_area a", function(){
			if ($(this).hasClass("addcart") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단", "장바구니");
			} else if ($(this).hasClass("buynow") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단", "바로구매");
			} else if ($(this).hasClass("notifi") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단", "재입고알림");
			}
		});
		
		// 상품정보 탭
		$(document).on("click", ".productdetail .pd_info .layercall li a", function(){
			if ($(this).parent().hasClass("call_panel_a") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_세트상품");
			} else if ($(this).parent().hasClass("call_panel_b") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_사은품");
			}  else if ($(this).parent().hasClass("call_panel_c") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_상품정보");
			}  else if ($(this).parent().hasClass("call_panel_d") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_추천상품");
			}  else if ($(this).parent().hasClass("call_panel_e") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_상품평");
			} 
		});
		$(document).on("click", ".pd_full_layer .tab-style li a", function(){
			if ($(this).parent().hasClass("tab_01") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_세트상품");
			} else if ($(this).parent().hasClass("tab_02") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_사은품");
			}  else if ($(this).parent().hasClass("tab_03") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_상품정보");
			}  else if ($(this).parent().hasClass("tab_04") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_추천상품");
			}  else if ($(this).parent().hasClass("tab_05") == true){
				GA_Event("click_PC_국문_상품상세", "상단", "상단_상세탭", "상세탭_상품평");
			} 
		});
		
		// 상품정보 탭 > 세트상품
		$(document).on("click", ".pd_full_layer .productdetail_01 .product_module .product_itme", function(){
			var prodNm = $(this).find(".price_info p").text();
			GA_Event("click_PC_국문_상품상세", "상세탭_세트상품", "상세탭_세트상품", "상품_"+prodNm);
		});
		$(document).on("click", ".pd_full_layer .productdetail_01 .product_module .price_buybtn a", function(){
			if ($(this).hasClass("buybtn_view") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_세트상품", "상세탭_세트상품", "구성보기");
			} else if ($(this).hasClass("buybtn_cart") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_세트상품", "상세탭_세트상품", "장바구니");
			} else if ($(this).hasClass("buybtn_cart") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_세트상품", "상세탭_세트상품", "세트담기");
			}
		});

		// 상품정보 탭 > 사은품
		$(document).on("click", ".pd_full_layer .productdetail_02 .gift_selection li.item", function(){
			if ($(this).hasClass("open") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_사은품", "상세탭_사은품", "펼치기");
			} else {
				GA_Event("click_PC_국문_상품상세", "상세탭_사은품", "상세탭_사은품", "닫기");
			}
		});

		// 상품정보 탭 > 상품정보 
		$(document).on("click", ".pd_full_layer .productdetail_03 .brand_info ul li button", function(){
			if ($(this).hasClass("b_notice") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_상품정보", "상세탭_상품정보", "좋아요");
			} else if ($(this).hasClass("b_favorites") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_상품정보", "상세탭_상품정보", "알림설정");
			}
		});
		$(document).on("click", ".pd_full_layer .productdetail_03 .basic_information .tel a", function(){
			var btnNm = $(this).find("strong").text().replace(/\s/g, ""),
				btnNm1 = $(this).find("span").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_상품상세", "상세탭_상품정보", "상세탭_상품정보_매장연락처", "매장연락처_"+btnNm+btnNm1);
		});

		// 상품정보 탭 > 추천상품
		$(document).on("click", ".pd_full_layer .productdetail_04 .product_list li a", function(){
			var prodNm = $(this).find(".tx_ex").text();
			if ($(this).parents(".box").hasClass("product_brandbest") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_추천상품", "상세탭_추천상품_브랜드베스트", "상품_"+prodNm);
			} else if ($(this).parents(".box").hasClass("relatedproducts") == true){
				GA_Event("click_PC_국문_상품상세", "상세탭_추천상품", "상세탭_추천상품_함께본상품", "상품_"+prodNm);
			} 
		});
		$(document).on("click", ".pd_full_layer .productdetail_04 h4 a.link", function(){
			GA_Event("click_PC_국문_상품상세", "상세탭_추천상품", "상세탭_추천상품_브랜드베스트", "브랜드샵바로가기");
		});
		// 브랜드베스트ㅛ상품, 함께본상품 버튼(로그인, 장바구니, 바로구매, 재입고알림)(/js/KO/common.js)

		// 상품정보 탭 > 상품평
		$(document).on("change", ".pd_full_layer .productdetail_05 .user_review .title select", function(){
			var val = $(this).val();
			if ($(this).attr("id") == "photoGrvwsSort"){
				if (val == "01"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_포토상품평_정렬기준", "정렬기준_최근등록일순");
				} else if (val == "02"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_포토상품평_정렬기준", "정렬기준_상품만족도높은순");
				} else if (val == "03"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_포토상품평_정렬기준", "정렬기준_조회수높은순");
				}
			} else if ($(this).attr("id") == "normalGrvwsSort"){
				if (val == "01"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_상품평_정렬기준", "정렬기준_최근등록일순");
				} else if (val == "02"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_상품평_정렬기준", "정렬기준_상품만족도높은순");
				} else if (val == "03"){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_상품평_정렬기준", "정렬기준_조회수높은순");
				}
			}
		});
		$(document).on("click", ".pd_full_layer .productdetail_05 .user_review .title a", function(){
			if ($(this).siblings("#photoGrvwsSort").length > 0){
				if ($(this).hasClass("sub") == true){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_포토상품평", "상품평쓰기");
				} else {
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_포토상품평", "내상품평보기");
				}
			} else if ($(this).siblings("#normalGrvwsSort").length > 0){
				if ($(this).hasClass("sub") == true){
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_상품평", "상품평쓰기");
				} else {
					GA_Event("click_PC_국문_상품상세", "상세탭_상품평", "상세탭_상품평_상품평", "내상품평보기");
				}
			}
		});
		
		// 쇼핑이용안내 버튼
		$(document).on("click", ".ordertime_btn", function(){
			GA_Event("click_PC_국문_상품상세", "Floating", "Floating", "쇼핑이용안내");
		});
	}


	/** 
	 * 상품상세(H.Share)
	 */
	if ($("#content.productdetail").find(".pd_hshare").length > 0){ // 상품상세(기본)와 구분 조건식
		// 툴팁
		$(document).on("click", ".productdetail .pd_info .pd_hshare .square_tooltip a", function(){
			GA_Event("click_PC_국문_상품상세_HSHARE", "상단", "상단_HSHARE혜택", "툴팁");
		});

		// 구매안내 버튼
		$(document).on("click", ".productdetail .pd_info .parallelimport_message a", function(){
			if ($(this).parents(".parallelimport_message").hasClass("open") == true){
				GA_Event("click_PC_국문_상품상세_HSHARE", "상단", "상단_구매안내", "펼치기");
			} else {
				GA_Event("click_PC_국문_상품상세_HSHARE", "상단", "상단_구매안내", "접기");
			}
		});

		// 버튼
		$(document).on("click", ".productdetail .pd_info .button_area a", function(){
			if ($(this).parents(".pd_info").find(".pd_hshare").length > 0){
				if ($(this).attr("id") == "addHSharePtcp"){
					GA_Event("click_PC_국문_상품상세_HSHARE", "상단", "상단", "참여하기");
				} else if ($(this).attr("id") == "completeHSharePtcp"){
					GA_Event("click_PC_국문_상품상세_HSHARE", "상단", "상단", "참여완료");
				}
			}
		});
	}


	/** 
	 * 브랜드관(브랜드상세)
	 */
	if ($("#container").find(".baseBrand").length > 0){ // 대표브랜드관, 특화관, 템플릿관과 구분 조건식
		var branCd = $(".brandtit_area .btn_area button[id='alarmBtn']").attr("value"),
			branNm = $(".brandtit_area .page_tit").text().replace(/\s/g, "");

		// 상단 버튼
		$(document).on("click", ".brandtit_area .btn_area button", function(){
			if ($(this).attr("id") == "alarmBtn"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_상단", "알림설정");
			} else if ($(this).attr("id") == "likeBtn"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_상단", "좋아요");
			}
		});

		// 쿠폰, 적립금 받기
		$(document).on("click", ".baseBrand .cuopondown_area .spe_coupon li a", function(){
			var bnnrNm = $(this).parents("li").attr("id");
			if (bnnrNm.indexOf("cup_") > -1){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_상단_쿠폰", "쿠폰받기");
			} else if (bnnrNm.indexOf("svmt_") > -1){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_상단_쿠폰", "적립금받기");
			} 
		});

		// 행사배너
		$(document).on("click", ".baseBrand .btm_banner > .banner-swiper .swiper-slide a", function(){
			var bnnrNm = $(this).find(".text p").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_브랜드행사배너", "배너_"+bnnrNm);
		});

		// 필터 탭 카테고리
		$(document).on("click", ".baseBrand .tabsort_wrap .branCateList li a", function(){
			var tabNm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm, branNm+"_상세탭", "상세탭_"+tabNm);
		});

		// 상세필터  - 쇼핑정보, 가격
		$(document).on("click", ".baseBrand .filter_wrap table td .check_group input[type='checkbox'] + label", function(){
			var tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, ""),
				filtChk = $(this).prev("input").is(":checked"),
				filtTp = $(this).prev("input").attr("name"),
				filtNm = $(this).text().replace(/\s/g, "");
			if (filtChk == true){
				if (filtTp == "shopFilter"){
					GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_쇼핑정보", "상세취소필터_"+filtNm);
				} else if (filtTp == "priceFilter"){
					GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_가격", "상세취소필터_"+filtNm);
				}
			} else {
				if (filtTp == "shopFilter"){
					GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_쇼핑정보", "상세필터_"+filtNm);
				} else if (filtTp == "priceFilter"){
					GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_가격", "상세필터_"+filtNm);
				}
			}
		});

		// 검색필터 - 가격
		var filterBran = 0;
		$(document).on("change", ".baseBrand .filter_wrap .input_group1.price .input_w input", function(){
			filterBran = 1;
		});
		$(document).on("click", ".baseBrand .filter_wrap .search_btnarea .search_btn", function(){
			var tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, "");
			if(filterBran == 1){
				var stPr = $(".input_group1.price .input_w input#priceFilterStr").val(),
					endPr = $(".input_group1.price .input_w input#priceFilterEnd").val();
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_필터_가격_$"+stPr+"~"+endPr, "검색");
			} else {
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_검색필터", "검색");
			}
		});

		// 필터 초기화 버튼
		$(document).on("click", ".baseBrand .filter_wrap .search_btnarea .reset_btn", function(){
			var tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_검색필터", "초기화");
		});

		// 상세필터, 검색필터 취소(/tiles/gd/goosFilter.jsp)

		// 필터 전체취소 - 쇼핑정보, 가격
		$(document).on("click", ".baseBrand .filter_wrap table tr .check_all_group .btn_all_x", function(){
			var tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, "");
			if ($(this).attr("onclick") == "searchTabInit(1);"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_쇼핑정보", "전체취소");
			} else if ($(this).attr("onclick") == "searchTabInit(2);"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_가격", "전체취소");
			}
		});

		// 검색결과 정렬기준
		$(document).on("change", ".baseBrand .sorting_wrap select[id='goodsListOrder']", function(){
			var val = $(this).val(),
				tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, "");
			if (val == "best"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_베스트순");
			} else if (val == "new"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_신상품순");
			} else if (val == "priceAsc"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_낮은가격순");
			} else if (val == "priceDesc"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_높은가격순");
			} else if (val == "dcRate"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_높은할인순");
			} else if (val == "grvws"){
				GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_정렬기준", "정렬기준_상품평많은순");
			}
		});

		// 검색결과 상품
		$(document).on("click", ".baseBrand .product_list.goosMoreArea li a", function(){
			var tabNm = $(".branCateList li.ui-tabs-active a").text().replace(/\s/g, ""),
				prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_브랜드상세_"+branCd, branNm+"_상세탭", branNm+"_상세탭_"+tabNm+"_상품", "상품_"+prodNm);
		});
		// 검색결과 상품 버튼(로그인, 장바구니, 바로구매, 재입고알림)(/js/KO/common.js)
	}


	/** 
	 * 대표브랜드관
	 */
	if ($("#container").find(".reprBrand").length > 0){ // 브랜드관(기본), 특화관, 템플릿관과 구분 조건식
		var branCd = $(".brandtit_area .heart-motion").attr("onclick").replace(/[^0-9]/gi,""),
			branNm = $(".brandtit_area .page_tit").text().replace(/\s/g, "");

		// 메인배너
		$(document).on("click", ".reprBrand .spacialbanner .swiper-slide", function(){
			var bnnrNm = $(this).find(".text p").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_대표브랜드관_"+branCd, branNm, branNm+"_메인배너", "배너_"+bnnrNm);
		});
		
		// 중간배너
		$(document).on("click", ".reprBrand .brandshop_slide .product_module .product_itme a", function(){
			var branNm = $(this).find("em").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_대표브랜드관_"+branCd, branNm, branNm+"_중간배너", "배너_"+branNm);
		});

		// 행사배너
		$(document).on("click", ".reprBrand .btm_banner .banner-swiper .swiper-slide a", function(){
			var bnnrNm = $(this).find(".text").text().replace(/\s/g, "");
			GA_Event("click_PC_국문_대표브랜드관_"+branCd, branNm, branNm+"_브랜드행사배너", "배너_"+bnnrNm);
		});
		
		// 브랜드 탭
		$(document).on("click", ".reprBrand .tabsort_wrap .branCateList li a", function(){
			var tabNm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_대표브랜드관_"+branCd, branNm, branNm+"_탭", "탭_"+tabNm);
		});
		
		// 브랜드 상품
		$(document).on("click", ".reprBrand .product_list li a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_대표브랜드관_"+branCd, branNm, branNm+"_상품", "상품_"+prodNm);
		});
	}


	/** 
	 * 특화관
	 */
	if ($("#container").find(".special_content").length > 0){ // 브랜드관(기본), 대표브랜드관, 템플릿관과 구분 조건식
		var urlParams = new URLSearchParams(window.location.search),
			spclId = urlParams.get("spclMenuSeq"),
			spclNm = $(".special_content .page_tit").text().replace(/\s/g, "");
		
		// 매인배너
		$(document).on("click", ".special_content .spacialbanner .swiper-slide", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_메인배너", "메인배너_"+bnnrNm);
		});
		
		// 영상영역
		$(document).on("click", ".special_content .spe_edit .box video", function(){
			var bnnrNm = $(this).parents(".spe_edit").find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_메인배너", "메인배너_"+bnnrNm);
		});
		
		// 해시태그
		$(document).on("click", ".special_content .spe_hashtag .tag_group a", function(){
			var tagTerm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_해시태그", "해시태그_"+tagTerm);
		});
		
		// 쿠폰
		$(document).on("click", ".special_content .spe_coupon li", function(){
			var coupTxt = $(this).find(".square_coupon > p").text(),
				coupTxt1 = $(this).find(".square_coupon dl dt").text(),
				coupNm = (coupTxt+"_"+coupTxt1).replace(/\s/g, ""),
				coupNmCut = coupNm.substring(0, 20);
			if (coupNm.length > 20){ // 글자수 제한(20자 이상 삭제)
				GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_쿠폰", "쿠폰_"+coupNmCut+"⋯");
			} else {
				GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_쿠폰", "쿠폰_"+coupNm);
			}
		});
		
		// 세트상품
		$(document).on("click", ".special_content .spe_sets .product_module .product_itme > a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_세트상품", "상품_"+prodNm);
		});
		$(document).on("click", ".special_content .spe_sets .product_module .product_itme .price_buybtn a", function(){
			if ($(this).hasClass("buybtn_view") == true){
				GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_세트상품", "구성보기");
			} else if ($(this).hasClass("buybtn_cart") == true && $(this).hasClass("set") == true){
				GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_세트상품", "세트담기");
			} else if ($(this).hasClass("buybtn_cart") == true){
				GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_세트상품", "장바구니");
			}
		});
		
		// 추천브랜드
		$(document).on("click", ".special_content .recommend_brand .product_module .product_itme a", function(){
			var branNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_추천브랜드", "브랜드_"+branNm);
		});
		
		// 추천상품
		$(document).on("click", ".special_content .recommend_products .product_list li a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_추천상품", "상품_"+prodNm);
		});
		
		// 상품리스트
		$(document).on("click", ".special_content .product_list.goosMoreArea .product_itme.goosList a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_특화관_"+spclId, spclNm, spclNm+"_상품리스트", "상품_"+prodNm);
		});
	}


	/** 
	 * 템플릿관(기본형/확장형)
	 */
	if ($("#container").find(".shop_tmpl").length > 0){ // 브랜드관(기본), 대표브랜드관, 템플릿관과 구분 조건식
		var branCd = $(this).find(".shop_title_wrap button[id='alarmBtn']").attr("value"),
			branNm = $(this).find(".shop_title_wrap h2 img").attr("alt").replace(/\s/g, "");

		/* 템플릿관 > 기본형 */
		// 상단버튼
		$(document).on("click", ".basic .shop_title_wrap .util button", function(){
			if ($(this).attr("id") == "alarmBtn"){
				GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_기본형", branNm+"_기본형_상단", "알림설정");
			} else if ($(this).hasClass("heart-motion") == true){
				GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_기본형", branNm+"_기본형_상단", "좋아요");
			}
		});
		
		// 메인배너
		$(document).on("click", ".basic .main_banner ul li a", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_기본형", branNm+"_기본형_메인배너", "배너_"+bnnrNm);
		});
		
		// 분할배너
		$(document).on("click", ".basic .banner_con div a", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_기본형", branNm+"_기본형_분할배너_하단", "배너_"+bnnrNm);
		});

		/* 템플릿관 > 확장형 */
		// 상단버튼
		$(document).on("click", ".expand .shop_title_wrap .util button", function(){
			if ($(this).attr("id") == "alarmBtn"){
				GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_상단", "알림설정");
			} else if ($(this).hasClass("heart-motion") == true){
				GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_상단", "좋아요");
			}
		});
		
		// 상세탭
		$(document).on("click", ".expand .shop_menu_wrap .depth1_wrap .depth1_con a", function(){
			var tabNm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_상단_상세탭", "상세탭_"+tabNm);
		});

		// 메인배너
		$(document).on("click", ".expand .main_banner .banner_slide ul li a", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_메인배너", "배너_"+bnnrNm);
		});
		
		// 분할배너
		$(document).on("click", ".expand .banner_con div a", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_분할배너_상단", "배너_"+bnnrNm);
		});
		
		// 베스트상품
		$(document).on("click", ".expand .best_con .prd_slide_wrap .product_list li a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_베스트상품", "상품_"+prodNm);
		});
		
		// 이미지영역
		$(document).on("click", ".expand .banner_wide_con .banner_slide li a", function(){
			var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_이미지영역", "배너_"+bnnrNm);
		});
		
		// 상품영역
		$(document).on("click", ".expand .hot_sale_con .prd_slide_wrap .product_list li a", function(){
			var prodNm = $(this).find("img").attr("alt");
			GA_Event("click_PC_국문_템플릿관_"+branCd, branNm+"_확장형", branNm+"_확장형_할인상품", "상품_"+prodNm);
		});
	}


	/**
	 * 명품관 > 에스티로더(022901)
	 */
	// GNB - depth01
	$(document).on("click", "#el_wrapper .header .gnb > ul > li > a", function(){
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", "#el_wrapper .header .gnb > ul > li .gnbsub div.section ul li a", function(){
		var gnbNm = $(this).parents(".gnbsub").siblings("a").find("img").attr("alt").replace(/\s/g, "");
		if ($(this).parents(".section").find("h3").length > 0){
			var gnbNm1 = $(this).parents(".section").find("h3 img").attr("alt").replace(/\s/g, ""),
				gnbNm2 = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);			
		} else {
			gnbNm1 = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);	
		}
	});
	// GNB - depth02 all
	$(document).on("click", "#el_wrapper .header .gnb > ul > li .gnbsub h3.all a", function(){
		var gnbNm = $(this).parents(".gnbsub").siblings("a").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});

	// 카테고리
	$(document).on("click", "#el_wrapper .m_contents .section2 a", function(){ // 선택자 불안정
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});

	// 배너 - 상단배너, 메인배너, 중간배너
	$(document).on("click", "#el_wrapper .tbanner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_상단배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#el_wrapper .m_contents #main_slides .el_bxslider li a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#el_wrapper .m_contents .section > a", function(){ // 선택자 불안정
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_중간배너", "배너_"+bnnrNm);
	});

	// 베스트셀러 상품
	$(document).on("click", "#el_wrapper .m_contents .section .bannerLink1 area", function(){  // 선택자 불안정
		var bnnrNm = $(this).attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_022901", "에스티로더", "에스티로더_베스트셀러", "상품_"+bnnrNm);
	});


	/**
	 * 명품관 > 클라랑스(005701)
	 */
	// GNB - depth01
	$(document).on("click", ".clarins-wrap .clarins-gnb > ul > li > a", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".clarins-wrap .clarins-gnb > ul > li > a + ul > li > a", function(){
		var gnbNm = $(this).parents("ul").siblings("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// GNB - depth03
	$(document).on("click", ".clarins-wrap .clarins-gnb ul.clarins-has-depth3 li a + ul li a", function(){
		var gnbNm = $(this).parents("ul.clarins-has-depth3").siblings("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).parent("li").parent("ul").siblings("a").text().replace(/\s/g, ""),
			gnbNm2 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
	});
	
	// 카테고리
	$(document).on("click", ".clarins-wrap .clarins-card-items .clarins-item .clarins-thumb", function(){
		var gnbNm = $(this).parent().find(".clarins-name").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_카테고리", "카테고리_"+gnbNm);
	});

	// 배너 - 메인배너, 하단배너
	$(document).on("click", ".clarins-wrap .clarins-mainBanner .swiper-slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".clarins-footerBanner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_하단배너", "배너_"+bnnrNm);
	});

	// 상품 - 신제품, 베스트셀러
	$(document).on("click", ".clarins-wrap .clarins-slider-1 .clarins-item", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_신제품", "상품_"+prodNm);
	});
	$(document).on("click",  ".clarins-wrap .clarins-slider-2 .clarins-item", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_005701", "클라랑스", "클라랑스_베스트셀러", "상품_"+prodNm);
	});


	/**
	 * 명품관 > 랑콤(006301)
	 */
	// GNB - depth01
	$(document).on("click", ".lancome_header .lancome_header_tab_list .lancome_header_tab > a", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".lancome_header .dropdown-list-container .dropdown-inner .inner-menu .dropdown-list .list_title", function(){
		var gnbCd = $(this).parents(".dropdown-list-container").attr("data-tabindex"),
			gnbNm = $(".lancome_header .lancome_header_tab_list .lancome_header_tab[data-tabindex='"+gnbCd+"']").find("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// GNB - depth03
	$(document).on("click", ".lancome_header .dropdown-list-container .dropdown-inner .inner-menu .dropdown-list .list_item", function(){
		var gnbCd = $(this).parents(".dropdown-list-container").attr("data-tabindex"),
			gnbNm = $(".lancome_header .lancome_header_tab_list .lancome_header_tab[data-tabindex='"+gnbCd+"']").find("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).siblings(".list_title").find("a").text().replace(/\s/g, ""),
			gnbNm2 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
	});
	// GNB - 상품배너 상품 바로구매
	$(document).on("click", ".lancome_header .dropdown-list-container .dropdown-inner .inner-img a", function(){
		var gnbCd = $(this).parents(".dropdown-list-container").attr("data-tabindex"),
			gnbNm = $(".lancome_header .lancome_header_tab_list .lancome_header_tab[data-tabindex='"+gnbCd+"']").find("a").text().replace(/\s/g, ""),
			prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_상품_"+prodNm);
	});
	// GNB(제니피끄) - 상품 바로구매
	$(document).on("click", ".lancome_header .dropdown-list-container .dropdown-container div[class^='container-'] .box-wrap a", function(){
		var gnbCd = $(this).parents(".dropdown-list-container").attr("data-tabindex"),
			gnbNm = $(".lancome_header .lancome_header_tab_list .lancome_header_tab[data-tabindex='"+gnbCd+"']").find("a").text().replace(/\s/g, ""),
			prodNm = $(this).parents(".box-wrap").find(".dropdown-para01").text();
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_상품_"+prodNm);
	});

	// 카테고리
	$(document).on("click", ".lancome_homepage .lancome_bottom_section .lancome_category_btn a", function(){
		var gnbNm = $(this).find("i.hide").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_카테고리", "카테고리_"+gnbNm);
	});

	// 배너 - 메인배너, 중간배너
	$(document).on("click", ".lancome_homepage #lancome_homepage_carousel .slick-slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".lancome_homepage .lancome_promotion_banner .slick-slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_중간배너", "배너_"+bnnrNm);
	});

	// 상품 - 베스트셀러, 중간컨텐츠상품, 중간컨텐츠상품 버튼
	$(document).on("click", ".lancome_homepage .lancome_bottom_carousel .lancome_bottom_carousel_btn a", function(){
		var prodNm = $(this).text();
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_베스트셀러", "상품_"+prodNm);
	});
	$(document).on("click", ".lancome_homepage .lancome_homepage_product_container .lancome_homepage_product_img", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_중간컨텐츠_상품", "상품_"+prodNm);
	});
	$(document).on("click", ".lancome_homepage .lancome_homepage_product_container .lancome_homepage_product_btns > a", function(){
		if ($(this).hasClass("lancome_plp_product_addToCartbtn") == true){
			GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_중간컨텐츠_상품", "장바구니");
		} else if ($(this).hasClass("lancome_plp_product_buybtn") == true){
			GA_Event("click_PC_국문_명품관_006301", "랑콤", "랑콤_중간컨텐츠_상품", "바로구매");
		}
	});


	/**
	 * 명품관 > 겔랑(005601)
	 */
	// GNB - depth01
	$(document).on("click", ".guerlain-wrap .menu-wrapper .navbar-nav > li > a", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".guerlain-wrap .menu-wrapper .navbar-nav .sub-menu .sub-menu-item ul li:nth-child(1) a", function(){
		var gnbNm = $(this).parents(".sub-menu").siblings("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// GNB - depth03
	$(document).on("click", ".guerlain-wrap .menu-wrapper .navbar-nav .sub-menu .sub-menu-item ul li:not(:first-child) a", function(){
		var gnbNm = $(this).parents(".sub-menu").siblings("a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).parents(".sub-menu-item").find("ul li:nth-child(1) a").text().replace(/\s/g, ""),
			gnbNm2 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
	});

	// 카테고리
	$(document).on("click", ".guerlain-wrap .guerlain-card-items .guerlain-item", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_카테고리", "카테고리_"+gnbNm);
	});

	// 배너 - 상단배너(구조확인불가), 메인배너, 중간배너, 브랜드스토리더보기 버튼
	$(document).on("click", ".guerlain-wrap .guerlain-mainBanner .guerlain-thumb", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".guerlain-wrap .guerlain-mainBanner .guerlain-link-more", function(){
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_중간배너", "배너_브랜드스토리더보기");
	});

	// 상품 - 신제품, 베스트셀러
	$(document).on("click", ".guerlain-wrap .guerlain-slider-1 .guerlain-pdt-items .guerlain-item", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_신제품", "상품_"+prodNm);
	});
	$(document).on("click", ".guerlain-wrap .guerlain-slider-2 .guerlain-pdt-items .guerlain-item", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_005601", "겔랑", "겔랑_베스트셀러", "상품_"+prodNm);
	});

	
	/**
	 * 명품관 > 조말론(025501)
	 */
	// GNB - depth01
	$(document).on("click", ".jmwrap .jmheader .gnb .gnb_column > h2 > a, .jmwrap .jmcontents .mainbanner li a", function(){
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025501", "조말론", "조말론_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".jmwrap .jmheader .gnb .gnb_column .gnb_sub > ul > li > a", function(){
		var gnbNm = $(this).parents(".gnb_sub").siblings("h2").find("a img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025501", "조말론", "조말론_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// GNB - depth03
	$(document).on("click", ".jmwrap .jmheader .gnb .gnb_column .gnb_sub h3 + ul li a", function(){
		var gnbNm = $(this).parents(".gnb_sub").siblings("h2").find("a img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).parents("ul").siblings("h3").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm2 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025501", "조말론", "조말론_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
	});
	
	// 메인배너
	$(document).on("click", ".jmwrap .jmcontents #slides .slides_container .slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025501", "조말론", "조말론_메인배너", "배너_"+bnnrNm);
	});
	

	/**
	 * 명품관 > 톰포드(027102)
	 */
	// GNB
	$(document).on("click", ".tf_wrap .tf_gnb > .gnb_column a", function(){
		if ($(this).parents(".gnb_column").find("ul").length > 0){
			// depth02
			var gnbNm = $(this).parents("ul").siblings("a").text().replace(/\s/g, ""),
				gnbNm1 = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_명품관_027102", "톰포드", "톰포드_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
		} else {	
			// depth01		
			var gnbNm = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_명품관_027102", "톰포드", "톰포드_카테고리메뉴", "카테고리메뉴_"+gnbNm);
		}
	});

	// 배너 - 상단배너, 메인배너
	$(document).on("click", ".tf_wrap .tf_contents .banner_wrap .visual a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_027102", "톰포드", "톰포드_상단배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".tf_wrap .tf_contents .banner_wrap div[class^='banner_'] a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_027102", "톰포드", "톰포드_메인배너", "배너_"+bnnrNm);
	});


	/**
	 * 명품관 > 라메르(025301)
	 */
	// GNB - depth01
	$(document).on("click", "#lamerwrap .header .gnb > ul > li > a", function(){
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", "#lamerwrap .header .gnb > ul > li.hassub ul li a", function(){
		var gnbNm = $(this).parents("ul").siblings("a").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});

	// 배너 - 상단배너, 메인배너, 중간배너
	$(document).on("click", "#lamerwrap .header .tban", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_상단배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#lamerwrap .mcontent #slides .slides_container .slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#lamerwrap .mcontent .section > a", function(){ // 선택자 불안정
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_중간배너", "배너_"+bnnrNm);
	});

	// 중간컨텐츠상품
	$(document).on("click", "#lamerwrap .mcontent .section #bannerLink1 area", function(){ // 선택자 불안정
		var prodNm = $(this).attr("alt");
		GA_Event("click_PC_국문_명품관_025301", "라메르", "라메르_중간컨텐츠_상품", "상품_"+prodNm);
	});
	

	/**
	 * 명품관 > 달팡(026901)
	 */
	// GNB - depth01
	$(document).on("click", "#darphin_wrap .header .gnb > ul > li > a", function(){
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", "#darphin_wrap .header .gnb .gnbsub ul li a", function(){
		var gnbNm = $(this).parents(".gnbsub").siblings("a").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});

	// 배너 - 상단배너, 메인배너, 중간배너, 하단배너
	$(document).on("click", "#darphin_wrap .header .tbanner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_상단배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#darphin_wrap .maincontents .section .bxslider li a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#darphin_wrap .maincontents .section > a", function(){ // 선택자 불안정
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_중간배너", "배너_"+bnnrNm);
	});
	$(document).on("click", "#darphin_wrap .maincontents .section2 > a", function(){ // 선택자 불안정
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_하단배너", "배너_"+bnnrNm);
	});

	// 베스트셀러 상품
	$(document).on("click", "#darphin_wrap .maincontents .section #bestLink1 area", function(){ // 선택자 불안정
		var prodNm = $(this).attr("alt");
		GA_Event("click_PC_국문_명품관_026901", "달팡", "달팡_베스트셀러", "상품_"+prodNm);
	});


	/** 
	 * 명품관 > 크리니크(025701)
	 */
	// GNB - depth01
	$(document).on("click", ".cl_wrap .cl_header .gnb .gnb_column h2 a", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".cl_header .gnb .gnb_column .gnb_sub a", function(){
		var gnbNm = $(this).parents(".gnb_column").find("h2 a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "")
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	
	// 배너 - 상단배너, 메인배너, 중간배너
	$(document).on("click", ".cl_wrap.cl_header .tbanner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_상단배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".cl_wrap #slides .bx-wrapper li a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".cl_wrap .mban_wrap .mbanner a, .cl_wrap .mban_wrap ul li a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_중간배너", "배너_"+bnnrNm);
	});

	// 베스트셀러 상품
	$(document).on("click", ".cl_wrap .hot_product .tab_info#best_prod map area", function(){
		var prodNm = $(this).attr("alt");
		GA_Event("click_PC_국문_명품관_025701", "크리니크", "크리니크_베스트셀러", "상품_"+prodNm);
	});


	/** 
	 * 명품관 > 맥(025401)
	 */
	// 카테고리 - depth01
	$(document).on("click", "#mac_wrap .gnb > ul > li > a", function(){
		var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// 카테고리 - depth02
	$(document).on("click", "#mac_wrap .gnb ul[id^='gnbsub'] > li > a", function(){
		var gnbNm = $(this).parents("ul[id^='gnbsub']").siblings("a").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// 카테고리 - depth03
	$(document).on("click", "#mac_wrap .gnb ul[id^='gnbsub'] li ul li a", function(){
		var gnbNm = $(this).parents("ul[id^='gnbsub']").siblings("a").find("img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).parent("li").parent("ul").parent("li").contents().not($(this).parents("ul")).text().replace(/\s/g, ""),
			gnbNm2 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
	});

	// 메인배너 
	$(document).on("click", "#mac_wrap .home_slider .bx-wrapper li a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_메인배너", "배너_"+bnnrNm);
	});

	// 상품 - 신재품, 베스트셀러, 면세전용
	$(document).on("click", "#mac_wrap .mtab #mtabdiv1 map area", function(){
		var prodNm = $(this).find("img").attr("alt");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_신제품", "상품_"+prodNm);
	});
	$(document).on("click", "#mac_wrap .mtab #mtabdiv2 map area", function(){
		var prodNm = $(this).attr("alt");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_베스트셀러", "상품_"+prodNm);
	});
	$(document).on("click", "#mac_wrap .mtab #mtabdiv3 map area", function(){
		var prodNm = $(this).attr("alt");
		GA_Event("click_PC_국문_명품관_025401", "맥", "맥_면세전용", "상품_"+prodNm);
	});


	/* S : 2023-07-05 추가 */
	/** 
	* 명품관 > 입생로랑(007901)
	*/
	// GNB - depth01
	$(document).on("click", "#ysl-wrap #ysl-header .gnb-list > ul > li > a", function(){
		var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_카테고리메뉴", "카테고리메뉴_"+gnbNm);		
	});
	// GNB - depth02/depth03
	$(document).on("click", "#ysl-wrap #ysl-header .gnb-list > ul > li > .sub-menu-list > ul > li > a", function(){    
		var checkDepth = $(this).parent();
		//GNB - depth02
		if(checkDepth.hasClass("ttl")){
			var gnbNm = $(this).parents(".gnb-list > ul > li").find("a").eq(0).text().replace(/\s/g, ""),
				gnbNm1 = $(this).text().replace(/\s/g, "");
			GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);			
		}
		//GNB - depth03
		else{
			var gnbNm = $(this).parents(".gnb-list > ul > li").find("a").eq(0).text().replace(/\s/g, ""),
				gnbNm1 = $(this).parents(".sub-menu-list > ul").find("li.ttl a").eq(0).text().replace(/\s/g, ""),
				gnbNm2 = $(this).text().replace(/\s/g, "");
			
			if(gnbNm1.length > 0){
				GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);				
			}
			else{
				GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm2);				
			}
		}
	});	
	// 배너 - 메인배너
	$(document).on("click", "#ysl-wrap .ysl-container .ysl-main .ysl-main-slide .slick-slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_메인배너", "배너_"+bnnrNm);
	});
	// 배너 - 카테고리
	$(document).on("click", "#ysl-wrap .ysl-container .category_area ul.category li a", function(){
		var bnnrNm = $(this).parent().find("span").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_카테고리", "카테고리_"+bnnrNm);        
	});
	// 배너 - 중간배너
	$(document).on("click", "#ysl-wrap .ysl-container .banner_area a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007901", "입생로랑", "입생로랑_중간배너", "배너_"+bnnrNm);        
	});

	// 상품 - 베스트셀러 (선처리 완료)


	/** 
    * 명품관 > 헬레나루빈스타인(007401)
    */
    // GNB - depth01
    $(document).on("click", "#hr-wrap #header-hr .menu-list-hr > ul > li > a", function(){
        var gnbNm = $(this).text().replace(/\s/g, "");
        GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_카테고리메뉴", "카테고리메뉴_"+gnbNm);        
    });
    // GNB - depth02/depth03
    $(document).on("click", "#hr-wrap #header-hr .menu-list-hr > ul > li > .sub-menu-list > ul > li > a", function(){    
        var checkDepth = $(this).parent();
        // GNB - depth02
        if(checkDepth.hasClass("ttl")){
            var gnbNm = $(this).parents(".menu-list-hr > ul > li").find("a").eq(0).text().replace(/\s/g, ""),
                gnbNm1 = $(this).text().replace(/\s/g, "");
            GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);            
        }
        // GNB - depth03
        else{
            var gnbNm = $(this).parents(".menu-list-hr > ul > li").find("a").eq(0).text().replace(/\s/g, ""),
                gnbNm1 = $(this).parents(".sub-menu-list > ul").find("li.ttl a").eq(0).text().replace(/\s/g, ""),
                gnbNm2 = $(this).text().replace(/\s/g, "");       
			GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1+"_"+gnbNm2);
        }
    });
    // 배너 - 메인배너
	$(document).on("click", "#hr-wrap #main-hr .slide_box .slick-list .slick-slide .img_box a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_메인배너", "배너_"+bnnrNm);        
	});
	// 배너 - 중간배너
	$(document).on("click", "#hr-wrap #main-hr .bnr_conts_wrap .type_brand a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_중간배너", "배너_"+bnnrNm);        
	});
	// 배너 - 하단배너
	$(document).on("click", "#hr-wrap #main-hr .bnr_conts_wrap .type_story a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_007401", "헬레나루빈스타인", "헬레나루빈스타인_하단배너", "배너_"+bnnrNm);        
	});    
	// 상품 - 베스트셀러, 신제품 (선처리 완료)

	
	/** 
	 * 명품관 > 아베다(026201)
	 */
	// GNB - depth01
	$(document).on("click", ".avd_wrap .avd_header .avd_gnb .gnb_column h2 a", function(){		
        var gnbNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".avd_wrap .avd_header .avd_gnb .gnb_column .gnb_sub a", function(){
		var gnbNm = $(this).parents(".gnb_column").find("h2 a img").attr("alt").replace(/\s/g, ""),
			gnbNm1 = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});	
	// 배너 - 상단배너
	$(document).on("click", ".avd_wrap .avd_header .tban_area a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_상단배너", "배너_"+bnnrNm);
	});
	// 배너 - 메인배너
	$(document).on("click", ".avd_wrap #avd_container #slides .slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_메인배너", "배너_"+bnnrNm);
	});
	$(document).on("click", ".avd_wrap #avd_container .full_banner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_메인배너", "배너_"+bnnrNm);
	});
	// 배너 - 하단배너
    $(document).on("click", ".avd_wrap #avd_container .sbanner + .section a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_하단배너", "배너_"+bnnrNm);
	});
	// 배너 - 카테고리
	$(document).on("click", ".avd_wrap #avd_container .sbanner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_카테고리", "카테고리_"+bnnrNm);
	});
	// 상품 - 베스트셀러
	$(document).on("click", ".avd_wrap #avd_container .prod_list .bx-wrapper ul li", function(){
		var prodNm = $(this).find(".name a").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026201", "아베다", "아베다_베스트셀러", "상품_"+prodNm);
	});


	/** 
	 * 명품관 > 랩시리즈(026701)
	 */
	// GNB - depth01
	$(document).on("click", ".elco_wrap .elco_header .elco_gnb .gnb_column h2 a", function(){		
        var gnbNm = $(this).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_카테고리메뉴", "카테고리메뉴_"+gnbNm);
	});
	// GNB - depth02
	$(document).on("click", ".elco_wrap .elco_header .elco_gnb .gnb_column .gnb_sub ul li a", function(){
		var gnbNm = $(this).parents(".gnb_column").find("h2 a").text().replace(/\s/g, ""),
			gnbNm1 = $(this).find("span").eq(1).text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_카테고리메뉴", "카테고리메뉴_"+gnbNm+"_"+gnbNm1);
	});
	// 배너 - 상단배너
	$(document).on("click", ".elco_wrap .elco_header .tban_area a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_상단배너", "배너_"+bnnrNm);
	});
	// 배너 - 메인배너
	$(document).on("click", ".elco_wrap .elco_container #slides .slide a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_메인배너", "배너_"+bnnrNm);
	});
	// 배너 - 중간배너
	$(document).on("click", ".elco_wrap .elco_container .big_banner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_중간배너", "배너_"+bnnrNm);
	});
	// 카테고리
	$(document).on("click", ".elco_wrap .elco_container .small_banner a", function(){
		var bnnrNm = $(this).find("img").attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_카테고리", "카테고리_"+bnnrNm);
	});
	// 상품 - 베스트셀러
	$(document).on("click", ".elco_wrap .elco_container #bannerLink1 area", function(){
		var prodNm = $(this).attr("alt").replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_베스트셀러", "상품_"+prodNm);
	});
	// 상품 - 중간컨텐츠
	$(document).on("click", ".elco_wrap .elco_container .prod_list ul li .prod_img a", function(){
		var prodNm = $(this).parents(".prod_info").find(".name a").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_중간컨텐츠_상품", "상품_"+prodNm);
	});
	$(document).on("click", ".elco_wrap .elco_container .prod_list ul li p a", function(){
		var prodNm = $(this).parents(".prod_info").find(".name a").text().replace(/\s/g, "");
		GA_Event("click_PC_국문_명품관_026701", "랩시리즈", "랩시리즈_중간컨텐츠_상품", "상품_"+prodNm);
	});
	/* E : 2023-07-05 추가 */
});


let commonData = {};
let virCommonData = {};
let browserInfo = navigator.userAgent;

// 빈 매개변수 제거
function convertElement(removeValue){
	let returnValue = {};
	for(key in removeValue){
		if(!removeValue[key]){
			delete removeValue[key]
		}
	}
	returnValue = removeValue;

	return returnValue
}

// 하이브리드 함수
function hybrid(object){
	let emptyObject = JSON.parse(JSON.stringify(convertElement(commonData)));
	let GAData = Object.assign(emptyObject, convertElement(object));
	if (browserInfo.indexOf('GA_Android') > -1) {
		window.android.GA_DATA(JSON.stringify(GAData));
	} else if (browserInfo.indexOf('GA_iOS_WK') > -1) {
		webkit.messageHandlers.hddfsgascriptCallbackHandler.postMessage(JSON.stringify(GAData));  
	}
}

// 가상페이지 하이브리드 함수
function virHybrid(object){
	let emptyObject = JSON.parse(JSON.stringify(convertElement(virCommonData)));
	let GAData = Object.assign(emptyObject, convertElement(object));
	if (browserInfo.indexOf('GA_Android') > -1) {
		window.android.GA_DATA(JSON.stringify(GAData));
	} else if (browserInfo.indexOf('GA_iOS_WK') > -1) {
		webkit.messageHandlers.hddfsgascriptCallbackHandler.postMessage(JSON.stringify(GAData));  
	}
}

// 공통 화면 함수
function GA_Screen(object){
	try{
		commonData = object;
		if (browserInfo.indexOf('GA_iOS_WK')>-1 || browserInfo.indexOf('GA_Android')>-1) {
			commonData.type = 'P';
			hybrid(commonData);
		} else {
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-KMNW5DW');
		};
	} catch(e) {
		console.log('GA_Screen 함수 ERROR');
	};
}

// 가상 페이지 뷰
function GA_Virtual(virtualObject){
	try{
		virCommonData = virtualObject;
		if(browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1){ 
			virtualObject.type = 'P'
			virHybrid(virtualObject);
		} else {
			virtualObject.event = 'ga_virtual';
			dataLayer.push(convertElement(virtualObject));
		}
	} catch(e) {
		console.log('GA_Virtual 함수 ERROR')
	}

}

// 공통 이벤트 함수
function GA_Event(event_name, ep_button_area, ep_button_area2, ep_button_name, isVirtual){
	try{
		let GAData = {
			event_name,
			ep_button_area,
			ep_button_area2,
			ep_button_name,
		};

		if (browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1) {
			GAData.type = "E";
			if (isVirtual) {
				virHybrid(GAData); 
			} else {
				hybrid(GAData);
			}
		} else {
			GAData.event = 'ga_event';
			if (isVirtual) {
				let virtualObject = virCommonData;
				GAData = Object.assign(virtualObject, GAData);
				dataLayer.push(GAData);
			} else {
				dataLayer.push(GAData);
			}
			setDataLayer();
		};
	}catch(e){
		console.log('GA_Event 함수 ERROR');
	};
}

// 공통 전자상거래 함수
function GA_Ecommerce(E_step, items, actionList, ecommerceHit, isVirtual) {
	try{
		if (browserInfo.indexOf('GA_Android') > -1 || browserInfo.indexOf('GA_iOS_WK') > -1) { 
			let APPData = {
				items,
				event_name: E_step,
				type: 'E',
				transaction: actionList,
			};
			let GAData = Object.assign(APPData, ecommerceHit);
			if (isVirtual) {
				virHybrid(GAData);
			} else {
				hybrid(GAData);
			}

		} else {
			let ecommerce = { items };
			let ecommerceData = Object.assign(ecommerce, actionList);
			let GAData = Object.assign({}, ecommerceHit);
			GAData.event = 'ga_ecommerce';
			GAData.event_name = E_step;
			GAData.ecommerce = ecommerceData;
			if (isVirtual) {
				let virtualObject = virCommonData;
				GAData = Object.assign(virtualObject, GAData);
				dataLayer.push(GAData);
			} else {
				dataLayer.push(GAData);
			}
			setDataLayer();
		};
	} catch(e) {
		console.log('GA_Ecommerce 함수 ERROR');
	};
}

// 초기화 함수
function setDataLayer() {
	let setGTM = {};
	for (value of dataLayer) {
		for (key in value) {
			if(key.includes('ep_') || key.includes('cm_') || key.includes('ecommerce') || key.includes('event_name')) {
				setGTM[key] = undefined;
			};
		};
	};
	return dataLayer.push(setGTM);
}