if(sessionStorage.getItem("selMainSwiperPos") == null){
	sessionStorage.setItem("selMainSwiperPos", 0);
}

// intro
function IntroSize(){
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var scrollTop = $(this).scrollTop();
	var ImgHeight = $('.intro_img').height();
	var conHeight = $(".intro_box > article").height(true) //여백에 따른 높이값 변경 제거 outerHeight → height
	$(".intro_box").css({"min-width":(windowWidth)+"px"});
	$(".intro_box").css({"min-height":(windowHeight)+"px"});
	$("#intro").css({"padding-top":((windowHeight-ImgHeight)/2)+"px"});
	$("#intro").css({"padding-bottom":((windowHeight-ImgHeight)/2)+"px"});
	// $(".btn_gohome").css({"bottom":((conHeight-windowHeight-20)-scrollTop)+"px"});
	if(windowHeight > ImgHeight){
		$(".btn_gohome").css({"bottom": -20});
	} else {
		$(".btn_gohome").css({"bottom": (ImgHeight - windowHeight) - 20});
	}
};
window.onload = IntroSize;
window.onresize = IntroSize;

$(function(){
	$(".intro_box").hide()
	// var IntroBox = $(".intro_box").height();
	var windowHeight = $(window).height();
	if($("#intro").hasClass("open")){
		$(".intro_box").show()
		$("body").addClass("intro_open")
	}

	// 인트로화면에서 메인화면으로 이동
	var IntroClose = function(){
		sessionStorage.setItem("selMainSwiperPos", 1);
		activeVideoArea(1);//2021-07-29 개발팀 요청에 의한 추가

		var chkLength = 0;
		$(".chkHashtag").each(function(){
			if($(this).is(":checked")){
				$(this).addClass("active");
				chkLength++;
			}
		});
		$(".intro_box").addClass("close").css({
			overflow:"hidden",
			transform:"translateY(-"+(windowHeight)+"px)"
		});
		$("#wrap").css({transform:"translateY(-"+((windowHeight))+"px)"}).addClass("intro_close");
		setTimeout(function(){
			$(".intro_box").css({transform:""}).hide();
			$("#wrap").removeClass("intro_close").css({transform:""})
			$("body").removeClass("intro_open")
			$("#intro").removeClass("open")
		}, 500)
		
		// 메인팝업
		commOpenLayer("Y", "N");

		$(".searchfield").removeClass("adsearch_open");
		$("#header .advanced_search").removeClass("adsearch_open").slideUp(200);
		$(".adsearch_dim").fadeOut()
		$("body").css({
			overflow:"",
			position:"",
			top:""
		});
		// $(window).scrollTop(offsetY); 2021-09-13 제거
		
		//S -- GA 트래킹
        var pageviewObj = new Object(); 
        var gaSiteNtnlCd = "KR";   // KR, CN, EN
        var gaSiteChlCd = "PC";     // PC, MO, AP
        
        pageviewObj.event = "intro_to_main";
        pageviewObj.ep_visit_channelOption = gaSiteChlCd;   // PC, MO, AP
        pageviewObj.ep_visit_siteOption = gaSiteNtnlCd;     // KR, CN, EN
        pageviewObj.ep_page_noParameterUrl = window.location.origin + window.location.pathname;
        pageviewObj.ep_page_fullUrl = window.location.href;
        
        pageviewObj.ep_page_2depth ="국문>홈";
        pageviewObj.ep_page_3depth ="국문>홈";
        
        if(isLogin){ pageviewObj.ep_visit_loginState = "Y";
        } else{ pageviewObj.ep_visit_loginState = "N"; }
        
        if(ptnrChlYN == "Y"){
            pageviewObj.ep_page_campaignCode = ptnrChlCd;
            pageviewObj.ep_page_campaignCodeName = ptnrChlNM;
        }
        
        pageviewObj.title ="국문>홈";
        dataLayer.push(convertElement(pageviewObj));
        
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-56VKRZT');
        
        GA_Screen(pageviewObj);
        //E -- GA 트래킹
	}

	//메인 이동 버튼 클릭 시
	$(".btn_gohome").click(function(){
		var  chkHashLength = $("input[name='chkHashtag']:checked").length;
		var firstFlag = 0;
		$(".hyundaiStyleHashtag , .choiceHashtag").hide();		//해시태그 영역 전체 숨김
		$(".tip_balloon").fadeIn(3000).fadeOut(3000);
		if(chkHashLength < 1){
			introStyle = "H";
			$(".hyundaiStyleHashtag").show();							//현대스타일 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch hdstyle");
			if($("#introType").val() == 'S'){
				$(".mainstyle_switch").hide();
			}else{
				if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
					$(".mainstyle_switch").hide();
				}else{
					$(".mainstyle_switch").show();
				}
			}
			// 2021-07-15 현대스타일로 보기 첫번째 해시태그 노출처리
			$(".hyundaiStyleHashtag > section").removeClass("open");
			$(".hyundaiStyleHashtag > section").first().find(".tab-action").hide();
			$(".hyundaiStyleHashtag > section > .tab-action").first().parent().addClass("open");
			$(".hyundaiStyleHashtag > section > .tab-action").first().show();
			IntroClose();
		}else{
			introStyle = "S";
			$(".choiceHashtag > .choiceGroup").hide();
			$(".mainstyle_switch").show();
			$(".choiceHashtag").show();									//선택 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch tagstyle");
			if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
				$(".mainstyle_switch").hide();
			}else{
				$(".mainstyle_switch").show();
			}
			$("input[name='chkHashtag']").each(function(){
				var chkHashtagSeq = $(this).data("seq");
				if($(this).is(":checked")){
			        $("#choiceHashTag"+chkHashtagSeq).show();
					if(firstFlag === 0){
						$("#choiceHashTag"+chkHashtagSeq).addClass("open");
						$("#choiceHashTag"+chkHashtagSeq + " > .tab-action").show();
					}
					firstFlag++;
			    }else{
			    	$("#choiceHashTag"+chkHashtagSeq).hide();
			    }

			});
			if(firstFlag <1){
				commToastMsg("해시태그를 선택해주세요");
			}else{
				IntroClose();
			}
		}
	});

	//현대스타일 , 선택해시태그 버튼 클릭 시
	$(".select_type a").click(function(){
		$(".hyundaiStyleHashtag , .choiceHashtag").hide();		//해시태그 영역 전체 숨김
		var firstFlag = 0;
		if($(this).hasClass("hStyleBtn")){
			introStyle = "H";
			$(".hyundaiStyleHashtag").show();							//현대스타일 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch hdstyle");
			if($("#introType").val() == 'S'){
				$(".mainstyle_switch").hide();
			}else{
				if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
					$(".mainstyle_switch").hide();
				}else{
					$(".mainstyle_switch").show();
				}
			}
			// 2021-07-15 현대스타일로 보기 첫번째 해시태그 노출처리
			$(".hyundaiStyleHashtag > section").removeClass("open");
			$(".hyundaiStyleHashtag > section").first().find(".tab-action").hide();
			$(".hyundaiStyleHashtag > section > .tab-action").first().parent().addClass("open");
			$(".hyundaiStyleHashtag > section > .tab-action").first().show();
			IntroClose();
		}else{
			introStyle = "S";
			$(".choiceHashtag > .choiceGroup").hide();
			$(".mainstyle_switch").show();
			$(".choiceHashtag").show();									//선택 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch tagstyle");
			if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
				$(".mainstyle_switch").hide();
			}else{
				$(".mainstyle_switch").show();
			}

			$("input[name='chkHashtag']").each(function(){
				var chkHashtagSeq = $(this).data("seq");
				if($(this).is(":checked")){
			        $("#choiceHashTag"+chkHashtagSeq).show();
					if(firstFlag === 0){
						$("#choiceHashTag"+chkHashtagSeq).addClass("open");
						$("#choiceHashTag"+chkHashtagSeq + " > .tab-action").show();
					}
					firstFlag++;
			    }else{
			    	$("#choiceHashTag"+chkHashtagSeq).hide();
			    }

			});
			if(firstFlag <1){
				commToastMsg("해시태그를 선택해주세요");
			}else{
				IntroClose();
			}
		}
	});
	// $("body,html").animate({scrollTop:2},0);

	// 메인화면에서 인트로화면으로 이동
	var IntroOpen = function(){

		$(".main_popup").each(function(){
			var seq = $(this).data("seq");
			$("#main_bottom_pop"+seq).hide();
		});

		sessionStorage.setItem("selMainSwiperPos", 0);
		activeVideoArea(0);//2021-07-29 개발팀 요청에 의한 추가

		$(".hyundaiStyleHashtag , .choiceHashtag").hide();		//해시태그 영역 전체 숨김
		$("body").addClass("intro_open");
		$("#wrap").css({
			position:"relative",
			top:-(windowHeight)+"px"
		})
		$(".intro_box").removeClass("close").css({
			overflow:"",
			top:-(windowHeight)+"px"
		}).animate({
			top:0,
			//scrollTop:0 //스크롤 후, 인트로 이동 이슈로 인한 삭제
		},500).show()

		$(".intro_box").show()
		$("#intro").addClass("open")
		setTimeout(function(){
			$("#wrap").css({
				position:"",
				top:""
			})
		}, 510)
	}
	$(".btn_gointro").click(IntroOpen)

	/* S: 2021-10-06 추가 : 접근성 관련 기능 */
	$('.btn_gointro').keydown(function(){
		if(event.keyCode == '13'){
			$('.btn_gohome a').focus();
		}
	});
	/* E: 2021-10-06 추가 : 접근성 관련 기능 */

	// 스크롤 이벤트
	$(".intro_box").scroll(function(){
		console.log('test')
		var windowHeight = $(window).height();
		var scrollTop = $(this).scrollTop();
		var conHeight = $(".intro_box > article").outerHeight(true)
		$(".btn_gohome").css({"bottom":((conHeight-windowHeight)-scrollTop) - 20+"px"});
		if(scrollTop>((conHeight-windowHeight)-1)){
			$(".hyundaiStyleHashtag , .choiceHashtag").hide();		//해시태그 영역 전체 숨김
			var firstFlag = 0;
			var  chkHashLength = $("input[name='chkHashtag']:checked").length;
			if(chkHashLength < 1){
				introStyle = "H";
				$(".hyundaiStyleHashtag").show();							//현대스타일 해시태그 노출
				$("#toggle_switch_btn").attr("class", "toggle_switch hdstyle");
				if($("#introType").val() == 'S'){
					$(".mainstyle_switch").hide();
				}else{
					if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
						$(".mainstyle_switch").hide();
					}else{
						$(".mainstyle_switch").show();
					}
				}
				// 2021-07-15 현대스타일로 보기 첫번째 해시태그 노출처리
				$(".hyundaiStyleHashtag > section").removeClass("open");
				$(".hyundaiStyleHashtag > section").first().find(".tab-action").hide();
				$(".hyundaiStyleHashtag > section > .tab-action").first().parent().addClass("open");
				$(".hyundaiStyleHashtag > section > .tab-action").first().show();
				IntroClose();

			}else{
				introStyle = "S";
				$(".choiceHashtag > .choiceGroup").hide();
				$(".mainstyle_switch").show();
				$(".choiceHashtag").show();									//선택 해시태그 노출
				$("#toggle_switch_btn").attr("class", "toggle_switch tagstyle");
				if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
					$(".mainstyle_switch").hide();
				}else{
					$(".mainstyle_switch").show();
				}
				$("input[name='chkHashtag']").each(function(){
					var chkHashtagSeq = $(this).data("seq");
					if($(this).is(":checked")){
				        $("#choiceHashTag"+chkHashtagSeq).show();
						if(firstFlag === 0){
							$("#choiceHashTag"+chkHashtagSeq).addClass("open");
							$("#choiceHashTag"+chkHashtagSeq + " > .tab-action").show();
						}
						firstFlag++;
				    }else{
				    	$("#choiceHashTag"+chkHashtagSeq).hide();
				    }

				});
				if(firstFlag <1){
					commToastMsg("해시태그를 선택해주세요");
				}else{
					IntroClose();
				}
			}

		}
	});

	// 랜딩없는 로고 클릭 시 메인으로 이동
    $(".logoSwiper").click(function(e) {
		var  chkHashLength = $("input[name='chkHashtag']:checked").length;
		var firstFlag = 0;
		$(".hyundaiStyleHashtag , .choiceHashtag").hide();		//해시태그 영역 전체 숨김
		if(chkHashLength < 1){
			introStyle = "H";
			$(".hyundaiStyleHashtag").show();							//현대스타일 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch hdstyle");
			if($("#introType").val() == 'S'){
				$(".mainstyle_switch").hide();
			}else{
				if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
					$(".mainstyle_switch").hide();
				}else{
					$(".mainstyle_switch").show();
				}
			}
			// 2021-07-15 현대스타일로 보기 첫번째 해시태그 노출처리
			$(".hyundaiStyleHashtag > section").removeClass("open");
			$(".hyundaiStyleHashtag > section").first().find(".tab-action").hide();
			$(".hyundaiStyleHashtag > section > .tab-action").first().parent().addClass("open");
			$(".hyundaiStyleHashtag > section > .tab-action").first().show();
			IntroClose();
		}else{
			introStyle = "S";
			$(".choiceHashtag > .choiceGroup").hide();
			$(".mainstyle_switch").show();
			$(".choiceHashtag").show();									//선택 해시태그 노출
			$("#toggle_switch_btn").attr("class", "toggle_switch tagstyle");
			if($("#lgcpBuyMbshGrpCd").val() == "MG" || $("#lgcpBuyMbshGrpCd").val() == "SG"){
				$(".mainstyle_switch").hide();
			}else{
				$(".mainstyle_switch").show();
			}
			$("input[name='chkHashtag']").each(function(){
				var chkHashtagSeq = $(this).data("seq");
				if($(this).is(":checked")){
			        $("#choiceHashTag"+chkHashtagSeq).show();
					if(firstFlag === 0){
						$("#choiceHashTag"+chkHashtagSeq).addClass("open");
						$("#choiceHashTag"+chkHashtagSeq + " > .tab-action").show();
					}
					firstFlag++;
			    }else{
			    	$("#choiceHashTag"+chkHashtagSeq).hide();
			    }

			});
			if(firstFlag <1){
				commToastMsg("해시태그를 선택해주세요");
			}else{
				IntroClose();
			}
		}
    });
});

// intro 01 배너 슬라이더
$(function(){
	var bannerSwiperSetCon = {
		slidesPerView: 1,
		autoplayDisableOnInteraction: false,
		slideClass: 'visual_item',
		spaceBetween: 0,
		loop:true,
		speed: 500, //20200416 modify(add)
		pagination: {
			el: '.visual_pagination',
			type: 'custom',
			renderCustom: function (bannerSwiper, current, total) {
				var customPaginationHtml = "";
				for(var i = 0; i < total; i++) {
					//Determine which pager should be activated at this time
					if(i == (current - 1)) {
						customPaginationHtml += '<span class="visual-pagination-customs visual-pagination-customs-active"></span>';
					}else{
						customPaginationHtml += '<span class="visual-pagination-customs"></span>';
					}
				}
				if(total < 10){
					total = "0" + total
				}
				if(current < 10){
					current = "0" + current
				}
				var fraction =  current + '<span class="space"></span>' + total;
				return  fraction;
			}
		},
		setWrapperSize: true,
		lazyLoadingInPrevNext: true,
		lazyLoading: true,
		onLazyImageReady: function (s) {
			if (!s.params.autoplay) {
				s.params.autoplay = 4000; //20200416 modify(3000)
				s.startAutoplay();
			}
		},
		navigation: { // 2021-08-30 인트로 배너 컨트롤 추가
			nextEl: '.visual_bottom .swiper-next',
			prevEl: '.visual_bottom .swiper-prev',
		},
	};	
	/* S: 2021-10-21 수정 : 인트로 이벤트 배너 2개이상 일 경우만 슬라이드 */
	if($('.visual_item').length > 1){
		var bannerSwiper = new Swiper('.banner_visual', bannerSwiperSetCon);
		$('.visual_bottom').css('display','flex');
	}
	/* E: 2021-10-21 수정 : 인트로 이벤트 배너 2개이상 일 경우만 슬라이드 */
})
// intro 01 검색영역
$(function(){
	$(".introsearch").on("focus", function(){
		$(".words_box").addClass("on")
	})
	$(".words_box .close").on("click", function(){
		$(".words_box").removeClass("on")
	})
});

// MAIN

// 메인레이어팝업
// 21.05.07 메인레이어팝업 개발에서 직접 호출 dialog 주석처리 요청 - 담당개발자
$( function() {
	// $(".main_popup").dialog({
	// 	dialogClass: "layer_newtype",
	// 	width:560,
	// 	border:0
	// }).parent(".ui-dialog").css({"z-index":"80"});
	// $(".popup_close").click(function(){
	// 	$(".main_popup").dialog("close");
	// })


	var mainpopupswiper = new Swiper('.popswiper-container', {
		slidesPerView: "auto",
		observer:true,
		observeParents:true,
		pagination:{
			el: '.swiper-pagination',
			type: 'custom',
			renderCustom: function (mainpopupswiper, current, total) {
				var customPaginationHtml = "";
				for(var i = 0; i < total; i++) {
				if(i == (current - 1)) {
					customPaginationHtml += '<span class="visual-pagination-customs visual-pagination-customs-active"></span>';
				}else{
					customPaginationHtml += '<span class="visual-pagination-customs"></span>';
				}
				}
				if(total < 10){
				total = "0" + total
				}
				if(current < 10){
				current = "0" + current
				}
				var fraction =  current + '<span class="space">/</span>'  + '<span class="num_total">'+total+'</span>';
				return  fraction;
			},
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
	})
})
// keyvisual 전체보기
$(function(){
	$(".popevent_box").dialog({
		dialogClass: "main_newtype",
		width:'100%',
		left:'auto',
		autoOpen: false
	});
	var bodyfixed = function(){
		offsetY = window.pageYOffset;
		$("body").css({
			position:"fixed",
			width:"100%",
			height:"100%",
			top: -offsetY + "px",
		})
	}
	var bodyfixedclear = function(){
		$("body").css({
			position: "",
			width: "",
			height: "",
			top:""
		})
		$(window).scrollTop(offsetY);
	}
	$(".swiper-more").click(bodyfixed).click(function(){
		$(".popevent_box").dialog("open");
		/* S: 2021-07-26 추가 : video preload 추가 */
		$('.popevent_box video').each(function(){
			// if($(this).attr('auto_chk') == 'false'){
			// 	auto_chk = false
			// } else {
			// 	auto_chk = true
			// }
			$(this).attr({
				preload:'',
				autoplay:false // 2021-08-18 오토플레이 제거
			});
		});
		/* E: 2021-07-26 추가 : video preload 추가 */
	})
	$(".popevent_close, .ui-widget-overlay").click(bodyfixedclear).click(function(){
		$(".popevent_box .p_box > div").scrollTop(0);//2021-08-18 팝업 닫고 팝업 스크롤 상단으로 이동
		$(".popevent_box").dialog("close");		
	});
})

// 메인 키 비쥬얼
// class="keyvisual"
$(function(){
	console.log('aaa'+$(".keyvisual-swiper .swiper-slide").length > 1);
	if(!$('.keyvisual').hasClass('no_image')){
		var MainSwiperSlide = 2;
		var MainSwiper = new Swiper('.keyvisual .keyvisual-swiper',{
			slidesPerView: 2,
			spaceBetween: 24,
			centeredSlides: $(".keyvisual-swiper .swiper-slide").length < 2,
			loop:$(".keyvisual-swiper .swiper-slide").length >= MainSwiperSlide,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination:{
				el: '.keyvisual .swiper-pagination',
				type: 'custom',
				renderCustom: function (keyvisualswiper, current, total) {
					var customPaginationHtml = "";
					for(var i = 0; i < total; i++) {
						if(i == (current - 1)) {
							customPaginationHtml += '<span class="keyvisual-pagination-customs visual-pagination-customs-active"></span>';
						}else{
							customPaginationHtml += '<span class="visual-pagination-customs"></span>';
						}
					}
					if(total < 10){
						total = "0" + total
					}
					if(current < 10){
						current = "0" + current
					}
					var fraction =  '<span class="num_current">'+current+'</span>' + '<span class="dash">/</span>'  + '<span class="num_total">'+total+'</span>';
					return  fraction;
				},
			},
			navigation: {
				nextEl: '.keyvisual .swiper-next',
				prevEl: '.keyvisual .swiper-prev',
			},
			/* S : GA4 추가 */
			threshold: 30,
			on: {
				sliderFirstMove: function(){
					GA_Event("click_PC_국문_메인", "메인배너", "메인배너", "스와이프");
				},
			},
			/* E : GA4 추가 */
		})
		var swiperPlay = $(".keyvisual .swiper-play");
		var swiperPause = $(".keyvisual .swiper-pause");
		$(swiperPlay).hide()
		$(swiperPause).click(function(){
			MainSwiper.autoplay.stop();
			$(swiperPause).hide()
			$(swiperPlay).show()
		});
		$(swiperPlay).click(function(){
			MainSwiper.autoplay.start();
			$(swiperPause).show()
			$(swiperPlay).hide()
		});

		// 2021-06-23 추가 : keyvisual 마우스 오버 시 자동 슬라이드 중지
		$('.swiper-wrapper').bind({
			mouseenter:function(){
				if(swiperPause.is(':visible')){
					MainSwiper.autoplay.stop();
				}
			}, mouseleave:function(){
				if(swiperPause.is(':visible')){
					MainSwiper.autoplay.start();
				}
			}
		});
	}
});

// 메인 브랜드 배너 스페셜 이미지
// class="brandbanner"
$(function(){
	var swiperindex = $(".brandbanner-swiper .swiper-slide").length
	if(swiperindex > 6){
		var BrandBannerswiper = new Swiper('.brandbanner-swiper', {
			slidesPerView: 'auto',
			loop:true,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			navigation: {
				nextEl: '.brandbanner .swiper-next',
				prevEl: '.brandbanner .swiper-prev',
			},
			/* S: 2021-09-23 추가 : lazy*/
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 6
			},
			/* E: 2021-09-23 추가 : lazy*/
		});
	}
	else{
		$(".brandbanner .swiper-next").hide();
		$(".brandbanner .swiper-prev").hide();
	}
	
	//2022-05-23 6개 이하일때 가운데 정렬 추가
	if(swiperindex <= 5){
		$(".brandbanner-swiper .swiper-wrapper").css("justify-content","center");
	}
});

// 럭키딜
// class="luckybanner"
$(function(){
	var swiperindex = $(".luckybanner-swiper .swiper-slide").length
	if(swiperindex > 4){
		var LuckyBannerswiper = new Swiper('.luckybanner-swiper', {
			slidesPerView: 'auto',
			loop:true,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			navigation: {
				nextEl: '.luckybanner .swiper-next',
				prevEl: '.luckybanner .swiper-prev',
			},
			/* S: 2021-09-23 추가 : lazy*/
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 4
			},
			/* E: 2021-09-23 추가 : lazy*/
		});
	}
	else{
		$(".luckybanner .swiper-next").hide()
		$(".luckybanner .swiper-prev").hide()
	}
});

// 타임세일 swiper
// class="timesale"
$(function(){
	var swiperindex = $(".timesale-swiper .swiper-slide").length;
	if(swiperindex > 2){
		var LuckyBannerswiper = new Swiper('.timesale-swiper', {
			slidesPerView: 'auto',
			slidesPerGroup: 1,
			observer:true,
			observeParents:true,
			spaceBetween: 20, // 2021-06-28 추가
			autoplay: {
			 	delay: 5000,
			 	disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.timesale .swiper-next',
				prevEl: '.timesale .swiper-prev',
			},
			/* S: 2021-09-23 추가 : lazy*/
			lazy: {
				loadPrevNext: true,
			},
			/* E: 2021-09-23 추가 : lazy*/
		});
	}
	else{
		$(".timesale-swiper .swiper-slide").css({margin:"0 auto"})
		$(".timesale .swiper-next").hide()
		$(".timesale .swiper-prev").hide()
	}
});


// 해시태그 펼침 메뉴
// class="hashtag"
$(function(){
	$(".hashtag .tab-action").hide()
	$(".hashtag.open .tab-action").show()
	$(".hashtag .title .btn").on("click", function(){
		if($(this).parents(".hashtag").hasClass("open")){
			$(this).parents(".hashtag").removeClass("open");
			$(this).parent().siblings().slideUp(300)
		}else{
			$(this).parents(".hashtag").addClass("open");
			$(this).parent().siblings().slideDown(300)
		}
	});


	$(".toggle_switch a.hdstyle").on("click", function(){
		$(".toggle_switch").removeClass("tagstyle").addClass("hdstyle")
	});
	$(".toggle_switch a.tagstyle").on("click", function(){
		$(".toggle_switch").removeClass("hdstyle").addClass("tagstyle")
	});
})

$(function(){
	$(".product_module").each(function(){
		// if($(".product_itme", this).length < 5) {
		// 	$(this).siblings(".more").hide()
		// }
		$(this).siblings(".more").click(function(){
			$(this).siblings(".product_module").css({height:"auto", overflow:""})
		})
	})
});

$(function(){
	if($(".timesale-swiper .default").length) {
		$(".timesale-swiper .default").parent().prepend("<p class='timedim'></p>")
	}
})


$(function(){
	$(".intro_box").append("<div class='introdim'></div>")
})
$(function(){
	var IntroSearchAdsearchOpen = function(){
		$(".introsearcharea .advanced_search").addClass("adsearch_open").show();
		$(".introsearcharea").addClass("open")
		$(".intro_box").css({overflow:"hidden"})
		$(".introdim").fadeIn();
		if($('.banner_area').length > 0){
			$('.banner_area').css({opacity:0.4});
		}
	}
	var IntroSearchAdsearchClose = function(){
		$(".introsearcharea .advanced_search").removeClass("adsearch_open").hide();
		$(".introsearcharea").removeClass("open")
		$(".intro_box").css({overflow:""})
		$(".introdim").fadeOut()
		$(".introsearcharea .input input").val("")
		$(".introsearcharea").removeClass("taginput");
		if($('.banner_area').length > 0){
			$('.banner_area').css({opacity:1});
		}
	}
	$(".introsearcharea .input input").click(IntroSearchAdsearchOpen)
	$(".introsearch_close, .introdim").click(IntroSearchAdsearchClose)
})


$(document).on("click", ".introsearcharea .select button", function(){
	if($(".introsearcharea").hasClass("taginput")){
		$(".introsearcharea").removeClass("taginput");
		$(".introsearcharea .tooltip").text("해시태그로 검색하세요 :)")
	}else{
		$(".introsearcharea").addClass("taginput");
		$(".introsearcharea .tooltip").text("일반단어로 검색하세요 :)")
	}
})


$(document).on("click", ".hashtag .more", function(){
	// product_module
})

// main bg swiper 20230724 수정
function mainBgSwiper() {
    const _opt = {target: '.main-visual-swiper', gap: 24, pagination: '.swiper-pagination', paginationType: 'fraction', autoplay: 5000, viewNum: 2};
    const _visual = document.querySelector('.main-visual-swiper');
    if (_visual.querySelectorAll('.swiper-slide').length > 3) {
        _opt.loop = 'loop';
    }
    const pageNum = _visual.querySelectorAll('.swiper-slide').length > 3 ? 1 : 2;
    const mainVisual = setSwiper(_opt);
    const _playBtn = _visual.querySelector('.btn-swiper-play button');
    _playBtn.addEventListener('click', (e) => {
        if (!_playBtn.classList.contains('is-play')) {
            _playBtn.classList.add('is-play');
            _playBtn.innerHTML = '자동 슬라이드 시작'
            mainVisual.autoplay.stop();
        } else {
            _playBtn.classList.remove('is-play');
            _playBtn.innerHTML = '자동 슬라이드 중지'
            mainVisual.autoplay.start();
        }
    });
    // progress bar
    setProgressBar({base: '.box-visual', bar: '.swiper-progress', pageNum});
    
    const imgLightFunc = (img) => {
        const _val = 180; // 숫자값을 높이면 더 밝은 이미지에서 color black 
        img && imgLightCheck(img, (bright) => {
            img.closest('.visual__item').setAttribute('data-bright', bright);
            bright > _val && img.closest('.visual__item').classList.add('type-color-black');
        });
    }
    const transitionFunc = (el) => {
        const _total = el.slides.length;
        const _firstImg = [el.slides[el.realIndex].querySelector('img'), el.slides[(el.realIndex + 1) % _total].querySelector('img')];
        _firstImg.forEach(img => img && imgLightFunc(img));
        el.on('transitionEnd', function() {
        	setProgressBar({base: '.box-visual', bar: '.swiper-progress', idx: this.realIndex, pageNum});
        });
        el.on('transitionStart', function() {
            const _swiper = [el.slides[el.realIndex].querySelector('img'), el.slides[(el.realIndex + 1) % _total].querySelector('img')];
            _swiper.forEach(img => img && imgLightFunc(img));
        });
    }
    transitionFunc(mainVisual);
}
//progress bar 20230724 수정
function setProgressBar({base, bar, idx, pageNum}) {
    const _pageNum = pageNum ? pageNum : 1;
    const _swiper = typeof base === 'string' ? document.querySelectorAll(`${base} .swiper-slide`) : base.querySelectorAll('.swiper-slide');
    const _total = _swiper.length - (_pageNum - 1);
    const _progress = typeof base === 'string' ? document.querySelector(`${base} ${bar}`) : base.querySelector(bar);
    const _wid = _progress.clientWidth / _total;
    const _bar = _progress.querySelector('.scrollbar__unit') ? _progress.querySelector('.scrollbar__unit') : document.createElement('div');
    const init = () => {
        _bar.className = 'scrollbar__unit';
        _progress.classList.add('set-bar');
        _bar.style.width = `${_wid}px`;
        _progress.append(_bar);
    }
    const setBarWid = (idx) => {
        _bar.style.width = `${_wid * (idx + 1)}px`;
    }
    !_progress.classList.contains('set-bar') && init();
    _progress.classList.contains('set-bar') && setBarWid(idx);
}
// 메인 카테고리 swiper
function swiperMainCategory() {
    const _wrap = document.querySelector('.inner-main-category');
    const swiperExecute = () => {
        const categorySwiper = setSwiper({target: '.inner-main-category', gap: 20, viewNum: 'auto', navigation: true});
        categorySwiper.on('reachEnd', () => {
            _wrap.classList.contains('is-beginning') && _wrap.classList.remove('is-beginning');
            !_wrap.classList.contains('is-ended') && _wrap.classList.add('is-ended');
        })
        categorySwiper.on('reachBeginning', () => {
            _wrap.classList.contains('is-ended') && _wrap.classList.remove('is-ended');
            !_wrap.classList.contains('is-beginning') && _wrap.classList.add('is-beginning');
        });
    }
    const init = () => {
        const _lis = _wrap.querySelectorAll('.list-main-category li');
        const _total = Array.prototype.reduce.call(_lis, (acc, li) => {
            return acc += li.clientWidth;
        }, 0);
        if (_wrap.clientWidth < _total) {
            _wrap.classList.remove('is-center');
            swiperExecute();
        }
    }
    init();
}
// main top category
function setMainCategory(el) {
    const _base = document.querySelector(el);
    const _items = _base.children;
    const _itemWid = _base.clientWidth;
    const func = () => {
        if (_items.length > 4 && document.body.clientWidth < _itemWid) {
            const _gap = document.body.clientWidth * 0.08 > 30 ? 30 : document.body.clientWidth * 0.08;
            _base.style.gap = `${_gap}px`;
            _base.classList.add('type-added');
        } else if (document.body.clientWidth > _itemWid) {
            _base.removeAttribute('style');
            _base.classList.remove('type-added');
        }
    }
    func();
    window.addEventListener('resize', func);
}
// h.share 그래프
function setShareGraph(el) {
    const setGraph = ({target, is}) => {
        const _total = parseInt(target.querySelector('.co-buying__max').innerHTML);
        const _cur = parseInt(target.querySelector('.co-buying__current').innerHTML);
        const _graph = target.querySelector('.co-buying__bar');
        if (_graph.classList.contains('is-active')) {
            return;
        }
        if (is) {
        	const _wid = _cur / _total * 100;
            _graph.style.width = `${_wid > 100 ? 100 : _wid}%`;
            _graph.classList.add('is-active');
        }

    }
    setOpserve({target: el, func: setGraph})
}
//h.share 더보기 버튼 처리 20230710 수정
function setShareMore(el) {
    const _base = document.querySelector(el);
    const _items = _base.querySelectorAll('.swiper-slide');
    const _wrap = _base.querySelector('.swiper-wrapper');
    const _num = _items.length;
    const _more = _base.querySelector('.product-more-link');
    _more && _more.remove();
    return;
    if (_num > 4) {
        _more && _more.remove();
    } else {
        _more && _wrap.append(_more);
    }
}
// visual 전체보기 버튼 클릭
function collectVisual(btn) {
    const _btn = btn;
    _btn.addEventListener('click', () => {
        openBnnrLayer();
    });
}
// 인트로, 메인, 로그인에 따라 height 설정 및 이동
function setEnv(pos) {
    const _wrap = document.querySelector('.area-main-slides');
    const _hgt = document.documentElement.clientHeight;
    const _slide = _wrap.querySelector('.wrap-main-slide');
    const _introWrap = _wrap.querySelector('.intro_wrap');
    const _mainSection = document.querySelector('.main-section');
    
    if (pos === 1) {
        // document.querySelector('html').removeAttribute('style');
        document.querySelector('body').removeAttribute('style');
        _wrap.removeAttribute('style');
        _slide.style.height = 'auto';
        _wrap.classList.add('is-active');
        _mainSection.style.position = 'relative';
    } else {
        // document.querySelector('html').style.overflow = 'auto';
        document.querySelector('body').style.position = 'absolute';
        document.querySelector('body').style.top = '0';
        document.querySelector('body').style.width = '100%';
        document.querySelector('body').style.zIndex = 0;
        document.querySelector('body').style.backfaceVisibility = 'hidden';
        document.querySelector('body').style.height = `${_hgt}px`;
        document.querySelector('body').style.display = 'block;';
        _wrap.style.height = `${_hgt}px`;
        _wrap.classList.remove('is-active');
        _slide.style.height = `${_hgt}px`;
        _introWrap.style.height = `${_hgt}px`;
    }
}
// main content
function mainSet() {
    // main visual swiper
    document.querySelector('.main-visual-swiper') && mainBgSwiper();
    // main 오늘의 특가 swiper
    // document.querySelector('.special-price .tab-content') && setObserverFunc('.special-price', tabSwiper('.special-price'));
    // main top category
    document.querySelector('.list-category-link') && setMainCategory('.list-category-link');
    // main the front row
    document.querySelector('.swiper__front-row') && swiperProgress({target: '.swiper__front-row', opt: {target: '.swiper__front-row', viewNum: 2, gap: 24, pagination: '.swiper-pagination', navigation: true}, pageNum: 2});
    // main h share
    // document.querySelector('.swiper__h-share') && setSwiperAutoplay({target: '.swiper__h-share', gap: 24, viewNum: 4, navigation: true, autoplay: 5000});
    // main banner
    document.querySelector('.swiper__main-banner') && setSwiper({target: '.swiper__main-banner', pagination: '.swiper-pagination', navigation:  true});
    // 고객님을 위한 쇼핑혜택 20230714 수정
    document.querySelector('.customer-benefit .tab-content') && Array.prototype.forEach.call(document.querySelectorAll('.customer-benefit .tab-content'), target => {
        if (target.querySelectorAll('.swiper-slide').length > 3) {
            swiperProgress({target, opt: {target, viewNum: 'auto', gap: 24, navigation: true}, pageNum: 3})
        } else {
            target.querySelector('.customer-benefit__inner') && target.querySelector('.customer-benefit__inner').classList.add('is-center');
        }
    });
    // h.share 그래프
    // document.querySelector('.product__co-buying') && setShareGraph('.product__co-buying');
    // h.share 더보기 버튼 처리
    // document.querySelector('.swiper__h-share') && setShareMore('.swiper__h-share');
    // visual 전체보기
    document.querySelector('.area-visual .box-pagination .btn-view button') && collectVisual(document.querySelector('.area-visual .box-pagination .btn-view button'));
    // main category
    document.querySelector('.inner-main-category') && swiperMainCategory();
}
// 오늘의 특가 자동 롤링, 탭 연결
function tabSwiper(wrap) {
    const _wrap = document.querySelector(wrap);
    const _tabBtns = _wrap.querySelectorAll('.tab--list button');
    const _swipers = [];
    const breakPoint = {
        600: {
            slidesPerView: 4,
        },
    };
    const tabSwiperConnect = (target) => {
        return setSwiper({target, viewNum: 4, gap: 24, breakPoint, autoplay: 5000, navigation: true});
    }
    const searchSwiper = (id) => {
        _swipers.forEach(el => {
            el.el.getAttribute('aria-labelledby') !== id && el.autoplay.stop();
            el.el.getAttribute('aria-labelledby') === id && el.autoplay.start();
        });
    }
    const init = () => {
        Array.prototype.forEach.call(document.querySelectorAll(`${wrap} .tab-content`), (target, idx) => {
            const _swiper = tabSwiperConnect(target);
            idx !== 0 && _swiper.autoplay.stop();
            idx === 0 && _swiper.autoplay.start();
            _swipers.push(_swiper);
        });
        Array.prototype.forEach.call(_tabBtns, (btn, idx) => {
            btn.addEventListener('click', () => {
                searchSwiper(btn.getAttribute('aria-controls'))
            })
        });
        document.querySelector('.product__item--brand .product__img--logo') && Array.prototype.forEach.call(document.querySelectorAll('.product__item--brand .product__img--logo img'), el => {
            const _val = 25;
            el && imgLightCheck(el, (bright) => {
                el.closest('.product__img').setAttribute('data-bright', bright);
                bright < _val && el.closest('.product__img').classList.add('type-color-black');
            });
        });
    }
    init();
}
// swiper progress bar
function swiperProgress({target, opt, pageNum}) {
    const _swiper = setSwiper(opt);
    setProgressBar({base: target, bar: '.swiper-progress', pageNum});
    _swiper.on('transitionEnd', function() {
        setProgressBar({base: target, bar: '.swiper-progress', idx: this.realIndex, pageNum});
    });
}
//자동 롤링 observer 연결 20230710 수정
function setSwiperAutoplay(opt) {
    const _childNum = document.querySelectorAll(`${opt.target} .swiper-slide`).length;
    if (_childNum < 4) {
        document.querySelector(opt.target).classList.add('type-normal');
        return;
    }
    const _swiper = setSwiper(opt);
    const {target} = opt;
    _swiper.autoplay.stop();
    const playSwiper = () => _swiper.autoplay.start();
    setOpserve({target, func: playSwiper, end: true});
}
// observer 연결
function setObserverFunc(target, func) {
    setOpserve({target, func, end: true});
}
// 로드
window.addEventListener('DOMContentLoaded', () => {
    mainSet();
})
