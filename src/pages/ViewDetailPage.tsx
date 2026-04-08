import { useState } from 'react';
import { MajorTag } from '../components/MajorTag';
import { colors, Flex, Text } from '../styles/theme';
import styled from '@emotion/styled';
import Button from '../components/Button';

export const ViewDetailPage = () => {
  const [datas, setDatas] = useState<{
    title: string;
    author: string;
    date: string;
    major: string[];
    content: string;
    imgUrl: string;
  }>({
    title: '난 박츄츄야 난 귀여웡!!',
    author: '박츄츄',
    date: '2024-10-10',
    major: ['강아지', '박츄츄'],
    content:
      '박츄츄는 작은 몸에 커다란 존재감을 가진 시츄다. 복슬복슬한 털과 동그란 눈, 그리고 살짝 들린 코끝까지—어느 하나 귀엽지 않은 구석이 없다. 가만히 앉아만 있어도 인형 같고, 꼬리를 살랑살랑 흔들며 다가오면 하루의 피로가 순식간에 사라진다. 박츄츄의 하루는 단순하지만 사랑스럽다. 아침에는 느릿느릿 기지개를 켜며 하루를 시작하고, 밥을 먹을 때는 세상 누구보다 진지한 표정을 짓는다. 산책을 나가면 작은 발로 총총 걸으며 세상을 탐험하는데, 낯선 소리에도 귀를 쫑긋 세우는 모습이 마치 호기심 많은 탐험가 같다. 특히 박츄츄의 매력은 사람을 바라보는 눈빛에 있다. 말은 하지 않아도 “같이 놀자”, “지금 행복해” 같은 감정을 그대로 전해준다. 가끔은 괜히 옆에 와서 기대 앉거나, 아무 이유 없이 바라보며 꼬리를 흔드는데, 그 순간만큼은 세상에서 가장 따뜻한 존재가 된다. 작고 귀여운 시츄 박츄츄는 단순한 반려견이 아니라, 하루를 더 행복하게 만들어주는 소중한 친구다. 존재만으로도 웃음을 주는, 그런 특별한 존재다.',
    imgUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyNDAxMjVfMTUx/MDAxNzA2MTgyNzUzMjI0.4zCsBpH3SR6bsxhVvWRmkcyMrsMJuO71yaFarXl1yYsg.APjgu1CsafB84QfDdfuMqYzGFfzfLlvTwvDzcu2LgH0g.JPEG.jy841018/1706182750990.jpg?type=w800',
  });
  return (
    <Flex isColumn gap={60} width="100%">
      <Flex justifyContent="space-between" width="100%">
        <Flex gap={40}>
          <Img src={datas.imgUrl} alt={datas.title}></Img>
          <Flex isColumn gap={20}>
            <Text fontWeight={600} fontSize={24}>
              {datas.title}
            </Text>
            <Flex gap={12} alignItems="center">
              <Text fontSize={16}>{datas.author}</Text>
              <Text fontSize={16} color={colors.gray[500]}>
                {datas.date}
              </Text>
            </Flex>
            <Flex gap={4}>
              {datas.major.map((data) => (
                <MajorTag major={data} variant="dark"></MajorTag>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Button>지원하기</Button>
      </Flex>
      <Flex isColumn gap={12}>
        <Text fontSize={20} fontWeight={600}>
          멘토링 내용
        </Text>
        <Text fontSize={20} fontWeight={400}>
          {datas.content}
        </Text>
      </Flex>
    </Flex>
  );
};

const Img = styled.img`
  width: 427px;
  height: 285px;
  border-radius: 10px;
  background-color: #e7e7e7;
  object-fit: cover;
`;
