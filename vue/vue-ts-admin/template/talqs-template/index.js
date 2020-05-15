/* eslint-disable no-undef */
// 数据为测试数据，请勿放在项目中使用
const data = {
  queId: 'c6046091c0604c64ec',
  subjectName: '英语',
  subjectId: '3',
  gradeGroupName: '初中',
  gradeGroupId: '2',
  logicQuesTypeName: '单选',
  logicQuesTypeId: '1',
  writtenQuesTypeName: '阅读理解',
  writtenQuesTypeId: '13f97b02f7e4f2c9d35ec1af3c2d1057',
  difficulty: 2,
  content:
    '<p>Ken&#39;s father thinks it&#39;s&nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>&nbsp;for Ken to start swimming.</p>',
  answer: [['D']],
  analysis: [
    '<p>细节题。由第一列第五框第二句 &quot;My dad thinks I started too late and I&#39;ll never be able to make it.&quot; 可知。故选D。</p>'
  ],
  queSource: '北京卷2020',
  answerOptionList: [
    [{ aoVal: 'A', content: 'early' }],
    [{ aoVal: 'B', content: 'hard' }],
    [{ aoVal: 'C', content: 'impossible' }],
    [{ aoVal: 'D', content: 'late' }]
  ],
  isCloze: 0,
  modifyDate: '2017-06-02 11:43:12',
  score: 0,
  childList: null,
  keyWord: '吃饭;睡觉;'
}
// 取出试题数据
const queData = data
// 获取 dom 根节点
const app = document.getElementById('app')

// 注册 helper
TalqsTemplate.registerHelper('formatDifficulty', function(
  difficulty,
  template
) {
  difficulty = parseInt(difficulty, 10) || 0
  let output = ''
  for (let i = 0; i < difficulty; i++) {
    output += template
  }
  return output
})

// 试题难度组件模板
const questionDifficulty = `
{{if !isSub && !config.hideDifficulty}}
  {{#data.difficulty | formatDifficulty:'♥'}}
{{/if}}
`

// 内置组件列表
const talComponents = TalqsTemplate.components

// // 覆盖内置组件
// TalqsTemplate.updateTemplateList({
//   [talComponents.StemsWrapper]: {
//     components: [
//       {
//         name: talComponents.Difficulty,
//         template: questionDifficulty
//       }
//     ]
//   },
//   [talComponents.AnalyzeWrapper]: {
//     exclude: [talComponents.QueID] // 移除试题 ID
//   }
// })
// 添加自定义模版
TalqsTemplate.updateTemplateList({
  [talComponents.StemsWrapper]: {
    components: [
      {
        name: talComponents.Difficulty,
        template: questionDifficulty
      }
    ]
  },
  [talComponents.AnalyzeWrapper]: {
    exclude: [talComponents.QueID], // 移除试题 ID 组件
    components: [
      {
        // 添加试题标签到末尾
        name: 'questionLabel',
        template: document.getElementById('questionLabel').innerHTML
      }
      //   {
      //     // 添加到指定位置，第 4 个呈现
      //     name: 'questionOrganization',
      //     template: questionOrganization,
      //     index: 3
      //   },
      //   {
      //     // 覆盖内置的答案模板
      //     name: talComponents.Answer,
      //     template: questionAnswer
      //   }
    ]
  }
})

// 渲染试题
const renderQS = function() {
  app.innerHTML = TalqsTemplate.render(queData, {
    queIndex: 1, // 一般这里是一个计数器
    hideSource: false, // 隐藏来源
    hideDifficulty: false, // 隐藏难度
    analyzeVersion: 2, // 0,1,2 显示解析
    labels: {
      answer: '正确答案：',
      analyze: '我是自定义的文字'
    }
  })
  TalqsTemplate.autoLayout()
}
renderQS()
