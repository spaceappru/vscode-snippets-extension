import { astroComponentTemplate } from "./astro-component";
import { astroSliceTemplate } from "./astro-slice";
import { reactComponentTemplate } from "./react-component";
import { reactComponentScssTemplate } from "./react-component-scss";
import { reactSliceTemplate } from "./react-slice";
import { reactSliceScssTemplate } from "./react-slice-scss";
import { astroSliceLibTemplate } from "./astro-slice-lib";
import { astroPageTemplate } from "./astro-page";
import type { TemplateDefinition } from "./types";

/** Все шаблоны для команд "Создать из шаблона". Добавь сюда новый шаблон и команду в package.json. */
export const templates: TemplateDefinition[] = [
  astroSliceTemplate,
  astroComponentTemplate,
  reactComponentTemplate,
  reactComponentScssTemplate,
  reactSliceTemplate,
  reactSliceScssTemplate,
  astroSliceLibTemplate,
  astroPageTemplate,
];
