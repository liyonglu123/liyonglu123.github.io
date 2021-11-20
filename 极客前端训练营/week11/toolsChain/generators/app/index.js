var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option("babel"); // This method adds support for a `--babel` flag
  }
  // async method1() {
  //   const answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Your project name",
  //       default: this.appname, // Default to current folder name
  //     },
  //     {
  //       type: "confirm",
  //       name: "cool",
  //       message: "Would you like to enable the Cool feature?",
  //     },
  //   ]);
  //   this.log("method 1 just ran");
  //   this.log("app name", answers.name);
  //   this.log("cool feature", answers.cool);
  // }
  async step1() {
    this.fs.copyTpl(
      this.templatePath("t.html"),
      this.destinationPath("public/index.html"),
      { title: "Templating with Yeoman" }
    );
  }

  initPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: "^3.15.0",
      },
      dependencies: {
        react: "^16.2.0",
      },
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    // this.npmInstall(); this.npmInstall is not a function， 初步判断是extendJSON的时候就已经安装了依赖
  }
};
