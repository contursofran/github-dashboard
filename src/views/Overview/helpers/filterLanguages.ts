import { LanguageArray } from "../components/TopLanguages";
import { LanguageEdge, Maybe, Repository } from "../types/github";

const filterReposWithoutEdges = (repos: Repository[]) => {
  return repos.filter(
    (repo) => repo.languages?.edges && repo.languages?.edges?.length > 0
  );
};

const getReposEdges = (repos: Repository[]) => {
  const filteredRepos = filterReposWithoutEdges(repos);

  const edges = filteredRepos.map((repo) => repo.languages?.edges);

  return edges;
};

function totalSize(edges: (Maybe<Maybe<LanguageEdge>[]> | undefined)[]) {
  return edges.reduce((acc, curr) => {
    const total = curr?.reduce((acc, curr) => {
      if (curr) {
        return acc + curr?.size;
      } else {
        return acc;
      }
    }, 0);
    if (total) {
      return acc + total;
    } else {
      return acc;
    }
  }, 0);
}

const percentage = (size: number, totalSize: number) => {
  const percentage = (size / totalSize) * 100;
  const noDecimalPercentage = Math.round(percentage);

  return noDecimalPercentage;
};

export const filterLanguages = (repos: Repository[]) => {
  const edges = getReposEdges(repos);
  const total = totalSize(edges);
  console.log(total);
  const languages: LanguageArray[] = [];

  edges.forEach((edge) => {
    edge?.forEach((lang) => {
      const language = languages.find((l) => l.name === lang?.node.name);

      if (language && lang) {
        language.size += lang?.size;
      } else if (lang) {
        languages.push({
          name: lang?.node.name,
          size: lang?.size,
          color: lang?.node.color,
        });
      }
    });
  });

  const sortedLanguages = languages.sort((a, b) => b.size - a.size);
  const topLanguages = sortedLanguages.slice(0, 4);

  topLanguages.forEach((lang) => {
    lang.percentage = percentage(lang.size, total);
  });

  return topLanguages;
};
