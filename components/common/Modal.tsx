import React, { ReactElement, ReactNode } from 'react';
import { Pressable, Text, View, ViewProps, TextStyle, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import Icons from './Icons';

interface ModalProps {
  isShow: boolean;
  onClose: () => void;
  closeOnClickOverlay: boolean;
  effect?: string;
  animationIn?: string;
  animationOut?: string;
  onBackdropPress?: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isShow,
  onClose,
  closeOnClickOverlay,
  effect,
  animationIn,
  animationOut,
  onBackdropPress,
  children,
  ...restProps
}: ModalProps) => {
  const handleBackdropPress = () => {
    closeOnClickOverlay && onClose();
  };

  return (
    <ReactNativeModal isVisible={isShow} onBackdropPress={handleBackdropPress} {...restProps}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, { onClose });
        }
        return child;
      })}
    </ReactNativeModal>
  );
};

interface ContentProps extends ViewProps {
  onClose: () => void;
  children?: ReactNode;
}

const Content: React.FC<ContentProps> = ({ onClose, children, ...restProps }: ContentProps) => {
  return (
    <View {...restProps}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, { onClose });
        }
        return child;
      })}
    </View>
  );
};

interface HeaderProps {
  onClose: () => void;
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ onClose, children }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{children}</Text>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Icons.AntDesign name="close" size={16} />
      </Pressable>
    </View>
  );
};

const Body: React.FC = ({ children }: { children?: ReactNode }) => {
  return <>{children}</>;
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginBottom: 2,
  },
  headerText: {
    fontSize: 12,
  },
  closeButton: {
    padding: 1,
  },
});

const _default = Object.assign(Modal, {
  Modal,
  Content,
  Header,
  Body,
});

export default _default;
