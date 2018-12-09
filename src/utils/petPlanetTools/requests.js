function requests ({url, method, header, data, success, fail, complete}) {
  return this.request({
    url,
    method,
    header,
    data,
    success({data, statusCode, header}) {
      success(data);
    },
    fail,
    complete
  });
}

export default requests;


