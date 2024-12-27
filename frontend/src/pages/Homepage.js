import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button, Card, Typography } from '@mui/material';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import StudentsBackground from "../assets/login.png"; // Import the image for the background

const Homepage = () => {
    const [cardColor, setCardColor] = useState('#ffffff'); // Initial color for the card

    useEffect(() => {
        const interval = setInterval(() => {
            // Generate a random color for the card
            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            setCardColor(randomColor);
        }, 1000); // Change color every 1 second (1000 milliseconds)

        return () => clearInterval(interval); // Clean up the interval
    }, []); // Run this effect only once on component mount

    return (
        <StyledContainer>
            <StyledCard cardColor={cardColor}>
                <CardContent>
                   {/* <CardImage src={StudentsBackground} alt="Students Background"/> */}
                    <Typography variant="h4">
                        BIT College Dashboard
                    </Typography>
                    <Typography variant="body1">
                        Streamline college management, project organization, and add students and faculty. Seamlessly track attendance, assess performance, and provide feedback. Access records, view marks, and communicate effortlessly.
                    </Typography>
                    <ButtonContainer>
                        <StyledLink to="/choose">
                            <LightPurpleButton variant="contained" fullWidth>
                                Login
                            </LightPurpleButton>
                        </StyledLink>
                        <StyledLink to="/Adminregister">
                            <LightPurpleButton variant="contained" fullWidth>
                                Register
                            </LightPurpleButton>
                        </StyledLink>
                        
                       
                    </ButtonContainer>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link to="/Adminregister" style={{ color: "#550080" }}>
                            Sign up
                        </Link>
                    </Typography>
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Grid)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const StyledCard = styled(Card)`
  width: 370px;
  padding: 24px;
  background-color: #f5f5f5;
`;

const CardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 16px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
