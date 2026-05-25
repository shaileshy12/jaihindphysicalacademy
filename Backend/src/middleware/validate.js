export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        success: false,
        errors: error.issues?.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  };
};