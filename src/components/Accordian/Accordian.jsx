function Accordian({children, className}) {
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
}

export default Accordian;
