'use client';
import { FC } from 'react';
import { useUserContent } from '@/app/_context/UserContentContext';
import ContentTiles from '../ContentTiles/ContentTiles';

const UserContentList: FC = () => {
  const { contentList } = useUserContent();

  return (
    <div className="text-white">
      {contentList.length > 0 ? (
        <ContentTiles content={contentList} cardAction='remove' />
      ) : (
        'list is empty'
      )}
    </div>
  );
};

export default UserContentList;
