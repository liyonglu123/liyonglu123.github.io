package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 使用@ConfigurationProperties方式可以进行配置文件与实体字段的自动映射，但需要字段必须提供set方法才可以，而使用@Value注解修饰的字段不需要提供set方法
 * Created by xiaozhu on 2019/12/12.
 */
@RestController
@ConfigurationProperties(prefix = "person") // 统一处理
public class TestValueController {
    // 单个属性 方式一

//    @Value("${person.name}")
    private String name;
//    @Value("${person.age}")
    private int age;

    public void setAge(int age) {
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    @RequestMapping("/quick")
    @ResponseBody
    public String quick(){
        return "name="+name+",age="+age;
    }
}
