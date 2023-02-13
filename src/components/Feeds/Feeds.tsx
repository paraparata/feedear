import styles from './Feeds.module.css';

import { Feed } from './Feed';
import { FeedsProvider, useFeedsStore } from './feedsStore';
import { FeedComposer } from './sections/FeedComposer';

import type { FeedStoreState, FeedType } from './feedsStore';

interface FeedsComponentProps {
  onSave: (feeds: FeedType[]) => Promise<void>;
}

interface FeedsProps extends FeedsComponentProps {
  initState?: Partial<FeedStoreState>;
}

const FeedsComponent: React.FC<FeedsComponentProps> = ({ onSave }) => {
  const feeds = useFeedsStore((state) => state.feeds);
  const activeIndex = useFeedsStore((state) => state.activeIndex);

  const { setFeed } = useFeedsStore((state) => state.action);

  return (
    <div className={styles.root}>
      <FeedComposer
        multiple={feeds.length > 1}
        disableSave={feeds.some((feed) => feed.content === '')}
        onSave={() => onSave(feeds)}
      />

      {feeds.map((feed, index) => (
        <Feed
          key={index}
          feedIndex={index}
          mode={activeIndex === index ? 'editor' : 'view'}
          data={feed}
          isFocusing={index !== 0 && index === activeIndex}
          disabled={activeIndex !== index}
          onChange={(key, val) => setFeed(index, key, val)}
        />
      ))}
    </div>
  );
};

const Feeds: React.FC<FeedsProps> = ({ initState, onSave }) => (
  <FeedsProvider initState={initState}>
    <FeedsComponent onSave={onSave} />
  </FeedsProvider>
);

export default Feeds;
