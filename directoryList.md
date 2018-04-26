```
|-- src                         # Application source code
|   |-- constants.js            # Global variables/constants
|   |-- globals.js              # Global functions
|   |-- history.js              # create history
|   |-- index.js                # React render root file
|   |-- store.js                # Redux store
|   |-- style.css               # Global css root
|   |-- actions                 # Redux actions
|   |-- components              # Shared React components
|   |-- reducers                # Redux Reducers
|   |-- routes                  # Universal application router
|   |   |-- index.js            # Universal Router configuration file
|   |   |-- Home                # Route directory '/'
|   |   |   |-- index.js        # React component
|   |   |   |-- styles.css      # CSS module
|   |-- svg                     # Inline svg files
|-- css                         # Global css files
|-- test                        # Test js (Mocha)
|-- public                      # Static files such as favicon.ico etc.
|-- tools                       # Automation scripts (yarn etc.)
    |-- .eslintrc               # ESlint config 
    |-- build.js                # build command 
    |-- config.js               # Site config
    |-- markdown-loader.js      # Markdown loader
    |-- run.js                  # start command
    |-- task.js                 # Task manager
    |-- webpack.config.js       # Webpack config file
```