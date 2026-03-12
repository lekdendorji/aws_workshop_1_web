function handler(event) {
    var request = event.request;
    var clientIp = event.viewer.ip;

    // Define allowed IPs
    var allowedIps = ["119.2.118.134"];

    // Check if client IP is allowed
    if (allowedIps.indexOf(clientIp) !== -1) {
        return request;
    }

    return {
        statusCode: 403,
        statusDescription: "Forbidden",
        headers: {
            "content-type": { value: "text/plain" }
        },
        body: "Access denied."
    };
}
