import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Grommet } from 'grommet';
import { Action } from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#ffa60b',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">
            Electron demo app
          </Heading>
          <Button
            icon={<Action />}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </AppBar>
        <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align="center" justify="center">
            app body
          </Box>
          <Collapsible direction="horizontal" open={!isCollapsed}>
            <Box
              flex
              width="medium"
              background="light-2"
              elevation="small"
              align="center"
              justify="center"
            >
              sidebar
            </Box>
          </Collapsible>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
