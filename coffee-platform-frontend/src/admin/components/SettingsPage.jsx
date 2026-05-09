export default function SettingsPage({ settings }) {
  return (
    <section className="admin-panel settings-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Admin Settings</h2>
          <p>Configuration values are grouped here so they can later map to real API settings.</p>
        </div>
      </div>
      <div className="settings-list">
        {settings.map((setting) => (
          <div className="settings-row" key={setting.key}>
            <span>{setting.key}</span>
            <strong>{setting.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
