const Desc: React.FC<{ children: JSX.Element | JSX.Element[] | string }> = (
  props
) => {
  return (
    <span style={{ color: "#737373", fontSize: "14px" }}>{props.children}</span>
  );
};

export default Desc;
