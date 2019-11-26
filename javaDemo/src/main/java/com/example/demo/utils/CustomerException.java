package com.example.demo.utils;

/**
 * Created by xiaozhu on 2019/11/26.
 */
public class CustomerException extends RuntimeException  {
    private static final long serialVersionUID = -7864604160297181941L;
    public CustomerException(String errorMsg) {
        super(errorMsg);
    }

}
