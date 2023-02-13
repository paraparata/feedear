import Layout from '@components/Layout';
import { FeedView } from '@components/Feeds';
import { NavLink } from '@components/Link';
import { getFeedsConfigPath } from '@libs/api';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { FeedType } from '@components/Feeds';

const Timeline = () => {
  const [feeds, setFeeds] = useState<FeedType[]>();

  useEffect(() => {
    getFeedsConfigPath().then((path) => {
      invoke('get_topic', {
        path: path,
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
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {feeds === undefined ? (
          <span>Loading...</span>
        ) : feeds.length === 0 ? (
          <span>No Data</span>
        ) : (
          feeds.map((feed, index) => {
            const slug = feed.parent?.id
              ? `${feed.parent.id}#${feed.id}`
              : `${feed.id}`;

            return (
              <NavLink key={index} href={`/feeds/${slug}`}>
                <FeedView data={feed} />
              </NavLink>
            );
          })
        )}
      </div>
    </Layout>
  );
};

export default Timeline;
