package com.example.demo.controller;

import com.example.demo.entity.Menu;
import com.example.demo.service.MenuService;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaozhu on 2019/12/10.
 */
@Api(value = "menuController", description = "菜单")
@RestController
@RequestMapping("/menu")
public class MenuController {
    @Resource
    @Autowired
    private MenuService menuService;
    @ApiOperation(value = "添加菜单", httpMethod = "POST", notes = "添加菜单")
    @RequestMapping(value = "/addMenu", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult addMenu(@RequestBody Menu menu) {
        Integer size = menuService.insertMenu(menu);
        if(size == null) {
            ResponseResult ret = ResponseResult.getFailResponse();
            ret.setMsg("添加失败!");
            return ret;
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(menu.getId());
        return ret;
    }
    @ApiOperation(value = "查询所有的父类菜单", httpMethod = "GET", notes = "查询所有的父类菜单")
    @RequestMapping(value = "/selectAllParentMenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult selectAllParentMenu() {
        List<Menu> menuList = menuService.selectAllParent();
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(menuList);
        return ret;
    }

}
