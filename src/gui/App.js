import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Grommet, TextInput } from 'grommet';
import { Action, NewWindow } from 'grommet-icons';
const ipcRenderer = window.ipcRenderer;

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
  const [windowName, setWindowName] = useState('New window');

  const openNewWindowHandler = () => {
    ipcRenderer.send('new-window-channel', windowName);
  };

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
        <Box direction="row" fill>
          <Box fill>
            <Box full direction="row" pad="medium">
              <Box pad="medium" />
              <Box flex align="center" justify="center" gap="medium">
                <TextInput
                  placeholder="type here"
                  value={windowName}
                  onChange={event => setWindowName(event.target.value)}
                />
                <Button
                  icon={<NewWindow />}
                  label="Open new window"
                  onClick={openNewWindowHandler}
                />
              </Box>
              <Box pad="medium" />
            </Box>
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
