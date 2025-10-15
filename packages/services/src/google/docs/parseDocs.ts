import { GoogleDoc, ParsedDoc } from '../types';
import { geminiClient } from '../client';

export function extractTextFromDoc(docData: GoogleDoc): string {
  const content = docData.body?.content;
  if (!content) return '';

  return content
    .flatMap((item) => item.paragraph?.elements ?? [])
    .map((element) => {
      const textContent = element.textRun?.content ?? '';
      const link = element.textRun?.textStyle?.link?.url;

      if (link && textContent.trim()) {
        return `${textContent.trim()} (${link})`;
      }
      return textContent;
    })
    .join('');
}

export async function parseDocs(docData: GoogleDoc): Promise<ParsedDoc> {
  const content = docData.body?.content;

  if (!content) {
    throw new Error('add something to your doc lol');
  }

  const docText = extractTextFromDoc(docData);

  const systemPrompt = `You are a portfolio document parser. Extract structured data from the document text.
Return a JSON object with this exact structure:
{
  "hero": { "name": string, "title": string },
  "experiences": [{ "title": string, "company": string, "date": string, "bulletPoints": string[] }],
  "projects": [{ "title": string, "bulletPoints": string[], "techStack": string[], "link": string }],
  "contacts": [{ "text": string, "contactRef": string }]
}

Rules:
- Extract the person's name and current experience title for hero
- List all work experiences with their details
- List all projects with tech stack and links
- Extract contact information (email, phone, URLs)
- For contacts do not include href inside text field
- Phone numbers should match format: +1 (XXX) XXX-XXXX`;

  const response = await geminiClient.chat.completions.create({
    model: 'gemini-2.0-flash-exp',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Parse this portfolio document:\n\n${docText}` },
    ],
    response_format: { type: 'json_object' },
  });

  const parsed = JSON.parse(response.choices[0].message.content || '{}');
  return parsed as ParsedDoc;
}
