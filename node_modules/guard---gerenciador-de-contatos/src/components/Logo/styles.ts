import styled from 'styled-components';

const sizes = {
  small: {
    image: '24px',
    text: '16px'
  },
  medium: {
    image: '32px',
    text: '24px'
  },
  large: {
    image: '48px',
    text: '36px'
  }
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LogoImage = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  background-image: url('/src/assets/imgs/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ size }) => sizes[size].image};
  height: ${({ size }) => sizes[size].image};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const LogoText = styled.h1<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ size }) => sizes[size].text};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.content.primary};
  margin: 0;
`;
