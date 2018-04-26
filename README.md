# Wicked Customer Feedback

### tools/techniques
* node v9.6.1
* npm v5.6.0 or [yarn 1.6.0](https://yarnpkg.com/lang/en/)
* [webpack](https://webpack.js.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [postCSS](https://github.com/postcss/postcss)
* [es6+](http://es6-features.org/#Constants)
* [flow](https://flow.org/)

### source
[Source tree](./directoryList.md)

### commands
```
# to install node modules
$ yarn install
```

```
#Run the app with Browser Sync
$ yarn start
```

```
#Build
$ yarn build
```

### notes
1. BEM and CSSModule are used for a CSS architecture
#example
```css
.header {
  position: relative;
  width: 100%;
  height: 50px;

  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  &.is-active {
    background-color: red;
  }

  &__logo {
    width: 25px;
    height: 25px;

    &--black {
      background-color: black;
    }
  }
}
```
