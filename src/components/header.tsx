import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';


type HeaderProps = {
  siteTitle: string;
};

const HeaderWrapper = styled.div`
  background: ${props => props.theme.colorPrimary};
  img {
    margin-bottom: 0;
  }
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 96rem;
  padding: 1rem;
`;

const Header: React.FunctionComponent<HeaderProps> = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Final Jeopardy Calculator
        </Link>
      </h1>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
