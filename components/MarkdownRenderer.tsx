import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-stone prose-lg max-w-none 
      prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 
      prose-p:font-light prose-p:text-stone-600 prose-p:leading-8
      prose-a:text-stone-900 prose-a:underline prose-a:decoration-stone-300 prose-a:underline-offset-4 hover:prose-a:decoration-stone-900
      prose-img:grayscale hover:prose-img:grayscale-0 prose-img:transition-all prose-img:duration-500
      prose-code:text-stone-800 prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-stone-50 prose-pre:text-stone-800 prose-pre:border prose-pre:border-stone-100 prose-pre:rounded-none
      prose-blockquote:border-l-stone-900 prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-stone-500
      prose-strong:font-medium prose-strong:text-stone-900
      ">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;