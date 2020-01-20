package com.example.demo.controller;

import com.example.demo.core.UnitTest;
import com.example.demo.entity.Menu;
import com.example.demo.utils.ObjToJson;
import org.junit.Test;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


/**
 * Created by xiaozhu on 2019/12/10.
 */
public class MenuControllerTest extends UnitTest {
    @Test
    public void addMenuTest() {
       try{
           Menu menu = new Menu();
           menu.setCode("80000");
           menu.setMenuName("测试");
           menu.setEnableParent(1);
//          转化为字符串
           System.out.println("menu=============:"+menu);
           String c = ObjToJson.toJsonString(menu);
           System.out.println("C=============:"+c);
           ResultActions ra = getMockMvc().perform(
                   MockMvcRequestBuilders.post("/menu/addMenu")
//                           .header("content-type","application/json")
//                           .header("user-agent",USER_AGENT)
//                           .header("host", HOST)
                           .content(c)
           );
           System.out.println("ra=============:"+ra);
           MvcResult result = ra.andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
           String responseStr = result.getResponse().getContentAsString();
           System.out.println("result:"+responseStr);
       }catch (Exception e) {
           e.printStackTrace();
       }
    }
}
