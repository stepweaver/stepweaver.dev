import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPost } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      <TerminalWindow title={`~/blog/${params.slug}`}>
        <article className='prose prose-invert max-w-none'>
          <h1 className='text-2xl text-terminal-green font-terminus mb-4'>
            {post.title}
          </h1>

          <div className='flex items-center gap-4 text-terminal-muted mb-8'>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
            {post.tags && (
              <div className='flex gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-1 bg-terminal rounded text-terminal-text text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <MDXRemote source={post.content} />
        </article>
      </TerminalWindow>
    </div>
  );
}