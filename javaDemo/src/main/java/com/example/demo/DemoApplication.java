package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController
@SpringBootApplication
@MapperScan("com.example.demo.mapper")
public class DemoApplication {
//	@RequestMapping("/hello")
//	public String hello() {
//		return "hello springBoot!";
//	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
