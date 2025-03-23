import React from 'react';
import { FileText, ChevronRight, Clock, BookOpen, Edit, Database, LineChart, CheckSquare, MessageSquare, Check, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DemoPageProps {
  lang: 'en' | 'zh';
}

const translations = {
  en: {
    title: 'DeepChat Usage Scenarios',
    subtitle: 'Explore how DeepChat enhances your productivity across different work scenarios',
    videoButton: 'Watch Demo Video',
    categories: {
      office: {
        title: 'Office & Productivity',
        description: 'Streamline your daily office tasks with AI assistance'
      },
      creative: {
        title: 'Creative Work',
        description: 'Boost your creative process with intelligent suggestions'
      },
      research: {
        title: 'Research & Analysis',
        description: 'Dive deeper into data and knowledge with powerful AI tools'
      },
      team: {
        title: 'Team Collaboration',
        description: 'Enhance team productivity and communication'
      }
    },
    scenarios: [
      {
        category: 'office',
        title: 'Document Processing',
        description: 'Automatically extract, summarize and organize information from various document formats',
        icon: FileText,
        features: [
          'Extract key information from PDFs, Word documents and presentations',
          'Generate concise summaries of lengthy documents',
          'Convert unstructured data into structured formats',
          'Translate documents between multiple languages'
        ],
        caseSample: 'A marketing manager needs to review 20 customer feedback reports. DeepChat quickly extracts the key sentiment and suggestions from each report, saving hours of manual reading.',
        videoUrl: 'https://www.youtube.com/watch?v=example1'
      },
      {
        category: 'office',
        title: 'Meeting Assistant',
        description: 'Get more out of your meetings with AI-powered assistance',
        icon: Clock,
        features: [
          'Generate meeting agendas based on previous discussions',
          'Transcribe and summarize meeting content in real-time',
          'Create action item lists with assigned responsibilities',
          'Follow up on pending items from previous meetings'
        ],
        caseSample: 'During a project planning meeting, DeepChat transcribes the discussion and automatically creates a list of action items with deadlines, which is sent to all participants.',
        videoUrl: 'https://www.youtube.com/watch?v=example2'
      },
      {
        category: 'creative',
        title: 'Content Creation',
        description: 'Create compelling content with AI-powered suggestions and enhancements',
        icon: Edit,
        features: [
          'Generate outlines for articles, reports, and presentations',
          'Suggest improvements for clarity, engagement, and tone',
          'Create variations of content for different audiences',
          'Assist with grammar, style, and formatting'
        ],
        caseSample: 'A content writer drafting blog posts uses DeepChat to generate multiple headline options and suggest structural improvements for better engagement.',
        videoUrl: 'https://www.youtube.com/watch?v=example3'
      },
      {
        category: 'creative',
        title: 'Learning & Education',
        description: 'Accelerate learning and education with personalized AI assistance',
        icon: BookOpen,
        features: [
          'Create personalized learning materials',
          'Generate practice exercises and quizzes',
          'Provide explanations for complex concepts',
          'Suggest learning paths based on interests and goals'
        ],
        caseSample: 'A teacher uses DeepChat to create customized practice problems for students with different learning needs, adapting the difficulty level for each student.',
        videoUrl: 'https://www.youtube.com/watch?v=example4'
      },
      {
        category: 'research',
        title: 'Data Analysis',
        description: 'Uncover insights from your data with powerful AI analysis tools',
        icon: Database,
        features: [
          'Analyze datasets to identify patterns and trends',
          'Generate visualizations of complex data',
          'Suggest statistical approaches for different data types',
          'Explain data findings in simple language'
        ],
        caseSample: "A business analyst uploads sales data to DeepChat, which quickly identifies seasonal trends and customer segments that weren't previously apparent.",
        videoUrl: 'https://www.youtube.com/watch?v=example5'
      },
      {
        category: 'research',
        title: 'Market Research',
        description: 'Stay ahead of market trends with AI-powered research assistance',
        icon: LineChart,
        features: [
          'Aggregate and analyze industry reports and news',
          'Identify emerging trends and competitive movements',
          'Generate competitive analysis reports',
          'Summarize market conditions for different regions'
        ],
        caseSample: 'A product manager uses DeepChat to analyze recent industry developments, helping to identify a market gap that leads to a successful new product feature.',
        videoUrl: 'https://www.youtube.com/watch?v=example6'
      },
      {
        category: 'team',
        title: 'Project Management',
        description: 'Keep projects on track with intelligent project management assistance',
        icon: CheckSquare,
        features: [
          'Generate project timelines and milestones',
          'Track progress and flag potential delays',
          'Suggest resource allocation optimizations',
          'Create status reports for stakeholders'
        ],
        caseSample: 'A project manager uses DeepChat to analyze the current project status, identify potential bottlenecks, and suggest task redistributions to meet the deadline.',
        videoUrl: 'https://www.youtube.com/watch?v=example7'
      },
      {
        category: 'team',
        title: 'Team Communication',
        description: 'Enhance team communication with AI-powered assistance',
        icon: MessageSquare,
        features: [
          'Draft professional emails and communications',
          'Summarize lengthy email threads and discussions',
          'Suggest responses to common queries',
          'Facilitate cross-language team communication'
        ],
        caseSample: 'A multinational team uses DeepChat to facilitate communication between members speaking different languages, providing real-time translation during virtual meetings.',
        videoUrl: 'https://www.youtube.com/watch?v=example8'
      }
    ]
  },
  zh: {
    title: 'DeepChat 应用场景',
    subtitle: '探索 DeepChat 如何在不同工作场景中提升您的工作效率',
    videoButton: '观看演示视频',
    categories: {
      office: {
        title: '办公与效率',
        description: '通过AI助手优化您的日常办公任务'
      },
      creative: {
        title: '创意工作',
        description: '借助智能化建议提升您的创作过程'
      },
      research: {
        title: '研究与分析',
        description: '利用强大的AI工具深入挖掘数据和知识'
      },
      team: {
        title: '团队协作',
        description: '提升团队生产力和沟通效率'
      }
    },
    scenarios: [
      {
        category: 'office',
        title: '文档处理',
        description: '自动从各种文档格式中提取、总结和组织信息',
        icon: FileText,
        features: [
          '从PDF、Word文档和演示文稿中提取关键信息',
          '为冗长文档生成简洁摘要',
          '将非结构化数据转换为结构化格式',
          '在多种语言之间翻译文档'
        ],
        caseSample: '一位市场经理需要审阅20份客户反馈报告。DeepChat快速提取每份报告中的关键情感和建议，节省了数小时的人工阅读时间。',
        videoUrl: 'https://www.bilibili.com/video/BVexample1'
      },
      {
        category: 'office',
        title: '会议助手',
        description: '通过AI驱动的助手充分利用您的会议时间',
        icon: Clock,
        features: [
          '根据以往讨论生成会议议程',
          '实时转录和总结会议内容',
          '创建带有责任分配的行动项目列表',
          '跟进上次会议的待办事项'
        ],
        caseSample: '在项目规划会议中，DeepChat转录讨论内容并自动创建带有截止日期的行动项目列表，并发送给所有参与者。',
        videoUrl: 'https://www.bilibili.com/video/BVexample2'
      },
      {
        category: 'creative',
        title: '内容创作',
        description: '借助AI驱动的建议和增强功能创建引人入胜的内容',
        icon: Edit,
        features: [
          '为文章、报告和演示文稿生成大纲',
          '提供清晰度、参与度和语调方面的改进建议',
          '为不同受众创建内容变体',
          '协助语法、风格和格式调整'
        ],
        caseSample: '一位撰写博客文章的内容创作者使用DeepChat生成多个标题选项，并提出结构改进建议，以提高读者参与度。',
        videoUrl: 'https://www.bilibili.com/video/BVexample3'
      },
      {
        category: 'creative',
        title: '学习与教育',
        description: '通过个性化AI辅助加速学习和教育',
        icon: BookOpen,
        features: [
          '创建个性化学习材料',
          '生成练习和测验',
          '提供复杂概念的解释',
          '根据兴趣和目标建议学习路径'
        ],
        caseSample: '一位教师使用DeepChat为不同学习需求的学生创建定制练习题，为每个学生调整难度级别。',
        videoUrl: 'https://www.bilibili.com/video/BVexample4'
      },
      {
        category: 'research',
        title: '数据分析',
        description: '利用强大的AI分析工具从数据中发现洞见',
        icon: Database,
        features: [
          '分析数据集以识别模式和趋势',
          '生成复杂数据的可视化',
          '为不同数据类型建议统计方法',
          '用简单语言解释数据发现'
        ],
        caseSample: '一位业务分析师上传销售数据到DeepChat，系统快速识别出此前未发现的季节性趋势和客户细分。',
        videoUrl: 'https://www.bilibili.com/video/BVexample5'
      },
      {
        category: 'research',
        title: '市场研究',
        description: '借助AI驱动的研究助手掌握市场趋势',
        icon: LineChart,
        features: [
          '聚合和分析行业报告和新闻',
          '识别新兴趋势和竞争动态',
          '生成竞争分析报告',
          '总结不同地区的市场状况'
        ],
        caseSample: '一位产品经理使用DeepChat分析最近的行业发展，帮助识别市场空白，从而开发出成功的新产品特性。',
        videoUrl: 'https://www.bilibili.com/video/BVexample6'
      },
      {
        category: 'team',
        title: '项目管理',
        description: '通过智能项目管理助手保持项目进度',
        icon: CheckSquare,
        features: [
          '生成项目时间线和里程碑',
          '跟踪进度并标记潜在延迟',
          '建议资源分配优化',
          '为利益相关者创建状态报告'
        ],
        caseSample: '一位项目经理使用DeepChat分析当前项目状态，识别潜在瓶颈，并建议任务重新分配以满足截止日期。',
        videoUrl: 'https://www.bilibili.com/video/BVexample7'
      },
      {
        category: 'team',
        title: '团队沟通',
        description: '通过AI驱动的助手增强团队沟通',
        icon: MessageSquare,
        features: [
          '起草专业电子邮件和通信',
          '总结冗长的电子邮件线程和讨论',
          '对常见查询提出回应建议',
          '促进跨语言团队沟通'
        ],
        caseSample: '一个跨国团队使用DeepChat促进不同语言成员之间的沟通，在虚拟会议期间提供实时翻译。',
        videoUrl: 'https://www.bilibili.com/video/BVexample8'
      }
    ]
  }
};

function DemoPage({ lang }: DemoPageProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('office');
  const t = translations[lang];

  // 获取当前类别的场景
  const filteredScenarios = t.scenarios.filter(scenario => scenario.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
          {t.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* 类别选择器 */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(t.categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`p-6 rounded-xl border transition-all ${
                activeCategory === key
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700'
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${
                activeCategory === key ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
              }`}>
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 场景卡片 */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredScenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div key={index} className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {scenario.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {scenario.description}
                </p>
                
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  {lang === 'en' ? 'Key Features:' : '主要功能：'}
                </h4>
                <ul className="space-y-2 mb-6">
                  {scenario.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800/30 mb-4">
                  <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-2">
                    {lang === 'en' ? 'Use Case Example:' : '使用案例示例：'}
                  </h4>
                  <p className="text-gray-600 dark:text-indigo-100/70 text-sm italic">
                    {scenario.caseSample}
                  </p>
                </div>
                
                {/* 视频链接按钮 */}
                <a 
                  href={scenario.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors w-full justify-center"
                >
                  <Play className="w-4 h-4" />
                  <span>{t.videoButton}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA 区域 */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {lang === 'en' ? 'Ready to enhance your productivity?' : '准备好提升您的工作效率了吗？'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {lang === 'en'
            ? 'Download DeepChat today and experience the power of AI in your daily work.'
            : '立即下载 DeepChat，体验 AI 在日常工作中的强大功能。'}
        </p>
        <Link
          to="/download"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>{lang === 'en' ? 'Download Now' : '立即下载'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default DemoPage; 