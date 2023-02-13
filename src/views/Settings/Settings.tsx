import Layout from '@components/Layout';
import styles from './Settings.module.css';
import OpenFolderButton from './OpenFolderButton';
import { useState } from 'react';
import { FloppyDisk } from 'phosphor-react';
import { ConfigsType, savedConfigs, setSavedConfigs } from '@libs/api';

const Settings = () => {
  const [configs, setConfigs] = useState<ConfigsType>(savedConfigs);

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setConfigs((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleOnSave = () => {
    setSavedConfigs(configs);
  };

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.form}>
          <label htmlFor='projectPath'>Project Path</label>
          <div>
            <input
              id='projectPath'
              name='Project Path'
              value={configs.projectPath}
              placeholder='~/foo/bar'
              onChange={handleOnChange}
            />
            <OpenFolderButton />
          </div>

          <label htmlFor='feedsPath'>Feeds Path</label>
          <div>
            <input
              id='feedsPath'
              name='Feeds Path'
              value={configs.feedsPath}
              placeholder='~/fizz/buzz'
              onChange={handleOnChange}
            />
            <OpenFolderButton />
          </div>

          <label htmlFor='afterCommand'>
            After Command{' '}
            <span
              title='Run command after clicking Feed button and generating markdown.'
              role='tooltip'
            >
              ?
            </span>
          </label>
          <textarea
            id='afterCommand'
            name='After Command'
            value={configs.afterCommand}
            placeholder='$ git add . && git commit -m "new feed"'
            rows={8}
            onChange={handleOnChange}
          />
        </div>

        <div className={styles.actions}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: '0.75em' }}
            onClick={handleOnSave}
          >
            Save <FloppyDisk size={25} color='#9ece6a' weight='duotone' />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
