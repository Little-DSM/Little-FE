import { useNavigate } from "react-router-dom";
import { Flex, Text, colors } from "../styles/theme";
import { MajorTag } from "./MajorTag";
import defaultImg from "../assets/default_img.png";

interface PostProps {
  id: number;
  title: string;
  date: string;
  image_url: string | null;
  major: string;
}

export const Post = ({ id, title, date, image_url, major }: PostProps) => {
  const navigate = useNavigate();
  const truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;
  const formattedDate = date.split("T")[0];

  return (
    <Flex
      isColumn={true}
      gap={16}
      width="256px"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/main/view/${id}`)}
    >
      <img
        src={image_url ?? defaultImg}
        width={256}
        height={184}
        style={{ objectFit: "cover", display: "block", borderRadius: 16 }}
        alt={title}
        onError={(e) => { e.currentTarget.src = defaultImg; }}
      />
      <Flex isColumn={true} gap={8} width="100%">
        <Text fontSize={16} fontWeight={700} color={colors.gray[1000]}>
          {truncatedTitle}
        </Text>
        <Flex isColumn={true} gap={10} width="100%">
          <Text fontSize={12} fontWeight={400} color={colors.gray[500]}>
            {formattedDate}
          </Text>
          <MajorTag major={major} variant="dark" />
        </Flex>
      </Flex>
    </Flex>
  );
};
