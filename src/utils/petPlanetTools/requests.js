/**
 * 用于普通请求(GET|POST|PUT|DELETE等)
 * @param url
 * @param method
 * @param header
 * @param data
 * @param success
 * @param fail
 * @param complete
 * @returns {*|never|Promise<Taro.request.Promised<any>>|Promise<TaroH5.request.Promised>}
 */
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


