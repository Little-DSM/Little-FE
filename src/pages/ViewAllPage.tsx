import { useState } from 'react';
import { Post } from '../components/Post';
import { colors, Flex, Text } from '../styles/theme';

type PostType = {
  title: string;
  author: string;
  date: string;
  view: number;
  imgUrl: string;
  major: string;
};

export const ViewAllPage = () => {
  const [datas, setDatas] = useState<PostType[]>([
    {
      title: 'ㅎㅇ요',
      author: '박츄츄',
      date: '2024-12-20',
      view: 10000000,
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s',
      major: '프론트엔드',
    },
    {
      title: 'ㅎㅇ요',
      author: '박츄츄',
      date: '2024-12-20',
      view: 10000000,
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s',
      major: '프론트엔드',
    },
    {
      title: 'ㅎㅇ요',
      author: '박츄츄',
      date: '2024-12-20',
      view: 10000000,
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s',
      major: '프론트엔드',
    },
    {
      title: 'ㅎㅇ요',
      author: '박츄츄',
      date: '2024-12-20',
      view: 10000000,
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s',
      major: '프론트엔드',
    },
    {
      title: 'ㅎㅇ요',
      author: '박츄츄',
      date: '2024-12-20',
      view: 10000000,
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s',
      major: '프론트엔드',
    },
  ]);

  return (
    <Flex isColumn gap={24} width="100%">
      <Flex gap={4} isColumn>
        <Text fontSize={16} color={colors.gray[600]}>
          뭘 좋아할지 몰라 다 준비했어...
        </Text>
        <Text fontSize={20} color={colors.gray[1000]}>
          오늘의 추천 멘토링
        </Text>
      </Flex>
      <Flex gap={32} flexWrap="wrap" width="100%">
        {datas.map((data) => (
          <Post
            title={data.title}
            author={data.author}
            date={data.date}
            imgUrl={data.imgUrl}
            view={data.view}
            major={data.major}
          />
        ))}
      </Flex>
    </Flex>
  );
};
