export function getScriptElement(apiKey: string) {
  return `<script src="http://localhost:8080/analytics_plugin.js?apiKey=${apiKey}"></script>`;
}
