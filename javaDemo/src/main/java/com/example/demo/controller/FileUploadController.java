package com.example.demo.controller;

import com.example.demo.utils.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * 文件的上传接口
 * Created by xiaozhu on 2019/12/11.
 */
@Api(value = "fileUploadController", description = "文件上传")
@RestController
@RequestMapping("/file")
public class FileUploadController {
    @ApiOperation(value = "文件上传", httpMethod = "POST", notes = "文件上传")
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseResult singleFileUpload(@RequestParam("file")MultipartFile file) {
        ResponseResult ret = null;
        // 判断文件是否为空
        if(file.isEmpty()) {
            ret = ResponseResult.getFailResponse();
            ret.setMsg("文件为空,上传失败!");
            return ret;
        }
        try{
            // 获取文件的字节流
            byte[] bytes = file.getBytes();
            String FILE_DIR = "D://upload";
            // 获得path对象，也即是文件保存的路径对象
            Path path = Paths.get(FILE_DIR + file.getOriginalFilename());
            //调用静态方法完成将文件写入到目标路径
            Files.write(path, bytes);
            ret = ResponseResult.getSuccessResponse();
            ret.setMsg("文件上传成功!");
            return ret;

        }catch (Exception e){
            e.printStackTrace();
        }
        return ret;
    }
    @ApiOperation(value = "文件下载", httpMethod = "GET", notes = "文件下载")
    @RequestMapping(value="/download",method = RequestMethod.GET)
    public void download( HttpServletResponse response){
        //要上传的文件名字
        String FILE_DIR = "D://upload";
        String fileName="com.seven.xuanshang.apk";
        //通过文件的保存文件夹路径加上文件的名字来获得文件
        File file=new File(FILE_DIR,fileName);
        //当文件存在
        if(file.exists()){
            //首先设置响应的内容格式是force-download，那么你一旦点击下载按钮就会自动下载文件了
            response.setContentType("application/force-download");
            //通过设置头信息给文件命名，也即是，在前端，文件流被接受完还原成原文件的时候会以你传递的文件名来命名
            response.addHeader("Content-Disposition",String.format("attachment; filename=\"%s\"", file.getName()));
            //进行读写操作
            byte[]buffer=new byte[1024];
            FileInputStream fis=null;
            BufferedInputStream bis=null;
            try{
                fis= new FileInputStream(file);
                bis=new BufferedInputStream(fis);
                OutputStream os=response.getOutputStream();
                //从源文件中读
                int i=bis.read(buffer);
                while(i!=-1){
                    //写到response的输出流中
                    os.write(buffer,0,i);
                    i=bis.read(buffer);
                }
            }catch (IOException e){
                e.printStackTrace();
            } finally {
                //善后工作，关闭各种流
                try {
                    if(bis!=null){
                        bis.close();
                    }
                    if(fis!=null){
                        fis.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }
}
