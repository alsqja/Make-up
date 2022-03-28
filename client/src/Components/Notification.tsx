import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { notify } from '../store/store';
import { Toast } from './Toast';

const NotificationContainer = styled.div`
  font-size: 1rem;
  position: fixed;
  z-index: 999999;
  top: 80px;
  right: 12px;
`;

function Notification() {

  const state = useRecoilValue(notify)

  return (
    <NotificationContainer>
      {state.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </NotificationContainer>
  );
}

export default Notification;
