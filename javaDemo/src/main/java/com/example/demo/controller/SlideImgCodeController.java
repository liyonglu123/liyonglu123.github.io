package com.example.demo.controller;

import com.example.demo.utils.ResponseResult;
import com.example.demo.utils.SlideImgCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 自定义滑块验证
 * Created by xiaozhu on 2019/12/3.
 */
@Api(value = "slideImgCodeController", description = "滑块验证")
@RestController
public class SlideImgCodeController {
    @ApiOperation(value = "滑块验证", httpMethod = "GET", notes = "滑块验证")
    @RequestMapping(value = "/getImageVerifyCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult getImageVerifyCode(HttpSession session) {
        Map<String, Object> resultMap = new HashMap<>();
        // 读取本地路径下的图片,随机选一条
        // getClass() 本类和 getClassLoader()
//        File file = new File(this.getClass().getResource("../../resources/image/a.jpg").getPath());  // 这样读取有问题
        File file = new File("src/main/resources/image");
        File[] files = file.listFiles();
        int n = new Random().nextInt(files.length);
        File imageUrl = files[n];
        SlideImgCode.createImage(imageUrl, resultMap);
        //读取网络图片
//        SlideImgCode.createImage("http://img.taopic.com/uploads/allimg/130417/240451-13041FF15944.jpg",resultMap);
        // 最好是采用redis进行数据的存储和使用
        session.setAttribute("xWidth", resultMap.get("xWidth"));
        resultMap.remove("xWidth");
        resultMap.put("errcode", 0);
        resultMap.put("errmsg", "success");
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(resultMap);
        return ret;
    }

    /**
     * 校验滑块拼图验证码
     * @param moveLength
     * @return
     */
    @ApiOperation(value = "校验滑块验证", httpMethod = "GET", notes = "校验滑块验证")
    @RequestMapping(value = "/verifyImageCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult verifyImageCode(@RequestParam(value = "moveLength") String moveLength, HttpSession session) {
        Double dMoveLength = Double.valueOf(moveLength);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Integer xWidth = (Integer) session.getAttribute("xWidth");
            if (xWidth == null) {
                resultMap.put("errcode", 1);
                resultMap.put("errmsg", "验证过期，请重试");
                ResponseResult ret = ResponseResult.getFailResponse();
                ret.setData(resultMap);
                return ret;
            }
            if (Math.abs(xWidth - dMoveLength) > 10) {
                resultMap.put("errcode", 1);
                resultMap.put("errmsg", "验证不通过");
            } else {
                resultMap.put("errcode", 0);
                resultMap.put("errmsg", "验证通过");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } finally {
            // 清楚session的缓存信息
            session.removeAttribute("xWidth");
        }
        ResponseResult ret = ResponseResult.getSuccessResponse();
        ret.setData(resultMap);
        return ret;
    }
}
