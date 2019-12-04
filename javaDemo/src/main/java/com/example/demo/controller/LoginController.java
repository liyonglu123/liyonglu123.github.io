package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.constraints.Digits;

/**
 * Created by xiaozhu on 2019/11/29.
 */
@Api(value = "loginController", description = "用户")
@RestController
@RequestMapping("/user")
public class LoginController {
    @Resource
    private UserService userService;
    @ApiOperation(value = "添加人物", httpMethod = "POST", notes = "添加人物")
    @RequestMapping(value = "/add", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult add(@RequestBody User user) {
//      对密码进行md5的加密
        String md5Pass = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        user.setPassword(md5Pass);
        Integer size = userService.addUser(user);
        if(size == null) {
            return ResponseResult.getFailResponse();
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(user);
        return ret;
    }
}
