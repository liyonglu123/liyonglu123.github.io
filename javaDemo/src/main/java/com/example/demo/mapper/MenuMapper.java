package com.example.demo.mapper;

import com.example.demo.entity.Menu;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 菜单mapper
 * Created by xiaozhu on 2019/12/10.
 */
@Repository
public interface MenuMapper {
    // 新增
    Integer insertMenu(Menu menu);
    // 查询所有的父类
    List<Menu> selectAllParent();
}
