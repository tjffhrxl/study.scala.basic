package controllers;

import controllers.util.MyBatisFactory;
import org.apache.ibatis.session.SqlSession;
import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {

        //SqlSession sqlSession = MyBatisFactory.getDefaultClient();
        //System.out.println(sqlSession.selectList("sample.searchList"));
        return ok(index.render("Your new application is ready."));
    }

}
