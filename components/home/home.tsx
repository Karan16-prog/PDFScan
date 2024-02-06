import React, { useState } from "react";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  const [file, setFiles] = useState([]);

  const photoDir = FileSystem.documentDirectory + "photos/";

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
      const photoDir = await FileSystem.readDirectoryAsync(photoDir);
      setFiles(photoDir.map((fileName) => photoDir + fileName));
    } catch (error) {
      console.error("Error loading photos", error);
    }
  };

  return <div>HomeScreen</div>;
};

export default HomeScreen;
