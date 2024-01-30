/* Criteo Common JS */
$(document).ready(function(){
	window.criteo_q = window.criteo_q || [];
	let deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
	
	/* 상품 리스트 공통 함수 */
	function goodsList(){
		let prodItem = $('.goosMoreArea li');
		let listItemAll = [];
		let listItemCate = prodItem.attr("data-section");
		
		for(var index = 0; index < 3; index++) {
			xindex = index - 1;
			let listItem = prodItem.eq(index),
				listItemID = listItem.attr("data-gooscd"),

			listItemAdd = listItemID + ',';
			listItemAll += listItemAdd;
		}

		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: listItemCate,
			}
		);
	}

	/* 상품 상세 공통 함수 */
	function goodsDetail(){
		let urlParams = new URLSearchParams(window.location.search),
			spclId = urlParams.get("onlnGoosCd"); //Product ID

		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewItem", item: spclId }
		);
	};

	/* ========== 상품 상세 - 기본, 랑콤, 입생로랑, 헬레나루빈스타인, 아베다 ========== */
	if($("#content.productdetail").length) {
		goodsDetail();
	}

	/* ========== 상품 리스트 - 카테고리, 기본 브랜드샵, 대표 브랜드샵, 템플릿관, 세일, 신상품, 특화관 ========== */
	if($(".goosMoreArea").length) {
		$(document).on("load", ".goosMoreArea", function(){
			goodsList();
		});
	}

	/* ========== 상품 리스트 - 혜택(이벤트) ========== */
	if($(".evntGoosListArea").length) {
		goodsList();
	}

	/* ========== 상품 리스트 - 기획전 ========== */
	if($(".spexGoosListArea").length) {
		$(document).on("load", ".spexGoosListArea", function(){
			goodsList();
		});
	}
	
	/* ========== 검색결과 ========== */
	if($(".searchcontent_wrap").length) {
		$(document).on("load", ".goosMoreArea", function(){
			let product1 = $(".goosMoreArea li").eq(0).attr("data-gooscd");
			let product2 = $(".goosMoreArea li").eq(1).attr("data-gooscd");
			let product3 = $(".goosMoreArea li").eq(2).attr("data-gooscd");
			let cateId = $(".goosMoreArea li").eq(0).attr("data-section");
			let resultText = $(".researchResult").find("span").text();
			window.criteo_q.push(
				{ event: "setAccount", account: 103437},
				{ event: "setSiteType", type: "d"},
				{ event: "viewList",
					item: [ product1, product2, product3 ],
					category: cateId,
					keywords: resultText,
				}
			);
		});
	}
	
	/* ========== 베스트 ========== */
	if($(".best_three").length) {
		let bestProd1 = $(".best_three li").eq(0).attr("data-gooscd");
		let bestProd2 = $(".best_three li").eq(1).attr("data-gooscd");
		let bestProd3 = $(".best_three li").eq(2).attr("data-gooscd");
		let cateId = $(".best_three li").eq(0).attr("data-section");
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ bestProd1, bestProd2, bestProd3 ],
				category: cateId,
			}
		);
	}

	/* ========== 장바구니 ========== */
	if($(".cart_contens").length) {

		let LCItem = $('.item_area');
		let TCItemAll = [];
		
		for(var index = 0; index < LCItem.length; index++) {
			xindex = index - 1;
			let TCItem = LCItem.eq(xindex),
				TCItemID = TCItem.find('.nolabel input').attr("data-onlngooscd"),
				TCItemPrice = TCItem.find('.pay strong').text(),
				TCItemQuantity = TCItem.find('.cart_amount input').eq(1).attr("value");
			if(index+1 == LCItem.length){
				TCItemAdd = '{ id: "'+TCItemID+'", price: '+TCItemPrice+', quantity: '+TCItemQuantity+' }';
			}
			else{
				TCItemAdd = '{ id: "'+TCItemID+'", price: '+TCItemPrice+', quantity: '+TCItemQuantity+' },';
			}
			TCItemAll += TCItemAdd;
		}

		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewBasket", item: [TCItemAll]
		});
	}

	/* ========== 명품관 ========== */
	/* 랑콤 - 상품 리스트 */
	if($(".lancome_plp_products_container").length) {
		$(document).on("load", ".lancome_plp_products_container", function(){
			let prodItem = $('.lancome_plp_product_container');
			let itemNum = prodItem.length;
			let listItemAll = [];
			
			if (itemNum < 3) {
				for(var index = 0; index < itemNum; index++) {
					xindex = index - 1;
					let listItem = prodItem.eq(index).find(".lancome_plp_product_img").attr("href");
					let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
		
					listItemAdd = listItemID + ',';
					listItemAll += listItemAdd;
				}
			} else {
				for(var index = 0; index < 3; index++) {
					xindex = index - 1;
					let listItem = prodItem.eq(index).find(".lancome_plp_product_img").attr("href");
					let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

					listItemAdd = listItemID + ',';
					listItemAll += listItemAdd;
				}
			}
			window.criteo_q.push(
				{ event: "setAccount", account: 103437},
				{ event: "setSiteType", type: "d"},
				{ event: "viewList",
					item: [ listItemAll ],
					category: "명품관_랑콤_006301",
				}
			);
		});
	}

	/* 랑콤 - 상품 상세. 기본 공통 사용 */
	
	/* 에스티로더 - 상품 리스트 */
	if($("#el_wrapper .prodList").length) {
		let prodItem = $('.prodList li .pimg');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_에스티로더_022901",
			}
		);
	}

	/* 에스티로더 - 상품 상세 */
	if($("#el_wrapper .prodView").length) {
		goodsDetail();
	}

	/* 톰포드 - 상품 리스트 */
	if($(".tf_contents .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_톰포드뷰티_027101",
			}
		);
	}

	/* 톰포드 - 상품 상세 */
	if($(".tf_spp .prodView").length) {
		goodsDetail();
	}

	/* 조말론 - 상품 리스트 */
	if($("#jmwrap .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_조 말론 런던_025501",
			}
		);
	}
	
	/* 조말론 - 상품 상세 */
	if($("#jmwrap .jmcontents.spp").length) {
		goodsDetail();
	}

	/* 라메르 - 상품 리스트 */
	if($("#lamerwrap .prodList").length) {
		let prodItem = $('.prodList li .info');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_라 메르_025301",
			}
		);
	}

	/* 라메르 - 상품 상세 */
	if($("#lamerwrap .lm_spp").length) {
		goodsDetail();
	}

	/* 크리니크 - 상품 리스트 */
	if($(".cl_wrap .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_크리니크_025701",
			}
		);
	}

	/* 크리니크 - 상품 상세 */
	if($(".cl_wrap .cl_contents.spp").length) {
		goodsDetail();
	}

	/* 맥 - 상품 리스트 */
	if($("#mac_wrap .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_맥_025401",
			}
		);
	}

	/* 맥 - 상품 상세 */
	if($("#mac_wrap .prod_detail").length) {
		goodsDetail();
	}

	/* 달팡 - 상품 리스트 */
	if($("#darphin_wrap .prodList").length) {
		let prodItem = $('.prodList li .pimg');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_달팡_026901",
			}
		);
	}

	/* 달팡 - 상품 상세 */
	if($("#darphin_wrap .prodView").length) {
		goodsDetail();
	}

	/* 겔랑 - 상품 리스트 */
	if($(".guerlain-wrap .guerlain-pdt-items").length) {
		let prodItem = $('.guerlain-pdt-items .guerlain-item');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".guerlain-thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".guerlain-thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_겔랑_005601",
			}
		);
	}

	/* 겔랑 - 상품 상세 */
	if($(".guerlain-wrap .guerlain-pdt-detail").length) {
		goodsDetail();
	}

	/* 클라랑스 - 상품 리스트 */
	if($(".clarins-wrap .clarins-pdt-items").length) {
		let prodItem = $('.clarins-pdt-items .clarins-item');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".clarins-thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".clarins-thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_클라랑스_005701",
			}
		);
	}

	/* 클라랑스 - 상품 상세 */
	if($(".clarins-wrap .clarins-pdt-view").length) {
		goodsDetail();
	}

	/* 입생로랑 - 상품 리스트 */
	if($("#ysl-wrap .ysl-product-list").length) {
		let prodItem = $('.ysl-product-item .thumb-box');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".thumb").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_입생로랑_007901",
			}
		);
	}

	/* 입생로랑 - 상품 상세. 기본 공통 사용 */

	/* 헬레나 - 상품 리스트 */
	if($("#hr-wrap .list_wrap").length) {
		let prodItem = $('.list_wrap .con_wrap');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".img_box").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find(".img_box").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_헬레나 루빈스타인_007401",
			}
		);
	}

	/* 헬레나 - 상품 상세. 기본 공통 사용 */

	/* 아베다 - 상품 리스트 */
	if($("#avd_wrap .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_아베다_026201",
			}
		);
	}

	/* 아베다 - 상품 상세. 기본 공통 사용 */

	/* 랩시리즈 - 상품 리스트 */
	if($(".elco_wrap .prod_list").length) {
		let prodItem = $('.prod_list li .prod_img');
		let itemNum = prodItem.length;
		let listItemAll = [];
		
		if (itemNum < 3) {
			for(var index = 0; index < itemNum; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);
	
				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		} else {
			for(var index = 0; index < 3; index++) {
				xindex = index - 1;
				let listItem = prodItem.eq(index).find("a").attr("href");
				let listItemID = listItem.split("onlnGoosCd=")[1].slice(1, 14);

				listItemAdd = listItemID + ',';
				listItemAll += listItemAdd;
			}
		}
		window.criteo_q.push(
			{ event: "setAccount", account: 103437},
			{ event: "setSiteType", type: "d"},
			{ event: "viewList",
				item: [ listItemAll ],
				category: "명품관_랩시리즈_026701",
			}
		);
	}

	/* 랩시리즈 - 상품 상세 */
	if($(".elco_wrap .elco_container.spp").length) {
		goodsDetail();
	}

});