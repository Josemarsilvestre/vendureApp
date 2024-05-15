import { useState } from 'react';

interface DisclosureState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export default function useDisclosure(): [boolean, DisclosureState] {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    if (!isOpen) setIsOpen(true);
  };

  const close = () => {
    if (isOpen) setIsOpen(false);
  };

  const toggle = () => {
    isOpen ? close() : open();
  };

  const disclosureState: DisclosureState = {
    isOpen,
    open,
    close,
    toggle,
  };

  return [isOpen, disclosureState];
}
