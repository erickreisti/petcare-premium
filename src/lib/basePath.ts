// basePath só em produção (GitHub Pages); em dev o site fica em localhost:3000/.
// NODE_ENV é sempre embutido no bundle, ao contrário de variáveis repassadas por `env` no next.config.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/petcare-premium" : "";
export const SITE_URL = `https://erickreisti.github.io${BASE_PATH}`;
