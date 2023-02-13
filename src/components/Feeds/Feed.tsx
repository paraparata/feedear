import { FeedEditor } from './sections/FeedEditor';
import { FeedView } from './sections/FeedView';
import { useFeedsStore } from './feedsStore';

import type { FeedType } from './feedsStore';

interface FeedProps {
  mode: 'view' | 'editor';
  feedIndex: number;
  data: FeedType;
  disabled: boolean;
  isFocusing?: boolean;
  onChange: <T extends keyof FeedType>(key: T, value: FeedType[T]) => void;
}

export const Feed: React.FC<FeedProps> = ({
  mode,
  feedIndex,
  data,
  disabled,
  isFocusing,
  onChange,
}) => {
  const { setActiveIndex } = useFeedsStore((state) => state.action);

  if (mode === 'view')
    return (
      <FeedView
        data={data}
        disabled={disabled}
        onClick={() => setActiveIndex(feedIndex)}
      />
    );

  if (mode === 'editor')
    return (
      <FeedEditor
        noTitle={feedIndex !== 0}
        isFocusing={isFocusing}
        title={data.title ?? ''}
        content={data.content}
        onChangeTitle={(val) => onChange('title', val)}
        onChangeContent={(val) => onChange('content', val)}
      />
    );
  return <></>;
};
