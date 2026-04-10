import { Flex, Text, colors } from "../styles/theme";
import { MajorTag } from "./MajorTag";
import viewIcon from "../assets/view_icon.svg";

interface PostProps {
  title: string;
  author: string;
  date: string;
  view: number;
  imgUrl: string;
  major: string;
}

const formatView = (view: number): string => {
  if (view >= 100000000) return `${Math.floor(view / 100000000)}억`;
  if (view >= 10000000) return `${Math.floor(view / 10000000)}천만`;
  if (view >= 10000) return `${Math.floor(view / 10000)}만`;
  return `${view}`;
};

export const Post = ({
  title,
  author,
  date,
  view,
  imgUrl,
  major,
}: PostProps) => {
  const truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  return (
    <Flex isColumn={true} gap={16} width="256px">
      <img
        src={imgUrl}
        width={256}
        height={184}
        style={{ objectFit: "cover", display: "block", borderRadius: 16 }}
        alt={title}
      />
      <Flex isColumn={true} gap={8} width="100%">
        <Text fontSize={16} fontWeight={700} color={colors.gray[1000]}>
          {truncatedTitle}
        </Text>
        <Flex isColumn={true} gap={10} width="100%">
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Flex gap={12} alignItems="center">
              <Text fontSize={12} fontWeight={600} color={colors.gray[900]}>
                {author}
              </Text>
              <Text fontSize={12} fontWeight={400} color={colors.gray[500]}>
                {date}
              </Text>
            </Flex>
            <Flex gap={4} alignItems="center">
              <img src={viewIcon} width={12} height={12} alt="조회수" />
              <Text fontSize={10} fontWeight={500} color={colors.gray[800]}>
                {formatView(view)}
              </Text>
            </Flex>
          </Flex>
          <MajorTag major={major} variant="dark" />
        </Flex>
      </Flex>
    </Flex>
  );
};
