import React from "react";
import { Route, Switch } from "react-router-dom";

import { HomePage } from "pages/home.page";
import { ConceptsPage } from "pages/concepts.page";
import { ConceptDetailPage } from "pages/concept-detail.page";
import { PartDetailPage } from "pages/part-detail.page";
import { NotFoundPage } from "pages/not-found.page";
import { LibraryPage } from "pages/library.page";
import { LibraryDetailPage } from "pages/library-detail.page";
import { MaterialsPage } from "pages/materials.page";
import { MaterialDetailPage } from "pages/material-detail.page";
import { PracticePage } from "pages/practice.page";
import { SettingsPage } from "pages/settings.page";

export function App() {
  return (
    <div className="app-container font-san">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/concepts" component={ConceptsPage} />
        <Route exact path="/concepts/:conceptId" component={ConceptDetailPage} />
        <Route exact path="/materials" component={MaterialsPage} />
        <Route exact path="/materials/:materialId" component={MaterialDetailPage} />
        <Route exact path="/part/:partId" component={PartDetailPage} />
        <Route exact path="/practice" component={PracticePage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/library" component={LibraryPage} />
        <Route exact path="/library/:page" component={LibraryDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
