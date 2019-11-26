package com.example.demo.service.impl;

import com.example.demo.entity.Person;
import com.example.demo.mapper.PersonMapper;
import com.example.demo.service.PersonService;
import com.example.demo.utils.CustomerException;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaozhu on 2019/11/22.
 */
@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    @Resource
    private PersonMapper personMapper;
    //    @Override
//    新增
    public Integer insertPerson(Person person) {
        return  personMapper.insertPerson(person);
     // return person.getId();
    }
//    删除
    public Integer deletePerson(Integer id) {
        if(id == null){
            throw new CustomerException("参数错误!");
        }
        return personMapper.deletePerson(id);
    }
//    修改
    public Integer updatePerson(Person person) {
        if(person.getId() == null){
            throw new CustomerException("没有该对象!");
        }
        return personMapper.updatePerson(person);
    }
//    查询所有数据
    public List<Person> selectAllPerson() {
        return personMapper.selectAllPerson();
    }
//    查询详情
    public Person selectPerson(Integer id) {
        return personMapper.selectPerson(id);
    }
}
