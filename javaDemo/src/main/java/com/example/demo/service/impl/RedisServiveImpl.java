package com.example.demo.service.impl;

import com.example.demo.service.RedisService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by xiaozhu on 2019/12/5.
 */
@Service
public class RedisServiveImpl implements RedisService {
    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    @Override
    public String get(String key) {
        return get(key, String.class);
    }
    @Override
    public void set(String key, Object val) {
        redisTemplate.opsForValue().set(key, val);
    }

    @Override
    @SuppressWarnings({"unchecked", "ConstantConditions"})
    public <T> T get(String key, Class<T> cls) {
        Object val = redisTemplate.opsForValue().get(key);
        if (val==null){
            return null;
        }
        if (val.getClass().isAssignableFrom(cls)) {
            return (T) val;
        }
        throw new IllegalArgumentException();
    }

}
