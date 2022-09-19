// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

export const statusCodes = {
  // Information responses
  100: "Continue",
  101: "Switching Protocols",
  103: "Early Hints",

  // Successful responses
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",

  // Redirection messages
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",

  // Client error responses
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  422: "Unprocessable Entity",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",

  // Server error responses
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

type StatusType = keyof typeof statusCodes;

let status: StatusType = 200;

// use in handlers to return your required response:
// switch (getStatus()) {case 200: ...}
// Remember to reset:
// afterEach(() => { resetMockApiResponse(); });
// which you could set globally in setupTests.js
export const getStatus = () => {
  return status;
};

export const setStatus = (num: StatusType) => {
  status = num;
};

export const resetStatus = () => {
  status = 200;
};