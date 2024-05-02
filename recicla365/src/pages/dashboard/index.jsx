import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  font-size: 14px;
`;

const Dashboard = () => {
  return (
    <Container>
      <Content>
        <Header>Header</Header>
        <div style={{ display: 'flex' }}>
          <Sidebar>Sidebar</Sidebar>
          <MainContent>Main Content</MainContent>
        </div>
        <Footer>Footer</Footer>
      </Content>
    </Container>
  );
}

export default Dashboard;
