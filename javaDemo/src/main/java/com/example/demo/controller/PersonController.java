package com.example.demo.controller;

import com.example.demo.entity.Person;
import com.example.demo.mapper.PersonMapper;
import com.example.demo.service.PersonService;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by xiaozhu on 2019/11/22.
 */
@Api(value = "personController", description = "人物")
@RestController
@RequestMapping("/person")
public class PersonController {
//    @Autowired
    @Resource
    private PersonService personService;
    @ApiOperation(value = "添加人物", httpMethod = "POST", notes = "添加人物")
//    @ResponseBody // 返回json数据格式
    @RequestMapping(value = "/add", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult add(@RequestBody Person person, HttpServletRequest request, HttpServletRequest response) {
//        try {
//            personService.insertPerson(person);
//            return ResponseResult.getSuccessResponse();
////            return +"";
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return responseResult;
        Integer id = personService.insertPerson(person);
        if(id == null) {
            return ResponseResult.getFailResponse();
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(person.getId());
        return ret;
    }
    @ApiOperation(value = "删除人物", httpMethod = "GET", notes = "删除人物")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseResult del(@RequestParam("id") String id) {
        int aimId = Integer.parseInt(id);
        Integer size =  personService.deletePerson(aimId);
        if(size == 0) {
            return ResponseResult.getFailResponse();
        }
//        Person person = new Person();
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setMsg("删除成功");
        ret.setData(id);
        return ret;
    }
    @ApiOperation(value = "修改人物", httpMethod = "POST", notes = "修改人物")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseResult update(@RequestBody Person person) {
        Integer size = personService.updatePerson(person);
        if(size == 0) {
            return ResponseResult.getFailResponse();
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(person.getId());
        return ret;
    }
    @ApiOperation(value = "查询所有人物列表", httpMethod = "GET", notes = "查询所有人物列表")
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
    public ResponseResult selectAll() {
        List<Person> personList = personService.selectAllPerson();
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(personList);
        return ret;
    }
    @ApiOperation(value = "查询单个人物", httpMethod = "GET", notes = "查询单个人物")
    @RequestMapping(value = "/selectSimple", method = RequestMethod.GET)
    public ResponseResult selectSimple(@RequestParam("id") String id) {
        int aimId = Integer.parseInt(id);
        Person person = personService.selectPerson(aimId);
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(person);
        return ret;
    }

}
