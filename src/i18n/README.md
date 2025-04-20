# DeepChat国际化配置

本项目使用react-i18next完成国际化配置，方便扩展多语言支持。

## 目录结构

```
src/i18n/
  ├── index.ts          # i18n配置主文件
  ├── README.md         # 说明文档
  └── locales/          # 语言资源文件
      ├── en.json       # 英文翻译
      ├── zh.json       # 中文翻译
      └── ...           # 其他语言
```

## 如何使用

### 代码中使用

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('some.translation.key')}</h1>
      <p>{t('another.key')}</p>
      
      {/* 传递参数 */}
      <p>{t('hello.user', { name: 'John' })}</p>
      
      {/* 数组类型返回 */}
      {(t('items', { returnObjects: true }) as string[]).map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      
      {/* 切换语言 */}
      <button onClick={() => i18n.changeLanguage('zh')}>切换到中文</button>
      <button onClick={() => i18n.changeLanguage('en')}>Switch to English</button>
    </div>
  );
}
```

### 添加新语言

1. 在`src/i18n/locales/`目录下添加新的JSON文件，如`ja.json`（日语）
2. 在`src/i18n/index.ts`中导入新语言文件并添加到resources中：

```ts
import ja from './locales/ja.json';

// 更新支持的语言
export const supportedLanguages = ['en', 'zh', 'ja'];

// 初始化时添加到资源中
i18n.init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    ja: { translation: ja }
  },
  // ...其他配置
});
```

3. 更新`LanguageType`类型：

```ts
export type LanguageType = 'en' | 'zh' | 'ja' | 'ko';
```

## 语言文件结构

语言文件采用嵌套JSON结构，便于组织多层级翻译内容：

```json
{
  "nav": {
    "home": "首页",
    "about": "关于我们"
  },
  "footer": {
    "copyright": "版权所有"
  }
}
```

## 语言切换组件

项目中的`LanguageSwitcher`组件提供了用户界面切换语言的功能，可以在任何需要的地方引入。 