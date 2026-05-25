import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  lang: string = "tsx",
): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
    defaultColor: false,
  });
}
