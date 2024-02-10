import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { View, TouchableOpacity, Image, FlatList } from "react-native";

const HomeScreen = () => {
  const [file, setFiles] = useState<string[]>([]);

  let photoDir = FileSystem.documentDirectory + "photos/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(photoDir);
    if (!dirInfo.exists) {
      console.log("Directory doesnt exist");
      await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });
    }
  };

  const loadPhotos = async () => {
    try {
      await ensureDirExists();
      const fileList = await FileSystem.readDirectoryAsync(photoDir);
      console.log(fileList);
      setFiles(
        fileList.map(
          (fileName) => FileSystem.documentDirectory + "photos/" + fileName
        )
      );

      //     setFiles(photoList.map((fileName) => photoDir + fileName));
    } catch (error) {
      console.error("Error loading photos", error);
      // alert here
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div>
      <FlatList
        data={file}
        renderItem={() => <RenderPhotoItem />}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default HomeScreen;

// Procrastinated the whole day again
//

const RenderPhotoItem = () => {
  return (
    <View>
      {/* <TouchableOpacity onPress={() => deletePhoto(item)}> */}
      <Image source={{ uri: "item" }} style={{ width: 100, height: 100 }} />
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity
        onPress={() => exportToMemory(item)}
        style={{ marginLeft: 10 }}
      >
        <Button title="Export" onPress={() => exportToMemory(item)} />
      </TouchableOpacity> */}
    </View>
  );
};
