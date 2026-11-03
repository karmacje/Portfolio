const certifications = [
  { name: "Cisco CyberOps Associate", detail: "Security operations" },
  { name: "Ethical Hacking", detail: "Offensive security foundations" },
];

export default function CertificationBadges() {
  return (
    <ul className="certification-badges">
      {certifications.map(({ name, detail }) => (
        <li className="certification-badge" key={name}><strong>{name}</strong><span>{detail}</span></li>
      ))}
    </ul>
  );
}
