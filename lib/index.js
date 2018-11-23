var babel = require('babel-core');
var types = require('babel-types');

//Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

const visitor = {//访问者中 获取抽象语法树的 函数会在解析和转换时分别进入一次 
    // 对import转码
    ImportDeclaration(path, state = {opts:{}}){
        const specifiers = path.node.specifiers;
        const source = path.node.source;
        // 只有libraryName满足才会转码
        if (state.opts.libraryName == source.value && (!types.isImportDefaultSpecifier(specifiers[0])) ) { //state.opts是传进来的参数
            var declarations = specifiers.map((specifier) => {      //遍历 所又通过{ isEqual } 这种方式引入声明 
                return types.ImportDeclaration(                         //创建importImportDeclaration节点
                    [types.importDefaultSpecifier(specifier.local)],
                    types.StringLiteral(`${source.value}/${specifier.local.name}`)
                )
            })
            path.replaceWithMultiple(declarations)    //转换ast（抽象语法树）
        }
    }

};
module.exports = function (babel) {
    return {
        visitor
    };
}
