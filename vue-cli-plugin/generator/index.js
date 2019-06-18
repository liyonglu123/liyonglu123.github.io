module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        dependencies: {
            'vue-ld': '^1.0.0',
        },
    });
    let rxLines = `\nimport VueLd from 'vue-ld';\n\nVue.use(VueLd);`;
    api.onCreateComplete(() => {
        const fs = require('fs');
        const mainPath = api.resolve('./src/main.js');
        // 获取内容
        let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g).reverse();
        // 注入import
        const lastImportIndex = lines.findIndex(line => line.match(/^import/));
        lines[lastImportIndex] += rxLines;
        // 修改应用
        contentMain = lines.reverse().join('\n');
        fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
    });
}