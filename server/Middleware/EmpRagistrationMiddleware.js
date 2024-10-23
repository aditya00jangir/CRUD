const validateMobileNumber = (req, res, next) => {
  console.log(req.body);
  const mobileNumber = req.body.MobNo;
  const mobileNumberPattern = /^\d{10,11}$/;
  console.log(mobileNumber);
  // if (!mobileNumber) {
  //   return res.status(400).json({ error: "Mobile number is required." });
  // }
  // if (!mobileNumberPattern.test(mobileNumber)) {
  //   return res.status(400).json({
  //     error: "Invalid mobile number. It must be a 10-digit number.",
  //   });
  // }
  // if (mobileNumber.length == 11) {
  //   req.body.MobNo = mobileNumber.replace(mobileNumber[0], "", 1);
  // }
  next();
};

module.exports = { validateMobileNumber };
