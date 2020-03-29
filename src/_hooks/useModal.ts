import { useCallback, ReactElement, useState } from 'react';
import useToggle from './useToggle';

type Response<T> = [() => void, (props?: Partial<T>) => void];

function useModal<T>(
  render: (props: Partial<T> & { closeModal: () => void }) => ReactElement,
  onOpen?: () => void,
  onClose?: () => void,
): Response<T> {
  const [isVisible, setVisible] = useToggle(false);
  const [props, setProps] = useState<Partial<T>>({});

  const openModal = useCallback(
    (props: Partial<T> = {}) => {
      setProps(props);
      if (onOpen) onOpen();
      setVisible(true);
    },
    [onOpen, setVisible],
  );

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    setVisible(false);
  }, [onClose, setVisible]);

  const renderModal = useCallback(() => {
    if (isVisible) {
      return render({ closeModal, ...props });
    }
    return null;
  }, [isVisible, render, closeModal, props]);

  return [renderModal, openModal];
}

export default useModal;
