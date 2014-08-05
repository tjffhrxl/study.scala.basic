var dateFormat = function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d: d,
				dd: pad(d),
				ddd: dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m: m + 1,
				mm: pad(m + 1),
				mmm: dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy: String(y).slice(2),
				yyyy: y,
				h: H % 12 || 12,
				hh: pad(H % 12 || 12),
				H: H,
				HH: pad(H),
				M: M,
				MM: pad(M),
				s: s,
				ss: pad(s),
				l: pad(L, 3),
				L: pad(L > 99 ? Math.round(L / 10) : L),
				t: H < 12 ? "a" : "p",
				tt: H < 12 ? "am" : "pm",
				T: H < 12 ? "A" : "P",
				TT: H < 12 ? "AM" : "PM",
				Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
} ();

// Some common format strings
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

String.prototype.trim = function () { return $.trim(this) }


String.format = function (text) {

	if (arguments.length <= 1) {
		return text;
	}

	var tokenCount = arguments.length - 2;
	for (var token = 0; token <= tokenCount; token++) {
		text = text.replace(new RegExp('\\{' + token + '\\}', 'gi'), arguments[token + 1]);
	}

	return text;
};

var Util = {};
var Page = {};
var Events = {};

var EventOwner = 'page';



/*
 var searchParam = {
 Permission: sellerPermission,
 CurrentPage: 1,
 PageSize: 10,

 SiteType: '',
 NoticeType: '',
 SearchType: '',
 SearchText: ''
 };
$(document).ready(function () {
	searchParam.CurrentPage = currentPageIndex;
	searchParam.SiteType = $('#SiteType').val();
	searchParam.NoticeType = $('#selNoticeType').val();
	searchParam.SearchType = $('#selSearchType').val();
	searchParam.SearchText = encodeURIComponent($('#txtSearchText').val());

	Util.SetVisibleNoticeDetail(false);

	*//*if (noticeNo > 0) {
		$("td[name=NoticeSeq]").each(function (index, element) {
			if ($(this).html().trim() == noticeNo) {
				selectNo = $(this).parent().attr("RowIndex");
				Util.NoticeDetail(noticeNo, selectNo);
			}
		});
	}*//*
});*/


Util.GetParam = function () {
	searchParam.SiteType = $('#SiteType').val();
	searchParam.NoticeType = $('#selNoticeType').val();
	searchParam.SearchType = $('#selSearchType').val();
	searchParam.SearchText = encodeURIComponent($('#txtSearchText').val());
	searchParam.CurrentPage = currentPageIndex;

	return searchParam;
};

Util.SetVisibleNoticeDetail = function (isVisible) {

	if (isVisible) {
		$('#notice_contents').css('display', '');
	}
	else {
		$('#notice_contents').css('display', 'none');
	}
};

// 공지사항 상세보기
Util.NoticeDetail = function (NoticeSeq, RowIdx) {

	selectedNoticeSeq = NoticeSeq; // 선택된 공지번호
    selectRowIndex = RowIdx;

    $.ajax({
		url: 'getNotice/'+selectedNoticeSeq,
		//data: { NoticeSeq: selectedNoticeSeq },
		type: 'POST',
		dataType: 'json',
		success: function (data, textStatus, jqXHR) {

            if (data.msg) {
                alert(data.msg);
            }
            else{
                var notice = data;
                if(notice.noticeSeq == undefined)
                    notice = notice.data;
                //alert(notice.noticeSeq)
                $('.notice_header #seq').text(notice.noticeSeq);
                $('.notice_header #title').text(notice.noticeTitle);
                $('.notice_header #category').html(String.format('<b>[{0}]</b>', notice.noticeType));
                $('.notice_header #date').text(notice.startDate);
                $('.notice_header #hit').text(notice.hitCount == null ? 0 : notice.hitCount);
                $('#notice_contents_detail').html(notice.noticeContent);

                setTimeout(Util.SetFeedbackTitle, 200);

                Util.SetVisibleNoticeDetail(true);
            }
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
};


// 이전글 다음글 제목 셋팅
Util.SetFeedbackTitle = function () {

	var isFirst = selectRowIndex == 1 ? true : false;
	var isLast = dataLength == selectRowIndex ? true : false;

	var prev_title, prev_date, next_title, next_date;

	var searchParam = Util.GetParam();

	// 첫번째 글이면
	if (isFirst) {
		if (searchParam.CurrentPage == 1) {
			prev_title = '이전글이 없습니다.';
			prev_date = '';
			Util.PrevFeedbackTitleWrite('', prev_title, prev_date, 0);
		}
		else {
			// 이전페이지를 불러옴
			var condition = clone(searchParam);
			condition.PageSize = 1;
			condition.CurrentPage = (searchParam.CurrentPage - 1) * 10;

			Util.GetOneRecord(condition, Util.PrevFeedbackTitleWrite);
		}
	}
	else {
		Util.GetNextPrevFeedbackTitleFromRowIndex(selectRowIndex - 1, Util.PrevFeedbackTitleWrite);
	}

	if (isLast) {
		if (searchParam.CurrentPage == pageCount) {
			next_title = '다음글이 없습니다.';
			next_date = '';
			Util.NextFeedbackTitleWrite('', next_title, next_date, 0);
		}
		else {
			// 다음페이지를 불러옴
			var condition = clone(searchParam);
			condition.PageSize = 1;
			condition.CurrentPage = (10 * searchParam.CurrentPage) - 0 + 1;

			Util.GetOneRecord(condition, Util.NextFeedbackTitleWrite);
		}
	}
	else {

		Util.GetNextPrevFeedbackTitleFromRowIndex((selectRowIndex - 0 + 1), Util.NextFeedbackTitleWrite);
	}
};

// 오브젝트 복사
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
};

Util.GetNextPrevFeedbackTitleFromRowIndex = function (rowIndex, callback) {
	var category, title, date;
	category = $("tr[rowindex=" + rowIndex + "]").find("[name=Category]").html().trim();
	title = $("tr[rowindex=" + rowIndex + "]").find("[name=Title]").html().trim();
	date = $("tr[rowindex=" + rowIndex + "]").find("[name=Date]").html().trim();
	noticeSeq = $("tr[rowindex=" + rowIndex + "]").find("[name=NoticeSeq]").html().trim();


	callback(category, title, date, noticeSeq);
};

Util.GetOneRecord = function (obj, callback) {
	$.ajax({
		url: 'GetEsmNoticeList',
		type: 'POST',
		data: { SearchParam: JSON.stringify(obj) },
		success: function (data) {
			Util.SetNextPrveTitle(data, callback);
		}
	});
};

Util.SetNextPrveTitle = function (data, callback) {
	var category, title, date;
	var notice = data.data[0];
	category = notice.NoticeType;
	title = notice.NoticeTitle;
	date = eval('new ' + notice.InsDate.replace(/\//g, ''));

	callback(category, title, date, notice.NoticeSeq);
};


Util.PrevFeedbackTitleWrite = function (prev_category, prev_title, prev_date, seq) {
	var d = '';
	try {
		d = prev_date.format('yyyy-mm-dd');
	}
	catch (e) { }

	if (d == '') {
		if (prev_date != '') {
			$('#prev_title').html(String.format("<strong class='blue'>[{0}]</strong>{1}</a><span> ({2})</span>", prev_category, prev_title, prev_date));
		}
		else {
			$('#prev_title').html(String.format("{0}", prev_title));
		}
	}
	else {
		$('#prev_title').html(String.format("<strong class='blue'>[{0}]</strong><a href='javascript:Util.MovePrevNotice(\"{3}\",\"{4}\");'>{1}</a></a><span> ({2})</span>",
            prev_category, prev_title, d, seq, 10
        ));
	}
};

Util.NextFeedbackTitleWrite = function (next_category, next_title, next_date, seq) {

	var d = ''
	try {
		d = next_date.format('yyyy-mm-dd ');
	}
	catch (e) {
		d = '';
	}

	if (d == '') {
		if (next_date != '') {
			$('#next_title').html(String.format("<strong class='blue'>[{0}]</strong>{1}</a><span> ({2})</span>", next_category, next_title, next_date));
		}
		else {
			$('#next_title').html(String.format("{0}", next_title));
		}
	}
	else {
		$('#next_title').html(String.format("<strong class='blue'>[{0}]</strong><a href='javascript:Util.MoveNextNotice(\"{3}\",\"{4}\");'>{1}</a></a><span> ({2})</span>",
            next_category, next_title, d, seq, 1
        ));
	}
};


Util.MovePrevNotice = function (seq, rowIndex) {

	var url = String.format("esmAnnounce?page={0}&noticeNo={1}&selectNo={2}&searchType={3}&searchText={4}&site={5}&noticeType={6}", currentPageIndex - 1, seq, rowIndex, searchParam.SearchType, searchParam.SearchText, searchParam.SiteType, searchParam.NoticeType);

	location.href = url;

};


Util.MoveNextNotice = function (seq, rowIndex) {

	var url = String.format("esmAnnounce?page={0}&noticeNo={1}&selectNo={2}&searchType={3}&searchText={4}&site={5}&noticeType={6}", (currentPageIndex - 0) + 1, seq, rowIndex, searchParam.SearchType, searchParam.SearchText, searchParam.SiteType, searchParam.NoticeType);

	location.href = url;

};

Util.Search = function () {

	searchParam = Util.GetParam();
	var url = String.format("esmAnnounce?searchType={0}&searchText={1}&site={2}&noticeType={3}", searchParam.SearchType, searchParam.SearchText, searchParam.SiteType, searchParam.NoticeType);

	location.href = url;

};


Util.PageReload = function () {

	location.href = "esmAnnounce";

}