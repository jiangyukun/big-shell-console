/**
 * Created by jiangyukun on 2017/11/23.
 */
let babel = require('babel-core')

function plugin_1(babel) {
  console.log(1)
  return {
    visitor: {
      VariableDeclaration: (path) => {
        // console.log(babel.types)
        // console.log(path)
      }
    }
  }
}

babel.transformFile('./class.js', {
  babelrc: false,
  plugins: [plugin_1]
}, (err, result) => {
  console.log(result.code)
})
