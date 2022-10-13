import { GuestData } from "../../../utils/data";
import { MappedRepositories } from "./filterRepositories";

export const MAX_REPOS_PER_PAGE = 13;

export const getPagination = (reposLength: number) => {
  const pages = Math.ceil(reposLength / MAX_REPOS_PER_PAGE);

  return pages;
};

export const getPaginationData = (data: MappedRepositories, page: number) => {
  const start = (page - 1) * MAX_REPOS_PER_PAGE;
  const end = start + MAX_REPOS_PER_PAGE;

  return data.slice(start, end);
};

export const getPaginationDataGuest = (data: GuestData, page: number) => {
  const start = (page - 1) * MAX_REPOS_PER_PAGE;
  const end = start + MAX_REPOS_PER_PAGE;

  return data.repositories.slice(start, end);
};
