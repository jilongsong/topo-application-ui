module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'update', // 更新功能
        'fix', // 修复BUG
        'refactor', // 重构
        'style', // 代码格式化
        'docs', // 仅文档修改
        'chore', // 其他修改，比如构建流程，增加依赖库
        'build', // 编译相关修改，例如：发布版本，项目构建或依赖改动
        'test', // 增加测试用例
        'perf', // 优化相关修改，例如：提升性能、体验
      ],
    ],
  },
};
