"use client";

import { useEffect, useState } from "react";
import { CreateConversationModal } from "../modals/CreateConversationModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateConversationModal />
    </>
  );
};
