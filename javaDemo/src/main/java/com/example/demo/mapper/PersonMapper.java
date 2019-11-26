package com.example.demo.mapper;

import com.example.demo.entity.Person;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xiaozhu on 2019/11/22.
 */
@Repository
public interface PersonMapper {
//  @ResultMap("com.example.demo.mapper.PersonMapper")
    Integer insertPerson(Person person); // 新增
    Integer deletePerson(Integer id);
    Integer updatePerson(Person person);
    Person selectPerson(Integer id);
    List<Person> selectAllPerson();
}
