module.exports = api => {
  const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.

  return {
    plugins: ["@babel/syntax-dynamic-import"],
    presets: [
      isTest
        ? "@babel/preset-env"
        : [
            "@babel/preset-env",
            {
              modules: false
            }
          ],
      [
        "@babel/preset-react",
        {
          runtime: "automatic"
        }
      ]
    ]
  };
};
