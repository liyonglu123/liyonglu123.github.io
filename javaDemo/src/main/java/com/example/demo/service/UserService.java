package com.example.demo.service;
import com.example.demo.entity.RegisterUser;
import com.example.demo.entity.User;

import java.util.List;

/**
 * Created by xiaozhu on 2019/11/29.
 */
public interface UserService {
    Integer addUser(User user); // 添加用户
    User findUserById(String userId);
    Integer registerUser(RegisterUser user); // 注册新用户
    List checkIsExist(String userName); // 检测用户是否存在
}
