package com.example.demo.controller;

import com.example.demo.utils.CustomerRandomValidateCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * JSP 自定义获取图形验证码
 * Created by xiaozhu on 2019/12/3.
 */
@Api(value = "cusImgCodeController", description = "图片验证码")
@RestController
//@RequestMapping("/")
public class CusImgCodeController {
    @ApiOperation(value = "图片验证码", httpMethod = "GET", notes = "获取图片验证码")
    @RequestMapping(value = "/getVerify", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void getVerify(HttpServletRequest request, HttpServletResponse response) {

        try {
            //设置相应类型,告诉浏览器输出的内容为图片  下面注释的可以结合jsp进行实现
            response.setContentType("image/jpeg");
            //设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            CustomerRandomValidateCode customerRandomValidateCode = new CustomerRandomValidateCode();
            //输出验证码图片方法
            customerRandomValidateCode.getRandCode(request, response);
        } catch (Exception e) {
//            LOG.error("获取验证码失败>>>>   ", e);

        }

    }
}
