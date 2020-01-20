package com.example.demo.entity;

/**
 * 菜单实体类
 * Created by xiaozhu on 2019/12/10.
 */
public class Menu {
    private int id;
    private String code;
    private String menuName;
    private String pCode;
    private int enableParent;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }
    public String getpCode() {
        return pCode;
    }

    public void setpCode(String pCode) {
        this.pCode = pCode;
    }

    public int getEnableParent() {
        return enableParent;
    }
    public void setEnableParent(int enableParent) {
        this.enableParent = enableParent;
    }
}
