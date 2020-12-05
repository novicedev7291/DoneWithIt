import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import Screen from "../components/Screen";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas doloribus exercitationem distinctio perferendis ipsum architecto! Eveniet consectetur, velit amet illum accusantium asperiores fugit veniam atque sit facilis repudiandae voluptatem itaque.",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas doloribus exercitationem distinctio perferendis ipsum architecto! Eveniet consectetur, velit amet illum accusantium asperiores fugit veniam atque sit facilis repudiandae voluptatem itaque.",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "T3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas doloribus exercitationem distinctio perferendis ipsum architecto! Eveniet consectetur, velit amet illum accusantium asperiores fugit veniam atque sit facilis repudiandae voluptatem itaque.",
    image: require("../assets/mosh.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    setMessages(messages.filter((msg) => msg.id != message.id));
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            image={item.image}
            subTitle={item.description}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setMessages([...initialMessages])}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
