import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Post } from "../types/post";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.address}>{post.address}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#777",
    fontSize: 13,
    marginVertical: 3,
  },
  description: {
    color: "#444",
  },
});
