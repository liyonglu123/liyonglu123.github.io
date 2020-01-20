package com.example.demo.controller;

import com.example.demo.service.RedisService;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by xiaozhu on 2019/12/5.
 */
@Api(value = "redisController", description = "redis测试")
@RestController
public class RedisController {
    @Resource
    private RedisService redisService;
    @ApiOperation(value = "redis测试", httpMethod = "GET", notes = "redis测试")
    @RequestMapping(value = "/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult test() {
        ResponseResult ret = ResponseResult.getSuccessResponse();
        String str = redisService.get("hello");
        ret.setData(str);
        return ret;
    }
    @ApiOperation(value = "redis测试", httpMethod = "GET", notes = "redis测试")
    @RequestMapping(value = "/set", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult set() {
        redisService.set("hello", "world");
        ResponseResult ret = ResponseResult.getSuccessResponse();
        String str = redisService.get("hello");
        ret.setData(str);
        return ret;
    }
}
