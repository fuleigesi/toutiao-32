module.exports = {
  plugins: {
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    //   'postcss-pxtorem': {
    //     rootValue: 37.5,
    //     propList: ['*']
    //   }
    'postcss-pxtorem': {
      //   rootValue: ({file}) => (/vant/i.test(file) ? 37.5 : 75),
      rootValue: function (module) {
        return /vant/i.test(module.file) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
