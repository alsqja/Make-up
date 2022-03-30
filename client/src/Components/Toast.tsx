import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Notification = styled.div`
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.6s;
  background: var(--main-color);
  transition: 0.3s ease;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  color: #000;
  opacity: 1;
  font-weight: 600;

  height: 30px;
  width: 300px;
  color: #fff;
  padding: 15px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

interface Props {
  text: string;
  dismissTime: number;
}

export const Toast = ({ text, dismissTime }: Props) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setIsFading(true);
      }
    }, dismissTime - 500);

    return () => {
      mounted = false;
    };
  }, [dismissTime]);

  return (
    <Notification
      style={isFading ? { opacity: '0', transform: 'opacity 2s' } : {}}
    >
      {text}
    </Notification>
  );
};
