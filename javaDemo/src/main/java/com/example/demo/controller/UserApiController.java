package com.example.demo.controller;

import com.example.demo.auth.UserLoginToken;
import com.example.demo.entity.RegisterUser;
import com.example.demo.entity.User;
import com.example.demo.service.TokenService;
import com.example.demo.service.UserService;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

/**
 * Created by xiaozhu on 2019/12/2.
 */
@Api(value = "userApiController", description = "认证")
@RestController
@RequestMapping("/user")
public class UserApiController {
    @Autowired
    @Resource
    UserService userService;
    @Autowired
    TokenService tokenService;
    // 登录
    @ApiOperation(value = "用户登录认证", httpMethod = "GET", notes = "用户登录认证")
//    @GetMapping("/login")
    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult login(User user, HttpServletResponse response){
        // 从数据库中进行用户信息的比对    md5加密的问题
        List list = checkIsExist(user.getUserName());
        User userForBase = (User)list.get(0);
//        JSONObject jsonObject = new JSONObject();
//        User userForBase = new User();
//        userForBase.setId("1");
//        userForBase.setPassword("123");
//        userForBase.setUserName("admin");
        // 有验证码的时候需要去sesstion中进行获取比对 httpSession

        if(!userForBase.getPassword().equals(user.getPassword())) {
            ResponseResult ret = ResponseResult.getFailResponse();
            ret.setMsg("登录失败,密码错");
            return ret;
//            try {
//                jsonObject.put("message", "登录失败,密码错误");
//                return jsonObject;
//            }catch (JSONException e){
//                throw new RuntimeException("501");
//            }
        }
        String token = tokenService.getToken(userForBase);
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        response.addCookie(cookie);
        ResponseResult ret = ResponseResult.getSuccessResponse();
        HashMap<String, String> userMap = new HashMap();
        userMap.put("token", token);
        userMap.put("id", userForBase.getId());
        userMap.put("userName", userForBase.getUserName());
//        userMap.put("password", user.getPassword());
        ret.setData(userMap);
        return ret;
//            try {
//                jsonObject.put("token", token);
//                Cookie cookie = new Cookie("token", token);
//                cookie.setPath("/");
//                response.addCookie(cookie);
//                return jsonObject;
//            }catch (JSONException e){
//                throw new RuntimeException("501");
//            }
    }

    /**
     *  测试 ----- 下面的请求需要进行token验证才能访问
     * @return String
     */
//    @PassToken
    @UserLoginToken
//    @GetMapping("/getMessage")
    @ApiOperation(value = "用户认证测试", httpMethod = "GET", notes = "用户认证测试")
//    @GetMapping("/getMessage")
    @RequestMapping(value = "/getMessage", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult getMessage() {
        // 取出token的用户id进行操作
//        System.out.println(TokenUtil.getTokenUserId());
//        return "您已通过验证!";
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setMsg("您已通过验证");
        return ret;
    }

    /**
     * 注册用户
     * @return
     */
    @ApiOperation(value = "注册用户", httpMethod = "POST", notes = "注册用户")
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult register(@RequestBody RegisterUser user) {
        if(checkIsExist(user.getUserName()).size() >0) {
            ResponseResult ret = ResponseResult.getFailResponse();
            ret.setMsg("该用户已存在!");
            return ret;
        }
            Integer size = userService.registerUser(user);
            if (size == null){
                ResponseResult ret = ResponseResult.getFailResponse();
                return ret;
            }
            ResponseResult ret = ResponseResult.getSuccessResponse();
            ret.setMsg("注册成功!");
            return ret;
    }

    /**
     * 检测用户是否存在
     * @return
     */
    @ApiOperation(value = "检测用户是否存在", httpMethod = "GET", notes = "检测用户是否存在")
    @RequestMapping(value = "/check", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List checkIsExist(@RequestParam("userName") String userName) {
//        Integer size =  userService.checkIsExist(userName).size();
//        if(size >0) {
//            return true;
//        }
//        return false;
        return userService.checkIsExist(userName);
    }

}
