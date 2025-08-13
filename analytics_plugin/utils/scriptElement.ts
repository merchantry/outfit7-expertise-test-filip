import { FILE_NAME } from '../config';

export function getAnalyticsScriptTag(): HTMLScriptElement | null {
  const scripts = document.getElementsByTagName('script');
  for (const script of Array.from(scripts)) {
    if (script.src && script.src.includes(FILE_NAME)) {
      return script;
    }
  }
  return null;
}

export function getApiKeyFromScriptTag(): string | null {
  const scriptTag = getAnalyticsScriptTag();
  if (!scriptTag) return null;

  const srcUrl = new URL(scriptTag.src);
  return srcUrl.searchParams.get('apiKey');
}
