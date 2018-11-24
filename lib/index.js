//babel 核心库 实现核心的转换引擎
var babel = require('babel-core');
//可以实现类型判断  生成AST部分
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

// babel.transform(code,{
//     plugins:[
//         visitor
//     ]
// })

//参考文献
//  代码转换：
//https://www.npmjs.com/package/esprima .  符合标准的ECMAScript 解析器

// https://www.npmjs.com/package/estraverse   ECMAScript JS AST遍历函数

// https://www.npmjs.com/package/escodegen   代码生成器

//bebel 转换  
 
//https://astexplorer.net/   查看代码的ast

//https://www.npmjs.com/package/babel-types   搜索想要得到的类型声明语句

