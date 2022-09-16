import create from "zustand";
import {
  AplicationSlice,
  createAplicationSlice,
} from "./createAplicationSlice";
import {
  createNotificationSlice,
  NotificationSlice,
} from "./createNotificationStore";

const useStore = create<AplicationSlice & NotificationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
  ...createNotificationSlice(...a),
}));

export { useStore };
