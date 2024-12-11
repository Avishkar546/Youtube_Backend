// With Promises
const asyncHandler = (controller) => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res, next))
            .catch(err => next(err));
    }
}

export { asyncHandler };

// With try-catch. Not using anywhere just for practices
const asyncHandler1 = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    }
}