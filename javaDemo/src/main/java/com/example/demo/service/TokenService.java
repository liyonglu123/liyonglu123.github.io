package com.example.demo.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entity.User;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * token的下发
 * Created by xiaozhu on 2019/12/2.
 */
@Service("TokenService")
public class TokenService {
    public String getToken(User user) {
        Date start = new Date();
        long currentTime = System.currentTimeMillis() + 60 *  60* 1000; // 一个小时有效时间
        Date end = new Date(currentTime);
        String token = "";
        token = JWT.create().withAudience(user.getId()).withIssuedAt(start).withExpiresAt(end)
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }
}
