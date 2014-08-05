package controllers.util;

import java.io.IOException;
import java.io.Reader;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import play.Configuration;
import play.Play;

/**
 * Created by hyunjulee on 2014-07-30.
 */
public class MyBatisFactory {
    /*private static MyBatisFactory instance;
    private static String svrName = "default";

    {
        instance = new MyBatisFactory();
    }

    public synchronized static SqlSession getDefaultClient() {

        return newSqlSession();
    }

    public static SqlSession newSqlSession() {

        Properties props = new Properties();
        Configuration config = Play.application().configuration();

        String resource = config.getString("mybatis.configuration");

        Reader reader;

        try {
            reader = Resources.getResourceAsReader(resource);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        props.setProperty("driver", config.getString("db.default.driver"));
        props.setProperty("url", config.getString("db.default.url"));
        props.setProperty("user", config.getString("db.default.user"));
        props.setProperty("password", config.getString("db.default.pass"));

        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(reader, props);

        return sessionFactory.openSession();
    }*/
}
