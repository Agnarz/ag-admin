import { useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { CommandProps, QuickActionProps } from "../types";
import { useSetCommands, useSetFavorites } from "../state";
import { fetchNui } from "../utils/fetchNui";
import { SetOptions } from "./lists/commands/options";
import { Divider, Tabs } from "@mantine/core";
import React from "react";
import { CommandsList } from "./lists/commands";
import QuickAction from "./components/QuickAction";
import { PlayersList } from "./lists/players";

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "absolute",
    transform: "translate(-0%, -50%)",
    top: "50%",
    right: "0.5%",
    width: 480,
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
    height: "100%"
  },
  tabs: {
    position: "relative",
    height: "100%",
    gap: 12
  },
  sidebar: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    width: 48,
    padding: 8,
    gap: 4,
  },
  panel: {
    background: "var(--mantine-color-dark-9)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    overflow: "hidden",
  },
  tabBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    border: 0,
  },
};

interface Init {
  commands: CommandProps[];
  favorites: string[];
  quickactions: QuickActionProps[];
}

const AdminMenu: React.FC = () => {
  const [visible, setVisible] = useState(0);
  useNuiEvent("toggleMenu", (data) => {
    if (data) {
      setVisible(0.95);
    } else {
      setVisible(0);
    }
  });

  const [quickActions, setQuickactions] = useState<QuickActionProps[]>([]);
  const setCommands = useSetCommands();
  const setFavorites = useSetFavorites();

  useEffect(() => {
    fetchNui("GetOptions").then((data) => {
      SetOptions("Targets", data.targets);
      SetOptions("Vehicles", data.vehicles);
      SetOptions("Weapons", data.weapons);
      SetOptions("Teleports", data.teleports);
      SetOptions("PedModels", data.pedmodels);
      SetOptions("Timecycles", data.timecycles);
      SetOptions("Weather", data.weather);
      SetOptions("Items", data.items);
      SetOptions("Jobs", data.jobs);
      SetOptions("Gangs", data.gangs);
    });
    setTimeout(() => {
      fetchNui<Init>("init").then((data) => {
        setQuickactions(data.quickactions);
        setFavorites(data.favorites);
        data.commands.forEach((v, index) => {
          v.id = index + 1;
          v.fav = data.favorites.includes(v.command);
        });
        setCommands(data.commands);
      });
    }, 250);
  }, []);

  const tabs: Array<{ name: string; icon: string }> = [
    { name: "Commands", icon: "fas fa-hat-wizard" },
    { name: "Players", icon: "fas fa-users" },
  ];

  return (
    <div style={{ ...styles.root, opacity: visible }}>
      <div style={styles.container}>
        <Tabs
          variant="pills"
          keepMounted={true}
          defaultValue="Commands"
          orientation="vertical"
          style={styles.tabs}
        >
          <Tabs.List style={styles.sidebar}>
            {tabs.map((v, index) => (
              <React.Fragment key={index}>
                <Tabs.Tab style={styles.tabBtn} value={v.name} key={index}>
                  <i
                    className={v.icon}
                    style={{ color: "white", fontSize: 18 }}
                  />
                </Tabs.Tab>
              </React.Fragment>
            ))}
            <Divider my="sm" />
            {quickActions.map((v, index) => (
              <React.Fragment key={index}>
                <QuickAction
                  command={v.command}
                  icon={v.icon}
                  active={v.active}
                  type={v.type}
                  items={v.items}
                />
              </React.Fragment>
            ))}
          </Tabs.List>
          <Tabs.Panel value="Commands" style={styles.panel}>
            <CommandsList />
          </Tabs.Panel>
          <Tabs.Panel value="Players" style={styles.panel}>
            <PlayersList />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminMenu;
