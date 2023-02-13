import { ImageSquare, PlusCircle, Trash } from 'phosphor-react';
import { useFeedsStore } from '../feedsStore';
import styles from './FeedToolbar.module.css';

export const FeedToolbar: React.FC = () => {
  const [feeds, activeIndex] = useFeedsStore((state) => [
    state.feeds,
    state.activeIndex,
  ]);

  const { addNewFeed, deleteFeed } = useFeedsStore((state) => state.action);

  const handleOnAddFeed = () => {
    if (feeds[activeIndex].content) addNewFeed();
  };

  const handleOnDelete = () => {
    if (activeIndex !== 0) deleteFeed();
  };

  return (
    <div className={styles.root}>
      <button data-kind='icon'>
        <ImageSquare size={25} color='#bb9af7' weight='duotone' />
      </button>
      <button
        data-kind='icon'
        disabled={!feeds[activeIndex].content}
        onClick={handleOnAddFeed}
      >
        <PlusCircle size={25} color='#bb9af7' weight='duotone' />
      </button>
      <button
        data-kind='icon'
        disabled={activeIndex === 0}
        onClick={handleOnDelete}
      >
        <Trash size={25} color='#f7768e' weight='duotone' />
      </button>
    </div>
  );
};
