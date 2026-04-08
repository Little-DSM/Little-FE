import styled from '@emotion/styled';
import { colors, Flex } from '../styles/theme';
import { HeaderLogo, HomePageImg, MypageImg, WritePageImg } from '../assets';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  return (
    <Wrapper>
      {/* 첫 화면 */}
      <Section>
        <Content
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Flex isColumn gap={60} alignItems="center">
            <Flex isColumn gap={32} alignItems="center">
              <Flex isColumn alignItems="center">
                <Title
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  쉽고 빠르게
                </Title>
                <Title
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  멘토를 GET!
                </Title>
              </Flex>

              <SubText
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                little DSM에서 편하게 멘토를 찾아보세요
              </SubText>
            </Flex>

            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img src={HeaderLogo} alt="logo" />
              로그인하기
            </Button>
          </Flex>
        </Content>

        <Gradient />
      </Section>

      {/* 홈 화면 */}
      <Section>
        <AnimatedImage
          src={HomePageImg}
          alt="홈화면"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />

        <FadeText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          다양한 멘토를 한눈에 확인할 수 있어요
        </FadeText>

        <DescText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          관심 있는 분야의 멘토를 빠르게 찾아보세요
        </DescText>

        <Gradient />
      </Section>

      {/* 글 작성 */}
      <Section>
        <AnimatedImage
          src={WritePageImg}
          alt="작성화면"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />

        <FadeText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          간편하게 멘토링 요청 작성
        </FadeText>

        <DescText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          필요한 도움을 쉽고 빠르게 요청할 수 있어요
        </DescText>

        <Gradient />
      </Section>

      {/* 마이페이지 */}
      <Section>
        <AnimatedImage
          src={MypageImg}
          alt="마이페이지"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />

        <FadeText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          나의 활동을 한눈에 관리
        </FadeText>

        <DescText
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          요청한 멘토링과 진행 상황을 확인하세요
        </DescText>

        <Gradient />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  padding: 0 20px;
  position: relative;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.div)`
  font-size: 64px;
  font-weight: 800;
`;

const SubText = styled(motion.div)`
  font-size: 32px;
  color: ${colors.gray[600]};
`;

const FadeText = styled(motion.div)`
  font-size: 28px;
  font-weight: 600;
`;

const DescText = styled(motion.div)`
  font-size: 18px;
  color: ${colors.gray[600]};
`;

const AnimatedImage = styled(motion.img)`
  width: 60%;
  max-width: 600px;
  object-fit: contain;

  &:hover {
    transform: scale(1.03);
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Button = styled(motion.button)`
  cursor: pointer;
  padding: 20px 32px;
  border-radius: 1000px;
  background-color: ${colors.gray[0]};
  border: 2px solid ${colors.gray[100]};
  font-size: 28px;
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 16px;

  transition: all 0.2s;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;
