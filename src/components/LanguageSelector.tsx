import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-bright-blue transition-colors">
        <Globe className="w-5 h-5" />
        <span className="uppercase">{i18n.language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-navy border border-bright-blue/20">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="text-white hover:text-bright-blue hover:bg-navy/50 cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;