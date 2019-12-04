package com.example.demo.controller;

import com.wf.captcha.ArithmeticCaptcha;
import com.wf.captcha.ChineseCaptcha;
import com.wf.captcha.ChineseGifCaptcha;
import com.wf.captcha.GifCaptcha;
import com.wf.captcha.utils.CaptchaUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 使用easy-captha开源进行处理
 * Created by xiaozhu on 2019/12/3.
 */
@Api(value = "captchaController", description = "工具验证码")
@RestController
public class CaptchaController {
    @ApiOperation(value = "工具验证码", httpMethod = "GET", notes = "工具验证码")
    @RequestMapping(value = "/captcha", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void captcha(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 设置位数
//        CaptchaUtil.out(4, request, response);
        // 设置宽、高、位数
//        CaptchaUtil.out(130, 48, 5, request, response);
        // 使用gif验证码
//        GifCaptcha gifCaptcha = new GifCaptcha(130,48,4);
//        CaptchaUtil.out(gifCaptcha, request, response);
//        CaptchaUtil.out(request, response);
        // 中文类型
//        ChineseCaptcha captcha = new ChineseCaptcha(130, 48);
        // 中文gif类型
//        ChineseGifCaptcha captcha = new ChineseGifCaptcha(130, 48);
//        // 算术类型
        ArithmeticCaptcha captcha = new ArithmeticCaptcha(130, 48);
        captcha.setLen(2);  // 几位数运算，默认是两位
        captcha.getArithmeticString();  // 获取运算的公式：3+2=?
        captcha.text();  // 获取运算的结果：5
        CaptchaUtil.out(captcha, request, response);
    }
}