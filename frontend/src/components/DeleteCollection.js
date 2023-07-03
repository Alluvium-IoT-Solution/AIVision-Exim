import axios from "axios";
import React, { useEffect } from "react";

function DeleteCollection() {
  useEffect(() => {
    async function deleteCollection() {
      const res = await axios.delete(
        "http://localhost:9002/api/deleteCollection/jobs"
      );
      console.log(res);
    }
    deleteCollection();
  }, []);
  return <div>DeleteCollection</div>;
}

export default DeleteCollection;
