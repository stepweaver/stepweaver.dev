import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);
        const slug = file.replace(/\.mdx$/, '');

        return {
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags,
          content,
          excerpt: data.excerpt,
        };
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags,
      content,
      excerpt: data.excerpt,
    };
  } catch (error) {
    return null;
  }
}