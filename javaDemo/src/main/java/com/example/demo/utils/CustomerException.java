package com.example.demo.utils;

/**
 *  自定义异常类
 * Created by xiaozhu on 2019/11/26.
 */
public class CustomerException extends RuntimeException  {
    private static final long serialVersionUID = -7864604160297181941L;
    private Integer code;
    public CustomerException(MessageEnum messageEnum) {
        super(messageEnum.getMessage());
        this.code = messageEnum.getCode();
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
}
