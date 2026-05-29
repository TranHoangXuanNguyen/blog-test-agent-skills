export const slugify = (text: string) => {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const preprocessObsidian = (raw: string) => {
  let s = raw || '';
  // Remove inline style attributes
  s = s.replace(/style="[^"]*"/g, '');

  // Transclusions: ![[file.png]] or ![[note.md]]
  s = s.replace(/!\[\[([^\]]+)\]\]/g, (_m, inner) => {
    const raw = String(inner);
    const parts = raw.split('|');
    const target = parts[0].trim();
    const alias = parts[1] ? parts[1].trim() : null;
    const ext = (target.split('.').pop() || '').toLowerCase();
    const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
    if (imageExts.includes(ext)) {
      return `![${alias || target}](/assets/${target})`;
    }
    const [filePart, anchorPart] = target.split('#');
    const slug = slugify(filePart || target);
    const anchor = anchorPart ? `#${slugify(anchorPart)}` : '';
    return `[${alias || filePart || target}](/blogs/${slug}${anchor})`;
  });

  // [[target|alias]] => [alias](/blogs/slug-target)
  s = s.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, (_m, target, alias) => {
    const slug = slugify(String(target));
    return `[${alias}](/blogs/${slug})`;
  });

  // [[target]] => [target](/blogs/slug-target) with anchors
  s = s.replace(/\[\[([^\]]+)\]\]/g, (_m, target) => {
    const raw = String(target);
    const parts = raw.split('#');
    const file = parts[0];
    const anchor = parts[1];
    const label = (file || raw).split('/').pop() || raw;
    const slug = slugify(String(file || raw));
    const anchorSuffix = anchor ? `#${slugify(anchor)}` : '';
    return `[${label}](/blogs/${slug}${anchorSuffix})`;
  });

  // Callouts: > [!NOTE] ...  => convert marker to bolded label inside blockquote
  s = s.replace(/^>\s*\[!([^\]]+)\]\s*/gmi, (_m, type) => {
    const label = String(type).charAt(0).toUpperCase() + String(type).slice(1).toLowerCase();
    return `> **${label}:** `;
  });

  // Tags: #tag => link to /tags/tag (avoid converting headings like '# ')
  s = s.replace(/(^|\s)#(?!\s)([\w\/-]+)/g, (_m, pre, tag) => `${pre}[#${tag}](/tags/${slugify(tag)})`);

  // Block references: ^blockid -> keep as anchor-friendly form
  s = s.replace(/\^([A-Za-z0-9_-]+)/g, (_m, id) => `#^${id}`);

  // Convert simple HTML elements to markdown/plain text
  s = s.replace(/<img[^>]*>/gi, (m) => {
    const srcMatch = m.match(/src=["']([^"']+)["']/i);
    const altMatch = m.match(/alt=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : 'image';
    if (!src) return '';
    return `![${alt}](${src})`;
  });

  s = s.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, href, txt) => {
    const cleanText = txt.replace(/<[^>]+>/g, '').trim();
    return `[${cleanText}](${href})`;
  });

  // Paragraphs -> newlines
  s = s.replace(/<p[^>]*>/gi, '\n\n');
  s = s.replace(/<\/p>/gi, '\n\n');

  // Breaks
  s = s.replace(/<br\s*\/?\s*>/gi, '\n');

  // Remove wrapper tags but keep inner text
  s = s.replace(/<\/?(span|div|section|article|main|header|footer|figure|figcaption)[^>]*>/gi, '');
  s = s.replace(/<[^>]+>/g, '');

  // Normalize repeated newlines
  s = s.replace(/\n{3,}/g, '\n\n');

  return s;
};

export default preprocessObsidian;