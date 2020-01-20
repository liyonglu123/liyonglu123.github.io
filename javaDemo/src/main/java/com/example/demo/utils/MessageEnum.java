package com.example.demo.utils;

/**
 * 用于处理异常处理的枚举类
 * Created by xiaozhu on 2019/12/10.
 */
public enum  MessageEnum {
    SYSTEM_ERROR(1001, "系统异常!"),
    NAME_EXCEEDED_CHARRACTER_LIMIT(2000, "姓名超过了限制，最大4个字符!");
    private Integer code;
    private String message;
    MessageEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
