import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import { LoginPage } from "auth/pages/login.page";
import { RegisterPage } from "auth/pages/register.page";
import { LibraryPage } from "library/pages/library.page";
import { LibraryDetailPage } from "library/pages/library-detail.page";
import { ConceptDetailPage } from "concept/pages/concept-detail.page";
import { ConceptsPage } from "concept/pages/concepts.page";
import { NotebooksPage } from "notebook/pages/notebooks.page";
import { NotebookDetailPage } from "notebook/pages/notebook-detail.page";
import { SectionDetailPage } from "section/pages/section-detail.page";
import { PracticePage } from "practice/pages/practice.page";
import { WorkflowsPage } from "workflow/pages/workflows.page";

interface IAppRoute<T = {}> {
  component: FC<T>;
  path: string;
  isPrivate?: boolean;
}

const login: IAppRoute = {
  component: LoginPage,
  path: "/login",
};

const register: IAppRoute = {
  component: RegisterPage,
  path: "/register",
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

const conceptDetail: IAppRoute<RouteComponentProps> = {
  component: ConceptDetailPage,
  path: "/concepts/:conceptId",
  isPrivate: true,
};

const notebooks: IAppRoute = {
  component: NotebooksPage,
  path: "/notebooks",
  isPrivate: true,
};

const notebookDetail: IAppRoute<RouteComponentProps> = {
  component: NotebookDetailPage,
  path: "/notebooks/:notebookId",
  isPrivate: true,
};

const sectionDetail: IAppRoute = {
  component: SectionDetailPage,
  path: "/sections/:sectionId",
  isPrivate: true,
};

const practice: IAppRoute = {
  component: PracticePage,
  path: "/practice",
  isPrivate: true,
};

const workflows: IAppRoute = {
  component: WorkflowsPage,
  path: "/workflows",
  isPrivate: true,
};

export const appRoutes = [
  login,
  register,
  library,
  libraryDetail,
  concepts,
  conceptDetail,
  notebooks,
  notebookDetail,
  sectionDetail,
  practice,
  workflows,
];
