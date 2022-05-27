import React, { useState, useEffect } from 'react'
import { Button, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
  tab: {
    textTransform: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  }
})

export default function Tabs({ views }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(Object.keys(views || {})?.[0]);
  const [routes, setRoutes] = useState(views || {});

  useEffect(() => {
    setRoutes(views)
  }, [views])

  useEffect(() => {
    setSelected(Object.keys(routes)?.[0]);
  }, [routes])

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 5 }}>
      <View style={styles.container}>
        {Object.keys(routes).map((key) => (
          <Button
            key={key}
            labelStyle={styles.tab}
            mode="contained"
            color={key===selected ? theme.colors.primary : "white"}
            style={{ margin:3 }}
            onPress={() => setSelected(key)}
          >
            {key}
          </Button>
        ))}
      </View>
      <ScrollView style={{ maxHeight: "inherit", flex: 1 }}>
        <View>
          {routes[selected]}
        </View>  
      </ScrollView>
    </SafeAreaView>
  );
}