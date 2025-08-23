import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const BackgroundSection = styled.section`
  flex: 1;
  background: #181818;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

export const LogoContainer = styled.div`
  margin: 40px 0 0 60px;
`;

export const FormSection = styled.section`
  width: 480px;
  background: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

export const CreateAccountText = styled.p`
  font-size: 16px;
  color: #bdbdbd;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: 32px 0;
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #fff;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  background: #181818;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 16px;
  outline: none;
  margin-bottom: 2px;
  &:focus {
    border-color: #d6ff4b;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff3b3b;
  font-size: 13px;
  margin-top: 2px;
`;

export const ValidationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
`;

export const ValidationItem = styled.li<{ invalid: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ invalid }) => (invalid ? '#ff3b3b' : '#d6ff4b')};
  font-size: 15px;
  margin-bottom: 4px;
`;

export const SubmitButton = styled.button`
  background: #d6ff4b;
  color: #222;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 18px;
  margin-top: 24px;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  &:hover {
    background: #b6e63b;
  }
`;
