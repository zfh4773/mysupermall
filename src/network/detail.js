import { request } from "./request"
export function getDetail(iid) {
    return request({
        url: '/detail/',
        params: {
            iid
        }
    })
}

export class Goods {
   constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.Price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realprice = itemInfo.lowNowPrice
    }
}
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shoplogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCunt = shopInfo.cGoods
    }
}
export class GoodsParam {
  constructor(info,rule) {
      //某些images没有值
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
  }
}