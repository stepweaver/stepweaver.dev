import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/blog'>
        <div className='space-y-6'>
          <h1 className='text-2xl text-terminal-green font-terminus'>
            Blog Posts
          </h1>

          <div className='grid grid-cols-1 gap-6'>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
