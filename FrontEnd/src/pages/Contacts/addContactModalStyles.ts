import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #181818;
  border-radius: 24px;
  width: 370px;
  padding: 32px 28px 24px 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 18px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    background: #222;
  }
`;

export const AvatarIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
`;

export const UploadLabel = styled.label`
  background: #222;
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 4px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  color: #fff;
  font-size: 15px;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  background: #222;
  border: none;
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 16px;
  outline: none;
  margin-bottom: 2px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const CancelBtn = styled.button`
  background: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #444;
  }
`;

export const SaveBtn = styled.button`
  background: #D6FF4B;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #b6e63b;
  }
`;
