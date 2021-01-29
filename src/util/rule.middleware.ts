


// helper function

export const inputValidator = (schema: any) => {

  return (req, res, next) => {

    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema)) {
      if (key === 'body') {
        // @ts-ignore
        const { error } = value.validate(req.body);

        if (error) {
          return res.status(400).json({
            status: false,
            message: error.message,
            data: 'invalid payload',
          });
        }
      } else if (key === 'query') {
        // @ts-ignore
        const { error } = value.validate(req.query);
        if (error) {
          return res.status(400).json({
            status: false,
            message: error.message,
            data: 'invalid payload',
          });
        }
      } else {
        // @ts-ignore
        const { error } = value.validate(req.params);
        if (error) {
          return res.status(400).json({
            status: false,
            message: error.message,
            data: 'invalid payload',
          });
        }
      }
    }
    next();
  };
};

// const checkError = (error, res) => {
//   if (error) {
//     return res.status(400).json({
//       status: false,
//       message: error.message,
//       data: 'invalid payload',
//     });
//   }
// };

export const checkQuery = async (req, res, next) => {
  try {
    const obj: any = req.query;
    for (const [key, value] of Object.entries(obj)) {
      const theValue = Number(value);
      if (Number.isNaN(theValue)) {
        return res.status(400).json({
          status: false,
          message: `query parameter ${key}=${value} is invalid`,
          data: 'invalid payload',
        });
      }
      req[key] = theValue;
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'an unknown error occurred! if this persist, please contact support',
      data: null,
    });
  }
};





export const isAdmin = (req, res, next) => {

  console.log(req.user);
  const { admin, role } = req.user;
  if (admin?.status !== "approved" || role !== "admin") {
    return res.status(401).json({
      status: false,
      message: 'You do not have sufficient permission',
      data: 'unauthorized'
    });
  }
  next();
};

