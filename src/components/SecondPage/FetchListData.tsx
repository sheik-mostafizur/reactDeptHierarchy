import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CircularProgress} from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchListData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the API (example: https://jsonplaceholder.typicode.com/posts)
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 100},
    {field: "title", headerName: "Title", width: 250},
    {field: "body", headerName: "Body", width: 400},
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div style={{height: 600, width: "100%"}}>
      <DataGrid rows={posts} columns={columns} checkboxSelection />
    </div>
  );
};

export default FetchListData;
