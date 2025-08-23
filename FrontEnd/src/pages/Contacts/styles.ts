import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111;
`;

export const Sidebar = styled.aside`
  width: 90px;
  background: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0 24px 0;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 60px;
`;

export const MenuItem = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#D6FF4B' : 'transparent')};
  color: ${({ active }) => (active ? '#222' : '#bdbdbd')};
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
`;

export const LoggedInfo = styled.div`
  color: #bdbdbd;
  font-size: 13px;
  text-align: center;
  margin-top: 40px;
  span {
    color: #fff;
    font-weight: 600;
    font-size: 13px;
  }
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 48px 0 0 0;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
`;

export const SearchAdd = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchBox = styled.div`
  background: #181818;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 44px;
  color: #bdbdbd;
  input {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-left: 8px;
    outline: none;
    width: 180px;
  }
`;

export const AddButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 18px;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #333;
  }
`;

export const MainCard = styled.div`
  background: #181818;
  border-radius: 36px;
  margin: 32px 0 0 48px;
  padding: 32px 40px;
  width: 1100px;
  min-height: 600px;
  display: flex;
  position: relative;
`;

export const LetterBar = styled.div`
  position: absolute;
  left: -60px;
  top: 32px;
  width: 60px;
  background: #D6FF4B;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 8px;
`;

export const LetterItem = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ active }) => (active ? '#222' : '#222')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  font-size: 18px;
  padding: 6px 0;
  width: 100%;
  border-radius: 8px;
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s;
`;

export const ContactsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-left: 80px;
  th {
    color: #bdbdbd;
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    padding-bottom: 12px;
  }
  td {
    color: #fff;
    font-size: 16px;
    padding: 18px 0;
    border-bottom: 1px solid #222;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    strong {
      color: #fff;
      font-size: 16px;
    }
    span {
      color: #bdbdbd;
      font-size: 14px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionBtn = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #333;
  }
`;
