import Ticker from '../components/Ticker';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';

export default function WorkspaceLayout({ role, view, onRoleChange, onNavigate, lotCount, offerCount, children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Ticker />
      <div className="workspace-frame">
        <TopBar role={role} onRoleChange={onRoleChange} />
        <div className="app">
          <Sidebar role={role} view={view} onNavigate={onNavigate} lotCount={lotCount} offerCount={offerCount} />
          <main className="content" id="main-content" tabIndex="-1">
            <div className="workspace-content">{children}</div>
          </main>
        </div>
        <footer className="workspace-footer">
          <span>ShasyaSetu <span aria-hidden="true">·</span> {role === 'fpo' ? 'FPO workspace' : 'Buyer workspace'}</span>
          <span>Market intelligence for more informed decisions</span>
        </footer>
      </div>
    </>
  );
}
