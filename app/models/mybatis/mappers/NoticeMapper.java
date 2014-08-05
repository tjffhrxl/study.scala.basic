package models.mybatis.mappers;

import models.TspNoticeListT2;
import models.TspNoticeT2;

import java.util.List;
import java.util.Map;

/**
 * Created by hyunjulee on 2014-07-30.
 */
public interface NoticeMapper {

    public List<TspNoticeListT2> callGetNoticeList();
    public TspNoticeT2 callGetNotice();
}
