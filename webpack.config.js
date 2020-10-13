module.exports = {
  mode: "production",
  entry: "./bin/www",
  target: "node",
  optimization: {
    minimize: false,
  },
};
