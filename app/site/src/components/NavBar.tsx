import { useState, useEffect } from "react";
import { Contact } from "@lazy-portfolio/types";
import { throttle } from "lodash";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

const Navigation = ({ contacts }: { contacts: Contact[] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getContactIcon = ({ contactRef, text }: Contact) => {
    const searchStr = `${contactRef} ${text}`.toLowerCase();

    if (searchStr.includes('github')) return FaGithub;
    if (searchStr.includes('linkedin')) return FaLinkedin;
    if (searchStr.includes('mail') || searchStr.includes('@')) return FaEnvelope;
    if (searchStr.includes('phone') || searchStr.includes('tel') || /\(\d{3}\)/.test(contactRef)) return AiFillMessage;

    // Fallback - should redirect to 500 page
    throw new Error('Unknown contact type');
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 45);
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://example.com/your-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-primary text-primary rounded text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Resume
          </a>
          {contacts.map((contact, idx) => {
            const Icon = getContactIcon(contact);
            const searchStr = `${contact.contactRef} ${contact.text}`.toLowerCase();

            let href = contact.contactRef;
            let isExternal = true;

            if ((searchStr.includes('mail') || searchStr.includes('@')) && !contact.contactRef.startsWith('mailto:')) {
              href = `mailto:${contact.contactRef}`;
              isExternal = false;
            } else if ((searchStr.includes('phone') || searchStr.includes('tel') || /\(\d{3}\)/.test(contact.contactRef)) && !contact.contactRef.startsWith('tel:')) {
              href = `sms:${contact.contactRef}`;
              isExternal = false;
            }

            return (
              <a
                key={idx}
                href={href}
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={contact.text}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-primary"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
