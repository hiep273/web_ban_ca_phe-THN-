export default function SettingsPage({ settings }) {
  return (
    <section className="admin-panel settings-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Cài đặt quản trị</h2>
          <p>Các thiết lập vận hành được gom tại đây để sau này đồng bộ với API cấu hình.</p>
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
