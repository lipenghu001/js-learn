// 没有泛型时，类型推断无法流动到函数中

function echo<T>(arg: T): T {
  return arg;
}

function swap<T, U>(tuple: [T, U] ): [U, T] {
  return [tuple[1], tuple[0]]
}

// const result = echo(123)
const result = swap(['string', 123])

interface GithubResp {
  name: string;
  count: number;
}

interface CountryResp {
  name: string;
  area: number;
  population: number;
}

function withAPI<T>(url: string): Promise<T> {
  return fetch(url).then(resp => resp.json())
}

withAPI<GithubResp>('github.user').then(resp => {

})

withAPI<CountryResp>('github.user').then(resp => {

})

// type Keys = keyof CountryResp