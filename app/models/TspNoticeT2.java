package models;

import com.avaje.ebean.*;
import controllers.helper.AnnounceHelper;
import play.data.format.Formats;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by hyunjulee on 2014-07-22.
 */

public class TspNoticeT2 extends Model{

    public int noticeSeq;
    public String exposedType;
    public String noticeType;
    public String siteType;
    public String linkType;

    @Formats.DateTime(pattern="yyyy-MM-dd")
    public Date startDate = new Date();
    @Formats.DateTime(pattern="yyyy-MM-dd")
    public Date endDate = new Date();
    public String noticeTitle;
    public String noticeContent;
    public String empNo;

    @Formats.DateTime(pattern="yyyy-MM-dd")
    public Date insDate = new Date();
    public  int hitCount;

}
