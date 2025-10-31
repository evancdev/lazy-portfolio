"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Contact } from "@lazy-portfolio/types";
import { throttle } from "lodash";
import { FaGithub, FaLinkedin, FaEnvelope, FaLightbulb } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useTheme } from "../providers";

const Navigation = ({ contacts }: { contacts: Contact[] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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
    { name: "About", href: "/" },
    { name: "Experience", href: "/experiences" },
    { name: "Projects", href: "/projects" }
  ];


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-background/95 backdrop-blur-sm ${
        isScrolled ? "border-b border-border" : ""
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
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-mono transition-colors ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className={`transition-colors ${theme === 'light' ? 'text-yellow-400 hover:text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
            aria-label="Toggle theme"
          >
            <FaLightbulb className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`transition-colors ${theme === 'light' ? 'text-yellow-400 hover:text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
            aria-label="Toggle theme"
          >
            <FaLightbulb className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary"
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
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-mono transition-colors ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;