import { FC } from "react";

import { HomePage } from "../pages/home.page";
import { LibraryPage } from "../library/pages/library.page";
import { LibraryDetailPage } from "../pages/library-detail.page";
import { ConceptDetailPage } from "../pages/concept-detail.page";
import { ConceptsPage } from "../pages/concepts.page";
import { MaterialsPage } from "../pages/materials.page";
import { MaterialDetailPage } from "../pages/material-detail.page";
import { PartDetailPage } from "../pages/part-detail.page";
import { PracticePage } from "../pages/practice.page";
import { SettingsPage } from "../pages/settings.page";

interface IRouteObject {
  component: FC;
  path: string;
  isPrivate?: boolean;
}

const home: IRouteObject = {
  component: HomePage,
  path: "/",
};

const library: IRouteObject = {
  component: LibraryPage,
  path: "/library",
};

const libraryDetail: IRouteObject = {
  component: LibraryDetailPage,
  path: "/library/:page",
};

const concepts: IRouteObject = {
  component: ConceptsPage,
  path: "/concepts",
  isPrivate: true,
};

const conceptDetail: IRouteObject = {
  component: ConceptDetailPage,
  path: "/concepts/:conceptId",
  isPrivate: true,
};

const materials: IRouteObject = {
  component: MaterialsPage,
  path: "/materials",
  isPrivate: true,
};

const materialDetail: IRouteObject = {
  component: MaterialDetailPage,
  path: "/materials/:materialId",
  isPrivate: true,
};

const partDetail: IRouteObject = {
  component: PartDetailPage,
  path: "/part/:partId",
  isPrivate: true,
};

const practice: IRouteObject = {
  component: PracticePage,
  path: "/practice",
  isPrivate: true,
};

const settings: IRouteObject = {
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
