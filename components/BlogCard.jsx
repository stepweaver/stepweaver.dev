import React from 'react';

const BlogCard = ({ title, summary, date, slug }) => {
  return (
    <div className="border border-terminal-border bg-terminal-black p-4 rounded mb-4">
      <h3 className="text-terminal-green font-terminus text-lg mb-2">{title}</h3>
      <p className="text-terminal-text mb-2">{summary}</p>
      <div className="text-terminal-yellow text-sm">{date}</div>
    </div>
  );
};

export default BlogCard;