import { savedConfigs } from '@libs/api';
import { formatPath } from '@libs/helper';
import { NavLink } from '@components/Link';
import { invoke } from '@tauri-apps/api/tauri';
import { homeDir } from '@tauri-apps/api/path';
import { Feed } from '@components/Feeds';
import { ModalHeader, ModalLayout, ModalMain } from '@components/Layout';
import { FeedsProvider, useFeedsStore } from '@components/Feeds/feedsStore';
import { useLocation } from 'wouter';

const AddFeed = () => {
  const feeds = useFeedsStore((state) => state.feeds);
  const activeIndex = useFeedsStore((state) => state.activeIndex);
  const [, setRoute] = useLocation();

  const { setFeed } = useFeedsStore((state) => state.action);

  const handleOnSave = async () => {
    const homeDirPath = await homeDir();
    const feedsPath =
      homeDirPath + formatPath(savedConfigs().feedsPath) + '/snapshot.json';

    await invoke('generate_snapshot', {
      feeds: JSON.stringify(feeds),
      path: feedsPath,
    });
    setRoute('/');
  };

  return (
    <ModalLayout>
      <ModalHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <NavLink href='/'>
            <button>Cancel</button>
          </NavLink>
          <button
            disabled={feeds.some((feed) => feed.content === '')}
            onClick={handleOnSave}
          >
            Add Feed
          </button>
        </div>
      </ModalHeader>

      <ModalMain
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
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
      </ModalMain>
    </ModalLayout>
  );
};

const AddFeedWrapper = () => {
  return (
    <FeedsProvider>
      <AddFeed />
    </FeedsProvider>
  );
};

export default AddFeedWrapper;
