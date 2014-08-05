package controllers.helper;

/**
 * Created by hyunjulee on 2014-07-22.
 */
public class AnnounceHelper {
    public  static String getNoticeTypeCode(String noticeType) {
        String noticeTypeCode;

        switch (noticeType){
            case "Normal":
                noticeTypeCode ="1";
                break;
            case "Safety":
                noticeTypeCode ="2";
                break;
            case "Category":
                noticeTypeCode ="3";
                break;
            case "Ad":
                noticeTypeCode ="4";
                break;
            case "Event":
                noticeTypeCode ="5";
                break;
            case "System":
                noticeTypeCode ="6";
                break;
            default:
                noticeTypeCode ="";
                break;
        }
        return noticeTypeCode;
    }

    public  static int getSiteTypeCode(String siteType){
        int siteTypeCode;
        switch (siteType){
            case "Iac":
                siteTypeCode =1;
                break;
            case "Gmkt":
                siteTypeCode =2;
                break;
            default:
                siteTypeCode =4;
                break;
        }
        return siteTypeCode;
    }

    public  static String getNoticeType(String noticeTypeCode) {
        String noticeType;

        switch (noticeTypeCode){
            case "1":
                noticeType ="일반공지";
                break;
            case "2":
                noticeType ="안전거래공지";
                break;
            case "3":
                noticeType ="카테고리공지";
                break;
            case "4":
                noticeType ="광고공지";
                break;
            case "5":
                noticeType ="이벤트공지";
                break;
            case "6":
                noticeType ="시스템공지";
                break;
            default:
                noticeType ="일반공지";
                break;
        }
        return noticeType;
    }
    public  static String getSiteType(String siteTypeCode){
        String siteType;
        switch (siteTypeCode){
            case "1":
                siteType ="옥션";
                break;
            case "2":
                siteType ="G마켓";
                break;
            default:
                siteType ="ESM+";
                break;
        }
        return siteType;
    }
}
