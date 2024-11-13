/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from "../../../../app.state.interface";
import { createSelector } from "reselect";
import * as fromMultipleWebsites from "../reducer/multiple-websites.reducer";

export const MultipleWebsitesState = (state: AppState) =>
  state.multipleWebsites;

/*Get Multiple websites List*/

export const MultipleWebsitesList = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.MultipleWebsiteslist
);

export const MultipleWebsitesListLoading = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.MultipleWebsiteslistLoading
);
export const MultipleWebsitesListLoaded = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.MultipleWebsiteslistLoaded
);
export const MultipleWebsitesListFailed = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.MultipleWebsiteslistFailed
);

/*Create Multiple websites*/

export const CreateMultipleWebsites = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.CreateMultipleWebsites
);

export const CreateMultipleWebsitesLoading = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.CreateMultipleWebsitesLoading
);
export const CreateMultipleWebsitesLoaded = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.CreateMultipleWebsitesLoaded
);
export const CreateMultipleWebsitesFailed = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.CreateMultipleWebsitesFailed
);

/*Update Multiple websites*/

export const UpdateMultipleWebsites = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.UpdateMultipleWebsites
);

export const UpdateMultipleWebsitesLoading = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.UpdateMultipleWebsitesLoading
);
export const UpdateMultipleWebsitesLoaded = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.UpdateMultipleWebsitesLoaded
);
export const UpdateMultipleWebsitesFailed = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.UpdateMultipleWebsitesFailed
);

// get settings details
export const GetSettingsMultipleWebsites = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.GetSettingsMultipleWebsites
);

export const GetSettingsMultipleWebsitesLoading = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.GetSettingsMultipleWebsitesLoading
);
export const GetSettingsMultipleWebsitesLoaded = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.GetSettingsMultipleWebsitesLoaded
);
export const GetSettingsMultipleWebsitesFailed = createSelector(
  MultipleWebsitesState,
  fromMultipleWebsites.GetSettingsMultipleWebsitesFailed
);