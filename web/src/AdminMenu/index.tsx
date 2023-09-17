import React, { useState } from "react";
import { createStyles, Tabs } from "@mantine/core";
import { useNuiEvent } from "../hooks/useNuiEvent";

const useStyles = createStyles((theme) => ({
  root: {
    position: "absolute",
    transform: "translate(-0%, -50%)",
    top: "50%",
    right: "0.5%",
    width: 440,
    height: "75vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.25s ease",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
  },
  tabs: {
    position: "relative",
    height: "100%!important",
  },
  sidebar: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    width: 44,
    padding: 4,
    gap: 4
  },
  panel: {
    background: theme.colors.ag[7],
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    padding: 8,
    overflow: "hidden",
  },
  tabBtn: {
    background: theme.colors.ag[8] + "f2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    ":hover": {
      background: theme.colors.ag[2],
    },
  },
}));

const AdminMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(0);

  // Using opacity instead of display: none; because we want to keep the menu mounted
  useNuiEvent("toggleMenu", (data) => {
    if (data) {
      setVisible(0.95);
    } else {
      setVisible(0);
    }
  });

  const tabs = [
    { name: "Commands", icon: "fas fa-hat-wizard" },
    { name: "Players", icon: "fas fa-users" }
  ];

  return (
    <div className={classes.root} style={{ opacity: visible }}>
      <div className={classes.container}>
        <Tabs variant="pills" keepMounted={true} defaultValue="Commands" orientation="vertical" className={classes.tabs}>
          <Tabs.List className={classes.sidebar}>
            {tabs.map((v, index) => (
              <React.Fragment key={index}>
                <Tabs.Tab
                  icon={
                    <i style={{ color: "white", fontSize: 18 }} className={v.icon}  />
                  }
                  value={v.name}
                  className={classes.tabBtn}
                />
              </React.Fragment>
            ))}
          </Tabs.List>

          <Tabs.Panel value="Commands" className={classes.panel}>

          </Tabs.Panel>

          <Tabs.Panel value="Players" className={classes.panel}>

          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminMenu;
