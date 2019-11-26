package com.example.demo.service;

import com.example.demo.entity.Person;
import org.hibernate.validator.constraints.pl.REGON;

import java.util.List;

/**
 * Created by xiaozhu on 2019/11/22.
 */
public interface PersonService {
    Integer insertPerson(Person person);
    Integer deletePerson(Integer id);
    Integer updatePerson(Person person);
    Person selectPerson(Integer id);
    List<Person> selectAllPerson();

}
