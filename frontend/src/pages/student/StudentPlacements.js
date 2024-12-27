import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import feedue from "../../assets/img4.png";
import trophy from "../../assets/trophy.png";

import schedule from "../../assets/schedule.png";

import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { FormatAlignJustify } from '@mui/icons-material';


const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <>
         <Typography variant="p" align="center" sx={{display:'flex',alignItems:'center',justifyContent:'center',mt:4,fontSize:'1.3rem'}}>Placements Profile</Typography>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4,}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={5} lg={5}>
                        <StyledPaper>
                            <Title>
                                 placement cumulative%
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Title>
                                current sem FA%
                            </Title>
                            <Data start={0} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Title>
                              Eligibility
                            </Title>
                            <Typography sx={{color:'green'}}>Need Improvement </Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Title>
                               Next Level
                            </Title>
                            <Typography sx={{color:'green'}}>Attention to Attain Dream Offer</Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Title>
                                Registered
                            </Title>
                            <Data start={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Title>
                                Attended
                             </Title>
                            <Data start={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            
                            <Title>
                            Mock Assement %
                            </Title>
                            <Data start={90} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            
                            <Title>
                            Assessment %y
                            </Title>
                            <Data start={64} />
                        </StyledPaper>
                    </Grid>
                    {/*<Grid item xs={12} md={4} lg={3}>
                        <ChartContainer>
                            {
                                response ?
                                    <Typography variant="h6">No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6">Loading...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ChartContainer>
                    </Grid>*/}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const ChartContainer = styled.div`
padding: 2px;
display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius:50%; /* Adding slight curve to the edges */
  background: linear-gradient(145deg, #e0e0e0, #ffffff); /* Adding 3D background effect */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.5); /* Adding shadow for 3D effect */
`;

const StyledPaper = styled(Paper)`
padding: 56px;
display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;



export default StudentHomePage