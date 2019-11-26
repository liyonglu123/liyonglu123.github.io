package com.example.demo.entity;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by xiaozhu on 2019/11/22.
 */
@Getter
@Setter
public class Person {
    private Integer id;
    private String userName;
    private String sex;
    private Integer age;

    public Integer getId() {
        return this.id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
