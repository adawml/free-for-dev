// html엘리먼트 ie7,8인식;
document.createElement('header');
document.createElement('nav');
document.createElement('article');
document.createElement('section');
document.createElement('aside');
document.createElement('footer');

// ie css-hack
var ua = navigator.userAgent,
 doc = document.documentElement;
if ((ua.match(/MSIE 10.0/i))) {
   doc.className = doc.className + " ie10";
} else if((ua.match(/MSIE 9.0/i))) {
   doc.className = doc.className + " ie9";
} else if((ua.match(/MSIE 8.0/i))) {
   doc.className = doc.className + " ie8";
} else if((ua.match(/MSIE 7.0/i))) {
   doc.className = doc.className + " ie7";
} else if((ua.match(/rv:11.0/i))){
   doc.className = doc.className + " ie11";
}
$(document).ready(function(){
   //select

   $( ".sel_type" ).selectmenu();

   // gnb
   // $(function(){
   // 	var $snb       = $('nav > ul > li'),
   // 		$snbLevel2 = $('nav > ul > li .snb_level2'),
   // 		$menu      = $('nav .stiky_no');

   // 	$snb.on('mouseenter mouseleave', function (e) {
   // 		var $this      = $(this),
   // 			$snbLevel2 = $this.find('.snb_level2'),
   // 			$children  = $this.children();
   // 		if (e.type === 'mouseenter') {
   // 			$snbLevel2.addClass('ative');
   // 			$children.addClass('on');
   // 		} else {
   // 			$snbLevel2.removeClass('ative');
   // 			$children.removeClass('on');
   // 		}
   // 	});

   // 	$menu.find('a').first().on('keydown', function (e) {
   // 		if (e.keyCode == 9 && e.shiftKey) {
   // 			setTimeout(function () {
   // 				$snb.children().removeClass('on');
   // 				$snbLevel2.removeClass('ative');
   // 			}, 1);
   // 		}
   // 	});
   // 	$menu.find('a').last().on('keydown', function (e) {
   // 		if (e.keyCode == 9 && !e.shiftKey) {
   // 			setTimeout(function () {
   // 				$snb.children().removeClass('on');
   // 				$snbLevel2.removeClass('ative');
   // 			}, 1);
   // 		}
   // 	});
   // 	$snb.find('> a').on('focus',function(){
   // 		var $this = $(this);
   // 		$snb.children().removeClass('on');
   // 		$snbLevel2.removeClass('ative');
   // 		$this.parent().find('.snb_level2').addClass('ative');
   // 		$this.addClass('on');
   // 	});

   // 	// 2020-09 메인개선 : 언어 선택
   // 	$('.language_sel').on('click', function () {
   // 		$(this).css('height', '68px');
   // 		$(this).addClass('on');
   // 	});
   // 	$('.language_sel').on('mouseleave', function () {
   // 		$(this).css('height', '34px');
   // 		$(this).removeClass('on');
   // 	});

   // 	//2020-09 메인개선 : 카테고리 메인
   // 	$('#main .ctgr_wrap').css('display', 'block');

   // });

   $(".sub_depth > ul > li:nth-child(2)").addClass('nav02');
   $(".sub_depth > ul > li:nth-child(3)").addClass('nav03');
   $(".sub_depth > ul > li:nth-child(4)").addClass('nav04');
   // $(".sub_depth > ul > li:nth-child(5)").addClass('nav05');// 2020-09 메인개선 nth 변경
   $(".sub_depth > ul > li:nth-child(5)").addClass('cl');// 2020-09 메인개선 nth 변경
   $(".sub_depth > ul > li:nth-child(n+5)").addClass('bm');// 2020-09 메인개선 nth 변경

   // brand open // 2020-12-28 메인개선 수정
   $(".nav_wrap .brand > a, .brand_open .brand_close button").click(function(){
	   //$(".btn_brd").toggleClass('active');
	   $(".brand_open").slideToggle("fast");
	   $('.top_sh_keyword').css('display', 'none');// 2020-09 메인개선
	   if ($(".btn_brd").hasClass('active')) {
		   $(".btn_brd").removeClass('active');
	   } else {
		   $(".btn_brd").addClass('active');
	   }
   });
   // 2020-09 메인개선
   $('.brand_open').on('mouseleave', function () {
	   $(this).slideUp();
	   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
   });

   // brand tab
   $('.brand_tab a').click(function () {
	   $('.brand_tab a.active').removeClass('active')
	   $(this).addClass('active')
	   $('.brand_list_wrap').hide()
	   var contentid = $(this).parent().index()+1;
	   $('.brand_list_wrap.brand0' + contentid).show();
   });
   /*$('.brand_tab .b_open01').click(function () {
	   $('.brand_tab .b_open02').removeClass('active');
	   $('.brand_tab .b_open01').addClass('active');
	   $('.brand_list_wrap.brand02').hide();
	   $('.brand_list_wrap.brand01').show()
   });
   $('.brand_tab .b_open02').click(function () {
	   $('.brand_tab .b_open01').removeClass('active');
	   $('.brand_tab .b_open02').addClass('active');
	   $('.brand_list_wrap.brand01').hide();
	   $('.brand_list_wrap.brand02').show()
   });

   $('.brand_tab a').click(function () {
	   $('.brand_tab .active').removeClass('active')
	   $(this).addClass('active')
	   $('.brand_list_wrap').hide()
	   var contentid = $(this).attr('title')
	   $('#' + contentid).show()
   });
   */

   // 2020-09 메인개선 : search open
   // gnb stiky search
   $('.stiky_sh .sh_open').click(function () {
	   $(this).parents('.top_sh').next('.sh_box').find('.top_sh_keyword').css('display', 'block');
	   $(this).parents('.top_sh').next('.sh_box').css('display', 'block');
	   $('.brand_open').slideUp();
	   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
   });
   $('.stiky_sh .sh_close').click(function () {
	   $(this).parents('.sh_box').css('display', 'none');
   });
   // gnb search
   $('.sh_open').click(function () {
	   $(this).parents('.top_sh').find('.top_sh_keyword').css('display', 'block');
	   $('.brand_open').slideUp();
	   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
   });
   $('.sh_close').click(function () {
	   $(this).parents('.top_sh_keyword').css('display', 'none');
   });
   $('.top_sh_keyword').on('mouseleave', function () {
	   $('.top_sh_keyword').css('display', 'none');
   });

   // wing banner
   if (jQuery('.nav_wrap').offset()) { // make sure "#sticky" element exists
	   var stickyTop = jQuery('.nav_wrap').offset().top; // returns number

	   // 스크롤 시 카테고리
	   var $cate        = $('.btn_ctgr'),
		   $cateOpen    = $('.ctgr_wrap'),
		   $cateNavOpen = $('.ctgr_wrap > li:first > a');

	   $cate.on('mouseenter mouseleave', function (e) {//2020-09 메인개선
		   if (e.type === 'mouseenter') {
			   $cateOpen.addClass('active');
			   $cateOpen.show();
			   if ($('section').hasClass("main_container")) {
				   if ($('.nav_wrap').hasClass("nav_stiky")) {
					   $cateNavOpen.addClass('on');
					   $('.snb_level2').addClass('ative');
					   $('.top_sh_keyword').css('display', 'none');
					   $('.brand_open').slideUp();
					   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
				   } else {
					   $cateNavOpen.addClass('');
					   $('.top_sh_keyword').css('display', 'none');
					   $('.brand_open').slideUp();
					   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
				   }
			   } else {
				   $cateNavOpen.addClass('on');
				   $('.snb_level2').addClass('ative');
				   $('.top_sh_keyword').css('display', 'none');
				   $('.brand_open').slideUp();
				   $(".btn_brd").removeClass('active');// 2020-12-28 메인개선 수정
			   }
		   } else {
			   $cateOpen.removeClass('active');
			   $cateNavOpen.removeClass('on');
			   $('.snb_level2').removeClass('ative');
		   }
	   });
	   $cateOpen.on('mouseenter mouseleave', function (e) {
		   if (e.type === 'mouseenter') {
			   $cateOpen.addClass('active');
			   if ($('section').hasClass("main_container")) {
				   if ($('.nav_wrap').hasClass("nav_stiky")) {
					   $cateNavOpen.addClass('on');
					   $('.snb_level2').addClass('ative');
				   } else {
					   $cateNavOpen.addClass('');
				   }
			   } else {
				   $cateNavOpen.addClass('on');
				   $('.snb_level2').addClass('ative');
			   }
		   } else {
			   $cateOpen.removeClass('active');
			   $cateNavOpen.removeClass('on');
			   $('.snb_level2').removeClass('ative');
		   }
	   });

	   jQuery(window).scroll(function(){ // scroll event
		   var windowTop = jQuery(window).scrollTop();
		   if (stickyTop < windowTop){
			   jQuery('.right_wing').addClass('nav_sticky');//2020-09 메인개선
			   jQuery('.nav_wrap').addClass('nav_stiky');
			   $('.right_wing .rnav_top').css('display', 'block');
			   $('.ctgr_wrap').css('display', 'none'); //2020-09 메인개선
			   $('.main_container').addClass('active'); //2020-09 메인개선 : 20201204 메인 개선에 따른 서브페이지 수정
		   } else {
			   jQuery('.right_wing').removeClass('nav_sticky');//2020-09 메인개선
			   jQuery('.nav_wrap').removeClass('nav_stiky');
			   $('.right_wing .rnav_top').css('display', 'none');
			   $('#main .ctgr_wrap').css('display', 'block'); //2020-09 메인개선
			   $('.main_container').removeClass('active'); //2020-09 메인개선 : 20201204 메인 개선에 따른 서브페이지 수정
		   }
	   });
   }

   // left wing banner
   $(".wing_open, .wing_close").on("click" , function(){
	   $(".wing_bn_open").stop(true).animate({
		   width:"toggle"
	   },350);
	   return false;
   });

   // right wing banner : 2020-09 메인개선
   // right wing - effect & motion
   var	$rWing = $('.right_wing'),
	   $rWingNav = $('.right_wing_nav li'),
	   $rArea = $('.right_area'),
	   $rCont = $('.right_area .right_container'),
	   $rTopBtn = $('.right_wing .rnav_top');
	   // $rWingClose = $('.right_wing .right_wing_close')

   $('.header_wrap, .main_container, .container, .footer_wrap, .right_wing_close').on('click', function() {
	   $rWing.animate({right:'20px'},280);
	   $rTopBtn.animate({right:'20px'},280);
	   $rArea.animate({right:'-250px'},280);
	   $rWingNav.removeClass('active');
   });

   $rWingNav.on({
	   mouseenter: function() {
		   $(this).addClass("on");
	   },
	   mouseleave: function() {
		   $(this).removeClass("on");
	   }
   })

   $rWingNav.on('click', function() {
	   $rWing.animate({right:'270px'},280);
	   $rTopBtn.animate({right:'270px'},280);
	   $rArea.animate({right:'0'},280);
	   // if ($(this).is('.active')) {
	   // 	$rWingBtn.trigger('click');
	   // 	$(this).removeClass('active');
	   // 	return;
	   // }
	   $(this).addClass('active').siblings('li').removeClass('active');
	   $rCont.hide();
	   var contentid = $(this).children('a').attr('href');
	   $(contentid).show();
   });

   $rTopBtn.on('click', function() {
	   $('html, body').animate({scrollTop : 0},300);
   });

   /* 2020-09 메인개선 : right wing - topbanner 있을 경우 위치 삭제 */
   // right wing - topbanner 있을 경우 위치
   // var topBnBox = $('body').has('.top_banner_area').find('.right_area').addClass('top2');
   // if (jQuery('.top_banner_area').offset()) { // make sure "#sticky" element exists
   // 	var stickyRTop = jQuery('.top_banner_area').offset().top; // returns number

   // 	jQuery(window).scroll(function(){ // scroll event
   // 		var windowRTop = jQuery(window).scrollTop();
   // 		if (stickyRTop < windowRTop){
   // 			jQuery('.right_area').removeClass('top2');
   // 		} else {
   // 			jQuery('.right_area').addClass('top2');
   // 		}
   // 	});
   // }

   // time sale
   /* var slidertime =   $('.time_sale_slider').bxSlider({
	   controls:true, autoControls:false, pager:false, auto:false, infiniteLoop:false, hideControlOnEnd: true,
   }); */

   /* family site */
   $(function(){
	   var $family =  $('.family_site > a');
	   var $family2 =  $('.family_site');
	   /*
	   var $family3 =  $('.family_site_list > ul > li:last-child > a');
	   var $family4 =  $('.fm li:last-child > a');
	   */
	   $family.on('click',function(){
		   $(this).toggleClass('close');
		   $(this).parent().find('.family_site_list').slideToggle('fast');
	   });
	   $family2.on('mouseleave',function(){
		   $(this).children().removeClass('close');
		   $(this).find('.family_site_list').slideUp('fast');
	   });
	   /*
	   $family3.on('blur',function(){
		   $('.family_site > family_site_list').slideUp('fast');
		   $('.family_site > a').removeClass('close');
	   });
	   $family4.on('focus',function(){
		   $('.family_site > family_site_list').slideUp('fast');
		   $('.family_site > a').removeClass('close');
	   });
	   */
   });

   /* Breadcrumb */
   $(function(){
	   var $breadcrumb1 =  $('.depth_box > a');
	   var $breadcrumb2 =  $('.depth_box');
	   $breadcrumb1.on('click',function(){
		   $(this).toggleClass('active');
		   $(this).parent().find('ul').slideToggle('fast');
	   });
	   $breadcrumb2.on('mouseleave',function(){
		   $(this).children().removeClass('active');
		   $(this).find('ul').slideUp('fast');
	   });
   });

   /* 공유 */
   $(function(){
	   var $shareBox =  $('.share_box');
	   var $shareBox2 =  $('.share_box .share_list');
	   $shareBox.on('mouseover',function(){
		   $(this).addClass('active');
	   });
	   $shareBox2.on('mouseover',function(){
		   $(this).parent().addClass('active');
	   });
	   $shareBox.on('mouseleave',function(){
		   $(this).removeClass('active');
	   });
	   $shareBox2.on('mouseleave',function(){
		   $(this).parent().removeClass('active');
	   });
   });

   /* 통합검색 */
   $(function(){
	   var $shBar =  $('.autocomplate_list .link .btn_go');
	   $shBar.on('mouseover',function(){
		   $(this).parent().addClass('active');
	   });
	   $shBar.on('mouseleave',function(){
		   $(this).parent().removeClass('active');
	   });
   });

   // radio, checkbox 테두리 삭제
   $("input[type=radio], input[type=checkbox]").click(function(){$(this).blur();});

   // ui dialog 자동 포커스 제거
   $.ui.dialog.prototype._focusTabbable = function() {
	   // this.uiDialog.focus();
	   // this.uiDialogTitlebarClose.focus();
   };

   // table radio 정렬
   $('table td').has('.ui-selectmenu-button').addClass('radio_sel');

   // table re open
   $(".tr_open .detail_open").click(function(){
	   if($(this).parent().parent().next().is(":hidden")){
		   $(".tr_open .detail_open").parent().parent().next().hide();
		   $(this).parent().parent().next().show();
		   $('.tr_open .detail_open_box').removeClass("active");
		   $(this).parent().parent().addClass("active")
	   }else if($(this).parent().parent().next().is(":visible")){
		   $(this).parent().parent().next().hide();
		   $(this).parent().parent().removeClass("active");
	   }
   });

   /* faq */
   $(".faq dt").click(function(){
	   if($(this).next().is(":hidden")){
		   $(".faq dt").next().slideUp();
		   $(".faq dt").removeClass("active");
		   $(this).next().slideDown();
		   $(this).addClass("active");
	   }else if($(this).next().is(":visible")){
		   $(this).next().slideUp();
		   $(this).removeClass("active");
	   }
   });

   /* accordion */
   var $accordionList =  $('.accordion_list dt a');
   $accordionList.click(function(){
	   if($(this).parent().next().is(":hidden")){
		   $accordionList.parent().next().slideUp();
		   $accordionList.parent().removeClass("active");
		   $(this).parent().next().slideDown();
		   $(this).parent().addClass("active");
	   }else if($(this).parent().next().is(":visible")){
		   $(this).parent().next().slideUp();
		   $(this).parent().removeClass("active");
	   }
   });

   // input file
   /*
   $('.fake_file').click(function(){
	   $(".real_file").click();
   });
   */
   $('.real_file').change(function() {
	   $('.file_name span').text($('.real_file')[0].files[0].name);
	   $('.file_name .del').css('display', 'inline-block');
   });
   // input file2
   $('.fake_file2').click(function(){
	   $(".real_file2").click();
   });
   $('.real_file2').change(function() {
	   $('.file_name span').text($('.real_file2')[0].files[0].name);
	   $('.file_name .del').css('display', 'inline-block');
   });

   // 사은품
   $(".freebies_box ul li:nth-child(2n+1)").addClass('cl');

   // texearea
   /*
   $(function(){
	   var $textAreaW =  $('.textarea_wrap textarea');
	   $textAreaW.on('blur',function(){
		   $(this).parent().removeClass('active');
	   });
	   $textAreaW.on('focus',function(){
		   $(this).parent().addClass('active');
	   });
   });
   */

   // member input
   $(function(){
	   var $inputAreaW =  $('.join_row > input[type="text"], .join_row > input[type="password"]');
	   var $inputAreaW2 =  $('.join_col > input[type="text"], .join_col > input[type="password"]');
	   var $inputAreaW3 =  $('.blocks2 .join_col > input[type="text"], .blocks2 .join_col > input[type="password"]');
	   var $inputAreaW4 =  $('.join_col > .join_cols input[type="text"], .join_col > .join_cols input[type="password"]');
	   var $inputAreaW5 =  $('.join_row.placeholder_wrap');
	   $inputAreaW.on('blur',function(){
		   $(this).parent().removeClass('active');
	   });
	   $inputAreaW.on('focus',function(){
		   $(this).parent().addClass('active');
	   });
	   $inputAreaW2.on('blur',function(){
		   $(this).parent().removeClass('active');
	   });
	   $inputAreaW2.on('focus',function(){
		   $(this).parent().addClass('active');
	   });
	   $inputAreaW3.on('blur',function(){
		   $(this).parent().parent().removeClass('active');
	   });
	   $inputAreaW3.on('focus',function(){
		   $(this).parent().parent().addClass('active');
	   });
	   $inputAreaW4.on('blur',function(){
		   $(this).parent().parent().removeClass('active');
	   });
	   $inputAreaW4.on('focus',function(){
		   $(this).parent().parent().addClass('active');
	   });
	   $('.blocks2').has('input[type="text"]:disabled').addClass('dis');
	   $('.pop_wrap .blocks').has('input[type="text"]:disabled').addClass('dis');
	   $inputAreaW5.has('input[type="text"]:disabled').addClass('dis');
   });

   // placeholder
   var $placeholderWrap =  $('.placeholder_wrap input[type="text"], .placeholder_wrap input[type="password"]');
   $placeholderWrap.change(function() {
	   if ($(this).val().length == 0){
		   $(this).parent().find('label').css("display", "block");
	   }
   }).keydown(function() {
	   $(this).parent().find('label').css("display", "none");
   }).blur(function() {
	   if ($(this).val().length == 0) {
		   $(this).parent().find('label').css("display", "block");
	   } else {
		   $(this).parent().find('label').css("display", "none");
	   }
   });

   //datepicker
   $( function() {
	   $( ".datepicker" ).datepicker({
		 showOn: "button",
		 buttonImage: "https://cdn.hddfs.com/front/images/KO/common/ic_calendar.png",
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

   //timepicker/
   /*
   $('.timepicker').timepicker({
	   timeFormat: 'h:mm p',
	   interval: 30,
	   minTime: '10',
	   //maxTime: '6:00pm',
	   //defaultTime: '11',
	   //startTime: '10:00',
	   dynamic: false,
	   dropdown: true,
	   scrollbar: true
   });
   */

   //spinner
   var $spinner = $(".spinner"), $spinnerDisabled = $(".spinner:disabled");
   $spinner.spinner({
	   min: 1, step: 1, disabled: false
   });
   $spinnerDisabled.spinner({
	   disabled: true
   });

   // 공통 tab
   $('.tab_type01 a').click(function () {
	   $("img.lazy").trigger("appear");
	   $('.tab_type01 .active').removeClass('active');
	   $(this).addClass('active');
	   $('.tab_view_box').removeClass('block');
	   var contentid = $(this).attr('title');
	   $('#' + contentid).addClass('block');
	   // 상품정보고시
	   var $txtMore = $('.tb_view01 td .txt_more');
	   if ($txtMore.outerHeight() > 23){
		   $('.tb_view01 th .txt_more').css('display', 'inline-block');
		   $txtMore.addClass('h_fix');
		   $('.tb_view01 th .txt_more').click(function(){
			   $(this).toggleClass('active');
			   $txtMore.toggleClass('h_fix');
		   });
	   }
   });

   $('.tab_type02 a').click(function () {
	   $('.tab_type02 .active').removeClass('active');
	   $(this).addClass('active');
	   $('.tab_view_box2').removeClass('block');
	   var contentid = $(this).attr('title');
	   $('#' + contentid).addClass('block');
	   // if ( !$(this).closest('.tab_type02').hasClass('fixed') ) {
	   // 	return false;
	   // }
   });
   $('.tab_type03 a').click(function () {
	   $('.tab_type03 .active').removeClass('active');
	   $(this).addClass('active');
	   $('.tab_view_box3').removeClass('block');
	   var contentid = $(this).attr('title');
	   $('#' + contentid).addClass('block');
	   // if ( !$(this).closest('.tab_type03').hasClass('fixed') ) {
	   // 	return false;
	   // }
   });
   $('.tab_type04 a').click(function () {
	   $('.tab_type04 .active').removeClass('active');
	   $(this).addClass('active');
	   $('.tab_view_box2').removeClass('block');
	   var contentid = $(this).attr('title');
	   $('#' + contentid).addClass('block');
	   // if ( !$(this).closest('.tab_type04').hasClass('fixed') ) {
	   // 	return false;
	   // }
   });

	//2022-06-20 type5 추가
	$('.tab_type05 a').click(function () {
		$('.tab_type05 .active').removeClass('active');
		$(this).addClass('active');
		$('.tab_view_box5').removeClass('block');
		var contentid = $(this).attr('title');
		$('#' + contentid).addClass('block');
	}); 

   // 웨딩 tab
   $('.wedding_tab a').click(function () {
	   $('.wedding_tab .active').removeClass('active');
	   $('.buy_benefit').css('display', 'none');
	   $(this).addClass('active');
	   $('.tab_wedding_view').removeClass('block');
	   var contentid = $(this).attr('title');
	   $('#' + contentid).addClass('block');
   });
   $('.wedding_tab a.benefit_open').click(function () {
	   $('.buy_benefit').css('display', 'block');
	   var $tabSticky2 = $('.tab_sticky'),
		   targetY     = $tabSticky2.offset().top;
	   $(window).on('scroll', function () {
		   var scrollTop = $(this).scrollTop();
		   if (targetY < scrollTop) {
			   $tabSticky2.addClass('fixed');
		   } else {
			   $tabSticky2.removeClass('fixed');
		   }
	   });
	   $tabSticky2.find('li').on('click', 'a', function () {
		   if ($tabSticky2.is('.fixed')) {
			   $('html, body').animate({
				   scrollTop : targetY-110
			   }, 0)
		   }
	   })
	   /*
	   if (jQuery('.tab_sticky').offset()) { // make sure "#sticky" element exists
		   var stickyTop2 = jQuery('.tab_sticky').offset().top; // returns number
		   jQuery(window).scroll(function(){ // scroll event
			   var windowTop2 = jQuery(window).scrollTop()+60;
			   if (stickyTop2 < windowTop2){
				   jQuery('.tab_sticky').addClass('fixed');
			   } else {
				   jQuery('.tab_sticky').removeClass('fixed');
			   }
		   });
	   }
	   */
   });

   // tab stiky
   /*
   if (jQuery('.tab_sticky').offset()) { // make sure "#sticky" element exists
	   var stickyTop2 = jQuery('.tab_sticky').offset().top; // returns number

	   jQuery(window).scroll(function(){ // scroll event
		   var windowTop2 = jQuery(window).scrollTop();
		   if (stickyTop2 < windowTop2){
			   jQuery('.tab_sticky').addClass('fixed');
		   } else {
			   jQuery('.tab_sticky').removeClass('fixed');
		   }
	   });
   }
   */
   // tooltip
   /*
   $('.tooltip_wrap2 > a, .tooltip_wrap2 .ico_com.close').click(function () {
	   $(this).closest('.tooltip_wrap2').toggleClass('opened');
   });
   */
   // 이미지 로딩
   /*
   $(function() {
	   $("img.lazy").lazyload({
		   effect : "fadeIn"
	   });
   });
   */
});
// 이미지 로딩
// window.addEventListener("load", function(event) {
// 	lazyload();
// });

// brand scroll move
$(function() {
   var container 	= $('.abc_list');
   var abcTab 		= $('.abc_tab li>button');
   var abcList 	= container.find('dl');
   abcTab.click(function() {
	   // active, unactive
	   abcTab.filter('.active').removeClass('active');
	   var $this = $(this).addClass('active');
	   // find target
	   var index = abcTab.index(this);
	   var scrollTo = abcList.filter(':eq('+index+')');
	   // scrollTo
	   if(scrollTo.size() > 0) {
		   container.animate({
			   scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() + 2
		   });
	   }
   });

   //리사이징 폰트
   function measureText(pText, pFontSize) {

	   var resizeFont = document.createElement('p');

	   document.body.appendChild(resizeFont);

	   resizeFont.style.fontSize = "" + pFontSize + "px";
	   resizeFont.style.position = "absolute";
	   resizeFont.style.left = -1000;
	   resizeFont.style.top = -1000;

	   resizeFont.innerHTML = pText;

	   var lResult = {
		   width: resizeFont.clientWidth,
		   height: resizeFont.clientHeight
	   };

	   document.body.removeChild(resizeFont);
	   resizeFont = null;

	   return lResult;
   }
   function fitText(el){
	   var text = el.text();
	   var currentFsize = parseFloat(el.css('font-size'));
	   var fsize = currentFsize || 64;
	   var measured = measureText(text, fsize);

	   if (measured.width > el.width()){
		   while(true && fsize >= 6){
			   var m = measureText(text, fsize);
			   if(m.width > el.width()){
				   fsize -= 0.5;
				   el.attr('style','font-size: '+ fsize + 'px !important');
			   }
			   else{
				   break;
			   }
		   }
	   }
   }

   function FitAll(){
	   $('.resize').each(function(index, el){
		   fitText($(el));
	   })
   }
   FitAll();

});













/* S: 2021-09-17 추가 : 바디 클릭 시 [언어선택, 통화선택, 히든메뉴] 닫기 */
$(document).on("click", "body", function(){
	$('.language').removeClass('open');
	$(".language div").slideUp(200);

	$(".currency").removeClass("open");
	$(".currency div").slideUp(200);

	$('.hidden_menu').removeClass('open');
	$(".hidden_menu .item").slideUp(200);
});
/* E: 2021-09-17 추가 : 바디 클릭 시 [언어선택, 통화선택, 히든메뉴] 닫기 */

// HEADER
// hidden menu
$(document).on("click", ".hidden_menu .btn", function(e){
   if($(this).parent(".hidden_menu").hasClass("open")){
	   $(this).parent(".hidden_menu").removeClass("open");
	   $(".hidden_menu .item").slideUp(200)
   }else{
	   $(this).parent(".hidden_menu").addClass("open");
	   $(".hidden_menu .item").slideDown(200)
   }

   e.stopPropagation();

   var hiddenswiper = new Swiper('.hidden_menu .swiper-container', {
	   direction: 'vertical',
	   slidesPerView: 'auto',
	   slidesPerGroup: 1,
	   navigation: {
		   nextEl: '.controller .btn-down',
		   prevEl: '.controller .btn-up'
	   }
   });
   
   $(".language, .currency").removeClass("open");
   $(".language div, .currency div").slideUp(200);
})

$(document).on("click", ".hidden_menu .item", function(e){
	e.stopPropagation();
});
// language
$(document).on("click", ".default_menu .language a", function(e){
   if($(".language").hasClass("open")){
	   $(".language").removeClass("open");
	   $(".language div").slideUp(200);
   }else{
	   $(".language").addClass("open");
	   $(".language div").slideDown(200);
	   $(".currency").removeClass("open");
	   $(".currency div").slideUp(200);
   }

   $(".hidden_menu").removeClass("open");
   $(".hidden_menu .item").slideUp(200);

   e.stopPropagation();
});

/* S : 2022-09-14 수정 : GNB 언어변경 버튼 수정 및 영문추가 */
$(document).on('click', '.language > div > a.ko', function(){
	$('.language').removeClass('cn en').addClass('ko');
	$('.language > a').removeClass('cn en').addClass('ko');
});
$(document).on('click', '.language > div > a.cn', function(){
	$('.language').removeClass('ko en').addClass('cn');
	$('.language > a').removeClass('ko en').addClass('cn');
});
$(document).on('click', '.language > div > a.en', function(){
	$('.language').removeClass('ko cn').addClass('en');
	$('.language > a').removeClass('ko cn').addClass('en');
});
/* E: 2022-09-14 수정 : GNB 언어변경 버튼 수정 및 영문추가 */

// currency
$(document).on("click", ".default_menu .currency a", function(e){
   if($(".currency").hasClass("open")){
	   $(".currency").removeClass("open");
	   $(".currency div").slideUp(200);
   }else{
	   $(".currency").addClass("open");
	   $(".currency div").slideDown(200);
	   $(".language").removeClass("open");
	   $(".language div").slideUp(200);
   }

   $(".hidden_menu").removeClass("open");
   $(".hidden_menu .item").slideUp(200);

   e.stopPropagation();
});
$(document).on("click", ".currency > div > a.krw", function(){
	$(".currency").removeClass("cny").addClass("krw");
    $(".currency > a").removeClass("cny").addClass("krw");
})
$(document).on("click", ".currency > div > a.cny", function(){
	$(".currency").removeClass("krw").addClass("cny");
    $(".currency > a").removeClass("krw").addClass("cny");
})

// CONTAINER
// location
$(document).ready(function(){
   if($(".location").length) {
	   $(".location ul").hide();
	   $(".location strong").click(function() {
		   if(!$(this).is(".expanded")){
			   $(".location ul").slideUp(300);
			   $(".location strong").removeClass("expanded");
			   $(this).nextAll().slideDown(300);
			   $(this).addClass("expanded");
		   }
		   else{
			   $(this).nextAll().slideUp(300);
			   $(this).removeClass("expanded");
		   }
	   });
	   $(".location ul a").bind("click", function(){
		   $(".location ul").slideUp(300);
		   $(".location strong").removeClass("expanded")
	   });
   };
})

// FOOTER
// Family Site
$(document).on("click", "footer .family_site button", function(){
   if($(".family_site").hasClass("open")){
	   $(".family_site").removeClass("open");
	   $(".family_site .list").slideUp(200)
   }else{
	   $(".family_site").addClass("open");
	   $(".family_site .list").slideDown(200)
   }
});

// GNB
// gnb open
$(document).ready(function(){
   $("<p class='gnb_dim'></p>").appendTo("body");
   var $win = $(window),
	   $body = $("body"),
	   $gnb = $(".navication"),
	   $gnbOpen = $(".btn_gnb"),
	   $gnbClose = $(".navication .gnb_close");
	   $dim = $(".gnb_dim"),
	   $pdVisual =	$(".pd_visual")
   //gnb
   $gnbClose.hide();
   $gnbOpen.click(function(){
	   offsetY = window.pageYOffset;
	   $body.css({
		   overflow: "hidden",
		   position: "fixed",
		   top: -offsetY + "px",
		   width:"100%"
	   }).animate({left:"352"},200);
	   $gnb.addClass("open").animate({
		   left:"0"
	   },200);
	   $gnbClose.show();
	   $dim.show().animate({left:"352"},200);
	   $(".searchfield").removeClass("adsearch_open");
	   //$(".searchfield .select_search").removeClass("tag"); //2021-09-29 전체메뉴 펼침 시 해시테그 #이동 제거
	   $(".searchfield input").removeClass("tag");
	   $("#header .advanced_search").removeClass("adsearch_open").slideUp(200);
	   $(".adsearch_dim").fadeOut()
	   $("#header").animate({left:"352"},200);
	   $(".btn_gnb").css({visibility:"hidden"})

	   // 상품확대 보기 열기 추가
	   $pdVisual.removeClass('reset');
	   $pdVisual.animate({ left: "382" }, 200);

   });
   //닫기
   $dim.click(function(){
	   setTimeout(function(){
		   $body.css({
			   overflow:"",
			   position:"",
			   top:""
		   });
		   $gnb.removeClass("open");
		   $win.scrollTop(offsetY);
	   },200);
	   $body.animate({left:"0"},200);
	   $gnb.animate({
		   left:"-352"
	   },200);
	   $gnbClose.hide();
	   $dim.hide()
	   $("#header").animate({left:""},200);
	   $(".btn_gnb").css({visibility:""})
	   // 상품확대 보기 닫기 추가
	   $pdVisual.addClass('reset');
   });

   // gnb accordion
   var lnbUI = {
	   click : function (target, speed) {
	   var _self = this,
		   $target = $(target);
	   _self.speed = speed || 300;

	   $target.each(function(){
		   if(findChildren($(this))) {
		   return;
		   }
		   // $(this).addClass("noDepth");
	   });

	   function findChildren(obj) {
		   return obj.find("> ul").length > 0;
	   }
	   $target.on("click","strong", function(e){
		   e.stopPropagation();
		   var $this = $(this),
			   $depthTarget = $this.next(),
			   $siblings = $this.parent().siblings();
		   $this.parent("li").find("ul li").removeClass("open");
		   $siblings.removeClass("open");
		   $siblings.find("ul").slideUp(250);

		   if($depthTarget.css("display") == "none") {
		   _self.activeOn($this);
		   $depthTarget.slideDown(_self.speed);
		   } else {
		   $depthTarget.slideUp(_self.speed);
		   _self.activeOff($this);
		   }
		   $("#gnb .depth_02 li p").each(function(){
			   // var gnbLuxuryImg = $(this).height();
			   var gnbText = $(this).height();
			   $(this).css({marginTop:-(gnbText/2)+"px"})
		   })
	   })
	   },
	   activeOff : function($target) {
	   $target.parent().removeClass("open");
	   },
	   activeOn : function($target) {
	   $target.parent().addClass("open");
	   }
   };

   // Call lnbUI
   $(function(){
	   lnbUI.click('#gnb li', 300)
   });
});

// header 검색
$(function(){

   $("body").append("<div class='adsearch_dim'></div>")
   var SearchAdsearchOpen = function(){
	   offsetY = window.pageYOffset;
	   $(".searchfield").addClass("adsearch_open");
	   $("#header .advanced_search").addClass("adsearch_open").slideDown(200);
	   $(".adsearch_dim").fadeIn();
	   $("body").css({
		   overflow:"hidden",
		   position:"fixed",
		   top:-offsetY + "px",
		   width:"100%"
	   })
	   // 검색영역 툴팁 자동 사라짐 timer
	   setTimeout(function () {
		   $(".searchfield").removeClass("adsearch_open");
	   }, 3000);
   }
   var SearchAdsearchClose = function(){
	   $(".searchfield").removeClass("adsearch_open");
	   // $(".searchfield .select_search").removeClass("tag");
	   // $(".searchfield input.main_search").removeClass("tag");
	   $("#header .advanced_search").removeClass("adsearch_open").slideUp(200);
	   $(".adsearch_dim").fadeOut()
	   $("body").css({
		   overflow:"",
		   position:"",
		   top:""
	   });
	   $(window).scrollTop(offsetY);
   }
   $(".searchfield .mainsearchinput input").focus(SearchAdsearchOpen)
   $(".advanced_search .search_close, .adsearch_dim").click(SearchAdsearchClose)
   $(".advanced_search .search_close").blur(SearchAdsearchClose);//2021-10-05 추가 : 접근성관련 검색창 닫힘기능

   // 검색영역 툴팁
   $(document).on("click", ".searchfield .select_search button", function(){
	   if($(".searchfield .select_search").hasClass("tag")){
		   $(".searchfield .select_search").removeClass("tag");
		   $(".mainsearchinput").removeClass("tag");
		   $(".searchfield .tooltip").text("해시태그로 검색하세요 :)")
	   }else{
		   $(".searchfield .select_search").addClass("tag");
		   $(".mainsearchinput").addClass("tag");
		   $(".searchfield .tooltip").text("일반단어로 검색하세요 :)")
	   }
   })
})

function sellerInfo(){
   $("#seller_information").dialog("open");
}
$(document).ready(function(){
   // 다이얼로그 초기화
   $("#seller_information").dialog({
	   autoOpen: false,
	   resizable: false,
	   width:400,
	   maxHeight: 340,
	   modal: true
   });
});


$(function(){
   $(".tab-action").tabs();
   $('.tab-action').tabs().removeClass (function (index, className) {
	   //console.log((className.match(/(^|\s)ui-\S+/g) || []).join(' '));
	   return (className.match (/(^|\s)ui-\S+/g) || []).join(' ');
   });
});

$(function(){
   $(".tab-style ul li").click(function(){
	   $(this).siblings().removeClass("ui-tabs-active");
	   $(this).addClass("ui-tabs-active");

   });
});


// 상품 모듈 swiper
// class="product-module-swiper"

$(function(){
   /* S: 2021-06-23 추가 : 슬라이드 최대 갯수에 따른 좌우 버튼 노출 여부
   if($('#container .swiper-wrapper').length > 0){
	   $('#container .swiper-wrapper').each(function(){
		   if($(this).find('.swiper-slide').length <= $(this).parent().attr('data-slide')){
			   $(this).parent().find('.swiper-prev, .swiper-next').hide();
			   $(this).parent().siblings('.swiper-prev, .swiper-next').hide();
		   } else {
			   $(this).parent().find('.swiper-prev, .swiper-next').show();
			   $(this).parent().siblings('.swiper-prev, .swiper-next').show();
		   }
		   console.log($(this).find('.swiper-slide').length+' / '+$(this).parent().attr('data-slide'));
	   });
   }
   E: 2021-06-23 추가 : 슬라이드 최대 갯수에 따른 좌우 버튼 노출 여부 */

   /* 2021-06-24 추가 : 이벤트 리스트페이지 검색어 입력 시 삭제버튼 노출 관련 */
   if($('.search_box').length > 0){
	   $('.search_box').each(function(){
		   if($(this).find('input[type="text"]').length > 0){
			   if($(this).find('input[type="text"]').val().length > 0){
				   $(this).find('.search_txt_del').show();
			   }

			   $(this).find('input[type="text"]').keyup(function(){
				   if($(this).val().length > 0){
					   $(this).closest('.search_box').find('.search_txt_del').show();
				   } else {
					   $(this).closest('.search_box').find('.search_txt_del').hide();
				   }
			   });
		   }

		   $(this).find('.search_txt_del').click(function(){
			   $(this).closest('.search_box').find('input[type="text"]').val('');
			   $(this).hide();
		   });
	   });
   }


   $(".product-module-swiper").each(function(index, element){
	   var $this = $(this);
	   $this.addClass("instance-swipwe-" + index);
	   $this.siblings(".swiper-prev").addClass("instance-prev" + index)
	   $this.siblings(".swiper-next").addClass("instance-next" + index)

	   if($this.closest('article')[0].hasAttribute('id')){
		   if($this.closest('article').attr('id').indexOf('main') > -1){ // 2021-06-28 추가 : $(".product-module-swiper") 노출 갯수 분기(메인=4개 / 나머지 5개)
			   var slidesPerView = 4;
		   } else {
			   var slidesPerView = 5;
		   }
	   } else {
		   var slidesPerView = 5;
	   }

	   if($(this).find('.swiper-slide').length > slidesPerView){
		   var loop = true;
	   } else {
		   var loop = false;
		   $this.parent().find('.swiper-next, .swiper-prev').hide();
	   }

	  var ProductModuleSwiper = new Swiper(".instance-swipwe-" + index, {
			slidesPerView: slidesPerView,
			slidesPerGroup: 1,
			loop:loop,
			observer:true,
			observeParents:true,
			spaceBetween: $this.parent().hasClass('brandshop_slide') ? 0 : 20, // 2021-08-04 브랜드샵 슬라이드 간격 0 추가
			centeredSlides: !$this.parent().hasClass('brandshop_slide') ? false : $(this).find('.swiper-slide').length < slidesPerView ? true : false, // 2021-08-04 브랜드샵 슬라이드 노출 갯수 미만 시 센터정렬
			navigation: {
				nextEl: '.instance-next'+index,
				prevEl: '.instance-prev'+index,
			},
			/* S: 2021-09-23 추가 : lazy*/
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: slidesPerView
			},
			/* E: 2021-09-23 추가 : lazy*/
		});

		/* S: 2021-08-05 추가 : 노출갯수 미만 시 swiper 제거 */
		if($this.parent().hasClass('brandshop_slide')){
			// $(this).find('.swiper-slide').length < slidesPerView & ProductModuleSwiper.distroy();
			if($(this).find('.swiper-slide').length < slidesPerView){
				ProductModuleSwiper.destroy();
				$(this).addClass('no_swipe');
			}
		}
		/* E: 2021-08-05 추가 : 노출갯수 미만 시 swiper 제거 */
   });
})

// 상품모듈 타입 - square 타이틀 세로 정렬
$(function(){
   var BrandTitlePosition = function(){
	   $(".brand_style em").each(function(){
		   var BrandTitle = $(this).height();
		   $(this).css({marginTop:-(BrandTitle/2)+"px"})
	   })
   }
   $(".hashtag .btn").click(BrandTitlePosition);
   $(".hashtag.open").find(BrandTitlePosition);
});
$(function(){
   if($(".square_tooltip").length) {
	   $(".square_tooltip .btn").bind("click", function(){
		   if(!$(this).parent().is(".open")){
			   $(".square_tooltip").removeClass("open");
			   $(this).parent().addClass("open");
		   }
		   else{
			   $(this).parent().removeClass("open");
		   }
	   });
	   $(".square_tooltip .close").bind("click", function(){
		   $(".square_tooltip").removeClass("open");
		   $('body').find('[tabindex="-100"]').focus().removeAttr('tabindex'); //2021-10-06 추가 : 접근성 관련 팝업 포커스
	   });
   }
   if($(".ui-widget-overlay").length){
	   $(".ui-widget-overlay").css({zIndex:100})
   }

   /* S: 2021-10-06 추가 : 접근성 관련 팝업 포커스 */
	$('.square_tooltip a').keydown(function(){
		layer_focus($(this), $(this).siblings('.tooltip').find('.close'));
	});
	/* E: 2021-10-06 추가 : 접근성 관련 팝업 포커스 */
});

$(function(){
   $("#content").parents("#container").removeClass("container")
});

function layer_focus(_target, _focus_target){
	if(event.keyCode == 13){
		_target.attr('tabindex','-100');
		_focus_target.focus();
	}	
}

/* 2021-10-06 추가 : 접근성 관련 [무이자할부/카드사포인트 안내] 팝업 포커스 */
$('.purchase_benefits .con > li a.box').click(function(){
	setTimeout(function(){
		if($('.credit_pop').length > 0){
        	$('.credit_pop').siblings('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close').focus();
		}
    },100);
});

function ScrollStickySize(){
   var windowWidth = $(window).width()
   var ordersheetHeight = $(".order_sheet").outerHeight(true);
   var paymentsheetHeight = $(".payment_sheet").outerHeight(true);
   if(paymentsheetHeight >= ordersheetHeight) {
	   $(".payment_sheet").addClass("top")
   }
   else{
	   $(".payment_sheet").removeClass("top")
   }
   $(".addtocart").css({"min-width":windowWidth+"px"})
};
window.addEventListener("load", ScrollStickySize)
window.addEventListener("resize", ScrollStickySize)

$(document).ready(function(){
   var ordersheetHeight = $(".order_sheet").outerHeight(true);
   var paymentsheetHeight = $(".payment_sheet").outerHeight(true);
   $(".payment_board").on("click", function(){
	   if(paymentsheetHeight >= ordersheetHeight) {
		   $(".payment_sheet").addClass("top")
	   }
	   else{
		   $(".payment_sheet").removeClass("top")
	   }
   })
})


$(function(){
   $(".num_amount input[count_range]").click(function(e){
	   e.preventDefault();
	   var type = $(this).attr("count_range");
	   var $count = $(this).siblings("input.count");
	   var count_val = $count.val(); // min 1
	   if(type=="m"){
		   if(count_val<2){ // 2021-06-22 : 개발요청으로 수정 최소 단위 1
			   return;
		   }
		   $count.val(parseInt(count_val)-1);
	   }else if(type=="p"){
		   $count.val(parseInt(count_val)+1);
	   }
   });
});
// 헤더 좌우스크롤
$(window).scroll(function(){
   $("#header").css({left:0-$(this).scrollLeft()})
})

$(function(){
   $(".terms_item .terms_toggle").click(function(){
	   if($(this).parent().parent(".terms_item li").hasClass("open")){
		   $(this).parent().parent(".terms_item li").removeClass("open")
	   }else{
		   $(this).parent().parent(".terms_item li").addClass("open")
	   }
   });

   $(".bankbook_caution .terms_toggle").click(function(){
	   if($(this).parent(".bankbook_caution").hasClass("open")){
		   $(this).parent(".bankbook_caution").removeClass("open")
	   }else{
		   $(this).parent(".bankbook_caution").addClass("open")
	   }
   });
})


// Time Sale
$(function(){
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

//S: 2022-03-25 h.share swiper 슬라이더 추가 by pub10
//class="hshare"
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
//E: 2022-03-25 h.share swiper 슬라이더 추가 by pub10

$(function(){
   var scrollDiv = document.createElement("div");
   $(scrollDiv).attr("class", "totop").html("<a href='#none'>처음으로 이동</a>").appendTo("#content, #content2, article#main") // 2021-06-25 메인 totop 버튼 추가
   $(".totop").hide()
   $(window).scroll(function(){
	   if ($(this).scrollTop() > 10) {
		   $(".totop").fadeIn();
	   } else {
		   $(".totop").fadeOut();
	   }
   });
   $(".totop").click(function(){
	   $("body,html").animate({scrollTop:0}, 300);
   });
})

$(function() {
   // 2021-06-10 : 장바구니 aside 수정
   var cont_right = $(".cont_right").height();
   var headerHeight = $('#header').height();
   $(".cont_right").css({height:cont_right+"px"})
   $(window).scroll(function() {
	   var WScrollTop = $(window).scrollTop();
	   var val = ($(document).height() - $(window).height() - $("#footer").outerHeight());
	   if(WScrollTop > headerHeight && WScrollTop < val){
		   $(".cont_right").css({ top: (WScrollTop - headerHeight)+"px"})
	   }
	   else if (headerHeight > WScrollTop){
		   $(".cont_right").css({top:""})
	   }
   });

   if($(".addtocart").length > 0){ // 2021-06-25 추가 : 상품관련 하단 레이어 유무에 따른 totop 버튼 위치
	   var addtocartHeight = $(".addtocart").height();
   } else {
	   var addtocartHeight = 142;
   }

   $(window).scroll(function() {
	   var WScrollTop = $(window).scrollTop();
	   var val = ($(document).height() - $(window).height() - $("#footer").outerHeight());
	   //var addtocartHeight = $(".addtocart").height(); // 2021-06-25 제거

	   // 주문결제
	   if(WScrollTop > 110 && WScrollTop < val){
		   $(".payment_sheet").css({top:(WScrollTop-110)+"px", bottom:""})
	   }
	   else if(170 > WScrollTop){
		   $(".payment_sheet").css({top:"", bottom:""})
	   }
	   else {
		   $(".payment_sheet").css({top:"auto", bottom:0})
	   }

	   if(WScrollTop < val){
		   $(".addtocart").removeClass("floor")
	   }
	   else {
		   $(".addtocart").addClass("floor")
	   }

	   if(WScrollTop < val){
		   $(".totop").removeClass("floor").css({bottom:(addtocartHeight+50)+"px"})
	   }
	   else {
		   $(".totop").addClass("floor")
		   $(".totop").css({bottom:((WScrollTop-val)+addtocartHeight+50)+"px"})
	   }

	   /* S: 2021-06-29 수정 : 주문가능시간 버튼 위치 관련 */
	   if(WScrollTop < val){
		   if(WScrollTop < 10){
			   $(".ordertime_btn").css({bottom:(addtocartHeight-100)+"px",  transition:'bottom 0.1s'})
		   } else {
			   // $(".ordertime_btn").css({bottom:(addtocartHeight+50)+"px"})
			   $(".ordertime_btn").css({bottom:(addtocartHeight-20)+"px"})
		   }
	   }
	   else {
		   $(".ordertime_btn").css({bottom:((WScrollTop-val)+120)+"px", transition:'inherit'})
	   }
	   /* E: 2021-06-29 수정 : 주문가능시간 버튼 위치 관련 */
   });
});
$(function(){

   // 카테고리 메뉴(상품 검색)
   var $cateMenu = $('.js-cateMenu > span');
   var $cateMenuDepth = $('.js-cateMenuDepth');

   var $cateMenuDepth = $('.js-cateMenuDepth > .check_depth_list');

   // click Event
   $cateMenu.each(function (index) {
	   $cateMenu.eq(index).find('button').on('click', function () {
		   depthMenus(index);
	   });
   });


   // depth
   function depthMenus(sidx) {
	   $cateMenuDepth.css('display', 'none');
	   $cateMenuDepth.eq(sidx).css('display', 'block');
   };
   // depthRemove
   function depthRemove(){
	   $cateMenuDepth.css('display', 'none');
   }

   //전체 카테고리 선택시 모든 하위 메뉴 제거
   var $totalCate = $('.js-total-cate');

   $totalCate.on('click', function(){
	   depthRemove();
   })


   // 210607 수정 검색 필터(브랜드) : 기본 닫힘삳태(관심브랜드에 따라 상태 달라짐)
   $(document).on("click", ".filter_wrap .btn_th", function(){


	   // 관심 브랜드가 체크 2021-06-29 제거
	   // if ($(this).hasClass("open")) {
	   // 	//console.log('close')
	   // 	$(this).removeClass("open").text("브랜드 +");
	   // 	$('.brand_area').find('.sort_wrap').css({
	   // 		'display': 'block',
	   // 		'height': '150px'
	   // 	});

	   // 	//순서높이(가나다,알파벳순)
	   // 	$('.brand_area').find('.sort_result').css({
	   // 		'height': '78px'
	   // 	});
	   // }
	   // else {


	   // 	$(this).addClass("open").text("브랜드 -");
	   // 	$('.brand_area').find('.sort_wrap').css({
	   // 		'display': 'block',
	   // 		'height': '250px',
	   // 	});

	   // 	//순서높이(가나다,알파벳순)
	   // 	$('.brand_area').find('.sort_result').css({
	   // 		'height': 'auto'
	   // 	});
	   // }

   })

   $('#sortbtn0_01 button').on('click', function(){
	   idx = $(this).parent().index()
	   console.log($(this).parent().index());

   });
   $('#sortbtn0_02 button').on('click', function(){
	   idx = $(this).parent().index()
	   console.log($(this).parent().index());

   });

   $(document).on("click", ".filter_wrap .filter_onoff button", function(){

	   if($(this).parents(".filter_wrap").hasClass("open")){
		   //console.log('닫기');
		   $(this).parents(".filter_wrap").removeClass("open");

	   }else{
		   //console.log('열기');
		   $(this).parents(".filter_wrap").addClass("open");
	   }
   });
})


$(function(){
   // 세트상품선택
//    var Productselecteditemswiper = new Swiper('.selectedproduct .selecteditem_swiper', {
// 	   slidesPerView: 'auto',
// 	   // freeMode: true,
// 	   spaceBetween: 24,
// 	   observer:true,
// 	   observeParents:true,
// 	   // S: 2021-09-16 lazy 추가
// 		lazyLoadingInPrevNext: true,
// 		lazyLoading: true,
// 		lazy: {
// 			loadPrevNext: true,
// 		},
// 		// E: 2021-09-16 lazy 추가
// 	   navigation: {
// 		   prevEl: ".selecteditem-prev",
// 		   nextEl: ".selecteditem-next",
// 	   },
//    });

   // 세트상품선택
   var Productselecteditemswiper = new Swiper('.setproduct .selecteditem_swiper', {
	   slidesPerView: 'auto',
	   // freeMode: true,
	   spaceBetween: 24,
	   observer:true,
	   observeParents:true,
	   navigation: {
		   prevEl: ".selecteditem-prev",
		   nextEl: ".selecteditem-next",
	   },
   });

})

$(function(){
   var $body = $("body"),
	   $win = $(window),
	   $open = $(".buybtn_cart.set"),
	   $close = $(".setproduct_close");
   $open.click(function(){
	   offsetY = window.pageYOffset;
	   $body.css({
		   "overflow":"hidden",
		   "position":"fixed",
		   "top":-offsetY + "px"
	   });
	   $(".setproduct").show().animate({right:0},200)
	   $(".selectedproduct").animate({right:0},200)
	   setTimeout(function(){
		   $("#container").css({zIndex:"100"})
	   },200)
   });

   $close.click(function(){
	   $body.css({
		   "overflow":"",
		   "position":"",
		   "top":""
	   });
	   $(".setproduct").animate({right:"-100%"},200)
	   $(".selectedproduct").animate({right:"-100%"},200)
	   setTimeout(function(){
		   $(".setproduct").hide()
	   }, 200)
	   $("#container").css({zIndex:""})
	   $win.scrollTop(offsetY);
   });
})
// 폰트 사이즈 자동 계산
// $(function(){
// 	if($(".pop_coupon .coupon162").length) {
// 		$(".pop_coupon .coupon162 strong").each(function(){
// 			var couponnumber = $(this).text().replace(/[,.]/g,"").length;
// 			var couponfontsize = $(this).css("fontSize").replace(/[^0-9]/g,'');
// 			if(couponnumber >= 6){
// 				$(this).css({fontSize:(couponfontsize-couponnumber)+"px"})
// 			}
// 		})
// 	}
// 	if($(".pop_coupon .benefit158").length) {
// 		$(".pop_coupon .benefit158 strong").each(function(){
// 			var benefitnumber = $(this).text().replace(/[,.]/g,"").length;
// 			var benefitfontsize = $(this).css("fontSize").replace(/[^0-9]/g,'');
// 			if(benefitnumber >= 6){
// 				$(this).css({fontSize:((benefitfontsize-2)-benefitnumber)+"px"})
// 				$(this).children("em").css({fontSize:(27-benefitnumber)+"px"})
// 			}
// 		})
// 	}
// })


$(function(){
   $(".mymenu ul li").click(function(){
	   $(this).siblings().removeClass("active");
	   $(this).addClass("active");

   });

   //로케이션(화면 줄일때 이슈)
   $(".location").wrap("<div class='location_all'></div>");
});

// 하트(좋아요)
$(function(){
   // var animation1 = bodymovin.loadAnimation({ // 2021-07-02 개발팀 function  수정으로 주석 처리
	// 	container: document.getElementById('heart01_2'),
	// 	path: 'https://cdn.hddfs.com/front/js/KO/heart2.html',/* 퍼블경로 ->  https://cdn.hddfs.com/front/js/M_KO/heart2.html , 개발 https://cdn.hddfs.com/front/html/M_KO/js/M_KO/heart2.html */
	// 	renderer: 'svg', // Required
	// 	loop: false, // Optional
	// 	autoplay: false // Optional,
	// });
	
	// $(".btn_like, .heart-motion.after_login").on("click", function () {
	// 	if($(this).hasClass('login_checked')){ //로그인 확인 후 애니메이션
	// 		//$(this).addClass('on')

	// 		animation1.stop();
	// 		animation1.play();

	// 		if (!$(this).hasClass("on")) {
	// 			$(this).addClass('on');
	// 			$(this).find(".motion_area").css({
	// 				"display": "block"
	// 			});
	// 			$(this).css({
	// 				"opacity": "1"
	// 			});
	// 			animation1.stop();
	// 			animation1.play();
	// 		} //else { 
	// 		//	$(this).removeClass('on');
	// 		// 	$(this).find(".motion_area").css({
	// 		// 		"display": "none"
	// 		// 	});
	// 		// }
	// 	}
	// });

   $(".sns_area_all .sns_event").click(function(){
	   $(this).addClass("on");

   });
})

// select_wrap(상품상세)
$(function () {
   var $selectWrap = $('.select_wrap > .selected');

   $selectWrap.on('click', function(){
	   $(this).parent().toggleClass('open');
   })
})


/* 2021-07-26 추가 : 비디오 다운로드 관련 = 인트로, 메인 키비주얼, 상단 영상 제외한 모든 비디오는 <video preload="none"> 스크롤 시 <video preload=""> : 2021-07-28 개발팀 기능 수정에 따른 기능 제거 */
// $(function(){
// 	if($('video').length > 0){
// 		$('video').each(function(){
// 			if($(this).offset().top < $(window).height()){
// 				if($(this).attr('auto_chk') == 'false'){
// 					auto_chk = false
// 				} else {
// 					auto_chk = true
// 				}
// 				$(this).attr({
// 					preload:'',
// 					autoplay:auto_chk
// 				});
// 			}
// 		});
// 		$(window).scroll(function(){
// 			$('video').each(function(){
// 				if($(this).attr('auto_chk') == 'false'){
// 					auto_chk = false
// 				} else {
// 					auto_chk = true
// 				}
// 				$(this).attr({
// 					preload:'',
// 					autoplay:auto_chk
// 				});
// 			});
// 		});
// 	}
// });

/* S: 2021-09-09 h.story slide 추가 */
$(document).ready(function(){
	if($('.hstyle_slide_con').length>0){
		var slider_hstyle = $('.hstyle_slide_con').bxSlider({

			controls:true,
			autoControls: false,
			auto:false,
			preloadImages:'all',
			pager:false
		});
	}
});
/* E: 2021-09-09 h.story slide 추가 */

/* S: 2021-09-16 image lazy 추가 */
$(document).ready(function(){
	// prd_list_new_lazy();
});
/* E: 2021-09-16 image lazy 추가 */

// S: 2021-09-16 lazy 추가
var prd_list_new_lazy = function () {
	$('.product_list img').lazyload({
		placeholder : 'https://cdn.hddfs.com/front/images/KO/common/noimg.png', // 로딩 이미지
		threshold: 0, // 접근 ~px 이전에 로딩을 시도한다.
		load : function(){ // 로딩시에 이벤트
			$(this).attr('alt',$(this).attr("data-srcset"));
		}
	});
}
// E: 2021-09-16 lazy 추가