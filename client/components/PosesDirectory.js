import React, { useContext, useEffect } from "react";
import { PosesContext } from "../contexts/posesContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  max-width: 35em;
  justify-content: center;
  background-color: #d99379;

`;

const BigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 50em;
`;


const linkStyle = {
  textDecoration: "none",
  color: "#FFFFFF",
};

const Title = styled.h2``;

const PosesDirectory = () => {
  const { poses } = useContext(PosesContext);

  return (
    <div>
      <Title>Poses</Title>
      <BigContainer>
        {poses.map((pose) => (
          <Container key={pose.id}>
            <Link style={linkStyle} key={pose.id} to={`/poses/${pose.id}`}>
              {pose.name}
            </Link>
          </Container>
        ))}
      </BigContainer>
    </div>
  );
};

export default PosesDirectory;
