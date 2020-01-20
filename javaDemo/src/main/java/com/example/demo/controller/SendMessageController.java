package com.example.demo.controller;

import com.example.demo.utils.ResponseResult;
import com.example.demo.utils.SendMessage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by xiaozhu on 2019/12/4.
 */
@Api(value = "sendMessageController", description = "短信验证码")
@RestController
public class SendMessageController {
    // 暂时采用get进行测试,应当是post从前台获取数据
    @ApiOperation(value = "短信验证码", httpMethod = "GET", notes = "短信验证码")
    @RequestMapping(value = "/getMsgCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult getMsgCode() {
        Integer code = SendMessage.send("liyonglu", "d41d8cd9866f00b204e9808", "18610844924", "验证码:"+ SendMessage.getRandomCode(6));
        if(code < 0) {
            ResponseResult ret = ResponseResult.getFailResponse();
            ret.setMsg(SendMessage.getMessage(code));
            return ret;
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setMsg(SendMessage.getMessage(code));
        return ret;
    }
}
