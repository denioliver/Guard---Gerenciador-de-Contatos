import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111;
`;

export const Sidebar = styled.aside`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 12px 0;
  position: relative;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
  flex: 1;
  justify-content: flex-start;
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? '#333' : 'transparent')};
  color: ${({ $active }) => ($active ? '#D6FF4B' : '#999')};
  border: none;
  border-radius: 12px;
  padding: 10px;
  font-size: 20px;
  width: 46px;
  height: 46px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#333' : '#222')};
    color: ${({ $active }) => ($active ? '#D6FF4B' : '#D6FF4B')};
  }
  
  svg {
    width: 22px;
    height: 22px;
    display: block;
  }
`;

export const LoggedInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  position: relative;
  color: #999;
  font-size: 8px;
  margin: 20px 50px;
  padding: 0 5px;
  
  span {
    color: #D6FF4B;
    font-weight: 500;
    font-size: 8px;
  }
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0 0 0;
`;

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const SearchAdd = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchBox = styled.div`
  background: #222;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 36px;
  color: #bdbdbd;
  input {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    margin-left: 6px;
    outline: none;
    width: 160px;
    &::placeholder {
      color: #888;
    }
  }
`;

export const AddButtonWrapper = styled.div`
  position: relative;
`;

export const SpecialTooltip = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #D6FF4B;
  color: #222;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #D6FF4B;
  }
`;

export const AddButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 14px;
  height: 36px;
  font-size: 14px;
      @media (max-width: 700px) {
        position: static;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        padding: 4px 0;
        margin-bottom: 8px;
        max-height: none;
        overflow-x: auto;
        overflow-y: hidden;
      }
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #444;
  }
`;

export const MainCard = styled.div`
  background: #181818;
  border-radius: 24px;
  margin: 24px auto 0;
  padding: 24px 32px 24px 60px;
  width: 950px;
  height: 600px; /* Aumentado para acomodar todas as letras */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
    @media (max-width: 1100px) {
      width: 98vw;
      padding: 16px 8vw 16px 40px;
      min-width: 0;
    }
    @media (max-width: 700px) {
      width: 100vw;
      min-width: 0;
      padding: 12px 2vw 12px 12px;
      border-radius: 12px;
      height: auto;
    }
`;

export const LetterBar = styled.div`
  position: absolute;
  left: 10px;
  top: 24px;
  width: 36px;
  background: #D6FF4B;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 1px; /* Reduzido para encaixar melhor todas as letras */
  max-height: calc(100% - 48px); /* Limita a altura para não ultrapassar o card */
  overflow-y: auto; /* Adiciona scroll caso necessário */
  
  /* Estilo da barra de rolagem se necessário */
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none; /* Para IE e Edge */
  &::-webkit-scrollbar {
    display: none; /* Para Chrome, Safari e Opera */
  }
`;

export const LetterItem = styled.button<{ $active?: boolean }>`
  border: none;
  color: ${({ $active }) => ($active ? '#222' : '#222')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  font-size: 12px; /* Tamanho reduzido para melhor ajuste */
  padding: 2px 0;
  width: 100%;
  height: 18px; /* Altura fixa para melhor uniformidade */
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s;
  
  /* Efeito hover para melhorar a usabilidade */
  &:hover {
    background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.2)')};
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  margin-left: 0;
  overflow-y: auto;
  overflow-x: auto;
  flex: 1;
  max-height: calc(100% - 80px); /* Espaço para o cabeçalho */
  scrollbar-width: thin;
  scrollbar-color: #444 #222;
  padding-right: 8px; /* Espaço para a barra de rolagem */
    @media (max-width: 700px) {
      max-height: none;
      padding-right: 0;
      overflow-x: auto;
    }
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #222;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 4px;
  }
`;

export const ContactsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    position: sticky;
    top: 0;
    background: #181818;
    z-index: 1;
  }
  
  th {
    color: #bdbdbd;
    font-size: 11px;
    font-weight: 600;
    text-align: left;
    padding-bottom: 8px;
    text-transform: uppercase;
  }
  
  td {
    color: #fff;
    font-size: 13px;
    padding: 10px 0;
    border-bottom: 1px solid #222;
  }
    @media (max-width: 700px) {
      th, td {
        font-size: 11px;
        padding: 6px 2px;
      }
      td {
        word-break: break-word;
        max-width: 120px;
      }
    }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1px;
    strong {
      color: #fff;
      font-size: 13px;
    }
    span {
      color: #bdbdbd;
      font-size: 11px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 5px;
`;

export const ActionBtn = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #333;
  }
`;

export const GlobalActionBtn = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? '#D6FF4B' : '#333')};
  color: ${({ $active }) => ($active ? '#222' : '#fff')};
  border: none;
  border-radius: 6px;
  padding: 0 12px;
  height: 36px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ $active }) => ($active ? '#c8f03e' : '#444')};
  }
`;
