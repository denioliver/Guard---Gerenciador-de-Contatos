import * as Styles from './styles';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
};

function Logo({ size = 'medium', showText = true }: LogoProps) {
  return (
    <Styles.Container>
      <Styles.LogoImage size={size} />
      {showText && <Styles.LogoText size={size}>GUARD</Styles.LogoText>}
    </Styles.Container>
  );
}

export default Logo;
