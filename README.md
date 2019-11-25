This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Release

Please, check https://www.electron.build/configuration/configuration for additional configuration options.
Currently it build `windows portable` application, configured via:

`package.json` (there is `-w` flag in the `release` script)

```
...
"release": "electron-builder -w",
...
"build": {
   ...
    "win": {
      "target": "portable"
    },
   ...
```
