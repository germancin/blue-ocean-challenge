import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkSectionProps {
  title: string;
  links: FooterLink[];
  isExternal?: boolean;
}

const FooterLinkSection = ({ title, links, isExternal = false }: FooterLinkSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {isExternal ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;