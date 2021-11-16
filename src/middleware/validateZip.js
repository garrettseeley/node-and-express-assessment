function validateZip(req, res, next) {
  const zip = parseInt(req.params.zip);
  if (typeof(zip) !== "number" || zip.toString().length !== 5) {
    next(`Zip ${req.params.zip} is invalid`);
  } else {
    next();
  }
}

module.exports = validateZip;
