import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import JobCard from "./JobCard.js";
import Loader from "./Loader";
import Grid from "@mui/material/Grid";
const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .post(`https://api.weekday.technology/adhoc/getSampleJdJSON?offset=${index}&limit=10`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data.jdList]);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON?offset=1&limit=100"
        );
        console.log("a",response.data.jdList)
        setItems(response.data.jdList);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
      <div style={{margin:"1%"}}>
      <Grid container spacing={6}>
        {items.map((item) => (
          <JobCard data={item} key={item.jdUid} />
        ))}
      </Grid>
      {isLoading && <Loader />}
    </div>
  );
};

export default InfiniteScroll;