package com.example.demo.service.impl;
import com.example.demo.entity.RegisterUser;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaozhu on 2019/11/29.
 */
@Service
public class UserServiceImpl implements UserService {
//    @Override
    @Resource
    private UserMapper userMapper;
    public Integer addUser(User user) {
        return userMapper.addUser(user);
    }
    // 根据userId获取用户的信息
    public User findUserById(String userId) {
        return userMapper.findUserById(userId);
    }
    // 注册新用户
    public Integer registerUser(RegisterUser user) {
        return userMapper.registerUser(user);
    }
    // 检验用户是否存在
    public List checkIsExist(String userName) {
        return userMapper.checkIsExist(userName);
    }
}
