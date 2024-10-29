import { useState } from "react";

export const useDialogHandler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onClose() {
    setIsDialogOpen(false);
  }

  function onOpen() {
    setIsDialogOpen(true);
  }

  function onToggle() {
    setIsDialogOpen(false);
  }

  function onOpenChange(open: boolean) {
    setIsDialogOpen(open);
  }

  return { isDialogOpen, onClose, onOpen, onToggle, onOpenChange };
};
