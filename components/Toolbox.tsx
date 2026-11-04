type ToolboxGroup = { label: string; items: string[] };

export default function Toolbox({ groups }: { groups: ToolboxGroup[] }) {
  return (
    <div className="toolbox-groups">
      {groups.map((group) => (
        <section className="toolbox-group" key={group.label}>
          <h3>{group.label}</h3>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
