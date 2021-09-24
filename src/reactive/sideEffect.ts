// setup(props) {
//   const count = ref( 1 )
//   watchEffect(( onInvalidate) => {
//     console. log('props effect ' ,props.msg )
//     console.log( 'inner effect' , count.value )
//     const source = axios.CancelToken.source()
//     axios.get(`https://jsonplaceholder.typicode.com/todos/${count.value}`,{
//       cancelToken: source.token
//     }).catch(err => {
//       console.log(err.message)
//     })
//     onInvalidate(() => {
//       source.cancel('trigger')
//     })
//   })
//   return {
//     count
//   }
// }


import { reactive } from 'vue'
import axios from 'axios'

interface DataProps<T> {
  result: T | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}
const useURLLoader = <T = any>(url: string) => {
  const data = reactive<DataProps<T>>({
    result: null,
    loading: true,
    loaded: false,
    error: null
  })
  axios.get(url).then(resp => {
    data.result = resp.data
    data.loaded = true 
  }).catch((e) => {
    data.error = e
  }).finally(() => {
    data.loading = false
  })
  return data
}

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const post = useURLLoader<PostProps>('https://jsonplaceholder.typicode.com/posts/1')
post.result
