import { useState } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { ListState } from "./useLists";
import { useRefetchCards } from "./useRefetchCards";

function useMoveCard({ listsStateArray }: { listsStateArray: ListState }) {
  const [shouldUpdateCardType, setShouldUpdateCardType] = useState(false);
  const [shouldUpdateCardIndex, setShouldUpdateCardIndex] = useState(false);
  const selectedTab = useStore((state) => state.selectedTab);
  const [sourceListIndex, setSourceListIndex] = useState("0");
  const [destinationListIndex, setDestinationListIndex] = useState("0");

  const { reFetchCards, startOne } = useRefetchCards();

  const updateIndexMutation = trpc.useMutation([`${selectedTab}.updateIndex`], {
    onMutate: () => startOne(),
    onSettled: () => {
      reFetchCards();
    },
  });

  const updateTypeMutation = trpc.useMutation([`${selectedTab}.updateType`], {
    onMutate: () => startOne(),
    onSettled: () => {
      reFetchCards();
    },
  });

  const updateCardIndex = () => {
    const sourceList = listsStateArray[Number(sourceListIndex)];

    const cards = sourceList.map((item) => {
      return {
        id: item.id,
        index: sourceList.indexOf(item),
      };
    });

    cards.forEach((card) => {
      updateIndexMutation.mutate({
        id: card.id,
        index: card.index,
      });
    });

    setShouldUpdateCardIndex(false);
  };

  const updateCardType = () => {
    const sourceList = listsStateArray[Number(sourceListIndex)];
    const destinationList = listsStateArray[Number(destinationListIndex)];

    const cards = sourceList.map((item) => {
      return {
        id: item.id,
        index: sourceList.indexOf(item),
      };
    });

    const detinationCards = destinationList.map((item) => {
      return {
        id: item.id,
        index: destinationList.indexOf(item),
      };
    });

    cards.forEach((card) => {
      updateIndexMutation.mutate({
        id: card.id,
        index: card.index,
      });
    });

    detinationCards.forEach((card) => {
      updateIndexMutation.mutate({
        id: card.id,
        index: card.index,
      });
    });
    setShouldUpdateCardType(false);
  };

  return {
    updateCardIndex,
    updateCardType,
    shouldUpdateCardIndex,
    setSourceListIndex,
    setDestinationListIndex,
    shouldUpdateCardType,
    updateTypeMutation,
    setShouldUpdateCardIndex,
    setShouldUpdateCardType,
  };
}

export { useMoveCard };
