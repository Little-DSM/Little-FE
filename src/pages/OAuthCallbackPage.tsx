import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flex, Text, colors } from '../styles/theme';
import { googleCallbackApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      navigate('/login', { replace: true });
      return;
    }

    googleCallbackApi(code, state)
      .then(async (data) => {
        await login(data.access_token, data.refresh_token);
        navigate('/main', { replace: true });
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, []);

  return (
    <Flex
      isColumn
      gap={12}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Text fontSize={16} color={colors.gray[600]}>
        로그인 처리 중...
      </Text>
    </Flex>
  );
};
