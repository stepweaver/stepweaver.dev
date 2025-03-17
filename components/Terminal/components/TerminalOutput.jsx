import React from 'react';
import TypedText from './TypedText';
import LoadingDotsText from './LoadingDotsText';

export default function TerminalOutput({ output }) {
  return (
    <div className='terminal-output font-mono text-sm mb-2'>
      {output.map((line, index) => {
        // Skip null or undefined values
        if (line === null || line === undefined) return null;

        // Convert to string if it's not already
        const content = typeof line === 'string' ? line : line.toString();

        // Handle multi-line output (split by newlines)
        const lines = content.split('\n');

        return (
          <div key={index}>
            {lines.map((textLine, lineIndex) => {
              // Parse special command prefixes
              const isCommand = textLine.startsWith('$ ');
              const isTypedAnimation = textLine.startsWith('!type ');
              const isLoadingAnimation = textLine.startsWith('!loading ');

              if (isTypedAnimation) {
                // Remove the !type prefix and display with typing animation
                const textToType = textLine.substring(6);
                return (
                  <div key={`${index}-${lineIndex}`} className='mb-1'>
                    <TypedText text={textToType} speed={40} />
                  </div>
                );
              }

              if (isLoadingAnimation) {
                // Remove the !loading prefix and display with loading animation
                const loadingText = textLine.substring(9) || 'Loading';
                return (
                  <div key={`${index}-${lineIndex}`} className='mb-1'>
                    <LoadingDotsText text={loadingText} />
                  </div>
                );
              }

              return (
                <div
                  key={`${index}-${lineIndex}`}
                  className={`mb-1 whitespace-pre font-['Hack',_'Courier_New',_monospace] ${
                    isCommand ? 'text-terminal-green' : ''
                  }`}
                  style={{
                    fontVariantLigatures: 'none',
                    letterSpacing: '0',
                    fontFeatureSettings: '"mono" 1',
                    lineHeight: '1.2',
                  }}
                >
                  {textLine}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
