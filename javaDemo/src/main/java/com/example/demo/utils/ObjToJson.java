package com.example.demo.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * Created by xiaozhu on 2019/12/10.
 */
public class ObjToJson {
    public static String toJsonString(Object o) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        mapper.configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
        try {
            String e = mapper.writeValueAsString(o);
            return e;
        } catch (JsonProcessingException var3) {
            var3.printStackTrace();
            return null;
        }
    }
}
