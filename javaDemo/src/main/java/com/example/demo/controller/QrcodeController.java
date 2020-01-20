package com.example.demo.controller;

import com.example.demo.utils.QRCodeUtil;
import com.example.demo.utils.QrCodeUtils1;
import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.OutputStream;

/**
 * Created by xiaozhu on 2019/12/12.
 */
@Api(value = "QrcodeController", description = "生成二维码")
@RestController
public class QrcodeController {
    /**
     * 根据 url 生成 普通二维码
     */
    @RequestMapping(value = "/createCommonQRCode")
    public void createCommonQRCode(HttpServletResponse response, String url) throws Exception {
        ServletOutputStream stream = null;
        // http://localhost:8080/createCommonQRCode?url=http://www.baidu.com
        try {
            stream = response.getOutputStream();
            //使用工具类生成二维码
            QRCodeUtil.encode(url, stream);
        } catch (Exception e) {
            e.getStackTrace();
        } finally {
            if (stream != null) {
                stream.flush();
                stream.close();
            }
        }
    }

    /**
     * 根据 url 生成 带有logo二维码
     */
    @RequestMapping(value = "/createLogoQRCode")
    public void createLogoQRCode(HttpServletResponse response, String url) throws Exception {
        ServletOutputStream stream = null;
        // http://localhost:8080/createLogoQRCode?url=http://www.baidu.com
        try {
            stream = response.getOutputStream();
//            String logoPath = Thread.currentThread().getContextClassLoader().getResource("").getPath()
//                    + "static" + File.separator + "logo.jpg";
            String logoPath = "src/main/resources/image/image.jpg";
            //使用工具类生成二维码
            QRCodeUtil.encode(url, logoPath, stream, true);
        } catch (Exception e) {
            e.getStackTrace();
        } finally {
            if (stream != null) {
                stream.flush();
                stream.close();
            }
        }
    }
}
