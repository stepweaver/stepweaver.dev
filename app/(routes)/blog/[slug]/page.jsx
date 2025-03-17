import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

// Tell Next.js about all the blog posts for optimal static generation
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on my blog`,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      <TerminalWindow title={`~/blog/${params.slug}`}>
        <article className='space-y-4'>
          <h1 className='text-xl text-terminal-green font-terminus'>
            {post.title}
          </h1>

          <div className='flex flex-wrap items-center gap-4 text-terminal-muted mb-4'>
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
                    <span className='text-terminal-green mr-1 font-bold'>
                      #
                    </span>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Display raw content for now */}
          <pre className='whitespace-pre-wrap text-terminal-text'>
            {post.content}
          </pre>
        </article>
      </TerminalWindow>
    </div>
  );
}
