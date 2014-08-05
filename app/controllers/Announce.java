package controllers;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Transaction;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import controllers.dao.NoticeDAO;
import controllers.helper.AnnounceHelper;
import models.*;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.mapping.ParameterMode;
import play.Logger;
import play.api.libs.json.JsObject;
import play.data.DynamicForm;
import play.data.Form;
import play.db.jpa.JPA;
import play.libs.F.Function;
import play.libs.F.Promise;
import play.libs.Json;
import play.libs.ws.WS;
import play.libs.ws.WSRequestHolder;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import play.db.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;

/**
 * Created by hyunjulee on 2014-07-18.
 */
public class Announce extends Controller {

    public static Result esmAnnounce(int page, String site, String noticeType, String searchType, String searchText, int noticeNo, int selectNo) {
        NoticeModel model = new NoticeModel();
        SearchParamT param = new SearchParamT();
        int pageSize = 10;
        page = (page==0)?1:page;
        noticeNo = (noticeNo==0)?1:noticeNo;
        selectNo = (selectNo==0)?1:selectNo;

        param.currentPage = page;
        param.pageSize = pageSize;
        param.siteType = AnnounceHelper.getSiteTypeCode(site);
        param.noticeType = AnnounceHelper.getNoticeTypeCode(noticeType);
        param.searchType = searchType;
        param.searchText = searchText;

        //set model
        model.siteType = site;
        model.noticeType = noticeType;
        model.searchType = searchType;
        model.searchText = searchText;
        model.dataList = new NoticeDAO().getNoticeList(param);
        model.currentPageIndex = page;
        model.pageSize = pageSize;
        model.pageGroupSize = 10;
        model.totalCount = model.dataList.size()==0?0:model.dataList.get(0).totalCount;
        model.pageCount = (int)Math.ceil((double)model.totalCount/model.pageSize);

        return ok(views.html.notice.notice.render(model));
    }

    public static Promise<Result> esmAnnounceFromAPI(int page, String site, String noticeType, String searchType, String searchText, int noticeNo, int selectNo) {

        NoticeModel model = new NoticeModel();
        SearchParamT param = new SearchParamT();
        int pageSize = 10;
        page = (page==0)?1:page;
        noticeNo = (noticeNo==0)?1:noticeNo;
        selectNo = (selectNo==0)?1:selectNo;

        param.currentPage = page;
        param.pageSize = pageSize;
        param.siteType = AnnounceHelper.getSiteTypeCode(site);
        param.noticeType = AnnounceHelper.getNoticeTypeCode(noticeType);
        param.searchType = searchType;
        param.searchText = searchText;

        String url = "http://local.esmplus.com/Member/AnnounceAPI/GetEsmNoticeList";
        WSRequestHolder holder = WS.url(url);
        WSRequestHolder complexHolder = holder
                .setTimeout(1000)
                .setQueryParameter("SearchParam", "{Permission:'all',CurrentPage:1,PageSize:10,SiteType:4,NoticeType:7,SearchType:1,SearchText:''}");

        return complexHolder.get().map(
            new Function<WSResponse, Result>() {
                public Result apply(WSResponse response) {
                    JsonNode json = response.asJson();

                    if(json == null)
                        return badRequest("Expecting Json data");
                    else {
                        List<TspNoticeListT2> noticeList = new ArrayList<TspNoticeListT2>();
                        JsonNode dataList = json.findPath("data");
                        Iterator<JsonNode> elements = dataList.elements();

                        while (elements.hasNext()) {
                            JsonNode data = elements.next();
                            TspNoticeListT2 notice = new TspNoticeListT2();
                            notice.noticeSeq = data.findPath("NoticeSeq").intValue();
                            notice.noticeTypeCode = data.findPath("NoticeTypeCode").textValue();
                            notice.noticeType = data.findPath("NoticeType").textValue();
                            notice.siteTypeCode = data.findPath("SiteTypeCode").textValue();
                            notice.siteType = data.findPath("SiteType").textValue();
                            notice.noticeTitle = data.findPath("NoticeTitle").textValue();
                            notice.topYn = data.findPath("TopYn").textValue();
                            notice.totalCount = data.findPath("TotalCount").intValue();
                            notice.hitCount = data.findPath("HitCount").intValue();
                            //notice.insDate = data.findPath("NoticeSeq").textValue();
                            noticeList.add(notice);
                        }

                        NoticeModel model = new NoticeModel();
                        //set model
                        model.siteType = "4";
                        model.noticeType = "All";
                        model.searchType = "";
                        model.searchText = "";
                        model.dataList = noticeList;
                        model.currentPageIndex = 1;
                        model.pageSize = 10;
                        model.pageGroupSize = 10;
                        model.totalCount = model.dataList.size()==0?0:model.dataList.get(0).totalCount;
                        model.pageCount = (int)Math.ceil((double)model.totalCount/model.pageSize);

                        return ok(views.html.notice.notice.render(model));
                    }
                }
            }
        );
    }

    public static Result getNotice(int noticeSeq)
    {
        if(noticeSeq==0) {
            ObjectNode result = Json.newObject();
            result.put("msg", "invalid parameter. noticeSeq="+noticeSeq);
            return ok(result);
        }
        else {
           TspNoticeT2 data = new NoticeDAO().getNotice(noticeSeq);
            return ok(Json.toJson(data));
        }
    }

}
