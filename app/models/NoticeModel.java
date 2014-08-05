package models;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hyunjulee on 2014-07-22.
 */
public class NoticeModel {
    public List<SearchKey> siteTypes;
    public  List<TspNoticeListT2> dataList;
    public List<SearchKey> noticeTypes;
    public List<SearchKey> searchTypes;

    public String siteType;
    public String noticeType;
    public String searchType;
    public String searchText;

    public int currentPageIndex=1;
    public int pageSize=10;
    public int pageGroupSize=10;
    public int totalCount = 0;
    public  int pageCount = 0;

    public NoticeModel(){
        siteTypes = new ArrayList<SearchKey>();
        siteTypes.add(new SearchKey(TspSiteType.All.toString(),"전체"));
        siteTypes.add(new SearchKey(TspSiteType.Iac.toString(),"옥션"));
        siteTypes.add(new SearchKey(TspSiteType.Gmkt.toString(),"G마켓"));

        noticeTypes = new ArrayList<SearchKey>();
        noticeTypes.add(new SearchKey(TspNoticeType.All.toString(),"전체"));
        noticeTypes.add(new SearchKey(TspNoticeType.Normal.toString(),"일반공지"));
        noticeTypes.add(new SearchKey(TspNoticeType.Safety.toString(),"안전거래공지"));
        noticeTypes.add(new SearchKey(TspNoticeType.Category.toString(),"카테고리공지"));
        noticeTypes.add(new SearchKey(TspNoticeType.Ad.toString(),"광고공지"));
        noticeTypes.add(new SearchKey(TspNoticeType.Event.toString(),"이벤트공지"));
        noticeTypes.add(new SearchKey(TspNoticeType.System.toString(),"시스템공지"));

        searchTypes = new ArrayList<SearchKey>();
        searchTypes.add(new SearchKey("1","제목"));
        searchTypes.add(new SearchKey("2","내용"));
        searchTypes.add(new SearchKey("3","제목 + 내용"));
    }
}
