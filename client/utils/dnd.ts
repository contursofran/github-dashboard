import dynamic from "next/dynamic";

const DragDropContext = dynamic(
  async () => {
    const mod = await import("@hello-pangea/dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);

const Droppable = dynamic(
  async () => {
    const mod = await import("@hello-pangea/dnd");
    return mod.Droppable;
  },
  { ssr: false }
);
const Draggable = dynamic(
  async () => {
    const mod = await import("@hello-pangea/dnd");
    return mod.Draggable;
  },
  { ssr: false }
);

export { DragDropContext, Droppable, Draggable };
