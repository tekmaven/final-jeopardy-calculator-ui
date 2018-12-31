import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import Calculator2 from '../components/calculator'
const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Calculator2 id="asd" />
  </Layout>
);

export default IndexPage;
