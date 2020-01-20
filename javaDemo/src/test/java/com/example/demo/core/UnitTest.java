package com.example.demo.core;

import com.example.demo.DemoApplication;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * Created by xiaozhu on 2019/12/10.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApplication.class)
//@SpringBootTest
// 开启web上下文测试
@WebAppConfiguration
public class UnitTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    public static String HOST = "localhost:8080";
    public static String USER_AGENT = "unit-test";

    @Before
    public void init() {
        System.out.println("开始测试-----------------");
    }

    public MockMvc getMockMvc() {
        return mockMvc;
    }
    public void setMockMvc() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
    @Test
    public void test(){
        System.out.println("xxxx");
    }
    @After
    public void after() {
        System.out.println("测试结束-----------------");
    }

}
