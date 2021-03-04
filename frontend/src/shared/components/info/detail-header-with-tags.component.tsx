import React from "react";

// components
import { TagList } from "tag/components/tag-list.component";

// styles
import { DetailHeader } from "./detail-header.component";

interface IProps {
  name: string;
  updatedAt: string;
  tags: string[];
  handleDeleteTag: (tag: string) => void;
  showUpdateModal: () => void;
}
export const DetailHeaderWithTags: React.FC<IProps> = ({
  name,
  updatedAt,
  tags,
  handleDeleteTag,
  showUpdateModal,
}) => {
  return (
    <DetailHeader name={name} updatedAt={updatedAt} showUpdateModal={showUpdateModal}>
      <TagList tags={tags} handleDeleteTag={handleDeleteTag} />
    </DetailHeader>
  );
};