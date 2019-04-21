/**
 * Singer
 * @author guobin201314@gmail.com on 2019-04-20
 */

export class SingerData {

  public id: string;
  public name: string;
  public avatar: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
