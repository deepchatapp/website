import React from 'react';
import { FileText, Clock, BookOpen, Edit, Database, LineChart, CheckSquare, MessageSquare, Check, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DemoPage: React.FC = () => {
  const { t } = useTranslation();

  const categories = [
    {
      key: 'office',
      icon: FileText,
    },
    {
      key: 'creative',
      icon: Edit,
    },
    {
      key: 'research',
      icon: Database,
    },
    {
      key: 'team',
      icon: MessageSquare,
    }
  ];

  const scenarios = [
    {
      category: 'office',
      key: 'office.documentProcessing',
      icon: FileText,
    },
    {
      category: 'office',
      key: 'office.meetingAssistant',
      icon: Clock,
    },
    {
      category: 'creative',
      key: 'creative.contentCreation',
      icon: Edit,
    },
    {
      category: 'creative',
      key: 'creative.learningEducation',
      icon: BookOpen,
    },
    {
      category: 'research',
      key: 'research.dataAnalysis',
      icon: Database,
    },
    {
      category: 'research',
      key: 'research.marketResearch',
      icon: LineChart,
    },
    {
      category: 'team',
      key: 'team.projectManagement',
      icon: CheckSquare,
    },
    {
      category: 'team',
      key: 'team.teamCommunication',
      icon: MessageSquare,
    }
  ];

  const getFeatures = (scenarioKey: string): string[] => {
    try {
      const features = t(`demo.scenarios.${scenarioKey}.features`, { returnObjects: true });
      return Array.isArray(features) ? features : [];
    } catch (error) {
      console.error(`Error getting features for ${scenarioKey}:`, error);
      return [];
    }
  };

  const getTranslation = (key: string, defaultValue: string = ''): string => {
    try {
      const value = t(key);
      return typeof value === 'string' ? value : defaultValue;
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return defaultValue;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{getTranslation('demo.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{getTranslation('demo.subtitle')}</p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto">
          <Play className="w-5 h-5 mr-2" />
          {getTranslation('demo.videoButton')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {categories.map((category) => (
          <div key={category.key} className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <category.icon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              {getTranslation(`demo.categories.${category.key}.title`)}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {getTranslation(`demo.categories.${category.key}.description`)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <div key={scenario.key} className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <scenario.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {getTranslation(`demo.scenarios.${scenario.key}.title`)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {getTranslation(`demo.scenarios.${scenario.key}.description`)}
            </p>
            
            <h4 className="font-semibold mb-2">{getTranslation('demo.features')}:</h4>
            <ul className="mb-4">
              {getFeatures(scenario.key).map((feature: string, index: number) => (
                <li key={index} className="flex items-start mb-2">
                  <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">{getTranslation('demo.caseSample')}:</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {getTranslation(`demo.scenarios.${scenario.key}.caseSample`)}
              </p>
              <Link 
                to={getTranslation(`demo.scenarios.${scenario.key}.videoUrl`, '#')} 
                className="text-primary hover:text-primary-hover flex items-center"
              >
                {getTranslation('demo.watchVideo')} <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoPage; 