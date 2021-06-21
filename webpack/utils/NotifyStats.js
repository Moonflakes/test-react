export default class NotifyStats {
  notifyError(error) {
    // BELLs when something goes wrong!
    console.log("\x07" + (error && error.message));
  }

  notifyWarning(warning) {
    console.log(warning && warning.message);
  }

  apply(compiler) {
    compiler.hooks.done.tap('NotifyStats', (stats) => {
      var json = stats.toJson();
      if (json.errors.length > 0) {
        json.errors.forEach(this.notifyError);
      } else if (json.warnings.length > 0) {
        json.warnings.forEach(this.notifyWarning);
      } else {
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
      }
    });
  }
}