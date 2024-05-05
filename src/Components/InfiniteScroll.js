import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import JobCard from "./JobCard.js";
import Loader from "./Loader";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);
  const [searched1, setSearched1] = useState("");
  const [searched2, setSearched2] = useState("");
  const [searched3, setSearched3] = useState("");
  const [searched4, setSearched4] = useState("");
  const [searchRows, setSearchRows] = useState([]);
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .post(`https://api.weekday.technology/adhoc/getSampleJdJSON?offset=${index}&limit=10`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data.jdList]);
        setSearchRows((prevItems) => [...prevItems, ...res.data.jdList]);
        if (searched1 !== "") {
          requestCompanyNameSearch(searched1);
        }
        else if (searched2 !== "") {
          requestRolesSearch(searched2);
        }
        else if (searched3 !== "") {
          requestExpSearch(searched3);
        }
        else if (searched4 !== "") {
          requestRemoteSearch(searched4);
        }
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
        //console.log("a", response.data.jdList)
        setItems(response.data.jdList);
        setSearchRows(response.data.jdList);
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

  const requestCompanyNameSearch = (searchedVal) => {
    if (searched1 === "" && searched2 === "" && searched3 === "" && searched4 === "") {
      setSearchRows(items);
    }
    else if (searchedVal !== "") {
      if (searched2 !== "") {
        requestRolesSearch(searched2);
      }
      else if (searched3 !== "") {
        requestExpSearch(searched3);
      }
      else if (searched4 !== "") {
        requestRemoteSearch(searched4);
      }
      const filteredRows = searchRows.filter((row) => {
        return row.companyName.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setSearchRows(filteredRows);
    }
  };

  const requestRolesSearch = (searchedVal) => {
    if (searched1 === "" && searched2 === "" && searched3 === "" && searched4 === "") {
      setSearchRows(items);
    }
    else if (searchedVal !== "") {
      if (searched1 !== "") {
        requestCompanyNameSearch(searched1);
      }
      else if (searched3 !== "") {
        requestExpSearch(searched3);
      }
      else if (searched4 !== "") {
        requestRemoteSearch(searched4);
      }
      const filteredRows = searchRows.filter((row) => {
        return row.jobRole.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setSearchRows(filteredRows);
    }
  };

  const requestExpSearch = (searchedVal) => {
    if (searched1 === "" && searched2 === "" && searched3 === "" && searched4 === "") {
      setSearchRows(items);
    }
    else if (searchedVal !== "") {
      if (searched2 !== "") {
        requestRolesSearch(searched2);
      }
      else if (searched1 !== "") {
        requestCompanyNameSearch(searched1);
      }
      else if (searched4 !== "") {
        requestRemoteSearch(searched4);
      }
      const filteredRows = searchRows.filter((row) => {
        return row.minExp.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setSearchRows(filteredRows);
    }
  };

  const requestRemoteSearch = (searchedVal) => {
    if (searched1 === "" && searched2 === "" && searched3 === "" && searched4 === "") {
      setSearchRows(items);
    }
    else if (searchedVal !== "") {
      if (searched1 !== "") {
        requestCompanyNameSearch(searched1);
      }
      else if (searched3 !== "") {
        requestExpSearch(searched3);
      }
      else if (searched2 !== "") {
        requestRolesSearch(searched2);
      }
      const filteredRows = searchRows.filter((row) => {
        return row.location.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setSearchRows(filteredRows);
    }
  };

  // const cancelSearch = () => {
  // 	this.setState({ searched: "" });
  // 	this.requestSearch("");
  // };

  return (
    <div style={{ margin: "1%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2}>
          <TextField
            id="search"
            type="search"
            label="Search Company Name"
            variant="outlined"
            margin="dense"
            size="small"
            value={searched1}
            onChange={(event) => {
              setSearched1(event.target.value);
              requestCompanyNameSearch(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} >
          <TextField
            id="search"
            type="search"
            label="Roles"
            variant="outlined"
            margin="dense"
            size="small"
            value={searched2}
            onChange={(event) => {
              setSearched2(event.target.value);
              requestRolesSearch(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            id="search"
            type="search"
            label="Experience"
            variant="outlined"
            margin="dense"
            size="small"
            value={searched3}
            onChange={(event) => {
              setSearched3(event.target.value);
              requestExpSearch(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} >
          <TextField
            id="search"
            type="search"
            label="Remote"
            variant="outlined"
            margin="dense"
            size="small"
            value={searched4}
            onChange={(event) => {
              setSearched4(event.target.value);
              requestRemoteSearch(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br /><br />
      <Grid container spacing={6}>
        {
          searchRows.map((item) => (
            <JobCard data={item} key={item.jdUid} />
          ))}
      </Grid>
      {isLoading && <Loader />}
    </div>
  );
};

export default InfiniteScroll;
