export default function TerminalWindow({
  title = '~/terminal',
  children,
  className = '',
}) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className='terminal-header'>
        <div className='terminal-title'>{title}</div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div className='terminal-body'>{children}</div>
    </div>
  );
}
