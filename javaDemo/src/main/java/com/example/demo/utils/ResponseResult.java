package com.example.demo.utils;

import jdk.nashorn.internal.ir.debug.JSONWriter;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.converter.json.GsonBuilderUtils;

/**
 * Created by xiaozhu on 2019/11/25.
 */
public class ResponseResult<T> {
    private String msg;
    private Integer code;
    private T data;
    // 构造器
    public ResponseResult() {}
    // 重写构造器
    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    public ResponseResult(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }
    public static ResponseResult<?> getSuccessResponse() {
        ResponseResult response = new ResponseResult();
        response.setCode(Constant.SUCCESS);
        response.setMsg("请求成功");
        return response;
    }
    public static ResponseResult<?> getFailResponse() {
        ResponseResult response = new ResponseResult();
        response.setCode(Constant.Fail);
        response.setMsg("请求失败");
        return response;
    }
////    @Override
//    public JSONObject getObj() {
//        // 将获取的json数据封装一层，然后在给返回
//        JSONObject result = new JSONObject();
//        try {
//            result.put("msg", msg);
//            result.put("code", code);
//            result.put("data",data);
//
//        }catch (JSONException e) {
//            e.printStackTrace();
//        }finally {
//
//        }
//        return result;
//    }
////    public String toString() {
////
//    }
}
