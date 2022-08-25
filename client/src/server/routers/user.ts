import { createRouter } from "../context";

export const userRouter = createRouter().query("hello", {
  resolve() {
    return "Hello user";
  },
});
