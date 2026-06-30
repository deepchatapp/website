import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, Globe, Shield, Database, Lock, Bot, Check, Building2 } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import DownloadPage from './components/DownloadPage';
import Layout from './components/Layout';
import ContactPage from './components/ContactPage';
import DemoPage from './components/DemoPage';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  className?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, action, className = "", index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all hover:shadow-lg ${className}`}
    >
      <div className="text-primary dark:text-primary-dark mb-4">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex items-center text-primary dark:text-primary-dark font-medium">
        <span>{action}</span>
        <ChevronRight size={16} className="ml-1" />
    </div>
    </motion.div>
  );
}

interface ScenarioCaseProps {
  title: string;
  description: string;
  features: string[];
  image: string;
}

type DeepSeekVersion = 'personal' | 'enterprise';

const MODEL_PROVIDERS = [
  { name: 'Deepseek', logo: '/models/deepseek-color.svg', href: 'https://deepseek.com/' },
  { name: 'Moonshot', logo: '/models/moonshot.svg', href: 'https://moonshot.ai/' },
  { name: 'OpenAI', logo: '/models/openai.svg', href: 'https://openai.com/' },
  { name: 'Gemini', logo: '/models/gemini-color.svg', href: 'https://gemini.google.com/' },
  { name: 'Ollama', logo: '/models/ollama.svg', href: 'https://ollama.com/' },
  { name: 'Qiniu', logo: '/models/qiniu.svg', href: 'https://www.qiniu.com' },
  { name: 'New API', logo: '/models/newapi.svg', href: 'https://www.newapi.ai/' },
  { name: 'Grok', logo: '/models/grok.svg', href: 'https://x.ai/' },
  { name: 'Zhipu', logo: '/models/zhipu-color.svg', href: 'https://open.bigmodel.cn/' },
  { name: 'PPIO', logo: '/models/ppio-color.svg', href: 'https://ppinfra.com/' },
  { name: 'MiniMax', logo: '/models/minimax-color.svg', href: 'https://platform.minimaxi.com/' },
  { name: 'Fireworks', logo: '/models/fireworks-color.svg', href: 'https://fireworks.ai/' },
  { name: 'AIHubMix', logo: '/models/aihubmix.png', href: 'https://aihubmix.com/' },
  { name: 'Doubao', logo: '/models/doubao-color.svg', href: 'https://console.volcengine.com/ark/' },
  { name: 'DashScope', logo: '/models/alibabacloud-color.svg', href: 'https://www.aliyun.com/product/bailian' },
  { name: 'Groq', logo: '/models/groq.svg', href: 'https://groq.com/' },
  { name: 'JieKou.AI', logo: '/models/jiekou-color.svg', href: 'https://jiekou.ai?utm_source=github_deepchat' },
  { name: 'ZenMux', logo: '/models/zenmux-color.svg', href: 'https://zenmux.ai/' },
  { name: 'GitHub Models', logo: '/models/github.svg', href: 'https://github.com/marketplace/models' },
  { name: 'LM Studio', logo: '/models/lmstudio.svg', href: 'https://lmstudio.ai/docs/app' },
  { name: 'Hunyuan', logo: '/models/hunyuan-color.svg', href: 'https://cloud.tencent.com/product/hunyuan' },
  { name: '302.AI', logo: '/models/302ai.svg', href: 'https://302.ai' },
  { name: 'Together', logo: '/models/together-color.svg', href: 'https://www.together.ai/' },
  { name: 'Poe', logo: '/models/poe-color.svg', href: 'https://poe.com/' },
  { name: 'Vercel AI Gateway', logo: '/models/vercel.svg', href: 'https://vercel.com/ai' },
  { name: 'OpenRouter', logo: '/models/openrouter.svg', href: 'https://openrouter.ai/' },
  { name: 'Azure OpenAI', logo: '/models/azure-color.svg', href: 'https://azure.microsoft.com/en-us/products/ai-services/openai-service' },
  { name: 'TokenFlux', logo: '/models/tokenflux-color.svg', href: 'https://tokenflux.ai/' },
  { name: 'BurnCloud', logo: '/models/burncloud-color.svg', href: 'https://www.burncloud.com/' },
  { name: 'OpenAI Responses', logo: '/models/openai.svg', href: 'https://openai.com/' },
  { name: 'CherryIn', logo: '/models/cherryin-color.png', href: 'https://open.cherryin.ai/console' },
  { name: 'ModelScope', logo: '/models/modelscope-color.svg', href: 'https://modelscope.cn/' },
  { name: 'AWS Bedrock', logo: '/models/aws-bedrock.svg', href: 'https://aws.amazon.com/bedrock/' },
  { name: 'Voice.ai', logo: '/models/voiceai.svg', href: 'https://voice.ai/' },
  { name: 'Vertex AI', logo: '/models/vertexai-color.svg', href: 'https://cloud.google.com/vertex-ai' },
  { name: 'GitHub Copilot', logo: '/models/githubcopilot.svg', href: 'https://github.com/features/copilot' },
  { name: 'Xiaomi', logo: '/models/xiaomi.png', href: 'https://platform.xiaomimimo.com/#/docs/quick-start/first-api-call' },
  { name: 'o3.fan', logo: '/models/o3-fan.png', href: 'https://o3.fan' },
  { name: 'Novita AI', logo: '/models/novitaai.svg', href: 'https://novita.ai/' },
  { name: 'Astraflow', logo: '/models/astraflow.png', href: 'https://astraflow.ucloud.cn/' },
  { name: 'Anthropic', logo: '/models/anthropic.svg', href: 'https://www.anthropic.com/' },
  { name: 'SiliconFlow', logo: '/models/siliconcloud-color.svg', href: 'https://www.siliconflow.cn/' },
] as const;

const MODEL_PROVIDER_ROWS = [
  MODEL_PROVIDERS.slice(0, Math.ceil(MODEL_PROVIDERS.length / 2)),
  MODEL_PROVIDERS.slice(Math.ceil(MODEL_PROVIDERS.length / 2)),
] as const;

const CAROUSEL_IMAGES = [
  '/screenshots/deepchat-light.png',
  '/screenshots/deepchat-dark.png'
];

const MainContent: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DeepSeekVersion>('personal');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const controls = useAnimation();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 监听路由变化，重置动画状态
  useEffect(() => {
    controls.set({ opacity: 0, y: 50 });
    controls.start({ opacity: 1, y: 0 });
  }, [location.pathname, controls]);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, []);

  const primaryButtonClass = `px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
    isDark ? 'bg-primary-dark hover:bg-primary-dark/80' : 'bg-primary hover:bg-primary/80'
  }`;

  const secondaryButtonClass = `px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
    isDark ? 'border-primary-dark text-primary-dark hover:bg-primary-dark/10' : 'border-primary text-primary hover:bg-primary/10'
  }`;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20"
        >
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#6366f1] text-transparent bg-clip-text">
                DeepChat
              </span>
              <span className="mx-2">-</span>
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-transparent bg-clip-text">
                {t('hero.title').split('-')[1]}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            {/* 特性列表 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: "⚡️",
                  text: t('hero.features.0')
                },
                {
                  icon: "🎯",
                  text: t('hero.features.1')
                },
                {
                  icon: "🔒",
                  text: t('hero.features.2')
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-600/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-left">{feature.text}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 截图轮播 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            key={location.pathname + "screenshot"}
            className="max-w-4xl mx-auto mb-20 relative"
          >
            <div className="relative pb-[56.25%]">
              {CAROUSEL_IMAGES.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentImageIndex ? 1 : 0,
                    scale: index === currentImageIndex ? 1 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                >
                  <img 
                    src={image}
                    alt={`DeepChat Screenshot ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg shadow-2xl dark:shadow-primary-dark/20"
                  />
                </motion.div>
              ))}
                          </div>

            {/* 轮播指示器 */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-primary dark:bg-primary-dark w-4' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA 按钮 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            key={location.pathname + "buttons"}
            className="flex justify-center gap-4 mt-8"
          >
            <Link to="/download" className={primaryButtonClass}>
              {t('hero.tryButton')}
                      </Link>
                      <a 
                        href="https://www.bilibili.com/video/BV194ZwYLEYH"
                        target="_blank"
                        rel="noopener noreferrer"
              className={secondaryButtonClass}
            >
              {t('hero.watchDemo')}
            </a>
          </motion.div>
        </motion.section>

        {/* Model Provider Section */}
        <section className="overflow-hidden border-t border-gray-100 bg-slate-950 py-20 text-white dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary-dark">{t('modelProviders.title')}</p>
              <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold md:text-5xl">{t('modelProviders.subtitle')}</h2>
            </div>

            <div className="space-y-5" aria-label="Supported model providers">
              {MODEL_PROVIDER_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="model-provider-row">
                  <div className={`model-provider-track ${rowIndex === 1 ? 'model-provider-track-reverse' : ''}`}>
                    {[...row, ...row].map((provider, index) => (
                      <a
                        key={`${provider.name}-${index}`}
                        href={provider.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-w-44 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-medium text-gray-300 shadow-sm backdrop-blur transition-colors duration-200 hover:border-primary-dark/60 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        aria-label={`${provider.name} website`}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 p-1.5">
                          <img src={provider.logo} alt="" className="h-full w-full object-contain" />
                        </span>
                        <span className="text-center">{provider.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-base leading-relaxed text-gray-300 shadow-sm md:text-lg">
                <span className="min-w-0 break-words">{t('modelProviders.compatibleText')}</span>
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-400/20">
                  <Check size={14} className="text-green-300" />
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Application Scenarios */}
        <section className="py-24 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary-dark bg-clip-text text-transparent mb-6">{t('scenarios.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">{t('scenarios.subtitle')}</p>
            </div>

            <div className="flex justify-center mb-16">
              <div className="inline-flex p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'personal' 
                      ? 'bg-white dark:bg-gray-700 shadow-md text-primary dark:text-primary-dark' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {t('scenarios.tabs.personal')}
                </button>
                <button
                  onClick={() => setActiveTab('enterprise')}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'enterprise' 
                      ? 'bg-white dark:bg-gray-700 shadow-md text-primary dark:text-primary-dark' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {t('scenarios.tabs.enterprise')}
                </button>
              </div>
            </div>
                
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(t(`scenarios.${activeTab}`, { returnObjects: true }) as Array<ScenarioCaseProps>).map((scenario, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">{scenario.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{scenario.description}</p>
                    <ul className="space-y-3">
                      {scenario.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
                          className="flex items-start"
                        >
                          <span className="flex-shrink-0 w-5 h-5 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center mt-0.5">
                            <Check size={12} className="text-primary dark:text-primary-dark" />
                          </span>
                          <span className="ml-3 text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                    <motion.img 
                      src={scenario.image} 
                      alt={scenario.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 hover:brightness-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-12 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t('features.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('features.subtitle')}</p>
              </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t('features.cards', { returnObjects: true }) as Array<{ title: string, description: string, action: string }>).map((card, index) => {
                const icons = [Globe, FileText, Bot, Database];
                const Icon = icons[index % icons.length];
                
                return (
                    <FeatureCard
                      key={index}
                    icon={Icon}
                      title={card.title}
                      description={card.description}
                      action={card.action}
                    />
                );
              })}
            </div>
                </div>
        </section>

        {/* Privacy Section */}
        <section className="py-12 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('privacy.title')}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-primary dark:text-primary-dark" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('privacy.features.offline.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('privacy.features.offline.description')}</p>
                </div>
                
                <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-primary dark:text-primary-dark" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('privacy.features.encrypted.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('privacy.features.encrypted.description')}</p>
                </div>

                <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="text-primary dark:text-primary-dark" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('privacy.features.control.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('privacy.features.control.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer space */}
        <div className="py-8 mt-8"></div>
              </div>
            </Layout>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/download" element={<Layout><DownloadPage /></Layout>} />
        <Route path="/demos" element={<Layout><DemoPage /></Layout>} />
        <Route path="/docs" element={<Layout><Navigate to="/docs" replace /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        </Routes>
      </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
