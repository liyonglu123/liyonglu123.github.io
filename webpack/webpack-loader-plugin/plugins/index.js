//  构建文件列表 markdown
class FileListPlugin {
  constructor(options) {
    // 读取 plugin 实例化时传入的配置
  }
  apply(compiler) {
    // 在 compiler 的 emit hook 中注册一个方法，当 webpack 执行到该阶段时会调用这个方法
    compiler.hooks.emit.tap("FileListPlugin", (compilation) => {
      // 给生成的 markdown 文件创建一个简单标题
      var filelist = "title\n\n";

      // 遍历所有编译后的资源，每一个文件添加一行说明
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }

      // 将列表作为一个新的文件资源插入到 webpack 构建结果中
      compilation.assets["filelist.md"] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
