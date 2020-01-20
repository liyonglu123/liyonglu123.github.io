package com.example.demo.service;

import com.example.demo.entity.Menu;

import java.util.List;

/**
 * Created by xiaozhu on 2019/12/10.
 */
public interface MenuService {
    Integer insertMenu(Menu menu);
    // 查询所有的父类
    List<Menu> selectAllParent();
}
