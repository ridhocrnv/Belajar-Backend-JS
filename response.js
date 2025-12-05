const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            data: data,
            message: message
        },
        pagination: {
            current_page: 1,
            total_pages: 1,
            page_size: 10,
            total_items: 0
        }
    });
}

module.exports = response;