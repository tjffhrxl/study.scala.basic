package models;


import play.data.format.Formats;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by hyunjulee on 2014-07-18.
 */
/*@SqlResultSetMapping(name="NoticeResults",
        entities={
                @EntityResult(entityClass=TspNoticeListT2.class, fields={
                        @FieldResult(name="noticeSeq", column="NOTICE_NO"),
                        @FieldResult(name="noticeTypeCode", column="NOTICE_TYPE"),
                        @FieldResult(name="noticeType", column="NOTICE_TYPE"),
                        @FieldResult(name="siteTypeCode", column="SITE_ID"),
                        @FieldResult(name="siteType", column="SITE_ID"),
                        @FieldResult(name="noticeTitle", column="TITLE"),
                        @FieldResult(name="topYn", column="TOP_YN"),
                        @FieldResult(name="totalCount", column="TOTAL_COUNT"),
                        @FieldResult(name="hitCount", column="HIT_COUNT"),
                        @FieldResult(name="insDate", column="INS_DATE")
                })}
)*/
public class TspNoticeListT2  extends Model {
    @Id
    public int noticeSeq;
    public String noticeType;
    public String noticeTypeCode;
    public String siteType;
    public String siteTypeCode;
    public String noticeTitle;
    public int totalCount;
    public String topYn;
    @Formats.DateTime(pattern="yyyy-MM-dd")
    public Date insDate = new Date();
    public  int hitCount;

}
