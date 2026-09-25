/**
 * Utility to parse and format blog markdown and HTML content.
 * Ensures images (Markdown, direct image URLs, and HTML img tags) are rendered visually.
 */

export function parseBlogContentToHtml(content: string): string {
  if (!content) return "";

  // Normalize line breaks
  let formatted = content.replace(/\r\n/g, "\n");

  // 1. Process Markdown Images first: ![Alt text](url)
  // Supports optional size syntax: ![Alt|50%|center](url)
  formatted = formatted.replace(
    /!\[(.*?)\]\((https?:\/\/[^\s\)]+|data:image\/[^\s\)]+|\/[^\s\)]+)\)/g,
    (_match, altText, url) => {
      const cleanAlt = altText.trim();
      const captionHtml =
        cleanAlt && !cleanAlt.toLowerCase().includes("blog image") && cleanAlt !== "image"
          ? `<figcaption class="text-xs text-neutral-500 mt-2 italic text-center">${cleanAlt}</figcaption>`
          : "";

      return `\n<figure class="my-6 text-center block">
  <img src="${url}" alt="${cleanAlt || "Blog Visual"}" class="mx-auto max-w-full h-auto rounded-xl shadow-md object-cover inline-block" loading="lazy" />
  ${captionHtml}
</figure>\n`;
    }
  );

  // 2. Process standalone Image URLs on their own lines (e.g. https://.../pic.jpg or /images/...png or data:image/...)
  formatted = formatted.replace(
    /^(?:<p>)?\s*((?:https?:\/\/[^\s<>]+\.(?:png|jpg|jpeg|webp|gif|svg)(?:\?[^\s<>]*)?)|\/images\/[^\s<>]+\.(?:png|jpg|jpeg|webp|gif|svg)|data:image\/[a-zA-Z+]+;base64,[A-Za-z0-9+/=]+)\s*(?:<\/p>)?$/gim,
    (_match, url) => {
      return `\n<div class="my-6 text-center block">
  <img src="${url}" alt="Blog visual" class="mx-auto max-w-full h-auto rounded-xl shadow-md object-cover inline-block" loading="lazy" />
</div>\n`;
    }
  );

  // 3. Process Markdown Headings (#, ##, ###, ####)
  formatted = formatted.replace(
    /^#### (.*?)$/gm,
    "<h4 class='text-base font-bold text-neutral-900 mt-4 mb-2'>$1</h4>"
  );
  formatted = formatted.replace(
    /^### (.*?)$/gm,
    "<h3 class='text-lg sm:text-xl font-bold text-neutral-900 mt-6 mb-2'>$1</h3>"
  );
  formatted = formatted.replace(
    /^## (.*?)$/gm,
    "<h2 class='text-xl sm:text-2xl font-black text-neutral-900 mt-8 mb-3 tracking-tight'>$1</h2>"
  );
  formatted = formatted.replace(
    /^# (.*?)$/gm,
    "<h1 class='text-2xl sm:text-3xl font-black text-neutral-900 mt-8 mb-4 tracking-tight'>$1</h1>"
  );

  // 4. Process Markdown Blockquotes (> quote)
  formatted = formatted.replace(
    /^> (.*?)$/gm,
    "<blockquote class='border-l-4 border-amber-500 pl-4 py-1.5 my-4 italic text-neutral-700 bg-amber-50/40 rounded-r-lg'>$1</blockquote>"
  );

  // 5. Process Markdown Links (exclude ! links which are images)
  formatted = formatted.replace(
    /(?<!!)\[(.*?)\]\((.*?)\)/g,
    "<a href='$2' class='text-amber-600 hover:text-amber-700 underline font-medium transition-colors' target='_blank' rel='noopener noreferrer'>$1</a>"
  );

  // 6. Bold and Italic
  formatted = formatted.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/`([^`]+)`/g, "<code class='px-1.5 py-0.5 bg-neutral-100 text-amber-800 text-xs font-mono rounded'>$1</code>");

  // 7. Unordered Bullet lists (- item or * item)
  formatted = formatted.replace(
    /^[*-] (.*?)$/gm,
    "<li class='ml-4 list-disc text-neutral-700 my-1'>$1</li>"
  );

  // 8. Wrap loose paragraphs
  const blocks = formatted.split(/\n\n+/);
  const parsedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // If already wrapped in block-level tags, don't wrap with <p>
    if (
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<figure") ||
      trimmed.startsWith("<h1") ||
      trimmed.startsWith("<h2") ||
      trimmed.startsWith("<h3") ||
      trimmed.startsWith("<h4") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<p") ||
      trimmed.startsWith("<iframe") ||
      trimmed.startsWith("<table")
    ) {
      return trimmed;
    }

    // Convert single newlines inside paragraph to <br/>
    const withBr = trimmed.replace(/\n/g, "<br />");
    return `<p class="my-3 leading-relaxed text-neutral-700">${withBr}</p>`;
  });

  return parsedBlocks.filter(Boolean).join("\n\n");
}
