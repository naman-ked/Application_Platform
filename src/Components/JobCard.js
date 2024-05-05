import * as React from "react";
import Paper from "@mui/material/Paper";
import { Button, Chip, Grid } from "@mui/material";
import TextWithEllipsis from "./TextWithEllipsis.js";
import Avatar1 from "./Avatar.js";
class JobCard extends React.Component {
    constructor() {
        super(); 
        this.state = {
            generate: false,
            deploy: false,
            showLoading: false,
        };
    }



    render() {
        return (
            <Grid item sm={3} xs={12} key={this.props.data.jdUid}>
                <Paper elevation={4} style={{ borderRadius: "5%", padding: "5%", textAlign: "left",maxWidth:"80%" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Chip label={"⏳Posted 10 days ago"} />
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: "5%" }}>
                            <img src={this.props.data.logoUrl} alt="ffff" style={{ width: "80%", height: "70%", borderRadius: "5%",float:"left" }} />
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: "5%",marginLeft:"2%" }}>
                            <TextWithEllipsis
                                style={{ fontSize: "15px", color: "#757575", float: "left" }}
                            >
                                <b>{this.props.data.companyName}</b>
                            </TextWithEllipsis>
                            <TextWithEllipsis
                                style={{ fontSize: "20px", marginTop: "2%" }}
                            >
                                {
                                    this.props.data.jobRole
                                }
                            </TextWithEllipsis>
                            <TextWithEllipsis
                                style={{ fontSize: "18px", marginTop: "2%", color: "#757575" }}
                            >
                                {
                                    this.props.data.location
                                }
                            </TextWithEllipsis>
                        </Grid>
                        <Grid item xs={12}>
                            <TextWithEllipsis
                                style={{ fontSize: "15px", color: "#757575", marginTop: "1%" }}
                            >
                                Estimated Salary: {this.props.data.minJdSalary !== null ? this.props.data.minJdSalary + " - " + this.props.data.maxJdSalary + " LPA ✅" : "Not Specified"}
                            </TextWithEllipsis>
                        </Grid>
                        <Grid item xs={8}>
                            <TextWithEllipsis
                                style={{ fontSize: "15px", marginTop: "3%" }}
                            >
                                About Company:
                            </TextWithEllipsis></Grid>
                        <Grid item xs={8}>
                            <TextWithEllipsis
                                style={{ fontSize: "15px", marginTop: "1%" }}
                            ><b>About us</b>
                            </TextWithEllipsis>
                        </Grid> 
                        <Grid item xs={12} style={{maxHeight:"205px",overflow:"hidden"}}>   
                            {this.props.data.jobDetailsFromCompany.substring(0, 300)}
                        
                           <span style={{filter:"blur(1px)"}}> {this.props.data.jobDetailsFromCompany.substring(301, 500)} </span>
                        </Grid>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={3}>
                        <a href={this.props.data.jdLink}  style={{color:"blue",justifyContent:"center",textDecoration:"None"}}>View job</a>
                        </Grid><Grid item xs={4} ></Grid>
                        <Grid item xs={8}>
                        <TextWithEllipsis
                                style={{ fontSize: "15px", color: "#757575", marginTop: "5%" }}
                            >
                                <b>Minimum Experience</b>
                       </TextWithEllipsis>
                        </Grid>
                        <Grid item xs={8}>
                        <TextWithEllipsis
                                style={{ fontSize: "13px", marginTop: "1%" }}
                            >
                                {this.props.data.minExp} years
                        </TextWithEllipsis>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center", marginTop: "5%",backgroundColor: "aquamarine",borderRadius:"4%",padding:"1%" }}>
                            <Button style={{ color: "black",textTransform:"none" }}>
                               ⚡ <b>Easy Apply</b>
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center",marginTop: "3%",backgroundColor: "#4d4dff",borderRadius:"3%",padding:"2%"  }}>
                            <Button style={{ color: "white",textTransform:"none" }}>
                               <Avatar1 /> &nbsp;  <Avatar1 /> &nbsp;  Unlock Referal asks
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
        );
    }
}

export default JobCard;
