function requests ({url, method, header, data, success, fail, complete}) {
  return this.request({
    url,
    method,
    header,
    data,
    success({data, statusCode, header}) {
      success(data);
    },
    fail({data}) {
      fail(data);
    },
    complete({data}) {
      success(data);
    }
  });
}

export default requests;


