import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeIcon, EyeOffIcon, Spinner, CloseIcon } from '../../assets/icons';
import { Checkbox } from '../../components/Checkbox';
import Logo from '../../components/Logo';
import * as Styles from './styles';
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean()
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Login com:', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe
      });

      alert('Login realizado com sucesso!');
    } catch {
      setGeneralError('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styles.PageContainer>
      <Styles.BackgroundSection>
        <Styles.LogoContainer>
          <Logo size="large" />
        </Styles.LogoContainer>
      </Styles.BackgroundSection>

      <Styles.FormSection>
        <Styles.Header>
          <Styles.CreateAccountText>
            Não tem uma conta? <Styles.CreateAccountLink href="#">Criar conta</Styles.CreateAccountLink>
          </Styles.CreateAccountText>
        </Styles.Header>

        <Styles.FormContainer>
          <Styles.Title>Acessar conta</Styles.Title>

          {generalError && (
            <Styles.ErrorMessage>{generalError}</Styles.ErrorMessage>
          )}

          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Styles.FormGroup>
              <Styles.Label>E-mail</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className={errors.email ? 'error' : ''}
                  {...register('email')}
                />
                {watch('email') && (
                  <Styles.ClearButton
                    type="button"
                    onClick={() => setValue('email', '', { shouldValidate: true })}
                  >
                    <CloseIcon color="#777777" />
                  </Styles.ClearButton>
                )}
              </Styles.InputContainer>
              {errors.email && (
                <Styles.ErrorText>{errors.email.message}</Styles.ErrorText>
              )}
            </Styles.FormGroup>

            <Styles.FormGroup>
              <Styles.Label>Senha</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Insira sua senha"
                  className={errors.password ? 'error' : ''}
                  {...register('password')}
                />
                <Styles.PasswordToggleButton
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Styles.PasswordToggleButton>
              </Styles.InputContainer>
              {errors.password && (
                <Styles.ErrorText>{errors.password.message}</Styles.ErrorText>
              )}
              <Styles.ForgotPasswordLink href="#">
                Esqueci minha senha
              </Styles.ForgotPasswordLink>
            </Styles.FormGroup>

            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Lembrar-me neste dispositivo"
                  checked={field.value}
                  onChange={field.onChange}
                  name={field.name}
                />
              )}
            />

            <Styles.Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner color="#111111" size={18} />
                  Carregando...
                </>
              ) : (
                'Acessar conta'
              )}
            </Styles.Button>
          </Styles.Form>
        </Styles.FormContainer>
      </Styles.FormSection>
    </Styles.PageContainer>
  );
}

export default Login;
