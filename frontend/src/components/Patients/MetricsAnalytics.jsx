import React from "react";
import { Text } from "react-native";
import { Surface } from "react-native-paper";
import { View } from "react-native-web";
import { useQuery } from "react-query";
import { getUserMetrics } from "../../api/metrics";
import { queriesKeys } from "../../api/queriesKeys";
import { Spinner } from "../Global/Spinner";
import { MetricsGroupAccordion } from "./MetricsGroupAccordion";

export const MetricsAnalytics = ({ id, navigate }) => {
  const { data, isLoading } = useQuery(
    [queriesKeys["getLastMetrics"], id],
    () => getUserMetrics({ id }),
    {
      enabled: !!id,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  console.log({ data });

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.length) {
    return (
      <View>
        <Text style={{ fontSize: 17, textAlign: "center", marginVertical: 20 }}>
          Metrics history was not found.
        </Text>
      </View>
    );
  }

  console.log({ navigate });

  return (
    <View style={{ margin: 8 }}>
      {data.map(({ id, datetime, metrics, danger }) => (
        <Surface style={{ marginTop: 8 }}>
          <MetricsGroupAccordion
            key={id}
            datetime={datetime}
            metrics={metrics}
            danger={danger}
            navigate={navigate}
          />
        </Surface>
      ))}
    </View>
  );
};
