import { BoardCard } from "../views/Board/types";

export interface GuestData {
  repositories: {
    description: string;
    features: {
      cards: BoardCard[];
    };
    issues: {
      cards: BoardCard[];
    };
    language: string;
    name: string;
    pushed_at: string;
    tasks: {
      cards: BoardCard[];
    };
    visibility: string;
  }[];
  user: {
    avatar_url: string;
    email: string;
    name: string;
  };
}

const guestUser: GuestData =
  // generate fake data
  {
    user: {
      name: "Guest user",
      email: "guestuser@email.com",
      avatar_url: "",
    },
    repositories: [
      {
        name: "Example Public Repository",
        description: "This is a repository for guest users",
        language: "JavaScript",
        pushed_at: "2022-08-01T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
            },
          ],
        },
      },
      {
        name: "Example Public Repository 3",
        description: "This is a repository for guest users",
        language: "CSS",
        pushed_at: "2022-08-01T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
            },
          ],
        },
      },
      {
        name: "Example Public Repository 2",
        description: "This is a repository for guest users",
        language: "TypeScript",
        pushed_at: "2021-06-04T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
            },
          ],
        },
      },
      {
        name: "Example Private Repository",
        description: "This is a repository for guest users",
        language: "TypeScript",
        pushed_at: "2021-08-01T00:00:00Z",
        visibility: "private",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
            },
          ],
        },
      },
    ],
  };

export { guestUser };
