package controllers.dao;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.RawSql;
import com.avaje.ebean.RawSqlBuilder;
import com.avaje.ebean.Transaction;
import controllers.helper.AnnounceHelper;
import controllers.util.MyBatisFactory;
import models.SearchParamT;
import models.TspNoticeListT2;
import models.TspNoticeT2;
import models.mybatis.mappers.NoticeMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hyunjulee on 2014-07-30.
 */
public class NoticeDAO {


    public List<TspNoticeListT2> getNoticeList(SearchParamT param){
        //return getNoticeListByORM(param);
        return getNoticeListByDirect(param);
    }

    private List<TspNoticeListT2> getNoticeListByDirect(SearchParamT param){

        List<TspNoticeListT2> dataList = new ArrayList<TspNoticeListT2>();
        Transaction tx = Ebean.beginTransaction();
        String sql = "CALL dbo.UP_Member_IacNoticeList(?, ?, ?, ?, ?, ?, ?)";
        CallableStatement callableStatement = null;

        try {

            Connection dbConnection = tx.getConnection();
            callableStatement = dbConnection.prepareCall(sql);

            callableStatement.setInt(1, param.currentPage);
            callableStatement.setInt(2, param.pageSize);
            callableStatement.setString(3, param.searchType);
            callableStatement.setString(4, param.searchText);
            callableStatement.setString(5, param.noticeType);
            callableStatement.setInt(6, param.siteType);
            callableStatement.setString(7, param.notInData);

            ResultSet rs = callableStatement.executeQuery();

            while (rs.next()) {
                TspNoticeListT2 notice = new TspNoticeListT2();
                notice.noticeSeq = rs.getInt("NOTICE_NO");
                notice.noticeTypeCode = rs.getString("NOTICE_TYPE");
                notice.noticeType = AnnounceHelper.getNoticeType(notice.noticeTypeCode);
                notice.siteTypeCode = rs.getString("SITE_ID");
                notice.siteType = AnnounceHelper.getSiteType(notice.siteTypeCode);
                notice.noticeTitle = rs.getString("TITLE");
                notice.topYn = rs.getString("TOP_YN");
                notice.totalCount = rs.getInt("TOTAL_COUNT");
                notice.hitCount = rs.getInt("HIT_COUNT");
                notice.insDate = rs.getDate("INS_DATE");
                dataList.add(notice);
            }

            Ebean.commitTransaction();

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return dataList;
    }

    @Transactional(readOnly=true)
    private List<TspNoticeListT2> getNoticeListByORM(SearchParamT param){
        //Call dbo.UP_Member_IacNoticeList(:CURRENT_PAGE, :PAGE_SIZE, :SEARCH_TYPE, :SEARCH_TEXT, :NOTICE_TYPE,:SITE_ID,:NOT_IN_DATA)
        /*Query query = JPA.em().createNamedQuery("testQuery",TspNoticeListT2.class);
        query.setParameter(1, param.currentPage);
        query.setParameter(2, param.pageSize);
        query.setParameter(3, param.searchType);
        query.setParameter(4, param.searchText);
        query.setParameter(5, param.noticeType);
        query.setParameter(6, param.siteType);
        query.setParameter(7, param.notInData);

        List<TspNoticeListT2> noticeList = query.getResultList();
        return noticeList;*/
        List<TspNoticeListT2> noticeList =null;
        //Query query = JPA.em().createNativeQuery("noticeQuery");
        EntityManager em = JPA.em();



        Query query = em.createQuery("select top 1 NOTICE_NO,NOTICE_TYPE,SITE_ID,TITLE,TOP_YN,0 as TOTAL_COUNT,HIT_COUNT,INS_DATE from dbo.NOTICE with(nolock)");


//        query.setParameter("CURRENT_PAGE", param.currentPage);
//        query.setParameter("PAGE_SIZE", param.pageSize);
//        query.setParameter("SEARCH_TYPE", param.searchType);
//        query.setParameter("SEARCH_TEXT", param.searchText);
//        query.setParameter("NOTICE_TYPE", param.noticeType);
//        query.setParameter("SITE_ID", param.siteType);
//        query.setParameter("NOT_IN_DATA", param.notInData);

        //noticeList = (List<TspNoticeListT2>) query.getResultList();

//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
        return noticeList;
    }



    public TspNoticeT2 getNotice(int seq)
    {
        return getNoticeByDirect(seq);
        //return getNoticeByORM(seq);
    }

    private TspNoticeT2 getNoticeByDirect(int seq){
        TspNoticeT2 data = new TspNoticeT2();

        Transaction tx = Ebean.beginTransaction();
        String sql = "CALL dbo.UP_Admin_SelectNoticeInfo(?)";
        CallableStatement callableStatement = null;
        try {
            Connection dbConnection = tx.getConnection();
            callableStatement = dbConnection.prepareCall(sql);
            callableStatement.setInt(1,seq);

            ResultSet rs = callableStatement.executeQuery();
            if (rs.next()) {
                data.noticeSeq = rs.getInt("NOTICE_NO");
                data.noticeType=AnnounceHelper.getNoticeType(rs.getString("NOTICE_TYPE"));
                data.exposedType = AnnounceHelper.getNoticeType(rs.getString("NOTICE_CODE"));
                data.siteType=rs.getString("SITE_ID");
                data.linkType=rs.getString("LINK_TYPE");
                data.startDate = rs.getDate("BEGIN_DATE");
                data.endDate = rs.getDate("END_DATE");
                data.noticeTitle=rs.getString("TITLE");
                data.noticeContent=rs.getString("CONTENTS");
                data.empNo="";
                data.insDate = rs.getDate("INS_DATE");
                data.hitCount=rs.getInt("HIT_COUNT");
            }

            Ebean.commitTransaction();

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return data;
    }

    private TspNoticeT2 getNoticeByORM(int seq){
        /*SqlSession session = MyBatisFactory.newSqlSession();
        NoticeMapper mapper = session.getMapper(NoticeMapper.class);

        try {
            return mapper.callGetNotice();
        } finally {
            session.close();
        }*/

        return null;
    }
}
