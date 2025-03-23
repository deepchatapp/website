import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, Globe, Shield, Database, Lock, Bot, Check, Building2 } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DownloadPage from './components/DownloadPage';
import Layout from './components/Layout';
import ContactPage from './components/ContactPage';
import DocsPage from './components/DocsPage';
import DemoPage from './components/DemoPage';
import { ThemeProvider } from './contexts/ThemeContext';

const translations = {
  en: {
    nav: {
      home: 'Home',
      download: 'Download',
      demos: 'Use Cases',
      docs: {
        title: 'Docs',
        items: [
          { title: 'DeepChat Introduction', href: '/docs/intro' },
          { title: 'Quick Start', href: '/docs/quickstart' },
          { title: 'User Guide', href: '/docs/guide' },
          { title: 'Model Configuration', href: '/docs/models' },
          { title: 'FAQ & Troubleshooting', href: '/docs/faq' }
        ]
      },
      contact: 'Contact'
    },
    hero: {
      title: 'DeepChat - Your AI Partner on Desktop',
      subtitle: 'Fast, focused, and designed for deep work. DeepChat brings the power of AI to your desktop with privacy and efficiency, making it your ideal companion for productive work.',
      features: [
        'Lightning Fast Response - Native app performance for seamless interaction',
        'Deep Work Focus - Designed for productive, distraction-free work sessions',
        'Privacy First - Local processing and secure data handling'
      ],
      tryButton: 'Start Your Journey',
      watchDemo: 'Watch Demo',
    },
    modelProviders: {
      title: 'Currently Supported Model Providers',
      subtitle: 'DeepChat is compatible with all major AI model providers',
      compatibleText: 'Compatible with any model provider in openai/gemini API format',
      providers: [
        { name: 'Ollama', logo: '/models/ollama.svg' },
        { name: 'Deepseek', logo: '/models/deepseek.svg' },
        { name: 'Silicon', logo: '/models/silicon.svg' },
        { name: 'QwenLM', logo: '/models/qwenlm.svg' },
        { name: 'Doubao', logo: '/models/doubao.svg' },
        { name: 'MiniMax', logo: '/models/minimax.svg' },
        { name: 'Fireworks', logo: '/models/fireworks.svg' },
        { name: 'PPIO', logo: '/models/ppio.svg' },
        { name: 'OpenAI', logo: '/models/openai.svg' },
        { name: 'Gemini', logo: '/models/gemini.svg' },
        { name: 'GitHub Models', logo: '/models/github.svg' },
        { name: 'Moonshot', logo: '/models/moonshot.svg' },
        { name: 'OpenRouter', logo: '/models/openrouter.svg' },
        { name: 'Azure OpenAI', logo: '/models/azure.svg' }
      ]
    },
    scenarios: {
      title: 'Dual Application Scenarios',
      subtitle: 'Intelligent Assistant Solutions for Individuals and Teams',
      tabs: {
        personal: 'Personal',
        enterprise: 'Enterprise'
      },
      personal: [
        {
          title: 'Document Processing & Analysis',
          description: 'Upload and process various documents for intelligent analysis, content extraction, and translation.',
          features: [
            'Excel Data Visualization',
            'PPT Content Extraction',
            'Document Translation'
          ],
          image: '/scenarios/knowledge-management.png'
        },
        {
          title: 'Personal AI Assistant',
          description: 'Your intelligent companion for knowledge acquisition, personal management, and work assistance.',
          features: [
            'Knowledge Q&A',
            'Schedule Management',
            'Task Assistance'
          ],
          image: '/scenarios/personal-efficiency.png'
        },
        {
          title: 'Learning Companion',
          description: 'Personalized learning plans, knowledge analysis, and practice generation for continuous improvement.',
          features: [
            'Personalized Learning Paths',
            'Concept Explanations',
            'Exercise Generation'
          ],
          image: '/scenarios/learning-assistant.png'
        },
        {
          title: 'Creative Assistant',
          description: 'Multi-scenario writing support to spark creativity and improve content quality across languages.',
          features: [
            'Multi-language Writing Aid',
            'Creative Inspiration',
            'Content Optimization'
          ],
          image: '/scenarios/creative-assistant.png'
        }
      ],
      enterprise: [
        {
          title: 'Enterprise Research & Market Analysis',
          description: 'Combine internal financial data with real-time market information to generate comprehensive market analysis reports and trend forecasts.',
          features: [
            'Integrated Data Analysis',
            'Trend Prediction Support',
            'Competitive Landscape Analysis'
          ],
          image: '/scenarios/team-collaboration.png'
        },
        {
          title: 'Regulatory Compliance Review',
          description: 'Smart comparison between internal policy documents and the latest online regulations to identify potential compliance risks.',
          features: [
            'Real-time Regulation Updates',
            'Compliance Gap Analysis',
            'Risk Control Recommendations'
          ],
          image: '/scenarios/business-process.png'
        },
        {
          title: 'Intelligent Market Intelligence',
          description: 'Integrate internal competitive intelligence with online latest developments to provide comprehensive market insights and opportunity identification.',
          features: [
            'Real-time Competitor Tracking',
            'Consumer Insight Analysis',
            'Market Opportunity Identification'
          ],
          image: '/scenarios/dev-efficiency.png'
        },
        {
          title: 'Multi-source Data Reports',
          description: 'Combine internal operational data with external market indicators to automatically generate periodic comprehensive reports and personalized dashboards.',
          features: [
            'Automated Periodic Reports',
            'Personalized Data Dashboards',
            'Anomaly & Opportunity Alerts'
          ],
          image: '/scenarios/customer-service.png'
        }
      ]
    },
    features: {
      title: 'Core Advantages',
      subtitle: 'Powerful Features for Enhanced AI Experience',
      cards: [
        {
          icon: Globe,
          title: 'Web Search Integration',
          description: 'Access real-time information with integrated web search capabilities and customizable search engines including academic search support.',
          action: 'Learn More',
        },
        {
          icon: FileText,
          title: 'Document Processing',
          description: 'Upload and process multiple documents simultaneously with intelligent analysis, extraction, and translation capabilities.',
          action: 'Learn More',
        },
        {
          icon: Bot,
          title: 'MCP Integration',
          description: 'Leverage Model Control Protocol for seamless integration with various AI models and expanded capabilities.',
          action: 'Learn More',
        },
        {
          icon: Database,
          title: 'Multi-Model Support',
          description: 'Support for multiple AI models including GPT, Claude, DeepSeek, and more, with automatic model selection based on task requirements.',
          action: 'Learn More',
        },
      ],
    },
    privacy: {
      title: 'Your Trusted Guardian',
      features: {
        offline: {
          title: 'Completely Local',
          description: 'All conversations and data processing happen on your device, ensuring absolute privacy.',
        },
        encrypted: {
          title: 'Strict Protection',
          description: 'Advanced encryption technology keeps every piece of your information safe and secure.',
        },
        control: {
          title: 'Full Autonomy',
          description: 'You have complete control over your data usage and storage, ensuring peace of mind.',
        },
      },
    },
    footer: {
      rights: '© 2024 DeepChat. All rights reserved.',
    },
  },
  zh: {
    nav: {
      home: '首页',
      download: '下载',
      demos: '场景演示',
      docs: {
        title: '文档',
        items: [
          { title: 'DeepChat 介绍', href: '/docs/intro' },
          { title: '快速开始', href: '/docs/quickstart' },
          { title: '使用指南', href: '/docs/guide' },
          { title: '模型配置', href: '/docs/models' },
          { title: '常见问题', href: '/docs/faq' }
        ]
      },
      contact: '联系我们'
    },
    hero: {
      title: 'DeepChat - 您的桌面AI伙伴',
      subtitle: '快速、专注，为深度工作而设计。DeepChat将AI的强大功能带到您的桌面，兼顾隐私和效率，成为您高效工作的理想伴侣。',
      features: [
        '闪电般的响应速度 - 原生应用性能，实现无缝交互',
        '深度工作专注 - 为高效、无干扰工作环境而设计',
        '隐私优先 - 本地处理和安全数据处理'
      ],
      tryButton: '开始体验',
      watchDemo: '观看演示',
    },
    modelProviders: {
      title: '当前支持的模型提供商',
      subtitle: 'DeepChat兼容所有主流AI模型提供商',
      compatibleText: '兼容任何符合openai/gemini API格式的模型提供商',
      providers: [
        { name: 'Ollama', logo: '/models/ollama.svg' },
        { name: 'Deepseek', logo: '/models/deepseek.svg' },
        { name: 'Silicon', logo: '/models/silicon.svg' },
        { name: 'QwenLM', logo: '/models/qwenlm.svg' },
        { name: 'Doubao', logo: '/models/doubao.svg' },
        { name: 'MiniMax', logo: '/models/minimax.svg' },
        { name: 'Fireworks', logo: '/models/fireworks.svg' },
        { name: 'PPIO', logo: '/models/ppio.svg' },
        { name: 'OpenAI', logo: '/models/openai.svg' },
        { name: 'Gemini', logo: '/models/gemini.svg' },
        { name: 'GitHub Models', logo: '/models/github.svg' },
        { name: 'Moonshot', logo: '/models/moonshot.svg' },
        { name: 'OpenRouter', logo: '/models/openrouter.svg' },
        { name: 'Azure OpenAI', logo: '/models/azure.svg' }
      ]
    },
    scenarios: {
      title: '双重场景应用',
      subtitle: '个人与团队的智能助手解决方案',
      tabs: {
        personal: '个人场景',
        enterprise: '企业场景'
      },
      personal: [
        {
          title: '文档处理与分析',
          description: '上传并处理各类文档，实现智能分析、内容提取与翻译转换。',
          features: [
            'Excel数据可视化',
            'PPT内容提取整合',
            '文档翻译与本地化'
          ],
          image: '/scenarios/knowledge-management.png'
        },
        {
          title: '个人智能助理',
          description: '您的智能伙伴，提供知识获取、个人管理与工作辅助。',
          features: [
            '知识问答服务',
            '日程安排管理',
            '任务辅助处理'
          ],
          image: '/scenarios/personal-efficiency.png'
        },
        {
          title: '学习成长伴侣',
          description: '个性化学习规划、知识解析与练习生成，助力持续进步。',
          features: [
            '个性化学习路径',
            '概念深度解析',
            '智能练习生成'
          ],
          image: '/scenarios/learning-assistant.png'
        },
        {
          title: '创意创作助手',
          description: '提供多场景写作支持，激发创意灵感，跨语言提升内容质量。',
          features: [
            '多语言写作辅助',
            '创意灵感激发',
            '内容优化提升'
          ],
          image: '/scenarios/creative-assistant.png'
        }
      ],
      enterprise: [
        {
          title: '企业研报与市场分析',
          description: '结合内部财务数据与实时市场行情，生成全面的市场分析报告和趋势预测。',
          features: [
            '内外数据整合分析',
            '趋势预测与决策支持',
            '竞争格局智能分析'
          ],
          image: '/scenarios/team-collaboration.png'
        },
        {
          title: '法规合规审查与风险评估',
          description: '将企业内部政策文件与在线最新法规进行智能比对，识别潜在合规风险。',
          features: [
            '实时法规更新提醒',
            '合规差距智能分析',
            '风险控制建议生成'
          ],
          image: '/scenarios/business-process.png'
        },
        {
          title: '智能市场情报整合',
          description: '整合企业内部竞品档案与在线最新动态，提供全面的市场洞察与机会识别。',
          features: [
            '竞品动态实时追踪',
            '消费者洞察分析',
            '市场机会智能识别'
          ],
          image: '/scenarios/dev-efficiency.png'
        },
        {
          title: '多源数据智能报告',
          description: '结合内部运营数据与外部市场指标，自动生成定期综合报告和个性化数据仪表盘。',
          features: [
            '自动化周期报告',
            '个性化数据仪表盘',
            '异常与机会提醒'
          ],
          image: '/scenarios/customer-service.png'
        }
      ]
    },
    features: {
      title: '核心优势',
      subtitle: '强大功能，提升AI体验',
      cards: [
        {
          icon: Globe,
          title: '联网搜索能力',
          description: '集成实时联网搜索功能，支持自定义搜索引擎配置，包括专业学术搜索支持。',
          action: '了解更多',
        },
        {
          icon: FileText,
          title: '文档处理能力',
          description: '支持多文件同时上传与处理，提供智能分析、内容提取与翻译转换功能。',
          action: '了解更多',
        },
        {
          icon: Bot,
          title: 'MCP协议支持',
          description: '通过模型控制协议(MCP)实现与多种AI模型的无缝集成，扩展系统能力。',
          action: '了解更多',
        },
        {
          icon: Database,
          title: '多模型适配',
          description: '支持GPT、Claude、DeepSeek等多种AI模型，根据任务需求自动选择最佳模型。',
          action: '了解更多',
        },
      ],
    },
    privacy: {
      title: '安全与隐私保障',
      features: {
        offline: {
          title: '本地化部署',
          description: '支持完全离线部署，数据存储在本地，确保隐私安全。',
        },
        encrypted: {
          title: '端到端加密',
          description: '全程加密传输和存储，保护个人和企业数据安全。',
        },
        control: {
          title: '权限精细管理',
          description: '多层级权限控制，满足企业级数据安全需求。',
        },
      },
    },
    footer: {
      rights: '© 2024 DeepChat. 保留所有权利。',
    },
  },
};

const titles = {
  en: {
    title: 'DeepChat - Your AI Partner on Desktop',
    description: 'DeepChat is a fast, focused desktop AI assistant designed for deep work, bringing you a powerful and private AI experience.'
  },
  zh: {
    title: 'DeepChat - 您的桌面端 AI 伙伴',
    description: 'DeepChat 是一款快速、专注的桌面端 AI 助手，为深度工作而设计，带来强大而私密的 AI 体验。'
  }
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  className?: string;
}

function FeatureCard({ icon: Icon, title, description, action, className = "" }: FeatureCardProps) {
  return (
    <div className={`bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/10 ${className}`}>
      <div className="bg-indigo-100 dark:bg-indigo-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center space-x-1">
        <span>{action}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ScenarioCaseProps {
  title: string;
  description: string;
  features: string[];
  image: string;
}

function ScenarioCard({ title, description, features, image }: ScenarioCaseProps) {
  return (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex flex-col h-full">
        <div className="relative mb-4 aspect-video">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl blur-lg opacity-10"></div>
          <img 
            src={image} 
            alt={title}
            className="relative rounded-lg w-full h-full object-cover border border-gray-100 dark:border-gray-700"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="mt-auto">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// 首先添加一个类型定义来表示 DeepSeek 的版本
type DeepSeekVersion = 'personal' | 'enterprise';

function App() {
  const [lang, setLang] = useState('zh');
  // 移除原来的 activeTab 状态，改用 deepSeekVersion
  const [deepSeekVersion, setDeepSeekVersion] = useState<DeepSeekVersion>('personal');
  const t = translations[lang as keyof typeof translations];

  // 添加一个副作用来检测 DeepSeek 版本
  useEffect(() => {
    // 这里添加检测 DeepSeek 版本的逻辑
    // 示例：可以通过环境变量、配置文件或 API 来获取
    const detectDeepSeekVersion = () => {
      // 临时示例逻辑，实际实现需要根据您的具体需求来写
      const isEnterprise = window.location.hostname.includes('enterprise');
      return isEnterprise ? 'enterprise' : 'personal';
    };

    const version = detectDeepSeekVersion();
    setDeepSeekVersion(version);
  }, []); // 只在组件挂载时执行一次

  // 根据语言更新页面标题和描述
  useEffect(() => {
    const currentTitles = titles[lang as keyof typeof titles];
    document.title = currentTitles.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', currentTitles.description);
  }, [lang]);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/download" element={
            <Layout lang={lang as 'en' | 'zh'} setLang={setLang} t={t}>
              <DownloadPage lang={lang as 'en' | 'zh'} />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout lang={lang as 'en' | 'zh'} setLang={setLang} t={t}>
              <ContactPage lang={lang as 'en' | 'zh'} />
            </Layout>
          } />
          <Route path="/demos" element={
            <Layout lang={lang as 'en' | 'zh'} setLang={setLang} t={t}>
              <DemoPage lang={lang as 'en' | 'zh'} />
            </Layout>
          } />
          <Route path="/docs/:section" element={
            <Layout lang={lang as 'en' | 'zh'} setLang={setLang} t={t}>
              <DocsPage lang={lang as 'en' | 'zh'} />
            </Layout>
          } />
          <Route path="/" element={
            <Layout lang={lang as 'en' | 'zh'} setLang={setLang} t={t}>
              {/* Hero Section */}
              <div className="container mx-auto px-4 pt-8 md:pt-20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 mb-20 md:mb-32">
                  <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
                      {t.hero.title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                      {t.hero.subtitle}
                    </p>
                    
                    <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      {t.hero.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <Link 
                        to="/download"
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <span>{t.hero.tryButton}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <span>{t.hero.watchDemo}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl blur-xl opacity-20"></div>
                      <img 
                        src="/chat-screenshot.png" 
                        alt="DeepChat Interface"
                        className="relative rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Providers Section */}
              <div className="container mx-auto px-4 mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
                    {t.modelProviders.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t.modelProviders.subtitle}</p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                    {t.modelProviders.providers.slice(0, 7).map((provider, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 text-center">
                        <img 
                          src={provider.logo} 
                          alt={provider.name}
                          className="h-16 w-16 mb-4 object-contain" 
                        />
                        <a 
                          href="#" 
                          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                        >
                          {provider.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                    {t.modelProviders.providers.slice(7, 14).map((provider, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 text-center">
                        <img 
                          src={provider.logo} 
                          alt={provider.name}
                          className="h-16 w-16 mb-4 object-contain" 
                        />
                        <a 
                          href="#" 
                          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                        >
                          {provider.name}
                        </a>
                      </div>
                    ))}
                    <div className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 text-center">
                      <p className="text-gray-600 dark:text-gray-300">{t.modelProviders.compatibleText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section - Moved above Scenarios */}
              <div className="container mx-auto px-4 mb-32" id="features">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
                    {t.features.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{t.features.subtitle}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
                  {t.features.cards.map((card, index) => (
                    <FeatureCard
                      key={index}
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                      action={card.action}
                    />
                  ))}
                </div>
              </div>

              {/* Scenarios Section */}
              <section className="container mx-auto px-4 mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
                    {t.scenarios.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">{t.scenarios.subtitle}</p>

                  {/* DeepSeek 版本选择 */}
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                    <button 
                      onClick={() => setDeepSeekVersion('personal')}
                      className={`relative px-8 py-4 rounded-xl transition-all ${
                        deepSeekVersion === 'personal' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Bot className="w-5 h-5" />
                        <span className="font-medium">{t.scenarios.tabs.personal}</span>
                      </div>
                      {deepSeekVersion === 'personal' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-indigo-600 rotate-45 transform origin-center"></div>
                        </div>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => setDeepSeekVersion('enterprise')}
                      className={`relative px-8 py-4 rounded-xl transition-all ${
                        deepSeekVersion === 'enterprise' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">{t.scenarios.tabs.enterprise}</span>
                      </div>
                      {deepSeekVersion === 'enterprise' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-indigo-600 rotate-45 transform origin-center"></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* 场景卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
                  {t.scenarios[deepSeekVersion].map((scenario, index) => (
                    <ScenarioCard
                      key={index}
                      {...scenario}
                    />
                  ))}
                </div>
              </section>

              {/* Privacy Section */}
              <div className="container mx-auto px-4 mb-32">
                <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
                    {t.privacy.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="bg-indigo-100 dark:bg-indigo-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t.privacy.features.offline.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t.privacy.features.offline.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 dark:bg-indigo-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t.privacy.features.encrypted.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t.privacy.features.encrypted.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 dark:bg-indigo-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Database className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t.privacy.features.control.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t.privacy.features.control.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;