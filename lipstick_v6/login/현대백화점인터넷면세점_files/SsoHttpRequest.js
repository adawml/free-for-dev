function getXMLHttpRequest() {
	if(window.ActiveXObject) {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e) {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e1) {
				return null;
			};
		};
	} else if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		return null;
	};
};

var httpRequest = null;

function sendRequest(url, params, callback, method) {
	var httpMethod = method ? method : 'GET';
	if(httpMethod != 'GET' && httpMethod != 'POST') {
		httpMethod = 'GET';
	}
	var httpParams = (params == null || params == '') ? null : params;
	var httpUrl = url;
	if(httpMethod = 'GET' && httpParams != null) {
		httpUrl = httpUrl + '?' + httpParams;
	}
	httpRequest.open(httpMethod, httpUrl, true);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.withCredential = "true";
	httpRequest.onreadystatechange = callback;
	httpRequest.send(httpMethod == 'POST' ? httpParams : null);
};

//토큰 발급 요청 - xmlHttpRrequest 직접 사용 : mcustNo(통합고객번호), ssoAuthCd(권한코드)
function gfnReqSSoToknIssuHttp(mcustNo, ssoAuthCd, callback)
{
	gfnReqSSoToknIssuAjax(mcustNo, ssoAuthCd, callback);
}

// SSO 인증 처리 - xmlHttpRrequest 직접 사용
function gfnSsoReqHttp(callback){
	gfnSsoReqAjax(callback);
}

//토큰 만료 요청
function gfnSsoDscdToknReq(callback){
	gfnSsoDscdToknReqAjax(callback);
}


// AJAX를 지원할 수 없을 경우 아래 코드를 사용
/*
//토큰 발급 요청 - xmlHttpRrequest 직접 사용 : mcustNo(통합고객번호), ssoAuthCd(권한코드)
function gfnReqSSoToknIssuHttp(mcustNo, ssoAuthCd, callback)
{
	 httpRequest = getXMLHttpRequest();
	var getRequestURL = location.href ;
	var _host = location.host;
	var _domainPath = getRequestURL.substring(0, getRequestURL.indexOf(_host))+_host ;

	var httpMethod = 'POST';
	console.log("_host:"+_host);

	var httpUrl = "https://hmssodev.ehyundai.com:29865/co/setSsoToknIssu.hd"; //개발 - https

	if(_host.indexOf("h-point") > -1) {
		httpUrl = "https://sso.h-point.co.kr:29865/co/setSsoToknIssu.hd"; //운영 - https
	}

	var httpParams =  "mcustNo="+encodeURIComponent(mcustNo) + "&ssoAuthCd=" +encodeURIComponent(ssoAuthCd)+ "&domainPath="+_domainPath + "&dmnAdr="+_host;

	httpRequest.open(httpMethod, httpUrl, true);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.withCredentials = true;
	httpRequest.onreadystatechange = function () {
		console.log("readyState_test:"+httpRequest.readyState);
		if(httpRequest.readyState == 4) {
			if(httpRequest.status == 200) {
				if(callback && typeof callback == "function"){
					var data = JSON.parse(httpRequest.responseText);
					callback(data);
				}
			}
		}

	}
	httpRequest.send(httpParams);

}

//SSO 인증 처리 - xmlHttpRrequest 직접 사용
function gfnSsoReqHttp(callback){
	httpRequest = getXMLHttpRequest();

	var getRequestURL = location.href ;
	var _host = location.host;
	var _domainPath = getRequestURL.substring(0, getRequestURL.indexOf(_host))+_host ;

	var httpMethod = 'POST';
	console.log("_host:"+_host);

	var httpUrl = "https://hmssodev.ehyundai.com:29865/co/setSsoReq.hd"; //개발 - https

	if(_host.indexOf("h-point") > -1) {
		httpUrl = "https://sso.h-point.co.kr:29865/co/setSsoReq.hd"; //운영 - https
	}

	var httpParams =  "domainPath="+_domainPath + "&dmnAdr="+_host;

	httpRequest.open(httpMethod, httpUrl, true);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	httpRequest.withCredentials = true;
	httpRequest.onreadystatechange = function () {
		console.log("readyState111:"+httpRequest.readyState);
		if(httpRequest.readyState == 4) {
			if(httpRequest.status == 200) {
				if(callback && typeof callback == "function"){
					var data = JSON.parse(httpRequest.responseText);
					callback(data);
				}
			}
		}
	}
	httpRequest.send(httpParams);
}

//토큰 만료 요청
function gfnSsoDscdToknReq(callback){
	httpRequest = getXMLHttpRequest();
	var getRequestURL = location.href ;
	var _host = location.host;
	var _domainPath = getRequestURL.substring(0, getRequestURL.indexOf(_host))+_host ;

	var httpMethod = 'POST';
	console.log("_host:"+_host);

	var httpUrl = "https://hmssodev.ehyundai.com:29865/co/setDscdTokn.hd"; //개발 - https

	if(_host.indexOf("h-point") > -1) {
		httpUrl = "https://sso.h-point.co.kr:29865/co/setDscdTokn.hd"; //운영 - https
	}

	var httpParams =  "domainPath="+_domainPath + "&dmnAdr="+_host;

	httpRequest.open(httpMethod, httpUrl, true);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	httpRequest.withCredentials = true;
	httpRequest.onreadystatechange = function () {
		console.log("readyState:"+httpRequest.readyState);
		if(httpRequest.readyState == 4) {
			if(httpRequest.status == 200) {
				if(typeof callback == "function"){
					var data = JSON.parse(httpRequest.responseText);
					callback(data);
				}
			}
		}
	}
	httpRequest.send(httpParams);
}
*/