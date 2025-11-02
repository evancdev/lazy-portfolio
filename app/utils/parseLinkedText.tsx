import { ReactNode, ReactElement } from 'react';

export const parseLinkedText = (text: string): ReactNode => {
  if (!text) return text;

  // Pattern: [display text](url) - standard markdown format (with optional spaces)
  const regex = /\[([^\]]+)\]\s*\(([^)]+)\)/g;
  const parts: (string | ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add any text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Create link element with proper href/text mapping
    parts.push(
      <a
        key={`link-${match.index}`}
        href={match[2].trim()} // URL is in second capture group
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
        aria-label={`External link to ${match[1].trim()}`}
      >
        {match[1].trim()}
        {/* Display text is in first capture group */}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
};
