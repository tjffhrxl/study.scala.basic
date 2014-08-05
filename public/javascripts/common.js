// AddAntiForgeryToken
AddAntiForgeryToken = function (data) {
	data.__RequestVerificationToken = $('#__AjaxAntiForgeryForm input[name=__RequestVerificationToken]').val();
	return data;
};

var INDEX_CSSROOT = 0;
var INDEX_IMAGEROOT = 1;
var INDEX_SCRIPTROOT = 2;

var INDEX_SECURE_CSSROOT = 3;
var INDEX_SECURE_IMAGEROOT = 4;
var INDEX_SECURE_SCRIPTROOT = 5;
var _IsHttps = null;

function CssUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = _ContentUrls[INDEX_CSSROOT];
	if (_IsHttps == true) {
		rootPath = _ContentUrls[INDEX_SECURE_CSSROOT];
	}

	return rootPath.concat(relativePath);
}

function ImageUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = _ContentUrls[INDEX_IMAGEROOT];
	if (_IsHttps == true) {
		rootPath = _ContentUrls[INDEX_SECURE_IMAGEROOT];
	}

	return rootPath.concat(relativePath);
}

function ScriptUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = _ContentUrls[INDEX_SCRIPTROOT];
	if (_IsHttps == true) {
		rootPath = _ContentUrls[INDEX_SECURE_SCRIPTROOT];
	}

	return rootPath.concat(relativePath);
}

function URLDecode(psEncodeString) {
    var lsRegExp = /\+/g;
    return decodeURIComponent(String(psEncodeString).replace(lsRegExp, " "));
}

// commonClose
function ClosePopup() {
	window.opener = null;
    window.open('', '_parent', '');
    window.close();
}

// Helper
function goHelp(str) {
    if (parent.goHelp && typeof parent.goHelp == "function" && window.name != "") {
        parent.goHelp(str);
    } else if (parent.parent.goHelp && typeof parent.parent.goHelp == "function" && window.name != "") {
        parent.parent.goHelp(str);
    } else if (parent.parent.parent.goHelp && typeof parent.parent.parent.goHelp == "function" && window.name != "") {
        parent.parent.parent.goHelp(str);
    } else if (parent.parent.parent.parent.goHelp && typeof parent.parent.parent.parent.goHelp == "function" && window.name != "") {
        parent.parent.parent.parent.goHelp(str);
    } else {
        if (window.name != "") {
            goHelp(str);
        }
    }
}

// resize iframe
function resizeIframe(ifrid) {
    if (ifrid == undefined) { ifrid = "ifm_contents"; }
    var str = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (parent.resizeIframe && typeof parent.resizeIframe == "function" && window.name != "") {
        parent.resizeIframe(ifrid, str);
    } else if (parent.parent.resizeIframe && typeof parent.parent.resizeIframe == "function" && window.name != "") {
        parent.parent.resizeIframe(ifrid, str);
    } else if (parent.parent.parent.resizeIframe && typeof parent.parent.parent.resizeIframe == "function" && window.name != "") {
        parent.parent.parent.resizeIframe(ifrid, str);
    } else if (parent.parent.parent.parent.resizeIframe && typeof parent.parent.parent.parent.resizeIframe == "function" && window.name != "") {
        parent.parent.parent.parent.resizeIframe(ifrid, str);
    } else {
        if (window.name != "") {
            resizeIframe(ifrid,str);
        }else{
            document.getElementById(ifrid).style.height = str + "px";
        }
    }
}

// resize popup
function AutoResizePopup(objname,w,h) {
    if (objname == undefined) {
        objname = "popWrap";  // 기본 팝업레이아웃
    }
    var thisX;
    var thisY;

    if (w == undefined) {
        thisX = document.getElementById(objname).scrollWidth;
    } else {
        thisX = w;
    }

    if (h == undefined) {
        thisY = document.getElementById(objname).scrollHeight;
    } else {
        thisY = h;
    }


    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 50;
    var marginY = 0;
    var marginX = 10;

    //alert(!"임시 브라우저 확인 : " + navigator.userAgent);
    // 브라우저별 높이 조절.
    if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 45;        // IE 6.x
    else if (navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 75;    // IE 7.x
    else if (navigator.userAgent.indexOf("MSIE 8") > 0) marginY = 80;    // IE 8.x
    else if (navigator.userAgent.indexOf("MSIE 9") > 0) marginY = 90;    // IE 9.x
    else if (navigator.userAgent.indexOf("Firefox") > 0) marginY = 80;   // FF
    else if (navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     // Opera
    else if (navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  // Netscape
    else if (navigator.userAgent.indexOf("Chrome") > 0) marginY = 64;    // Chrome
    if (navigator.userAgent.indexOf("Chrome") > 0) marginX = 16;

    window.resizeTo(thisX + marginX, thisY + marginY);
}

// Common AddTab
function addTab(mid, params) {
    if (parent.addTab && typeof parent.addTab == "function" && window.name != "") {
        parent.addTab(mid, params);
    } else if (parent.parent.addTab && typeof parent.parent.addTab == "function" && window.name != "") {
        parent.parent.addTab(mid, params);
    } else if (parent.parent.parent.addTab && typeof parent.parent.parent.addTab == "function" && window.name != "") {
        parent.parent.parent.addTab(mid, params);
    } else if (parent.parent.parent.parent.addTab && typeof parent.parent.parent.parent.addTab == "function" && window.name != "") {
        parent.parent.parent.parent.addTab(mid, params);
    } else {
        if (window.name != "") {
            addTab(mid, params);
        }
    }
}

// Common AddTab with Reload
function addTabReload(mid, params) {
    if (parent.addTabReload && typeof parent.addTabReload == "function" && window.name != "") {
        parent.addTabReload(mid, params);
    } else if (parent.parent.addTabReload && typeof parent.parent.addTabReload == "function" && window.name != "") {
        parent.parent.addTabReload(mid, params);
    } else if (parent.parent.parent.addTabReload && typeof parent.parent.parent.addTabReload == "function" && window.name != "") {
        parent.parent.parent.addTabReload(mid, params);
    } else if (parent.parent.parent.parent.addTabReload && typeof parent.parent.parent.parent.addTabReload == "function" && window.name != "") {
        parent.parent.parent.parent.addTabReload(mid, params);
    } else {
        if (window.name != "") {
            addTabReload(mid, params);
        }
    }
}

// Common Hidden Tab Add
function addHidenTab(mid, params) {
    /* Uncaught SecurityError: 때문에 삭제*/
    if (mid != "TDM343" && parent.addHidenTab && typeof parent.addHidenTab == "function" && window.name != "") {
        parent.addHidenTab(mid, params);
    }  if (parent.parent.addHidenTab && typeof parent.parent.addHidenTab == "function" && window.name != "") {
        parent.parent.addHidenTab(mid, params);
    } else if (parent.parent.parent.addHidenTab && typeof parent.parent.parent.addHidenTab == "function" && window.name != "") {
        parent.parent.parent.addHidenTab(mid, params);
    } else if (parent.parent.parent.parent.addHidenTab && typeof parent.parent.parent.parent.addHidenTab == "function" && window.name != "") {
        parent.parent.parent.parent.addHidenTab(mid, params);
    } else {
        if (window.name != "") {
            addHidenTab(mid, params);
        }
    }
}

// Common DelTab
function delTab(mid) {
    if (parent.delTab && typeof parent.delTab == "function" && window.name != "") {
        parent.delTab(mid);
    } else if (parent.parent.delTab && typeof parent.parent.delTab == "function" && window.name != "") {
        parent.parent.delTab(mid);
    } else if (parent.parent.parent.delTab && typeof parent.parent.parent.delTab == "function" && window.name != "") {
        parent.parent.parent.delTab(mid);
    } else if (parent.parent.parent.parent.delTab && typeof parent.parent.parent.parent.delTab == "function" && window.name != "") {
        parent.parent.parent.parent.delTab(mid);
    } else {
        if (window.name != "") {
            delTab(mid);
        }
    }
}

// Common AddPopup with Menucode
function addPopup(mid, params, custid) {
    if (parent.addPopup && typeof parent.addPopup == "function" && window.name != "") {
        parent.addPopup(mid, params, custid);
    } else if (parent.parent.addPopup && typeof parent.parent.addPopup == "function" && window.name != "") {
        parent.parent.addPopup(mid, params, custid);
    } else if (parent.parent.parent.addPopup && typeof parent.parent.parent.addPopup == "function" && window.name != "") {
        parent.parent.parent.addPopup(mid, params, custid);
    } else if (parent.parent.parent.parent.addPopup && typeof parent.parent.parent.parent.addPopup == "function" && window.name != "") {
        parent.parent.parent.parent.addPopup(mid, params, custid);
    } else {
        if (window.name != "") {
            addPopup(mid, params, custid);
        }
    }
}

// Common openWinPopup Normal
function openWinPopup(sUrl, sPopName, sParam) {
    if (parent.openWinPopup && typeof parent.openWinPopup == "function" && window.name != "") {
        parent.openWinPopup(sUrl, sPopName, sParam);
    } else if (parent.parent.openWinPopup && typeof parent.parent.openWinPopup == "function" && window.name != "") {
        parent.parent.openWinPopup(sUrl, sPopName, sParam);
    } else if (parent.parent.parent.openWinPopup && typeof parent.parent.parent.openWinPopup == "function" && window.name != "") {
        parent.parent.parent.openWinPopup(sUrl, sPopName, sParam);
    } else if (parent.parent.parent.parent.openWinPopup && typeof parent.parent.parent.parent.openWinPopup == "function" && window.name != "") {
        parent.parent.parent.parent.openWinPopup(sUrl, sPopName, sParam);
    } else {
        if (window.name != "") {
            openWinPopup(sUrl, sPopName, sParam);
        }else{
            if (sPopName == undefined) {
                sPopName = "PopWin";
            }
            if (sParam == undefined) {
                sParam = "";
            } else {
                sParam = "," + sParam;
            }

            var pop = window.open(sUrl, sPopName, 'menubar=0,toolbar=0,location=0,status=1,directory=0,border=1,scrollbars=0,resizable=0' + sParam);
            pop.opener = window;
            pop.focus();
        }
    }
}

function makeFrame(id, url) {
	//없을때에만 생성
	if ($("#" + id).attr("src") == undefined) {
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("id", id);
		ifrm.setAttribute("src", url);
		ifrm.style.width = "0px";
		ifrm.style.height = "0px";
		document.body.appendChild(ifrm);
	}
}

// cookie start
function eraseCookie(name) {
	newCookie(name, "");
}

function newCookie(name, value) {
	document.cookie = name + "=" + value + "; path=/";
}

//쿠키정보("쿠키명")
function readCookie(name) {
	var nameSG = name + "=";
	var nuller = '';
	if (document.cookie.indexOf(nameSG) == -1) return nuller;
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameSG) == 0) return c.substring(nameSG.length, c.length);
	}
	return null;
}
// cookie end