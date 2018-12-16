function uploadFile({url, filePath, name, headers, formData, success, fail, complete}) {
  return this.uploadFile({
    url,
    filePath,
    name,
    headers,
    formData,
    success({data, statusCode}) {
      success(data);
    },
    fail(res) {
      fail(res);
    },
    complete(res) {
      complete(res);
    }
  });
}

export default uploadFile;
