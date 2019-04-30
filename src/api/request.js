export default async function (path, opt) {
  const url = "https://easy-mock.com/mock/5c2323b7543d3e6e163d888b/tpp" + path;
  const options = Object.assign({
    method: 'GET'
  }, opt)

  try {
    const result = await fetch(url, options);
    const { data, status } = await result.json();
    if (status === 0) {
      return data
    } else {
      console.log('接口错误')
    }
  } catch (error) {
    console.log('服务器异常')
  }
}