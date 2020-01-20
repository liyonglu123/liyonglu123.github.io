//package com.example.demo.config;
//
//import org.omg.CORBA.Object;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
///**
// * Created by xiaozhu on 2019/12/5.
// */
//@Configuration
//public class RedisConfig {
//    @Value("${redis.host}")
//    public  String serverHosts;
//    @Value("${redis.port}")
//    public  String port;
//    @Value("${redis.password}")
//    public  String password;
//    @Value("${redis.maxActive}")
//    public  String maxActive;
//    @Value("${redis.maxIdle}")
//    public  String maxIdle;
//
//    @Autowired
//    private RedisTemplate redisTemplate;
//
//    /**
//     * 类序列化对象。（如果没有存储的是乱码)
//     * @return
//     */
//    @Bean
//    public RedisTemplate redisTemplateInit() {
//        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
//        // 设置序列化Key的实例化对象
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        // 设置序列化Value的实例化对象
//        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
//        redisTemplate.setHashKeySerializer(jackson2JsonRedisSerializer);
//        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
//        return redisTemplate;
//    }
//}
