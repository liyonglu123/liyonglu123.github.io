package com.example.demo.service;

/**
 * Created by xiaozhu on 2019/12/5.
 */
public interface RedisService {
    String get(String key);
    void set(String key, Object val);
    <T> T get(String key, Class<T> cls);

}
