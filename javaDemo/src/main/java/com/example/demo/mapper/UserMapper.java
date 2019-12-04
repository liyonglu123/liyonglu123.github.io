package com.example.demo.mapper;

import com.example.demo.entity.RegisterUser;
import com.example.demo.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xiaozhu on 2019/11/29.
 */
@Repository
public interface UserMapper {
    Integer addUser(User user);
    User findUserById(String userId);
    Integer registerUser(RegisterUser user); // 注册用户
    List checkIsExist(String userName); // 检测用户是否存在
}
