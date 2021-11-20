var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option("babel"); // This method adds support for a `--babel` flag
  }

  async initPackage() {
    let answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname, // Default to current folder name
      },
    ]);
    const pkgJson = {
      name: answers.name,
      version: "1.0.0",
      description: "",
      main: "generators/app/index.js",
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: "",
      license: "ISC",
      dependencies: {},
      devDependencies: {},
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.npmInstall(["vue"], { "save-dev": false });
    this.npmInstall(
      [
        "webpack",
        "webpack-cli",
        "vue-template-compiler",
        "vue-loader",
        "vue-style-loader",
        "css-loader",
        "copy-webpack-plugin",
      ],
      {
        "save-dev": true,
      }
    ); // TODO: 5版本有问题， this.npmInstall is not a function， 初步判断是extendJSON的时候就已经安装了依赖
    // this.spawnCommand("npm", ["i", "vue"], { "save-dev": false });
    // this.spawnCommand("npm", ["i"], {
    //   "save-dev": true,
    // });

    this.fs.copyTpl(
      this.templatePath("HelloWorld.vue"),
      this.destinationPath("src/HelloWorld.vue"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("src/main.js"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("src/index.html"),
      { title: answers.name }
    );
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore"),
      {}
    );
  }
};
