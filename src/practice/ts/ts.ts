import './ts.scss'
import '../components/list/list'

let mainDom = document.getElementById('main1') as HTMLElement
let heightOne = mainDom.offsetHeight as number
console.log(heightOne)

let test = (num: number | string) => {
  console.log(num)
}
test('123455')
test(heightOne)
