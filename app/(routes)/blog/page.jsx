import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Blog',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/blog'>
        <div className='space-y-4'>
          <h2 className='text-xl text-terminal-green font-terminus'>
            Things I've written
          </h2>
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
