package com.example.demo.entity;

/**
 * Created by xiaozhu on 2019/12/2.
 */
public class RegisterUser {
    private String id;
    private String userName;
    private String password;
//    private String nickName;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
//    public String getNickName() {
//        return nickName;
//    }
//    public void setNickName(String nickName) {
//        this.nickName = nickName;
//    }
}
