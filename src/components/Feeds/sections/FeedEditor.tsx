import { useEffect, useRef, useState } from 'react';
import { FeedToolbar } from './FeedToolbar';

import styles from './FeedEditor.module.css';

const MAX_CHAR = 300;

export interface FeedEditorProps {
  noTitle?: boolean;
  isFocusing?: boolean;
  title?: string;
  content: string;
  onChangeTitle?: (value: string) => void;
  onChangeContent: (value: string) => void;
}

export const FeedEditor: React.FC<FeedEditorProps> = ({
  noTitle,
  isFocusing,
  title,
  content,
  onChangeTitle,
  onChangeContent,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(content.length ?? 0);

  useEffect(() => {
    if (editorRef.current && isFocusing) {
      editorRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [isFocusing]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeTitle) onChangeTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeContent(e.target.value);
    setCounter(e.target.value.length);
  };

  const colorStyle =
    MAX_CHAR - counter > 5 && MAX_CHAR - counter < 15
      ? 'var(--sc-orange)'
      : MAX_CHAR - counter >= 0 && MAX_CHAR - counter <= 5
      ? '#e0e068'
      : MAX_CHAR - counter < 0
      ? 'red'
      : 'var(--sc-postpurp)';

  return (
    <div ref={editorRef} className={styles.root} data-focus={isFocusing}>
      {!noTitle && (
        <div className={styles.title}>
          <input
            name='title'
            value={title}
            placeholder='Title (optional)'
            onChange={handleTitle}
          />
        </div>
      )}

      <div className={styles['content-wrapper']}>
        <FeedToolbar />
        <div className={styles.content}>
          <textarea
            name='content'
            value={content}
            placeholder="What's right?"
            rows={5}
            autoFocus
            onChange={handleContentChange}
          />
          <span style={{ color: colorStyle }}>{MAX_CHAR - counter}</span>
        </div>
      </div>
    </div>
  );
};
