// Este site é uma demo: ações que dependeriam de backend mostram um aviso
export const DEMO_NOTICE_EVENT = "petcare:demo-notice";

export function showDemoNotice(message: string) {
  window.dispatchEvent(new CustomEvent(DEMO_NOTICE_EVENT, { detail: message }));
}
