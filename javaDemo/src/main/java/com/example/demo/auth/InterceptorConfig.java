package com.example.demo.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** 基于token的拦截器配置
 * uid+time+sign+固定参数
 * 流程:
 * 用户登录校验，校验成功后就返回Token给客户端
 * 客户端收到数据后保存在客户端
 * 客户端每次访问API是携带Token到服务器端
 * 服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码
 * Created by xiaozhu on 2019/12/2.
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors (InterceptorRegistry registry) {
//        拦截所有请求, 通过判断是否有 @LoginRequired 注解 决定是否需要登录
        registry.addInterceptor(authenticationInterceptor()).addPathPatterns("/**");
//        addInterceptor.excludePathPatterns("/toLogin.do");
    }
    @Bean
    public AuthenticationInterceptor authenticationInterceptor() {
        return new AuthenticationInterceptor();// 自己写的拦截器
    }
}
