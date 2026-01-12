export function toYoutubeEmbedUrl(input: string | null | undefined): string {
  if (!input) return '';

  const urlText = input.trim();
  if (!urlText) return '';

  // If user pasted just the video id
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlText)) {
    return `https://www.youtube.com/embed/${urlText}`;
  }

  // If it's already an embed URL
  const embedMatch = urlText.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch?.[1]) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }

  try {
    const u = new URL(urlText);
    const host = u.hostname.replace(/^www\./, '').replace(/^m\./, '');

    // youtu.be/<id>
    if (host === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }

    if (host.endsWith('youtube.com')) {
      // youtube.com/watch?v=<id>
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;

      // youtube.com/shorts/<id>
      const shorts = u.pathname.match(/\/shorts\/([^/?#]+)/);
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`;

      // youtube.com/live/<id>
      const live = u.pathname.match(/\/live\/([^/?#]+)/);
      if (live?.[1]) return `https://www.youtube.com/embed/${live[1]}`;
    }
  } catch {
    // Ignore URL parse failures and fall through.
  }

  // Fallback: try to find a video id anywhere
  const idMatch = urlText.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&/#]|$)/);
  return idMatch?.[1] ? `https://www.youtube.com/embed/${idMatch[1]}` : '';
}
