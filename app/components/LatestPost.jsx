// components/LatestPost.jsx
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function LatestPost() {
  return (
    <TerminalWindow title="~/latest-post">
      <h2 className="text-xl text-terminal-green font-terminus mb-4">
        Latest Blog Post
      </h2>
      <p className="text-terminal-text">
        Coming soon! Blog system will be implemented in Phase 5.
      </p>
    </TerminalWindow>
  );
}