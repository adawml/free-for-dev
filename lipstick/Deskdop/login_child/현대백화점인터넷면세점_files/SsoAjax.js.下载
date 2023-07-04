var _domainPath = "";
var _host = "";

/**
 * SSO 함수 호출 전 초기화 처리
 *
 * @date 2017.01.04
 * @author bklee
 * @example gfnSsoInit()
 */
function gfnSsoInit() {

	var getRequestURL = location.href ;
	_host = location.host;
	_domainPath = getRequestURL.substring(0, getRequestURL.indexOf(_host))+_host ;

	// 개발도메인일 경우 IP로 변경
	if(_host.indexOf("localhost") > -1) {
		_host = "10.116.3.40:82";
		_domainPath = "http://10.116.3.40:82";
	} else if(_host.indexOf("dev.hddfs.com") > -1) { // 개발
		_host = "10.100.166.226:9996";
		_domainPath = "http://10.100.166.226:9996";
	} else if(_host.indexOf("www.hddfs.com") > -1) { // 운영
		_host = "www.hddfs.com";
		_domainPath = "https://www.hddfs.com";
	}
}


//토큰 발급 요청 : mcustNo(통합고객번호), ssoAuthCd(권한코드)
function gfnReqSSoToknIssuAjax(mcustNo, ssoAuthCd, callback)
{
	gfnSsoInit();
	$.support.cors = true;

	var httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoToknIssuJSONP.hd"; //개발 - https

	if(_host.indexOf("10.116.3.40") > -1) {
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoToknIssuJSONP.hd"; //개발 - https
	} else if(_host.indexOf("10.100.166.226") > -1) { // 개발
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoToknIssuJSONP.hd"; //개발 - https
	} else if(_host.indexOf("www.hddfs.com") > -1) { // 운영
		httpUrl = "https://sso.h-point.co.kr:29865/co/setSsoToknIssuJSONP.hd"; //운영 - https
	}

	 $.ajax({
			url: httpUrl,
			type: "GET",
			//contenType: "application/json",
			data: {"mcustNo":mcustNo, "ssoAuthCd":ssoAuthCd , "domainPath":_domainPath, "dmnAdr":_host, "callback":callback.name},
			async:true,
			crossDomain:true,
			cache:false,
			dataType: "jsonp",
			jsonp: callback.name,
			xhrFields: {
				withCredentials : true
			},
			success : function (data) {
				//fnTestCallback1(data);
				if(callback && typeof callback == "function"){
					callback(data);
				}
			},
			error : function (data) {
			}
		});
}

//SSO 요청후 sso 인증 성공시 고객번호 리턴
function gfnSsoReqAjax(callback)
{
	gfnSsoInit();
	$.support.cors = true;

	var httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoReqJSONP.hd"; //개발 - https

	// TODO : SP 운영 url 변경 필요
	if(_host.indexOf("10.116.3.40") > -1) {
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoReqJSONP.hd"; //개발 - https
	} else if(_host.indexOf("10.100.166.226") > -1) { // 개발
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setSsoReqJSONP.hd"; //개발 - https
	} else if(_host.indexOf("www.hddfs.com") > -1) { // 운영
		httpUrl = "https://sso.h-point.co.kr:29865/co/setSsoReqJSONP.hd"; //운영 - https
	}

	 $.ajax({
		url: httpUrl,
		type: "POST",
		contenType: "application/json",
		data: {"domainPath":_domainPath, "dmnAdr":_host, "callback":callback.name},
		async:true,
		crossDomain:true,
		cache:false,
		dataType: "jsonp",
		jsonp: callback.name,
		xhrFields: {
			withCredentials : true
		},
		success : function (data) {
			if(callback && typeof callback == "function"){
				callback(data);
			}

		},
		error : function (data) {
		}
	});
}

//SSO 만료처리
function gfnSsoDscdToknReqAjax(callback)
{
	gfnSsoInit();
	$.support.cors = true;

	var httpUrl = "https://ssodev.h-point.co.kr:29865/co/setDscdToknJSONP.hd"; //개발 - https

	if(_host.indexOf("10.116.3.40") > -1) {
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setDscdToknJSONP.hd"; //개발 - https
	} else if(_host.indexOf("10.100.166.226") > -1) { // 개발
		httpUrl = "https://ssodev.h-point.co.kr:29865/co/setDscdToknJSONP.hd"; //개발 - https
	} else if(_host.indexOf("www.hddfs.com") > -1) { // 운영
		httpUrl = "https://sso.h-point.co.kr:29865/co/setDscdToknJSONP.hd"; //운영 - https
	}

	 $.ajax({
		url: httpUrl,
		type: "POST",
		contenType: "application/json",
		data: {"domainPath":_domainPath, "dmnAdr":_host, "callback":callback.name},
		async:true,
		crossDomain:true,
		cache:false,
		dataType: "jsonp",
		jsonp: callback.name,
		xhrFields: {
			withCredentials : true
		},
		success : function (data) {
			if(typeof callback == "function"){
				callback(data);
			}
		},
		error : function (data) {
		}
	});
}