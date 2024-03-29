import { Leaf } from 'phosphor-react';
import styles from './FeedComposer.module.css';

interface FeedComposerProps {
  multiple?: boolean;
  disableSave?: boolean;
  onSave?: () => void;
}

export const FeedComposer: React.FC<FeedComposerProps> = ({
  multiple,
  disableSave,
  onSave,
}) => {
  return (
    <button
      className={styles['save-btn']}
      disabled={disableSave}
      onClick={onSave}
    >
      {multiple ? (
        <>
          Feed All{' '}
          <span style={{ position: 'relative' }}>
            <Leaf
              size={25}
              color='#9ece6a80'
              weight='duotone'
              style={{
                position: 'absolute',
                left: '5px',
                transform: 'rotate(25deg) translateY(5px)',
              }}
            />
            <Leaf size={25} color='#9ece6a' weight='duotone' />
          </span>
        </>
      ) : (
        <>
          Feed <Leaf size={25} color='#9ece6a' weight='duotone' />
        </>
      )}
    </button>
  );
};
