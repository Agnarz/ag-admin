const classes: Record<string, React.CSSProperties> ={
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "left",
    overflow: "hidden",
  },
  favToggle: {
    position: "inherit",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    marginRight: 8,
  },
  label: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

interface CommandLabelProps {
  children?: string | React.ReactNode;
  command_id: number;
  fav: boolean;
  setFav(id: number): void;
  onClick?(data?: unknown): void;
}

export const CommandLabel: React.FC<CommandLabelProps> = (props) => {
  const { children, fav, command_id, setFav, onClick } = props;
  const favIcon = { color: fav ? "#FFC107" : "#ffffff44", fontSize: 18 };

  return (
    <div style={classes.container}>
      <div style={classes.favToggle}>
        <i
          style={favIcon}
          className="fas fa-star"
          onClick={(e) => {
            e.stopPropagation();
            setFav(command_id);
          }}
        />
      </div>
      <div style={classes.label} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};
