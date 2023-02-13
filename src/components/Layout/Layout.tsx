import { GearSix, Leaf, NewspaperClipping, Tree } from 'phosphor-react';
import styles from './Layout.module.css';
import { NavLink } from '@components/Link';

const ROUTES = [
  {
    to: '/',
    title: 'Timeline',
    icon: (isActive: boolean) => (
      <NewspaperClipping
        weight='duotone'
        size={25}
        style={{ color: isActive ? 'var(--sc-midnight)' : 'inherit' }}
      />
    ),
  },
  {
    to: '/topic',
    title: 'Topic',
    icon: (isActive: boolean) => (
      <Tree
        weight='duotone'
        size={25}
        style={{ color: isActive ? 'var(--sc-orange)' : 'inherit' }}
      />
    ),
  },
  {
    to: '/settings',
    title: 'Settings',
    icon: (isActive: boolean) => (
      <GearSix
        weight='duotone'
        size={25}
        style={{ color: isActive ? 'var(--sc-red)' : 'inherit' }}
      />
    ),
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul>
            {ROUTES.map((route) => (
              <li key={route.to}>
                <NavLink href={route.to}>
                  {(isActive) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {route.icon(isActive)}
                      {route.title}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
            <li
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(-96%, -50%)',
              }}
            >
              <NavLink href='/new-feed'>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--sc-nightpurp)',
                  }}
                >
                  New Feed <Leaf size={18} color='#9ece6a' weight='duotone' />
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer
        style={{
          marginTop: '5rem',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>
          🍞 Baked by paraparata &#169; {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
};

export default Layout;
