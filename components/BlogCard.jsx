import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className='block group'>
      <article className='p-3 border border-terminal-border bg-terminal-dark/30 rounded hover:bg-terminal-light/20 hover:border-terminal-green transition-all duration-200 transform hover:-translate-y-1 hover:shadow-glow'>
        <h2 className='text-lg text-terminal-green font-terminus mb-1 group-hover:text-terminal-green/90 transition-colors'>
          {post.title}
        </h2>

        <div className='flex flex-wrap items-center gap-3 text-terminal-muted mb-2 text-sm'>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          {post.tags && (
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='px-2 py-0.5 bg-terminal-dark border border-terminal-green/40 text-terminal-green text-xs rounded-full flex items-center'
                >
                  <span className='text-terminal-green mr-1 font-bold'>#</span>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.excerpt && (
          <p className='text-terminal-text text-sm mb-3'>{post.excerpt}</p>
        )}

        <div className='text-terminal-green group-hover:text-terminal-green/90 text-sm inline-flex items-center transition-colors'>
          Read more{' '}
          <span className='ml-1 transition-transform group-hover:translate-x-0.5'>
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
