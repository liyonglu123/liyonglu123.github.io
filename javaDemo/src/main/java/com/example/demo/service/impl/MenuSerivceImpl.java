package com.example.demo.service.impl;

import com.example.demo.entity.Menu;
import com.example.demo.mapper.MenuMapper;
import com.example.demo.service.MenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaozhu on 2019/12/10.
 */
@Service
public class MenuSerivceImpl implements MenuService {
    @Resource
    private MenuMapper menuMapper;
    @Override
    public Integer insertMenu(Menu menu) {
        return menuMapper.insertMenu(menu);
    }

    @Override
    public List<Menu> selectAllParent(){
        return menuMapper.selectAllParent();
    }
}
