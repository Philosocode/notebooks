import { FC } from "react";

import { HomePage } from "../pages/home.page";
import { LibraryPage } from "library/pages/library.page";
import { LibraryDetailPage } from "../library/pages/library-detail.page";
import { ConceptDetailPage } from "concepts/pages/concept-detail.page";
import { ConceptsPage } from "concepts/pages/concepts.page";
import { MaterialsPage } from "../pages/materials.page";
import { MaterialDetailPage } from "../pages/material-detail.page";
import { PartDetailPage } from "../pages/part-detail.page";
import { PracticePage } from "../pages/practice.page";
import { SettingsPage } from "../pages/settings.page";

interface IAppRoute {
  component: FC;
  path: string;
  isPrivate?: boolean;
}

const home: IAppRoute = {
  component: HomePage,
  path: "/",
};

const library: IAppRoute = {
  component: LibraryPage,
  path: "/library",
};

const libraryDetail: IAppRoute = {
  component: LibraryDetailPage,
  path: "/library/:page",
};

const concepts: IAppRoute = {
  component: ConceptsPage,
  path: "/concepts",
  isPrivate: true,
};

const conceptDetail: IAppRoute = {
  component: ConceptDetailPage,
  path: "/concepts/:conceptId",
  isPrivate: true,
};

const materials: IAppRoute = {
  component: MaterialsPage,
  path: "/materials",
  isPrivate: true,
};

const materialDetail: IAppRoute = {
  component: MaterialDetailPage,
  path: "/materials/:materialId",
  isPrivate: true,
};

const partDetail: IAppRoute = {
  component: PartDetailPage,
  path: "/part/:partId",
  isPrivate: true,
};

const practice: IAppRoute = {
  component: PracticePage,
  path: "/practice",
  isPrivate: true,
};

const settings: IAppRoute = {
  component: SettingsPage,
  path: "/settings",
  isPrivate: true,
};

export const appRoutes = [
  home,
  library,
  libraryDetail,
  concepts,
  conceptDetail,
  materials,
  materialDetail,
  partDetail,
  practice,
  settings,
];
