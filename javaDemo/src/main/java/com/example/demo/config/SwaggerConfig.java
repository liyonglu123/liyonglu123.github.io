package com.example.demo.config;

import com.google.common.base.Predicates;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.cglib.core.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by xiaozhu on 2019/11/25.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket customDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select() // 选择那些路径和api会生成document
                .apis(RequestHandlerSelectors.any()) // 对所有api进行监控
//                .paths(PathSelectors.any())
//                .build();
                 //不显示错误的接口地址
                .paths(Predicates.not(PathSelectors.regex("/error.*")))//错误路径不监控
                .paths(PathSelectors.regex("/.*"))// 对根下所有路径进行监控
                .build();
    }

    private ApiInfo apiInfo() {
//        Contact contact = new Contact("团队名", "www.my.com", "my@my.com");
        return new ApiInfoBuilder()
                .title("我的接口文档")
                .description("这是swagger2生成的接口文档")
//                .contact(contact)   // 联系方式
                .version("1.1.0")  // 版本
                .build();
    }
}