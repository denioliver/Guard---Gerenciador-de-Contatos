import styled from 'styled-components';

const sizes = {
  small: {
    image: '20px',
    text: '14px'
  },
  medium: {
    image: '28px',
    text: '20px'
  },
  large: {
    image: '40px',
    text: '32px'
  }
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoImage = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  background-image: url('/src/assets/imgs/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: ${({ size }) => sizes[size].image};
  margin-left: 0;
`;

export const LogoText = styled.h1<{ size: 'small' | 'medium' | 'large' }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.content.primary};
  margin: 0;
`;
