/**
 * types
 * @author guobin201314@gmail.com on 2019-04-16
 */
/**
 * state 数据类型定义
 * object 对象会改变store的内存
 */
export interface RootStateTypes {
    author: Author;
}

/**
 * Author
 */
export class Author {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}
