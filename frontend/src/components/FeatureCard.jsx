function FeatureCard(props) {
  return (
    <div
      className={`card ${props.active ? "active-card" : ""}`}
      onClick={props.onClick}
    >
      <div style={{ fontSize: "40px" }}>{props.icon}</div>

      <h3>{props.title}</h3>

      <p>{props.description}</p>
    </div>
  );
}

export default FeatureCard;