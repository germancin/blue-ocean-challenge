import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';
import enTranslations from '@/i18n/locales/en.json';
import esTranslations from '@/i18n/locales/es.json';
import ptTranslations from '@/i18n/locales/pt.json';

type JsonEditorProps = {
  data: Record<string, any>;
  onChange: (path: string, value: any) => void;
  searchTerm: string;
  prefix?: string;
};

const JsonEditor: React.FC<JsonEditorProps> = ({ data, onChange, searchTerm, prefix = '' }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (path: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(path)) {
      newOpenSections.delete(path);
    } else {
      newOpenSections.add(path);
    }
    setOpenSections(newOpenSections);
  };

  const shouldShowItem = (key: string, value: any): boolean => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const keyMatches = key.toLowerCase().includes(searchLower);
    const valueMatches = typeof value === 'string' && value.toLowerCase().includes(searchLower);
    return keyMatches || valueMatches;
  };

  return (
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        
        if (!shouldShowItem(key, value)) return null;

        if (typeof value === 'object' && value !== null) {
          return (
            <Collapsible
              key={currentPath}
              open={openSections.has(currentPath)}
              onOpenChange={() => toggleSection(currentPath)}
              className="border rounded-lg p-2"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded">
                <span className="font-medium">{key}</span>
                <span className="text-gray-500">{openSections.has(currentPath) ? '−' : '+'}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 pt-2">
                <JsonEditor
                  data={value}
                  onChange={onChange}
                  searchTerm={searchTerm}
                  prefix={currentPath}
                />
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <div key={currentPath} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
            <label className="min-w-[200px] text-sm font-medium">{key}:</label>
            <Input
              value={value as string}
              onChange={(e) => onChange(currentPath, e.target.value)}
              className="flex-1"
            />
          </div>
        );
      })}
    </div>
  );
};

const I18nEditor = () => {
  const { t } = useTranslation();
  const [activeLocale, setActiveLocale] = useState<'en' | 'es' | 'pt'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [translations, setTranslations] = useState({
    en: enTranslations,
    es: esTranslations,
    pt: ptTranslations,
  });
  const [previewJson, setPreviewJson] = useState('');

  const handleChange = (path: string, value: any) => {
    const newTranslations = { ...translations };
    const pathParts = path.split('.');
    let current = newTranslations[activeLocale];
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    setTranslations(newTranslations);
    setPreviewJson(JSON.stringify(newTranslations[activeLocale], null, 2));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(translations[activeLocale], null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeLocale}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          setTranslations({
            ...translations,
            [activeLocale]: content,
          });
          setPreviewJson(JSON.stringify(content, null, 2));
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {(['en', 'es', 'pt'] as const).map((locale) => (
                <Button
                  key={locale}
                  variant={activeLocale === locale ? 'default' : 'outline'}
                  onClick={() => {
                    setActiveLocale(locale);
                    setPreviewJson(JSON.stringify(translations[locale], null, 2));
                  }}
                >
                  {locale.toUpperCase()}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => document.getElementById('fileInput')?.click()}>
                Import JSON
              </Button>
              <input
                id="fileInput"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button onClick={handleExport}>Export JSON</Button>
            </div>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] border rounded-lg p-4">
            <JsonEditor
              data={translations[activeLocale]}
              onChange={handleChange}
              searchTerm={searchTerm}
            />
          </ScrollArea>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-4">
            <h3 className="text-lg font-medium mb-2">Preview</h3>
            <ScrollArea className="h-[calc(100vh-200px)] border rounded-lg">
              <Textarea
                value={previewJson}
                readOnly
                className="w-full h-full font-mono text-sm"
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default I18nEditor;