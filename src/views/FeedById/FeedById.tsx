import AddFeedBtn from './AddFeedBtn';
import Layout from '@components/Layout';

import { FeedView } from '@components/Feeds';
import { getFeedsConfigPath } from '@libs/api';
import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api';

import type { FeedType } from '@components/Feeds';

interface FeedByIdProps {
  id: string;
}

const FeedViewWrapper = ({ data }: { data: FeedType }) => {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elRef.current && (!data.parent || location.hash.slice(1) === data.id)) {
      elRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      elRef.current.style.fontSize = '20px';
    }
  }, [data]);

  return <FeedView ref={elRef} data={data} />;
};

const FeedById: React.FC<FeedByIdProps> = ({ id }) => {
  const [feeds, setFeeds] = useState<FeedType[]>([]);

  useEffect(() => {
    getFeedsConfigPath().then((path) => {
      invoke('get_feed', {
        path: path,
        parentId: id,
      })
        .then((raw) => {
          const data = JSON.parse(raw as string) as FeedType[];
          setFeeds(data);
        })
        .catch((err) => {
          console.warn(err);
          setFeeds([]);
        });
    });
  }, [id]);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {feeds.map((feed, index) => (
          <FeedViewWrapper key={index} data={feed} />
        ))}
        <AddFeedBtn />
      </div>
    </Layout>
  );
};

export default FeedById;
