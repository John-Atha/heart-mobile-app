import React, { useMemo } from "react";
import { Avatar, Card, Surface, useTheme } from "react-native-paper";

export const DangerCard = ({ percentage, danger_class }) => {
  const theme = useTheme();

  const colors = useMemo(
    () => ({
      0: "#83d68c",
      1: "#ebeb94",
      2: "#ff8a97",
    }),
    [theme]
  );

  const icons = useMemo(
    () => ({
      0: "check-circle-outline",
      1: "exclamation",
      2: "close-circle-outline",
    }),
    [theme]
  );

  const titles = useMemo(
    () => ({
      0: "You look Healthy!",
      1: "Medium risk",
      2: "High risk",
    }),
    []
  );
  const subtitles = useMemo(
    () => ({
      0: "According to our AI agent",
      1: "We suggest talking to a doctor",
      2: "Speak with a doctor!",
    }),
    []
  );

  return (
    <Surface
      style={{
        borderRadius: 7,
        margin: 8,
        padding: 24,
        display: "flex",
        minHeight: 100,
        backgroundColor: colors[danger_class || 0],
      }}
    >
      <Card.Title
        title={titles[danger_class || 0]}
        subtitle={subtitles[danger_class || 0]}
        left={(props) => (
          <Avatar.Icon
            {...props}
            style={{
              backgroundColor: colors[danger_class || 0],
              width: "10px",
            }}
            icon={icons[danger_class || 0]}
          />
        )}
      />
    </Surface>
  );
};
