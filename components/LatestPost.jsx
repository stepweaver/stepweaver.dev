import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from './BlogCard';
import TerminalWindow from '@/components/ui/TerminalWindow';

export default async function LatestPost() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3); // Get the 3 most recent posts

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <TerminalWindow title='~/latest-posts'>
      <div className='space-y-4'>
        {latestPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </TerminalWindow>
  );
}
