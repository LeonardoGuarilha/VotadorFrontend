import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messageWithTransitions.map((
        { item, key, props }
      ) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
