export type Scalars = {
  Boolean: boolean;
  Date: any;
  Int: number;
  String: string;
};

export type User = {
  __typename?: "User";
  /** Determine if this repository owner has any items that can be pinned to their profile. */
  /** The username used to login. */
  login: Scalars["String"];
};

export type Query = {
  viewer: User;
};

/** A calendar of contributions made on GitHub by a user. */
export type ContributionCalendar = {
  __typename?: "ContributionCalendar";
  /** A list of hex color codes used in this calendar. The darker the color, the more contributions it represents. */
  colors: Array<Scalars["String"]>;
  /** Determine if the color set was chosen because it's currently Halloween. */
  isHalloween: Scalars["Boolean"];
  /** A list of the months of contributions in this calendar. */
  months: Array<ContributionCalendarMonth>;
  /** The count of total contributions in the calendar. */
  totalContributions: Scalars["Int"];
  /** A list of the weeks of contributions in this calendar. */
  weeks: Array<ContributionCalendarWeek>;
};

/** Varying levels of contributions from none to many. */
export enum ContributionLevel {
  /** Lowest 25% of days of contributions. */
  FirstQuartile = "FIRST_QUARTILE",
  /** Highest 25% of days of contributions. More contributions than the third quartile. */
  FourthQuartile = "FOURTH_QUARTILE",
  /** No contributions occurred. */
  None = "NONE",
  /** Second lowest 25% of days of contributions. More contributions than the first quartile. */
  SecondQuartile = "SECOND_QUARTILE",
  /** Second highest 25% of days of contributions. More contributions than second quartile, less than the fourth quartile. */
  ThirdQuartile = "THIRD_QUARTILE",
}

/** Represents a single day of contributions on GitHub by a user. */
export type ContributionCalendarDay = {
  __typename?: "ContributionCalendarDay";
  /** The hex color code that represents how many contributions were made on this day compared to others in the calendar. */
  color: Scalars["String"];
  /** How many contributions were made by the user on this day. */
  contributionCount: Scalars["Int"];
  /**
   * Indication of contributions, relative to other days. Can be used to indicate
   * which color to represent this day on a calendar.
   */
  contributionLevel: ContributionLevel;
  /** The day this square represents. */
  date: Scalars["Date"];
  /** A number representing which day of the week this square represents, e.g., 1 is Monday. */
  weekday: Scalars["Int"];
};

/** A month of contributions in a user's contribution graph. */
export type ContributionCalendarMonth = {
  __typename?: "ContributionCalendarMonth";
  /** The date of the first day of this month. */
  firstDay: Scalars["Date"];
  /** The name of the month. */
  name: Scalars["String"];
  /** How many weeks started in this month. */
  totalWeeks: Scalars["Int"];
  /** The year the month occurred in. */
  year: Scalars["Int"];
};

/** A week of contributions in a user's contribution graph. */
export type ContributionCalendarWeek = {
  __typename?: "ContributionCalendarWeek";
  /** The days of contributions in this week. */
  contributionDays: Array<ContributionCalendarDay>;
  /** The date of the earliest square in this week. */
  firstDay: Scalars["Date"];
};

export type ContributionsCollection = {
  __typename?: "ContributionsCollection";
  /** Commit contributions made by the user, grouped by repository. */
  contributionCalendar: ContributionCalendar;
  /** The years the user has been making contributions with the most recent year first. */
};
