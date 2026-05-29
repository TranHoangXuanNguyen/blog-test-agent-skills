import { supabase } from '../lib/supabaseClient';
import { posts as staticPosts, type Post } from '../data/posts';
import { preprocessObsidian } from '../lib/obsidianPreprocess';
export type { Post };
export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.warn('Could not fetch from Supabase, returning static posts:', error.message);
      return staticPosts;
    }

    const dbPosts: Post[] = (data || []).map((p: any) => ({
      id: Number(p.id),
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      imageUrl: p.imageUrl,
      category: p.category,
      content: preprocessObsidian(p.content || ''),
      views_count: Number(p.views_count || 0),
      likes_count: Number(p.likes_count || 0),
    }));

    // Merge static posts and Supabase posts
    // Filter duplicates by title
    // Ensure static posts also get preprocessed (they may contain Obsidian wikilinks)
    const processedStatic = staticPosts.map(sp => ({ ...sp, content: preprocessObsidian(sp.content || '') }));

    const allPosts = [...dbPosts, ...processedStatic];
    const uniquePosts = allPosts.filter(
      (post, index, self) =>
        index === self.findIndex((p) => p.title.trim().toLowerCase() === post.title.trim().toLowerCase())
    );

    // Sort by ID descending
    return uniquePosts.sort((a, b) => b.id - a.id);
  } catch (err) {
    console.error('Error in getAllPosts:', err);
    return staticPosts;
  }
}

export interface CrawledPostData {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageUrl: string;
  content: string;
}

// Hàm đệ quy chuyển đổi HTML Node sang Markdown
function htmlToMarkdown(element: HTMLElement | ChildNode): string {
  let markdown = '';
  const children = element.childNodes;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    // Text Node
    if (node.nodeType === Node.TEXT_NODE) {
      markdown += node.textContent || '';
      continue;
    }

    // Chỉ xử lý Element Node
    if (node.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();

    // Bỏ qua các thẻ thừa/script/quản trị
    if (['script', 'style', 'noscript', 'iframe', 'button', 'input', 'form', 'nav', 'header', 'footer'].includes(tagName)) {
      continue;
    }

    switch (tagName) {
      case 'h1':
        markdown += `\n# ${htmlToMarkdown(el).trim()}\n\n`;
        break;
      case 'h2':
        markdown += `\n## ${htmlToMarkdown(el).trim()}\n\n`;
        break;
      case 'h3':
        markdown += `\n### ${htmlToMarkdown(el).trim()}\n\n`;
        break;
      case 'h4':
        markdown += `\n#### ${htmlToMarkdown(el).trim()}\n\n`;
        break;
      case 'p':
        markdown += `\n${htmlToMarkdown(el).trim()}\n\n`;
        break;
      case 'strong':
      case 'b':
        markdown += ` **${htmlToMarkdown(el).trim()}** `;
        break;
      case 'em':
      case 'i':
        markdown += ` *${htmlToMarkdown(el).trim()}* `;
        break;
      case 'code': {
        const parentTag = el.parentElement?.tagName.toLowerCase();
        if (parentTag === 'pre') {
          markdown += htmlToMarkdown(el);
        } else {
          markdown += ` \`${htmlToMarkdown(el).trim()}\` `;
        }
        break;
      }
      case 'pre':
        markdown += `\n\`\`\`\n${htmlToMarkdown(el)}\n\`\`\`\n\n`;
        break;
      case 'ul':
        markdown += `\n${htmlToMarkdown(el)}\n`;
        break;
      case 'ol':
        markdown += `\n${htmlToMarkdown(el)}\n`;
        break;
      case 'li': {
        const isOrdered = el.parentElement?.tagName.toLowerCase() === 'ol';
        markdown += isOrdered ? `1. ${htmlToMarkdown(el).trim()}\n` : `* ${htmlToMarkdown(el).trim()}\n`;
        break;
      }
      case 'a': {
        const href = el.getAttribute('href') || '';
        markdown += ` [${htmlToMarkdown(el).trim()}](${href}) `;
        break;
      }
      case 'img': {
        const src = el.getAttribute('src') || '';
        const alt = el.getAttribute('alt') || 'image';
        markdown += `\n![${alt}](${src})\n\n`;
        break;
      }
      case 'blockquote':
        markdown += `\n> ${htmlToMarkdown(el).trim().replace(/\n/g, '\n> ')}\n\n`;
        break;
      case 'br':
        markdown += '\n';
        break;
      case 'div':
      case 'span':
      case 'section':
      case 'article':
      default:
        markdown += htmlToMarkdown(el);
        break;
    }
  }

  return markdown;
}

export async function crawlDevToPost(url: string): Promise<CrawledPostData> {
  // Kiểm tra nếu là URL của Dev.to thì ưu tiên dùng API chính thức của họ
  const isDevTo = /https:\/\/dev\.to\/([^/]+)\/([^/]+)/.test(url);

  if (isDevTo) {
    const match = url.match(/https:\/\/dev\.to\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error('URL Dev.to không hợp lệ.');
    const username = match[1];
    const slug = match[2];
    const apiUrl = `https://dev.to/api/articles/${username}/${slug}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Lỗi gọi API Dev.to: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.title || !data.body_markdown) {
      throw new Error('Dữ liệu bài viết trả về không hợp lệ.');
    }

    let category = 'AI & Technology';
    if (data.tags && data.tags.length > 0) {
      const firstTag = data.tags[0];
      category = firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
    }

    let cleanMarkdown: string = data.body_markdown;
    cleanMarkdown = cleanMarkdown.replace(/{%\s*embed\s+(https?:\/\/\S+)\s*%}/g, '[Tham khảo liên kết tại đây]($1)');

    return {
      title: data.title,
      excerpt: data.description || 'Bài viết kỹ thuật từ cộng đồng Dev.to',
      category,
      readTime: `${data.reading_time_minutes || 5} phút đọc`,
      imageUrl: data.cover_image || data.social_image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      content: cleanMarkdown,
    };
  }

  // Trường hợp CRAWL BLOG BẤT KỲ sử dụng CORS Proxy
  // Sử dụng CORS Proxy miễn phí AllOrigins để lấy nội dung HTML của trang web mục tiêu
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`Không thể truy cập trang web qua CORS Proxy (Lỗi: ${response.status})`);
  }

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // 1. Trích xuất Tiêu đề (OpenGraph -> Meta Title -> h1 -> Tiêu đề mặc định)
  const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')
    || doc.querySelector('title')?.textContent
    || doc.querySelector('h1')?.textContent
    || 'Bài viết mới cào';

  // 2. Trích xuất Mô tả (OpenGraph -> Meta Description -> Mô tả mặc định)
  const excerpt = doc.querySelector('meta[property="og:description"]')?.getAttribute('content')
    || doc.querySelector('meta[name="description"]')?.getAttribute('content')
    || 'Bài viết kỹ thuật được chia sẻ từ web.';

  // 3. Trích xuất Chuyên mục (thử lấy từ thẻ tag/keyword hoặc mặc định)
  const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content');
  let category = 'Technology';
  if (keywords) {
    const firstKeyword = keywords.split(',')[0].trim();
    if (firstKeyword) {
      category = firstKeyword.charAt(0).toUpperCase() + firstKeyword.slice(1);
    }
  }

  // 4. Trích xuất Ảnh bìa (OpenGraph -> Meta Image -> Ảnh mặc định)
  const imageUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content')
    || doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content')
    || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800';

  // 5. Trích xuất thời gian đọc (ước lượng số từ nếu không có tag đọc)
  const readingTimeEstimate = Math.ceil(doc.body.innerText.split(/\s+/).length / 200) || 5;
  const readTime = `${readingTimeEstimate} phút đọc`;

  // 6. Trích xuất Nội dung chính (Thử tìm các thẻ bọc phổ biến)
  const contentElement = doc.querySelector('article')
    || doc.querySelector('main')
    || doc.querySelector('.post-content')
    || doc.querySelector('.article-content')
    || doc.querySelector('#content')
    || doc.body;

  // Clone lại node nội dung để làm sạch (loại bỏ sidebar, comment, script, style)
  const clone = contentElement.cloneNode(true) as HTMLElement;
  const unwanted = clone.querySelectorAll(
    'script, style, noscript, iframe, button, input, form, nav, header, footer, .sidebar, #sidebar, .comments, #comments, .menu, #menu'
  );
  unwanted.forEach(node => node.remove());

  // Chuyển đổi sang Markdown và làm sạch các dòng trắng thừa
  const contentMarkdown = htmlToMarkdown(clone)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!contentMarkdown || contentMarkdown.length < 50) {
    throw new Error('Nội dung cào được quá ngắn hoặc không tìm thấy khối bài viết chính.');
  }

  return {
    title: title.trim(),
    excerpt: excerpt.trim(),
    category: category.trim(),
    readTime,
    imageUrl,
    content: contentMarkdown,
  };
}

export async function savePostToSupabase(postData: CrawledPostData): Promise<Post> {
  const dateObj = new Date();
  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: postData.title,
        excerpt: postData.excerpt,
        category: postData.category,
        readTime: postData.readTime,
        imageUrl: postData.imageUrl,
        content: postData.content,
        date: formattedDate,
        views_count: 0,
        likes_count: 0,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Lỗi lưu bài viết vào Supabase: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Không nhận được phản hồi dữ liệu sau khi lưu bài viết.');
  }

  const p = data[0];
  return {
    id: Number(p.id),
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    imageUrl: p.imageUrl,
    category: p.category,
    content: p.content,
    views_count: Number(p.views_count || 0),
    likes_count: Number(p.likes_count || 0),
  };
}

export async function deletePostFromSupabase(id: number): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Lỗi xóa bài viết từ Supabase: ${error.message}`);
  }
}

// Hàm tăng lượt xem bài viết thông qua RPC
export async function incrementPostViews(id: number): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_views', { post_id: id });
    if (error) throw error;
  } catch (err: any) {
    console.error(`Failed to increment views for post ${id}:`, err.message);
  }
}

// Hàm tăng lượt thích bài viết thông qua RPC
export async function incrementPostLikes(id: number): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_likes', { post_id: id });
    if (error) throw error;
  } catch (err: any) {
    console.error(`Failed to increment likes for post ${id}:`, err.message);
    throw err;
  }
}

export interface BlogComment {
  id: number;
  post_id: number;
  author_name: string;
  author_avatar: string;
  content: string;
  created_at: string;
}

export async function getCommentsForPost(postId: number): Promise<BlogComment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Could not fetch comments from Supabase:', error.message);
      return [];
    }

    return (data || []).map((c: any) => ({
      id: Number(c.id),
      post_id: Number(c.post_id),
      author_name: c.author_name,
      author_avatar: c.author_avatar,
      content: c.content,
      created_at: c.created_at,
    }));
  } catch (err) {
    console.error('Error fetching comments:', err);
    return [];
  }
}

export async function insertComment(
  postId: number,
  authorName: string,
  authorAvatar: string,
  content: string
): Promise<BlogComment> {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: postId,
        author_name: authorName,
        author_avatar: authorAvatar,
        content: content,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Lỗi gửi bình luận: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Không nhận được phản hồi sau khi gửi bình luận.');
  }

  const c = data[0];
  return {
    id: Number(c.id),
    post_id: Number(c.post_id),
    author_name: c.author_name,
    author_avatar: c.author_avatar,
    content: c.content,
    created_at: c.created_at,
  };
}

export async function deleteComment(commentId: number): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    throw new Error(`Lỗi xóa bình luận: ${error.message}`);
  }
}
