import { useState } from 'react';

interface Disclosure {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export default function useDisclosure(): [boolean, Disclosure] {
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

  return [isOpen, { open, close, toggle }];
}
