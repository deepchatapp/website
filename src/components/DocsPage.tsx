import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Terminal, Settings, HelpCircle, Info } from 'lucide-react';
import { marked } from 'marked';

interface DocsPageProps {
  lang: 'en' | 'zh';
}

const translations = {
  en: {
    sections: {
      intro: {
        title: 'DeepChat Introduction',
        content: `
# DeepChat - Connecting Powerful AI with Your Personal World

DeepChat is an intelligent assistant platform with dual attributes, serving as both a personal AI companion and an enterprise collaboration platform.

## Product Essence

### 1. Personal Dimension: Personal AI Assistant
- **Core Positioning**: Personal AI assistant enhancing individual productivity
- **Value Propositions**:
  - Local AI capabilities ensuring privacy
  - Personalized knowledge base supporting growth
  - Full-scenario applications improving efficiency
  - MCP model integration enabling unlimited expansion

### 2. Enterprise Dimension: Smart Collaboration Platform
- **Core Positioning**: Enterprise-level AI collaboration platform
- **Value Propositions**:
  - Private deployment ensuring data security
  - Knowledge sharing enhancing collaboration
  - Standardized processes improving efficiency
  - Customized solutions meeting specific needs

## Core Capabilities

### 1. Infrastructure Layer

#### Local Computing Engine
- Support for multiple AI models
- MCP open integration capabilities
- Intelligent resource scheduling

#### Knowledge Management System
- Personal knowledge base
- Enterprise shared knowledge base
- Intelligent knowledge graph

### 2. Application Layer

#### Personal Scenarios
- Learning Assistant
- Creative Assistant
- Programming Assistant
- Life Assistant
- Entertainment Assistant

#### Enterprise Scenarios
- Office Assistant
- Development Assistant
- Marketing Assistant
- Customer Service Assistant
- Management Assistant

## Product Features

### 1. Unlimited Extensibility
- MCP open platform support
- Plugin system
- API integration capabilities
- Custom scenarios

### 2. Bi-directional Knowledge Flow
- Personal knowledge accumulation
- Enterprise knowledge sharing
- Intelligent knowledge recommendations
- Continuous learning evolution

### 3. Full Scenario Coverage
- Work scenarios
- Learning scenarios
- Life scenarios
- Entertainment scenarios

## Why Choose DeepChat?

DeepChat stands out by offering a unique combination of personal empowerment and enterprise collaboration. Through our advanced MCP (Model Control Protocol) technology, we provide unlimited expandability while ensuring data security and privacy.

Whether you're looking to enhance personal productivity or build an enterprise knowledge sharing platform, DeepChat provides the perfect solution with its powerful AI capabilities and flexible deployment options.
        `
      },
      quickstart: {
        title: 'Quick Start',
        content: `
# Getting Started with DeepChat

Follow these simple steps to start using DeepChat:

1. **Download & Install**
   - Choose your platform version
   - Run the installer
   - Launch DeepChat

2. **Initial Setup**
   - Select your preferred language
   - Choose model settings
   - Configure workspace

3. **Start Using**
   - Upload your first document
   - Try basic commands
   - Explore features
        `
      },
      guide: {
        title: 'User Guide',
        content: `
# DeepChat User Guide

Learn how to make the most of DeepChat's features:

## Document Processing
- Supported formats
- Batch processing
- Template creation

## Data Analysis
- Excel file handling
- Chart generation
- Data extraction

## Meeting Assistant
- Real-time transcription
- Summary generation
- Action item extraction
        `
      },
      models: {
        title: 'Model Configuration',
        content: `
# Model Configuration

Customize DeepChat to suit your needs:

## Available Models
- List of supported models
- Performance comparisons
- Hardware requirements

## Advanced Settings
- Memory allocation
- Processing modes
- Custom prompts
        `
      },
      faq: {
        title: 'FAQ & Troubleshooting',
        content: `
# Frequently Asked Questions

Get answers to common questions:

## General Questions
- System requirements
- Installation issues
- Performance optimization

## Technical Support
- Error messages
- Update problems
- Data management
        `
      }
    }
  },
  zh: {
    sections: {
      intro: {
        title: 'DeepChat 介绍',
        content: `
# DeepChat - 连接强大AI与个人世界的智能助手

DeepChat 是一个具有双重属性的智能助手平台，既是您的私人 AI 伙伴，也是企业级协作平台。

## 产品本质

### 1. 个人维度：私人AI助手
- **核心定位**：私人AI助手，提升个人生产力
- **价值主张**：
  - 本地化AI能力，保护隐私
  - 个性化知识库，助力成长
  - 全场景应用，提升效率
  - MCP模型集成，能力无限扩展

### 2. 组织维度：智能协作平台
- **核心定位**：企业级AI协作平台
- **价值主张**：
  - 私有化部署，数据安全
  - 知识共享，协同增效
  - 标准化流程，提升效率
  - 个性化定制，满足特定需求

## 核心能力矩阵

### 1. 基础架构层

#### 本地化计算引擎
- 支持多种AI模型
- MCP开放集成能力
- 资源智能调度

#### 知识管理系统
- 个人知识库
- 企业共享知识库
- 智能知识图谱

### 2. 应用层

#### 个人应用场景
- 学习助手
- 创作助手
- 编程助手
- 生活助手
- 娱乐助手

#### 企业应用场景
- 办公助手
- 研发助手
- 营销助手
- 客服助手
- 管理助手

## 产品特色

### 1. 无限扩展性
- MCP开放平台支持
- 插件系统
- API集成能力
- 自定义场景

### 2. 双向知识流
- 个人知识沉淀
- 企业知识共享
- 智能知识推荐
- 持续学习进化

### 3. 场景全覆盖
- 工作场景
- 学习场景
- 生活场景
- 娱乐场景

## 为什么选择 DeepChat？

DeepChat 通过独特的个人赋能与企业协作相结合的方式脱颖而出。借助先进的 MCP（模型控制协议）技术，我们在确保数据安全和隐私的同时提供无限的扩展性。

无论您是希望提升个人生产力，还是构建企业知识共享平台，DeepChat 都能通过其强大的 AI 能力和灵活的部署方式，为您提供完美的解决方案。
        `
      },
      quickstart: {
        title: '快速开始',
        content: `
# DeepChat 快速入门

按照以下步骤开始使用 DeepChat：

1. **下载安装**
   - 选择适合您平台的版本
   - 运行安装程序
   - 启动 DeepChat

2. **初始设置**
   - 选择偏好语言
   - 选择模型设置
   - 配置工作空间

3. **开始使用**
   - 上传您的第一个文档
   - 尝试基本命令
   - 探索功能
        `
      },
      guide: {
        title: '使用指南',
        content: `
# DeepChat 使用指南

了解如何充分利用 DeepChat 的功能：

## 文档处理
- 支持的格式
- 批量处理
- 模板创建

## 数据分析
- Excel 文件处理
- 图表生成
- 数据提取

## 会议助手
- 实时转录
- 摘要生成
- 行动项提取
        `
      },
      models: {
        title: '模型配置',
        content: `
# 模型配置

自定义 DeepChat 以满足您的需求：

## 可用模型
- 支持的模型列表
- 性能对比
- 硬件要求

## 高级设置
- 内存分配
- 处理模式
- 自定义提示词
        `
      },
      faq: {
        title: '常见问题',
        content: `
# 常见问题解答

获取常见问题的答案：

## 一般问题
- 系统要求
- 安装问题
- 性能优化

## 技术支持
- 错误信息
- 更新问题
- 数据管理
        `
      }
    }
  }
};

const icons = {
  intro: Info,
  quickstart: Terminal,
  guide: BookOpen,
  models: Settings,
  faq: HelpCircle
};

function DocsPage({ lang }: DocsPageProps) {
  const { section = 'intro' } = useParams();
  const t = translations[lang];
  const currentSection = t.sections[section as keyof typeof t.sections];
  const Icon = icons[section as keyof typeof icons];

  const htmlContent = React.useMemo(() => {
    return marked(currentSection.content, {
      breaks: true,
      gfm: true
    });
  }, [currentSection.content]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <div className="bg-indigo-600/20 w-12 h-12 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text">
            {currentSection.title}
          </h1>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}

export default DocsPage; 