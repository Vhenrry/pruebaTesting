// module.exports = {
//   default: '--require-module ts-node/register --require features/**/*.ts --require "features/**/*.steps.ts"',
//   stepDefinitions: ''
// }


// module.exports = {
//   default: {
//     require: ["./features/**/*.steps.ts"],
//     paths: ["./features/**/*.feature"],
//     format: ["pretty"],
//     publishQuiet: true
//   }
// };


module.exports = {
  default: {
    require: ["ts-node/register", "./features/**/*.steps.ts"], // Asegúrate de incluir 'ts-node/register'
    paths: ["./features/**/*.feature"],
    format: ["pretty"],
    publishQuiet: true
  }
};
