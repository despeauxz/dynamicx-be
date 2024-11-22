export const success = (res, message, data) => {
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message,
        data,
    });
}

export const error = (res, message = '', code = 500) => {
    res.status(code).json({
        success: false,
        statusCode: code,
        message,
    });
};
